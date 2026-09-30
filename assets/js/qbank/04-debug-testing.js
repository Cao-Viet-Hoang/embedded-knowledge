/* Question bank — debug, testing. Loaded by lessons/luxoft/LX11-question-bank.html */
(window.QBANK = window.QBANK || []).push(

  /* ===================== DEBUG ===================== */

  {
    id: "debug-01",
    topic: "debug",
    type: "theory",
    q: "How does a hardware debugger like TRACE32 actually talk to the MCU?",
    tags: ["JTAG", "Nexus", "LPD", "debug port", "on-chip debug", "TRACE32", "Lauterbach", "PowerDebug", "trace", "gỡ lỗi phần cứng"],
    key: [
      "Host software → probe → debug port → on-chip debug unit",
      "JTAG: TCK/TMS/TDI/TDO; RH850 also LPD",
      "Halt, step, read/write regs + memory, flash, HW breakpoints",
      "Trace is a separate path: Nexus AUX / Aurora",
      "Needs ELF with debug symbols; production parts may be locked"
    ],
    answer: "The debugger doesn't run on the target. It talks to an <strong>on-chip debug unit</strong> through a debug port. On most MCUs that's <strong>JTAG</strong> (TCK, TMS, TDI, TDO) or a reduced-pin variant; on RH850 there's JTAG and the Renesas LPD interface, and for trace there's <strong>Nexus</strong>, either a parallel AUX port or a serial Aurora link. With Lauterbach, the host software PowerView drives the PowerDebug probe, which turns commands into debug-port transactions. Through the debug unit I can halt and resume cores, single-step, read and write CPU registers, memory and peripheral registers, program flash, and set breakpoints using comparators in the silicon. Trace is a separate path: the core streams compressed program flow, and optionally data accesses, so I can reconstruct what happened without stopping the CPU. Two practical points: the debugger needs the <strong>ELF with debug symbols</strong> to map addresses to source lines and variables, and on production or safety parts the debug port may be locked or password-protected, so bench units need an unlocked configuration.",
    followups: ["What is the difference between stop-mode and run-mode debugging?", "Why does trace need a separate port?"]
  },

  {
    id: "debug-02",
    topic: "debug",
    type: "practical",
    q: "Walk me through your TRACE32 workflow when you start debugging a target.",
    tags: ["TRACE32", "Lauterbach", "PRACTICE", ".cmm", "SYStem.Up", "flash", "ELF", "Remote API", "RH850", "quy trình debug"],
    key: [
      "SYStem.CPU + SYStem.Up: attach and halt",
      "Flash + Data.LOAD.Elf (code + symbols), /NoCODE for symbols only",
      "Run to main / init, open List, Register, Var.Watch, Frame",
      "Peripheral view vs reference manual",
      "Repeatable steps in a .cmm script; Remote API for CI"
    ],
    answer: "On RH850 my flow is: start PowerView with the project config, select the derivative with <code>SYStem.CPU</code>, set the debug-port options, then <code>SYStem.Up</code> to attach and halt at reset. I program flash with the <code>FLASH</code> commands and <code>Data.LOAD.Elf</code>, which loads code and symbols together; if the code is already in flash I load only symbols with <code>/NoCODE</code>. Then I run to <code>main</code> or to the init step I care about, and open the windows I need: <code>List</code> for source, <code>Register</code> for the core, <code>Var.Watch</code> for variables, <code>Data.dump</code> for raw memory, <code>Frame</code> for the call stack, and the peripheral view to compare module registers against the reference manual. On multicore parts I always check which core I'm looking at. Anything I repeat goes into a <strong>PRACTICE .cmm script</strong> — attach, flash, set breakpoints, dump key variables — so the setup is reproducible and colleagues get the same state. Those scripts can also be driven through the TRACE32 Remote API from Python, which is how you bring the debugger into an automated smoke test.",
    code: "; attach_and_flash.cmm  (illustrative, check commands for your T32 version)\n" +
          "RESet\n" +
          "SYStem.CPU R7F7xxxxx          ; exact derivative from project config\n" +
          "SYStem.Up\n" +
          "DO ~~/demo/rh850/flash/<derivative>.cmm PREPAREONLY  ; declares flash (FLASH.Create)\n" +
          "FLASH.ReProgram ALL\n" +
          "Data.LOAD.Elf \"out/app.elf\"\n" +
          "FLASH.ReProgram OFF\n" +
          "Break.Set EcuM_Init /Onchip   ; code in flash -> on-chip breakpoint\n" +
          "Go\n" +
          "WAIT !STATE.RUN() 5.s\n" +
          "Frame.view /Locals /Caller\n" +
          "ENDDO",
    lang: "text",
    followups: ["How would you run this from a CI job?", "How do you debug on a multicore RH850?"]
  },

  {
    id: "debug-03",
    topic: "debug",
    type: "theory",
    q: "What's the difference between software breakpoints, hardware breakpoints and watchpoints?",
    tags: ["breakpoint", "hardware breakpoint", "on-chip breakpoint", "software breakpoint", "watchpoint", "data breakpoint", "TRACE32", "điểm dừng"],
    key: [
      "SW BP: patches a break instruction, unlimited, needs writable memory",
      "HW / on-chip BP: PC comparators, limited, required for flash code",
      "Watchpoint: stop on data read/write, optional value/range",
      "Conditional BPs can be intrusive (stop-check-resume)",
      "RH850 + Nexus: watchpoint can emit trace message, no halt"
    ],
    answer: "A <strong>software breakpoint</strong> replaces the instruction at that address with a break instruction; the debugger restores it afterwards. You can have as many as you like, but the memory must be writable, so they're mainly for code in RAM. Some tools can patch flash for software breakpoints, but that's slow and wears the flash. A <strong>hardware or on-chip breakpoint</strong> uses comparators in the debug unit that match the program counter, so nothing is patched. There are only a few per core, but they're the only option for code executing from flash, which on an ECU is almost everything. TRACE32 picks on-chip automatically for flash, but I keep the budget in mind. A <strong>watchpoint</strong>, or data breakpoint, uses the same kind of comparators on data accesses: stop when this address is written, optionally only with a certain value or from a certain code range. That's my tool for 'who is overwriting this variable'. Conditional breakpoints are handy, but if the debugger evaluates the condition by stopping and resuming, it's intrusive and ruins real-time behaviour. On RH850 with Nexus a watchpoint can also just emit a trace message instead of halting, which keeps the system running.",
    followups: ["What happens if you run out of on-chip breakpoints?", "How would you find who corrupts a variable?"]
  },

  {
    id: "debug-04",
    topic: "debug",
    type: "practical",
    q: "A global variable gets corrupted at random. How do you find out who writes to it?",
    tags: ["memory corruption", "watchpoint", "data breakpoint", "map file", "buffer overflow", "DMA", "race condition", "TRACE32", "hỏng bộ nhớ"],
    key: [
      "Look at the bad value: pattern gives hints",
      "Map file: check the neighbour for overruns",
      "Write watchpoint on the address → PC + call stack",
      "Non-CPU writers (DMA): check descriptors, use trace",
      "If halting hides it: data trace instead",
      "Add a regression test for the boundary"
    ],
    answer: "First I look at the corrupted value itself: an ASCII pattern, something that looks like an address, or a counter value tells me a lot. Then I check the <strong>map file</strong> to see what's placed right before the variable, because an overrun in the neighbouring buffer is the classic cause. Next I set a <strong>write watchpoint</strong> on the address in TRACE32, qualified with a value condition if the variable is written legitimately a lot, and run the scenario. When it hits, the PC and call stack show the culprit. If the writer isn't the CPU — for example a <strong>DMA</strong> transfer with a wrong length or destination — the CPU watchpoint may not fire, so I check the DMA configuration and use trace that also records other bus masters, if the trace unit supports it. If stopping the CPU changes the behaviour, I use data trace instead of halting and read the history afterwards. Typical root causes: off-by-one index, wrong length in <code>memcpy</code>, stack overflowing into another section, a pointer to a local used after return, or a missing critical section so two contexts write the same data. After the fix I add a test that hits exactly that boundary.",
    followups: ["What if the corruption only happens with the debugger detached?", "How do you protect shared data between an ISR and a task?"]
  },

  {
    id: "debug-05",
    topic: "debug",
    type: "practical",
    q: "The ECU ends up in an exception or trap handler on RH850. How do you find the root cause with TRACE32?",
    tags: ["RH850", "exception", "trap", "HardFault", "FEPC", "EIPC", "FEIC", "MPU", "ProtectionHook", "TRACE32", "ngoại lệ", "lỗi ngắt"],
    key: [
      "Break at the handler / ProtectionHook before context is lost",
      "FE level: FEPC, FEPSW, FEIC; EI level: EIPC, EIPSW, EIIC",
      "Decode cause code with the core manual; MPU fault address in MEA",
      "List window at saved PC + Frame call stack",
      "Context trashed? Use trace for last branches",
      "Check Det errors and OS hooks too"
    ],
    answer: "First I make sure I stop in the handler before anything is overwritten — a breakpoint at the exception vector, or at the OS <code>ProtectionHook</code> on an AUTOSAR stack. Then I read the cause and the saved context. On RH850 exceptions are split by level: FE-level exceptions save the interrupted PC and PSW in <code>FEPC</code> and <code>FEPSW</code> with the cause code in <code>FEIC</code>; EI-level uses <code>EIPC</code>, <code>EIPSW</code> and <code>EIIC</code>. For memory-protection violations the failing address is recorded, in <code>MEA</code>. I decode the cause code with the core manual, then go to the saved PC in the List window and look at the call stack in <code>Frame</code>. Typical findings: an access outside the MPU region allowed for that OS application, a misaligned access, a call through a corrupted function pointer, or a reserved-instruction trap because the stack or return address was trashed. If the saved context is already garbage, I use trace to see the last branches before the exception. I also check the Det for errors reported just before, and whether a watchdog reset hides the real exception.",
    followups: ["What would make the saved PC point to an invalid address?", "How does the OS memory protection relate to this trap?"]
  },

  {
    id: "debug-06",
    topic: "debug",
    type: "practical",
    q: "How do you detect and debug a stack overflow on an embedded target?",
    tags: ["stack overflow", "stack painting", "high-water mark", "MPU", "watchpoint", "AUTOSAR OS", "stack monitoring", "tràn stack"],
    key: [
      "Check OS stack monitoring / stack fault reports",
      "Stack painting (0xAA) → measure high-water mark",
      "Write watchpoint at the stack limit → exact culprit",
      "MPU guard region turns silent corruption into a trap",
      "Causes: big locals, deep error paths, recursion, ISR nesting",
      "Compare with compiler stack usage, keep a margin"
    ],
    answer: "Stack overflows are nasty because the symptom shows up somewhere else. First I check the <strong>stack configuration</strong>: in AUTOSAR OS each task and ISR has its own stack, and the OS can check stacks at context switch, so I look for a reported stack fault. Second, <strong>stack painting</strong>: fill the stack with a known pattern like <code>0xAA</code> at startup, run the worst-case scenario, then check in the memory window how far the pattern was overwritten. That gives the real high-water mark. Third, I set a <strong>write watchpoint</strong> on the last word of the stack, so the debugger stops on the exact instruction that crosses it and I get the call stack. If the MCU has an MPU, a guard region below the stack turns silent corruption into an immediate exception. Common causes: large local arrays, deep call chains in error handling, recursion, or interrupts nesting deeper than assumed. I compare the measurement with the compiler's stack-usage output for the worst path, fix the cause or resize with a margin, and re-measure after the change.",
    followups: ["Why is the worst case often in error handling paths?", "How would you catch this in regression tests?"]
  },

  {
    id: "debug-07",
    topic: "debug",
    type: "theory",
    q: "Why do breakpoints often hide timing problems, and how do you debug timing issues instead?",
    tags: ["timing", "race condition", "Heisenbug", "trace", "run-mode", "GPIO toggle", "oscilloscope", "logic analyzer", "jitter", "vấn đề thời gian"],
    key: [
      "Halting stops the core, not the bus, timers, other ECUs",
      "Trace: timestamped program/data flow, OS-aware task view",
      "GPIO toggle at ISR entry/exit → scope / logic analyzer",
      "RAM timestamp buffer, run-mode memory access",
      "Freeze peripherals/watchdog on halt when you must stop"
    ],
    answer: "A breakpoint stops the core, but the world keeps going: the CAN bus keeps sending, timers may keep counting, the watchdog runs, and the other ECU times out. So halting changes timing — a race disappears, or you get new failures that don't exist in reality. For timing I switch to <strong>non-intrusive</strong> methods. First choice is <strong>trace</strong>: Nexus program and data trace record the execution with timestamps while the target runs, and afterwards I can see function durations, the task and ISR sequence with OS-aware analysis, and exactly where timing broke. Second, <strong>GPIO toggling</strong>: set a pin at ISR entry and clear it at exit, then measure on an <strong>oscilloscope or logic analyzer</strong> together with the bus signal — that shows latency and jitter against the real signal. Third, light instrumentation: timestamps into a RAM buffer, or <strong>run-mode memory access</strong>, where the debugger reads variables while the CPU keeps running. When I do need to stop, I configure the debugger to freeze peripherals and the watchdog on halt. But for real timing behaviour I trust trace and the scope.",
    followups: ["What's the downside of adding instrumentation code?", "How does OS-aware trace help with AUTOSAR tasks?"]
  },

  {
    id: "debug-08",
    topic: "debug",
    type: "behavioral",
    q: "Tell me about the SENT timing defect you debugged with UDE.",
    tags: ["SENT", "SAE J2716", "UDE", "PLS", "Infineon", "ST", "timing defect", "input capture", "protocol debugging", "lỗi timing"],
    key: [
      "Reproduce and capture at pulse level",
      "Check against J2716: 56-tick sync, nibble 12–27 ticks",
      "UDE: capture/timer regs, clock, prescaler, decoded values",
      "Split HW vs SW; root cause + fix",
      "Failing case belongs in automated regression"
    ],
    answer: "In my AUTOSAR Classic role I diagnosed and fixed SENT timing and signal-behavior defects on ST and Infineon targets using UDE. The symptom was [fill: symptom, e.g. frames rejected, wrong nibble values, intermittent CRC errors]. I started by <strong>reproducing and observing</strong> the signal at pulse level: tick time after calibration, the 56-tick sync pulse, the status nibble and data nibbles of 12 to 27 ticks, the CRC nibble, and the optional pause pulse, all compared against SAE J2716 and the reference manual. Then in UDE I looked at the software side: the timer or capture registers, the configured peripheral clock and prescaler, and the decoded values in memory, to see whether what the driver computed matched what was on the wire. Comparing behaviour on the two target families helps separate a hardware or peripheral effect from a software bug. The root cause was [fill: root cause, e.g. clock/prescaler configuration, tick tolerance calculation, interrupt latency]. We fixed it by [fill: fix and how it was verified]. The lesson I took is that a case like this belongs in the automated regression, so it gets caught early next time.",
    followups: ["How do you know whether it's a hardware or software problem?", "How did you verify the fix?"]
  },

  {
    id: "debug-09",
    topic: "debug",
    type: "behavioral",
    q: "Walk me through how you debugged an integration failure in the BSW stack.",
    tags: ["integration", "BSW", "RH850", "EcuM", "BswM", "CanIf", "PduR", "Com", "Det", "TRACE32", "tích hợp", "gỡ lỗi"],
    key: [
      "Reproduce; diff against last good baseline",
      "Follow the chain layer by layer: EcuM → BswM → Com stack",
      "Breakpoints at layer boundaries; check Det errors",
      "Evidence to the owning BSW team, agree fix",
      "Re-verify, add regression check"
    ],
    answer: "As a BSW integrator on RH850 D3, D4 and D5 I integrated and validated BswM, Diag, Can, Com, EcuM, OS, MCAL and Mem. A typical case: [fill: concrete failure, e.g. after a new delivery the ECU stopped transmitting a CAN message]. First I reproduce it on a known build and compare with the last good baseline, so I know which delivery or configuration change introduced it. Then I follow the chain layer by layer with TRACE32: did <code>EcuM</code> finish initialisation, did <code>BswM</code> request the communication mode, is the CAN controller actually started in the MCAL, does <code>CanIf</code> and <code>PduR</code> receive the PDU, is <code>Com</code> triggering the transmission. I put breakpoints at the layer boundaries and check the <strong>Det</strong>, because it usually tells you exactly which module rejected a call and why. The root cause was [fill: root cause, e.g. configuration mismatch between two modules, init order]. Because it crossed component boundaries, I brought the evidence — the failing call, register dumps, trace — to the owning BSW team, we agreed on the fix, and I re-verified it on the integrated build. [fill: whether a regression check was added and where]",
    followups: ["How do you handle disagreement with a component team about whose bug it is?", "What is Det and why is it useful during integration?"]
  },

  {
    id: "debug-10",
    topic: "debug",
    type: "theory",
    q: "What is your systematic approach to troubleshooting a defect?",
    tags: ["troubleshooting", "root cause analysis", "RCA", "methodology", "bisect", "reproduce", "isolate", "hypothesis", "phân tích nguyên nhân"],
    key: [
      "Reproduce reliably: version, config, HW, steps",
      "Collect facts: logs, traces, Det, what changed",
      "Isolate: bisect builds, swap HW, VECU vs target",
      "One hypothesis at a time, predict the observation",
      "Verify, fix root cause, regression test, document"
    ],
    answer: "I follow a simple loop. <strong>Reproduce</strong>: get a reliable reproduction with a known software version, configuration, hardware and steps; if it's intermittent, raise the rate with loops, stress or specific timing. <strong>Collect facts</strong>: logs, bus traces, Det errors, register and memory state, and what changed since the last good build. <strong>Isolate</strong>: shrink the search space — bisect builds or config changes, swap the board, run the same software on VECU and on target to split hardware from software, remove components until the problem disappears. <strong>Hypothesize</strong> one cause at a time and predict what I should see if it's true. <strong>Verify</strong> with a targeted experiment — a watchpoint, a trace, a forced fault — instead of guessing fixes. Once the root cause is confirmed, I fix it, prove the fix with the original reproduction and add a regression test. Finally I write it down in the ticket: symptom, root cause, fix, evidence. The two mistakes I try to avoid are changing several things at once, and stopping at the symptom instead of the root cause.",
    followups: ["What do you do when you can't reproduce the issue?", "How do you decide it's really the root cause?"]
  },

  {
    id: "debug-11",
    topic: "debug",
    type: "practical",
    q: "How do you debug failures on an Embedded Linux or QNX target?",
    tags: ["Linux", "QNX", "gdb", "gdbserver", "remote debugging", "journalctl", "slog2info", "core dump", "R-Car", "Raspberry Pi", "gỡ lỗi từ xa"],
    key: [
      "Logs and service state first (journalctl / slog2info)",
      "Process running? Ports, network path between nodes",
      "Crash: core dump, analyse on host",
      "Live: gdbserver on target, cross-gdb + sysroot on host",
      "QNX: pidin, pdebug / Momentics"
    ],
    answer: "On the AUTOSAR Adaptive side I validated the stack on Raspberry Pi 4, R-Car, QNX and Embedded Linux, and isolated failures using process and service handling, networking, remote debugging and log analysis. On Linux I start with logs and service state — <code>systemctl status</code>, <code>journalctl</code>, the application logs — then check whether the process is running, which ports it listens on, and whether the network path between the nodes works. For crashes I enable core dumps and analyse them on the host with the unstripped binary. For live debugging I run <code>gdbserver</code> on the target and connect a cross <code>gdb</code> from the host, with the sysroot set so shared libraries resolve. On QNX the ideas are the same with QNX tools: <code>slog2info</code> for system logs, <code>pidin</code> for processes and threads, and remote debugging through <code>pdebug</code> or Momentics. A concrete example: [fill: one system-level failure you isolated, e.g. a service not found because of network or configuration].",
    code: "# on target\n" +
          "gdbserver :2345 ./my_service\n" +
          "# on host\n" +
          "aarch64-linux-gnu-gdb build/my_service\n" +
          "(gdb) set sysroot ./sysroot\n" +
          "(gdb) target remote 192.168.1.20:2345\n" +
          "(gdb) break main\n" +
          "(gdb) continue",
    lang: "text",
    followups: ["How do you debug a service that crashes only at boot?", "How is QNX different from Linux for debugging?"]
  },

  {
    id: "debug-12",
    topic: "debug",
    type: "practical",
    q: "How do you use CANoe when testing or debugging an ECU?",
    tags: ["CANoe", "Vector", "trace window", "Interactive Generator", "IG", "rest-bus simulation", "BLF", "test module", "logging", "mô phỏng bus"],
    key: [
      "Trace window: frames, timestamps, DBC/ARXML decoding, filters",
      "Logging to BLF for replay / offline analysis",
      "IG for quick manual or cyclic stimuli",
      "Simulation nodes = rest-bus simulation",
      "Test modules + reports; COM API for automation"
    ],
    answer: "CANoe is part of my test toolchain; I used it for [fill: what you used CANoe for, e.g. monitoring and logging CAN during MCAL/BSW tests, simulating the rest of the bus]. The pieces I rely on: the <strong>Trace window</strong> to see frames with timestamps, decoded against the DBC or ARXML, with filters; <strong>logging</strong> to BLF so a failure can be replayed and analysed later; the <strong>Interactive Generator</strong> to send a frame manually or cyclically for a quick stimulus; <strong>simulation nodes</strong> that model the other ECUs, so the ECU under test sees the traffic it expects; and <strong>test modules</strong> for automated test cases with pass/fail reports. There's also the diagnostic console for UDS requests. When I debug a communication problem I start in the trace: is the frame there, with the right ID, DLC and cycle time, are there error frames — then I correlate the timestamps with what TRACE32 shows on the ECU side. For automation, CANoe exposes a COM interface, so a Python harness can load a configuration, start measurement and run test modules.",
    followups: ["How would you run CANoe in a CI pipeline?", "What is rest-bus simulation and why do you need it?"]
  },

  {
    id: "debug-13",
    topic: "debug",
    type: "practical",
    q: "How do you troubleshoot CAN problems like missing ACK, bus-off, or wrong bit timing?",
    tags: ["CAN", "ACK error", "bus-off", "error passive", "TEC", "REC", "bit timing", "sample point", "termination", "CanSM", "lỗi CAN"],
    key: [
      "No ACK: lone node, bitrate mismatch, transceiver standby, wiring",
      "Error passive TEC/REC ≥ 128; bus-off TEC > 255",
      "Bit timing: same bitrate, sample point ~87.5%",
      "Termination: ~60 Ω CAN_H–CAN_L, power off",
      "ECU side: clock tree, CAN regs, pin mux, CanSM recovery"
    ],
    answer: "I go from the physical layer upward. <strong>No ACK</strong>: the transmitter sees nobody acknowledging. Usually it's the only active node, the others run a different bitrate, the transceiver is still in standby, or the wiring is wrong. The transmit error counter climbs and the node goes error passive at 128. <strong>Bus-off</strong>: the transmit error counter went above 255 and the controller disconnected itself. In AUTOSAR, CanSM handles the recovery, so I check the controller status and error counters in the debugger and whether recovery is configured correctly. <strong>Bit timing</strong>: all nodes must agree on the bitrate and have a compatible sample point, typically around 87.5% in automotive. A wrong prescaler or peripheral clock shows up as stuff or form errors, sometimes only on longer harnesses. <strong>Termination</strong>: with power off I expect about 60 ohms between CAN_H and CAN_L. In CANoe I look for error frames and which node sends them, and scope the differential signal if needed. On the ECU side I verify the clock, the CAN controller bit-timing registers against the reference manual, and the pin muxing to the transceiver.",
    followups: ["What's the difference between error active and error passive?", "What changes for CAN FD bit timing?"]
  },

  {
    id: "debug-14",
    topic: "debug",
    type: "theory",
    bridge: true,
    q: "Have you used iSystem (winIDEA) debuggers?",
    tags: ["iSystem", "winIDEA", "TASKING", "BlueBox", "isystem.connect", "testIDEA", "TRACE32", "UDE", "debugger"],
    key: [
      "Honest: not hands-on; used TRACE32 and UDE",
      "iSystem now TASKING: BlueBox HW + winIDEA IDE",
      "Same operations: flash, BPs, watchpoints, trace, profiling",
      "isystem.connect API ≈ TRACE32 Remote API",
      "Learn workspace setup + API, method unchanged"
    ],
    answer: "Not hands-on — my debugger experience is Lauterbach TRACE32 on RH850 and UDE on ST and Infineon targets. But the concepts transfer directly. iSystem, now part of TASKING, has the BlueBox hardware and the <strong>winIDEA</strong> IDE: you create a workspace for the target, connect over the debug port, download the ELF, and then use breakpoints, watchpoints, memory and register views, trace and profiling — the same operations I do in TRACE32. For automation there's the <strong>isystem.connect</strong> API for Python, comparable to the TRACE32 Remote API, and testIDEA for running tests on target. So what I'd need to learn is the tool-specific part: workspace and debug-port configuration, how trace is set up, and the script API. The debugging method — read the exception cause, walk the call stack, use data breakpoints, move to trace for timing — stays exactly the same. With a working project configuration I'd expect to be productive quickly.",
    followups: ["What would you check first when connecting to a new target?", "How would you automate a debugger for CI?"]
  },

  {
    id: "debug-15",
    topic: "debug",
    type: "theory",
    bridge: true,
    q: "What's the difference between CANalyzer and CANoe?",
    tags: ["CANalyzer", "CANoe", "Vector", "bus analysis", "simulation", "rest-bus", "test module", "phân tích bus"],
    key: [
      "CANalyzer: observe, log, filter, decode, simple send",
      "CANoe: + node/rest-bus simulation, test modules with verdicts",
      "CANalyzer observes; CANoe simulates and tests",
      "I used CANoe, so CANalyzer features are familiar"
    ],
    answer: "CANalyzer is essentially the <strong>analysis</strong> subset: you observe, log, filter and decode bus traffic, and you can send frames with the Interactive Generator or simple CAPL. CANoe adds everything for <strong>development and testing</strong>: simulating whole networks with multiple simulation nodes, rest-bus simulation, and test modules with verdicts and reports. Panels, diagnostics and the automation interface exist in both, depending on edition; the real difference is simulation and testing. CANoe is what I have in my toolchain, so CANalyzer wouldn't be new to me — the trace, logging and database handling are the same. A short way to put it: CANalyzer observes the bus, CANoe simulates and tests the network. In an integration role I'd use the CANalyzer-level features for a quick look at a bench, and CANoe when the ECU needs a realistic environment or I want automated, repeatable tests with a report.",
    followups: ["Where does CANape fit next to these two?"]
  },

  {
    id: "debug-16",
    topic: "debug",
    type: "theory",
    bridge: true,
    q: "Have you worked with CANape? What is it used for?",
    tags: ["CANape", "XCP", "A2L", "measurement", "calibration", "DAQ", "ASAM", "Vector", "hiệu chuẩn"],
    key: [
      "Honest: haven't used CANape",
      "Measurement and calibration over XCP",
      "A2L: address, type, conversion, limits",
      "Polling vs DAQ lists; calibrate in RAM (pages)",
      "Closest in my work: TRACE32 run-mode variable access",
      "CI: A2L must match the ELF of that build"
    ],
    answer: "I haven't used CANape, and I want to be clear about that. I understand the concept: it's a <strong>measurement and calibration</strong> tool. It talks to the ECU over <strong>XCP</strong>, on CAN, CAN FD or Ethernet, and uses an <strong>A2L</strong> file that describes measurement variables and calibration parameters: address, data type, conversion formula and limits. You can poll variables, or configure DAQ lists so the ECU sends selected signals synchronously with a task event, and you can change parameters in RAM at runtime using working and reference pages. The closest thing in my experience is reading and writing variables with TRACE32 in run mode — a similar goal, but through the debug port instead of a communication protocol. One practical point I'd watch in CI: the A2L addresses must match the ELF of that exact build, otherwise CANape shows wrong values. So updating the A2L should be part of the build, and it should be stored with the build artifacts.",
    followups: ["What is the difference between polling and DAQ in XCP?", "Why is XCP a security concern on a production ECU?"]
  },

  {
    id: "debug-17",
    topic: "debug",
    type: "practical",
    bridge: true,
    q: "Do you know CAPL? Write a simple example.",
    tags: ["CAPL", "CANoe", "on message", "on timer", "output", "setTimer", "event-driven", "test module", "Vector", "lập trình CAPL"],
    key: [
      "Honest: scripting mainly Python; I know the event model",
      "C-like, no main: on start / on message / on timer / on key",
      "output(), setTimer(), cancelTimer(), this, write()",
      "Test modules: testWaitForMessage, testStepPass/Fail",
      "Classic: cyclic send + response timeout"
    ],
    answer: "My scripting was mainly Python, not CAPL, but I know the event model. CAPL is C-like and runs inside CANoe or CANalyzer. There's no <code>main</code>; you write <strong>event handlers</strong>: <code>on start</code>, <code>on message</code> for a received frame, <code>on timer</code>, <code>on key</code>, <code>on signal</code>. Inside them you use <code>output()</code> to send a message, <code>setTimer()</code> and <code>cancelTimer()</code> for timing, <code>this</code> to access the received frame, and <code>write()</code> to log. For automated tests, test modules give you test cases with functions like <code>testWaitForMessage</code> and <code>testStepPass</code> or <code>testStepFail</code>. The typical example is what I show here: a node that sends a cyclic message every 100 ms and supervises a response with a 500 ms timeout. Since I've written a lot of event-driven embedded code and Python test automation, writing CAPL is mostly learning the API, not the concepts.",
    code: "variables {\n" +
          "  message TCU_Status msgStatus;   // from DBC\n" +
          "  msTimer tCycle;\n" +
          "  msTimer tTimeout;\n" +
          "  int aliveCnt = 0;\n" +
          "}\n" +
          "on start {\n" +
          "  setTimer(tCycle, 100);\n" +
          "  setTimer(tTimeout, 500);\n" +
          "}\n" +
          "on timer tCycle {\n" +
          "  msgStatus.AliveCounter = aliveCnt;\n" +
          "  aliveCnt = (aliveCnt + 1) % 16;\n" +
          "  output(msgStatus);\n" +
          "  setTimer(tCycle, 100);         // one-shot timer, re-arm\n" +
          "}\n" +
          "on message Gateway_Response {\n" +
          "  cancelTimer(tTimeout);\n" +
          "  setTimer(tTimeout, 500);       // restart supervision\n" +
          "}\n" +
          "on timer tTimeout {\n" +
          "  write(\"ERROR: Gateway_Response timeout\");\n" +
          "  setTimer(tTimeout, 500);       // keep supervising\n" +
          "}",
    lang: "c",
    followups: ["How would you turn this into a test case with a verdict?", "What does 'this' refer to in an on message handler?"]
  },

  /* ===================== TESTING ===================== */

  {
    id: "testing-01",
    topic: "testing",
    type: "theory",
    q: "Explain the test levels and how they map to the V-model.",
    tags: ["V-model", "test levels", "unit test", "integration test", "system test", "ASPICE", "SWE.4", "SWE.5", "SWE.6", "mức kiểm thử"],
    key: [
      "Each right-side level verifies the matching left-side level",
      "Unit ↔ detailed design (SWE.4), dependencies stubbed",
      "Component/integration ↔ architecture, interfaces (SWE.5)",
      "SW qualification ↔ SW requirements (SWE.6); system SYS.4/5",
      "My levels: MCAL unit/component, BSW integration, ARA system"
    ],
    answer: "The left side of the V goes from system requirements to architecture, software requirements and detailed design down to code; each level on the right verifies the matching level on the left. <strong>Unit tests</strong> verify one unit against its detailed design, in isolation with dependencies stubbed — ASPICE SWE.4. <strong>Component and integration tests</strong> verify that units and components work together through their interfaces, against the architecture — SWE.5. <strong>Software qualification tests</strong> check the software requirements on the integrated software — SWE.6 — and system integration and qualification tests, SYS.4 and SYS.5, use the real ECU and environment. I've worked at several of these levels: I designed and executed MCAL unit and component validation for digital I/O, analog, timer, communication and watchdog drivers on target hardware and VECU; as a BSW integrator I worked at integration level across BswM, Diag, Can, Com, EcuM, OS, MCAL and Mem; and on AUTOSAR Adaptive I did system-level validation. The point is that each level has its own test basis and catches different defects, so you don't try to prove everything at one level.",
    followups: ["Which defects are cheapest to catch at unit level?", "What's the test basis for an integration test?"]
  },

  {
    id: "testing-02",
    topic: "testing",
    type: "theory",
    q: "What's the difference between white-box, grey-box and black-box testing? Give embedded examples.",
    tags: ["white-box", "grey-box", "black-box", "structural testing", "coverage", "requirement-based", "kiểm thử hộp trắng", "hộp đen"],
    key: [
      "White: based on code structure, measured by coverage",
      "Grey: know architecture/interfaces, observe internals",
      "Black: requirements + external I/O only",
      "White = Cantata unit test; grey = CAN in + TRACE32 read",
      "Black = bench test via bus/UDS"
    ],
    answer: "<strong>White-box</strong> testing is based on the code structure: I know the branches and conditions and design tests to exercise them, measured by coverage. Unit tests of an MCAL function in Cantata, measured with statement and branch coverage, and MC/DC where the ASIL requires it, are a typical example. <strong>Grey-box</strong> means I know the architecture and interfaces and can observe some internal state, but I test through interfaces. For instance, send a CAN frame into the ECU and read an internal state variable with TRACE32 to confirm the module reached the right mode — very common at component and integration level. <strong>Black-box</strong> uses only requirements and external inputs and outputs: stimulate the ECU on the bench over the bus or UDS and check the observable response, without looking inside. In practice you combine them: requirement-based black-box cases define what must be tested, and white-box coverage shows what those cases missed. Grey-box observation is what makes failures debuggable, because you can see where in the chain it went wrong.",
    followups: ["Why isn't 100% coverage the same as good testing?", "Which box type fits an integration test best?"]
  },

  {
    id: "testing-03",
    topic: "testing",
    type: "practical",
    q: "How do you design test cases from a requirement?",
    tags: ["requirement-based testing", "test design", "test case", "traceability", "negative test", "decision table", "state transition", "thiết kế test"],
    key: [
      "Check testability first; clarify ambiguities early",
      "Identify inputs, outputs, preconditions, timing",
      "Apply EP/BVA, state transition, decision tables",
      "Negative cases + fault injection",
      "Precondition / stimulus / expected / requirement ID",
      "Bidirectional check: no uncovered reqs, no orphan tests"
    ],
    answer: "I start by analysing the requirement: is it testable and unambiguous, what are the inputs, outputs, preconditions and timing? If something is unclear, I raise it with the requirement owner before writing tests — much cheaper than a wrong test. Then I derive test conditions with techniques: equivalence classes and boundaries for value ranges, state-transition tests for mode logic, decision tables for combinations, and negative cases — what must happen on invalid input or a failed dependency, often via fault injection. Each test case gets a clear precondition, stimulus, expected result and the requirement ID. Then I check both directions: every requirement has tests, and every test traces to a requirement. For example, for 'the driver shall report an error if the conversion doesn't complete within the configured time', I'd test normal completion, completion just inside the limit, a forced timeout through a stub, and the correct error report. In my MCAL and BSW role I owned requirement analysis, requirement-to-test mapping and test evidence, so this loop was daily work.",
    followups: ["What do you do with a requirement that isn't testable?", "How many test cases per requirement is enough?"]
  },

  {
    id: "testing-04",
    topic: "testing",
    type: "practical",
    q: "Explain equivalence partitioning and boundary value analysis with an example.",
    tags: ["equivalence partitioning", "EP", "boundary value analysis", "BVA", "SENT", "pytest", "parametrize", "phân vùng tương đương", "giá trị biên"],
    key: [
      "EP: one representative per class treated the same",
      "BVA: test at and around each edge (off-by-one)",
      "SENT nibble: 12–27 ticks → values 0–15",
      "Test 11/12/13 and 26/27/28 + mid value",
      "Invalid classes must be rejected, not decoded",
      "Add type limits: 0, max of type"
    ],
    answer: "Equivalence partitioning splits the input domain into classes the software should treat the same way, so one representative per class is enough. Boundary value analysis then tests at and around the edges, because off-by-one errors live there. Take a SENT data nibble: its length is 12 to 27 ticks, representing values 0 to 15. The partitions are below range, valid, and above range. Boundaries are 11, 12, 13 on the low side and 26, 27, 28 on the high side, plus a mid value. Invalid lengths must be flagged as errors, not decoded. In Pytest I write that as a parametrized test, so each boundary shows up as its own case in the report. The same thinking applies to ADC channel IDs, timer periods, buffer lengths or configured timeouts. I also add the limits of the data type — 0 and the maximum value — because the range check can be correct while the overflow handling isn't.",
    code: "import pytest\n" +
          "from sent_decoder import decode_nibble, NibbleError   # illustrative module\n\n" +
          "@pytest.mark.parametrize(\"ticks, expected\", [\n" +
          "    (12, 0), (13, 1), (20, 8), (26, 14), (27, 15),\n" +
          "])\n" +
          "def test_valid_nibble(ticks, expected):\n" +
          "    assert decode_nibble(ticks) == expected\n\n" +
          "@pytest.mark.parametrize(\"ticks\", [0, 11, 28, 255])\n" +
          "def test_invalid_nibble_rejected(ticks):\n" +
          "    with pytest.raises(NibbleError):\n" +
          "        decode_nibble(ticks)",
    lang: "python",
    followups: ["How would you handle tick tolerance in the boundaries?", "When is a decision table better than EP?"]
  },

  {
    id: "testing-05",
    topic: "testing",
    type: "practical",
    q: "What is fault injection and how have you used it?",
    tags: ["fault injection", "negative testing", "error handling", "robustness", "stub", "E_NOT_OK", "Det", "CRC error", "SENT", "chèn lỗi"],
    key: [
      "Deliberately create the errors the SW must handle",
      "Unit: stub returns error / timeout; invalid params",
      "Integration/protocol: bad CRC, out-of-range, missing frames",
      "Debugger: force variable/register to reach hard paths",
      "Rule: 'if X fails → Y' — create X, prove Y",
      "Also closes error-branch coverage gaps"
    ],
    answer: "Fault injection means deliberately creating the error conditions the software must handle, because the happy path alone proves little about robustness. I've used it at several levels. At unit level I make a stub return an error — a hardware status reporting a timeout, a lower layer returning <code>E_NOT_OK</code> — and check the error path: correct return value, Det or error report, state cleaned up. I also inject invalid parameters: out-of-range channel, null pointer, module not initialised. At component and protocol level I corrupt data on the interface — wrong CRC, out-of-range values, missing or late frames; for SENT that means malformed frames, wrong nibble lengths or timing deviations. With a debugger you can also force a variable or register value to reach a path that's hard to trigger naturally. My rule: for every requirement of the form 'if X fails, the system shall do Y', I create X on purpose and show Y in the evidence. It helps coverage too, because error branches are usually the ones still uncovered. [fill: one concrete defect found through fault injection].",
    followups: ["How do you inject a hardware fault when you have no hardware?", "Tell me about a bug fault injection found."]
  },

  {
    id: "testing-06",
    topic: "testing",
    type: "theory",
    q: "What's the difference between a mock, a stub and a fake? How do you isolate MCAL/BSW dependencies?",
    tags: ["mock", "stub", "fake", "test double", "dependency isolation", "MCAL", "BSW", "unit test", "C", "cô lập phụ thuộc"],
    key: [
      "Stub: canned return values → control inputs (state)",
      "Mock: also verifies calls, count, args, order (behaviour)",
      "Fake: simple working implementation (RAM NVM, fake CAN queue)",
      "MCAL: stub register access / lower layer API",
      "Avoid over-mocking: brittle tests"
    ],
    answer: "All three replace a real dependency so the unit can be tested in isolation. A <strong>stub</strong> returns canned values — I control what the unit sees, for example what a register read returns. A <strong>mock</strong> also verifies the interaction: was it called, how many times, with which arguments, in which order. That's what I need when the requirement is about behaviour, like 'the driver shall write this register' or 'Det shall be called with this error ID'. A <strong>fake</strong> is a lightweight working implementation, like an in-RAM NVM block or a simulated CAN transmit queue, useful when many tests need realistic behaviour. For MCAL and BSW this is essential: a driver's dependencies are hardware registers and lower layers, so I stub the register access or the lower module's API and record calls where behaviour matters. The snippet shows the idea in plain C. I avoid over-mocking, though — if tests assert every internal call, every refactoring breaks them even when behaviour is unchanged.",
    code: "/* UUT calls Hw_ReadReg(); the test links this stub instead */\n" +
          "static uint32 stub_ret;\n" +
          "static uint8  stub_calls;\n" +
          "static uint32 stub_last_addr;\n\n" +
          "uint32 Hw_ReadReg(uint32 addr)          /* stub + call recording */\n" +
          "{\n" +
          "    stub_calls++;\n" +
          "    stub_last_addr = addr;\n" +
          "    return stub_ret;\n" +
          "}\n\n" +
          "void test_Adc_ReadChannel_masks_12bit(void)\n" +
          "{\n" +
          "    stub_ret = 0x000F0ABCu;  stub_calls = 0u;\n" +
          "    uint16 v = Adc_ReadChannel(2u);\n" +
          "    TEST_ASSERT_EQUAL_HEX16(0x0ABCu, v);\n" +
          "    TEST_ASSERT_EQUAL(1u, stub_calls);\n" +
          "    TEST_ASSERT_EQUAL_HEX32(ADC_DR_ADDR(2u), stub_last_addr);\n" +
          "}",
    lang: "c",
    followups: ["What's the risk of over-mocking?", "How do you stub a register access that is a macro?"]
  },

  {
    id: "testing-07",
    topic: "testing",
    type: "theory",
    q: "Explain statement, branch and MC/DC coverage.",
    tags: ["coverage", "statement coverage", "branch coverage", "decision coverage", "MC/DC", "structural coverage", "độ phủ", "độ phủ nhánh"],
    key: [
      "Statement: every statement executed",
      "Branch/decision: every decision true and false",
      "MC/DC: each condition shown to independently flip outcome",
      "if (A && B): MC/DC = TT, FT, TF (n+1)",
      "Coverage shows what's untested, not correctness"
    ],
    answer: "<strong>Statement coverage</strong> means every statement was executed at least once. <strong>Branch or decision coverage</strong> means every decision took both the true and the false outcome — it catches the missing else case that statement coverage can miss. <strong>MC/DC</strong>, modified condition/decision coverage, adds that each individual condition in a decision must be shown to independently change the outcome: you need a pair of tests that differ only in that condition and give different results. Take <code>if (A &amp;&amp; B)</code>. One test with both true can give full statement coverage if there's no else. Branch coverage needs one true and one false outcome. MC/DC needs three: true-true, false-true and true-false — A flips the result between the first two, B between the first and third. In general that's at least n+1 tests for n conditions, instead of 2 to the power n for all combinations. Important to remember: coverage tells you what you haven't tested; it doesn't tell you the tested behaviour is correct. That comes from requirement-based expected results.",
    followups: ["How does short-circuit evaluation affect MC/DC?", "What's the difference between masking and unique-cause MC/DC?"]
  },

  {
    id: "testing-08",
    topic: "testing",
    type: "practical",
    q: "Why is MC/DC expected for ASIL D, and how do you actually reach it?",
    tags: ["MC/DC", "ASIL D", "ISO 26262", "ISO 26262-6", "coverage gap", "dead code", "justification", "functional safety", "an toàn chức năng"],
    key: [
      "ISO 26262-6: MC/DC highly recommended at ASIL D (unit level)",
      "Proves each condition matters → hidden logic errors",
      "Requirement-based tests first, then measure",
      "Gap analysis: missing test / dead code / defensive code",
      "Justify unreachable code; simplify complex conditions",
      "Measure with the right compiler/target setup"
    ],
    answer: "Strictly speaking, ISO 26262 doesn't make it mandatory: it's '++', highly recommended, so skipping it needs a documented rationale, and in practice assessors expect it. ISO 26262-6 recommends structural coverage at unit level by ASIL: statement coverage highly recommended for A and B, branch for B to D, and <strong>MC/DC highly recommended for ASIL D</strong>. The reason: in the most critical code a wrong logical decision can cause a hazard, and branch coverage doesn't prove that each sub-condition actually influences the result — a condition could be wrong or redundant and nobody would notice. MC/DC forces that evidence. How to reach it: first write requirement-based tests, including boundaries and fault injection, then measure — coverage should be a check, not the goal. Then do <strong>gap analysis</strong> on each uncovered condition: is it a missing test, then add a targeted case; dead code, then remove it; deactivated code, like an unused variant or calibration path, then justify it rather than remove it; or defensive code that can't be reached in normal conditions, then use fault injection or stubs to reach it, or write a documented justification. Very complex conditions are a design smell — splitting them makes both the code and the MC/DC easier. On my project the coverage targets were [fill: coverage targets used on your project, e.g. statement/branch/MC/DC per module ASIL].",
    followups: ["What counts as an acceptable justification for uncovered code?", "Does 100% MC/DC mean the code is safe?"]
  },

  {
    id: "testing-09",
    topic: "testing",
    type: "practical",
    q: "How did you use Cantata for unit and component testing?",
    tags: ["Cantata", "QA Systems", "unit test", "component test", "stub", "wrapper", "expected call sequence", "coverage", "MC/DC", "MCAL"],
    key: [
      "Generated C test script skeleton per unit",
      "Set inputs/globals, call, check macros",
      "Stubs replace calls; wrappers intercept the real function",
      "Expected call sequence = mock-style verification",
      "Stubs/wrappers are fault-injection points",
      "Coverage report drives gap analysis"
    ],
    answer: "I used Cantata for unit and component testing of C code in my MCAL validation work, together with Pytest and ECU-Test at other levels. The workflow: Cantata analyses the source and generates a <strong>test script</strong> in C for the unit, with a test case skeleton per function. In each test case I set parameters and global data, call the function, and check outputs and globals with check macros. For dependencies there are two mechanisms: <strong>stubs</strong> replace a called function entirely, and <strong>wrappers</strong> intercept a call to the real function so I can inspect or modify parameters and return values while still running the real code. Both are tied to an <strong>expected call sequence</strong>, so the test fails if the unit calls the wrong function, in the wrong order or the wrong number of times. Stubs and wrappers are also my fault-injection point — for example, return an error on the second call. Cantata instruments the code for <strong>coverage</strong>, including statement, decision and MC/DC, and the report shows exactly which conditions are still missing. [fill: host or target execution setup and scale, e.g. number of modules or test cases].",
    followups: ["When would you use a wrapper instead of a stub?", "How do you run Cantata tests on target?"]
  },

  {
    id: "testing-10",
    topic: "testing",
    type: "theory",
    bridge: true,
    q: "Have you used VectorCAST? How would you get started with it?",
    tags: ["VectorCAST", "Cantata", "unit test", "test harness", "environment", "stub", "coverage", "clicast", "Vector", "kiểm thử đơn vị"],
    key: [
      "Honest: not used; I used Cantata, same model",
      "Environment: UUT files, stub policy, compiler",
      "Harness (driver + stubs) auto-generated",
      "Test cases: inputs, stub returns, expected values",
      "Coverage up to MC/DC; clicast / Manage for CI",
      "Learn tool specifics, not the method"
    ],
    answer: "I haven't used VectorCAST — my unit test tool was Cantata. But they follow the same model, so I'd be learning a tool, not a method. In VectorCAST each unit under test lives in an <strong>environment</strong>: you choose the source files, how dependencies are handled — stub all, stub selected, or use real code — and the compiler settings. The tool then <strong>generates the harness</strong>: a test driver and stubs, and it instruments the code under test. I define <strong>test cases</strong> by setting parameters, globals and stub return values and the expected outputs; for complex logic there's user code. Coverage goes up to MC/DC, and the harness can be built with the cross-compiler and run on target through a debugger, which catches compiler and CPU differences. For CI there's the command-line interface, <code>clicast</code>, and VectorCAST/Manage for running many environments as a regression, with reports for Jenkins. Coming from Cantata, the concepts map one to one: test script to test case, stubs and wrappers to stubs, call sequence checks, coverage analysis. I'd need a short ramp-up on the tool specifics.",
    followups: ["How would you integrate VectorCAST into a Jenkins pipeline?", "What's change-based testing?"]
  },

  {
    id: "testing-11",
    topic: "testing",
    type: "practical",
    q: "Which Pytest features do you use for embedded test automation?",
    tags: ["pytest", "Python", "fixture", "conftest", "parametrize", "markers", "junitxml", "plugins", "test automation", "tự động hoá test"],
    key: [
      "Fixtures with scope: connect/flash once, clean state per test",
      "conftest.py: shared fixtures + CLI options",
      "parametrize: data-driven boundaries/configs",
      "Markers: smoke, regression, hw_only → select with -m",
      "--junitxml for CI; pytest-html, xdist plugins",
      "Attach logs/traces to failures"
    ],
    answer: "Pytest was one of my main tools for test logic and automation. The features I rely on: <strong>fixtures</strong> for setup and teardown — connect to the target or VECU, flash, open the bus channel — with scopes, so an expensive connection is created once per session and each test still starts from a clean state. Shared fixtures and command-line options live in <strong>conftest.py</strong>. <strong>parametrize</strong> turns one test function into many data-driven cases, which is how I cover boundaries and configurations without copy-paste. <strong>Markers</strong> tag tests — smoke, regression, hardware-only, slow — so the pipeline selects with <code>-m</code>. <code>pytest.raises</code> covers expected errors. For reporting, <code>--junitxml</code> produces results that a CI system like Azure Pipelines can publish, and plugins like pytest-html or pytest-xdist help with reports and parallel runs where resources allow. It's also worth adding a hook that attaches logs and bus traces to failed tests, so the evidence is there without a rerun. The snippet shows a session fixture with a command-line option to choose the target.",
    code: "# conftest.py\n" +
          "import pytest\n" +
          "from harness import VecuTarget, HwTarget   # project-specific wrappers\n\n" +
          "def pytest_addoption(parser):\n" +
          "    parser.addoption(\"--target\", default=\"vecu\", choices=[\"vecu\", \"hw\"])\n\n" +
          "@pytest.fixture(scope=\"session\")\n" +
          "def ecu(request):\n" +
          "    kind = request.config.getoption(\"--target\")\n" +
          "    ecu = VecuTarget() if kind == \"vecu\" else HwTarget.from_config(\"bench.yaml\")\n" +
          "    ecu.connect()\n" +
          "    yield ecu\n" +
          "    ecu.disconnect()\n\n" +
          "# test_dio.py\n" +
          "import pytest\n\n" +
          "@pytest.mark.smoke   # register in pytest.ini (markers = smoke: ...)\n" +
          "@pytest.mark.parametrize(\"level\", [0, 1])\n" +
          "def test_dio_write_read(ecu, level):\n" +
          "    ecu.dio_write(channel=3, level=level)\n" +
          "    assert ecu.dio_read(channel=3) == level",
    lang: "python",
    followups: ["What fixture scope would you use for flashing?", "How do you make Pytest results visible in CI?"]
  },

  {
    id: "testing-12",
    topic: "testing",
    type: "practical",
    q: "How do you keep the same test suite running on both VECU and real target hardware?",
    tags: ["VECU", "target hardware", "hardware abstraction", "test framework", "pytest", "markers", "SIL", "shift-left", "trừu tượng phần cứng"],
    key: [
      "Tests talk to an interface, not to a tool",
      "Adapter per environment: VECU vs target (debugger, bus)",
      "Environment selected via config/CLI option",
      "Markers/capabilities skip HW-only tests on VECU",
      "Timing tolerances per environment",
      "Same test IDs → comparable results and evidence"
    ],
    answer: "In my MCAL work I executed validation on both target hardware and VECU, so this matters. The key is that <strong>tests talk to an interface, not to a tool</strong>. The test says 'write channel 3 high, read it back, expect high'; an adapter layer implements that for each environment — on VECU through the simulation API, on target through the debugger or the bus tools. The environment is selected by configuration or a command-line option, and fixtures build the right adapter, so the test files don't change. Not everything makes sense everywhere, so I tag tests with <strong>markers or capabilities</strong> — for example hardware-timing tests that are skipped on VECU with a clear reason instead of silently passing. Timing expectations get tolerances per environment, because VECU time and real time behave differently. Keeping the same test IDs on both sides means results are comparable and traceable to the same requirement. The payoff is big: most regression runs on VECU for fast feedback, and the target run confirms hardware-dependent behaviour. [fill: how your framework implemented the adapter layer].",
    followups: ["What kinds of tests would you never trust on VECU alone?", "How do you prevent the adapter layer from hiding bugs?"]
  },

  {
    id: "testing-13",
    topic: "testing",
    type: "practical",
    q: "How does ECU-Test work? Explain packages and configurations.",
    tags: ["ECU-Test", "ecu.test", "tracetronic", "package", "test bench configuration", "test configuration", "mapping", "test automation", "report"],
    key: [
      "Automation layer driving tools/HW via tool adapters",
      "Package = test case: steps, parameters, expectations",
      "Projects group packages into a run",
      "Test bench config (tools/ports) vs test config (ECU, ELF/DBC/A2L)",
      "Mapping decouples packages from tool details",
      "Step-level report = evidence"
    ],
    answer: "ECU-Test, from tracetronic, is an automation layer that sits on top of tools and hardware — it drives CANoe, debuggers, power supplies and others through tool adapters. The main artifact is the <strong>package</strong>: a test case built from test steps such as write a variable, send a signal, wait, and check an expectation, with parameters so the same package can run with different data. Packages are grouped into <strong>projects</strong> for a test run. The environment is split into two configurations: the <strong>test bench configuration</strong> describes which tools are connected and how, and the <strong>test configuration</strong> describes the ECU side — the software under test and its databases like ELF, DBC or A2L, plus global constants. Signals and variables are accessed through a <strong>mapping</strong>, so packages don't hard-code tool details. Because of that split, the same packages can run on another bench, or against a different environment, just by switching configurations. Results come as a report with a verdict per step, which is good evidence for traceability. I used ECU-Test for [fill: what you used ECU-Test for, e.g. component tests on target].",
    followups: ["How would you run ECU-Test from CI?", "How do you reuse one package for several variants?"]
  },

  {
    id: "testing-14",
    topic: "testing",
    type: "theory",
    q: "What can testing on a VECU catch, and what can it not catch compared to the real target?",
    tags: ["VECU", "virtual ECU", "SIL", "target hardware", "shift-left", "timing", "compiler differences", "vECU", "kiểm thử trên target"],
    key: [
      "VECU: logic, config, state machines, APIs, error handling",
      "Fast, parallel, CI-friendly, deterministic with virtual time",
      "Misses: real registers (virtual MCAL), interrupt latency, timing",
      "Misses: compiler/CPU effects, alignment, volatile, stack limits",
      "Misses: electrical/bus physical effects",
      "Most regression on VECU, focused set on target"
    ],
    answer: "A VECU runs the ECU software on the host, so it's great for early, fast testing: logic, configuration, state machines, API contracts between components, error handling and a lot of regression, without waiting for a bench. It scales in CI and, if it uses virtual time, it's deterministic. What it can't catch reliably is anything that depends on the <strong>real hardware and toolchain</strong>: peripheral register behaviour, because the MCAL is usually replaced by a virtual layer; real interrupt latency and timing; type sizes, alignment and endianness differences; target compiler optimisations, for example a missing <code>volatile</code>; real stack limits; and electrical effects on the bus. In my MCAL validation I ran tests on both target hardware and VECU, and that combination is the point: VECU gives breadth and fast feedback, the target confirms hardware-dependent behaviour and timing. So I'd push most regression to VECU on every change and keep a focused target set that covers exactly the hardware-related risks.",
    followups: ["How would you decide which tests must run on target?", "What is virtual time and why does it matter?"]
  },

  {
    id: "testing-15",
    topic: "testing",
    type: "theory",
    q: "Explain MIL, SIL, PIL and HIL. What's your experience with them?",
    tags: ["MIL", "SIL", "PIL", "HIL", "X-in-the-loop", "XIL", "VECU", "bench", "real-time simulator", "mô phỏng"],
    key: [
      "MIL: model; SIL: production code on host (VECU)",
      "PIL: target-compiled code on real CPU or ISS",
      "HIL: real ECU + real-time plant simulator, electrical I/O",
      "Right = more fidelity, less speed/scalability",
      "Honest: VECU + target benches, no full HIL rig",
      "Most tests on SIL in CI; HIL for I/O, timing, final integration"
    ],
    answer: "They're steps along the same chain. <strong>MIL</strong> tests the model of the algorithm. <strong>SIL</strong> runs the production C code compiled for the host — a host-compiled VECU is essentially SIL; a VECU that runs the target binary on an instruction-set simulator is closer to PIL. <strong>PIL</strong> runs target-compiled code on the real processor or an instruction-set simulator, which catches compiler and arithmetic issues. <strong>HIL</strong> connects the real ECU to a real-time simulator of its environment through electrical I/O and buses. Going to the right you gain fidelity but lose speed, parallelism and cost efficiency. To be honest about my experience: I worked with VECU and with real target hardware using debuggers, CANoe and ECU-Test, but I haven't operated a full HIL rig with plant models. The principles carry over: the test is only as good as the environment model, rigs are scarce so they need resource management and scheduling, and results must be reproducible. In a CI setup I'd run most tests on SIL or VECU for every change and reserve benches or HIL for what truly needs hardware — electrical I/O, real timing and final integration.",
    followups: ["What does a HIL system need that a VECU doesn't?", "How do you share a scarce bench across CI jobs?"]
  },

  {
    id: "testing-16",
    topic: "testing",
    type: "practical",
    q: "How do you deal with flaky tests?",
    tags: ["flaky test", "intermittent", "non-deterministic", "race condition", "CI", "quarantine", "retry", "test stability", "test chập chờn"],
    key: [
      "Dangerous: people start ignoring red results",
      "Classify: test bug / environment / real intermittent defect",
      "Loop it for a failure rate; logs on every failure",
      "Fix: wait on events, reset to known state, inject time",
      "Quarantine visibly with a ticket, never silently delete"
    ],
    answer: "A flaky test passes and fails without any code change. It's dangerous because people learn to ignore red results, and then a real failure gets ignored too. I don't just add a retry. First I classify it. Is it the <strong>test</strong> — fixed sleeps instead of waiting for a condition, dependence on test order, shared state not reset, timing tolerances that are too tight? The <strong>environment</strong> — a bench not reset properly, a dropped debugger connection, bus load from another node, a resource conflict in CI? Or a <strong>real intermittent product defect</strong>, like a race condition — the most important case not to hide. I run it in a loop to get a failure rate, collect logs and traces on each failure, and compare passing and failing runs. Typical fixes: wait on events with timeouts instead of sleeping, reset the target to a known state in the fixture, inject time instead of using the wall clock, and isolate shared resources. If it can't be fixed right away, I quarantine it visibly with a ticket so it doesn't block everyone, but it stays tracked.",
    followups: ["When is an automatic retry acceptable?", "How do you prove a flaky failure is a product bug?"]
  },

  {
    id: "testing-17",
    topic: "testing",
    type: "practical",
    q: "What regression test strategy would you set up for an ECU project in CI?",
    tags: ["regression testing", "CI", "smoke test", "nightly", "test selection", "impact analysis", "Azure Pipelines", "test pyramid", "kiểm thử hồi quy"],
    key: [
      "Per change: build, unit tests, quick VECU smoke",
      "Nightly: full suite on VECU + target benches",
      "Release: full requirement-based run + evidence",
      "Impact-based selection via traceability",
      "Every fixed bug gets a regression test",
      "Watch trends; keep the suite fast and stable"
    ],
    answer: "I'd layer it by feedback time. <strong>Per change</strong>: build the main variants, run unit tests for the affected modules and a short smoke on VECU — boot, init completes, key communication alive — so developers get feedback in minutes. <strong>Nightly</strong>: the full regression on VECU plus the target benches, including the slower hardware-dependent and timing tests. <strong>Release</strong>: the complete requirement-based run on the release candidate, with coverage and traceability evidence. To keep the per-change stage fast, I'd use impact-based selection — traceability from files or components to tests — while the nightly still runs everything to catch indirect effects. Every fixed defect gets a regression test, so it can't come back silently. And I watch trends: execution time, failure rate and flaky tests, because a slow or unstable suite stops being used. In my Adaptive role I integrated build, package and test workflows with Azure Pipelines and Conan, which is exactly the kind of setup where this layering pays off.",
    followups: ["How do you handle bench resources in parallel pipelines?", "What goes into a smoke test for an ECU?"]
  },

  {
    id: "testing-18",
    topic: "testing",
    type: "practical",
    q: "How do you ensure test evidence and traceability for ASPICE?",
    tags: ["ASPICE", "traceability", "bidirectional traceability", "test evidence", "requirement-to-test", "consistency", "review", "audit", "truy vết", "bằng chứng test"],
    key: [
      "Bidirectional: requirement ↔ test spec ↔ result",
      "Result tied to SW version, config, environment, tool versions",
      "Evidence: spec, logs, reports, coverage, review records",
      "Every failure → defect or justified deviation",
      "Automate links (test tags with req IDs)",
      "Evidence must come from the release candidate"
    ],
    answer: "ASPICE expects bidirectional traceability and consistency: requirements to test specification to test results, and back. In practice every test case carries the ID of the requirement it verifies, and every result is tied to the exact software version, configuration, test environment and tool versions. Evidence means another person can see what was tested, on what, with which result, and reproduce it: test specification, execution logs and reports, unit-level coverage reports, and review records. Every failed test must end in a defect ticket or a justified deviation. In my AUTOSAR Classic role I owned requirement analysis, traceability, requirement-to-test mapping, test evidence and review readiness. The lessons I took: automate the link from results back to requirements, for example by tagging tests with requirement IDs and generating the trace report, so it doesn't drift from reality; check both directions — requirements without tests and tests without requirements; and make sure the evidence comes from the release candidate, not an older build. The requirement management tool on my project was [fill: tool used for requirements and traceability].",
    followups: ["What would an assessor look for first?", "How do you handle a requirement change after testing is done?"]
  },

  {
    id: "testing-19",
    topic: "testing",
    type: "behavioral",
    q: "How do you decide that testing is sufficient?",
    tags: ["exit criteria", "test completion", "risk-based testing", "coverage target", "test plan", "release readiness", "tiêu chí dừng test"],
    key: [
      "Exit criteria defined up front in the test plan",
      "All requirements covered; failures resolved or accepted",
      "Coverage targets per ASIL met, gaps justified",
      "Risk-based depth: safety, complex, changed areas",
      "No open critical defects; stable regression",
      "Reviews done, evidence complete"
    ],
    answer: "You can never test everything, so 'sufficient' has to be defined before testing starts, in the test plan, not decided when time runs out. My criteria: every requirement is covered by at least one test and traced; all tests are executed on the release candidate and failures are either fixed or accepted with a documented deviation; the structural coverage targets for the ASIL are met at unit level, and remaining gaps are analysed and justified; there are no open critical or safety-relevant defects; and the regression is stable, not flaky. On top of that I apply <strong>risk-based depth</strong>: safety-relevant functions, complex logic, interfaces between components and recently changed areas get more negative tests, boundaries and fault injection than simple, stable code. Finally, test specifications and results are reviewed, so it's not just my own opinion. If the criteria aren't met and there's schedule pressure, my job is to make the residual risk visible to the project with facts, not to quietly lower the bar.",
    followups: ["What do you do if management wants to release with open failures?", "How does risk influence how many tests you write?"]
  },

  {
    id: "testing-20",
    topic: "testing",
    type: "practical",
    q: "A unit test passes on the host but fails on the target. What could be the reason?",
    tags: ["host vs target", "cross-compiler", "endianness", "alignment", "type size", "volatile", "undefined behavior", "stack", "Platform_Types", "khác biệt target"],
    key: [
      "Type sizes: int/long width differ",
      "Endianness, struct padding and alignment",
      "Undefined / implementation-defined behaviour",
      "Optimisation + missing volatile",
      "Smaller stack, different libc, uninitialised memory",
      "Run part of the suite on target; use Platform_Types"
    ],
    answer: "Usually the host hid something that's real on the target. Common causes: <strong>type sizes</strong> — <code>int</code> or <code>long</code> widths differ, so an overflow or a shift behaves differently; <strong>endianness</strong> when the code builds values from byte buffers; <strong>struct padding and alignment</strong>, including misaligned accesses that trap on the target; <strong>undefined or implementation-defined behaviour</strong>, like shifting negative numbers or signed overflow, which each compiler may treat differently; <strong>optimisation</strong> at target settings with a missing <code>volatile</code> on a register or shared variable; a much <strong>smaller stack</strong>; a different standard library; and <strong>uninitialised memory</strong> that happens to be zero on the host. I debug it by running the failing test on target under TRACE32, comparing intermediate values with the host run. Prevention: use AUTOSAR <code>Platform_Types</code> instead of plain types, compile the tests with the target compiler and flags, and run at least part of the unit suite on target or a simulator — not only on the host.",
    followups: ["Why does a missing volatile only show up with optimisation?", "Which tests would you always run on target?"]
  },

  {
    id: "testing-21",
    topic: "testing",
    type: "behavioral",
    q: "Tell me about a test automation initiative you led.",
    tags: ["SENT", "test automation", "automation lead", "Agile", "framework", "validation cycle", "Pytest", "AUTOSAR Adaptive", "tự động hoá kiểm thử"],
    key: [
      "SENT stack automation initiative, I led it",
      "Manual cycle ~1–2 months → ~2–3 days",
      "Planning, task breakdown, workflow design, delivery",
      "Separate test logic from HW access; data-driven cases",
      "Automated reports as evidence",
      "Lesson: automate the whole cycle, not just execution"
    ],
    answer: "In my System Test Engineer and Automation Lead role I led the SENT stack automation initiative. The manual validation cycle took about one to two months; with an automation-first workflow we brought it down to about two to three days. My part covered planning and task breakdown, designing the workflow, implementation, execution, progress tracking and delivery with the team in an Agile setup. Technically, [fill: architecture — e.g. framework used, how SENT frames were generated and captured, which targets and tools]. The design choices that mattered: keep the test logic separate from hardware access so tests stay stable when the setup changes; make cases data-driven, so nibble and timing boundaries and fault cases like bad CRC are a table, not copy-paste code; and generate reports automatically so the evidence comes out of every run. [fill: team size and your specific ownership split]. The main lesson: the big gain didn't come only from automating test execution, but from automating the whole cycle — setup, execution, result analysis and reporting — which is where most of the manual time was going.",
    followups: ["What was the hardest part to automate?", "How did you get the team to adopt it?"]
  },

  {
    id: "testing-22",
    topic: "testing",
    type: "practical",
    q: "How would you test a module with a state machine and timeouts, without flaky timing?",
    tags: ["state transition testing", "state machine", "timeout", "deterministic test", "fake clock", "virtual time", "MainFunction", "boundary", "máy trạng thái"],
    key: [
      "Build state/event table: valid + invalid transitions",
      "Test every valid transition and guard",
      "Invalid events in each state: ignored or rejected",
      "Control time: fake clock or count MainFunction cycles",
      "Timeout boundary: N-1 no timeout, N timeout",
      "No sleeps, no wall clock"
    ],
    answer: "I use <strong>state-transition testing</strong>. First I build a table of states and events from the requirements: which transitions are valid, their guards and actions. Then I test every valid transition, and — just as important — every invalid event in each state, which should be ignored or rejected without corrupting the state. For timeouts, the key is to <strong>control time</strong> instead of waiting for it. In an AUTOSAR module the timeout is usually counted in MainFunction cycles, so at unit level I just call the MainFunction N times; in a Python-level test I inject a fake clock. That makes the timeout boundary testable exactly: after N-1 ticks there must be no timeout, after N ticks the error state and the error report must appear. No sleeps, no wall clock, so the result is identical on every run, on the host or in CI. On target or VECU I then add a smaller number of tests with real time and tolerances, to confirm the configured period matches reality.",
    code: "def test_request_timeout_boundary(sm, fake_clock):\n" +
          "    sm.start_request()\n" +
          "    fake_clock.advance_ms(TIMEOUT_MS - 1)\n" +
          "    sm.tick()\n" +
          "    assert sm.state == \"WAITING\"          # just inside the limit\n" +
          "    fake_clock.advance_ms(1)\n" +
          "    sm.tick()\n" +
          "    assert sm.state == \"TIMEOUT_ERROR\"    # exactly at the limit\n" +
          "    assert sm.last_error == \"E_TIMEOUT\"",
    lang: "python",
    followups: ["How do you cover invalid transitions efficiently?", "What if the timeout is based on a hardware timer?"]
  }
);
