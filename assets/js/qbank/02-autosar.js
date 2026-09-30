/* Question bank — autosar. Loaded by lessons/luxoft/LX11-question-bank.html */
(window.QBANK = window.QBANK || []).push(

  /* ================= Architecture & RTE ================= */
  {
    id: "autosar-01",
    topic: "autosar",
    type: "theory",
    q: "Explain the AUTOSAR Classic layered architecture.",
    vi: "Giải thích kiến trúc phân lớp của AUTOSAR Classic.",
    tags: ["layered architecture", "overview", "ASW", "RTE", "BSW", "MCAL", "service layer", "ECU abstraction", "CDD", "kiến trúc phân lớp"],
    viTags: ["kiến trúc phân lớp", "các lớp phần mềm", "lớp ứng dụng", "lớp dịch vụ", "lớp trừu tượng ecu", "tổng quan autosar"],
    key: [
      "ASW: SWCs, hardware-independent, talk only via ports",
      "RTE: generated glue, implements the VFB on one ECU",
      "BSW: Services / ECU Abstraction / MCAL",
      "CDD: vertical escape path for special HW or timing",
      "Goal: portability and reuse across ECUs and suppliers"
    ],
    answer: "AUTOSAR Classic splits the ECU software into three big layers. On top is the <strong>application layer</strong>: software components that contain the functional logic and never touch hardware directly, they only use ports. In the middle is the <strong>RTE</strong>, which is generated per ECU and connects SWC ports to each other and to the basic software. At the bottom is the <strong>BSW</strong>, which is itself layered: the <strong>Services layer</strong> (OS, EcuM, BswM, Com, Dcm, Dem, NvM, ComM), the <strong>ECU Abstraction layer</strong> (CanIf, MemIf, IoHwAb) which hides the ECU board layout, and the <strong>MCAL</strong>, the microcontroller drivers like Port, Dio, Adc, Can, Fls, which are the only modules that touch MCU registers. Next to these there is the <strong>Complex Device Driver</strong>, which can go from the RTE straight down to hardware for things with special timing or non-standard devices. The point of all this is that an SWC can move to another ECU or MCU just by regenerating the RTE and swapping the MCAL. As a BSW integrator on RH850 D3/D4/D5 I worked mostly in the BSW and MCAL layers and at the RTE boundary.",
    followups: ["Where does IoHwAb sit and why is it needed?", "When would you choose a CDD over a normal BSW stack?"]
  },
  {
    id: "autosar-02",
    topic: "autosar",
    type: "theory",
    q: "What is the Virtual Functional Bus (VFB) and how does the RTE relate to it?",
    vi: "Virtual Functional Bus (VFB) là gì và RTE liên quan đến nó như thế nào?",
    tags: ["VFB", "virtual functional bus", "RTE", "system design", "ECU mapping", "intra-ECU", "inter-ECU", "bus ảo"],
    viTags: ["bus chức năng ảo", "bus ảo", "thiết kế hệ thống", "ánh xạ lên ecu", "giao tiếp giữa các ecu", "giao tiếp trong ecu"],
    key: [
      "VFB: design-time abstraction, SWCs connected ignoring ECUs",
      "RTE: the concrete implementation of the VFB per ECU",
      "Intra-ECU link: RTE buffer or direct call",
      "Inter-ECU link: RTE maps to Com signal",
      "SWC code identical in both cases"
    ],
    answer: "The VFB is a <strong>design-time concept</strong>. At system level you connect SWCs through ports and connectors as if they all lived on one big bus, without deciding yet which ECU they run on. Later the SWCs are mapped to ECUs, and for each ECU the <strong>RTE is generated as the concrete implementation of the VFB</strong>. If two connected SWCs end up on the same ECU, the RTE implements the connection as a shared buffer or even a direct function call. If they end up on different ECUs, the RTE routes the data element to a Com signal, so it goes through Com, PduR, CanIf and the bus. The important point is that the SWC code does not change: it still calls <code>Rte_Write_&lt;port&gt;_&lt;data&gt;</code> or <code>Rte_Read_...</code>, and only the generated RTE differs. That is what gives relocatability of components between ECUs.",
    followups: ["What information do you need to map a VFB connector to a Com signal?", "What changes in the RTE if two SWCs move onto the same ECU?"]
  },
  /* ----- Overview & architecture ----- */
  {
    id: "autosar-45",
    topic: "autosar",
    type: "theory",
    q: "What is AUTOSAR and why does the automotive industry use it?",
    vi: "AUTOSAR là gì và tại sao ngành ô tô lại sử dụng nó?",
    tags: ["overview", "what is AUTOSAR", "introduction", "why AUTOSAR", "Classic", "Adaptive", "partnership", "tổng quan", "giới thiệu"],
    viTags: ["autosar là gì", "giới thiệu autosar", "tổng quan", "tiêu chuẩn phần mềm ô tô", "tại sao dùng autosar", "chuẩn hóa"],
    key: [
      "Partnership of OEMs, Tier-1s, tool & silicon vendors (since 2003)",
      "Standardizes architecture, interfaces, methodology & exchange format (ARXML)",
      "Classic: static, OSEK-based, C, deeply embedded MCUs",
      "Adaptive: POSIX, C++, service-oriented, HPC ECUs",
      "Cooperate on standards, compete on implementation"
    ],
    answer: "AUTOSAR, AUTomotive Open System ARchitecture, is a worldwide partnership of OEMs, Tier-1 suppliers, tool vendors and semiconductor vendors, founded in 2003. It standardizes four things: a <strong>layered software architecture</strong>, the <strong>interfaces</strong> of every basic software module, a <strong>methodology</strong> for going from system design to ECU software, and a common <strong>exchange format</strong>, ARXML. The motivation was complexity: a modern car has dozens of ECUs from different suppliers, and without a standard every supplier reinvented drivers, communication and diagnostics. With AUTOSAR, an application component can be reused across ECUs and projects, the BSW can be bought from a vendor, and tools from different companies can exchange the same models. There are two platforms. <strong>Classic</strong> is for deeply embedded ECUs on microcontrollers: static configuration, an OSEK-based OS, C code. <strong>Adaptive</strong> is for high-performance ECUs: POSIX OS, C++, service-oriented communication, and software that can be updated. The motto is <em>cooperate on standards, compete on implementation</em>. I worked on both sides at Bosch: BSW integration and MCAL validation on Classic, and system testing on Adaptive.",
    followups: ["What are the downsides of AUTOSAR?", "Which AUTOSAR release did your project use?"]
  },
  {
    id: "autosar-46",
    topic: "autosar",
    type: "theory",
    q: "What are the advantages and the drawbacks of AUTOSAR Classic?",
    vi: "Ưu điểm và nhược điểm của AUTOSAR Classic là gì?",
    tags: ["advantages", "disadvantages", "pros cons", "overhead", "complexity", "overview", "ưu điểm", "nhược điểm"],
    viTags: ["ưu điểm", "nhược điểm", "ưu nhược điểm", "độ phức tạp", "chi phí tài nguyên", "hạn chế autosar"],
    key: [
      "Pros: reuse, supplier exchange, standard APIs, tool ecosystem",
      "Pros: config over code, easier ISO 26262 / ASPICE evidence",
      "Cons: RAM/ROM/CPU overhead of generic layers",
      "Cons: config complexity, long generation, tool/licence cost",
      "Mitigate: RTE optimizations, trimmed config, automation in CI"
    ],
    answer: "The <strong>advantages</strong> are reuse and exchangeability: application components are hardware-independent, BSW modules from different vendors fit together because the APIs are standardized, and the same stack serves many projects through configuration instead of code changes. There's a mature tool ecosystem, and a well-defined architecture makes safety and process evidence easier to produce. The <strong>drawbacks</strong> are real too. The generic layers cost <strong>RAM, ROM and CPU</strong> compared to hand-written code, which matters on small MCUs. <strong>Configuration is complex</strong>: hundreds of parameters across modules that must be consistent with each other, so a lot of integration bugs are configuration bugs, not code bugs. Generation and build times grow, the tools and licences are expensive, the learning curve is steep, and debugging goes through a lot of generated code. From the integration side, the way to live with that is to trim the configuration to what's needed, use RTE optimizations like implicit access or direct calls where allowed, keep configuration under version control and review it like code, and automate generate-build-test so configuration mistakes are caught early rather than on the bench.",
    followups: ["How would you reduce the RAM footprint of the RTE?", "What kind of integration bugs are really configuration bugs?"]
  },
  {
    id: "autosar-47",
    topic: "autosar",
    type: "theory",
    q: "Describe the BSW functional stacks: communication, diagnostics, memory, mode management and I/O.",
    vi: "Mô tả các stack chức năng của BSW: truyền thông, chẩn đoán, bộ nhớ, quản lý mode và I/O.",
    tags: ["BSW stacks", "functional clusters", "vertical view", "Com stack", "Mem stack", "Diag stack", "IO stack", "system services", "architecture", "overview", "kiến trúc BSW"],
    viTags: ["kiến trúc bsw", "stack truyền thông", "stack chẩn đoán", "stack bộ nhớ", "quản lý chế độ", "vào ra", "cụm chức năng"],
    key: [
      "Layers are horizontal; stacks are vertical slices through them",
      "Com: Com/PduR/ComM/Nm → CanIf → Can driver",
      "Mem: NvM → MemIf → Fee/Ea → Fls/Eep",
      "Diag: Dcm, Dem, FiM (+ Det for dev errors)",
      "Mode/System: EcuM, BswM, OS, SchM, WdgM → WdgIf → Wdg",
      "I/O: IoHwAb → Dio/Adc/Pwm/Icu"
    ],
    answer: "The layers are the horizontal view. The stacks are the <strong>vertical view</strong>: each function cuts through Services, ECU Abstraction and MCAL. <strong>Communication</strong>: Com packs signals into PDUs, PduR routes them, ComM, CanSM and CanNm manage the communication state, CanIf abstracts the controllers and transceivers, and the Can driver writes the hardware. <strong>Memory</strong>: NvM manages blocks for the application, MemIf selects the device, Fee or Ea emulates EEPROM on flash or real EEPROM, and Fls or Eep are the drivers. <strong>Diagnostics</strong>: Dcm handles UDS requests, Dem stores events and DTCs, FiM inhibits functions based on faults, and Det collects development errors. <strong>Mode management and system services</strong>: EcuM handles startup, shutdown and wakeup, BswM arbitrates modes with rules and actions, the OS and SchM schedule everything, and WdgM supervises through WdgIf and the Wdg driver. <strong>I/O</strong>: IoHwAb gives SWCs signals like battery voltage and maps them to Dio, Adc, Pwm or Icu channels. In CUBAS I integrated modules across most of these stacks: BswM, Diag, Can, Com, EcuM, OS, MCAL and Mem.",
    code: "Stack      | Services            | ECU Abstraction | MCAL\n-----------+---------------------+-----------------+-------------\nCom        | Com PduR ComM CanNm | CanIf CanTrcv   | Can\nMemory     | NvM                 | MemIf Fee / Ea  | Fls / Eep\nDiag       | Dcm Dem FiM (Det)   |       -         |     -\nSystem     | OS EcuM BswM WdgM   | WdgIf           | Wdg Mcu\nI/O        |   (via RTE)         | IoHwAb          | Dio Adc Pwm Icu",
    lang: "text",
    followups: ["Which of these stacks was hardest to integrate, and why?", "Where does CanTp sit in the communication stack?"]
  },
  {
    id: "autosar-48",
    topic: "autosar",
    type: "theory",
    q: "What is the difference between the Services layer, the ECU Abstraction layer and the MCAL? Where does IoHwAb fit?",
    vi: "Sự khác nhau giữa lớp Services, lớp ECU Abstraction và MCAL là gì? IoHwAb nằm ở đâu?",
    tags: ["service layer", "ECU abstraction", "MCAL", "IoHwAb", "layer responsibility", "architecture", "microcontroller abstraction", "kiến trúc phân lớp"],
    viTags: ["kiến trúc phân lớp", "lớp dịch vụ", "lớp trừu tượng ecu", "lớp trừu tượng vi điều khiển", "trách nhiệm từng lớp", "trừu tượng phần cứng io"],
    key: [
      "MCAL: MCU-dependent, ECU-independent (registers)",
      "ECU Abstraction: MCU-independent, ECU/board-dependent",
      "Services: independent of both MCU and board",
      "IoHwAb: ECU abstraction, exposes I/O to SWCs via RTE ports",
      "New MCU → swap MCAL; new board → adapt ECU abstraction"
    ],
    answer: "The cleanest way to explain it is by <strong>what each layer depends on</strong>. The <strong>MCAL</strong> depends on the microcontroller but not on the ECU: the Adc driver for RH850 knows the registers, but it doesn't know that channel 5 happens to measure battery voltage on this board. The <strong>ECU Abstraction layer</strong> is the opposite: independent of the MCU, but dependent on the ECU hardware layout. It knows which pin or channel is connected to what, and it also handles external devices, for example an external EEPROM or a transceiver on SPI, so the upper layers don't care whether a peripheral is on-chip or off-chip. The <strong>Services layer</strong> is independent of both: NvM, Com, Dcm, the OS and so on work the same on any board. <strong>IoHwAb</strong> sits in the ECU Abstraction layer and is special because it has ports towards the RTE. An SWC asks for a signal like <code>BatteryVoltage</code>, and IoHwAb maps that to the right Adc group, applies scaling and filtering, and returns it. So when the MCU changes you swap the MCAL, and when the board changes you adapt the ECU abstraction. The application stays untouched.",
    followups: ["Why can't an SWC call the Adc driver directly?", "Is IoHwAb standardized like the other modules?"]
  },
  {
    id: "autosar-49",
    topic: "autosar",
    type: "theory",
    q: "What is a Complex Device Driver and when would you use one?",
    vi: "Complex Device Driver là gì và khi nào nên dùng nó?",
    tags: ["CDD", "complex device driver", "complex driver", "non-standard hardware", "timing critical", "SENT", "architecture", "driver phức tạp"],
    viTags: ["driver phức tạp", "trình điều khiển phức tạp", "phần cứng không chuẩn", "yêu cầu thời gian thực", "thời gian khắt khe", "khi nào dùng cdd"],
    key: [
      "Vertical escape path: RTE down to hardware",
      "For timing-critical or non-standard devices/protocols",
      "Not standardized → you own portability, testing, integration",
      "Still follows MemMap, SchM, OS rules; can use MCAL",
      "Example: protocols with no standard AUTOSAR module"
    ],
    answer: "A <strong>Complex Device Driver</strong> is the part of the architecture that is allowed to cut through the layers: it can have ports to the RTE on top and access hardware or MCAL drivers directly underneath. You use it when the standard stack doesn't fit. That means either <strong>strict timing</strong>, for example injection or motor control where you can't afford the path through several layers, or <strong>non-standard hardware or protocols</strong> that AUTOSAR has no module for. SENT is a good example: AUTOSAR Classic doesn't standardize a SENT module, so it's usually provided as a CDD or a vendor-specific driver on top of timer or input-capture hardware. [fill: how the SENT stack you worked with was structured]. The price is that the CDD's interface is <strong>not standardized</strong>, so portability, documentation and testing are your own responsibility. From an integration point of view a CDD still has to behave like a good citizen: memory sections through MemMap, exclusive areas through SchM, its main function scheduled in an OS task, errors reported to Det or Dem. I'd use a CDD only when there's a clear reason, because every CDD is custom code the integrator has to understand.",
    followups: ["How is a CDD's interface described to the RTE?", "How would you test a CDD?"]
  },
  {
    id: "autosar-50",
    topic: "autosar",
    type: "theory",
    q: "What is the difference between an AUTOSAR Interface, a Standardized AUTOSAR Interface and a Standardized Interface?",
    vi: "AUTOSAR Interface, Standardized AUTOSAR Interface và Standardized Interface khác nhau như thế nào?",
    tags: ["AUTOSAR interface", "standardized AUTOSAR interface", "standardized interface", "port interface", "C API", "service ports", "architecture", "giao diện"],
    viTags: ["giao diện", "giao diện chuẩn hóa", "các loại interface", "giao diện cổng", "api c", "cổng dịch vụ"],
    key: [
      "AUTOSAR Interface: port-based SWC interface via RTE, project-defined",
      "Standardized AUTOSAR Interface: port-based, content fixed by AUTOSAR",
      "↳ BSW services to SWCs via RTE: NvM, Dem, EcuM, ComM, WdgM",
      "Standardized Interface: plain C API between BSW modules",
      "↳ e.g. Com_SendSignal, CanIf_Transmit, not through ports"
    ],
    answer: "It's a classic question because the names are so close. An <strong>AUTOSAR Interface</strong> is a port-based interface of a software component, communicated through the RTE, for example sender-receiver or client-server. Its content is defined by the project, such as a vehicle speed data element between two application SWCs. A <strong>Standardized AUTOSAR Interface</strong> is also port-based and goes through the RTE, but its syntax and semantics are fixed by the AUTOSAR standard. That's how BSW services are offered to application SWCs: an SWC talks to NvM, Dem, EcuM, ComM or WdgM through service ports. A <strong>Standardized Interface</strong> is not port-based at all. It's a plain C API defined in a module's SWS and used directly between BSW modules, or between the RTE and BSW, like <code>Com_SendSignal</code>, <code>PduR_ComTransmit</code> or <code>CanIf_Transmit</code>. So the short version: application to application uses AUTOSAR Interfaces; application to BSW service uses Standardized AUTOSAR Interfaces through the RTE; BSW to BSW uses Standardized Interfaces as direct C calls.",
    followups: ["How does an SWC store data in NvM through a service port?", "Why do BSW modules call each other directly instead of through the RTE?"]
  },
  {
    id: "autosar-51",
    topic: "autosar",
    type: "practical",
    q: "Describe the architecture of the ECU software you worked on and where the modules you integrated sit.",
    vi: "Mô tả kiến trúc phần mềm ECU bạn đã làm và vị trí của các module bạn đã tích hợp.",
    tags: ["ECU architecture", "draw architecture", "CUBAS", "RH850", "BSW integration", "modules integrated", "overview", "kiến trúc ECU", "dự án"],
    viTags: ["kiến trúc ecu", "dự án đã làm", "vẽ sơ đồ kiến trúc", "tích hợp bsw", "kinh nghiệm dự án", "module đã tích hợp"],
    key: [
      "Target: RH850 D3/D4/D5, AUTOSAR Classic",
      "Integrated: BswM, Diag, Can, Com, EcuM, OS, MCAL, Mem",
      "Walk bottom-up: MCAL → ECU abstraction → services → RTE",
      "Trace one flow end to end: startup or a CAN signal",
      "Scope: [fill: what exactly was in your responsibility]"
    ],
    answer: "I'd draw it bottom-up. The target was <strong>RH850 D3, D4 and D5</strong> with an AUTOSAR Classic stack. At the bottom is the <strong>MCAL</strong> for RH850: Mcu, Port, Dio, Adc, timers, Can, Fls, Wdg. The driver groups I validated at unit and component level belong to this layer. Above that the <strong>ECU abstraction</strong>, CanIf for communication and MemIf with Fee for memory. Then the <strong>services</strong> I integrated: Com and PduR for communication, Dcm and Dem for diagnostics, NvM for memory, EcuM and BswM for mode management, and the OS scheduling everything, with SchM for the BSW main functions. On top sits the RTE and the application. [fill: application SWCs / ECU function, and what was in your scope versus other teams]. To show how it fits together I'd walk one flow. At startup, EcuM initializes MCAL drivers, starts the OS, then BswM rules bring up communication and NvM ReadAll. At runtime, a received CAN frame goes Can driver, CanIf, PduR, Com, then the RTE delivers the signal to the SWC. When integration failed, it was usually at one of these hand-offs, and that's where I focused debugging with TRACE32.",
    followups: ["Which hand-off failed most often during integration?", "How were the BSW main functions mapped to tasks?"]
  },
  {
    id: "autosar-52",
    topic: "autosar",
    type: "theory",
    q: "Who are the roles in an AUTOSAR project, and what does the integrator do?",
    vi: "Trong một dự án AUTOSAR có những vai trò nào, và integrator làm những gì?",
    tags: ["roles", "OEM", "Tier-1", "BSW vendor", "MCAL vendor", "integrator", "responsibilities", "workflow", "vai trò", "integration"],
    viTags: ["vai trò", "người tích hợp", "nhà cung cấp bsw", "nhà sản xuất ô tô", "trách nhiệm", "quy trình làm việc"],
    key: [
      "OEM: system description, communication matrix, ECU extract",
      "Tier-1: application SWCs, ECU configuration, delivery",
      "BSW vendor: stack + config tool; silicon vendor: MCAL",
      "Integrator: combine, configure, generate, build, verify",
      "Integrator owns the baseline & resolves cross-module issues"
    ],
    answer: "Typically the <strong>OEM</strong> owns the system view: the network and communication matrix and the system description, and hands each supplier an <strong>ECU extract</strong> in ARXML. The <strong>Tier-1</strong> develops the ECU: application SWCs, the ECU configuration, and the delivered software. The <strong>BSW vendor</strong>, for example Vector, Elektrobit or ETAS, provides the basic software stack and its configuration tool, and the <strong>silicon vendor</strong> often provides the MCAL. Inside the Tier-1 there are often several component teams, one per SWC or BSW area. The <strong>integrator</strong> sits in the middle. They take deliveries from all those teams and vendors, bring them into one consistent configuration, generate the RTE and BSW, build for the target, and verify that the integrated software works as a whole. When something doesn't fit, a data type mismatch, a wrong init order, a PDU length disagreement, the integrator finds it, proves which side is wrong, and drives it to the owner. The integrator also owns the <strong>baseline</strong>: which versions went in, and the evidence that it was tested. In CUBAS I was in that integration role, working between project stakeholders and several BSW component teams.",
    followups: ["What did a delivery from a component team contain?", "How did you handle a delivery that broke the baseline?"]
  },
  {
    id: "autosar-53",
    topic: "autosar",
    type: "theory",
    q: "Which AUTOSAR Classic releases do you know, and what changed between 3.x and 4.x?",
    vi: "Bạn biết những phiên bản AUTOSAR Classic nào, và giữa 3.x và 4.x có gì thay đổi?",
    tags: ["AUTOSAR release", "version", "4.2.2", "4.3.1", "4.4", "R19-11", "R20-11", "3.x vs 4.x", "phiên bản"],
    viTags: ["phiên bản", "các bản release", "khác biệt 3.x và 4.x", "thay đổi giữa các phiên bản", "lịch sử autosar"],
    key: [
      "3.x: older, still in some legacy ECUs",
      "4.x: post-build selectable/loadable, variant handling, multicore, CAN FD, SecOC",
      "4.4 (2018), then yearly releases named R19-11, R20-11, ...",
      "Projects freeze one release for years; mixing needs care",
      "My project: [fill: AUTOSAR release used in CUBAS]"
    ],
    answer: "The release line that shaped most current ECUs is <strong>4.x</strong>: 4.0.3, then 4.2.2 and 4.3.1, which you still see a lot, and 4.4. After that AUTOSAR switched to yearly releases named by date, <strong>R19-11, R20-11</strong> and so on. Compared to <strong>3.x</strong>, the 4.x line brought a more mature methodology and metamodel, the split of post-build configuration into <strong>post-build selectable and loadable</strong>, variant handling with variation points, <strong>multicore</strong> support with partitioning of OS and BSW across cores, CAN FD, and later security features like SecOC. Post-build configuration and OS memory protection already existed in 3.x. In practice, a project <strong>freezes one release</strong> for its lifetime, because BSW, MCAL, tools and application ARXML all have to agree. When you receive an SWC description from a supplier using a different schema version, it has to be converted, and that's a common integration headache. In my project we used [fill: AUTOSAR release used in CUBAS]. I don't memorize the change list of every release, but I always check the release of the stack and the ARXML schema version first when I integrate something new.",
    followups: ["What would you check if an ARXML uses a different schema version?", "What is post-build configuration good for?"]
  },
  {
    id: "autosar-54",
    topic: "autosar",
    type: "practical",
    q: "What is the Det, and how do you use error reporting when debugging an integration?",
    vi: "Det là gì, và bạn sử dụng việc báo lỗi như thế nào khi debug quá trình tích hợp?",
    tags: ["Det", "development error tracer", "Det_ReportError", "runtime error", "error handling", "Dem", "integration debugging", "TRACE32", "báo lỗi"],
    viTags: ["báo lỗi", "lỗi phát triển", "theo dõi lỗi", "debug tích hợp", "xử lý lỗi", "gỡ lỗi"],
    key: [
      "Det: collects development errors (wrong params, not initialized)",
      "Enabled in development, usually disabled in production",
      "Production/runtime faults → Dem events, DTCs",
      "Debug trick: breakpoint on Det_ReportError, read module/API/error IDs",
      "Catches misconfig and wrong init order early"
    ],
    answer: "Every BSW module can check its inputs and state when <strong>development error detection</strong> is enabled, and it reports violations to the <strong>Det</strong>, the Default Error Tracer, with <code>Det_ReportError(ModuleId, InstanceId, ApiId, ErrorId)</code>. Typical errors are calling an API before the module is initialized, a null pointer, or an invalid channel or PDU ID. Newer releases also distinguish runtime errors and transient faults. Det is meant for development and is normally switched off in production builds, because the checks cost time and code. Faults that matter in the field, like a sensor failure or a bus problem, go to <strong>Dem</strong> as events and become DTCs. For integration debugging, the Det is a very efficient entry point. You put a <strong>breakpoint on Det_ReportError</strong> in TRACE32, run until it hits, and read the four IDs and the call stack. That tells you immediately which module, which API and which error, for example a module called before its init function, which points to the EcuM init order, or an invalid ID, which points to a configuration mismatch between two modules. [fill: whether you used this in CUBAS, and one example]. It turns a silent failure into a precise pointer.",
    code: "/* Typical hook: set a breakpoint here, then read the IDs + call stack */\nStd_ReturnType Det_ReportError(uint16 ModuleId, uint8 InstanceId,\n                               uint8 ApiId, uint8 ErrorId)\n{\n    Det_LastError.ModuleId = ModuleId;   /* e.g. 60 = CanIf */\n    Det_LastError.ApiId    = ApiId;\n    Det_LastError.ErrorId  = ErrorId;    /* e.g. CANIF_E_UNINIT */\n    return E_OK;\n}",
    lang: "c",
    followups: ["What is the difference between a Det error and a Dem event?", "Why is Det usually disabled in production?"]
  },
  {
    id: "autosar-03",
    topic: "autosar",
    type: "theory",
    q: "What SWC types exist in AUTOSAR Classic?",
    vi: "Trong AUTOSAR Classic có những loại SWC nào?",
    tags: ["SWC types", "application SWC", "sensor actuator SWC", "service SWC", "composition", "CDD", "NvBlock SWC", "parameter SWC", "loại SWC"],
    viTags: ["loại swc", "thành phần phần mềm", "swc ứng dụng", "swc cảm biến chấp hành", "swc dịch vụ", "phân loại swc"],
    key: [
      "Application SWC: pure logic",
      "Sensor/Actuator SWC: uses IoHwAb, signal conditioning",
      "Service / ECU-abstraction / CDD SWC: BSW side ports",
      "Parameter SWC, NvBlock SWC: calibration and NV data",
      "Composition SWC: container, no code"
    ],
    answer: "The atomic component types are: the <strong>Application SWC</strong>, pure functional logic, fully hardware-independent; the <strong>Sensor/Actuator SWC</strong>, which knows about a specific sensor or actuator and talks to the ECU abstraction, typically IoHwAb; the <strong>Parameter SWC</strong>, which provides calibration parameters; the <strong>NvBlock SWC</strong>, which exposes NvM blocks to applications through ports; and on the BSW side the <strong>Service SWC</strong>, <strong>ECU Abstraction SWC</strong> and <strong>Complex Device Driver SWC</strong>, which describe how BSW modules like NvM, Dem or ComM appear to the RTE as ports. Then there is the <strong>Composition SWC</strong>, which has no code of its own. It just groups other components and delegates ports, so you can build the system hierarchically. Each atomic SWC has an <strong>internal behavior</strong> with runnables, events and data accesses, and an implementation that points to the actual C code.",
    followups: ["How does an application SWC reach a BSW service like NvM or Dem?", "What is the difference between an SWC type and an SWC prototype?"]
  },
  {
    id: "autosar-04",
    topic: "autosar",
    type: "theory",
    q: "Explain the port interface types: sender-receiver, client-server and mode switch.",
    vi: "Giải thích các loại port interface: sender-receiver, client-server và mode switch.",
    tags: ["ports", "sender receiver", "client server", "mode switch", "S/R", "C/S", "port interface", "Rte_Write", "Rte_Call", "cổng giao tiếp"],
    viTags: ["cổng giao tiếp", "gửi nhận", "máy khách máy chủ", "chuyển chế độ", "giao diện cổng", "kiểu port"],
    key: [
      "S/R: data elements, Rte_Write / Rte_Read, 1:n or n:1",
      "C/S: operations, Rte_Call, sync or async, n:1",
      "Mode switch: Rte_Switch, triggers ModeSwitchEvent",
      "Also: parameter, NvData, trigger interfaces",
      "Ports: P-port provides, R-port requires"
    ],
    answer: "A port is typed by a port interface. <strong>Sender-receiver</strong> carries data elements: the sender calls <code>Rte_Write_&lt;port&gt;_&lt;element&gt;</code>, the receiver calls <code>Rte_Read_...</code>. Semantics are either last-is-best or queued, and it supports 1:n or n:1 connections. <strong>Client-server</strong> carries operations: the client calls <code>Rte_Call_&lt;port&gt;_&lt;operation&gt;</code>, and the server runnable is triggered by an OperationInvokedEvent. It can be synchronous or asynchronous with <code>Rte_Result</code>, and it is n:1, many clients to one server. It is also how SWCs call BSW services like <code>NvM_WriteBlock</code> or Dem. <strong>Mode switch</strong> interfaces carry a mode declaration group: the mode manager calls <code>Rte_Switch_...</code> and the RTE can trigger runnables on entry or exit or disable runnables in certain modes. There are also parameter, NvData and trigger interfaces. For the port itself: a P-port provides, an R-port requires, and a PR-port does both.",
    code: "/* S/R */\nRte_Write_PP_VehSpeed_Value(speed);\nStd_ReturnType rc = Rte_Read_RP_VehSpeed_Value(&speed);\n\n/* C/S (e.g. NvM service port) */\nrc = Rte_Call_RP_NvM_Cfg_WriteBlock(NULL_PTR);\n\n/* Mode switch */\nRte_Switch_PP_EcuMode_EcuMode(RTE_MODE_EcuMode_RUN);",
    lang: "c",
    followups: ["What does last-is-best vs queued mean for S/R?", "What happens if an R-port is left unconnected?"]
  },
  {
    id: "autosar-05",
    topic: "autosar",
    type: "theory",
    q: "What are runnables and RTE events, and how are they mapped to OS tasks?",
    vi: "Runnable và RTE event là gì, và chúng được ánh xạ vào OS task như thế nào?",
    tags: ["runnable", "RTE event", "TimingEvent", "DataReceivedEvent", "OperationInvokedEvent", "InitEvent", "task mapping", "runnable entity", "ánh xạ task"],
    viTags: ["ánh xạ task", "sự kiện rte", "thực thể runnable", "sự kiện định kỳ", "map runnable vào task", "lập lịch runnable"],
    key: [
      "Runnable: C function inside an SWC, called by the RTE",
      "Events: Timing, DataReceived, OperationInvoked, Init, ModeSwitch",
      "Each event mapped to an OS task with a position",
      "Timing events: RTE uses OS alarm or schedule table",
      "Mapping drives timing, data consistency, CPU load"
    ],
    answer: "A <strong>runnable entity</strong> is the smallest schedulable piece of an SWC, usually a C function without parameters that the RTE calls (server runnables for client-server operations are the exception: they take the operation's arguments). It never gets called by other SWCs directly. What triggers it is an <strong>RTE event</strong>: a <code>TimingEvent</code> for cyclic execution, for example every 10 ms, a <code>DataReceivedEvent</code> when new data arrives on an S/R port, an <code>OperationInvokedEvent</code> for a C/S server, an <code>InitEvent</code> at startup, a <code>ModeSwitchEvent</code> on mode entry or exit, and some error events like <code>DataReceiveErrorEvent</code>. During ECU configuration each event is <strong>mapped to an OS task</strong> with an order position. The RTE generator then produces the task bodies, which call the runnables in that order, and sets up alarms or schedule tables for the timing events. This mapping is a real integration decision: it decides CPU load per task, which runnables can preempt each other, and therefore whether the RTE needs extra copies or locks for data consistency.",
    followups: ["What is the risk of mapping runnables from one SWC into tasks of different priorities?", "How do you decide the order of runnables inside a task?"]
  },
  {
    id: "autosar-06",
    topic: "autosar",
    type: "theory",
    q: "What is the difference between explicit and implicit sender-receiver communication?",
    vi: "Sự khác nhau giữa giao tiếp sender-receiver tường minh (explicit) và ngầm định (implicit) là gì?",
    tags: ["explicit", "implicit", "Rte_IRead", "Rte_IWrite", "data consistency", "RTE", "copy semantics", "giao tiếp ngầm định"],
    viTags: ["giao tiếp ngầm định", "giao tiếp tường minh", "tính nhất quán dữ liệu", "sao chép dữ liệu", "đọc ghi rte"],
    key: [
      "Explicit: Rte_Read/Rte_Write, access happens immediately",
      "Implicit: Rte_IRead/Rte_IWrite, task-local copy",
      "Implicit: stable value during the whole runnable",
      "Implicit costs RAM and copy time",
      "Choose per data access in the SWC description"
    ],
    answer: "With <strong>explicit</strong> access, <code>Rte_Read</code> and <code>Rte_Write</code> act on the shared data right away. If a runnable reads the same value twice, it can get two different values when a higher-priority task writes in between, and each call has some overhead. With <strong>implicit</strong> access, <code>Rte_IRead</code> and <code>Rte_IWrite</code>, the RTE copies the data into a local buffer before the runnable starts and writes the outputs back after it finishes. The runnable sees one consistent snapshot, and the calls are often just macros on the buffer, so they are cheap inside the runnable. The trade-off is extra RAM for the copies and copy time at task level, and outputs only become visible after the runnable ends. Which one to use is declared per data access in the SWC internal behavior, so it is a design choice. From an integration point of view it matters when you look at RAM usage and at timing between runnables in different tasks.",
    followups: ["When does the RTE generator optimise implicit copies away?", "How would you guarantee consistency for a multi-element struct with explicit access?"]
  },

  /* ================= Methodology & ARXML ================= */
  {
    id: "autosar-07",
    topic: "autosar",
    type: "theory",
    q: "Walk me through the AUTOSAR methodology from system description to generated code.",
    vi: "Trình bày quy trình phương pháp luận AUTOSAR từ mô tả hệ thống đến code được sinh ra.",
    tags: ["methodology", "ARXML", "system description", "ECU extract", "ECU configuration", "code generation", "RTE generation", "quy trình", "phương pháp luận"],
    viTags: ["quy trình", "phương pháp luận", "mô tả hệ thống", "sinh code", "cấu hình ecu", "trích xuất ecu", "sinh rte"],
    key: [
      "System description: SWCs, topology, comm matrix, mapping",
      "ECU extract: the part that belongs to one ECU",
      "ECU configuration: BSW/MCAL/OS/RTE parameters (ECUC)",
      "Validate, then generate BSW config, RTE, OS",
      "Compile static + generated code, link, flash"
    ],
    answer: "It starts at <strong>system level</strong>. The OEM or system team builds the system description: SWC compositions, network topology, the communication matrix (often imported from DBC, LDF or FIBEX) and the mapping of SWCs to ECUs. From that you derive the <strong>ECU extract</strong>, the subset for one ECU: its SWCs, its signals and PDUs, its connectors. Then comes <strong>ECU configuration</strong>. The configuration tool imports the ECU extract together with the BSW module definitions and you configure all the modules: Com, PduR, CanIf, Can, EcuM, BswM, OS, NvM, Dcm, Dem, MCAL, plus RTE event-to-task mapping. The result is the ECUC values ARXML. You <strong>validate</strong> the configuration, then <strong>generate</strong>: BSW configuration files, the RTE and the OS configuration. Finally everything is compiled, the vendor static code plus generated code plus SWC code, linked with the linker script, and flashed. In my project the configure-validate-generate part was done with ETAS RTA-CAR. The steps are the same in any AUTOSAR toolchain, only the tool changes.",
    followups: ["What typically breaks when a new ECU extract version arrives?", "Who owns which ARXML in a typical OEM/Tier-1 setup?"]
  },
  {
    id: "autosar-08",
    topic: "autosar",
    type: "theory",
    q: "What is the difference between an SWC description, a BSW module description and an ECU configuration?",
    vi: "Mô tả SWC, mô tả module BSW và cấu hình ECU khác nhau như thế nào?",
    tags: ["SWC description", "BSWMD", "ECUC", "ECU configuration values", "ARXML", "param definition", "mô tả SWC", "cấu hình ECU"],
    viTags: ["mô tả swc", "mô tả module bsw", "cấu hình ecu", "định nghĩa tham số", "giá trị cấu hình", "file mô tả"],
    key: [
      "SWC description: ports, interfaces, internal behavior, runnables",
      "BSWMD / param definition: which parameters a module has",
      "ECUC values: the chosen parameter values for this ECU",
      "SWC desc is portable; ECUC is ECU-specific",
      "RTE generator reads SWC descs + ECUC (task mapping)"
    ],
    answer: "The <strong>SWC description</strong> describes a component from the outside and its behavior: component type, ports and port interfaces, data types, runnables, RTE events and data access points. It is ECU-independent, and the same description can be reused on several ECUs. The <strong>BSW module description</strong> and the <strong>parameter definition</strong> come from the BSW or MCAL vendor. They define which configuration containers and parameters a module has, their ranges and multiplicities, plus the module's own entry points, main functions and exclusive areas. The <strong>ECU configuration values</strong>, ECUC, are the actual values chosen for one specific ECU: for example which CAN controllers, which PDUs, how many NvM blocks, which OS tasks and how events are mapped. So the SWC description says what the application needs, the param definition says what can be configured, and ECUC says what we configured. As an integrator, most of my daily work was in the ECUC values, keeping them consistent with the incoming SWC descriptions and the ECU extract.",
    followups: ["What happens if the BSW vendor delivers a new param definition version?", "Where do data type mappings (implementation vs application types) live?"]
  },
  {
    id: "autosar-09",
    topic: "autosar",
    type: "practical",
    q: "You receive a new application SWC with its ARXML and C code. How do you integrate it end to end?",
    vi: "Bạn nhận được một SWC ứng dụng mới kèm ARXML và code C. Bạn tích hợp nó từ đầu đến cuối như thế nào?",
    tags: ["SWC integration", "ARXML import", "composition", "connectors", "task mapping", "RTE generation", "build", "tích hợp SWC", "integration flow"],
    viTags: ["tích hợp swc", "import arxml", "kết nối port", "ánh xạ task", "sinh rte", "quy trình tích hợp", "build"],
    key: [
      "Check ARXML: schema, data types, interfaces vs existing ones",
      "Import, instantiate in composition, connect all ports",
      "Map RTE events to tasks; connect BSW service ports",
      "Validate, generate RTE, build with SWC code and MemMap",
      "Test on target: runnables run, data flows, timing OK"
    ],
    answer: "First I check the delivery: the ARXML validates against the AUTOSAR schema version we use, and its interfaces and data types match the ones already in the project, not a second copy of the same type under a different package. Then I <strong>import</strong> it into the configuration tool, create a prototype in the ECU composition and <strong>connect every port</strong>: to other SWCs, to Com signals through the ECU extract, or to BSW service ports like NvM or Dem. Next I <strong>map its RTE events to OS tasks</strong>, respecting the periods and the expected load, and add its memory sections to MemMap if it uses its own section names. Then I validate, fix any unconnected-port or type errors, <strong>generate the RTE</strong>, and add the SWC sources and its <code>Rte_&lt;Swc&gt;.h</code> contract header to the build. Build and link warnings, and the map file for RAM and ROM growth, get a look too. On target I confirm the init runnable and the cyclic runnables actually execute, data flows in both directions, and task timing is still inside budget. [fill: concrete SWC or change you integrated in CUBAS and what issue came up]",
    followups: ["How do you handle a data type that already exists with a different name?", "What do you check in the map file after integrating a new SWC?"]
  },
  {
    id: "autosar-10",
    topic: "autosar",
    type: "theory",
    q: "Explain configuration classes: pre-compile, link-time and post-build.",
    vi: "Giải thích các lớp cấu hình: pre-compile, link-time và post-build.",
    tags: ["configuration class", "pre-compile", "link-time", "post-build", "_Cfg.h", "_Lcfg.c", "_PBcfg.c", "config pointer", "lớp cấu hình"],
    viTags: ["lớp cấu hình", "cấu hình lúc biên dịch", "cấu hình lúc link", "cấu hình sau build", "con trỏ cấu hình", "thời điểm cấu hình"],
    key: [
      "Pre-compile: #define in _Cfg.h, most efficient, rebuild",
      "Link-time: const tables in _Lcfg.c, relink only",
      "Post-build: tables in separate flash, pointer at Init",
      "Post-build selectable vs loadable",
      "Each parameter's allowed class defined by the SWS"
    ],
    answer: "It is about <strong>when a parameter value gets fixed</strong>. <strong>Pre-compile</strong> parameters become macros in <code>&lt;Mod&gt;_Cfg.h</code>. The compiler can optimise and strip dead code, so this is the most efficient option, but any change means recompiling the module. Typical examples are development error detection on or off, number of channels, feature switches. <strong>Link-time</strong> parameters are const structures in a separate configuration C file, <code>&lt;Mod&gt;_Lcfg.c</code>. You only recompile that file and relink, which is useful when a vendor ships the module as an object library. <strong>Post-build</strong> parameters live in <code>&lt;Mod&gt;_PBcfg.c</code>, usually in their own flash area, and the module receives a pointer to them in <code>&lt;Mod&gt;_Init(ConfigPtr)</code>. With <strong>post-build selectable</strong> several configuration sets are flashed and one is chosen at startup, and with <strong>post-build loadable</strong> the configuration can be reflashed without touching the code. The SWS of each module says which classes each parameter supports. CAN routing and PDU tables are the classic post-build candidates.",
    followups: ["What does EcuM_DeterminePbConfiguration do?", "What is the risk if post-build data and code versions don't match?"]
  },
  {
    id: "autosar-11",
    topic: "autosar",
    type: "theory",
    q: "How are variants handled in AUTOSAR Classic?",
    vi: "Trong AUTOSAR Classic, các biến thể (variant) được xử lý như thế nào?",
    tags: ["variants", "variant handling", "post-build selectable", "predefined variant", "variation point", "system constant", "biến thể", "variant coding"],
    viTags: ["biến thể", "xử lý biến thể", "quản lý variant", "điểm biến thể", "hằng số hệ thống", "mã hóa biến thể"],
    key: [
      "Variation points in ARXML, bound at different times",
      "Pre-build: system constants, conditional compilation",
      "Post-build selectable: several config sets, pick at init",
      "Predefined variants group the criterion values",
      "Also possible: application-level coding via NvM or Dcm"
    ],
    answer: "AUTOSAR describes variability with <strong>variation points</strong> in the ARXML. An element like a port, a connector, a PDU or a runnable can be conditional, and the condition is bound at a certain time. For <strong>pre-build</strong> variants the condition uses system constants and results in conditional compilation, so each variant is its own build. For <strong>post-build selectable</strong> variants the condition uses post-build variant criteria. The tools then generate several configuration sets, for example two CAN matrices for two vehicle lines, all in one binary, and at startup EcuM picks the right set, for example from a coding value, and passes that pointer to the modules' <code>Init</code> functions. <strong>Predefined variants</strong> are named combinations of criterion values so you don't configure each switch by hand. On top of that, many projects also do application-level variant coding: a coding value stored in NvM and written through a Dcm service. For CI this means building and testing every variant, not just the default one.",
    followups: ["How would you set up CI so every variant is built and smoke-tested?", "What is the flash/RAM cost of post-build selectable?"]
  },
  {
    id: "autosar-12",
    topic: "autosar",
    type: "theory",
    q: "What is MemMap and compiler abstraction, and why do integrators care?",
    vi: "MemMap và compiler abstraction là gì, và tại sao integrator phải quan tâm?",
    tags: ["MemMap", "memory mapping", "Compiler.h", "compiler abstraction", "pragma section", "START_SEC", "linker script", "memory sections", "vùng nhớ"],
    viTags: ["vùng nhớ", "ánh xạ bộ nhớ", "trừu tượng trình biên dịch", "section bộ nhớ", "linker script", "phân vùng bộ nhớ"],
    key: [
      "Modules wrap code/data in START_SEC / STOP_SEC + include MemMap",
      "MemMap maps section names to compiler pragmas",
      "Linker script places sections in RAM/flash regions",
      "Compiler.h / Compiler_Cfg.h: FUNC, P2VAR, P2CONST macros",
      "Wrong MemMap: data in wrong region, overflow, init bugs"
    ],
    answer: "AUTOSAR code never uses compiler-specific pragmas directly. Each module wraps its variables, constants and code with a define like <code>CANIF_START_SEC_VAR_CLEARED_8</code>, includes <code>CanIf_MemMap.h</code>, and closes with the matching STOP define. The <strong>MemMap header</strong>, which the integrator owns, turns that abstract section name into the real <code>#pragma section</code> of the compiler in use, and the <strong>linker script</strong> then places those sections into specific memory regions: normal RAM, fast local RAM, no-init RAM that survives reset, flash for constants. <strong>Compiler abstraction</strong>, <code>Compiler.h</code> and <code>Compiler_Cfg.h</code>, gives macros like <code>FUNC</code>, <code>P2VAR</code> and <code>P2CONST</code>, so memory classes and pointer qualifiers can be adapted per compiler. Integrators care because this is where many real bugs come from: a variable that should be zero-initialised ends up in a no-init section, a section that isn't mapped at all silently goes to a default region, or a region overflows at link time.",
    code: "#define CANIF_START_SEC_VAR_CLEARED_8\n#include \"CanIf_MemMap.h\"\nstatic uint8 CanIf_ControllerMode[CANIF_NUM_CONTROLLERS];\n#define CANIF_STOP_SEC_VAR_CLEARED_8\n#include \"CanIf_MemMap.h\"\n\n/* In CanIf_MemMap.h (integrator-owned, compiler-specific) */\n/* pragma syntax is compiler-specific; GHS shown */\n#if defined(CANIF_START_SEC_VAR_CLEARED_8)\n  #undef CANIF_START_SEC_VAR_CLEARED_8\n  #pragma ghs section bss=\".bss.canif_8\"\n#elif defined(CANIF_STOP_SEC_VAR_CLEARED_8)\n  #undef CANIF_STOP_SEC_VAR_CLEARED_8\n  #pragma ghs section bss=default\n#else\n  #error \"CanIf_MemMap.h: unknown section\"\n#endif",
    lang: "c",
    followups: ["How do you detect a section that was never mapped?", "Why are sections split by alignment size (8/16/32/UNSPECIFIED)?"]
  },
  {
    id: "autosar-13",
    topic: "autosar",
    type: "theory",
    q: "What is the BSW Scheduler (SchM) and what are exclusive areas?",
    vi: "BSW Scheduler (SchM) là gì và exclusive area là gì?",
    tags: ["SchM", "BSW scheduler", "exclusive area", "SchM_Enter", "SchM_Exit", "critical section", "MainFunction", "vùng loại trừ", "data consistency"],
    viTags: ["vùng loại trừ", "bộ lập lịch bsw", "vùng tới hạn", "critical section", "tính nhất quán dữ liệu", "khóa ngắt"],
    key: [
      "SchM: part of RTE for BSW modules",
      "Calls <Mod>_MainFunction cyclically via mapped OS tasks",
      "Exclusive areas: SchM_Enter_/SchM_Exit_<Mod>_<EA>",
      "Implemented as interrupt lock, OS resource or nothing",
      "Integrator chooses implementation per EA"
    ],
    answer: "The <strong>SchM</strong> is the part of the RTE that serves the basic software. It does two main jobs. First, it <strong>schedules the BSW main functions</strong>. Modules like Com, CanTp, Can, NvM, Fee, Dcm, Dem, ComM and CanSM have <code>&lt;Mod&gt;_MainFunction</code> with a configured period, and in the ECU configuration these are mapped to OS tasks just like runnables. Second, it provides <strong>exclusive areas</strong>. When a module accesses shared data from both a main function and an ISR or callback, it calls <code>SchM_Enter_&lt;Mod&gt;_&lt;EA&gt;()</code> and <code>SchM_Exit_...</code> around the critical code. The module only declares that it needs the area. The integrator decides how it is implemented: disabling all interrupts, disabling only OS-category interrupts, using an OS resource, or nothing at all if the analysis shows no concurrent access in this ECU's task mapping. That choice is a trade-off between safety and interrupt latency, and getting it wrong gives either rare data corruption or unnecessary jitter.",
    code: "SchM_Enter_Com_COM_EXCLUSIVE_AREA_0();\n/* update shared I-PDU buffer */\nSchM_Exit_Com_COM_EXCLUSIVE_AREA_0();",
    lang: "c",
    followups: ["When is it safe to implement an exclusive area as 'no protection'?", "What are the risks of long interrupt-lock exclusive areas?"]
  },
  {
    id: "autosar-14",
    topic: "autosar",
    type: "practical",
    q: "How do you schedule BSW main functions, and what goes wrong if you get it wrong?",
    vi: "Bạn lập lịch các main function của BSW như thế nào, và điều gì xảy ra nếu lập lịch sai?",
    tags: ["MainFunction", "BSW scheduling", "task mapping", "period", "Com_MainFunctionRx", "NvM_MainFunction", "Fee_MainFunction", "timing", "lập lịch BSW"],
    viTags: ["lập lịch bsw", "chu kỳ main function", "ánh xạ task", "định thời", "lỗi lập lịch", "chu kỳ gọi"],
    key: [
      "Period must match the configured module period",
      "Keep related chains together: Com Rx/Tx, NvM/Fee/Fls",
      "Priority: comm and watchdog above slow memory jobs",
      "Wrong period: timeouts, deadline errors, slow NvM",
      "Missing mapping: module silently never progresses"
    ],
    answer: "Each module has a configured main function period, and that value is used internally for timers: Com deadline monitoring, CanTp timeouts, Dem debounce timing, CanSM and CanNm timers. So the first rule is that the <strong>task the main function is mapped to must really run at that period</strong>. If Com thinks it runs every 5 ms but actually runs every 10 ms, every timeout is off by a factor of two. Second, I keep chains consistent. Com Rx and Tx, CanTp and the Can_MainFunction_* polling functions in fast comm tasks. NvM, Fee and Fls in a lower-priority background task, because flash jobs are long but not urgent. Watchdog-related functions in a task that proves the system is healthy. Third, I check load, because a long <code>Fee_MainFunction</code> in a high-priority task can starve application runnables. Typical symptoms when this is wrong: Rx deadline timeouts even though frames are on the bus, NvM jobs that never finish because <code>Fls_MainFunction</code> was never mapped, or the watchdog resetting under load. [fill: example of a scheduling or task-mapping issue you saw in CUBAS]",
    followups: ["How would you measure whether a task really runs at its configured period?", "Why is NvM_WriteAll at shutdown sensitive to main function scheduling?"]
  },

  /* ================= Communication ================= */
  {
    id: "autosar-15",
    topic: "autosar",
    type: "theory",
    q: "Describe the CAN communication stack and the path of a signal from SWC to bus.",
    vi: "Mô tả CAN communication stack và đường đi của một signal từ SWC ra bus.",
    tags: ["Com stack", "Com", "PduR", "CanIf", "Can driver", "signal path", "Com_SendSignal", "I-PDU", "Tx path", "luồng tín hiệu"],
    viTags: ["luồng tín hiệu", "stack truyền thông can", "đường đi tín hiệu", "gửi tín hiệu", "đường truyền tx", "truyền thông"],
    key: [
      "SWC Rte_Write -> Com_SendSignal (pack into I-PDU)",
      "Com transmission mode: periodic / direct / mixed",
      "PduR_ComTransmit -> CanIf_Transmit -> Can_Write",
      "Tx confirmation back: Can -> CanIf -> PduR -> Com",
      "Rx is the mirror: Can -> CanIf_RxIndication -> PduR -> Com"
    ],
    answer: "On the Tx side the SWC calls <code>Rte_Write</code>, and for an inter-ECU connection the RTE calls <code>Com_SendSignal</code>. <strong>Com</strong> packs the signal into the I-PDU buffer using the configured start bit, length and byte order, and decides when to send according to the transmission mode: periodic, direct on change, or mixed. When it transmits, it calls <code>PduR_ComTransmit</code>. <strong>PduR</strong> is a routing table that forwards the PDU to <code>CanIf_Transmit</code>. <strong>CanIf</strong> maps the PDU to a CAN ID and a hardware transmit handle, and calls <code>Can_Write</code>. The <strong>Can driver</strong> writes the mailbox in the controller. After a successful transmission the confirmation goes back up: <code>CanIf_TxConfirmation</code>, PduR, then <code>Com_TxConfirmation</code>. Rx is the mirror: the Can driver receives through interrupt or <code>Can_MainFunction_Read</code>, calls <code>CanIf_RxIndication</code>, CanIf filters and checks DLC, PduR forwards to <code>Com_RxIndication</code>, Com unpacks the signal, and the SWC reads it with <code>Rte_Read</code>. Next to this data path, CanSM, CanNm and ComM control whether communication is allowed at all.",
    followups: ["What is the difference between an I-PDU and an L-PDU?", "Where is deadline monitoring done and what does the SWC see on timeout?"]
  },
  {
    id: "autosar-16",
    topic: "autosar",
    type: "practical",
    q: "A signal is visible on the CAN bus but the SWC does not receive it. How do you debug?",
    vi: "Signal đã thấy trên bus CAN nhưng SWC không nhận được. Bạn debug như thế nào?",
    tags: ["debug", "CAN Rx", "signal not received", "CanIf_RxIndication", "Com_RxIndication", "I-PDU group", "HRH filter", "TRACE32", "CANoe", "gỡ lỗi"],
    viTags: ["gỡ lỗi", "không nhận được tín hiệu", "mất tín hiệu can", "nhận can", "lọc bản tin", "debug can rx"],
    key: [
      "Go bottom-up, get evidence at each layer",
      "Bus: ID, DLC, cycle, std vs extended in CANoe",
      "Can: controller STARTED, HRH filter matches ID",
      "CanIf_RxIndication hit? DLC check, PDU ID",
      "PduR route, Com I-PDU group started, unpack, RTE connection"
    ],
    answer: "I go <strong>bottom-up</strong> and want evidence at each layer, not guesses. First in CANoe I confirm the exact frame: ID, standard or extended, DLC, cycle time. Then the <strong>Can driver</strong>: is the controller in STARTED mode, and does a hardware receive object and filter actually match this ID and ID type? Then I put a breakpoint in TRACE32 on <code>CanIf_RxIndication</code>. If it is never hit, the problem is in the driver or filter. If it is hit, I check that the right Rx PDU is found, that the DLC check doesn't drop it, and that the CanIf PDU mode for that controller is online, because in offline mode CanIf silently drops Rx PDUs. Then <strong>PduR</strong>: is there a routing path to Com for that PDU? Then <strong>Com</strong>: <code>Com_RxIndication</code> is called, but is the I-PDU group started? BswM normally starts it, and if it isn't, Com ignores the PDU. Is deadline monitoring flagging a timeout? Then signal unpacking: byte order, start bit, length versus the DBC. Finally the <strong>RTE</strong>: is the R-port connected to that Com signal, and does the runnable actually run and read it? This is the kind of cross-layer investigation I did as BSW integrator on RH850. [fill: real case from CUBAS and which layer it turned out to be]",
    followups: ["If only extended-ID frames are lost, what do you suspect first?", "What would make CanIf_RxIndication be hit but Com never see the PDU?"]
  },
  {
    id: "autosar-17",
    topic: "autosar",
    type: "theory",
    q: "What are the roles of ComM, CanSM and CanNm?",
    vi: "Vai trò của ComM, CanSM và CanNm là gì?",
    tags: ["ComM", "CanSM", "CanNm", "network management", "bus-off", "communication mode", "FULL_COMMUNICATION", "sleep", "quản lý mạng"],
    viTags: ["quản lý mạng", "quản lý truyền thông", "trạng thái bus can", "lỗi bus-off", "chế độ ngủ", "chế độ truyền thông"],
    key: [
      "ComM: users request FULL/NO com per channel",
      "CanSM: controller + transceiver modes, bus-off recovery",
      "CanNm: coordinated sleep via NM PDUs",
      "CanNm states: Repeat Msg, Normal, Ready Sleep, Prepare/Bus Sleep",
      "BswM ties them to PDU groups and ECU modes"
    ],
    answer: "<strong>ComM</strong> is the communication manager. Users, meaning SWCs or Dcm, request a mode per channel with <code>ComM_RequestComMode</code>, full or no communication, and ComM combines the requests into a channel state. It then asks the bus state manager for that mode. For CAN that is <strong>CanSM</strong>, which actually drives the CAN controller through CanIf and the transceiver into started, stopped or sleep, and handles <strong>bus-off recovery</strong> with fast and slow recovery phases, reporting a DTC if it keeps happening. <strong>CanNm</strong> is AUTOSAR network management. It sends NM PDUs so that all ECUs on the bus agree when to sleep. As long as any node requests the network through <code>CanNm_NetworkRequest</code>, NM messages keep everyone awake. After release a node goes to Ready Sleep and stops sending NM messages. Once no NM message has been received for the NM timeout, it moves to Prepare Bus Sleep, and after the wait-bus-sleep time to Bus Sleep. BswM connects all of this: on ComM mode changes it starts or stops I-PDU groups in Com and can allow or disallow communication.",
    followups: ["What does CanSM do on repeated bus-off?", "What is partial networking and how does it affect CanNm?"]
  },
  {
    id: "autosar-18",
    topic: "autosar",
    type: "theory",
    q: "What do PduR and CanTp do, and how does a diagnostic request reach Dcm?",
    vi: "PduR và CanTp làm gì, và một request chẩn đoán đến được Dcm như thế nào?",
    tags: ["PduR", "CanTp", "transport protocol", "ISO 15765-2", "segmentation", "flow control", "STmin", "block size", "Dcm", "định tuyến PDU"],
    viTags: ["định tuyến pdu", "giao thức truyền tải", "phân đoạn bản tin", "điều khiển luồng", "yêu cầu chẩn đoán", "tp can"],
    key: [
      "PduR: static routing table, upper <-> lower modules",
      "Also gateway routing between buses",
      "CanTp: ISO 15765-2, SF/FF/CF/FC frames",
      "Flow control: block size, STmin, N_ timers",
      "Rx: CanIf -> CanTp -> PduR -> Dcm_StartOfReception/CopyRxData"
    ],
    answer: "<strong>PduR</strong> is a routing layer driven by a static table. It connects upper modules like Com and Dcm to lower modules like CanIf, CanTp and FrIf using PDU IDs, so upper layers don't know which bus they are on. It can also do gateway routing, one bus to another, either whole PDUs or TP on the fly. <strong>CanTp</strong> implements ISO 15765-2 to carry messages longer than one CAN frame. It uses single frame, first frame, consecutive frames and flow control, with block size, STmin and the N_As, N_Bs and N_Cr timeouts. For a diagnostic request the frame comes in through CanIf, which forwards it to CanTp for the diagnostic PDU. CanTp doesn't buffer the whole message: on the first frame it calls, through PduR, <code>Dcm_StartOfReception</code>, then streams each consecutive frame straight into Dcm's buffer with <code>Dcm_CopyRxData</code>, and calls <code>Dcm_TpRxIndication</code> at the end. The response goes back down the same way through <code>PduR_DcmTransmit</code>, with CanTp segmenting it. Physical and functional addressing are just different Rx PDUs routed to Dcm.",
    followups: ["What happens if the tester sends consecutive frames faster than STmin?", "What is the difference between PduR IF and TP routing?"]
  },

  /* ================= Diagnostics ================= */
  {
    id: "autosar-19",
    topic: "autosar",
    type: "theory",
    q: "Explain the roles of Dcm and Dem in AUTOSAR diagnostics.",
    vi: "Giải thích vai trò của Dcm và Dem trong chẩn đoán AUTOSAR.",
    tags: ["Dcm", "Dem", "DTC", "diagnostics", "UDS", "DSL", "DSD", "DSP", "event memory", "freeze frame", "chẩn đoán"],
    viTags: ["chẩn đoán", "mã lỗi", "bộ nhớ sự kiện", "quản lý lỗi", "ảnh chụp dữ liệu lỗi", "giao tiếp chẩn đoán"],
    key: [
      "Dcm: UDS server, handles tester requests",
      "Dcm sub-layers: DSL (session/timing), DSD (dispatch), DSP (processing)",
      "Dem: event status, debouncing, DTC storage",
      "Dem stores snapshots (freeze frames) and extended data",
      "Dcm 0x19/0x14 read/clear DTCs from Dem"
    ],
    answer: "<strong>Dcm</strong> is the diagnostic communication manager, basically the UDS server. It has three sub-layers. <strong>DSL</strong> handles sessions and timing: P2, P2 star, the S3 timer and response pending. <strong>DSD</strong> dispatches the request and checks the service is supported and allowed in the current session and security level. <strong>DSP</strong> processes the service, for example reading a DID through a callback or C/S port to an SWC, or calling a routine. <strong>Dem</strong> is the diagnostic event manager. Monitors in SWCs or BSW report event results with <code>Dem_SetEventStatus</code>, or through the RTE, and Dem debounces them, maintains the UDS status bits, and stores DTCs in event memory with snapshot data and extended data like occurrence counters and aging. It persists that memory through NvM. The two work together: services like <code>0x19 ReadDTCInformation</code> and <code>0x14 ClearDiagnosticInformation</code> are handled by Dcm but read or clear Dem's memory, and <code>0x85 ControlDTCSetting</code> tells Dem to stop storing. In my integration work Diag was one of the stacks I integrated and validated, and I also worked with UDS services directly.",
    followups: ["Where is FiM in this picture?", "How does an SWC provide DID data to Dcm?"]
  },
  {
    id: "autosar-20",
    topic: "autosar",
    type: "theory",
    q: "How does Dem debouncing work, and what do the DTC status bits mean?",
    vi: "Cơ chế debounce của Dem hoạt động thế nào, và các bit trạng thái DTC có ý nghĩa gì?",
    tags: ["Dem", "debouncing", "counter based", "time based", "DTC status byte", "pending", "confirmed", "operation cycle", "aging", "chống dội lỗi"],
    viTags: ["chống dội lỗi", "lọc lỗi", "trạng thái mã lỗi", "bit trạng thái dtc", "chu kỳ vận hành", "lão hóa lỗi", "lỗi xác nhận"],
    key: [
      "Monitors report PREFAILED/PREPASSED or FAILED/PASSED",
      "Counter-based: step up/down, fail and pass thresholds",
      "Time-based: fault must persist for a time",
      "Status bits: testFailed, pending, confirmed, warningIndicator...",
      "Operation cycle drives pending/confirmed and aging"
    ],
    answer: "Monitors report results with <code>Dem_SetEventStatus</code>. They can report a final FAILED or PASSED, or pre-qualified PREFAILED and PREPASSED and let Dem debounce. With <strong>counter-based</strong> debouncing, each PREFAILED increments the counter by a step and each PREPASSED decrements it, and the event qualifies as failed at the fail threshold and passed at the pass threshold. With jump-down enabled, the first PREPASSED after failing reports makes the counter jump to a configured jump-down value, often 0, instead of stepping down slowly. <strong>Time-based</strong> debouncing requires the fault to persist for a configured time. There is also monitor-internal debouncing. After qualification Dem updates the <strong>UDS status byte</strong>. Bit 0 is testFailed, bit 1 testFailedThisOperationCycle, bit 2 pendingDTC, bit 3 confirmedDTC, bit 4 testNotCompletedSinceLastClear, bit 5 testFailedSinceLastClear, bit 6 testNotCompletedThisOperationCycle, and bit 7 warningIndicatorRequested. <strong>Operation cycles</strong>, like ignition or power cycles, matter a lot: pending is cleared after a cycle without failure, confirmation may need the fault in several cycles, and aging removes a confirmed DTC after a number of healthy cycles. Freeze frames are captured at a configured trigger.",
    followups: ["Why is the debounce timing dependent on Dem_MainFunction period?", "What is the difference between an event and a DTC?"]
  },
  {
    id: "autosar-21",
    topic: "autosar",
    type: "theory",
    q: "How are UDS sessions and security access handled in Dcm?",
    vi: "Session UDS và security access được xử lý trong Dcm như thế nào?",
    tags: ["UDS", "0x10", "0x27", "session", "security access", "seed key", "S3 timer", "NRC", "Dcm", "phiên chẩn đoán", "bảo mật"],
    viTags: ["phiên chẩn đoán", "bảo mật", "truy cập bảo mật", "seed key", "mã phản hồi âm", "chuyển phiên"],
    key: [
      "0x10: default / extended / programming session",
      "Services and DIDs restricted by session and security level",
      "0x27: request seed (odd), send key (even)",
      "Attempt counter + delay timer, NRC 0x35/0x36/0x37",
      "S3 timeout falls back to default session, relocks"
    ],
    answer: "Sessions are changed with <code>0x10 DiagnosticSessionControl</code>: default 0x01, programming 0x02, extended 0x03, plus OEM-specific ones. In Dcm every service, sub-function, DID and routine is configured with the sessions and security levels in which it is allowed. If a tester calls something outside those, DSD answers with an NRC such as <code>0x7F</code> serviceNotSupportedInActiveSession or <code>0x33</code> securityAccessDenied. <strong>Security access</strong>, <code>0x27</code>, is seed and key: an odd sub-function requests the seed, the ECU generates it, and the tester answers with the key using the even sub-function. Dcm calls the GetSeed and CompareKey functions, which are callbacks or C/S ports implemented by an SWC or crypto module. A wrong key gives <code>0x35</code> invalidKey, too many attempts gives <code>0x36</code> and starts a delay timer, and requests during that delay give <code>0x37</code>. In a non-default session the <strong>S3 timer</strong> runs, and <code>0x3E TesterPresent</code> keeps it alive. On timeout Dcm falls back to the default session and security is locked again. Dcm can also notify BswM of session changes, for example to disable normal communication during programming.",
    followups: ["What is NRC 0x78 and when does Dcm send it?", "How would you test that the delay timer survives a reset, if required?"]
  },
  {
    id: "autosar-22",
    topic: "autosar",
    type: "practical",
    q: "How would you integrate a new DID and a new DTC into an existing AUTOSAR ECU?",
    vi: "Bạn tích hợp một DID mới và một DTC mới vào ECU AUTOSAR có sẵn như thế nào?",
    tags: ["DID", "DTC", "Dcm configuration", "Dem configuration", "0x22", "0x19", "event", "integration", "thêm DTC", "thêm DID"],
    viTags: ["thêm dtc", "thêm did", "cấu hình chẩn đoán", "mã lỗi mới", "đọc dữ liệu chẩn đoán", "cấu hình dcm dem"],
    key: [
      "DID: Dcm DID + data element, read/write via C/S port or callback",
      "Set session/security per DID, length and data type",
      "DTC: Dem event + DTC number + debounce + operation cycle",
      "Connect monitor SWC to Dem service port",
      "Verify with 0x22 / 0x19 / 0x14 over CANoe"
    ],
    answer: "For a <strong>DID</strong>, I add a Dcm DID with its data elements: length, data type, and whether it is readable, writable or both. I decide how the data is provided, usually through a C/S or S/R port to the owning SWC or a callback function. I set which sessions and security levels allow <code>0x22</code> and <code>0x2E</code>. Then I regenerate RTE and Dcm and connect the port. For a <strong>DTC</strong>, I add a Dem event with its debounce algorithm and thresholds, its operation cycle, event memory, snapshot and extended data records, and a DTC number and severity. I connect the monitoring SWC to Dem's service port so it can report with <code>Rte_Call_..._SetEventStatus</code>. I also check the NvM block for event memory is still sized correctly. Then I test with a tester in CANoe: read the DID in the right and wrong sessions, inject the fault, check the status byte goes through pending to confirmed with <code>0x19 02</code>, read the snapshot, clear it with <code>0x14</code>, and check it survives a power cycle. [fill: DID/DTC or UDS service you actually integrated or tested at Bosch]",
    followups: ["How do you test debouncing without real hardware faults?", "What happens to stored DTCs if the Dem configuration changes between SW versions?"]
  },

  /* ================= Memory ================= */
  {
    id: "autosar-23",
    topic: "autosar",
    type: "theory",
    q: "Explain the AUTOSAR memory stack and NvM block types.",
    vi: "Giải thích memory stack của AUTOSAR và các loại block NvM.",
    tags: ["NvM", "MemIf", "Fee", "Fls", "Ea", "Eep", "memory stack", "native", "redundant", "dataset", "block", "bộ nhớ không mất"],
    viTags: ["bộ nhớ không bay hơi", "stack bộ nhớ", "loại block nvm", "giả lập eeprom", "flash", "lưu dữ liệu"],
    key: [
      "NvM: block-level service for SWCs (read/write/restore)",
      "MemIf: abstracts Fee (flash) vs Ea (EEPROM)",
      "Fee: EEPROM emulation on flash, sectors, garbage collection",
      "Fls: MCAL flash driver, erase/write/read jobs",
      "Blocks: NATIVE, REDUNDANT, DATASET; RAM mirror, ROM default, CRC"
    ],
    answer: "The stack is layered. <strong>NvM</strong> at the service layer gives applications block-based access: <code>NvM_ReadBlock</code>, <code>NvM_WriteBlock</code>, <code>NvM_RestoreBlockDefaults</code>, plus <code>NvM_ReadAll</code> at startup and <code>NvM_WriteAll</code> at shutdown. Everything is asynchronous and processed in <code>NvM_MainFunction</code>. <strong>MemIf</strong> is a thin abstraction that routes to either <strong>Fee</strong> for flash or <strong>Ea</strong> for EEPROM. Fee emulates EEPROM on data flash: it writes new versions of blocks sequentially and, when a sector fills up, copies the valid data to the next one and erases the old sector. <strong>Fls</strong>, or Eep, is the MCAL driver doing the actual erase, write and read jobs. The three <strong>block types</strong>: <strong>native</strong> is one NV copy; <strong>redundant</strong> keeps two NV copies, so if one is corrupted the other is used; <strong>dataset</strong> is an array of instances selected with <code>NvM_SetDataIndex</code>. Each block can have a RAM mirror, ROM default data, a CRC, write protection and a priority. If the NV data is invalid, NvM can load the ROM defaults.",
    followups: ["What does NvM_SetRamBlockStatus do and why does WriteAll need it?", "How does Fee handle a power loss during a write?"]
  },
  {
    id: "autosar-24",
    topic: "autosar",
    type: "practical",
    q: "After a power cycle, an SWC finds its NvM data reset to defaults. How do you investigate?",
    vi: "Sau khi tắt bật nguồn, một SWC thấy dữ liệu NvM bị reset về mặc định. Bạn điều tra thế nào?",
    tags: ["NvM", "data loss", "NvM_WriteAll", "shutdown", "NvM_GetErrorStatus", "CRC", "Fee", "ReadAll", "mất dữ liệu", "debug"],
    viTags: ["mất dữ liệu", "dữ liệu về mặc định", "tắt bật nguồn", "lỗi ghi nvm", "lỗi crc", "bộ nhớ không bay hơi", "gỡ lỗi"],
    key: [
      "Was it ever written? Block marked dirty / WriteBlock called?",
      "Shutdown: WriteAll started and finished before power off?",
      "Check NvM_GetErrorStatus per block after ReadAll",
      "Layout or block ID changed between SW versions?",
      "SWC reading before ReadAll finished?"
    ],
    answer: "I split it into 'never written' versus 'written but not read back'. First, was it written? If the design relies on <code>NvM_WriteAll</code> at shutdown, was the block marked dirty with <code>NvM_SetRamBlockStatus</code>, or is it a permanent RAM block configured for WriteAll? Second, <strong>shutdown sequencing</strong>: did BswM or EcuM start WriteAll and actually <strong>wait for it to finish</strong>, through the job end notification or <code>NvM_GetErrorStatus</code>, before going down? Are <code>NvM_MainFunction</code>, <code>Fee_MainFunction</code> and <code>Fls_MainFunction</code> still scheduled during that phase? A classic bug is the ECU powering off before Fee has finished. Third, on the next startup, after <code>NvM_ReadAll</code> I check each block's status: <code>NVM_REQ_INTEGRITY_FAILED</code> points to a CRC or corruption problem, and <code>NVM_REQ_NV_INVALIDATED</code> or a restored-from-ROM result says there was no valid data. Fourth, did the block ID or size change between software versions without migration? Finally, is the SWC reading its RAM mirror before ReadAll has completed? With TRACE32 I can also inspect the Fee area directly. [fill: NvM or Mem issue you saw while integrating Mem on RH850, if any]",
    followups: ["How would you design shutdown so WriteAll can't be cut short?", "What is the difference between NvM_CancelWriteAll and NvM_KillWriteAll?"]
  },

  /* ================= Mode management ================= */
  {
    id: "autosar-25",
    topic: "autosar",
    type: "theory",
    q: "Describe the EcuM startup and shutdown sequence.",
    vi: "Mô tả trình tự khởi động và tắt nguồn của EcuM.",
    tags: ["EcuM", "startup", "shutdown", "StartOS", "DriverInitZero", "DriverInitOne", "BswM_Init", "NvM_ReadAll", "khởi động", "tắt nguồn"],
    viTags: ["khởi động", "tắt nguồn", "trình tự khởi tạo", "quản lý trạng thái ecu", "khởi tạo driver", "startup sequence"],
    key: [
      "EcuM_Init: DriverInitZero (Det, Dem_PreInit), select PB config",
      "Mcu_Init + clock, DriverInitOne (Port, Dio, Gpt, Wdg, Adc...)",
      "StartOS -> EcuM_StartupTwo: SchM_Init, BswM_Init",
      "BswM inits rest: Can/Com/PduR, NvM_ReadAll, Rte_Start",
      "Shutdown: BswM deinit + WriteAll, EcuM_GoDown -> ShutdownOS"
    ],
    answer: "With flexible EcuM, startup begins in <code>EcuM_Init</code> before the OS. It runs <strong>DriverInitZero</strong> for things like Det and <code>Dem_PreInit</code>, determines the post-build configuration, calls <code>Mcu_Init</code> and sets up the clock and PLL, then runs <strong>DriverInitOne</strong> for the basic MCAL drivers like Port, Dio, Gpt, Wdg, Adc and Icu. Then it calls <code>StartOS</code>. In the first OS task, <code>EcuM_StartupTwo</code> initialises SchM and <strong>BswM</strong>, and from that point BswM rules take over. They initialise the rest of the stack: CanIf, Can, PduR, Com, CanSM, ComM, Dcm, Dem, the memory stack, then trigger <code>NvM_ReadAll</code>. Only when that is done do they start the RTE with <code>Rte_Start</code> and allow communication. Shutdown is the reverse. When no one requests RUN anymore, BswM stops communication, runs <code>NvM_WriteAll</code> and waits for it, de-initialises modules, selects the shutdown target with <code>EcuM_SelectShutdownTarget</code>, and calls <code>EcuM_GoDown</code>. That leads to <code>ShutdownOS</code> and finally switch-off or reset. Init order was a recurring topic for me when integrating EcuM, BswM and the other stacks on RH850.",
    followups: ["Why must NvM_ReadAll finish before Rte_Start?", "What goes into DriverInitZero vs DriverInitOne and why?"]
  },
  {
    id: "autosar-26",
    topic: "autosar",
    type: "theory",
    q: "How does BswM work? Explain mode requests, rules and action lists.",
    vi: "BswM hoạt động như thế nào? Giải thích mode request, rule và action list.",
    tags: ["BswM", "mode request", "rule", "action list", "logical expression", "PduGroupSwitch", "immediate", "deferred", "quản lý mode", "BSW mode manager"],
    viTags: ["quản lý mode", "yêu cầu chế độ", "luật điều kiện", "danh sách hành động", "biểu thức logic", "chuyển chế độ"],
    key: [
      "Inputs: mode request ports from EcuM, ComM, Dcm, NvM, SWCs",
      "Mode conditions combined into logical expressions",
      "Rules evaluated immediately or deferred in BswM_MainFunction",
      "True/false action lists: trigger vs condition execution",
      "Actions: PDU group switch, ComM allow, Rte_Switch, callouts, GoDown"
    ],
    answer: "BswM is a <strong>configurable rule engine</strong>. Its inputs are <strong>mode request ports</strong> and mode indications from other modules and SWCs: EcuM state and wakeups, ComM channel modes, Dcm session or communication control, CanSM, NvM job results, and application mode requests through the RTE. Each input can be processed <strong>immediately</strong> when it arrives, or <strong>deferred</strong> to the next <code>BswM_MainFunction</code>. You define <strong>mode conditions</strong>, like 'ComM channel 0 is FULL_COMMUNICATION', combine them into <strong>logical expressions</strong>, and each <strong>rule</strong> links an expression to a true action list and optionally a false one. Action lists run either every time the rule is evaluated or only when the result changes. The <strong>actions</strong> are things like starting or stopping I-PDU groups in Com, allowing communication in ComM, switching RTE modes with <code>Rte_Switch</code>, controlling NM, calling user callouts, for example the init sequences, or requesting <code>EcuM_GoDown</code>. When I integrated BswM, most issues were about rules evaluating in the wrong order or at the wrong time, so tracing mode requests was my main debug method.",
    followups: ["Why might a rule be deferred rather than immediate?", "How do you debug a BswM rule that never fires?"]
  },
  {
    id: "autosar-27",
    topic: "autosar",
    type: "practical",
    q: "The ECU does not go to sleep, or wakes up immediately. How do you debug it?",
    vi: "ECU không vào chế độ ngủ, hoặc vừa ngủ đã thức dậy ngay. Bạn debug như thế nào?",
    tags: ["sleep", "wakeup", "ECU does not sleep", "ComM", "CanNm", "EcuM wakeup validation", "BswM", "RUN request", "không ngủ", "debug"],
    viTags: ["không ngủ", "chế độ ngủ", "đánh thức", "thức dậy ngay", "xác thực wakeup", "gỡ lỗi"],
    key: [
      "Who still holds a request: ComM user, EcuM RUN, Dcm session?",
      "CanNm: another node keeps NM alive? Network released?",
      "BswM: shutdown rule conditions actually true?",
      "Immediate wake: wakeup source not cleared or not validated",
      "Measure: bus trace + breakpoints on mode transitions"
    ],
    answer: "For 'won't sleep' I ask <strong>who is still holding a request</strong>. On the ComM side, is any user still requesting full communication, or has an SWC or Dcm kept a request? An active non-default diagnostic session can also keep the ECU awake. On the NM side, did we call <code>CanNm_NetworkRelease</code>, and in the bus trace is another node still sending NM PDUs? Then that is not our problem, the network is legitimately awake. On the EcuM side, is some user still holding a RUN request? Then I check the <strong>BswM shutdown rule</strong>: I read the mode conditions it depends on and see which one is false. For 'wakes up immediately' I look at <strong>wakeup sources</strong>. Is a source still pending from before sleep and not cleared? Is the transceiver or the pin configured to wake on the wrong edge? Is <code>EcuM_ValidateWakeupEvent</code> being called for a spurious wakeup that should have failed validation? I combine a CANoe trace of NM frames with breakpoints on mode transitions and wakeup callouts in TRACE32. [fill: sleep/wakeup issue from CUBAS, if you had one]",
    followups: ["What is wakeup validation and why is it needed for CAN?", "How do you measure quiescent current to confirm real sleep?"]
  },

  /* ================= OS ================= */
  {
    id: "autosar-28",
    topic: "autosar",
    type: "theory",
    q: "Explain OSEK/AUTOSAR OS task states, basic vs extended tasks and conformance classes.",
    vi: "Giải thích các trạng thái task trong OSEK/AUTOSAR OS, basic task và extended task, và các conformance class.",
    tags: ["OSEK", "AUTOSAR OS", "task states", "basic task", "extended task", "BCC1", "BCC2", "ECC1", "ECC2", "conformance class", "trạng thái task"],
    viTags: ["trạng thái task", "task cơ bản", "task mở rộng", "lớp tuân thủ", "hệ điều hành thời gian thực", "osek"],
    key: [
      "States: SUSPENDED, READY, RUNNING, WAITING (extended only)",
      "Basic: run to completion, no WaitEvent",
      "Extended: can WaitEvent, needs own stack",
      "BCC1/BCC2/ECC1/ECC2: multiple activations, tasks per priority",
      "Static, priority-based, preemptive or non-preemptive"
    ],
    answer: "OSEK and AUTOSAR OS are <strong>static, priority-based</strong> kernels: all tasks, priorities and stacks are configured at build time. A task is <strong>SUSPENDED</strong> until activated by <code>ActivateTask</code>, an alarm or a schedule table. Then it is <strong>READY</strong>, the scheduler makes the highest-priority ready task <strong>RUNNING</strong>, and it ends with <code>TerminateTask</code> or <code>ChainTask</code>. <strong>Basic tasks</strong> only have these three states and run to completion, so several basic tasks can share one stack. <strong>Extended tasks</strong> can also call <code>WaitEvent</code> and enter the <strong>WAITING</strong> state until another task or ISR calls <code>SetEvent</code>. Because they keep their context while waiting, they need their own stack. The <strong>conformance classes</strong> define what the OS supports. BCC1 is basic tasks only, one activation each, one task per priority. BCC2 adds multiple queued activations and multiple tasks per priority. ECC1 and ECC2 add extended tasks, but an extended task can never have more than one activation, even in ECC2; only basic tasks get queued activations. Activating a task that has no activations left returns <code>E_OS_LIMIT</code>. Tasks can be fully preemptive or non-preemptive, where non-preemptive tasks give up the CPU only at <code>Schedule()</code>, <code>WaitEvent</code> or termination.",
    followups: ["When would you choose an extended task over basic tasks?", "What happens if ActivateTask is called on an already active BCC1 task?"]
  },
  {
    id: "autosar-29",
    topic: "autosar",
    type: "theory",
    q: "What are OS resources and how does the priority ceiling protocol work?",
    vi: "OS resource là gì và giao thức priority ceiling hoạt động như thế nào?",
    tags: ["resource", "GetResource", "ReleaseResource", "priority ceiling", "PCP", "priority inversion", "deadlock", "RES_SCHEDULER", "tài nguyên", "đảo ưu tiên"],
    viTags: ["tài nguyên", "tài nguyên dùng chung", "đảo ưu tiên", "trần ưu tiên", "khóa chết", "loại trừ lẫn nhau"],
    key: [
      "GetResource/ReleaseResource protect shared data",
      "Ceiling = highest priority of any user of the resource",
      "Task raised to ceiling on GetResource (immediate PCP)",
      "Avoids priority inversion and deadlock, no blocking",
      "Rules: LIFO nesting, no WaitEvent/TerminateTask while held"
    ],
    answer: "Resources protect data or peripherals shared between tasks, and optionally cat2 ISRs. A task calls <code>GetResource(RES_X)</code> before the critical section and <code>ReleaseResource(RES_X)</code> after. OSEK uses the <strong>immediate priority ceiling protocol</strong>. At configuration time each resource gets a ceiling priority equal to the highest priority of all tasks and ISRs that use it. When a task takes the resource, its priority is <strong>immediately raised to the ceiling</strong>, so no other user of that resource can preempt it. Tasks with a higher priority that don't use the resource can still run. The benefits: no task ever blocks on a resource, so there is no classic priority inversion with a medium task running in between, and <strong>deadlock is impossible</strong>, because once you hold the resource nobody who needs it can run. The rules are that resources are released in LIFO order, and you must not call <code>TerminateTask</code> or <code>WaitEvent</code> while holding one. <code>RES_SCHEDULER</code> is a predefined resource that makes the task effectively non-preemptive. SchM exclusive areas can be implemented on top of resources.",
    followups: ["Why can't an extended task wait while holding a resource?", "Resource vs SuspendAllInterrupts: when do you use which?"]
  },
  {
    id: "autosar-30",
    topic: "autosar",
    type: "theory",
    q: "Explain ISR categories, alarms and schedule tables in AUTOSAR OS.",
    vi: "Giải thích các loại ISR, alarm và schedule table trong AUTOSAR OS.",
    tags: ["ISR category 1", "ISR category 2", "alarm", "counter", "schedule table", "expiry point", "SetRelAlarm", "interrupt", "ngắt", "bảng lịch"],
    viTags: ["ngắt", "bảng lịch", "loại isr", "bộ đếm", "báo thức", "kích hoạt định kỳ"],
    key: [
      "Cat1: bypasses OS, fastest, almost no OS API",
      "Cat2: OS wrapper, may call ActivateTask/SetEvent",
      "Alarm: counter-based, activates task / sets event / callback",
      "Schedule table: expiry points with offsets on one counter",
      "Schedule tables can sync to global time"
    ],
    answer: "A <strong>category 1 ISR</strong> runs without OS involvement. It has the lowest latency but can't call OS services except a few interrupt enable and disable functions, and it can't activate tasks, so the OS never knows it ran. A <strong>category 2 ISR</strong> is framed by the OS. It can call <code>ActivateTask</code>, <code>SetEvent</code> and similar services, and the rescheduling happens when it ends. Most BSW ISRs, like Can or Gpt notifications, are cat2, and they must be declared in the OS configuration, not installed manually in the vector table. <strong>Alarms</strong> are attached to a <strong>counter</strong>, usually driven by a hardware timer tick. When an alarm expires it activates a task, sets an event, or calls a callback. It can be one-shot or cyclic, started with <code>SetRelAlarm</code> or <code>SetAbsAlarm</code>. <strong>Schedule tables</strong> group several <strong>expiry points</strong> at fixed offsets on one counter, each activating tasks or setting events. That gives deterministic phase relationships, for example a 10 ms task always 2 ms after the 5 ms task, and they can be synchronised to a global time source. The RTE generator typically uses them for timing events.",
    followups: ["Why would a cat1 ISR that calls ActivateTask be a bug?", "When would you prefer a schedule table over several alarms?"]
  },
  {
    id: "autosar-31",
    topic: "autosar",
    type: "theory",
    q: "What are OS-Applications, scalability classes and memory protection in AUTOSAR OS?",
    vi: "OS-Application, scalability class và memory protection trong AUTOSAR OS là gì?",
    tags: ["OS-Application", "scalability class", "SC1", "SC3", "memory protection", "MPU", "timing protection", "ProtectionHook", "trusted", "bảo vệ bộ nhớ"],
    viTags: ["bảo vệ bộ nhớ", "lớp mở rộng", "bảo vệ thời gian", "ứng dụng os", "phân vùng", "an toàn chức năng"],
    key: [
      "SC1: OSEK-like + schedule tables, stack monitoring",
      "SC2: timing protection; SC3: memory protection; SC4: both",
      "OS-Application groups tasks, ISRs, alarms, counters",
      "Trusted vs non-trusted; MPU per application",
      "Violations -> ProtectionHook decides the reaction"
    ],
    answer: "AUTOSAR OS has four <strong>scalability classes</strong>. <strong>SC1</strong> is OSEK plus schedule tables and stack monitoring. <strong>SC2</strong> adds <strong>timing protection</strong>: execution budgets, arrival rate limits and lock time limits. <strong>SC3</strong> adds <strong>memory protection</strong> and OS-Applications with MPU support. <strong>SC4</strong> combines SC2 and SC3. An <strong>OS-Application</strong> is a group of OS objects that belong together: tasks, cat2 ISRs, alarms, counters and schedule tables, usually aligned with a software partition such as ASIL versus QM. An application is either <strong>trusted</strong>, running in supervisor mode with full access, or <strong>non-trusted</strong>, running in user mode with the MPU restricting it to its own data sections, stack and allowed peripherals. That is the freedom-from-interference argument for mixed-criticality ECUs. Communication across applications goes through the RTE or IOC. When a violation happens, such as a memory access outside the region, a budget overrun or a stack fault, the OS calls the <strong>ProtectionHook</strong>, which decides to terminate the task or application, restart the application, or shut down. For integration this means MemMap and linker sections must follow the partitioning exactly.",
    followups: ["How does memory partitioning affect MemMap and the linker script?", "What is IOC and when is it needed?"]
  },
  {
    id: "autosar-32",
    topic: "autosar",
    type: "practical",
    q: "The ECU resets randomly after integrating a new feature. You suspect a stack overflow. How do you confirm and fix it?",
    vi: "ECU bị reset ngẫu nhiên sau khi tích hợp một tính năng mới. Bạn nghi ngờ tràn stack. Làm sao để xác nhận và sửa?",
    tags: ["stack overflow", "random reset", "E_OS_STACKFAULT", "ProtectionHook", "stack fill pattern", "TRACE32", "reset reason", "stack size", "tràn stack", "reset ngẫu nhiên"],
    viTags: ["tràn stack", "reset ngẫu nhiên", "nguyên nhân reset", "kích thước stack", "mẫu điền stack", "gỡ lỗi"],
    key: [
      "Read reset cause register first; watchdog vs exception",
      "Enable OS stack monitoring -> ProtectionHook / E_OS_STACKFAULT",
      "Fill stacks with pattern, read high-water mark in TRACE32",
      "Worst case: deepest call path + ISR nesting",
      "Fix: resize stack, move big locals, re-check with static analysis"
    ],
    answer: "First I don't assume. I read the <strong>reset reason</strong> from the MCU registers and see whether it is a watchdog, an exception or a software reset. Then I make sure OS <strong>stack monitoring</strong> is enabled and put breakpoints in the <code>ProtectionHook</code> and <code>ErrorHook</code>. A stack overflow shows up as <code>E_OS_STACKFAULT</code> with the task identified. To measure headroom I use the <strong>fill-pattern method</strong>: the stacks are filled with a known pattern at startup, I run the worst-case scenario, and in TRACE32 I check how much of each task stack was overwritten. I also look at the call stack at the moment of the fault. The worst case is the deepest call path in that task plus interrupt nesting, if ISRs use the task stack on that OS. Common causes after a new feature: a new runnable mapped into an already tight task, large local arrays or structs, or deeper library calls. The fix is to resize the stack with margin, move large buffers to static memory, or remap the runnable. Then I confirm with static stack analysis from the compiler or a tool, not just one measurement. [fill: whether you debugged a stack or reset issue with TRACE32 in CUBAS]",
    followups: ["Why can stack monitoring miss an overflow?", "How would you track stack usage continuously in CI?"]
  },

  /* ================= MCAL ================= */
  {
    id: "autosar-33",
    topic: "autosar",
    type: "practical",
    q: "What are the key MCAL modules, and what typical configuration bugs do you see?",
    vi: "Các module MCAL chính là gì, và bạn thường gặp những lỗi cấu hình nào?",
    tags: ["MCAL", "Port", "Dio", "Adc", "Gpt", "Pwm", "Icu", "Wdg", "Mcu", "Spi", "Fls", "configuration bugs", "lỗi cấu hình"],
    viTags: ["lỗi cấu hình", "module mcal", "driver vi điều khiển", "cấu hình chân", "trình điều khiển cấp thấp", "cấu hình mcal"],
    key: [
      "Port: pin mux/direction wrong -> Dio write has no effect",
      "Mcu: clock/PLL wrong -> all timings scaled",
      "Adc: result buffer not set up, wrong trigger / group mode",
      "Gpt/Icu/Pwm: notification disabled, tick or units wrong",
      "Wdg: window violated, trigger task starved; Spi/Fls sequence and job setup"
    ],
    answer: "<strong>Mcu</strong> sets clocks and reset handling, <strong>Port</strong> sets pin mode, mux and direction, <strong>Dio</strong> reads and writes channels, <strong>Adc</strong> does group conversions, <strong>Gpt</strong> provides timers, <strong>Pwm</strong> and <strong>Icu</strong> handle output and input capture, <strong>Wdg</strong> is the watchdog, <strong>Spi</strong> uses sequences, jobs and channels, and <strong>Fls</strong> is the flash driver under Fee. Typical bugs: a pin is left in the wrong alternate function in Port, so <code>Dio_WriteChannel</code> does nothing. The <strong>clock reference</strong> is wrong in Mcu, so every Gpt, Pwm and baud rate is off by the same factor. <code>Adc_SetupResultBuffer</code> is not called before <code>Adc_StartGroupConversion</code>, which gives a DET error, or a hardware-triggered group is configured without enabling the trigger. Gpt or Icu notifications are configured but <code>Gpt_EnableNotification</code> is never called. Pwm duty is written in the wrong units, since AUTOSAR uses 0x8000 for 100 percent. A <strong>window watchdog</strong> is triggered too early. For Spi, buffers aren't set up with <code>Spi_SetupEB</code> or <code>Spi_WriteIB</code>, or jobs are in the wrong order. With DET enabled, <code>Det_ReportError</code> with module, API and error ID usually points straight at the problem.",
    followups: ["Why is Mcu_DistributePllClock called only after the PLL is locked?", "How do you verify a Pwm period independently of the software?"]
  },
  {
    id: "autosar-34",
    topic: "autosar",
    type: "practical",
    q: "Tell me about your MCAL validation work. How did you test drivers on target and on VECU?",
    vi: "Kể về công việc kiểm thử MCAL của bạn. Bạn đã test driver trên target và trên VECU như thế nào?",
    tags: ["MCAL validation", "unit test", "component test", "VECU", "target hardware", "DIO", "ADC", "watchdog", "Cantata", "Pytest", "kiểm thử MCAL"],
    viTags: ["kiểm thử mcal", "kiểm thử đơn vị", "kiểm thử thành phần", "phần cứng thật", "ecu ảo", "kiểm thử driver"],
    key: [
      "Groups: digital I/O, analog, timer, communication, watchdog",
      "Requirement analysis -> test design -> execution -> evidence (ASPICE)",
      "Target: real registers, pins, timing, measured with TRACE32",
      "VECU: early, repeatable runs, fault injection",
      "Tools: Pytest, Cantata, ECU-Test; mocking, stubbing, coverage"
    ],
    answer: "From September 2022 I did MCAL unit and component validation across the <strong>digital I/O, analog, timer, communication and watchdog</strong> driver groups, both on <strong>target hardware</strong> and on <strong>VECU</strong>. The flow started with the requirements. I analysed the driver SWS and project requirements, designed test cases with traceability back to them, executed them, and produced evidence for ASPICE reviews. At unit level I used Cantata with mocking and stubbing to isolate the driver from hardware and cover edge cases and error paths, including the DET error checks for invalid parameters or uninitialised calls. At component level I tested on target, where you see real register behavior, real pin levels and real timing, and I used TRACE32 to inspect registers and memory. VECU was useful for fast, repeatable runs and for fault injection that's hard to create on hardware. Pytest and ECU-Test drove the automation. The value of doing both is that VECU catches logic problems early, and the target catches hardware and timing reality. [fill: one concrete MCAL defect you found, e.g. which driver and symptom]",
    followups: ["What can't you validate on a VECU?", "How did you test watchdog behavior without resetting the test setup every time?"]
  },

  /* ================= Integration errors / practice ================= */
  {
    id: "autosar-35",
    topic: "autosar",
    type: "practical",
    q: "What are the most common AUTOSAR integration errors, and how do you find them?",
    vi: "Những lỗi tích hợp AUTOSAR phổ biến nhất là gì, và bạn tìm ra chúng như thế nào?",
    tags: ["integration errors", "RTE generation error", "unconnected port", "data type mismatch", "init order", "section overflow", "linker error", "DET", "lỗi tích hợp"],
    viTags: ["lỗi tích hợp", "lỗi sinh rte", "port chưa kết nối", "sai kiểu dữ liệu", "thứ tự khởi tạo", "lỗi linker", "tràn section"],
    key: [
      "RTE gen: unconnected ports, incompatible interfaces/types",
      "Link: undefined Rte_/MainFunction, missing files, version mismatch",
      "Linker: memory region overflow, unmapped sections",
      "Runtime: DET from wrong init order, NULL config pointer",
      "Behaviour: stack overflow, task overrun, wrong signal scaling"
    ],
    answer: "I group them by the stage where they appear. At <strong>RTE generation</strong>: unconnected required ports, interfaces that aren't compatible, data type mismatches such as different implementation types or array sizes on the two sides, and runnables whose events aren't mapped to any task. At <strong>compile and link</strong>: undefined references to <code>Rte_Write_...</code> or <code>&lt;Mod&gt;_MainFunction</code>, meaning a module isn't enabled, a file is missing from the build, or the static code and generator versions don't match. Also memory region overflows and sections that were never mapped in MemMap. At <strong>startup</strong>: DET errors because a module is used before its init, or init is called with the wrong configuration pointer. <code>Det_ReportError</code> gives module, API and error ID, so a breakpoint there is my first step. At <strong>runtime</strong>: stack overflows, task overruns after new runnables, and signals with wrong values from byte order or scaling mismatches with the DBC. My approach is to integrate one change at a time on a green baseline, so when something breaks I know what caused it. [fill: typical errors you hit most often in CUBAS]",
    followups: ["How would CI catch these errors before a human does?", "How do you report an integration defect to a BSW team so it gets fixed quickly?"]
  },
  {
    id: "autosar-36",
    topic: "autosar",
    type: "practical",
    q: "RTE generation fails with a data type mismatch between two connected ports. How do you resolve it?",
    vi: "Sinh RTE bị lỗi do không khớp kiểu dữ liệu giữa hai port được nối với nhau. Bạn giải quyết thế nào?",
    tags: ["RTE generation", "data type mismatch", "implementation data type", "application data type", "data type mapping", "compatibility", "compu method", "kiểu dữ liệu"],
    viTags: ["kiểu dữ liệu", "không khớp kiểu", "lỗi sinh rte", "ánh xạ kiểu dữ liệu", "tương thích", "kiểu dữ liệu ứng dụng"],
    key: [
      "Read which element and which two types clash",
      "Application type vs implementation type vs mapping set",
      "Often: same name, different package or size",
      "Fix at the source ARXML with the owner, not a local hack",
      "Re-validate, regenerate, check no other ports depend on it"
    ],
    answer: "First I read the error carefully: which connector, which data element, and which two types it's comparing. AUTOSAR has <strong>application data types</strong>, the physical meaning with compu methods and units, and <strong>implementation data types</strong>, the C representation like <code>uint16</code> or a struct, linked by <strong>data type mapping sets</strong>. A mismatch usually means one of these. Two SWCs define 'the same' type in different ARXML packages. One side is <code>uint8</code> and the other <code>uint16</code>. An array or record has a different length or element order. Or one SWC's mapping set is missing, so the generator can't resolve the implementation type. I compare both definitions in the ARXML, decide which one is right according to the interface specification or communication matrix, and get it fixed at the <strong>source</strong>, the owning SWC team or the shared data type package. I don't patch the generated code or put a local override in the integration project, because that breaks again with the next delivery. Then I re-validate, regenerate, and check that other connections to the same interface still work.",
    followups: ["Why should shared data types live in one common ARXML package?", "Can two ports with different but compatible types be connected?"]
  },
  {
    id: "autosar-37",
    topic: "autosar",
    type: "theory",
    q: "How does AUTOSAR support portable, reusable and modular software?",
    vi: "AUTOSAR hỗ trợ phần mềm khả chuyển, tái sử dụng và mô-đun hóa như thế nào?",
    tags: ["portability", "reusability", "modularity", "standardized interfaces", "hardware independence", "Platform_Types", "configuration", "tái sử dụng", "khả chuyển"],
    viTags: ["tái sử dụng", "khả chuyển", "mô-đun hóa", "độc lập phần cứng", "giao diện chuẩn hóa", "chuyển đổi nền tảng"],
    key: [
      "Standard module APIs (SWS) across vendors",
      "SWCs HW-independent, only ports via RTE",
      "Configuration instead of code changes",
      "Platform_Types / Std_Types, Compiler and MemMap abstraction",
      "Swap MCAL for new MCU, keep upper layers"
    ],
    answer: "It works at several levels. <strong>Standardised interfaces</strong>: every BSW module has an SWS that fixes its API, like <code>Com_SendSignal</code>, <code>NvM_WriteBlock</code> or <code>CanIf_Transmit</code>, so modules from different vendors fit together. <strong>Hardware independence</strong> of application code: SWCs only talk to ports, so an SWC can move to another ECU or MCU just by regenerating the RTE. Only the MCAL and some ECU abstraction change for a new microcontroller. <strong>Configuration over code</strong>: the same static BSW code serves many projects, and the project-specific behavior sits in generated configuration, using the configuration classes. <strong>Platform abstraction</strong>: <code>Platform_Types.h</code> and <code>Std_Types.h</code> give fixed-width types, and Compiler and MemMap abstraction isolate compiler pragmas and memory placement, so the same code builds on different compilers. <strong>Modularity</strong>: clear layers and one responsibility per module make it possible to integrate, test and replace components independently. In practice that is what I saw on RH850 D3, D4 and D5: largely the same BSW stack, with the MCAL and configuration adapted per derivative.",
    followups: ["What still breaks portability in real projects?", "How would you wrap a legacy non-AUTOSAR library to keep it reusable?"]
  },
  {
    id: "autosar-38",
    topic: "autosar",
    type: "practical",
    q: "How do you optimise code for a specific target and compiler in an AUTOSAR project?",
    vi: "Bạn tối ưu code cho một target và compiler cụ thể trong dự án AUTOSAR như thế nào?",
    tags: ["optimization", "code optimization", "RTE optimization", "inlining", "fast RAM", "compiler options", "map file", "pre-compile", "tối ưu", "compiler"],
    viTags: ["tối ưu", "tối ưu code", "tùy chọn biên dịch", "tối ưu rte", "file map", "hiệu năng", "ram nhanh"],
    key: [
      "Measure first: map file, trace, cycle counter",
      "Pre-compile config + DET off in release = dead code removed",
      "RTE: direct calls, macros, fewer copies from mapping",
      "MemMap: hot code/ISRs/buffers into fast local RAM",
      "Per-file compiler options; test the build you ship"
    ],
    answer: "I start by <strong>measuring</strong>, using the map file for ROM and RAM per module and trace or cycle counters for runtime, so I optimise the right thing. Inside AUTOSAR there are several levers. <strong>Configuration</strong>: use pre-compile variants where possible and turn off development error detection in release builds, so the compiler can remove dead code and checks. <strong>RTE</strong>: generators can implement <code>Rte_Read</code> and <code>Rte_Write</code> as macros or direct variable accesses when both sides are on the same core with no concurrency, and a smart runnable-to-task mapping avoids implicit copies and exclusive areas. <strong>Memory placement</strong>: through MemMap and the linker script, put ISRs, hot runnables and frequently used buffers into fast local RAM or tightly coupled memory, and keep large constant tables in flash. <strong>Compiler</strong>: choose optimisation per file, for example speed for ISRs and size elsewhere, use inlining for small accessors, and use native 32-bit types for loop counters. Finally, I test and time the <strong>exact build configuration that ships</strong>, since missing <code>volatile</code> and similar bugs often appear only at higher optimisation levels.",
    followups: ["How would you track ROM/RAM growth per build in CI?", "What are the risks of aggressive inlining?"]
  },

  /* ================= Classic vs Adaptive ================= */
  {
    id: "autosar-39",
    topic: "autosar",
    type: "theory",
    q: "What are the main differences between AUTOSAR Classic and AUTOSAR Adaptive?",
    vi: "Những khác biệt chính giữa AUTOSAR Classic và AUTOSAR Adaptive là gì?",
    tags: ["Classic vs Adaptive", "AUTOSAR Adaptive", "ARA", "POSIX", "SOME/IP", "service-oriented", "execution management", "C++", "so sánh"],
    viTags: ["so sánh", "khác biệt classic adaptive", "hướng dịch vụ", "kiến trúc adaptive", "quản lý thực thi", "nền tảng adaptive"],
    key: [
      "Classic: static config, OSEK OS, C, signal-based",
      "Adaptive: POSIX OS, C++ ara:: APIs, service-oriented (SOME/IP)",
      "Adaptive: processes, Execution/State Management, dynamic deployment",
      "Classic for deep-embedded real-time; Adaptive for HPC",
      "Both coexist in one vehicle, gatewayed"
    ],
    answer: "<strong>Classic</strong> targets deeply embedded microcontrollers. Everything is statically configured at build time, it runs on an OSEK-based OS, it is written in C, communication is mainly signal-based over CAN, LIN or FlexRay, and it has hard real-time behavior. <strong>Adaptive</strong> targets high-performance processors. It runs on a POSIX OS like Linux or QNX, applications are C++ processes using the <code>ara::</code> APIs, and communication is <strong>service-oriented</strong> through <code>ara::com</code>, typically SOME/IP over Ethernet, with service discovery at runtime. Instead of EcuM and BswM there are <strong>Execution Management</strong>, which starts and monitors processes from manifests, and <strong>State Management</strong>. There are also functional clusters for logging, persistency, diagnostics, update and configuration management. Deployment is more dynamic, and software can be updated per application. In a vehicle both coexist: Classic ECUs for actuators and real-time control, Adaptive for domain or zone controllers and connectivity. I worked with Classic as a BSW integrator, and later did system-level testing of an Adaptive ARA stack.",
    followups: ["How does a Classic ECU exchange data with an Adaptive one?", "What replaces the RTE in Adaptive?"]
  },
  {
    id: "autosar-40",
    topic: "autosar",
    type: "practical",
    q: "You did system testing on AUTOSAR Adaptive. What was different compared to your Classic integration work?",
    vi: "Bạn đã làm system test trên AUTOSAR Adaptive. Điều gì khác so với công việc tích hợp Classic của bạn?",
    tags: ["AUTOSAR Adaptive", "ARA", "system test", "QNX", "Embedded Linux", "R-Car", "Raspberry Pi", "Classic vs Adaptive", "kiểm thử hệ thống"],
    viTags: ["kiểm thử hệ thống", "kinh nghiệm adaptive", "so sánh classic adaptive", "linux nhúng", "khác biệt khi test", "dự án đã làm"],
    key: [
      "Platforms: Raspberry Pi 4, R-Car, QNX, Embedded Linux",
      "Debug level: processes, services, networking, logs",
      "Classic: registers, TRACE32, static config",
      "Adaptive: manifests, service discovery, remote debugging",
      "Automation + CI (Azure Pipelines, Conan) for repeatability"
    ],
    answer: "From May 2024 I did system-level validation of the <strong>AUTOSAR Adaptive ARA stack</strong> on Raspberry Pi 4, Renesas R-Car, QNX and Embedded Linux. The biggest difference is the <strong>level at which you debug</strong>. In Classic on RH850 I was looking at registers, memory, and the static configuration of BSW modules with TRACE32, and failures were usually a wrong parameter, init order or timing. In Adaptive the stack consists of processes and services on a POSIX OS, so investigation meant Linux process and service handling, networking, remote debugging and log analysis. Typical questions were whether a process started as its manifest says, whether a service is offered and found, or whether a network configuration is wrong on one platform. Testing across four platforms also meant separating platform-specific issues from stack issues. The second difference is dynamics: Classic is fully static, Adaptive has runtime service discovery and process lifecycles, so ordering and timing issues look different. What carried over was the systematic approach: reproduce, isolate the layer, prove it with evidence. We integrated build, packaging and test with Azure Pipelines and Conan for repeatable runs. [fill: one concrete ARA system-level issue you isolated]",
    followups: ["How did you separate platform issues from stack issues across four targets?", "What did your test framework automate?"]
  },

  /* ================= EB tresos bridge ================= */
  {
    id: "autosar-41",
    topic: "autosar",
    type: "practical",
    bridge: true,
    q: "Have you worked with EB tresos Studio? How would you get productive with it?",
    vi: "Bạn đã làm việc với EB tresos Studio chưa? Bạn sẽ làm quen để làm việc hiệu quả với nó như thế nào?",
    tags: ["EB tresos", "tresos Studio", "Elektrobit", "RTA-CAR", "ISOLAR", "configuration tool", "bridge", "công cụ cấu hình", "BSW configuration"],
    viTags: ["công cụ cấu hình", "cấu hình bsw", "làm quen công cụ mới", "chuyển đổi công cụ", "tool autosar", "học tresos"],
    key: [
      "Honest: no EB tresos project; used ETAS RTA-CAR",
      "Same workflow: import ARXML, configure, validate, generate",
      "Same ECUC parameters, same module semantics",
      "tresos: project, module configurations, Verify, Generate",
      "Plan: learn UI + importers + project conventions quickly"
    ],
    answer: "To be honest, I haven't used EB tresos in a project. I've worked with <strong>ETAS RTA-CAR</strong> [fill: confirm what you used RTA-CAR for], which covers the same workflow: import the ARXML, configure the BSW and MCAL modules, validate, and generate the configuration code and RTE. The tools differ in UI, but the <strong>ECUC parameters and the module behavior are defined by the AUTOSAR standard</strong>, so the knowledge that matters carries over directly. I know what a CanIf Rx PDU, a PduR routing path, a BswM rule or an NvM block parameter means and how integration fails when they're wrong. From the EB side I know the vocabulary. In tresos Studio you have a <strong>project</strong> with a list of <strong>module configurations</strong>, each module being a plugin with its parameter definition and generator. You <strong>import</strong> the ECU extract or ARXML through importers, edit parameters, run <strong>Verify</strong> to check consistency and references, then <strong>Generate</strong>, and you can export ECUC ARXML. There's also a command-line mode for CI. To get productive, I'd take an existing project, trace one signal and one diagnostic service through the configuration, and learn the team's conventions. I'd expect that to take days, not months.",
    followups: ["What would you look at first in an unfamiliar tresos project?", "Which configuration concepts are exactly the same between RTA-CAR and tresos?"]
  },
  {
    id: "autosar-42",
    topic: "autosar",
    type: "practical",
    bridge: true,
    q: "How would you integrate an SWC authored in AUTOSAR Builder into an EB tresos-based BSW configuration?",
    vi: "Bạn tích hợp một SWC được tạo bằng AUTOSAR Builder vào cấu hình BSW dựa trên EB tresos như thế nào?",
    tags: ["AUTOSAR Builder", "EB tresos", "SWC ARXML", "import", "RTE generation", "ECU extract", "bridge", "tích hợp", "ARXML flow"],
    viTags: ["tích hợp", "import swc", "luồng arxml", "sinh rte", "trích xuất ecu", "kết hợp công cụ"],
    key: [
      "AUTOSAR Builder: SWC types, ports, runnables, compositions",
      "Export SWC ARXML / ECU extract",
      "tresos: import, connect service ports, map events to tasks",
      "Verify -> Generate BSW + RTE (or separate RTE generator)",
      "Same steps I did in RTA-CAR; different tool UI"
    ],
    answer: "I haven't done this with these two specific tools, but the flow is the same one I followed with RTA-CAR. <strong>AUTOSAR Builder</strong> is the authoring side: the SWC team defines component types, port interfaces, data types, runnables and events, and the compositions, and exports the SWC description ARXML. Depending on the setup, the system team also produces an ECU extract. In <strong>EB tresos</strong>, the integration side, I would import those ARXMLs into the project, make sure the SWC's service needs are satisfied by the BSW configuration, for example NvM blocks for its NvData ports, Dem events for its diagnostic monitors, and Com signals for its inter-ECU ports, and then map its runnables' events to OS tasks. Then run <strong>Verify</strong> and fix unconnected-port, reference or type errors, and <strong>Generate</strong> the BSW configuration and the RTE. Some projects use the tresos RTE generator, others a separate one. Finally I'd build with the SWC code and test on target. The things that go wrong are also tool-independent: duplicated data types between packages, unmapped events, or missing service connections.",
    followups: ["Who should own shared data type definitions in this setup?", "How do you keep the SWC ARXML and the ECU configuration in sync across deliveries?"]
  },
  {
    id: "autosar-43",
    topic: "autosar",
    type: "practical",
    bridge: true,
    q: "How would you run EB tresos configuration and generation in a CI pipeline?",
    vi: "Bạn chạy cấu hình và generate EB tresos trong CI pipeline như thế nào?",
    tags: ["EB tresos", "command line", "tresos_cmd", "CI", "pipeline", "headless generation", "verify", "config as code", "bridge", "tích hợp liên tục"],
    viTags: ["tích hợp liên tục", "dòng lệnh", "sinh code tự động", "chạy không giao diện", "tự động hóa", "cấu hình dạng code"],
    key: [
      "Config (XDM/ARXML) in Git, reviewed like code",
      "Headless: import -> verify -> generate via command line",
      "Verify errors fail the job early",
      "Diff generated code vs committed; build all variants",
      "My CI background: Azure Pipelines + Conan, containerised tools"
    ],
    answer: "I haven't run tresos in CI myself, but the pattern is clear and I've built similar pipelines. The configuration files, which tresos stores as XDM or ARXML, live in Git and are reviewed like code. tresos has a <strong>command-line mode</strong>, the <code>tresos_cmd</code> script, that can import, verify and generate without the GUI. The CI job for any change that touches configuration would <strong>import</strong> the latest ARXML inputs if needed, run <strong>verify</strong> and fail the job on any error, <strong>generate</strong>, and then either commit the generated code as an artifact or diff it against the committed version to detect stale generation. After that come the build for every variant, static analysis, unit tests and a smoke test on a VECU or bench. The practical points are pinning the tresos and plugin versions and handling the license server on build agents. From my ARA work I have hands-on experience integrating build, package and test steps with Azure Pipelines and Conan, so the pipeline side is familiar to me. I would check the exact command syntax in the project's tresos documentation.",
    code: "# Illustrative only: check exact arguments in your tresos version's docs\ntresos_cmd.sh -data ws legacy import   cfg/EcuProject ecu_extract.arxml\ntresos_cmd.sh -data ws legacy verify   EcuProject || exit 1\ntresos_cmd.sh -data ws legacy generate EcuProject\ngit diff --exit-code gen/ || { echo \"Generated code differs from committed version\"; exit 1; }",
    lang: "bash",
    followups: ["Would you commit generated code or regenerate in every build?", "How do you handle tool licenses on CI agents?"]
  },

  /* ================= Behavioral ================= */
  {
    id: "autosar-44",
    topic: "autosar",
    type: "behavioral",
    q: "Tell me about an integration failure that involved several BSW teams. How did you drive it to resolution?",
    vi: "Kể về một lỗi tích hợp liên quan đến nhiều team BSW. Bạn đã thúc đẩy giải quyết nó như thế nào?",
    tags: ["cross-team", "integration failure", "BSW teams", "coordination", "root cause", "STAR", "CUBAS", "phối hợp", "giải quyết lỗi"],
    viTags: ["phối hợp", "giải quyết lỗi", "làm việc liên nhóm", "nguyên nhân gốc", "lỗi tích hợp", "kinh nghiệm xử lý sự cố"],
    key: [
      "Situation: CUBAS integration, RH850 D3/D4/D5",
      "Reproduce reliably, isolate the layer with evidence",
      "TRACE32: registers, memory, trace",
      "Bring evidence to the owning team, align interfaces",
      "Result + process change: [fill: outcome]"
    ],
    answer: "In the CUBAS integration team on RH850 I was the integration point between project stakeholders and several BSW component teams, so failures that crossed module boundaries naturally came to me. [fill: situation, e.g. which modules and what symptom]. My approach was always the same. First, <strong>reproduce it reliably</strong> on target, because intermittent problems can't be handed over. Second, <strong>isolate the layer with evidence</strong>: using TRACE32 breakpoints, register and memory inspection and trace, I narrowed down where the expected behavior stopped, for example which callback was or wasn't called, or which configuration value differed from what the other module expected. Third, I brought that evidence to the owning team, not just 'your module is broken' but 'here is the call, here is the value, here is the requirement'. When the root cause was an interface misunderstanding between two teams, I got both sides aligned on the interface. [fill: root cause and fix]. [fill: result, e.g. release unblocked, and anything you changed afterwards, like an added check or test]. What I took away is that clear evidence gets things fixed much faster than escalation does.",
    followups: ["What did you do when two teams each said the bug was in the other's module?", "How did you track the defect until it was closed?"]
  }
);
