/* Question bank — embedded, protocols. Loaded by lessons/luxoft/LX11-question-bank.html */
(window.QBANK = window.QBANK || []).push(

  /* =========================== EMBEDDED C / MCU =========================== */

  {
    id: "embedded-01",
    topic: "embedded",
    type: "theory",
    q: "What does volatile do and when must you use it?",
    vi: "Từ khóa volatile dùng để làm gì và khi nào bắt buộc phải dùng nó?",
    tags: ["volatile", "ISR", "register", "optimization", "-O2", "debug vs release", "biến volatile", "thanh ghi"],
    viTags: ["biến dùng chung", "tối ưu của trình biên dịch", "ngắt", "thanh ghi phần cứng", "biến bị tối ưu mất", "khác nhau giữa debug và release"],
    key: ["Every access really goes to memory", "HW registers, ISR-shared vars, polled flags", "Not atomic, not a memory barrier", "Classic bug: works at -O0, hangs at -O2"],
    answer: "<strong>volatile</strong> tells the compiler that the value can change outside the visible program flow, so it must not keep it in a register, merge accesses, or remove reads and writes it thinks are not needed. Every read and every write in the source becomes a real memory access, in program order compared to other volatile accesses.<br>I use it in three cases: <b>memory-mapped peripheral registers</b>, <b>variables shared between an ISR and the main loop or a task</b>, and variables changed by DMA or another core. The classic bug is a polling loop like <code>while (!flag) {}</code> where <code>flag</code> is set in an ISR: at <code>-O0</code> it works, at <code>-O2</code> the compiler moves the read out of the loop and it spins forever.<br>What volatile does <em>not</em> do: it doesn't make a read-modify-write atomic, it doesn't stop the compiler or the CPU from reordering non-volatile accesses around it, and it's not a memory barrier on multi-core. For that you still need critical sections, atomics or barrier instructions.",
    code: "volatile uint8_t g_rxDone = 0u;      /* set in ISR */\n\nvoid UART_RxIsr(void) { g_rxDone = 1u; }\n\nvoid WaitRx(void)\n{\n    while (g_rxDone == 0u) { }        /* without volatile: may loop forever at -O2 */\n}",
    lang: "c",
    followups: ["Is volatile enough to protect a shared counter?", "Can a variable be both const and volatile?", "Why does a bug show only in the release build?"]
  },

  {
    id: "embedded-02",
    topic: "embedded",
    type: "theory",
    q: "Explain const in embedded C, including the different pointer placements and const volatile.",
    vi: "Giải thích const trong C nhúng, bao gồm các vị trí đặt const khác nhau với pointer và const volatile.",
    tags: ["const", "pointer to const", "const pointer", "const volatile", "rodata", "flash", "hằng số", "con trỏ"],
    viTags: ["hằng", "con trỏ hằng", "con trỏ tới hằng", "bộ nhớ flash", "vùng nhớ chỉ đọc", "từ khóa const"],
    key: ["Read right to left", "const data goes to .rodata / flash", "const volatile = read-only HW register", "const in API = contract, MISRA 8.13"],
    answer: "const means the program promises not to change the object through that name. The compiler checks this and, for globals, usually puts the data in <strong>.rodata</strong>, which on an MCU is flash, so it costs no RAM. That's why lookup tables and configuration structures, like AUTOSAR generated config, are const.<br>With pointers I read the declaration right to left: <code>const uint8_t *p</code> is a pointer to const data, I can move p but not write *p. <code>uint8_t * const p</code> is a const pointer, fixed address but writable data. Both const means neither changes.<br><b>const volatile</b> is not a contradiction: const says my code must not write it, volatile says it can still change without my code writing it. A read-only status register is the textbook example.<br>In APIs I mark input buffers as pointer-to-const. This documents the contract, lets the caller pass flash data, and is what MISRA Rule 8.13 recommends. One warning: if I cast away const and write to something that really lives in flash, it will fault or silently fail.",
    code: "const uint8_t kLut[4] = {0u, 1u, 3u, 7u};      /* .rodata -> flash */\nconst uint8_t *p1 = kLut;                      /* *p1 read-only, p1 movable */\nuint8_t * const p2 = rxBuf;                    /* p2 fixed, *p2 writable */\nconst uint8_t * const p3 = kLut;               /* both fixed */\n#define STAT_REG (*(const volatile uint32_t *)0xFFFF0010u) /* read-only HW reg */\nvoid Send(const uint8_t *data, uint16_t len);  /* promise: no write */",
    lang: "c",
    followups: ["Where does a const local variable inside a function live?", "What is the difference between const and #define for constants?"]
  },

  {
    id: "embedded-03",
    topic: "embedded",
    type: "theory",
    q: "What are all the meanings of the static keyword in C and C++?",
    vi: "Từ khóa static trong C và C++ có những ý nghĩa nào?",
    tags: ["static", "internal linkage", "storage duration", "encapsulation", "static member", "reentrancy", "từ khóa static", "phạm vi"],
    viTags: ["biến tĩnh", "phạm vi biến", "liên kết nội bộ", "thời gian sống của biến", "đóng gói", "thành viên tĩnh"],
    key: ["File scope: internal linkage (private to .c)", "Function scope: persists, lives in .data/.bss", "C++: class-level member / function", "Static locals break reentrancy"],
    answer: "static has two different jobs depending on where it appears.<br><b>At file scope</b>, on a global variable or a function, it gives <strong>internal linkage</strong>: the symbol is visible only inside that .c file. That's my main encapsulation tool in C. The module's private state and helper functions stay hidden, which avoids name clashes at link time and lets the compiler inline or drop unused functions. In AUTOSAR modules almost all internal functions are static.<br><b>Inside a function</b>, it changes the <strong>storage duration</strong>: the variable is not on the stack, it lives in .data or .bss for the whole program, is initialized once, and keeps its value between calls. It's useful for a counter or state machine state, but it makes the function non-reentrant, so it's dangerous if the function is called from both a task and an ISR.<br><b>In C++</b>, a static data member is shared by all objects of the class, and a static member function has no <code>this</code> pointer, which is useful for C-style callbacks like an ISR entry. There's also the rare C99 <code>int a[static 4]</code> meaning 'at least 4 elements'.",
    followups: ["Where is a static local variable stored and when is it initialized?", "Why can static locals be a problem with interrupts?"]
  },

  {
    id: "embedded-04",
    topic: "embedded",
    type: "theory",
    q: "Describe the memory layout of an embedded C program. Where does each variable in this code end up?",
    vi: "Mô tả bố cục bộ nhớ của một chương trình C nhúng. Mỗi biến trong đoạn code này nằm ở vùng nhớ nào?",
    tags: ["memory layout", ".text", ".data", ".bss", ".rodata", "stack", "heap", "LMA VMA", "bố cục bộ nhớ", "vùng nhớ"],
    viTags: ["phân vùng bộ nhớ", "biến toàn cục", "biến cục bộ", "ngăn xếp", "bộ nhớ động", "phân đoạn bộ nhớ"],
    key: [".text/.rodata: flash", ".data: init value in flash, copied to RAM", ".bss: zeroed at startup, no image space", "Stack grows down, heap up"],
    answer: "On a typical MCU, <strong>.text</strong> holds the code and <strong>.rodata</strong> the constants, both in flash. <strong>.data</strong> holds globals and statics with a non-zero initializer: the variable lives in RAM, but its initial value is stored in flash and the startup code copies it over. <strong>.bss</strong> holds globals and statics that are zero or uninitialized; it takes no space in the binary, the startup code just fills it with zeros. Then there's the <strong>stack</strong> for locals, return addresses and saved context, usually growing downward, and, if used, a <strong>heap</strong> for malloc growing the other way.<br>In the snippet: <code>g_init</code> is .data, <code>g_zero</code> and <code>s_zero</code> are .bss, even though s_zero is explicitly zero, <code>k_table</code> is .rodata in flash, <code>local</code> is on the stack or just in a register, <code>count</code> is .bss because it's a static local, and for <code>p</code> the pointer itself is on the stack while the 16 bytes are on the heap.<br>In an AUTOSAR project the MemMap sections split this further, for example no-init RAM that survives a reset, or core-local RAM on RH850.",
    code: "int g_init = 5;                  /* ? */\nint g_zero;                      /* ? */\nstatic int s_zero = 0;           /* ? */\nconst int k_table[] = {1, 2, 3}; /* ? */\n\nvoid f(void)\n{\n    int local;                   /* ? */\n    static int count;            /* ? */\n    char *p = malloc(16);        /* p ? , 16 bytes ? */\n}",
    lang: "c",
    followups: ["Why does .bss not increase the size of the flash image?", "What happens when stack and heap collide?"]
  },

  {
    id: "embedded-05",
    topic: "embedded",
    type: "theory",
    q: "What does the startup code do before main(), and what is the role of the linker script?",
    vi: "Startup code làm những gì trước khi vào main(), và linker script có vai trò gì?",
    tags: ["startup code", "crt0", "reset vector", "linker script", "LMA", "VMA", "ECC RAM init", "khởi động", "linker"],
    viTags: ["mã khởi động", "khởi động vi điều khiển", "vector reset", "khởi tạo bộ nhớ", "tập lệnh liên kết", "trước hàm main"],
    key: ["Reset vector -> set SP -> basic HW init", "Copy .data flash->RAM, zero .bss", "Run C++ constructors, then main()", "Linker script: MEMORY + SECTIONS + symbols"],
    answer: "After reset the CPU fetches the reset vector and jumps to startup code, usually assembly. It sets up the <strong>stack pointer</strong> and core registers. It often configures the minimum hardware, like disabling or configuring the watchdog, flash wait states and sometimes the clock. On safety MCUs like RH850 or AURIX it usually also has to <b>initialize RAM for ECC</b>, because reading uninitialized ECC-protected RAM can raise an error. Then it does the C runtime part: <strong>copy .data</strong> from its load address in flash to its run address in RAM, <strong>zero .bss</strong>, run C++ global constructors if any, and finally call main.<br>The <strong>linker script</strong> describes the memory map: the <code>MEMORY</code> regions with origin and length, and in <code>SECTIONS</code> which input sections go into which region. For .data it gives two addresses, the VMA in RAM and the LMA in flash via <code>AT&gt;</code>. It also exports symbols like start and end of .data and .bss that the startup code uses in its copy loops. It's also where you place the vector table, keep it with <code>KEEP</code>, reserve the stack and put special sections like fast RAM code.",
    code: "MEMORY {\n  FLASH (rx)  : ORIGIN = 0x00000000, LENGTH = 2M\n  RAM   (rwx) : ORIGIN = 0xFEDE0000, LENGTH = 128K\n}\nSECTIONS {\n  .text   : { KEEP(*(.vectors)) *(.text*) *(.rodata*) } > FLASH\n  .data   : { _sdata = .; *(.data*) _edata = .; } > RAM AT> FLASH\n  _sidata = LOADADDR(.data);\n  .bss    : { _sbss = .; *(.bss*) *(COMMON) _ebss = .; } > RAM\n}",
    lang: "text",
    followups: ["What is the difference between LMA and VMA?", "What goes wrong if .bss is not zeroed?"]
  },

  {
    id: "embedded-06",
    topic: "embedded",
    type: "theory",
    q: "What are the rules for writing an ISR, and what does reentrancy mean?",
    vi: "Viết ISR cần tuân theo những quy tắc nào, và reentrancy nghĩa là gì?",
    tags: ["ISR", "interrupt", "reentrancy", "reentrant", "Cat1 Cat2", "AUTOSAR OS", "ngắt", "hàm tái nhập"],
    viTags: ["trình phục vụ ngắt", "hàm phục vụ ngắt", "tính tái nhập", "quy tắc viết ngắt", "ngắt không tái nhập"],
    key: ["Short: set flag / buffer, defer work to task", "No blocking, no printf/malloc", "Clear the source flag correctly", "Reentrant = no unprotected static/global state"],
    answer: "My rules for an ISR: keep it <strong>short and deterministic</strong>. Read the hardware, store the data in a buffer or set a flag, and move heavy processing to a task, in AUTOSAR OS for example by activating a task or setting an event from a Category 2 ISR. No blocking calls, no busy waits, no printf or malloc, which are non-reentrant and non-deterministic. Variables shared with the main context are volatile and multi-step accesses are protected. <b>Clear the interrupt source</b> correctly, and on some buses read the register back so the write is complete before returning, otherwise you get a spurious second entry. Be careful with floating point if the FPU context isn't saved. Also, a Category 1 ISR may call almost no OS services, only the interrupt enable/disable APIs; a Category 2 ISR may call most of them.<br><strong>Reentrancy</strong> means a function can be interrupted in the middle and called again, from an ISR or another task, and both calls still work correctly. For that it must use only locals and parameters, or protect any shared static or global state. <code>strtok</code> is the classic non-reentrant example because of its hidden static pointer.",
    followups: ["How do you pass data from an ISR to a task safely?", "What is the difference between Cat1 and Cat2 ISRs?", "Is a reentrant function automatically thread-safe?"]
  },

  {
    id: "embedded-07",
    topic: "embedded",
    type: "practical",
    q: "What is wrong with this code that shares a counter between an ISR and a task, and how do you fix it?",
    vi: "Đoạn code dùng chung một biến đếm giữa ISR và task này sai ở đâu, và sửa thế nào?",
    tags: ["race condition", "critical section", "read-modify-write", "exclusive area", "SchM", "SuspendAllInterrupts", "tranh chấp", "vùng găng"],
    viTags: ["tranh chấp dữ liệu", "biến dùng chung", "đọc sửa ghi", "khóa ngắt", "đồng bộ giữa ngắt và task"],
    key: ["rx_count-- is load/modify/store, ISR can cut in", "volatile alone doesn't help", "Fix: short critical section / exclusive area", "Save and restore, don't blindly enable"],
    answer: "It's a <strong>race condition</strong>. <code>rx_count--</code> is a read-modify-write: the CPU loads the value, decrements it in a register and stores it back. If the UART interrupt fires between the load and the store, the ISR increments the memory value, and then the task overwrites it with its old value minus one, so one received byte is lost. Also the check and the decrement are two separate steps. volatile doesn't help here, it only makes sure the accesses happen, not that they can't be split.<br>The fix is a <strong>critical section</strong> around the check and the update: lock out the interrupt, do the minimum, restore. In an AUTOSAR stack I'd use the module's exclusive area, <code>SchM_Enter_...</code> and <code>SchM_Exit_...</code>, which the integrator maps to OS interrupt locking, or <code>SuspendAllInterrupts</code>/<code>ResumeAllInterrupts</code> directly. On bare metal, save the interrupt state, disable, restore, rather than always enabling at the end, so nesting works. Keep the section a few instructions long so interrupt latency doesn't suffer, and don't call process() inside it. Other options are atomic instructions or a lock-free single-producer single-consumer ring buffer.",
    code: "volatile uint16_t rx_count;\n\nvoid UART_RxIsr(void) { rx_count++; }\n\nvoid Task_Rx(void)\n{\n    if (rx_count > 0u) {\n        rx_count--;              /* BUG: not atomic vs. ISR */\n        Process();\n    }\n}\n\n/* Fix */\nvoid Task_Rx_Fixed(void)\n{\n    boolean have = FALSE;\n    SchM_Enter_Uart_RX_EXCLUSIVE_AREA();\n    if (rx_count > 0u) { rx_count--; have = TRUE; }\n    SchM_Exit_Uart_RX_EXCLUSIVE_AREA();\n    if (have == TRUE) { Process(); }\n}",
    lang: "c",
    followups: ["Why save and restore the interrupt state instead of just enabling?", "How would a lock-free ring buffer avoid the lock?", "What changes on a multi-core RH850?"]
  },

  {
    id: "embedded-08",
    topic: "embedded",
    type: "practical",
    q: "A 32-bit millisecond counter is incremented in a timer ISR. Is reading it atomic on a 16-bit MCU? On a 32-bit MCU?",
    vi: "Một bộ đếm mili giây 32-bit được tăng trong timer ISR. Việc đọc nó có nguyên tử trên MCU 16-bit không? Trên MCU 32-bit thì sao?",
    tags: ["atomicity", "torn read", "16-bit", "32-bit", "tick counter", "LDREX STREX", "nguyên tử", "đọc bị xé"],
    viTags: ["tính nguyên tử", "đọc nguyên tử", "biến đếm tick", "ngắt timer", "biến dùng chung"],
    key: ["16-bit: two bus accesses -> torn read", "32-bit aligned load/store is atomic", "++ is still non-atomic RMW everywhere", "64-bit on 32-bit core: torn again", "Fix: lock, or read-until-stable"],
    answer: "On a <strong>16-bit MCU</strong> a 32-bit read takes two 16-bit accesses. If the ISR fires between them and the counter goes from 0x0000FFFF to 0x00010000, I might read the old low half and the new high half, or the opposite, and get a value that's off by about 64K. That's a <strong>torn read</strong>, and it's rare, which makes it very hard to find.<br>On a <strong>32-bit MCU</strong> like RH850 or a Cortex-M, a naturally aligned 32-bit load or store is a single access, so a plain read of the counter is atomic. But the increment itself is still a read-modify-write, so if two contexts write it you still need protection. And the same tearing problem comes back for 64-bit values on a 32-bit core, or for a misaligned field in a packed struct.<br>Fixes: a short critical section around the read, or the lock-free trick of reading until two reads in a row match, which works when only the ISR writes. For concurrent updates, use exclusive-access instructions like LDREX/STREX on ARM or LDL.W/STC.W on RH850, or C11 atomics if the toolchain supports them.",
    code: "volatile uint32_t g_ms;          /* ++ in 1 ms timer ISR */\n\nuint32_t GetMs(void)             /* safe on 16-bit MCU too */\n{\n    uint32_t a, b;\n    do {\n        a = g_ms;\n        b = g_ms;\n    } while (a != b);\n    return a;\n}",
    lang: "c",
    followups: ["Why does the read-twice trick fail if two writers exist?", "How is the 64-bit OS tick handled on a 32-bit core?"]
  },

  {
    id: "embedded-09",
    topic: "embedded",
    type: "practical",
    q: "Write macros to set, clear and write a multi-bit field in a memory-mapped register. What pitfalls do you watch for?",
    vi: "Viết macro để set, clear và ghi một trường nhiều bit trong thanh ghi ánh xạ bộ nhớ. Cần chú ý những bẫy nào?",
    tags: ["bit manipulation", "register access", "mask", "shift", "write-1-to-clear", "W1C", "macro", "thao tác bit", "thanh ghi"],
    viTags: ["truy cập thanh ghi", "mặt nạ bit", "dịch bit", "ghi 1 để xóa", "thanh ghi ngoại vi"],
    key: ["Set |=, clear &= ~, toggle ^=", "Field: clear mask then OR shifted value", "Always unsigned literals (1UL)", "W1C flags: never read-modify-write", "Parenthesize macro args, use volatile"],
    answer: "Set is OR with a mask, clear is AND with the inverted mask, toggle is XOR, and writing a field is clear-then-OR: mask out the old bits, shift the new value into position, and mask it again so a value that's too big can't overwrite the neighbouring bits.<br>Common mistakes I watch for: always use <strong>unsigned literals</strong> like <code>1UL</code>, because <code>1 &lt;&lt; 31</code> on a signed int is undefined behaviour and MISRA flags it. <strong>Put parentheses</strong> around every macro parameter. Access registers through a <strong>volatile</strong> pointer. The big one is <strong>write-1-to-clear</strong> status registers: if I do <code>STATUS |= FLAG_A</code>, the read-modify-write reads back every pending flag as 1 and writes them all back, clearing flags I never meant to touch. For those you write only the bit you want. In the same way, some registers are write-only or have side effects on read, like reading a data register that pops a FIFO. Also, a read-modify-write on a shared register is itself a race with ISRs. That's why many MCUs offer separate set and clear registers, and RH850 protects some critical registers with a write-protection command sequence.",
    code: "#define REG32(addr)        (*(volatile uint32_t *)(addr))\n#define BIT(n)             (1UL << (n))\n#define SET_BIT(r, n)      ((r) |=  BIT(n))\n#define CLR_BIT(r, n)      ((r) &= ~BIT(n))\n#define FIELD_MASK(w, p)   ((((1UL << (w)) - 1UL)) << (p))\n#define FIELD_WR(r, w, p, v) \\\n    ((r) = ((r) & ~FIELD_MASK(w, p)) | (((uint32_t)(v) << (p)) & FIELD_MASK(w, p)))\n\n/* W1C status: write ONLY the bit to clear */\nSTATUS_REG = BIT(3);          /* correct */\n/* STATUS_REG |= BIT(3);         wrong: clears every pending flag */",
    lang: "c",
    followups: ["Why use bit-fields or not for register maps?", "What is a set/clear register pair and why does it help?"]
  },

  {
    id: "embedded-10",
    topic: "embedded",
    type: "practical",
    q: "What is sizeof each of these structs on a 32-bit MCU, and what are the risks of packing?",
    vi: "sizeof của từng struct này trên MCU 32-bit là bao nhiêu, và packing có những rủi ro gì?",
    tags: ["struct padding", "alignment", "packed", "pragma pack", "sizeof", "unaligned access", "căn lề", "đệm struct"],
    viTags: ["căn chỉnh bộ nhớ", "kích thước struct", "truy cập không căn chỉnh", "đóng gói struct", "sắp xếp bộ nhớ"],
    key: ["A = 12, B = 8, C = 7", "Each member aligned to its size; tail pad to max align", "Order members largest first", "Packed: unaligned access = slow or fault", "Don't memcmp structs / map raw frames"],
    answer: "Assuming 4-byte alignment for uint32_t: <b>A is 12</b>. a at offset 0, three bytes padding so b starts at 4, c at 8, then two bytes tail padding so the size is a multiple of the largest alignment, which matters for arrays. <b>B is 8</b>: b at 0, c at 4, a at 6, one byte tail pad. Same members, just sorted largest first. <b>C is 7</b>, no padding at all.<br>On a 16-bit MCU the answer can be different because the max alignment may be 2, which is exactly why I don't hard-code struct sizes.<br>Packing risks: members become <strong>misaligned</strong>. Depending on the core, an unaligned access is either split into several slower accesses, or raises an alignment exception. Taking a pointer to a packed member and passing it to a function that assumes alignment is a classic crash. Unaligned access can also break atomicity. So I avoid mapping packed structs directly onto protocol frames or registers; I prefer explicit serialization with shifts, which also fixes endianness. And never <code>memcmp</code> padded structs, because padding bytes are indeterminate.",
    code: "struct A { uint8_t a; uint32_t b; uint16_t c; };\nstruct B { uint32_t b; uint16_t c; uint8_t a; };\nstruct __attribute__((packed)) C { uint8_t a; uint32_t b; uint16_t c; };\n/* sizeof(A) = ?  sizeof(B) = ?  sizeof(C) = ? */",
    lang: "c",
    followups: ["How do you check the layout the compiler actually chose?", "Why is using a packed struct to parse a CAN frame a portability problem?"]
  },

  {
    id: "embedded-11",
    topic: "embedded",
    type: "theory",
    q: "What is endianness, which MCUs use which, and how do you write endian-independent code?",
    vi: "Endianness là gì, MCU nào dùng kiểu nào, và làm sao viết code không phụ thuộc endian?",
    tags: ["endianness", "little-endian", "big-endian", "byte order", "Intel Motorola", "CAN signal", "PowerPC", "thứ tự byte"],
    viTags: ["đầu nhỏ", "đầu lớn", "đảo byte", "tín hiệu can", "code độc lập nền tảng"],
    key: ["LE: LSB at lowest address; BE: MSB first", "RH850, TriCore, Cortex-M: little-endian", "PowerPC e200: big-endian; network: BE", "CAN signals: Intel vs Motorola order", "Serialize with shifts, not casts"],
    answer: "Endianness is the byte order of a multi-byte value in memory. <strong>Little-endian</strong> puts the least significant byte at the lowest address, <strong>big-endian</strong> the most significant. RH850, Infineon TriCore and ARM Cortex-M as usually configured are little-endian; the classic Freescale/NXP PowerPC e200 parts are big-endian, and network byte order is big-endian.<br>In automotive it comes up all the time on CAN: signals in a DBC or ARXML are either <b>Intel</b> byte order, little-endian, or <b>Motorola</b>, big-endian, and the Com module packs and unpacks them based on that. A wrong byte order setting gives you values that look like garbage, for example 0x0102 read as 0x0201.<br>For portable code I never cast a byte buffer to a <code>uint32_t*</code>; that's endian-dependent, and it can also be an unaligned access and a strict-aliasing violation. I build values with shifts, which gives the same result on any core, and the compiler usually turns it into a single load or byte-swap instruction anyway.",
    code: "static inline uint32_t Rd_Be32(const uint8_t *p)\n{\n    return ((uint32_t)p[0] << 24) | ((uint32_t)p[1] << 16) |\n           ((uint32_t)p[2] << 8)  |  (uint32_t)p[3];\n}\n\n/* runtime check */\nuint16_t t = 1u;\nboolean isLittle = (*(uint8_t *)&t == 1u);",
    lang: "c",
    followups: ["How is a 12-bit Motorola signal spread across bytes?", "How do Intel and Motorola byte order show up in a CAN signal definition?"]
  },

  {
    id: "embedded-12",
    topic: "embedded",
    type: "practical",
    q: "What does this code print, and why? (integer promotion and signed/unsigned pitfalls)",
    vi: "Đoạn code này in ra gì, và tại sao? (thăng kiểu số nguyên và các bẫy signed/unsigned)",
    tags: ["integer promotion", "usual arithmetic conversions", "signed unsigned", "overflow", "undefined behavior", "MISRA essential type", "ép kiểu", "tràn số"],
    viTags: ["thăng kiểu số nguyên", "chuyển đổi kiểu ngầm định", "có dấu không dấu", "hành vi không xác định", "so sánh có dấu và không dấu"],
    key: ["(1) c = 44: wraps mod 256", "(2) 'greater': -1 converts to UINT_MAX", "(3) nothing: ~x is int 0xFFFFFFF0", "(4) UB: uint16 promotes to signed int", "Fix: cast before the operation"],
    answer: "Everything smaller than int is <strong>promoted to int</strong> before arithmetic, and mixed signed/unsigned operands of the same rank convert to unsigned.<br>(1) a + b is computed as int 300, then truncated on assignment to uint8_t: <b>c is 44</b>.<br>(2) i is converted to unsigned for the comparison, so -1 becomes 0xFFFFFFFF, which is bigger than 1: it prints <b>greater</b>.<br>(3) x promotes to int 0x0000000F, the complement is 0xFFFFFFF0, not 0xF0, so <b>nothing is printed</b>. You need <code>(uint8_t)~x</code>.<br>(4) The tricky one: on a 32-bit-int target, uint16_t promotes to <em>signed</em> int, and 50000 times 50000 is 2.5 billion, which overflows int: <b>undefined behaviour</b>, even though every variable is unsigned. On a 16-bit-int MCU it promotes to unsigned int and silently wraps modulo 65536. Same source, different results per platform. The fix is <code>(uint32_t)m * n</code>.<br>This is exactly why MISRA's essential type rules exist, and why conversion warnings should be turned on and static analysis run on this kind of code.",
    code: "uint8_t  a = 200u, b = 100u;\nuint8_t  c = a + b;                    /* (1) c = ? */\n\nint      i = -1;\nunsigned u = 1u;\nif (i < u) { puts(\"less\"); }          /* (2) which one? */\nelse       { puts(\"greater\"); }\n\nuint8_t  x = 0x0Fu;\nif (~x == 0xF0u) { puts(\"match\"); }   /* (3) printed? */\n\nuint16_t m = 50000u, n = 50000u;\nuint32_t p = m * n;                    /* (4) correct on 32-bit int? */",
    lang: "c",
    followups: ["What is the difference between implementation-defined and undefined behaviour?", "Which MISRA rules catch these?"]
  },

  {
    id: "embedded-13",
    topic: "embedded",
    type: "theory",
    q: "Why use fixed-width integer types, and what are their limits for portability?",
    vi: "Tại sao nên dùng các kiểu số nguyên có độ rộng cố định, và chúng có giới hạn gì về tính khả chuyển?",
    tags: ["stdint", "uint8_t", "fixed-width types", "Platform_Types", "sint16", "int size", "portability", "kiểu dữ liệu"],
    viTags: ["kiểu số nguyên cố định", "kích thước int", "tính khả chuyển", "độc lập nền tảng", "kiểu dữ liệu chuẩn"],
    key: ["int is 16 or 32 bits depending on target", "uint8_t/uint32_t or AUTOSAR uint8/uint32", "Fast/least types for loop counters", "Promotion rules still apply"],
    answer: "The size of <code>int</code> and <code>long</code> is implementation-defined: int is 16 bits on many 16-bit MCUs and 32 bits on RH850, TriCore or ARM. If I write a register map, a protocol frame or a counter with plain int, the behaviour changes when the code moves to another target. Fixed-width types like <code>uint8_t</code>, <code>uint16_t</code>, <code>int32_t</code> from stdint.h say exactly what I mean. In AUTOSAR we use <code>uint8</code>, <code>sint16</code>, <code>uint32</code>, <code>boolean</code> from Platform_Types.h, which the platform integrator provides per CPU and compiler. MISRA Dir 4.6, an advisory directive, recommends size-specific types instead of basic ones.<br>Limits: the exact-width types are optional in the standard. A DSP like TI C28x has no 8-bit type at all because char is 16 bits. Fixed width also doesn't change the promotion rules, uint16_t arithmetic still happens in int. And for performance, a <code>uint8_t</code> loop counter on a 32-bit core may cost extra masking instructions, so for local counters I use the native width or <code>uint_fast8_t</code>.",
    followups: ["What does Platform_Types.h contain in AUTOSAR?", "Why can a uint8_t loop counter be slower on a 32-bit core?"]
  },

  {
    id: "embedded-14",
    topic: "embedded",
    type: "practical",
    q: "Pointer arithmetic quiz: evaluate each expression, assuming arr is at 0x1000 on a little-endian 32-bit MCU.",
    vi: "Câu đố về số học pointer: tính giá trị từng biểu thức, giả sử arr nằm ở địa chỉ 0x1000 trên MCU 32-bit little-endian.",
    tags: ["pointer arithmetic", "array decay", "sizeof", "pointer cast", "strict aliasing", "con trỏ", "mảng"],
    viTags: ["số học con trỏ", "ép kiểu con trỏ", "địa chỉ bộ nhớ", "câu đố con trỏ", "phân rã mảng thành con trỏ"],
    key: ["Arithmetic scales by pointed-to type size", "(1) 0x1004 (2) 30 (3) 0x1001 (4) 20", "(5) &arr+1 = 0x1010: whole array", "(6) array param decays: sizeof = 4"],
    answer: "Pointer arithmetic is scaled by the size of the pointed-to type.<br>(1) <code>p + 1</code> is <b>0x1004</b>, one uint32_t further.<br>(2) <code>*(p + 2)</code> is the same as <code>arr[2]</code>, so <b>30</b>.<br>(3) <code>b</code> is a byte pointer, so <code>b + 1</code> is <b>0x1001</b>.<br>(4) <code>b[4]</code> is the first byte of arr[1]; on little-endian that's its least significant byte, <b>20</b>. On a big-endian core it would be 0.<br>(5) <code>&amp;arr</code> has type pointer-to-array-of-4, so adding one skips the whole array: <b>0x1010</b>.<br>(6) An array parameter decays to a pointer, so <code>sizeof(a)</code> inside f is the pointer size, <b>4</b>, not 16. That's a classic bug when people compute buffer lengths inside a function, which is why APIs pass the length explicitly.<br>Reading through a byte pointer is allowed, because char types may alias anything. Going the other way, casting a byte buffer to <code>uint32_t*</code>, risks misalignment and violates strict aliasing, and MISRA restricts those casts.",
    code: "uint32_t arr[4] = {10u, 20u, 30u, 40u};\nuint32_t *p = arr;\nuint8_t  *b = (uint8_t *)arr;\n\n/* (1) p + 1        (2) *(p + 2)\n   (3) b + 1        (4) b[4]\n   (5) &arr + 1                    */\n\nvoid f(uint32_t a[4]) { size_t s = sizeof(a); }  /* (6) s = ? */",
    lang: "c",
    followups: ["What is the strict aliasing rule?", "Is pointer arithmetic outside the array bounds legal?"]
  },

  {
    id: "embedded-15",
    topic: "embedded",
    type: "theory",
    q: "How are function pointers used in embedded software? Show a callback or dispatch table.",
    vi: "Function pointer được dùng thế nào trong phần mềm nhúng? Minh họa một callback hoặc bảng dispatch.",
    tags: ["function pointer", "callback", "dispatch table", "jump table", "vector table", "notification", "con trỏ hàm", "bảng tra"],
    viTags: ["hàm gọi lại", "bảng tra hàm", "bảng nhảy", "bảng vector ngắt", "thông báo sự kiện"],
    key: ["Vector tables, callbacks, notifications", "Const table replaces big switch", "Put table in flash: const", "Check NULL; no casts between fn types", "Cost: indirect call, no inlining"],
    answer: "Function pointers are how C does late binding, and they're everywhere in embedded. The <b>interrupt vector table</b> is an array of function pointers. <b>Callbacks and notifications</b> are how lower layers call upward without depending on them. In AUTOSAR the generated configuration holds pointers to notification functions like transmit confirmation or ICU edge notification, so the driver code stays generic. And <b>dispatch tables</b> replace a large switch, for example mapping a UDS service ID to its handler, or a state machine where each state has a handler.<br>Practices I follow: make the table <code>const</code> so it lives in flash and can't be corrupted by an accidental write, which matters for safety. Check for NULL before calling optional callbacks. Never call through an incompatible function pointer type: calling through the wrong type is undefined behaviour, and MISRA Rule 11.1 forbids the cast. Use a typedef so the signatures are easy to read.<br>The costs are an indirect call, which the compiler can't inline, sometimes a pipeline penalty, and it makes static call-graph analysis for stack usage harder.",
    code: "typedef Std_ReturnType (*UdsHandler)(const uint8 *req, uint16 len);\ntypedef struct { uint8 sid; UdsHandler fn; } UdsEntry;\n\nstatic const UdsEntry kUdsTable[] = {        /* in flash */\n    { 0x10u, Uds_SessionControl },\n    { 0x22u, Uds_ReadDid },\n    { 0x2Eu, Uds_WriteDid },\n};\n\nfor (i = 0u; i < (sizeof(kUdsTable) / sizeof(kUdsTable[0])); i++) {\n    if ((kUdsTable[i].sid == sid) && (kUdsTable[i].fn != NULL_PTR)) {\n        return kUdsTable[i].fn(req, len);\n    }\n}",
    lang: "c",
    followups: ["How does a function pointer table affect stack analysis?", "How would you do the same in C++ without virtual?"]
  },

  {
    id: "embedded-16",
    topic: "embedded",
    type: "theory",
    q: "Why is dynamic memory allocation usually avoided in embedded and automotive software? What do you use instead?",
    vi: "Tại sao phần mềm nhúng và ô tô thường tránh cấp phát bộ nhớ động? Thay vào đó dùng gì?",
    tags: ["malloc", "heap", "dynamic allocation", "fragmentation", "MISRA 21.3", "memory pool", "static allocation", "cấp phát động"],
    viTags: ["phân mảnh bộ nhớ", "cấp phát tĩnh", "vùng nhớ heap", "bể bộ nhớ", "phần mềm ô tô"],
    key: ["Non-deterministic timing", "Fragmentation -> failure after hours", "Failure path hard to handle/test", "MISRA 21.3 bans malloc/free", "Use static buffers, pools at init"],
    answer: "Three main reasons. First, <strong>determinism</strong>: malloc and free have execution times that depend on the heap state, which is bad for a real-time system where I need a worst-case execution time. Second, <strong>fragmentation</strong>: after many allocations of different sizes, there can be plenty of free memory in total but no single continuous block large enough. So an allocation fails after hours or days in the field, which is almost impossible to reproduce in a test. Third, the <strong>failure path</strong>: what does an airbag or brake ECU do when malloc returns NULL? There's usually no good answer. Plus malloc isn't reentrant, so you can't use it from ISRs, and memory leaks are a risk.<br>That's why MISRA C Rule 21.3 forbids the standard heap functions, and AUTOSAR Classic is designed around static configuration: every buffer, queue and PDU size is known at build time and sized in the config. Instead I use <b>static allocation</b>, <b>fixed-size block pools</b> if something really needs to be dynamic, and at most allocation once during init, never at runtime. The map file then tells me the exact RAM budget.",
    followups: ["How does a fixed-block memory pool avoid fragmentation?", "What about C++ new and STL containers?"]
  },

  {
    id: "embedded-17",
    topic: "embedded",
    type: "practical",
    q: "How do you size the stack and detect a stack overflow on an MCU?",
    vi: "Làm sao ước lượng kích thước stack và phát hiện tràn stack trên MCU?",
    tags: ["stack overflow", "stack painting", "high water mark", "MPU", "stack monitoring", "E_OS_STACKFAULT", "TRACE32", "tràn stack"],
    viTags: ["tràn ngăn xếp", "kích thước stack", "tô màu stack", "giám sát stack", "mức sử dụng stack"],
    key: ["Static: worst-case call graph analysis", "Dynamic: paint pattern, read high-water mark", "Runtime: MPU guard / stack limit / OS monitor", "Symptoms: random resets, corrupted globals", "Add ISR nesting + margin"],
    answer: "I combine static and dynamic methods. <strong>Statically</strong>, the compiler can output per-function stack usage, like GCC's <code>-fstack-usage</code>, and a tool such as StackAnalyzer builds the call graph to get the worst case. Function pointers and recursion make that incomplete, so I also measure. <strong>Dynamically</strong>, the stack is filled with a known pattern at startup. Then after running the worst-case scenarios I read the stack in the debugger, for example with TRACE32, and find how much was overwritten: that's the high-water mark. Then I add the worst-case interrupt nesting on top and a safety margin.<br>For <strong>runtime detection</strong>: an MPU guard region below the stack that faults on access, stack-limit registers on cores that have them, a canary word checked periodically, or AUTOSAR OS stack monitoring, which checks at context switch and calls the ProtectionHook with E_OS_STACKFAULT.<br>Typical symptoms of an overflow are random resets, a corrupted global next to the stack, or a return to a garbage address. So when I see a crash that moves around when I add code, the stack is one of the first things I check.",
    followups: ["Why does OS stack monitoring not catch every overflow?", "How do you account for ISRs on a task stack?"]
  },

  {
    id: "embedded-18",
    topic: "embedded",
    type: "theory",
    q: "How should a watchdog be used correctly? What is a window watchdog?",
    vi: "Dùng watchdog thế nào cho đúng? Window watchdog là gì?",
    tags: ["watchdog", "WDG", "window watchdog", "WdgM", "alive supervision", "reset cause", "RH850 WDTA", "bộ giám sát"],
    viTags: ["chó canh", "watchdog cửa sổ", "reset hệ thống", "nguyên nhân reset", "giám sát chương trình"],
    key: ["Kick only when the system proves it's healthy", "Never kick unconditionally from a timer ISR", "Window: too early is also an error", "Check reset cause at startup", "AUTOSAR: Wdg driver + WdgM supervision"],
    answer: "A watchdog resets the MCU if software fails to service it in time, so the point is that <strong>servicing it must prove the system is healthy</strong>. The common mistake is kicking it from a periodic timer ISR: the timer keeps firing even if the main loop or a task is stuck, so the watchdog never helps. Better: kick from the lowest-priority context after checking that all the important tasks have checked in.<br>A <strong>window watchdog</strong>, like WDTA on RH850, also rejects a trigger that comes <em>too early</em>. So it catches not only a hang, but also code running too fast, like a skipped part of the loop or a runaway loop that keeps kicking. An independent watchdog with its own clock catches the case where the main clock itself dies.<br>In AUTOSAR that's split into the Wdg driver, WdgIf, and the <b>Watchdog Manager</b>, which does alive, deadline and logical supervision of checkpoints and only triggers the hardware if all supervised entities are OK. Other points: read the reset cause at startup to log watchdog resets, and freeze the watchdog on debugger halt. Watchdog was one of the MCAL driver groups I validated, on target and VECU.",
    followups: ["What is the difference between alive, deadline and logical supervision?", "How do you test that the watchdog really resets the ECU?"]
  },

  {
    id: "embedded-19",
    topic: "embedded",
    type: "theory",
    q: "What are the practical differences between 16-bit and 32-bit microcontrollers for a software developer?",
    vi: "Đối với lập trình viên phần mềm, vi điều khiển 16-bit và 32-bit khác nhau thực tế ở những điểm nào?",
    tags: ["16-bit MCU", "32-bit MCU", "word size", "int size", "address space", "hardware divide", "atomicity", "vi điều khiển"],
    viTags: ["so sánh 16 bit và 32 bit", "độ rộng từ", "không gian địa chỉ", "phép chia phần cứng", "tính nguyên tử"],
    key: ["int often 16-bit: overflow surprises", "32-bit math = multiple instructions", "Wider accesses not atomic", "Smaller address space / memory models", "Porting: types, alignment, near/far"],
    answer: "The register and ALU width change how code behaves and performs. On a 16-bit MCU <code>int</code> is usually 16 bits, so something like a millisecond timeout multiplied by a factor can overflow at 32767, while the same code is fine on a 32-bit core. 32-bit arithmetic compiles into multiple instructions, and multiply or divide may have no hardware support, so they're slow. Reads and writes wider than 16 bits aren't atomic, which creates torn-read races with ISRs.<br>The <b>address space</b> is often smaller or segmented, so some toolchains have near and far pointers or memory models. Alignment rules are different, so struct layouts change. On the other hand, 16-bit parts are usually cheaper, lower power, with fast interrupt response for simple tasks.<br>32-bit cores like RH850, TriCore or Cortex-M give a flat address space, single-cycle 32-bit operations, hardware divide, often FPU, caches and multi-core, which you need for an AUTOSAR stack. My hands-on experience is on 32-bit targets, RH850, Infineon and ST, but when porting between widths I'd review types, promotion, atomicity, alignment and any assumptions about pointer size.",
    followups: ["Which bugs typically appear when porting from 32-bit to 16-bit?", "Why do 16-bit MCUs still exist in cars?"]
  },

  {
    id: "embedded-20",
    topic: "embedded",
    type: "theory",
    q: "Explain Harvard vs von Neumann architecture, and how flash wait states and caches affect performance and determinism.",
    vi: "Giải thích kiến trúc Harvard và von Neumann, và flash wait state cùng cache ảnh hưởng thế nào đến hiệu năng và tính tất định.",
    tags: ["Harvard", "von Neumann", "flash wait states", "cache", "prefetch", "DMA coherency", "WCET", "kiến trúc bộ nhớ", "bộ nhớ đệm"],
    viTags: ["kiến trúc máy tính", "chu kỳ chờ flash", "tính tất định", "hiệu năng", "thời gian thực thi xấu nhất", "nạp trước lệnh"],
    key: ["Harvard: separate instruction/data buses", "Modified Harvard: one address space, split buses", "Flash slower than CPU -> wait states", "Set wait states BEFORE raising clock", "Cache: fast but less deterministic; DMA coherency"],
    answer: "<strong>Von Neumann</strong> uses one bus and one memory for code and data, so an instruction fetch and a data access compete. <strong>Harvard</strong> separates them, so the CPU can fetch and access data in the same cycle. Pure Harvard parts like AVR or many DSPs even have separate address spaces, which is why reading a constant table from flash needs special instructions. Most modern MCUs are <b>modified Harvard</b>: separate buses or caches, but one unified address map.<br>Flash is slower than the CPU at high clock, so the flash controller adds <strong>wait states</strong>. The number depends on the frequency. A classic bring-up bug is raising the PLL before setting enough wait states: the CPU reads garbage and crashes. Prefetch buffers and caches hide the latency.<br>Caches bring two issues. <b>Determinism</b>: the same code takes different time depending on hits and misses, which makes worst-case timing harder. <b>Coherency</b>: DMA writes to RAM behind the data cache, so you have to invalidate or clean the cache, or put DMA buffers in a non-cacheable region. For hot ISRs I'd place code or data in local RAM, on RH850 the core-local RAM, to avoid flash latency.",
    followups: ["How do you configure a DMA buffer to avoid cache coherency problems?", "Why does code run faster from RAM than flash?"]
  },

  {
    id: "embedded-21",
    topic: "embedded",
    type: "theory",
    q: "What contributes to interrupt latency, and how do priorities and nesting work?",
    vi: "Những yếu tố nào góp phần vào độ trễ ngắt, và mức ưu tiên cùng ngắt lồng nhau hoạt động ra sao?",
    tags: ["interrupt latency", "priority", "nesting", "preemption", "INTC", "NVIC", "critical section", "độ trễ ngắt", "ưu tiên ngắt"],
    viTags: ["ngắt lồng nhau", "chiếm quyền", "bộ điều khiển ngắt", "thời gian đáp ứng ngắt", "độ trễ đáp ứng"],
    key: ["Latency = request -> first ISR instruction", "Adds: current instruction, context save, wait states", "Biggest killer: long interrupts-disabled sections", "Higher priority preempts lower (nesting)", "Cat1 vs Cat2 in AUTOSAR OS"],
    answer: "Interrupt latency is the time from the interrupt request to the first instruction of the handler. It includes synchronizing the request, finishing or dropping the current instruction, saving context, either by hardware stacking like on Cortex-M or by software prologue, fetching the vector, and flash wait states or cache misses on the way. But in practice the biggest causes are in software: <strong>time spent with interrupts disabled</strong> in critical sections, and a <strong>higher or equal priority ISR already running</strong>. That's why critical sections must be short.<br>For <b>priorities and nesting</b>: the interrupt controller, INTC on RH850 or NVIC on ARM, gives each source a priority. If a higher-priority request arrives while a lower ISR runs, it preempts it; equal or lower priority waits pending. Nesting improves response for urgent events but needs more stack, since every level adds a context frame.<br>In AUTOSAR OS, Category 1 ISRs bypass the OS for minimum latency but can't use OS services; Category 2 are OS-managed and must sit below the Cat1 priorities. Fast, frequent events, like capturing SENT edges, need either a high priority or hardware support like DMA or timestamp buffers.",
    followups: ["How do you measure interrupt latency on real hardware?", "What is priority inversion and how does OSEK avoid it?"]
  },

  {
    id: "embedded-22",
    topic: "embedded",
    type: "practical",
    q: "The JD mentions 'code optimization for specific targets and compilers'. How do you approach it?",
    vi: "JD có nhắc đến 'tối ưu code cho target và trình biên dịch cụ thể'. Bạn tiếp cận việc này thế nào?",
    tags: ["code optimization", "compiler flags", "-Os", "-O2", "profiling", "cycle counter", "trace", "map file", "tối ưu code"],
    viTags: ["trình biên dịch", "cờ biên dịch", "đo hiệu năng", "đếm chu kỳ", "tối ưu tốc độ", "tối ưu kích thước"],
    key: ["Measure first: trace, cycle counter, map file", "Pick level per file: speed for hot, -Os elsewhere", "Fix the algorithm/data before micro-tricks", "Place hot code/data in fast RAM", "Re-verify: tests on target, release build"],
    answer: "I start by <strong>measuring</strong>, because guesses about hotspots are often wrong. For speed: a cycle counter or timer read around the function, toggling a GPIO and looking at a scope, or TRACE32 trace, which gives function-level runtime without changing the code. For size: the map file and per-object size reports, compared from build to build.<br>Then I work from big to small. <b>Algorithm and data</b> first: avoid repeated work, use lookup tables, reduce copying of large structs. Then <b>compiler settings</b>: commercial toolchains like Green Hills or CC-RH for RH850 and TASKING or HighTec for AURIX [fill: the compiler you actually used] let you pick optimization per file or per function. So hot ISRs and math get speed optimization while the rest uses <code>-Os</code> to save flash. <b>Memory placement</b>: hot code and data into fast local RAM through MemMap and the linker script. Then <b>target-specific details</b>: native word size for loop variables, fixed-point instead of float on cores without FPU, shifts and masks instead of division, <code>static inline</code> for tiny accessors, compiler intrinsics.<br>Finally, I measure again and rerun the tests on the target with the release build, because higher optimization exposes hidden bugs like missing volatile or undefined behaviour.",
    followups: ["What is the risk of -O3 on a small MCU?", "How do you check what the compiler actually generated?", "Have you ever had to meet a CPU load budget?"]
  },

  {
    id: "embedded-23",
    topic: "embedded",
    type: "practical",
    q: "Give concrete low-level optimization techniques: avoiding float, lookup tables, intrinsics, loop unrolling.",
    vi: "Nêu các kỹ thuật tối ưu mức thấp cụ thể: tránh dùng float, bảng tra, intrinsic, loop unrolling.",
    tags: ["fixed-point", "Q15", "lookup table", "LUT", "intrinsics", "loop unrolling", "inline", "no FPU", "số thực dấu phẩy tĩnh"],
    viTags: ["tối ưu code", "bảng tra", "tránh số thực", "trải vòng lặp", "hàm nội tuyến", "tối ưu mức thấp"],
    key: ["No FPU: fixed-point (Q format)", "LUT + interpolation instead of heavy math", "Power-of-two sizes: mask instead of %", "Intrinsics: CLZ, saturation, DI/EI", "Unroll/inline trade speed for flash"],
    answer: "On a core <strong>without an FPU</strong>, every float operation becomes a software library call, tens to hundreds of cycles. I use <b>fixed-point</b> instead: store values scaled by a power of two, for example Q15, where multiply is a 32-bit product shifted right by 15. Even with an FPU, avoiding float in ISRs can save the FPU context save.<br><b>Lookup tables</b> in flash replace expensive functions like sine or sensor linearization; with linear interpolation between points, accuracy is usually fine. <b>Power-of-two sizes</b> let me replace modulo and division with a mask or shift, which matters on cores where division is slow.<br><b>Intrinsics</b> give access to special instructions without assembly: count leading zeros, saturating arithmetic, byte-swap, and interrupt enable/disable, for example <code>__DI()</code>/<code>__EI()</code> style intrinsics on RH850 compilers or <code>__disable_irq()</code> on Cortex-M. They're compiler-specific, so I wrap them in a small abstraction header.<br><b>Loop unrolling and inlining</b> remove branch and call overhead but grow code size, which can hurt cache hit rate and flash budget. So I only use them where measurement shows a gain.",
    code: "/* Q15 multiply, no FPU needed */\nstatic inline int16_t Q15_Mul(int16_t a, int16_t b)\n{\n    int32_t p = (((int32_t)a * (int32_t)b) + 0x4000) >> 15;  /* round */\n    return (p > 32767) ? (int16_t)32767 : (int16_t)p;        /* -1 * -1 saturates */\n}\n\n/* Ring buffer with power-of-two size: mask instead of % */\n#define RB_SIZE 64u\nidx = (idx + 1u) & (RB_SIZE - 1u);",
    lang: "c",
    followups: ["How do you choose the Q format for a sensor value?", "When does inlining make code slower?"]
  },

  {
    id: "embedded-24",
    topic: "embedded",
    type: "practical",
    q: "How do you handle typical compiler and linker errors, and what do you look for in a map file?",
    vi: "Xử lý các lỗi trình biên dịch và linker thường gặp thế nào, và cần xem gì trong map file?",
    tags: ["linker error", "undefined reference", "multiple definition", "region overflow", "map file", "MemMap", "section", "lỗi liên kết", "map file"],
    viTags: ["lỗi biên dịch", "tham chiếu không xác định", "định nghĩa trùng lặp", "tràn vùng nhớ", "tệp map"],
    key: ["Undefined ref: missing object/lib, name, extern C", "Multiple definition: definition in a header", "Region overflow: find biggest consumers", "Map: sections, sizes, symbol addresses", "Check vars landed in intended section"],
    answer: "The common ones: <b>undefined reference</b> means the linker can't find a definition. So the object or library isn't in the build, the name or signature is different, the function is static in another file, or a C function is called from C++ without <code>extern \"C\"</code>. <b>Multiple definition</b> usually means a variable is defined, not just declared, in a header included by several files; the fix is <code>extern</code> in the header and one definition in a .c file. Newer GCC versions default to <code>-fno-common</code>, so legacy code that relied on tentative definitions starts failing. <b>Region overflow</b> means a section doesn't fit its memory region.<br>The <strong>map file</strong> is my main tool. It lists memory regions and their usage, each output section with its address and size, which object added how many bytes, symbol addresses, and discarded sections. I use it to find what grew the flash or RAM, to confirm a variable really landed in the intended section, for example no-init RAM or core-local RAM after a MemMap change, and to look up an address from a crash. During BSW integration on RH850, MemMap and section placement were a common source of issues. [fill: a concrete linker or MemMap issue you resolved during RH850 integration]",
    followups: ["How would you track flash usage growth in CI?", "What is the difference between a declaration and a definition?"]
  },

  {
    id: "embedded-25",
    topic: "embedded",
    type: "theory",
    q: "How do you write portable, reusable and modular embedded software?",
    vi: "Làm sao viết phần mềm nhúng khả chuyển, tái sử dụng được và có tính mô-đun?",
    tags: ["portability", "HAL", "abstraction", "modular", "Compiler.h", "MemMap", "Platform_Types", "AUTOSAR layers", "tái sử dụng", "khả chuyển"],
    viTags: ["tính mô-đun", "lớp trừu tượng phần cứng", "kiến trúc phần mềm", "phân lớp autosar", "code dùng lại được"],
    key: ["Layering: app / services / HAL (MCAL)", "Hardware only behind driver interfaces", "Compiler specifics in one abstraction header", "Separate config from code", "Clear headers, static internals, no globals"],
    answer: "The main idea is to keep hardware and compiler dependencies in as few places as possible. <b>Layering</b>: application logic talks to services, services talk to a hardware abstraction layer, and only the lowest layer touches registers. AUTOSAR Classic is the formal version of this: SWCs see the RTE, the BSW sits on the MCAL, and only the MCAL is MCU-specific, so the same application runs on RH850 or AURIX with a different MCAL.<br><b>Compiler and platform abstraction</b>: types from Platform_Types.h, compiler-specific keywords and pragmas behind macros in Compiler.h, and memory placement through MemMap headers that translate to the right <code>#pragma section</code> for each toolchain. No inline assembly or intrinsics spread through the code.<br><b>Configuration separated from code</b>: channel counts, IDs and feature switches live in generated config files, so the same source is reused across projects.<br><b>Module rules</b>: a small public header, everything else static, no shared globals, clear init and main function, and no assumptions about endianness, int size or alignment. And unit tests on host or VECU, which only work if the hardware is abstracted.",
    code: "/* Classic AUTOSAR style: compiler/memory abstraction */\n#define CANIF_START_SEC_CODE\n#include \"CanIf_MemMap.h\"\nFUNC(Std_ReturnType, CANIF_CODE) CanIf_Transmit(\n    PduIdType TxPduId,\n    P2CONST(PduInfoType, AUTOMATIC, CANIF_APPL_DATA) PduInfoPtr);\n#define CANIF_STOP_SEC_CODE\n#include \"CanIf_MemMap.h\"",
    lang: "c",
    followups: ["What is the difference between pre-compile, link-time and post-build configuration?", "How does a HAL help unit testing?"]
  },

  {
    id: "embedded-26",
    topic: "embedded",
    type: "theory",
    q: "What parts of C++ are fine in embedded, and what do you avoid? What does a virtual call cost?",
    vi: "Những phần nào của C++ dùng được trong nhúng, và phần nào nên tránh? Một lời gọi virtual tốn chi phí bao nhiêu?",
    tags: ["C++", "RAII", "virtual", "vtable", "exceptions", "RTTI", "templates", "constexpr", "C++ nhúng"],
    viTags: ["hàm ảo", "bảng hàm ảo", "ngoại lệ", "khuôn mẫu", "chi phí c++"],
    key: ["Use: classes, RAII, templates, constexpr, std::array", "Avoid in RT: heap, exceptions, RTTI", "Virtual: vptr/object, vtable/class, no inline", "Static polymorphism (templates/CRTP) as alternative", "Mind global constructor order"],
    answer: "I use the zero-cost parts: <b>classes</b> for encapsulation, <b>RAII</b>, for example a lock guard whose constructor enters a critical section and destructor leaves it, so no early return can forget to restore interrupts, <b>templates</b> and <b>constexpr</b> for compile-time computation, <code>std::array</code> instead of raw arrays, namespaces, and <code>enum class</code>.<br>I avoid, at least in real-time or safety code: <b>heap</b> usage including most STL containers, <b>exceptions</b>, which cost flash and have non-deterministic unwinding, so they're usually disabled with <code>-fno-exceptions</code>, and <b>RTTI</b>. These are also restricted by AUTOSAR C++14 and MISRA C++ guidelines.<br>A <b>virtual call</b> costs one hidden vptr per object, one vtable per class in flash, and an indirect call through the table. The call itself is only a few cycles, but it prevents inlining. For fixed configurations, templates or CRTP give static polymorphism at zero runtime cost, and <code>final</code> lets the compiler devirtualize. Also watch global constructors: they run in startup before main, and their order across files is unspecified.",
    code: "class IrqLock {\npublic:\n    IrqLock()  : saved_(Irq_SaveAndDisable()) {}\n    ~IrqLock() { Irq_Restore(saved_); }\n    IrqLock(const IrqLock&) = delete;\n    IrqLock& operator=(const IrqLock&) = delete;\nprivate:\n    uint32_t saved_;\n};\n\nvoid Update() {\n    IrqLock lock;           // restored on every return path\n    g_shared++;\n}",
    lang: "cpp",
    followups: ["Why does a polymorphic base class need a virtual destructor?", "What is CRTP?"]
  },

  {
    id: "embedded-27",
    topic: "embedded",
    type: "practical",
    q: "Walk me through bringing up a peripheral from the datasheet and reference manual. What goes wrong most often?",
    vi: "Trình bày quá trình bring-up một ngoại vi từ datasheet và reference manual. Những lỗi nào hay gặp nhất?",
    tags: ["datasheet", "reference manual", "peripheral bring-up", "clock gating", "pin mux", "errata", "TRACE32 register view", "đọc datasheet", "khởi tạo ngoại vi"],
    viTags: ["tài liệu tham khảo", "cấp clock", "cấu hình chân", "lỗi phần cứng errata", "bring-up phần cứng"],
    key: ["Read chapter overview + init sequence", "Clock enable / module standby first", "Pin mux (PORT/alternate function)", "Config registers, then interrupt, then enable", "Check errata; verify in debugger + scope"],
    answer: "I start with the peripheral chapter overview and block diagram, then look for the <b>initialization sequence</b> the manual recommends, because order often matters. My checklist: first, the peripheral's <strong>clock</strong>, its clock source, prescaler, and releasing it from module standby or clock gating. Second, <strong>pin configuration</strong>: port mode and alternate function, on RH850 that's registers like PMC and PFC, plus direction, pull-ups, drive strength. Third, the peripheral's own <strong>configuration registers</strong> with the module disabled, then the <strong>interrupt</strong> controller channel and priority, and only then enable the module. I also check for write-protected registers that need an unlock sequence, the electrical and timing characteristics in the datasheet, and the <b>errata sheet</b>, which has saved people days.<br>To verify, I look at the registers in TRACE32 or UDE and compare them bit by bit with what I intended, and use a scope or logic analyzer on the pins. The most common causes of a peripheral that does nothing are a missing clock enable, wrong pin mux, and an interrupt enabled at the peripheral but not at the controller. [fill: a peripheral you brought up or debugged and what the actual root cause was]",
    followups: ["How do you confirm the PLL is really running at the expected frequency?", "What is an errata sheet?"]
  },

  {
    id: "embedded-28",
    topic: "embedded",
    type: "practical",
    bridge: true,
    q: "The JD lists Freescale/NXP PowerPC, TI DSP and Microchip. Have you worked with those, and how would you ramp up on a new MCU family?",
    vi: "JD có liệt kê Freescale/NXP PowerPC, TI DSP và Microchip. Bạn đã làm việc với chúng chưa, và bạn sẽ làm quen với một dòng MCU mới như thế nào?",
    tags: ["new MCU", "PowerPC", "NXP", "Freescale", "TI DSP", "C2000", "Microchip", "ramp-up", "bridge", "học MCU mới"],
    viTags: ["dòng vi điều khiển mới", "làm quen nền tảng mới", "kinh nghiệm vi điều khiển", "chuyển đổi nền tảng", "vi xử lý tín hiệu số"],
    key: ["Honest: hands-on RH850, Infineon, ST", "Core manual: ABI, interrupts, endianness", "Toolchain, startup, linker, errata", "Blinky -> timer ISR -> comm peripheral", "Watch traps: PPC big-endian, C28x 16-bit char"],
    answer: "To be honest, my hands-on targets are Renesas RH850 D3/D4/D5, Infineon and ST, plus R-Car and Raspberry Pi on the Adaptive side. I haven't worked directly on NXP PowerPC, TI DSPs or Microchip parts. But the concepts carry over, and I have a fixed way to get up to speed.<br>First the <b>core architecture manual</b>: register set, calling convention, interrupt and exception model, memory map, endianness and alignment rules. Then the <b>toolchain</b>: compiler options, intrinsics, startup code and linker script, and the <b>errata</b>. Then a step-by-step bring-up: clock and a GPIO toggle, a timer interrupt, then a communication peripheral, checking each one in the debugger. TRACE32, which I know well, supports all of these families, so the debug workflow stays familiar.<br>I'd also watch for traps that are specific to each family. The PowerPC e200 cores in NXP MPC5xxx parts are big-endian, so shared code that assumes a byte order breaks. TI C28x DSPs have a 16-bit char, so there's no uint8_t and sizeof behaves differently. 16-bit Microchip parts have a 16-bit int. With AUTOSAR the MCAL hides most of this from the upper layers, so the integration work carries over directly.",
    followups: ["What would you check first when porting an RH850 BSW integration to a PowerPC target?", "How long do you think you'd need to become productive?"]
  },

  /* ================================ MISRA C ================================ */
  {
    id: "embedded-29",
    topic: "embedded",
    type: "theory",
    q: "What is MISRA C, and why is it used in automotive software?",
    vi: "MISRA C là gì, và tại sao nó được dùng trong phần mềm ô tô?",
    tags: ["MISRA", "MISRA C:2012", "MISRA C:2023", "coding guideline", "directive", "rule", "mandatory required advisory", "ISO 26262", "language subset", "chuẩn lập trình"],
    viTags: ["quy tắc lập trình", "an toàn chức năng", "phần mềm ô tô", "tập con ngôn ngữ c", "chuẩn misra"],
    key: [
      "Safer C subset: avoid undefined/unspecified/impl-defined behaviour",
      "MISRA C:2012 (+amendments) -> consolidated MISRA C:2023",
      "Directives (process, not always tool-checkable) vs Rules",
      "Categories: Mandatory / Required / Advisory",
      "Driven by ISO 26262-6, ASPICE unit verification, AUTOSAR BSW"
    ],
    answer: "MISRA C is a set of coding guidelines that defines a safer subset of C for critical embedded systems. C has a lot of undefined, unspecified and implementation-defined behaviour, and MISRA keeps code away from it, so the code is predictable, portable between compilers and easy to analyse. The base version is <strong>MISRA C:2012</strong>, plus amendments that were later merged into <strong>MISRA C:2023</strong>. For C++ there is MISRA C++:2023, which also took in the AUTOSAR C++14 guidelines.<br>The guidelines are split into <b>directives</b>, which are about process or design and can't always be checked by a tool, for example Dir 4.1 'run-time failures shall be minimised', and <b>rules</b>, which are precise and mostly checkable by static analysis. Each one has a category: <b>Mandatory</b>, <b>Required</b> or <b>Advisory</b>. Rules are also classified as decidable or undecidable, and by analysis scope: single translation unit or whole system.<br>Why automotive uses it: ISO 26262-6 asks for a language subset, strong typing and coding guidelines, and MISRA C is the standard way to meet that. ASPICE assessors expect a coding standard and static verification as part of unit verification. And AUTOSAR BSW specifications expect MISRA compliance, with documented deviations. [fill: where you applied MISRA: project, tool, and your role, e.g. fixing findings or reviewing deviations]",
    followups: ["What is the difference between undefined and implementation-defined behaviour?", "What is the difference between a directive and a rule?"]
  },
  {
    id: "embedded-30",
    topic: "embedded",
    type: "theory",
    q: "Explain the MISRA categories and the deviation process. Can you deviate from any rule?",
    vi: "Giải thích các loại quy tắc MISRA và quy trình deviation. Có thể deviation bất kỳ rule nào không?",
    tags: ["MISRA", "deviation", "deviation permit", "mandatory", "required", "advisory", "MISRA Compliance:2020", "GRP", "compliance summary", "ngoại lệ"],
    viTags: ["ngoại lệ quy tắc", "phân loại quy tắc", "bắt buộc khuyến nghị", "quy trình ngoại lệ", "tuân thủ misra", "báo cáo tuân thủ"],
    key: [
      "Mandatory: never deviate, fix (e.g. 9.1, 17.4)",
      "Required: only with a formal, approved deviation",
      "Advisory: recommended; can be disapplied in the GRP",
      "Deviation = rule + scope + justification + risk/mitigation + approval",
      "MISRA Compliance:2020: GRP + Guideline Compliance Summary"
    ],
    answer: "The category decides what you may do when code doesn't comply. <b>Mandatory</b> guidelines can never be deviated. Examples are Rule 9.1, reading an automatic variable before it is set, and Rule 17.4, a non-void function must return a value on every path. These are real bugs, so the code has to be fixed. <b>Required</b> guidelines must be followed unless there is a <strong>formal deviation</strong>. <b>Advisory</b> guidelines are recommendations; non-compliance doesn't need a formal deviation, and a project can even disapply them.<br>A deviation record contains the guideline, the exact scope (which file, function or construct), the <b>justification</b>, for example hardware access, performance or third-party code, the <b>risk analysis</b> and how the risk is reduced, for example an extra review or a test, and the <b>approval</b> by someone who has the authority, usually the safety or quality owner. For patterns that repeat, like register access through an integer-to-pointer cast, which violates Rule 11.4, the project defines a <b>deviation permit</b> once and each use points to it.<br>This is defined formally in <b>MISRA Compliance:2020</b>. The project has a Guideline Re-categorization Plan, which can make guidelines stricter or disapply advisory ones but can never weaken Mandatory or Required, and a <b>Guideline Compliance Summary</b> that shows, for each guideline, whether it is compliant, deviated or disapplied. Without that summary, 'we are MISRA compliant' is just a claim.",
    followups: ["Who should approve a deviation in a safety project?", "Can a Required rule be re-categorised to Advisory?"]
  },
  {
    id: "embedded-31",
    topic: "embedded",
    type: "practical",
    q: "Which MISRA C:2012 violations do you see in this code, and which of them are real bugs?",
    vi: "Bạn thấy những vi phạm MISRA C:2012 nào trong đoạn code này, và vi phạm nào là bug thật?",
    tags: ["MISRA", "code review", "rule 9.1", "rule 10.3", "rule 10.4", "rule 15.6", "rule 16.3", "rule 16.4", "rule 20.7", "tìm lỗi code"],
    viTags: ["vi phạm misra", "review code", "đánh giá mã nguồn", "lỗi thực sự", "bài tập misra"],
    key: [
      "20.7 macro params unparenthesised (Dir 4.9: prefer function)",
      "15.6 no braces; 10.4 signed 1000 vs unsigned raw",
      "10.3 truncation into uint8_t (real bug)",
      "16.3 fall-through, 16.4 no default (real bug)",
      "9.1 Mandatory: result read uninitialised (real bug, UB)"
    ],
    answer: "I'd go from top to bottom. <b>SQUARE</b>: the macro parameters aren't in parentheses, so <code>SQUARE(a + 1)</code> expands to <code>a + 1 * a + 1</code>. That's Rule 20.7, and Dir 4.9 would prefer an inline function anyway.<br><b>if (raw > 1000)</b>: the body has no braces, Rule 15.6. And <code>1000</code> is a signed constant compared with an unsigned variable, mixing essential type categories, Rule 10.4; write <code>1000u</code>.<br><b>result = raw / 4 + offset</b>: mixes unsigned and signed operands again (10.4), and assigns a wider expression to a uint8_t, Rule 10.3. That's a real truncation: 4000 / 4 is 1000, which doesn't fit in 8 bits.<br><b>switch</b>: case 0 falls through without a break, Rule 16.3, and there is no default, Rule 16.4.<br><b>return result</b>: if raw is 1000 or less, result is never set but is still read by the increment or by the return. That's Rule 9.1, which is <b>Mandatory</b>, and it's the most serious finding because the value is indeterminate, not a style issue.<br>So the real bugs are the uninitialised read, the truncation and the fall-through. The rest are patterns MISRA forbids because they lead to bugs like these. The fix: initialise result, use unsigned constants, compute in uint16_t and clamp before an explicit cast, and add braces, a break and a default.",
    code: "#define SQUARE(x)  x * x\n\nuint8_t Scale(uint16_t raw, int8_t offset)\n{\n    uint8_t result;\n\n    if (raw > 1000)\n        result = raw / 4 + offset;\n\n    switch (offset)\n    {\n        case 0:  result++;\n        case 1:  result--; break;\n    }\n    return result;\n}",
    lang: "c",
    followups: ["Rewrite the function so that it is compliant.", "Which of these findings can a tool detect reliably, and which are undecidable?"]
  },
  {
    id: "embedded-32",
    topic: "embedded",
    type: "theory",
    q: "What is the MISRA essential type model? Why is uint32_t t = a * b flagged when a and b are uint16_t?",
    vi: "Mô hình essential type của MISRA là gì? Tại sao uint32_t t = a * b bị báo lỗi khi a và b là uint16_t?",
    tags: ["MISRA", "essential type", "rule 10.3", "rule 10.4", "rule 10.6", "rule 14.4", "rule 7.2", "integer promotion", "16-bit MCU", "kiểu dữ liệu"],
    viTags: ["kiểu thiết yếu", "thăng kiểu số nguyên", "tràn số", "ép kiểu", "vi phạm misra"],
    key: [
      "Essential type = category (bool/char/signed/unsigned/enum/float) + size",
      "10.4 same category; 10.3 no narrowing; 10.6/10.8 no widening composite",
      "a * b: 16-bit int wraps; 32-bit int can overflow signed int",
      "Fix: cast one operand before the operation",
      "14.4: if/while need essentially Boolean -> ptr != NULL_PTR"
    ],
    answer: "C's own rules are confusing: small types are promoted to int, and mixed signed and unsigned operands are converted in ways people don't expect. MISRA replaces that with <strong>essential types</strong>: every expression has a category, Boolean, character, signed, unsigned, enum or floating, and a size, and the Rule 10 family limits what can be mixed. Operands of an arithmetic operator should have the same category (10.4), you don't assign to a narrower type or a different category (10.3), and a composite expression shouldn't be assigned or cast to a wider type (10.6, 10.8).<br>The example is Rule 10.6. The code looks like a 32-bit multiplication, but it isn't. On a <b>16-bit MCU</b>, int is 16 bits, so the uint16_t operands stay unsigned 16-bit, the product wraps at 65536, and only the wrong result is widened. On a <b>32-bit MCU</b>, both operands are promoted to signed int, so it works for most values, but 65535 × 65535 overflows signed int, which is undefined behaviour. Same source code, different behaviour on each target. The fix is to cast one operand first: <code>(uint32_t)a * b</code>, so the multiplication itself is 32-bit unsigned everywhere.<br>The same model explains why <code>1000</code> compared with an unsigned variable breaks 10.4 and should be <code>1000u</code>, and why <code>if (ptr)</code> breaks Rule 14.4: a controlling expression must be essentially Boolean, so you write <code>ptr != NULL_PTR</code>.",
    code: "uint16_t a = 40000u;\nuint16_t b = 3u;\n\nuint32_t t1 = a * b;            /* 10.6: 54464 with 16-bit int, 120000 with 32-bit int */\nuint32_t t2 = (uint32_t)a * b;  /* 120000 on every target */",
    lang: "c",
    followups: ["Why does uint16_t promote to unsigned int on a 16-bit MCU but to int on a 32-bit MCU?", "What does Rule 10.8 say about casting composite expressions?"]
  },
  {
    id: "embedded-33",
    topic: "embedded",
    type: "practical",
    q: "How do you run static analysis and MISRA checks as a quality gate in CI, especially on legacy code with thousands of findings?",
    vi: "Làm sao chạy phân tích tĩnh và kiểm tra MISRA như một quality gate trong CI, đặc biệt với code cũ có hàng nghìn cảnh báo?",
    tags: ["MISRA", "static analysis", "quality gate", "CI", "Helix QAC", "Polyspace", "PC-lint", "baseline", "no new violations", "tool qualification", "phân tích tĩnh"],
    viTags: ["cổng chất lượng", "tích hợp liên tục", "code cũ", "không thêm vi phạm mới", "công cụ kiểm tra misra"],
    key: [
      "Analyser must see the real build: includes, defines, compiler",
      "Pin tool version + rule config in the repo",
      "Legacy: baseline, gate = no new Mandatory/Required findings",
      "Suppression must reference an approved deviation ID",
      "Archive report as evidence; tool confidence per ISO 26262-8"
    ],
    answer: "First, the analyser has to see the real build, otherwise the results are just noise. It needs the same include paths, defines and compiler settings as the cross-compiler, so I feed it the build's compile commands, and I pin the tool version and the rule configuration in the repository like any other build input. Tools in this space are Helix QAC, Polyspace, PC-lint Plus, Parasoft, LDRA and Coverity. [fill: which tool you used and how you ran it]. A MISRA checker is not the same as a bug finder: Polyspace Code Prover, for example, uses abstract interpretation to prove there are no run-time errors like overflow or out-of-bounds access, which adds to rule checking. Compiler warnings with <code>-Werror</code> are the cheapest first layer.<br>For legacy code I wouldn't try to fix everything on day one. I take a <strong>baseline</strong> of the existing findings and make the gate '<b>no new violations</b>' on every pull request: zero new Mandatory and Required findings in changed code, and any suppression comment must reference an approved deviation ID. Then we reduce the legacy backlog module by module, ordered by category and risk, and track it as a trend.<br>The report of each release build is archived with the baseline as evidence for unit verification under ASPICE. For ISO 26262, the analysis tool itself needs a tool confidence evaluation, or a qualification kit from the vendor.",
    followups: ["How do you handle false positives?", "Should static analysis run on every pull request or only nightly?"]
  },
  {
    id: "embedded-34",
    topic: "embedded",
    type: "practical",
    q: "How does MISRA compliance work in an AUTOSAR project, with generated code and third-party BSW?",
    vi: "Tuân thủ MISRA trong một dự án AUTOSAR hoạt động thế nào, với code sinh tự động và BSW của bên thứ ba?",
    tags: ["MISRA", "AUTOSAR", "MemMap", "Dir 4.10", "rule 20.1", "generated code", "RTE", "vendor BSW", "adopted code", "deviation", "tích hợp"],
    viTags: ["code sinh tự động", "phần mềm bên thứ ba", "tuân thủ misra", "ngoại lệ quy tắc", "phần mềm nền autosar"],
    key: [
      "Hand-written SWC/CDD: owning team fixes",
      "Vendor BSW/MCAL: review their compliance statement (adopted code)",
      "Generated RTE/config: analyse per project, fix via config",
      "MemMap: no include guard (Dir 4.10), mid-file #include (20.1)",
      "Integrated report: split findings by origin first"
    ],
    answer: "An integrator deals with three kinds of code, and each is handled differently. <b>Hand-written code</b>, SWCs and CDDs, is checked and fixed by the owning team under the project's compliance plan. <b>Supplier BSW and MCAL</b> come with the vendor's MISRA compliance statement and deviation list. I don't re-fix vendor code, but I check that their deviations are acceptable for the project's ASIL and record them; MISRA Compliance calls this adopted code. <b>Generated code</b>, the RTE and configuration files, depends on the configuration, so it is analysed per project, and findings there are fixed by changing the configuration or reported to the tool vendor, not by editing generated files.<br>Some AUTOSAR patterns break MISRA on purpose. The classic one is <strong>MemMap</strong>: MemMap.h has no include guard because it is included many times, once per section start and stop, which conflicts with Dir 4.10, and those includes sit in the middle of the file, against advisory Rule 20.1. The compiler abstraction macros like FUNC and P2VAR are function-like macros, which Dir 4.9 advises against, and MCAL register access casts integers to pointers, Rule 11.4.<br>So when the MISRA report on an integrated build shows thousands of findings, the first step is to split them by where they come from, filter out the documented AUTOSAR and vendor deviations, and focus on what's new in project-owned code. [fill: how MISRA reports were handled in your project]",
    followups: ["A vendor BSW module has a Required violation without a deviation. What do you do?", "Why must you not edit generated RTE code to fix a finding?"]
  },
  {
    id: "embedded-35",
    topic: "embedded",
    type: "behavioral",
    q: "A developer wants to suppress a MISRA finding because 'the rule is stupid', and the deadline is tomorrow. What do you do?",
    vi: "Một developer muốn tắt cảnh báo MISRA vì 'rule này vô lý', và deadline là ngày mai. Bạn sẽ làm gì?",
    tags: ["MISRA", "deviation", "quality gate", "conflict", "deadline", "leadership", "suppression", "xung đột", "áp lực deadline"],
    viTags: ["tắt cảnh báo", "kỹ năng lãnh đạo", "tình huống hành vi", "ngoại lệ quy tắc", "thuyết phục đồng nghiệp"],
    key: [
      "Look at the finding together first: often a real bug",
      "Real need -> formal deviation or existing permit, not silent suppression",
      "Mandatory -> always fix",
      "Deadline: keep it visible as open, ticket to fix/deviate before release",
      "Never weaken the tool config; recurring rule -> fix the pattern"
    ],
    answer: "I'd first look at the finding with them instead of arguing about the rule, because often the rule is pointing at something real, like a truncation or an uninitialised path, and the fix takes ten minutes. If the code is correct and the construct is really needed, for example hardware access, or it's a false positive, then the answer is not a silent suppression but a <b>deviation</b>: a short justification, the scope, and approval by whoever owns deviations in the project. If there is already a deviation permit for that pattern, it's quick: put the permit ID in the suppression comment. If it's a Mandatory rule, there's no discussion; it gets fixed.<br>About the deadline: I don't want to block the whole team. If the finding isn't safety-relevant and a deviation can't be approved in time, I'd agree with the project lead to merge with the violation <b>visible as open</b>, with a ticket to fix or deviate before the release baseline, instead of quietly lowering the gate. What I avoid is changing the tool configuration to make the problem disappear, because then the gate means nothing for anyone.<br>And if many developers keep hitting the same rule, that's a signal for the project: maybe we need a helper or coding pattern that meets the rule once for everyone, or a review of the compliance plan. [fill: a real example where you handled a MISRA finding or deviation]",
    followups: ["What if the project lead insists on suppressing it anyway?", "How do you keep developers motivated about MISRA?"]
  },

  /* =============================== PROTOCOLS =============================== */

  {
    id: "protocols-01",
    topic: "protocols",
    type: "theory",
    q: "Explain UART framing and how baud rate error affects communication. Can you calculate one?",
    vi: "Giải thích khung truyền UART và sai số baud rate ảnh hưởng thế nào đến truyền thông. Bạn có tính được sai số không?",
    tags: ["UART", "framing", "8N1", "baud rate", "baud error", "oversampling", "parity", "framing error", "truyền nối tiếp"],
    viTags: ["tốc độ baud", "sai số baud", "khung truyền", "bit chẵn lẻ", "lỗi khung", "lấy mẫu"],
    key: ["Idle high; start 0, data LSB first, parity, stop 1", "8N1 = 10 bits per byte", "Receiver syncs on start edge, samples mid-bit", "Keep each side under ~2% error", "16 MHz, x16, 115200: div 9 -> -3.5%"],
    answer: "UART is asynchronous, there's no clock line, so both sides agree on the format beforehand. The line idles high; a frame is a <b>start bit</b> at 0, 5 to 9 data bits LSB first, optional parity, and one or two <b>stop bits</b> at 1. With 8N1 that's 10 bit times per byte, so 80 percent efficiency.<br>The receiver synchronizes on the falling edge of the start bit and then samples each bit near its middle, usually with 16x oversampling and majority voting. Because it only resynchronizes once per frame, clock mismatch adds up over the frame, and by the stop bit the sample point must still be inside the bit. That gives a theoretical total budget of a few percent, around 4 to 5 percent between both sides, so in practice we keep each side under about 2 percent. Otherwise you get framing errors or garbage.<br>Example: 16 MHz peripheral clock, 16x oversampling, target 115200. The divider is 16 MHz over 16 times 115200, which is 8.68. An integer divider of 9 gives 111111 baud, <b>minus 3.5 percent</b>, too much. A fractional divider of 8.6875 gives about 115108, under 0.1 percent, or you pick a crystal that divides evenly.",
    followups: ["What must match between two UART devices?", "What is the difference between a framing error and an overrun error?"]
  },

  {
    id: "protocols-02",
    topic: "protocols",
    type: "theory",
    q: "Explain SPI: signals, the four modes, chip select behaviour and typical problems.",
    vi: "Giải thích SPI: các tín hiệu, bốn chế độ, hành vi của chip select và các vấn đề thường gặp.",
    tags: ["SPI", "CPOL", "CPHA", "SPI mode", "chip select", "MOSI", "MISO", "full-duplex", "daisy chain", "giao tiếp SPI"],
    viTags: ["chế độ spi", "chân chọn chip", "song công", "cực tính xung clock", "pha xung clock", "nối chuỗi"],
    key: ["SCLK, MOSI, MISO + one CS per slave", "Synchronous, full-duplex, master-driven clock", "CPOL = idle level, CPHA = sample edge", "Mode 0: idle low, sample rising", "No ACK: verify with readback/CRC"],
    answer: "SPI is synchronous and full-duplex: the master drives SCLK, shifts data out on MOSI and at the same time in on MISO, so every transfer is an exchange. Each slave has its own <strong>chip select</strong>, usually active low; many devices also use the CS edge to frame a command, so deasserting CS between bytes can abort a transaction or, on some devices, is needed to latch it.<br>The mode is <b>CPOL</b>, the idle level of the clock, and <b>CPHA</b>, whether data is sampled on the first or second clock edge. Mode 0 is idle low, sample on the rising edge, the most common; mode 3 is idle high, sample on the rising, which is the second edge. Master and slave must match, otherwise every bit is shifted by half a clock and you read garbage or values off by a factor of two.<br>Typical problems: wrong mode, CS setup and hold times not met, clock too fast for the slave or the wiring, MSB versus LSB first, and word size. SPI has <strong>no acknowledge</strong>, so the master can't tell if a slave is even there; you check by reading back an ID register, or with a CRC in the protocol, as many automotive SBCs and sensors do.",
    followups: ["How would you debug an SPI sensor that always returns 0xFF?", "What is daisy chaining in SPI?"]
  },

  {
    id: "protocols-03",
    topic: "protocols",
    type: "theory",
    q: "Explain I2C: addressing, ACK/NACK, clock stretching and arbitration.",
    vi: "Giải thích I2C: định địa chỉ, ACK/NACK, clock stretching và phân xử.",
    tags: ["I2C", "SDA", "SCL", "open-drain", "7-bit address", "ACK NACK", "clock stretching", "repeated start", "arbitration", "giao tiếp I2C"],
    viTags: ["địa chỉ thiết bị", "phân xử", "kéo giãn xung clock", "cực máng hở", "xác nhận"],
    key: ["2 wires, open-drain + pull-ups", "START, addr(7) + R/W, ACK per byte, STOP", "NACK: no device, busy, or end of read", "Clock stretching: slave holds SCL low", "Arbitration: wired-AND, loser backs off"],
    answer: "I2C uses two open-drain lines, SDA and SCL, with pull-up resistors, so any device can pull a line low and a high level means everyone released it. A transaction starts with a <b>START</b>, SDA falling while SCL is high, then a 7-bit address plus the R/W bit, then every byte is followed by an <b>ACK</b> bit on the ninth clock where the receiver pulls SDA low. It ends with a <b>STOP</b>, SDA rising while SCL is high. A <b>repeated START</b> lets the master write a register address and then read without releasing the bus. There's also 10-bit addressing using a reserved prefix.<br>A <b>NACK</b> after the address means no device answered or it's busy; a NACK from the master after the last byte of a read is normal and tells the slave to stop sending.<br><b>Clock stretching</b>: a slave that needs time holds SCL low after a byte, and the master must wait until SCL actually goes high. Masters that ignore it cause corrupted data.<br><b>Arbitration</b>: in multi-master setups, a master that sends a 1 but sees a 0 on SDA has lost and stops, without damaging the winner's frame. Speeds are 100k, 400k, 1 MHz Fast-mode Plus, and 3.4 MHz high-speed.",
    followups: ["How do you choose the pull-up resistor value?", "What happens if two devices have the same address?"]
  },

  {
    id: "protocols-04",
    topic: "protocols",
    type: "practical",
    q: "The I2C bus is stuck: SDA stays low and the master can't generate a START. What happened and how do you recover?",
    vi: "Bus I2C bị treo: SDA luôn ở mức thấp và master không tạo được START. Chuyện gì đã xảy ra và khôi phục thế nào?",
    tags: ["I2C bus stuck", "bus recovery", "SDA low", "9 clocks", "reset", "timeout", "khôi phục bus", "treo bus"],
    viTags: ["kẹt bus i2c", "sda mức thấp", "gỡ lỗi i2c", "thời gian chờ", "bus bị kẹt"],
    key: ["Usual cause: master reset mid-transfer", "Slave still driving a 0 bit / ACK", "Recovery: switch SCL to GPIO, clock up to 9 times", "Then generate STOP, reinit controller", "Prevent: timeouts, slave reset pin"],
    answer: "The usual cause is that the master was reset or aborted in the middle of a read while a slave was driving a 0 on SDA. The slave is still waiting for clocks to finish its byte, and it will hold SDA low forever because nothing clocks it. The master sees a busy bus and can't generate a START.<br>The standard recovery, also described in the I2C specification, is: reconfigure SCL as a GPIO, open-drain, and toggle it up to <b>nine times</b> while watching SDA. At some point the slave finishes shifting out its byte and releases SDA, or sees a NACK and stops. Once SDA is high, generate a <b>STOP</b> condition by hand, then give the pins back to the I2C peripheral and reinitialize the controller, which may itself be stuck in a busy state and need a reset.<br>If that fails, use a hardware reset line of the slave or power-cycle it. To prevent and detect it: run the recovery sequence at startup by default, put timeouts on every I2C operation, similar to the SMBus 35 ms timeout, and check for a low SDA before the first transaction. Also check pull-up strength and bus capacitance, since slow rise times cause similar symptoms.",
    followups: ["Why nine clocks?", "How would you detect a stuck bus in the driver automatically?"]
  },

  {
    id: "protocols-05",
    topic: "protocols",
    type: "theory",
    q: "How does the 1-Wire protocol work?",
    vi: "Giao thức 1-Wire hoạt động như thế nào?",
    tags: ["1-Wire", "OneWire", "reset pulse", "presence pulse", "ROM ID", "search ROM", "DS18B20", "parasitic power", "giao thức 1 dây"],
    viTags: ["một dây", "xung reset", "xung hiện diện", "cảm biến nhiệt độ", "cấp nguồn ký sinh"],
    key: ["One data line + ground, open-drain, pull-up", "Reset ~480 µs low -> presence pulse", "Bits in time slots (~60 µs), master starts each", "64-bit ROM: family + serial + CRC8", "Commands: Skip/Match/Search ROM"],
    answer: "1-Wire uses a single open-drain data line plus ground, with a pull-up; devices can even be powered parasitically from the data line. It's master-driven and timing-based, standard speed is about 15 kbit/s.<br>Every transaction starts with a <b>reset pulse</b>: the master pulls the line low for at least 480 µs and releases it; each slave that is there answers with a <b>presence pulse</b>, pulling low for about 60 to 240 µs. Then data moves in <b>time slots</b> of about 60 µs, each started by the master pulling low. To write a 1 it releases after a few microseconds; to write a 0 it holds low for most of the slot. To read, it pulls low briefly, releases, and samples within about 15 µs: if the slave holds the line low, it's a 0.<br>Each device has a unique <b>64-bit ROM code</b>: 8-bit family code, 48-bit serial number and a CRC-8. ROM commands select devices: Skip ROM for a single device, Match ROM to address one, and Search ROM, a binary-tree algorithm to find all IDs on the bus. Then function commands follow, for a DS18B20 temperature sensor for example Convert T and Read Scratchpad. [fill: where you used 1-Wire, for example which device and platform]",
    followups: ["How does the Search ROM algorithm find all devices?", "Why do interrupts cause problems with bit-banged 1-Wire?"]
  },

  {
    id: "protocols-06",
    topic: "protocols",
    type: "theory",
    q: "Describe the classical CAN data frame and how arbitration works.",
    vi: "Mô tả khung dữ liệu CAN cổ điển và cơ chế phân xử hoạt động ra sao.",
    tags: ["CAN", "CAN frame", "arbitration", "dominant", "recessive", "identifier", "CSMA/CR", "DLC", "khung CAN", "phân xử"],
    viTags: ["phân xử bus", "bit trội", "bit lặn", "định danh", "độ dài dữ liệu", "khung dữ liệu can"],
    key: ["SOF, ID+RTR, IDE/r0/DLC, 0-8 data, CRC15, ACK, EOF", "Dominant 0 overrides recessive 1 (wired-AND)", "Bitwise, non-destructive: lowest ID wins", "Losers retry automatically", "Message-based, not node addresses"],
    answer: "A classical CAN data frame has: <b>SOF</b>, one dominant bit; the <b>arbitration field</b>, an 11-bit identifier plus RTR, or 29 bits for extended frames; the <b>control field</b> with IDE, a reserved bit and the 4-bit DLC; 0 to 8 <b>data bytes</b>; a 15-bit <b>CRC</b> plus delimiter; the <b>ACK slot</b>, where any receiver that got the frame correctly overwrites the transmitter's recessive bit with dominant, plus delimiter; and 7 recessive bits of <b>EOF</b>, followed by 3 bits intermission.<br>The bus is wired-AND: a <strong>dominant 0 overrides a recessive 1</strong>. Every node may start transmitting when the bus is idle. During the arbitration field, each transmitter reads back every bit it sends. A node that sends recessive but reads dominant knows a higher-priority frame is on the bus, stops sending and becomes a receiver. So the <strong>lowest identifier wins</strong>, and the winning frame is never damaged, which is why it's called non-destructive, CSMA/CR. The loser tries again automatically after the frame.<br>For the same base ID, a data frame beats a remote frame, and a standard frame beats an extended one. CAN addresses messages, not nodes, so the ID also defines the priority, which is why ID assignment is part of the network design.",
    followups: ["Why can two nodes never send the same ID at the same time?", "What does a missing ACK tell you?"]
  },

  {
    id: "protocols-07",
    topic: "protocols",
    type: "theory",
    q: "Explain CAN bit stuffing, error detection and fault confinement up to bus-off.",
    vi: "Giải thích bit stuffing trong CAN, cơ chế phát hiện lỗi và giới hạn lỗi cho đến trạng thái bus-off.",
    tags: ["bit stuffing", "error frame", "TEC", "REC", "error passive", "bus-off", "CanSM", "fault confinement", "lỗi CAN", "bus-off"],
    viTags: ["nhồi bit", "khung lỗi", "bộ đếm lỗi", "phát hiện lỗi", "trạng thái lỗi", "cô lập lỗi"],
    key: ["Stuff bit after 5 equal bits (SOF..CRC)", "5 checks: bit, stuff, CRC, form, ACK", "Error-active below 128, passive at 128+", "Bus-off when TEC > 255", "Recover after 128 x 11 recessive bits"],
    answer: "<b>Bit stuffing</b>: CAN is NRZ, so after five bits in a row of the same level the transmitter inserts one bit of the opposite level, from SOF to the end of the CRC sequence. This makes sure there are edges for receiver resynchronization; the fixed-form fields like delimiters, ACK and EOF are not stuffed.<br>There are five <b>error detection</b> mechanisms: <b>bit</b> error, when a transmitter reads back a different level outside arbitration and the ACK slot; <b>stuff</b> error, six equal bits; <b>CRC</b> error; <b>form</b> error, a fixed-format bit with the wrong value; and <b>ACK</b> error, when nobody acknowledged. A node that detects an error sends an error frame, which destroys the frame for everyone, and the transmitter retries.<br><b>Fault confinement</b> uses a transmit and a receive error counter. Roughly, a transmit error adds 8, a receive error adds 1, and successful frames decrement them. Below 128 a node is <b>error-active</b> and sends dominant error flags. At 128 or more it's <b>error-passive</b>: it sends recessive flags and waits extra before retransmitting, so it can't disturb the bus. When the TEC goes above 255 the node goes <b>bus-off</b> and stops transmitting until it has seen 128 sequences of 11 recessive bits; depending on the controller, recovery is automatic or requested by software. In AUTOSAR, CanSM handles bus-off recovery and reports it to Dem.",
    followups: ["Why does a single node alone on the bus not go bus-off from ACK errors?", "How does CanSM recover from bus-off?"]
  },

  {
    id: "protocols-08",
    topic: "protocols",
    type: "theory",
    q: "What are the differences between classical CAN and CAN FD?",
    vi: "CAN cổ điển và CAN FD khác nhau ở những điểm nào?",
    tags: ["CAN FD", "BRS", "FDF", "ESI", "64 bytes", "CRC-17", "CRC-21", "data phase", "bit rate switch", "CAN tốc độ cao"],
    viTags: ["so sánh can và can fd", "chuyển tốc độ bit", "pha dữ liệu", "64 byte dữ liệu", "khung can fd"],
    key: ["Payload up to 64 bytes (DLC 9-15 -> 12..64)", "BRS: faster data phase, same arbitration", "New bits: FDF, BRS, ESI; no remote frames", "CRC-17/21 + stuff bit count", "Needs FD transceivers + two bit timings"],
    answer: "CAN FD keeps the arbitration mechanism but changes three main things. First, <strong>payload</strong> up to 64 bytes instead of 8. DLC values 9 to 15 map to 12, 16, 20, 24, 32, 48 and 64 bytes, so Com and PDU lengths must use those sizes, with padding.<br>Second, <strong>bit rate switching</strong>: arbitration runs at the nominal rate, usually 500 kbit/s, so all nodes can still compete, and after the BRS bit the data phase switches to a higher rate, often 2 Mbit/s or more, switching back at the CRC delimiter. That needs two bit-timing configurations, and at high data rates transmitter delay compensation.<br>Third, <strong>robustness</strong>: a stronger CRC, CRC-17 for up to 16 bytes and CRC-21 above, plus a stuff-bit counter and fixed stuff bits in the CRC field, because the CRC in the original, non-ISO CAN FD had a weakness with stuff bits.<br>New control bits: <b>FDF</b> marks an FD frame, <b>BRS</b> selects rate switching, <b>ESI</b> shows if the transmitter is error-passive. Remote frames don't exist in FD. In practice, a classical CAN controller on the same bus will destroy FD frames with error frames, so all nodes must be FD-tolerant, and transceivers must be rated for the data rate.",
    followups: ["Why is arbitration still limited to about 1 Mbit/s?", "What is transmitter delay compensation?"]
  },

  {
    id: "protocols-09",
    topic: "protocols",
    type: "practical",
    q: "How is CAN bit timing configured, and how do you choose the sample point?",
    vi: "Cấu hình bit timing CAN thế nào, và chọn điểm lấy mẫu ra sao?",
    tags: ["CAN bit timing", "time quantum", "TQ", "sample point", "SJW", "prescaler", "TSEG1", "TSEG2", "resynchronization", "điểm lấy mẫu"],
    viTags: ["định thời bit", "lượng tử thời gian", "bộ chia tần", "đồng bộ lại", "cấu hình tốc độ can"],
    key: ["Bit = Sync(1) + Prop + Phase1 + Phase2 in TQ", "Sample point = end of Phase1", "Typical SP 75-87.5% (CiA: 87.5%)", "SJW limits resync correction", "All nodes: same rate, similar SP"],
    answer: "A CAN bit is divided into <strong>time quanta</strong>, taken from the CAN clock through a prescaler. The bit has the <b>Sync segment</b>, always 1 TQ, where an edge is expected, the <b>propagation segment</b> that covers bus and transceiver delays, <b>Phase segment 1</b>, and <b>Phase segment 2</b>. The <strong>sample point</strong> is at the end of Phase 1; in many controllers Prop and Phase 1 are combined into TSEG1. The <b>SJW</b>, synchronization jump width, is how much the controller may lengthen Phase 1 or shorten Phase 2 when it resynchronizes on an edge, to handle oscillator tolerance.<br>Example: 80 MHz CAN clock and 500 kbit/s means 160 clocks per bit. With prescaler 10, a bit is 16 TQ: Sync 1, TSEG1 13, TSEG2 2, which puts the sample point at 14 over 16, <b>87.5 percent</b>. CiA recommends around 87.5 percent for classical CAN; CAN FD data phases often use lower values like 70 to 80 percent.<br>A late sample point handles longer buses and slow edges better; an earlier one gives more room for resynchronization. All nodes must use the same bit rate and a consistent sample point, usually defined by the OEM. A mismatch shows up as error frames that appear only with certain nodes or cable lengths.",
    followups: ["What symptoms do you see in CANoe with a wrong sample point?", "Why are more time quanta per bit usually better?"]
  },

  {
    id: "protocols-10",
    topic: "protocols",
    type: "theory",
    q: "Explain the SENT protocol (SAE J2716): how is data encoded and what does a fast-channel frame look like?",
    vi: "Giải thích giao thức SENT (SAE J2716): dữ liệu được mã hóa thế nào và một frame kênh nhanh trông ra sao?",
    tags: ["SENT", "SAE J2716", "nibble", "tick", "calibration pulse", "sync pulse", "fast channel", "pause pulse", "cảm biến SENT", "giao thức SENT"],
    viTags: ["kênh nhanh", "xung hiệu chuẩn", "xung đồng bộ", "mã hóa dữ liệu", "xung pause", "nibble dữ liệu"],
    key: ["Unidirectional sensor -> ECU, one signal wire", "Data = time between falling edges, in ticks", "Tick 3-90 µs; sync/calibration = 56 ticks", "Nibble = 12-27 ticks -> value 0-15", "Frame: sync, status, up to 6 data, CRC4, [pause]"],
    answer: "SENT, Single Edge Nibble Transmission, is a <b>unidirectional, point-to-point</b> protocol from a sensor to an ECU, usually for pressure, position or flow sensors. Physically it's one signal line plus supply and ground, with no clock and no addressing. The information is encoded in <strong>time</strong>: the interval between two falling edges in a row, measured in <strong>ticks</strong>. The tick is chosen by the sensor, between 3 and 90 µs, 3 µs being common.<br>Every frame starts with a <b>synchronization/calibration pulse</b> of 56 ticks. Because the sensor's clock may be off by up to plus or minus 20 percent, the receiver measures this pulse, divides by 56 and uses that as the actual tick for the frame. Each <b>nibble</b> pulse has a short fixed low phase and a variable high phase; its total length is 12 to 27 ticks, so the value is the tick count minus 12, from 0 to 15.<br>A fast-channel frame is: calibration pulse, a <b>status and communication nibble</b>, usually six <b>data nibbles</b>, for example two 12-bit signals, a <b>CRC-4</b> nibble over the data nibbles, and an optional <b>pause pulse</b> that keeps the total frame length constant.<br>This was a core part of my work, the SENT stack automation and SENT defects on ST and Infineon targets.",
    followups: ["Why is SENT sensitive to jitter?", "How long is a frame with six data nibbles?", "Why is there no ACK?"]
  },

  {
    id: "protocols-11",
    topic: "protocols",
    type: "theory",
    q: "Go deeper on SENT: slow channel, CRC, clock tolerance checks and the pause pulse.",
    vi: "Đi sâu hơn về SENT: kênh chậm, CRC, kiểm tra dung sai clock và xung pause.",
    tags: ["SENT slow channel", "short serial message", "enhanced serial message", "CRC-4", "calibration tolerance", "1/64", "pause pulse", "SPC", "kênh chậm"],
    viTags: ["thông điệp nối tiếp", "kiểm tra crc", "dung sai xung clock", "dung sai hiệu chuẩn", "giao thức sent"],
    key: ["Status nibble bits 2/3 carry slow channel", "Short serial msg: 16 frames, 4-bit ID, 8-bit data", "Enhanced: 18 frames, CRC-6, 12/16-bit data", "Successive cal. pulses within 1/64 (~1.56%)", "Pause 12-768 ticks -> constant frame length"],
    answer: "The <strong>slow channel</strong> is built from two bits of the status nibble, spread over many frames, so it carries slowly changing data like sensor ID, diagnostics or temperature. The <b>short serial message</b> uses 16 frames: bit 3 marks the start, bit 2 carries 16 bits made of a 4-bit ID, 8-bit data and a 4-bit CRC. The <b>enhanced serial message</b> uses 18 frames, both bits, a sync pattern, and allows 12-bit data with 8-bit ID or 16-bit data with 4-bit ID, protected by a 6-bit CRC. The other two status bits are application specific, often error flags.<br>The <strong>CRC-4</strong> covers the data nibbles, with polynomial x⁴+x³+x²+1 and seed 0101. There's a legacy variant and the recommended variant from the 2010 revision that adds an extra zero nibble, and sensor and receiver must agree on which one, a classic compatibility issue.<br><b>Clock checks</b>: besides the plus or minus 20 percent nominal tolerance, the receiver compares each calibration pulse with the previous one, and rejects the frame if they differ by more than 1/64, about 1.56 percent. Some implementations also check that the frame length matches the calibration.<br>The <b>pause pulse</b>, 12 to 768 ticks, pads frames to a constant length. The related SPC variant adds ECU-triggered transmission.",
    followups: ["What does the receiver do with a frame that fails the calibration check?", "How do you configure a receiver for frames with vs without pause?"]
  },

  {
    id: "protocols-12",
    topic: "protocols",
    type: "practical",
    q: "How do you measure and decode SENT with an input capture unit, and what timing defects are typical? Tell me about one you debugged.",
    vi: "Làm sao đo và giải mã SENT bằng khối input capture, và những lỗi timing nào hay gặp? Kể về một lỗi bạn đã debug.",
    tags: ["SENT", "ICU", "input capture", "timestamp", "timing defect", "UDE", "jitter", "prescaler", "ST", "Infineon", "đo xung", "lỗi timing"],
    viTags: ["bắt xung đầu vào", "giải mã sent", "nhãn thời gian", "rung pha", "gỡ lỗi sent", "giải mã xung"],
    key: ["Capture falling-edge timestamps (ICU timestamp/DMA)", "tick = cal/56; nibble = round(dt/tick) - 12", "Timer resolution vs range (overflow)", "Defects: rounding, missed edges, wrong CRC variant", "Debug: UDE + scope, cross-check ST vs Infineon"],
    answer: "Decoding means timestamping every <b>falling edge</b>. With an ICU in timestamp mode, ideally filled by DMA or a dedicated SENT receiver module, I get a buffer of edge times. The calibration interval divided by 56 gives the tick; each nibble is the interval divided by the tick, <b>rounded</b>, minus 12, and must be between 0 and 15. Then I check the calibration against the previous one, verify the CRC and put the signals together.<br>Typical defects: timer <b>prescaler</b> trade-off, too coarse loses resolution, too fine overflows on long pulses like the pause or a 90 µs tick; <b>truncation instead of rounding</b>, giving nibbles off by one near boundaries; <b>missed edges</b> when capture relies on an ISR that's delayed by higher-priority interrupts; wrong <b>CRC variant</b> or wrong frame-with-pause configuration; and receiver tolerance windows set too tight for a real sensor's clock drift.<br>On ST and Infineon targets I debugged SENT timing and signal-behavior defects with UDE: I compared the measured pulse timing against J2716, ran the same software on both targets to separate hardware from software, and checked timer and clock configuration. [fill: which SENT parameter was out of spec, the root cause, and the fix] After that the case went into the automated test suite.",
    code: "/* ts[]: 16-bit falling-edge timestamps; unsigned diff handles one wrap */\nuint32_t cal      = (uint16_t)(ts[1] - ts[0]);\nif ((cal < CAL_MIN) || (cal > CAL_MAX)) { return SENT_E_SYNC; }  /* 56 ticks +/-20% */\nuint32_t tick_x64 = (cal * 64u) / 56u;          /* tick, scaled x64 */\nfor (i = 0u; i < 8u; i++) {                      /* status + 6 data + CRC */\n    uint32_t dt    = (uint16_t)(ts[i + 2u] - ts[i + 1u]);\n    uint32_t ticks = ((dt * 64u) + (tick_x64 / 2u)) / tick_x64;  /* round */\n    if ((ticks < 12u) || (ticks > 27u)) { return SENT_E_NIBBLE; }\n    nib[i] = (uint8)(ticks - 12u);\n}",
    lang: "c",
    followups: ["Why use timestamp mode rather than an ISR per edge?", "How did you isolate hardware vs software causes?", "How did you turn the fix into an automated test?"]
  },

  {
    id: "protocols-13",
    topic: "protocols",
    type: "theory",
    q: "Walk me through the main UDS services, the response format and the common NRCs.",
    vi: "Trình bày các dịch vụ UDS chính, định dạng phản hồi và các NRC thường gặp.",
    tags: ["UDS", "ISO 14229", "SID", "NRC", "negative response", "0x22", "0x2E", "0x19", "0x14", "0x31", "0x11", "chẩn đoán"],
    viTags: ["dịch vụ chẩn đoán", "phản hồi phủ định", "mã lỗi phản hồi", "đọc dữ liệu", "xóa lỗi", "chẩn đoán xe"],
    key: ["Positive = SID + 0x40; negative = 7F SID NRC", "10 session, 11 reset, 22/2E DID, 27 security", "19 read DTC, 14 clear DTC, 31 routine", "34/36/37 download; 3E tester present", "NRC 11,12,13,22,31,33,35,78,7F"],
    answer: "UDS is request/response between tester and ECU; in AUTOSAR the Dcm handles it, with Dem providing the DTCs. A <b>positive response</b> echoes the SID plus 0x40, a <b>negative response</b> is <code>7F</code>, the SID, and an NRC.<br>The main services: <b>0x10</b> DiagnosticSessionControl; <b>0x11</b> ECUReset, hard, key-off-on or soft; <b>0x22</b> ReadDataByIdentifier and <b>0x2E</b> WriteDataByIdentifier for DIDs, like 22 F1 90 for the VIN; <b>0x27</b> SecurityAccess; <b>0x19</b> ReadDTCInformation, for example sub-function 02 to report DTCs by status mask; <b>0x14</b> ClearDiagnosticInformation, FFFFFF for all groups; <b>0x31</b> RoutineControl with start, stop and request results; <b>0x34</b>, <b>0x36</b>, <b>0x37</b> RequestDownload, TransferData and RequestTransferExit for flashing; <b>0x3E</b> TesterPresent. Setting bit 7 of the sub-function suppresses the positive response.<br>Common NRCs: <b>0x11</b> service not supported, <b>0x12</b> sub-function not supported, <b>0x13</b> incorrect length, <b>0x22</b> conditions not correct, <b>0x24</b> request sequence error, <b>0x31</b> request out of range, <b>0x33</b> security access denied, <b>0x35</b> invalid key, <b>0x78</b> response pending, and <b>0x7F</b> service not supported in active session.",
    followups: ["What is the DTC status byte?", "What does 0x7E mean compared to 0x7F?"]
  },

  {
    id: "protocols-14",
    topic: "protocols",
    type: "theory",
    q: "Explain UDS sessions, security access and the P2/P2* timing with response pending.",
    vi: "Giải thích session UDS, security access và thời gian P2/P2* khi có response pending.",
    tags: ["UDS session", "0x10", "security access", "0x27", "seed key", "P2", "P2*", "0x78", "S3", "TesterPresent", "phiên chẩn đoán"],
    viTags: ["truy cập bảo mật", "mã khóa seed key", "thời gian chờ phản hồi", "phản hồi đang xử lý", "duy trì phiên"],
    key: ["Sessions: 01 default, 02 programming, 03 extended", "S3 ~5 s: no TesterPresent -> back to default", "27 odd = seed, even = key; NRC 35/36/37", "P2 default 50 ms, P2* 5000 ms", "0x78 extends wait to P2*"],
    answer: "An ECU is always in a <b>session</b>: 01 default after reset, 02 programming for flashing, 03 extended for more services like writing DIDs or routines. The 0x10 positive response returns the P2 and P2* values the ECU uses. In a non-default session the tester sends <b>TesterPresent 0x3E</b> regularly; if nothing arrives for S3, about 5 seconds, the ECU falls back to default, which also locks security again.<br><b>Security access 0x27</b> is a seed-and-key challenge: an odd sub-function requests a seed for that level, the ECU returns a random seed, the tester calculates the key with a secret algorithm and sends it with the next even sub-function. Wrong key gives NRC 0x35, too many attempts 0x36, and during the lockout delay 0x37; sending a key without requesting a seed gives 0x24. If the level is already unlocked, the seed is all zeros.<br><b>Timing</b>: P2 is the maximum time for the ECU to start responding, 50 ms by default. If a request takes longer, for example erasing flash, the ECU sends NRC <b>0x78 responsePending</b>, which extends the tester's timeout to <b>P2*</b>, 5000 ms by default, and it can repeat 0x78 until done. Forgetting 0x78 for a slow routine is a typical cause of tester timeouts.",
    followups: ["Why does the security level reset on session change?", "Who is responsible for sending 0x78 in AUTOSAR, the Dcm or the application?"]
  },

  {
    id: "protocols-15",
    topic: "protocols",
    type: "practical",
    q: "Describe a typical UDS reprogramming (flashing) sequence using 0x34, 0x36 and 0x37.",
    vi: "Mô tả một quy trình nạp lại phần mềm (flashing) UDS điển hình dùng 0x34, 0x36 và 0x37.",
    tags: ["UDS flashing", "reprogramming", "0x34", "0x36", "0x37", "RequestDownload", "TransferData", "bootloader", "block sequence counter", "nạp phần mềm"],
    viTags: ["nạp firmware", "lập trình lại ecu", "bộ nạp khởi động", "truyền dữ liệu", "yêu cầu tải xuống"],
    key: ["Extended session, preconditions, 85 off, 28 comm off", "10 02 programming -> 27 unlock", "31 erase -> 34 download (max block length)", "36 blocks with sequence counter -> 37 exit", "31 check dependencies -> 11 reset"],
    answer: "The exact sequence is OEM-specific, but the typical flow is: switch to <b>extended session</b> 10 03, run a routine that checks preconditions like vehicle speed zero, disable DTC setting with <b>85 02</b>, and stop normal communication with <b>28</b> CommunicationControl. Then <b>10 02</b> programming session, which usually jumps into the bootloader, and <b>27</b> to unlock the programming security level. Often a fingerprint DID is written with 2E.<br>Then <b>31 01 FF 00</b> erase memory, the ISO-defined routine ID, using response pending while the erase runs. <b>34 RequestDownload</b> gives the data format, the address and the size; the positive response 74 returns the <b>maximum block length</b>. Then <b>36 TransferData</b> repeats with a <b>block sequence counter</b> starting at 01 and wrapping from FF to 00; a wrong counter gives NRC 0x73, and repeating the last block is allowed for retries. <b>37 RequestTransferExit</b> closes the download.<br>Then <b>31 01 FF 01</b> check programming dependencies, or an OEM checksum routine, and finally <b>11 01</b> hard reset so the ECU starts the new application. [fill: whether you ran or tested a flash sequence yourself, and with which tool, e.g. CANoe]",
    followups: ["What happens if power is lost in the middle of flashing?", "Why disable DTC setting and normal communication before flashing?"]
  },

  {
    id: "protocols-16",
    topic: "protocols",
    type: "practical",
    q: "After integration, the ECU doesn't send or receive CAN messages. How do you debug it?",
    vi: "Sau khi tích hợp, ECU không gửi và không nhận được bản tin CAN. Bạn debug thế nào?",
    tags: ["CAN debugging", "CANoe", "no communication", "termination", "transceiver", "error frames", "CanIf", "Com", "PduR", "BswM", "gỡ lỗi CAN"],
    viTags: ["mất giao tiếp can", "điện trở đầu cuối", "bộ thu phát", "khung lỗi", "tích hợp ecu"],
    key: ["Physical: 60 Ω termination, supply, transceiver enable", "CANoe: error frames? ACK errors? bit timing", "Controller started? CanSM/ComM state", "Com I-PDU group started via BswM", "Trace Com -> PduR -> CanIf -> Can, check HOH/filters"],
    answer: "I go from the bottom up. <b>Physical layer</b>: measure about 60 ohms between CAN_H and CAN_L with power off for two terminations, check the transceiver supply and that its standby or enable pin is really driven to normal mode, which is often controlled by the Dio config or an SBC over SPI.<br><b>Bus level in CANoe</b>: if CANoe shows error frames or the ECU goes bus-off, I suspect bit timing, baud rate or sample point mismatch. If the ECU is alone and nobody acknowledges, it will keep retransmitting with ACK errors, so CANoe must be active on the bus to acknowledge.<br><b>Controller and state machines</b>: is the CAN controller really in STARTED mode? That depends on EcuM and BswM requesting communication through ComM and CanSM. A very common cause is that the <b>Com I-PDU groups</b> were never started by the BswM rules, so Com simply doesn't transmit.<br><b>Routing and config</b>: follow a PDU from Com through PduR to CanIf and Can with TRACE32 breakpoints on the transmit functions and confirmations, check the PDU IDs, DLC, and for reception the hardware filters and HRH configuration. [fill: a concrete CAN or Com integration issue you found on RH850 and its root cause]",
    followups: ["How do you tell a bit timing problem from a wiring problem?", "What does BswM have to do with Com transmitting?"]
  },

  {
    id: "protocols-17",
    topic: "protocols",
    type: "theory",
    q: "Compare UART, SPI, I2C, CAN and SENT. How would you choose between them?",
    vi: "So sánh UART, SPI, I2C, CAN và SENT. Bạn sẽ chọn giữa chúng như thế nào?",
    tags: ["protocol comparison", "UART", "SPI", "I2C", "CAN", "SENT", "1-Wire", "on-board", "off-board", "so sánh giao thức"],
    viTags: ["giao thức", "chọn giao thức", "giao tiếp trên bo mạch", "giao tiếp ngoài bo mạch", "chuẩn truyền thông"],
    key: ["On-board, fast, simple: SPI", "On-board, few pins, many slow devices: I2C", "Point-to-point debug/modules: UART", "Robust multi-node vehicle network: CAN/CAN FD", "Cheap digital sensor -> ECU: SENT"],
    answer: "I think about where the link runs, how many nodes, speed, and robustness.<br><b>SPI</b> is for on-board links to fast peripherals like flash, ADCs, SBCs: tens of MHz, full-duplex, simple, but one chip select per slave and no acknowledge. <b>I2C</b> is on-board too, two wires for many slow devices like EEPROMs or small sensors, with addressing and per-byte ACK, but slower, half-duplex, and sensitive to bus capacitance. <b>UART</b> is point-to-point and asynchronous: debug consoles, modems, simple module links; easy, but no addressing and it depends on accurate clocks. <b>1-Wire</b> gives up speed to get a single wire and unique IDs.<br>Off-board in the vehicle, <b>CAN</b> is the standard: differential and noise-robust, multi-master with priority arbitration, strong error detection and fault confinement, up to 1 Mbit/s, and <b>CAN FD</b> when you need more payload and bandwidth. <b>SENT</b> is for a sensor sending to one ECU: cheaper than CAN, more resolution and robustness than an analog signal, but unidirectional and timing-sensitive. And <b>UDS</b> isn't a bus at all, it's the diagnostic application layer running on top of CAN via ISO-TP, or DoIP.",
    followups: ["Why not use CAN for every sensor?", "Why is SENT preferred over an analog output for a pressure sensor?"]
  }
);
