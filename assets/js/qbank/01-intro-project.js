/* Question bank — intro, project. Loaded by lessons/luxoft/LX12-question-bank.html */
(window.QBANK = window.QBANK || []).push(

  /* ============================== INTRO ============================== */

  {
    id: "intro-01",
    topic: "intro",
    type: "behavioral",
    q: "Tell me about yourself.",
    vi: "Hãy giới thiệu về bản thân bạn.",
    tags: ["pitch", "self-introduction", "tell me about yourself", "90 seconds", "giới thiệu bản thân", "CUBAS", "SENT", "integration"],
    viTags: ["tự giới thiệu", "giới thiệu ngắn gọn", "kinh nghiệm làm việc", "tóm tắt bản thân", "mở đầu phỏng vấn", "pitch bản thân"],
    key: [
      "Hook: ~4 years Bosch, integration + automation",
      "Classic: MCAL validation, CUBAS BSW integrator, RH850, TRACE32, ASPICE",
      "Parallel: ARA system test (+ Azure Pipelines + Conan) and lead of a small SENT automation team",
      "SENT: 1–2 months → 2–3 days (own framework)",
      "Now: platform ops — Docker, K8s, Terraform, access, cost",
      "Close: understand the stack + keep the pipeline green"
    ],
    answer: "I'm an embedded software engineer with nearly four years at Bosch Global Software Technologies, and most of my work is in the same area as this role: <strong>integration and automation</strong>. I started in AUTOSAR Classic, designing MCAL unit and component validation on target hardware and VECU. Then I worked as a <strong>BSW integrator in the CUBAS team on RH850 D3, D4 and D5</strong>. There I integrated and validated BswM, Diag, CAN, COM, EcuM, OS, MCAL and the memory stack, debugged integration failures with Lauterbach TRACE32, and was responsible for requirement traceability and test evidence under ASPICE.<br>Then I worked on two projects in parallel. On the AUTOSAR Adaptive project I was a system test engineer, and I integrated build, package and test into Azure Pipelines with Conan. On a separate project, I led a small automation team for <strong>SENT validation, which cut the full cycle from about one to two months down to two to three days</strong>.<br>For the last year and a half I've been running an internal engineering platform: Docker, Kubernetes, Terraform, access control and cost governance.<br>So I bring an understanding of the AUTOSAR stack being integrated, and I know how to build the pipeline that keeps it green, fast and audit-ready.",
    followups: ["What exactly is CUBAS and what did you integrate?", "What made up those 2–3 days?", "Why are you leaving the AI platform role?"]
  },

  {
    id: "intro-02",
    topic: "intro",
    type: "behavioral",
    q: "You moved from AUTOSAR Classic to Adaptive to an AI platform in under four years. Isn't that a lot of jumping around?",
    vi: "Chưa đến bốn năm mà bạn đã chuyển từ AUTOSAR Classic sang Adaptive rồi sang nền tảng AI. Như vậy có phải là nhảy việc quá nhiều không?",
    tags: ["career path", "job hopping", "Classic to Adaptive", "career logic", "chuyển hướng", "nhảy việc", "Bosch"],
    viTags: ["thay đổi công việc", "định hướng nghề nghiệp", "lộ trình sự nghiệp", "chuyển từ classic sang adaptive", "hay đổi việc", "lý do chuyển mảng"],
    key: [
      "All inside Bosch — internal moves, not job hopping",
      "Thread: turn repetitive engineering work into automation",
      "Classic: hands-on target work, felt the manual pain",
      "Parallel: ARA system test + Azure Pipelines/Conan; lead of a small SENT automation team",
      "Platform: infra/ops skills — the CI half of this JD"
    ],
    answer: "It was all inside Bosch, and each move built on the one before. What connects them is <strong>turning repetitive engineering work into reusable automation</strong>. In AUTOSAR Classic I did the hands-on part: MCAL validation, BSW integration on RH850, debugging on the target with TRACE32 and UDE. That's where I saw how much time went into manual setup, execution and evidence collection. Then I got the chance to do something about it, on two projects in parallel: on the AUTOSAR Adaptive project I brought build, package and test into Azure Pipelines with Conan, and on a separate project I led a small team that automated SENT validation. The platform role then gave me the infrastructure side: containers, Kubernetes, Terraform, access control and cost governance. So I didn't change profession. I went from doing the integration work, to automating it, to running the infrastructure it runs on. This role combines exactly those layers, which is why I'm applying.",
    followups: ["Which of the three roles did you enjoy most, and why?", "What did you learn in the platform role that applies to CI?"]
  },

  {
    id: "intro-03",
    topic: "intro",
    type: "behavioral",
    q: "Why Luxoft?",
    vi: "Tại sao bạn chọn Luxoft?",
    tags: ["why Luxoft", "motivation", "company", "OEM", "Tier-1", "vì sao chọn Luxoft", "động lực"],
    viTags: ["tại sao chọn công ty", "lý do ứng tuyển", "động lực ứng tuyển", "luxoft", "hiểu biết về công ty"],
    key: [
      "Role combines both halves: AUTOSAR integration + CI",
      "Integrator for many OEMs/Tier-1s → broad toolchains",
      "Grow toward owning the integration quality system",
      "Add one concrete fact about Luxoft you researched"
    ],
    answer: "Three reasons. First, the role itself: it combines <strong>AUTOSAR Classic integration with CI operations</strong>, and those are the two halves of my experience. Most roles I see want one or the other. Second, Luxoft works as a software integration partner for many OEMs and Tier-1 suppliers, so I would work with different toolchains and processes, for example EB tresos and Jenkins or GitLab, beyond the Bosch-internal tools I know. That range of experience is valuable for an integration engineer. Third, growth: I want to move toward owning the whole integration and quality flow of a project, not only one component, and this position has that scope. [fill: one concrete thing you learned about Luxoft's automotive business or this project that attracted you]. That's why I applied here rather than to a pure development role.",
    followups: ["What do you know about our automotive projects?", "Where do you see yourself in three years?"]
  },

  {
    id: "intro-04",
    topic: "intro",
    type: "behavioral",
    q: "Why this role? What in the job description matches you?",
    vi: "Tại sao bạn chọn vị trí này? Điểm nào trong mô tả công việc phù hợp với bạn?",
    tags: ["why this role", "JD match", "fit", "integration engineer", "CI", "phù hợp JD", "vị trí"],
    viTags: ["tại sao chọn vị trí này", "mô tả công việc", "phù hợp với vị trí", "yêu cầu công việc", "kỹ sư tích hợp", "đáp ứng jd"],
    key: [
      "SWC/ARXML integration ↔ CUBAS BSW integrator on RH850",
      "ASPICE, traceability ↔ owned req-to-test mapping, evidence",
      "Debugging ↔ TRACE32, UDE, SENT timing defects",
      "CI, Python/Pytest, Docker ↔ Azure Pipelines + Conan (ARA), SENT automation (separate)",
      "Gap: EB tools, Jenkins/GitLab — same concepts"
    ],
    answer: "When I read the JD I compared it with my experience line by line. <strong>Integrating software components and configuration in AUTOSAR projects</strong>: that's what I did as a CUBAS BSW integrator on RH850. <strong>A disciplined integration process per ASPICE</strong>: I owned requirement-to-test mapping, test evidence and review readiness. <strong>Troubleshooting and debugging</strong> with Lauterbach: I used TRACE32 for register, memory, breakpoint and trace analysis, and UDE for SENT timing defects on ST and Infineon. On the CI side, Python, Pytest, YAML, Bash and Docker are my daily tools. I led the SENT automation team, and separately, on the Adaptive project, I built the Azure Pipelines plus Conan integration. To be honest, my gap is the specific tools: I haven't used EB tresos or Jenkins in a project, but I've done the same work with RTA-CAR and Azure Pipelines. So it's a tool change, not a concept change.",
    followups: ["Which JD item do you feel weakest on?", "How would you ramp up on EB tresos?"]
  },

  {
    id: "intro-05",
    topic: "intro",
    type: "behavioral",
    q: "You're currently an AI Platform Engineer. Why go back to embedded integration?",
    vi: "Hiện tại bạn đang là AI Platform Engineer. Tại sao lại muốn quay về làm tích hợp embedded?",
    tags: ["AI platform", "career change", "why back to embedded", "platform engineering", "quay lại embedded", "AI", "DevOps"],
    viTags: ["chuyển nghề", "quay về nhúng", "nền tảng ai", "lý do đổi hướng", "kỹ sư nền tảng", "trở lại tích hợp phần mềm"],
    key: [
      "Not a step back — bringing platform skills home",
      "Platform work = infra/ops: containers, IaC, access, cost",
      "That is the CI operations half of this JD",
      "Automotive integration is my root domain (2022–2025)",
      "Don't criticise AI work; don't oversell it"
    ],
    answer: "I see it less as going back and more as <strong>bringing the platform skills back to my home domain</strong>. A large part of my current role is infrastructure and operations: running containerised services with Docker and Kubernetes, describing infrastructure with Terraform, managing authentication and access control, and watching usage and cost. A CI system needs the same discipline: reproducible environments, controlled access, and knowing what your resources cost. At the same time, my foundation is automotive: about two and a half years in AUTOSAR Classic and Adaptive, BSW integration on RH850, and debugging on real targets. This role needs both: someone who understands what's being integrated and can run the pipeline around it. I enjoyed the platform work, but I miss working close to ECUs and hardware. I think I'll have more impact where both halves of my experience are used.",
    followups: ["Would you use AI tools in an integration team?", "What exactly did you operate on the platform?"]
  },

  {
    id: "intro-06",
    topic: "intro",
    type: "behavioral",
    q: "Why are you leaving Bosch?",
    vi: "Tại sao bạn muốn rời Bosch?",
    tags: ["why leave", "leaving Bosch", "motivation", "change", "vì sao nghỉ", "rời Bosch"],
    viTags: ["lý do nghỉ việc", "rời công ty cũ", "nghỉ việc ở bosch", "tìm môi trường mới", "lý do thay đổi"],
    key: [
      "Grateful: strong AUTOSAR base + chance to lead automation",
      "Want a role combining integration + CI at project level",
      "Broader exposure: multiple customers, toolchains",
      "Never criticise the previous employer"
    ],
    answer: "I'm grateful to Bosch. It gave me a solid foundation in AUTOSAR, real hands-on work on RH850, ST and Infineon targets, and the chance to lead an automation initiative quite early in my career. I've also been recognised there every year. The reason I'm looking now is fit. My current role has moved away from automotive integration, and internally I didn't see a position that combines AUTOSAR integration with CI ownership the way this one does. I also want to work with different customers and toolchains, which is natural at a company like Luxoft. So I'm moving toward this role, not away from Bosch.",
    followups: ["What would make you stay at Bosch?", "What is your notice period?"]
  },

  {
    id: "intro-07",
    topic: "intro",
    type: "behavioral",
    q: "What are your main strengths?",
    vi: "Điểm mạnh chính của bạn là gì?",
    tags: ["strengths", "điểm mạnh", "root cause", "automation", "coordination", "self-assessment"],
    viTags: ["thế mạnh", "ưu điểm", "tìm nguyên nhân gốc", "tự động hóa", "phối hợp nhóm", "tự đánh giá"],
    key: [
      "Root cause across HW/SW/protocol boundaries (TRACE32, UDE, SENT)",
      "Turn manual workflows into automation (1–2 months → 2–3 days)",
      "Coordination: integration point between stakeholders and BSW teams",
      "Each strength = one real example"
    ],
    answer: "I'd name three, each with an example. First, <strong>root-cause analysis across boundaries</strong>. As an integrator the bug is rarely in one place, so I'm used to going down to registers and memory with TRACE32, or to protocol-level timing with UDE, like the SENT timing and signal defects I fixed on ST and Infineon targets. Second, <strong>turning repetitive work into automation</strong>. The clearest case is the SENT validation cycle, which went from about one to two months to two to three days after I led the automation effort. Third, <strong>coordination</strong>. In CUBAS I was the integration point between project stakeholders and several BSW component teams, so I'm comfortable helping people reach a decision based on logs and evidence, not opinions. For an integration role, I think those three are the core.",
    followups: ["Give me a concrete example of the first one.", "How do your colleagues describe you?"]
  },

  {
    id: "intro-08",
    topic: "intro",
    type: "behavioral",
    bridge: true,
    q: "What is your biggest weakness compared to this job description?",
    vi: "So với mô tả công việc này, điểm yếu lớn nhất của bạn là gì?",
    tags: ["weakness", "gap", "điểm yếu", "EB tresos", "Jenkins", "GitLab", "honest", "bridge"],
    viTags: ["nhược điểm", "thiếu sót so với jd", "kỹ năng còn thiếu", "khoảng trống kỹ năng", "chưa dùng eb tresos", "cách khắc phục điểm yếu"],
    key: [
      "Real gap, not core: EB tresos / AUTOSAR Builder, Jenkins/GitLab",
      "Equivalent done: RTA-CAR config, Azure Pipelines YAML",
      "Same concepts: ARXML import, validate, generate; stages, agents, artifacts",
      "Action: [fill: what you're doing now to close it]"
    ],
    answer: "To be honest, it's the specific toolchain. I haven't used <strong>EB tresos or AUTOSAR Builder</strong> in a project, and I haven't run <strong>Jenkins or GitLab CI</strong>. On the AUTOSAR side I've worked with RTA-CAR and done BSW integration on RH850, so the concepts are the same: import ARXML, configure modules, validate consistency, generate code, build. On the CI side I've written Azure Pipelines in YAML with stages, agents, artifacts and Conan packages, which maps directly to a Jenkinsfile or a <code>.gitlab-ci.yml</code>. To close the gap I'm [fill: what you are actually doing, e.g. working through EB tresos documentation, setting up a GitLab CI pipeline on a personal project]. I'd expect to be productive with those tools within the first weeks, because the hard part, understanding the stack and the pipeline logic, is already there.",
    followups: ["What is the difference between a Jenkins stage and an Azure Pipelines stage?", "What do you know about EB tresos so far?"]
  },

  {
    id: "intro-09",
    topic: "intro",
    type: "behavioral",
    q: "Tell me about your leadership experience.",
    vi: "Hãy kể về kinh nghiệm lãnh đạo của bạn.",
    tags: ["leadership", "lead", "team lead", "SENT automation", "Agile", "dẫn dắt", "quản lý nhóm", "integration point"],
    viTags: ["kinh nghiệm lãnh đạo", "trưởng nhóm", "lead team", "quản lý dự án", "dẫn dắt đội tự động hóa", "vai trò lead"],
    key: [
      "SENT automation lead: plan, break down, track, deliver",
      "Agile: backlog, sprints, unblock teammates",
      "Team: [fill: size, roles, formal vs technical lead]",
      "CUBAS: integration point, stakeholders ↔ BSW teams",
      "Platform: training users, driving adoption"
    ],
    answer: "My main leadership experience is leading a small <strong>SENT stack automation team</strong>, in parallel with my system test work on the AUTOSAR Adaptive project. I owned it end to end: planning, breaking the work into deliverable pieces, designing the workflow, tracking progress in an Agile setup, and delivering. The team was [fill: team size and roles], and my role was [fill: technical lead vs. formal line manager]. Day to day that meant keeping the backlog realistic, unblocking people on technical issues, and making sure the pieces fitted together. The result was the cycle going from about one to two months to two to three days. The second kind of leadership is without formal authority: in CUBAS I was the <strong>integration point between project stakeholders and several BSW component teams</strong>, aligning interfaces and pushing issues until they were solved. And in my current role I help teams adopt internal tools through hands-on training. I'm aiming to grow further into integration lead responsibilities.",
    followups: ["How did you handle a team member who was falling behind?", "How did you report progress to stakeholders?"]
  },

  {
    id: "intro-10",
    topic: "intro",
    type: "behavioral",
    q: "Tell me about a conflict with another team and how you resolved it.",
    vi: "Hãy kể về một lần xung đột với team khác và cách bạn giải quyết.",
    tags: ["conflict", "disagreement", "stakeholder", "cross-team", "xung đột", "bất đồng", "BSW teams", "STAR"],
    viTags: ["giải quyết xung đột", "mâu thuẫn giữa các team", "bất đồng quan điểm", "làm việc liên nhóm", "xử lý tranh chấp", "phối hợp với team bsw"],
    key: [
      "S: integration issue, two BSW teams disagree on the owner",
      "Move from opinions to evidence: trace, logs, spec",
      "Show where behaviour deviates from the interface spec",
      "Propose options + trade-offs, agree owner and date",
      "Result + lesson: data ends debates"
    ],
    answer: "In CUBAS I sat between several BSW component teams, and conflicts were usually about <strong>whose module caused an integration failure</strong>. One case: [fill: real situation, e.g. module A vs module B, the symptom]. Each team was sure their side followed the spec. What I did was move the discussion from opinions to evidence. I reproduced the failure reliably on the target and captured evidence with TRACE32: register and memory state, call sequence. Then I compared it with the interface specification and the requirements we traced under ASPICE. That showed exactly where the behaviour deviated. Next I brought both teams together with the data, proposed options with their trade-offs, and we agreed who fixes what and by when. I followed it until the baseline was green again. The result was [fill: outcome]. My lesson: as an integrator, you win arguments with reproducible evidence, not authority.",
    followups: ["What if the other team still disagreed?", "How do you avoid the same conflict next time?"]
  },

  {
    id: "intro-11",
    topic: "intro",
    type: "behavioral",
    q: "How do you handle pressure and tight deadlines? Give an example.",
    vi: "Bạn xử lý áp lực và deadline gấp như thế nào? Cho một ví dụ.",
    tags: ["pressure", "deadline", "stress management", "prioritization", "áp lực", "hạn chót", "delivery"],
    viTags: ["làm việc dưới áp lực", "deadline gấp", "quản lý căng thẳng", "ưu tiên công việc", "chạy deadline", "sắp xếp thứ tự ưu tiên"],
    key: [
      "S: [fill: real deadline situation]",
      "Triage: what blocks delivery vs what can wait",
      "Communicate early: risk, options, trade-offs",
      "Protect the baseline, don't hide problems",
      "Afterwards: automate the step that caused the crunch"
    ],
    answer: "My approach is to make the pressure concrete. When a deadline is tight, I first list what really blocks delivery and what can wait. Then I tell the stakeholders about the risk early, with options, instead of silently hoping it works out. One example: [fill: real situation, e.g. an integration baseline due while a blocking defect appeared late]. I [fill: what you did, e.g. isolated the defect, agreed a workaround or scope cut with the project lead, parallelised the remaining validation]. We delivered [fill: outcome]. What I took from it is that most deadline crises come from late feedback. That's one reason I push for automation: the SENT automation, for example, turned a one-to-two-month cycle into two to three days, so the team is no longer under heavy time pressure at the end.",
    followups: ["What do you do when you realise you'll miss a deadline?", "How do you say no to a stakeholder?"]
  },

  {
    id: "intro-12",
    topic: "intro",
    type: "behavioral",
    q: "Tell me about a mistake or failure and what you learned.",
    vi: "Hãy kể về một sai lầm hoặc thất bại và bạn đã học được gì.",
    tags: ["failure", "mistake", "lesson learned", "thất bại", "sai lầm", "bài học", "STAR"],
    viTags: ["mắc lỗi", "thất bại trong công việc", "bài học kinh nghiệm", "rút kinh nghiệm", "sai lầm lớn nhất", "học từ thất bại"],
    key: [
      "Pick a real technical mistake, own it, no blame",
      "S/T: [fill: real mistake and context]",
      "A: how you noticed, fixed, and communicated",
      "R: concrete change you made afterwards",
      "Lesson ties to reliability / evidence"
    ],
    answer: "One I remember is from [fill: context, e.g. the early phase of the SENT automation]. I [fill: the real mistake, e.g. focused on execution speed before the environment was stable, so runs failed for reasons unrelated to the software under test]. The effect was [fill: impact, e.g. teammates started to distrust the results]. Once I realised it, I stopped adding features, admitted it openly to the team, and [fill: fix, e.g. pinned dependencies, improved logging, separated hardware-dependent tests]. After that [fill: result]. The lesson I still apply is that <strong>for automation and CI, reliability comes before speed</strong>: if people don't trust a red result, the pipeline has no value. Now, whenever I introduce something new, I check it against known results before asking others to depend on it.",
    followups: ["How did your team react?", "What would you do differently from day one?"]
  },

  {
    id: "intro-13",
    topic: "intro",
    type: "practical",
    q: "How do you learn a new tool or domain quickly? Give an example.",
    vi: "Bạn học một công cụ hoặc lĩnh vực mới nhanh bằng cách nào? Cho một ví dụ.",
    tags: ["learning", "ramp up", "new tool", "fast learner", "học nhanh", "công cụ mới", "Adaptive", "Terraform"],
    viTags: ["khả năng học hỏi", "học công cụ mới", "làm quen nhanh", "tiếp cận lĩnh vực mới", "tự học", "thích nghi nhanh"],
    key: [
      "Bridge from what I know (concept mapping)",
      "Learn by delivering something real, early",
      "Classic → Adaptive: signal-oriented → service-oriented",
      "Platform: Terraform, Kubernetes learned by building",
      "Applied here: EB tresos ↔ RTA-CAR, Jenkins ↔ Azure"
    ],
    answer: "Two habits. First, I <strong>bridge from what I already know</strong>: I map the new tool's concepts to ones I've used, so I only need to learn the differences. Second, I <strong>learn by delivering something real</strong> as early as possible instead of reading for weeks. When I moved from AUTOSAR Classic to Adaptive, I mapped signal-oriented COM to service-oriented communication, and static configuration to execution and state management on Linux and QNX, and I was doing system-level validation on Raspberry Pi 4 and R-Car. In the platform role I learned Terraform and Kubernetes by deploying and operating real services, not tutorials. For this job I'd do the same: EB tresos maps to what I did with RTA-CAR, and Jenkins or GitLab CI maps to Azure Pipelines. I'd pick a small real task in the first weeks and learn the tool through it.",
    followups: ["What was the hardest concept in Adaptive for you?", "How long did it take you to be productive?"]
  },

  {
    id: "intro-14",
    topic: "intro",
    type: "behavioral",
    q: "Tell me about your awards and internal tools.",
    vi: "Hãy kể về các giải thưởng và công cụ nội bộ bạn đã làm.",
    tags: ["awards", "recognition", "Best Performance", "Pullogic", "Lazy Doc", "Collect Review Finding", "giải thưởng", "innovation"],
    viTags: ["giải thưởng nội bộ", "thành tích", "công cụ nội bộ", "sáng kiến", "được ghi nhận", "tool tự phát triển"],
    key: [
      "Best/Outstanding Performance every year, department level",
      "One company-level recognition [fill: what for]",
      "Pullogic: PR review tool integrated with Jira",
      "Lazy Doc: video → text for documentation",
      "Collect Review Finding: review findings aggregated for quality visibility"
    ],
    answer: "I received <strong>Best or Outstanding Performance recognition at department level every year</strong> at Bosch, including one company-level recognition [fill: what the company-level award was for]. Besides that, I won several internal innovation and automation awards for tools I built. <strong>Pullogic</strong> is a pull-request review tool integrated with Jira, so review work and ticket context stay connected. <strong>Lazy Doc</strong> converts videos into text, which speeds up documentation, for example turning a recorded walkthrough into a draft. <strong>Collect Review Finding</strong> collects review findings across the system, so the organisation can see where most quality issues appear and improve the review process. What they have in common is the same motivation as the SENT automation: finding repetitive engineering work and removing it. I think that's also relevant to an integration team, where review and quality gates are part of the daily flow.",
    followups: ["Who used Pullogic, and how did you get adoption?", "What would you automate first in our team?"]
  },

  {
    id: "intro-15",
    topic: "intro",
    type: "practical",
    q: "What would you expect to achieve in your first three to six months?",
    vi: "Bạn kỳ vọng đạt được gì trong ba đến sáu tháng đầu tiên?",
    tags: ["first 90 days", "onboarding", "expectations", "3-6 months", "kỳ vọng", "6 tháng đầu", "plan"],
    viTags: ["kế hoạch 90 ngày", "3 tháng đầu", "hội nhập công việc", "mục tiêu ban đầu", "kỳ vọng khi mới vào", "làm quen môi trường mới"],
    key: [
      "Month 1: learn project, stack, pipeline, baseline flow",
      "Measure before changing: stage times, failure causes",
      "Months 2–3: own integration tasks end to end",
      "Quick wins: caching, parallelism, clearer failure reports",
      "Month 6: own part of pipeline, measurable improvement"
    ],
    answer: "In the first month I'd focus on learning: the project, the AUTOSAR stack and tools used, how a change travels from commit to integration baseline to release, and who owns what. I'd take real integration tasks early, because that's the fastest way to learn. I'd also <strong>measure before changing anything</strong>: how long each pipeline stage takes, where it waits, and why builds fail, whether code, infrastructure, flaky tests or bench issues. In months two and three I'd want to own integration tasks end to end and deliver a few low-risk improvements, such as caching, parallelising independent steps, or clearer failure reports. By six months I'd like to own a part of the integration or CI flow and show a measurable improvement, for example shorter feedback time or fewer false failures. That's the same measure-first approach I used for the SENT automation.",
    followups: ["What would you do if the CI is slow and often red?", "How would you build trust with the existing team?"]
  },

  {
    id: "intro-16",
    topic: "intro",
    type: "practical",
    q: "Do you have any questions for us?",
    vi: "Bạn có câu hỏi nào dành cho chúng tôi không?",
    tags: ["reverse questions", "questions for interviewer", "câu hỏi ngược", "hỏi lại", "end of interview"],
    viTags: ["hỏi nhà tuyển dụng", "câu hỏi cuối buổi", "hỏi ngược người phỏng vấn", "kết thúc phỏng vấn", "hỏi về công ty"],
    key: [
      "Pipeline: commit → release, biggest bottleneck?",
      "Benches: in the gating pipeline or nightly?",
      "Team: size, sites, what I'd own in 3 months",
      "AUTOSAR: which stack/tools, who owns BSW config?",
      "ASPICE level, assessment coming?",
      "What does success in 6 months look like?"
    ],
    answer: "Yes, a few. <strong>On the pipeline</strong>: what does the current flow look like from a developer's commit to a release baseline, and where is the biggest bottleneck today: build time, test bench availability, or flaky tests? <strong>On hardware in the loop</strong>: how many test benches does the project have, and are they part of the pre-merge checks or run nightly? <strong>On the team</strong>: how big is the integration team, how is it split across sites, and what would this role own in the first three months? <strong>On AUTOSAR</strong>: which stack and configuration tools do you use, and does the integration team own the BSW configuration or the component teams? <strong>On process</strong>: which ASPICE level is the project targeting, and is an assessment planned? And finally: what would success in this role look like after six months?",
    followups: ["(Pick 3–4 based on what the interviewer already covered)"]
  },

  {
    id: "intro-17",
    topic: "intro",
    type: "theory",
    q: "In your understanding, what does a software integration engineer do in an AUTOSAR Classic project?",
    vi: "Theo bạn hiểu, một kỹ sư tích hợp phần mềm làm gì trong dự án AUTOSAR Classic?",
    tags: ["integration engineer", "role", "AUTOSAR Classic", "baseline", "SWC", "ARXML", "vai trò tích hợp", "CI"],
    viTags: ["kỹ sư tích hợp phần mềm", "công việc tích hợp", "nhiệm vụ integrator", "tích hợp autosar classic", "quản lý baseline", "trách nhiệm tích hợp"],
    key: [
      "Collect deliveries: SWCs, ARXML, BSW, MCAL, config",
      "Configure, validate, generate, build per baseline",
      "Integration test on target/bench, report and route defects",
      "Keep main branch buildable, evidence ASPICE-ready",
      "Coordinate component teams, versions, dependencies"
    ],
    answer: "The integration engineer turns many independent deliveries into one working ECU software baseline. Component teams deliver application SWCs with their ARXML descriptions, BSW modules, MCAL for the target, and configuration. The integrator merges them into the system description, <strong>configures and validates the BSW and RTE</strong>, generates code, builds for the target compiler, and fixes inconsistencies or sends them to the owner: mismatched interfaces, wrong PDU mappings, init order, memory mapping, OS configuration. Then the baseline is verified on target or bench, results are reported, and defects go back to the right owner with evidence. On top of that there is configuration management, version tracking and ASPICE evidence. In modern projects much of this runs in CI, so the integrator also keeps the pipeline healthy. That's what I did in the CUBAS team for the BSW stack on RH850, and what I'd extend here with more CI ownership.",
    followups: ["What's the most common integration failure?", "Who should own the BSW configuration?"]
  },

  /* ============================== PROJECT ============================== */

  {
    id: "project-01",
    topic: "project",
    type: "behavioral",
    q: "Tell me about your MCAL validation work.",
    vi: "Hãy kể về công việc validation MCAL của bạn.",
    tags: ["MCAL", "unit test", "component test", "validation", "VECU", "target", "kiểm thử MCAL", "DIO", "ADC", "watchdog"],
    viTags: ["kiểm thử driver", "xác nhận mcal", "kiểm thử đơn vị", "kiểm thử thành phần", "test trên vecu", "test trên phần cứng"],
    key: [
      "Unit/component validation: DIO, ADC, timers, communication, watchdog",
      "Both target hardware and VECU",
      "Lifecycle: requirement analysis → test design → execution → evidence",
      "Tools: Pytest, Cantata, ECU-Test",
      "Scale: [fill: drivers owned, number of test cases, coverage]"
    ],
    answer: "From 2022 to 2024 I worked on MCAL validation in AUTOSAR Classic. I designed and executed <strong>unit and component validation across the digital I/O, analog, timer, communication and watchdog driver groups</strong>, on real target hardware and on VECU. I covered the whole lifecycle: analysing requirements from the AUTOSAR specification and the project, designing test cases, implementing test logic, running it, investigating failures, and producing traceable evidence under ASPICE. For tooling I used Cantata for unit-level testing, Pytest for test logic and automation, and ECU-Test at ECU level. Techniques included dependency isolation with mocking and stubbing, fault injection, edge-case validation and coverage-oriented testing. The driver groups I focused on most were [fill: main driver groups you owned], with roughly [fill: number of test cases] test cases and [fill: coverage level reached].",
    followups: ["How did you design test cases for the ADC driver?", "What ran on VECU and what on target?", "Did you find a real bug with fault injection?"]
  },

  {
    id: "project-02",
    topic: "project",
    type: "practical",
    q: "How did you design test cases for an MCAL driver, for example the ADC driver?",
    vi: "Bạn thiết kế test case cho một MCAL driver, ví dụ ADC driver, như thế nào?",
    tags: ["test design", "ADC", "MCAL", "boundary value", "DET", "requirement-based", "thiết kế test case", "equivalence class"],
    viTags: ["thiết kế kiểm thử", "giá trị biên", "phân vùng tương đương", "kiểm thử driver adc", "test dựa trên yêu cầu", "viết test case"],
    key: [
      "Start from requirements: AUTOSAR SWS + project reqs",
      "Per API: valid, boundary, invalid params (DET), uninit",
      "Config-dependent: groups, channels, conversion modes",
      "HW error paths via fault injection",
      "Coverage to find untested branches; trace back to reqs"
    ],
    answer: "I always started from the requirements: the AUTOSAR driver specification plus the project requirements, and every test case traced back to a requirement ID. For each API, like starting a group conversion or reading the result buffer, I covered the valid case, boundary values, invalid parameters that should raise a <strong>DET error</strong>, calling before initialisation, and repeated or out-of-order calls. Then configuration-dependent behaviour: different groups, channels and conversion modes, and notifications on or off. For error paths that are hard to trigger on hardware I used stubs and <strong>fault injection</strong>. Finally I checked coverage to find branches no requirement-based test reached, and either added a test or clarified the requirement. A concrete example from my work: [fill: one real boundary or fault-injection test and what it found].",
    followups: ["How did you verify the converted value was correct on target?", "What coverage metric did you target?"]
  },

  {
    id: "project-03",
    topic: "project",
    type: "theory",
    q: "What is a VECU, and how did you decide what to run on VECU versus on target hardware?",
    vi: "VECU là gì, và bạn quyết định chạy gì trên VECU và chạy gì trên phần cứng target như thế nào?",
    tags: ["VECU", "virtual ECU", "target", "simulation", "SIL", "ECU ảo", "phần cứng thật", "test strategy"],
    viTags: ["mô phỏng ecu", "mô phỏng", "chạy trên board thật", "chiến lược kiểm thử", "vecu và target", "kiểm thử sil"],
    key: [
      "VECU: ECU software on a PC/virtual platform, no board",
      "Fast, parallel, no hardware bottleneck, easy fault injection",
      "Target needed: real timing, registers, interrupts, analog, watchdog",
      "Same test logic on both where possible",
      "Split criteria: [fill: how your team decided]"
    ],
    answer: "A <strong>VECU, virtual ECU</strong>, runs the ECU software, or a part of it, on a PC or virtual platform instead of the real microcontroller, with hardware-dependent parts simulated or abstracted. The advantage is speed and scale: no board to book, runs can be parallelised, it's easy to inject faults and repeat, and it fits naturally into CI. The limitation is accuracy: real timing, actual register behaviour, interrupt latency, analog conversion and watchdog expiry only show up on the target. As a rule, logic, error paths, configuration variants and coverage-driven tests suit VECU, while hardware-dependent behaviour needs the target. Using the same test logic for both finds most issues early and saves limited hardware time for what really needs it. In our team the split was decided by [fill: your team's actual criteria].",
    followups: ["Did you ever see a bug on target that VECU didn't show?", "How would you use VECU in a CI pipeline?"]
  },

  {
    id: "project-04",
    topic: "project",
    type: "practical",
    q: "How did you do dependency isolation, mocking and fault injection? What was each tool — Cantata, Pytest, ECU-Test — used for?",
    vi: "Bạn đã cô lập phụ thuộc, mock và fault injection như thế nào? Mỗi công cụ Cantata, Pytest, ECU-Test được dùng để làm gì?",
    tags: ["Cantata", "Pytest", "ECU-Test", "mocking", "stubbing", "fault injection", "isolation", "giả lập", "unit test"],
    viTags: ["cô lập phụ thuộc", "giả lập hàm", "tiêm lỗi", "stub", "công cụ kiểm thử", "mock trong unit test"],
    key: [
      "Cantata: C unit test, stubs/isolation, coverage",
      "Pytest: test logic, automation around execution",
      "ECU-Test: ECU/HIL-level test, drives tools and devices",
      "Stub the lower layer → control return values",
      "Inject errors to exercise error-handling paths"
    ],
    answer: "Each tool had a different level. <strong>Cantata</strong> is a unit test tool for C: I used it to isolate the unit under test by replacing its dependencies with stubs and to measure structural coverage. <strong>Pytest</strong> was for test logic and automation around execution, running suites, parametrising cases and collecting results. <strong>ECU-Test</strong> works at ECU level, driving tools and hardware according to a test case. The isolation idea is always the same: the code under test calls a lower layer, and in the test build that layer is a stub I control. Then I can return boundary values, or return an error to exercise the error path, which is <strong>fault injection</strong>. The snippet shows the pattern in generic form. In practice I used [fill: which tool per driver group, how stubs were generated or written].",
    code: "/* Generic stub pattern (illustrative, not project code) */\nstatic Std_ReturnType stub_ret = E_OK;\nstatic uint16         stub_raw = 0u;\n\nvoid Stub_SetRawResult(uint16 raw, Std_ReturnType ret)\n{\n    stub_raw = raw;\n    stub_ret = ret;\n}\n\n/* Replaces the real lower-layer access in the test build */\nStd_ReturnType HwLayer_ReadRaw(uint8 channel, uint16 *raw)\n{\n    (void)channel;\n    *raw = stub_raw;\n    return stub_ret;   /* E_NOT_OK -> exercises the error path */\n}\n\n/* Test idea: Stub_SetRawResult(0x0FFFu, E_OK)   -> upper boundary\n              Stub_SetRawResult(0u, E_NOT_OK)     -> fault injection */",
    lang: "c",
    followups: ["What's the difference between a stub and a mock?", "Have you used VectorCAST?"]
  },

  {
    id: "project-05",
    topic: "project",
    type: "practical",
    q: "How do you test a watchdog driver without resetting the board all the time?",
    vi: "Làm sao để kiểm thử watchdog driver mà không phải reset board liên tục?",
    tags: ["watchdog", "WDG", "reset", "reset reason", "MCAL", "timeout", "kiểm thử watchdog"],
    viTags: ["test watchdog không reset", "reset board", "nguyên nhân reset", "hết thời gian chờ", "driver wdg", "test watchdog timeout"],
    key: [
      "Split: API/config tests vs intentional expiry tests",
      "API tests: mode, timeout, trigger — keep servicing it",
      "Expiry: stop triggering, then read reset reason after reboot",
      "Debugger to observe; VECU to simulate expiry",
      "Our real approach: [fill: how your team tested WDG expiry]"
    ],
    answer: "I split it into two kinds of tests. The first kind checks the <strong>API and configuration</strong>: initialisation, switching modes, setting the timeout, triggering. Here the test keeps servicing the watchdog, so the board never resets, and I verify behaviour through return values, DET errors and register state. The second kind checks <strong>intentional expiry</strong>: the test deliberately stops triggering, the watchdog fires, and after the reboot the test reads the <strong>reset reason</strong> to confirm it was a watchdog reset and not something else. With a debugger attached you can also observe the moment of expiry. On VECU, expiry can be simulated, which is much faster for the logic part, while the real timing is confirmed on target. In our team we did it by [fill: your team's actual watchdog test approach].",
    followups: ["How do you check the watchdog timeout accuracy?", "What happens if the debugger halts the core — does the watchdog keep running?"]
  },

  {
    id: "project-06",
    topic: "project",
    type: "practical",
    q: "What was CUBAS, and what was your integration workflow there?",
    vi: "CUBAS là gì, và quy trình tích hợp của bạn ở đó như thế nào?",
    tags: ["CUBAS", "BSW integration", "RH850", "workflow", "baseline", "tích hợp BSW", "integration flow", "D3 D4 D5"],
    viTags: ["quy trình tích hợp", "dự án cubas", "tích hợp phần mềm nền", "luồng tích hợp", "baseline tích hợp", "tích hợp trên rh850"],
    key: [
      "BSW integrator in the CUBAS integration team, RH850 D3/D4/D5",
      "Modules: BswM, Diag, Can, Com, EcuM, OS, MCAL, Mem",
      "In: component team deliveries + MCAL + configuration",
      "Integrate → configure/generate → build → test on target",
      "Out: validated baseline + defect tickets to owners",
      "[fill: cycle length, number of teams]"
    ],
    answer: "I was a <strong>BSW integrator in the CUBAS integration team</strong>, working on RH850 D3, D4 and D5. We integrated and validated BswM, Diag, CAN, COM, EcuM, OS, MCAL and the memory stack across the whole BSW. The flow was: component teams delivered their modules and configuration, together with the MCAL for RH850. I integrated them into a baseline [fill: your part in configuration/code generation, if any], built for the target, and ran integration tests on hardware. When something failed, I reproduced it, analysed dependencies across component interfaces, often with TRACE32, and sent a defect to the owning team with evidence. The output was a validated integration baseline for the project, with traceable evidence. An integration cycle took about [fill: cycle length], and I worked with [fill: number of BSW teams/components]. My direct responsibility was [fill: specific modules or the whole stack].",
    followups: ["What kind of failures did you see most often?", "How did D3, D4 and D5 differ for you?", "Which configuration tool did you use?"]
  },

  {
    id: "project-07",
    topic: "project",
    type: "theory",
    q: "How do EcuM, BswM, OS, COM and the memory stack interact at startup, and why does an integrator care?",
    vi: "EcuM, BswM, OS, COM và memory stack tương tác với nhau thế nào lúc khởi động, và tại sao integrator cần quan tâm?",
    tags: ["EcuM", "BswM", "OS", "startup", "init sequence", "NvM", "khởi động", "thứ tự init", "mode management"],
    viTags: ["trình tự khởi động", "thứ tự khởi tạo", "quản lý chế độ", "bộ nhớ không bay hơi", "startup ecu", "boot sequence"],
    key: [
      "EcuM: startup phases, init MCAL/drivers, then StartOS",
      "OS starts → SchM/RTE, BswM takes over mode handling",
      "BswM: rules/actions — enable COM, start comm, request NvM ReadAll",
      "Mem: NvM → MemIf → Fee/Ea → Fls/Eep",
      "Wrong order = use-before-init, missing data, silent comm"
    ],
    answer: "At a high level, <strong>EcuM</strong> owns startup: after reset it initialises the basic drivers and MCAL in a defined list, then starts the <strong>OS</strong>. Once the OS runs, the rest of the BSW and the RTE are initialised, and <strong>BswM</strong> takes over mode management through configured rules and actions: for example, request the NvM read-all, start the communication stack, and enable COM I-PDU groups so signals actually flow. The memory stack is layered, NvM on top, then MemIf, then Fee or Ea, down to the flash or EEPROM driver. An integrator cares because many integration failures are really <strong>ordering or mode problems</strong>: a module used before it's initialised, an application reading NVM data before read-all finished, or CAN frames on the bus but COM I-PDU groups never started. So when something is silent, I check the init and mode sequence first.",
    followups: ["Where are the EcuM init lists configured?", "What happens if NvM_ReadAll takes too long?"]
  },

  {
    id: "project-08",
    topic: "project",
    type: "behavioral",
    q: "Tell me about an integration failure you investigated and how you resolved it.",
    vi: "Hãy kể về một lỗi tích hợp mà bạn đã điều tra và cách bạn giải quyết nó.",
    tags: ["integration failure", "defect", "root cause", "STAR", "lỗi tích hợp", "CUBAS", "debug", "dependency"],
    viTags: ["debug lỗi tích hợp", "phân tích nguyên nhân gốc", "sự cố tích hợp", "xử lý lỗi", "lỗi phụ thuộc", "điều tra lỗi"],
    key: [
      "S: new delivery of [fill: module] → [fill: symptom] on [fill: D3/D4/D5]",
      "Reproduce reliably, compare with last good baseline",
      "Narrow down: which delivery/config changed",
      "TRACE32: breakpoints, registers, memory, trace",
      "Owner fixes, I verify in the baseline, add a check"
    ],
    answer: "One case: after integrating a new delivery of [fill: module], we saw [fill: symptom, e.g. ECU reset, no CAN transmission, wrong DTC] on [fill: D3/D4/D5]. My task was to find which module was responsible and prove it, so the right team could fix it. First I made it <strong>reproducible</strong> and compared against the last good baseline to see exactly which deliveries and configuration had changed. Then I narrowed down with TRACE32: breakpoints at [fill: function or ISR], inspecting [fill: registers or memory areas], and using trace to see [fill: what the trace showed]. The root cause was [fill: real root cause]. I handed it to [fill: owning team] with the reproduction steps and debugger evidence, verified the fix in the next baseline, and [fill: preventive action, e.g. added a check to the integration tests]. The lesson: reproduce first, compare against a known good baseline, then debug.",
    followups: ["How long did it take to find?", "How do you prevent that class of failure in CI?"]
  },

  {
    id: "project-09",
    topic: "project",
    type: "practical",
    q: "How did you use Lauterbach TRACE32 in your integration work?",
    vi: "Bạn đã dùng Lauterbach TRACE32 như thế nào trong công việc tích hợp?",
    tags: ["TRACE32", "Lauterbach", "debugger", "breakpoint", "register", "memory", "trace", "gỡ lỗi", "RH850"],
    viTags: ["debug bằng trace32", "trình gỡ lỗi", "điểm dừng", "xem thanh ghi", "đọc bộ nhớ", "debugger phần cứng"],
    key: [
      "Register + memory inspection: peripheral config, stack, variables",
      "Breakpoints: program + data (watch who writes a variable)",
      "Call stack after a trap or exception",
      "Trace/log analysis: execution order, timing",
      "Most used windows: [fill: TRACE32 windows/commands you used most]"
    ],
    answer: "I used TRACE32 for <strong>low-level investigation</strong> when an integration failure couldn't be explained from logs. Typical uses: inspecting <strong>peripheral registers</strong> to check whether a driver really configured the hardware the way the configuration says; <strong>memory inspection</strong> to see variable values, buffers and stack usage; <strong>breakpoints</strong>, including data breakpoints to catch who writes a variable unexpectedly; and looking at the call stack after a trap or exception to see how we got there. Where available, <strong>trace</strong> helped to see execution order and timing, which matters for OS and interrupt issues. The snippet shows the kind of commands involved, in generic form. The windows and features I used most were [fill: e.g. Register view, Data dump, Break list, Trace list], and I also [fill: whether you wrote PRACTICE scripts to automate flashing or setup].",
    code: "; Typical TRACE32 PRACTICE commands (generic illustration)\nSYStem.Up                     ; connect to the target\nData.LOAD.Elf app.elf         ; load program + symbols\nBreak.Set EcuM_Init           ; program breakpoint\nVar.Break.Set myVar /Write    ; stop when a variable is written\nGo\nRegister.view                 ; core registers\nFrame.view                    ; call stack\nData.dump 0xFEDF0000          ; raw memory view\nTrace.List                    ; recorded execution (if trace available)",
    lang: "text",
    followups: ["Have you used iSystem/winIDEA?", "How would you debug a stack overflow?"]
  },

  {
    id: "project-10",
    topic: "project",
    type: "behavioral",
    q: "How did you coordinate with multiple BSW teams as the integration point?",
    vi: "Với vai trò là đầu mối tích hợp, bạn phối hợp với nhiều team BSW như thế nào?",
    tags: ["coordination", "stakeholder", "BSW teams", "integration point", "communication", "phối hợp", "điều phối", "interface"],
    viTags: ["phối hợp nhiều team", "đầu mối tích hợp", "giao tiếp liên nhóm", "điều phối công việc", "làm việc với team bsw", "quản lý giao diện"],
    key: [
      "Between project stakeholders and BSW component teams",
      "Align interfaces and delivery versions per baseline",
      "Defect handover: reproduction steps + evidence + owner",
      "Track to closure, verify in next baseline",
      "Tools/meetings: [fill: Jira, syncs, frequency]"
    ],
    answer: "In CUBAS I was the <strong>integration point between project stakeholders and the BSW component teams</strong>. On one side the project needed a working baseline on schedule; on the other side each component team focused on its own module. My job was to align the two. Practically, that meant agreeing which versions go into which baseline, clarifying interface expectations when two modules interpreted something differently, and when integration failed, handing the defect to the right owner with reproduction steps, logs and debugger evidence, so there was no long argument about whose bug it was. Then I followed the issue until it was closed and verified the fix in the next baseline. The mechanics were [fill: e.g. Jira tickets, regular syncs, frequency]. What I learned is that clear evidence and a clear owner resolve most coordination problems before they turn into conflicts.",
    followups: ["What if a team didn't deliver on time?", "How do you prioritise defects from different teams?"]
  },

  {
    id: "project-11",
    topic: "project",
    type: "practical",
    q: "You integrated on RH850 D3, D4 and D5. How did the variants affect integration?",
    vi: "Bạn đã tích hợp trên RH850 D3, D4 và D5. Các biến thể này ảnh hưởng đến việc tích hợp như thế nào?",
    tags: ["RH850", "variants", "D3", "D4", "D5", "derivative", "biến thể", "configuration", "Renesas"],
    viTags: ["biến thể vi điều khiển", "nhiều biến thể", "khác biệt cấu hình", "chip renesas", "tích hợp đa biến thể", "derivative rh850"],
    key: [
      "Same BSW stack, different derivatives",
      "Differences: [fill: memory size, peripherals, pin/clock config]",
      "Shared config + variant-specific parts, kept separate",
      "Test each variant; don't assume one = all",
      "Typical variant bug: [fill: real D3/D4/D5-specific issue, if any]"
    ],
    answer: "The three were variants of the same RH850 platform, so the BSW stack was largely shared, but the derivatives differ in things that matter to an integrator: [fill: real differences, e.g. memory size and layout, available peripherals or channels, clock or pin configuration]. The principle I followed was to keep the <strong>common configuration shared</strong> and the <strong>variant-specific parts clearly separated</strong>, so a fix for one variant doesn't silently break another. That also meant validating each variant rather than assuming one passing means all pass, especially for anything touching memory mapping, MCAL configuration or timing. An example of a variant-specific issue I saw was [fill: real example or say you didn't see one]. Today I'd put all variants in the CI matrix, so every change is built and smoke-tested on each.",
    followups: ["How would you manage variant configurations in version control?", "How do you handle a fix needed on only one variant?"]
  },

  {
    id: "project-12",
    topic: "project",
    type: "practical",
    bridge: true,
    q: "We use EB tresos and AUTOSAR Builder. Have you used them?",
    vi: "Chúng tôi dùng EB tresos và AUTOSAR Builder. Bạn đã dùng chúng chưa?",
    tags: ["EB tresos", "AUTOSAR Builder", "RTA-CAR", "configuration tool", "ARXML", "bridge", "công cụ cấu hình"],
    viTags: ["công cụ cấu hình autosar", "cấu hình bsw", "kinh nghiệm eb tresos", "chuyển đổi công cụ", "công cụ cấu hình tương đương", "file arxml"],
    key: [
      "Honest: not used in a project",
      "Used ETAS RTA-CAR [fill: for what]",
      "Same flow: import ARXML → configure → validate → generate → build",
      "Tool-specific learning: UI, project structure, CLI generation",
      "CLI generation is what matters for CI"
    ],
    answer: "I haven't used EB tresos or AUTOSAR Builder in a project. I've worked with <strong>ETAS RTA-CAR</strong> [fill: confirm what you used RTA-CAR for], and in CUBAS I did BSW integration on RH850, so the underlying workflow is familiar: import the system and component ARXML, configure the BSW modules, run the <strong>consistency validation</strong>, generate code, and build for the target. The concepts are standardised by AUTOSAR, so what changes is the tool: the UI, project structure, how modules and plugins are organised, and how generation is invoked. For an integration and CI role, the most important part is running validation and generation from the <strong>command line</strong> inside a pipeline, so builds are reproducible and not dependent on someone's workstation. That's the first thing I'd learn in tresos.",
    followups: ["What is the difference between pre-compile, link-time and post-build configuration?", "How would you version-control generated code?"]
  },

  {
    id: "project-13",
    topic: "project",
    type: "theory",
    q: "Explain SENT in about a minute.",
    vi: "Hãy giải thích SENT trong khoảng một phút.",
    tags: ["SENT", "SAE J2716", "nibble", "tick", "sensor protocol", "fast channel", "slow channel", "CRC", "giao thức cảm biến"],
    viTags: ["giao thức sent", "truyền dữ liệu cảm biến", "kênh nhanh kênh chậm", "khung sent", "giải thích sent", "mã kiểm tra crc"],
    key: [
      "SAE J2716: one-way, point-to-point, sensor → ECU",
      "Data = time between falling edges, counted in ticks",
      "Tick 3–90 µs, ±20% clock tolerance",
      "Frame: sync 56 ticks, status, up to 6 data nibbles, CRC-4, optional pause",
      "Nibble 12–27 ticks → value 0–15",
      "Slow channel: bits from status nibble across frames"
    ],
    answer: "<strong>SENT, SAE J2716</strong>, is a one-way, point-to-point protocol from a sensor to the ECU, used for things like pressure or position sensors. There's no clock line and no addressing: data is encoded in the <strong>time between falling edges</strong>, counted in ticks. The tick is chosen by the sensor, typically in the range 3 to 90 microseconds, and the sensor clock may deviate by up to about 20 percent. That's why every frame starts with a <strong>calibration pulse of 56 ticks</strong>: the receiver measures it to calculate the actual tick time. Then come a status and communication nibble, up to six data nibbles, a CRC-4, and optionally a pause pulse. Each nibble is 12 to 27 ticks long, so the value is ticks minus 12, zero to fifteen. The slow channel is built from bits in the status nibble across many frames, for IDs and diagnostics. Because it's timing-encoded, SENT is very sensitive to jitter.",
    code: "| Sync/Cal 56 ticks | Status 4b | D1 | D2 | D3 | D4 | D5 | D6 | CRC 4b | Pause (opt) |\nnibble length = 12..27 ticks  ->  value = ticks - 12  (0..15)\ntick = 3..90 us (sender-defined), receiver re-derives it from the 56-tick pulse",
    lang: "text",
    followups: ["What happens if the sensor clock drifts by 15%?", "Why use SENT instead of analog or PWM?"]
  },

  {
    id: "project-14",
    topic: "project",
    type: "behavioral",
    q: "Tell me about the SENT timing defect you diagnosed on ST and Infineon targets.",
    vi: "Hãy kể về lỗi timing SENT mà bạn đã chẩn đoán trên target ST và Infineon.",
    tags: ["SENT", "timing defect", "UDE", "ST", "Infineon", "STAR", "hardest bug", "lỗi timing", "debug"],
    viTags: ["lỗi thời gian", "chẩn đoán lỗi sent", "bug khó nhất", "debug timing", "sai lệch thời gian", "vi điều khiển infineon"],
    key: [
      "S: SENT timing/signal defect on ST and Infineon targets",
      "Symptom: [fill: e.g. wrong tick, CRC errors, lost frames]",
      "UDE: measure protocol timing, compare with reference manual",
      "Isolate variables: same SW on two targets, one change at a time",
      "Root cause + fix: [fill: real root cause and fix]",
      "Lesson: measure at the lowest level, don't guess"
    ],
    answer: "While working on the SENT stack, we had timing and signal-behaviour defects on ST and Infineon targets. The symptom was [fill: concrete symptom, e.g. wrong decoded values, CRC errors, lost frames], and it appeared [fill: under which conditions or on which target]. My task was to find whether it was hardware, peripheral configuration or software, and prove it. I used the <strong>UDE debugger</strong> to look at protocol-level timing, ticks, nibbles and frame structure, and compared the peripheral configuration and behaviour against the <strong>reference manual</strong>. I isolated variables: the same software on both targets, and changing one parameter at a time, to separate hardware effects from driver logic, and analysed the interaction between peripheral, interrupts and driver. The root cause was [fill: real root cause], fixed by [fill: fix], and I verified it on both targets. The lesson I kept: for timing bugs, measure at the lowest level instead of guessing.",
    followups: ["How did you decide it was software and not hardware?", "How long did it take?", "How would you write this up as an 8D?"]
  },

  {
    id: "project-15",
    topic: "project",
    type: "practical",
    q: "How do you decide whether a defect is a hardware problem or a software problem?",
    vi: "Làm sao bạn xác định một lỗi là do phần cứng hay do phần mềm?",
    tags: ["root cause", "hardware vs software", "isolation", "UDE", "reference manual", "phân tích nguyên nhân", "8D", "method"],
    viTags: ["lỗi phần cứng hay phần mềm", "khoanh vùng lỗi", "nguyên nhân gốc", "phương pháp phân tích lỗi", "đọc tài liệu tham chiếu", "phân tích 8d"],
    key: [
      "Reproduce reliably first",
      "Swap one variable: same SW other HW, other SW same HW",
      "Measure: debugger registers, timing at protocol level",
      "Compare config vs reference manual / datasheet",
      "Check interrupt/driver interaction, errata",
      "Confirm with fix + regression on all targets"
    ],
    answer: "First I make the failure <strong>reproducible</strong>; without that, any conclusion is a guess. Then I isolate variables one at a time: run the same software on another board or target, and a known-good software version on the same hardware. If the failure follows the hardware, it's likely hardware or hardware-specific configuration; if it follows the software version, I look at what changed. Next I <strong>measure</strong>: with the debugger I check that peripheral registers really match the intended configuration, and I compare against the <strong>reference manual</strong>, because a lot of hardware problems are actually misconfiguration. For timing issues I look at interrupt load and driver interaction. I also check silicon errata. Finally, the fix must be verified on all affected targets and added as a regression test. That's how I approached the SENT defects on ST and Infineon with UDE.",
    followups: ["What is 8D, and how would this map to it?", "When would you involve the hardware team?"]
  },

  {
    id: "project-16",
    topic: "project",
    type: "behavioral",
    q: "Walk me through the SENT automation initiative you led.",
    vi: "Hãy trình bày chi tiết sáng kiến tự động hóa SENT mà bạn đã dẫn dắt.",
    tags: ["SENT", "automation", "lead", "1-2 months", "2-3 days", "tự động hóa", "STAR"],
    viTags: ["tự động hóa kiểm thử", "dẫn dắt sáng kiến", "rút ngắn thời gian test", "tự động hóa sent", "cải tiến quy trình", "test automation"],
    key: [
      "S: manual SENT validation, ~1–2 months per cycle",
      "T: lead a small SENT automation team, in parallel with ARA system test",
      "A: automate the whole loop, not one step",
      "A: dedicated SENT framework: [fill: real tools] (not Azure/Conan — that was ARA)",
      "R: 2–3 days per cycle, [fill: adoption/evidence]"
    ],
    answer: "<strong>Situation</strong>: the SENT stack validation was largely manual, and a complete cycle took about one to two months. It was slow, hard to repeat, and dependent on who executed it. <strong>Task</strong>: in parallel with my system test work on the AUTOSAR Adaptive project, I led a small automation team for SENT, end to end: planning, task breakdown, workflow design, implementation, execution and delivery, in an Agile team. <strong>Action</strong>: I looked at the whole loop instead of one step: setting up each test, stimulating and measuring, judging results, and collecting evidence. I introduced an automation-first workflow so those steps run without manual effort, built as a dedicated framework for SENT [fill: real tools and how runs were triggered]. I broke the work into pieces the team could build in parallel and tracked it sprint by sprint. <strong>Result</strong>: the complete validation cycle went from about one to two months to <strong>two to three days</strong>. [fill: additional real outcome, e.g. how many releases it was used for].",
    followups: ["What exactly took 1–2 months before?", "What was the architecture?", "How big was the team?"]
  },

  {
    id: "project-17",
    topic: "project",
    type: "practical",
    q: "You say 1–2 months down to 2–3 days. What exactly took that long before, and how did you measure it?",
    vi: "Bạn nói giảm từ 1–2 tháng xuống còn 2–3 ngày. Trước đây chính xác cái gì tốn nhiều thời gian như vậy, và bạn đo lường nó thế nào?",
    tags: ["baseline", "metrics", "measurement", "bottleneck", "1-2 months", "2-3 days", "đo lường", "số liệu", "SENT"],
    viTags: ["đo lường hiệu quả", "số liệu cải tiến", "điểm nghẽn", "thời gian kiểm thử", "chứng minh kết quả", "so sánh trước và sau"],
    key: [
      "Before: [fill: number of test cases × configurations/targets]",
      "Time sinks: manual setup, execution, evaluation, reporting",
      "After: [fill: what runs automatically]",
      "Remaining 2–3 days: [fill: what's still manual/review]",
      "Measured by: [fill: previous vs new cycles, Jira/logs]"
    ],
    answer: "Before automation, one full cycle covered [fill: number of test cases] across [fill: configurations or targets], and the time went mainly into [fill: confirm which of these applied]: <strong>manual setup</strong> of each test, <strong>execution</strong> with someone at the bench, <strong>evaluating results by hand</strong>, often reading timing in a debug tool, and <strong>putting together the report and evidence</strong>. Any change meant repeating large parts of that. After automation, [fill: what runs automatically, e.g. setup, execution, pass/fail evaluation, report generation]. The remaining two to three days are mostly [fill: e.g. execution time on hardware, reviewing failures, sign-off]. The numbers come from [fill: how measured, e.g. comparing actual cycle durations before and after, from Jira or run logs]. It's an approximate range, not a lab benchmark, but it's based on real cycles. The biggest gain came from [fill: the single step that saved the most time].",
    followups: ["Which single step saved the most time?", "Did the test scope change?"]
  },

  {
    id: "project-18",
    topic: "project",
    type: "practical",
    q: "What was the architecture of the SENT automation framework?",
    vi: "Kiến trúc của framework tự động hóa SENT là gì?",
    tags: ["architecture", "framework", "layers", "test automation", "Python", "kiến trúc", "SENT", "data-driven"],
    viTags: ["kiến trúc framework", "thiết kế framework test", "các tầng kiến trúc", "kiểm thử hướng dữ liệu", "framework python", "tự động hóa kiểm thử"],
    key: [
      "Layers: test definition → execution/control → evaluation → reporting",
      "Run mechanism: [fill: how runs were triggered] (not Azure/Conan — that was ARA)",
      "Real components and languages: [fill: tools/languages per layer]",
      "What I wrote myself: [fill: your personal contribution]",
      "Traceability: results linked to requirements"
    ],
    answer: "I think of it in layers. First, <strong>test definition</strong>: what to test and with which parameters. Then <strong>execution and control</strong>: running the test and driving the target and equipment. Then <strong>evaluation</strong>: turning raw measurements into a pass or fail verdict against expected values, so nobody has to judge timing by eye. Finally <strong>reporting</strong>: logs, results and evidence linked back to requirements. Around that, [fill: how runs were triggered and scheduled, e.g. a script or runner on the bench PC]. In our implementation, the concrete pieces were [fill: actual components, languages and tools per layer], and the parts I built myself were [fill: your personal contribution]. The key design decision was [fill: e.g. separating test data from test logic so adding a case doesn't require code changes], because that's what made it reusable.",
    followups: ["How did you connect the pipeline to the hardware bench?", "How would you extend it to another protocol?"]
  },

  {
    id: "project-19",
    topic: "project",
    type: "behavioral",
    q: "How big was the automation team, and how did you plan and track the work?",
    vi: "Team tự động hóa có quy mô bao nhiêu người, và bạn lập kế hoạch và theo dõi công việc như thế nào?",
    tags: ["team", "planning", "task breakdown", "Agile", "Scrum", "Jira", "tracking", "lập kế hoạch", "quy mô team"],
    viTags: ["quy mô nhóm", "lập kế hoạch công việc", "chia nhỏ task", "theo dõi tiến độ", "quản lý công việc", "làm việc agile"],
    key: [
      "Team: [fill: size, roles]",
      "My role: [fill: technical lead / coordinator, not line manager?]",
      "Break into parallel, deliverable pieces with clear interfaces",
      "Sprints, backlog, Jira; unblock technical issues",
      "Report progress to stakeholders"
    ],
    answer: "The team was [fill: team size and roles], and my role was [fill: technical lead or coordinator; state honestly whether you had line-management responsibility]. For planning, I broke the initiative into <strong>pieces that could be built in parallel</strong> with clear interfaces between them, so people didn't block each other and progress was visible. We worked in an Agile setup: a backlog, sprint planning, estimates, and tracking in Jira. My daily part was keeping priorities clear, <strong>unblocking technical issues</strong>, reviewing that the pieces actually integrated, and managing dependencies, for example on bench availability or other teams. I reported progress to stakeholders [fill: how and how often]. The biggest planning lesson was [fill: real lesson, e.g. deliver a thin end-to-end slice early before widening coverage].",
    followups: ["How did you estimate work you had never done before?", "What did you do when a sprint goal slipped?"]
  },

  {
    id: "project-20",
    topic: "project",
    type: "behavioral",
    q: "What were the main challenges in the automation initiative, and how did you get people to adopt it?",
    vi: "Những thách thức chính trong sáng kiến tự động hóa là gì, và bạn làm thế nào để mọi người chấp nhận áp dụng nó?",
    tags: ["challenges", "adoption", "change management", "trust", "thách thức", "áp dụng", "automation", "SENT"],
    viTags: ["khó khăn khi tự động hóa", "thuyết phục đồng nghiệp", "quản lý thay đổi", "tạo niềm tin", "triển khai công cụ mới", "chấp nhận sử dụng"],
    key: [
      "Challenge: [fill: real technical challenge]",
      "Trust: automated verdicts must match known results",
      "Adoption: show small real results first, then expand",
      "Documentation + reusable framework → team can self-serve",
      "Separate example (ARA project): frameworks adopted by the ARA system team"
    ],
    answer: "Technically, the main challenge was [fill: real challenge, e.g. environment stability, hardware-dependent timing, bench access]. We handled it by [fill: how]. The bigger challenge was <strong>adoption</strong>. People who have run tests manually for a long time trust their own eyes more than a script, which is fair. So I focused on two things. First, <strong>trust</strong>: automated results had to agree with known results before anyone depended on them. Second, <strong>showing value early</strong>: getting a small set of tests running end to end and showing the time saved, then expanding step by step. I also made sure it was usable without me, with documentation and reusable components. A separate example from the Adaptive project: the frameworks I built there for testing, development workflows and documentation hosting were adopted by the ARA system team. [fill: how you onboarded or trained colleagues].",
    followups: ["Did anyone resist? How did you handle it?", "Who maintains it now?"]
  },

  {
    id: "project-21",
    topic: "project",
    type: "practical",
    q: "How do you make sure an automated test verdict is actually correct?",
    vi: "Làm sao bạn đảm bảo kết quả của test tự động thực sự chính xác?",
    tags: ["test validity", "false pass", "false fail", "cross-check", "fault injection", "độ tin cậy", "verdict", "automation"],
    viTags: ["tính đúng của kết quả test", "pass giả", "fail giả", "kiểm chứng chéo", "độ tin cậy kiểm thử", "xác minh kết quả"],
    key: [
      "Cross-check against manual/known results at start",
      "Inject known-bad inputs: test must fail",
      "Separate infra failures from real failures",
      "Keep raw data/logs as evidence for every verdict",
      "Review evaluation thresholds against the spec"
    ],
    answer: "An automated test that passes wrongly is worse than no test, so I check it from both sides. First, when introducing automation, I <strong>cross-check</strong> automated verdicts against results we already knew, from manual runs or reference data, until they agree. Second, I make sure the test can actually fail: feeding <strong>known-bad input</strong>, for SENT for example a wrong CRC, an out-of-range nibble or a distorted calibration pulse, and confirming the verdict is fail. Third, I separate <strong>infrastructure failures</strong>, like a bench not responding, from real product failures, so people don't learn to ignore red. And every verdict keeps its raw logs and measurements, so anyone can audit why it passed or failed, which also serves as ASPICE evidence. In the SENT automation specifically, we [fill: how you actually validated the automated verdicts].",
    followups: ["How do you handle flaky tests?", "Who reviews the thresholds?"]
  },

  {
    id: "project-22",
    topic: "project",
    type: "theory",
    q: "What is AUTOSAR Adaptive, and how is system testing on ARA different from Classic?",
    vi: "AUTOSAR Adaptive là gì, và system test trên ARA khác gì so với Classic?",
    tags: ["AUTOSAR Adaptive", "ARA", "ara::com", "SOME/IP", "POSIX", "Linux", "QNX", "service-oriented", "khác biệt Classic"],
    viTags: ["adaptive platform", "so sánh adaptive và classic", "kiến trúc hướng dịch vụ", "kiểm thử hệ thống", "nền tảng ara", "linux nhúng"],
    key: [
      "Adaptive: POSIX OS (Linux/QNX), C++, service-oriented",
      "ara::com, execution management, state management, dynamic deployment",
      "Classic: static config, OSEK-based OS, signal-oriented, C",
      "ARA system test: processes, services, networking, logs",
      "Platforms I used: RPi4, R-Car, QNX, Embedded Linux"
    ],
    answer: "<strong>AUTOSAR Adaptive</strong> targets high-performance computers. It runs on a POSIX operating system like Linux or QNX, applications are C++ processes, and communication is <strong>service-oriented</strong> through ara::com, typically over SOME/IP, instead of static signals. It has functional clusters such as execution management, which starts and supervises processes, state management, and logging. <strong>Classic</strong> is for deeply embedded ECUs: statically configured, an OSEK-based OS, C code and signal-oriented communication. That changes testing a lot. On ARA, system testing means checking that processes start in the right states, services are offered and found, communication works over the network, and the platform behaves across deployments. Debugging uses Linux tools: process and service status, logs, network captures, remote debugging. I did this system-level validation on Raspberry Pi 4, Renesas R-Car, QNX and Embedded Linux.",
    followups: ["What is service discovery in SOME/IP?", "What differs between Linux and QNX for testing?"]
  },

  {
    id: "project-23",
    topic: "project",
    type: "practical",
    q: "How did you isolate a system-level failure on the ARA platform?",
    vi: "Bạn đã khoanh vùng một lỗi ở mức hệ thống trên nền tảng ARA như thế nào?",
    tags: ["system test", "Linux", "QNX", "log analysis", "remote debugging", "networking", "khoanh vùng lỗi", "R-Car", "Raspberry Pi"],
    viTags: ["lỗi mức hệ thống", "phân tích log", "debug từ xa", "khoanh vùng sự cố", "lỗi mạng", "kiểm thử hệ thống"],
    key: [
      "Symptom → is the process/service running?",
      "Logs: application + system logs, timestamps",
      "Network: endpoint listening? packets flowing?",
      "Reproduce + remote debug (gdbserver)",
      "Classify: stack, config, platform, or bench",
      "Real example: [fill: one real ARA failure you isolated]"
    ],
    answer: "I follow a fixed order so I don't jump to conclusions. First, <strong>is the process or service actually running</strong>, and in the expected state? On Linux that's process and service status; on QNX the process list. Second, <strong>logs</strong>: application logs and system logs around the failure time. Third, <strong>networking</strong>: is the endpoint listening, and are packets actually going out and coming in? A capture answers that quickly. Fourth, reproduce it and use <strong>remote debugging</strong> if needed. At the end I classify it: ARA stack defect, configuration, platform issue, or the test setup itself, and send it to the right owner. A real example: [fill: symptom on which platform, what you found at which step, and the root cause]. The commands in the snippet are the typical ones for each step.",
    code: "# Linux\nsystemctl status my-service        # is it running?\njournalctl -u my-service --since \"10 min ago\"\nss -tulpn | grep 30490             # is the endpoint listening?\ntcpdump -i eth0 udp port 30490 -w cap.pcap\ngdbserver :2345 --attach <pid>     # remote debug from host gdb\n\n# QNX\npidin | grep my_app                # process list\nslog2info | tail -50               # system log",
    lang: "bash",
    followups: ["What is the difference between QNX and Linux for you as a tester?", "How do you debug a process that crashes at startup?"]
  },

  {
    id: "project-24",
    topic: "project",
    type: "behavioral",
    q: "You built reusable frameworks that the ARA system team adopted. What were they?",
    vi: "Bạn đã xây dựng các framework tái sử dụng được mà team hệ thống ARA áp dụng. Đó là những framework gì?",
    tags: ["reusable framework", "adoption", "ARA", "documentation hosting", "test framework", "tái sử dụng", "framework"],
    viTags: ["framework dùng lại", "công cụ dùng chung", "chia sẻ framework", "lưu trữ tài liệu", "framework kiểm thử", "đóng góp cho team"],
    key: [
      "Three areas: testing, development workflows, documentation hosting",
      "Goal: stop each engineer rebuilding the same scaffolding",
      "Concrete content: [fill: what each framework provided]",
      "Adopted by the ARA system team",
      "Design for others: docs, simple entry points"
    ],
    answer: "I built frameworks in three areas: <strong>testing</strong>, <strong>development workflows</strong> and <strong>documentation hosting</strong>. The motivation was that every engineer was rebuilding the same basic setup: setting up the environment, connecting to targets, running tests, collecting logs, publishing results. So I turned that into reusable pieces. Concretely, the test framework provided [fill: e.g. target connection, test execution, log collection, reporting], the development workflow part covered [fill: what the dev-workflow framework provided], and documentation hosting meant [fill: e.g. docs built and published automatically]. They were adopted by the ARA system team. What I learned is that reusability is mostly about the user: a simple entry point, good defaults and documentation matter more than clever internals. If a colleague needs me to use it, it's not reusable yet.",
    followups: ["How did you handle requests for features that only one person needed?", "How did you version and release the framework?"]
  },

  {
    id: "project-25",
    topic: "project",
    type: "practical",
    q: "How did you integrate build, package and test with Azure Pipelines and Conan? How does that map to our Jenkins/GitLab and Artifactory setup?",
    vi: "Bạn tích hợp build, đóng gói và test với Azure Pipelines và Conan như thế nào? Điều đó tương ứng thế nào với hệ thống Jenkins/GitLab và Artifactory của chúng tôi?",
    tags: ["Azure Pipelines", "Conan", "CI/CD", "YAML", "Jenkins", "GitLab", "Artifactory", "package management", "đường ống CI"],
    viTags: ["tích hợp liên tục", "pipeline ci/cd", "đóng gói phần mềm", "quản lý gói", "build tự động", "chuyển sang jenkins"],
    key: [
      "Pipeline as YAML: trigger → build → package → test → publish",
      "Conan: pin C/C++ deps + binaries per configuration",
      "Same result on every agent → repeatable",
      "Real stages/agents: [fill: pipeline stages, trigger, agent setup]",
      "Maps: stage/job ≈ Jenkins stage, Conan remote ≈ Artifactory repo"
    ],
    answer: "The pipeline was defined in <strong>YAML in Azure Pipelines</strong>: a trigger, then build, package, test and publish of results and artifacts. <strong>Conan</strong> is a package manager for C and C++: it locks dependency versions and can provide prebuilt binaries per configuration, so every agent builds with exactly the same inputs. No more \"it works on my machine\". Packages are stored on a remote and pulled by the pipeline. In our setup the stages were [fill: real stages], it ran [fill: per commit, nightly, or manual], and agents were [fill: hosted or self-hosted, how connected to benches]. The snippet is a simplified example of the pattern. I haven't used Jenkins, GitLab CI or Artifactory in a project, but the mapping is direct: stages and jobs match Jenkins stages or GitLab jobs, agents match runners, and a Conan remote is something Artifactory can host.",
    code: "# Illustrative sketch, not the project's file\ntrigger:\n  branches: { include: [main] }\npool:\n  name: bench-agents            # self-hosted agent with target access\nstages:\n- stage: Build\n  jobs:\n  - job: build\n    steps:\n    - script: |\n        conan install . --build=missing -pr:h profiles/target\n        cmake --preset conan-release\n        cmake --build --preset conan-release\n    - publish: build/out\n      artifact: binaries\n- stage: Test\n  dependsOn: Build\n  jobs:\n  - job: test\n    steps:\n    - download: current\n      artifact: binaries\n    - script: python -m pytest tests --junitxml=results.xml\n    - task: PublishTestResults@2\n      condition: always()\n      inputs: { testResultsFiles: results.xml }",
    lang: "yaml",
    followups: ["How do you make a C/C++ build reproducible?", "How would you share a hardware bench between pipelines?"]
  },

  {
    id: "project-26",
    topic: "project",
    type: "practical",
    q: "You owned requirement traceability and test evidence. How did you make sure you were review-ready under ASPICE?",
    vi: "Bạn phụ trách truy vết yêu cầu và bằng chứng kiểm thử. Làm sao bạn đảm bảo luôn sẵn sàng cho review theo ASPICE?",
    tags: ["traceability", "ASPICE", "requirement-to-test", "evidence", "review readiness", "truy vết", "bằng chứng", "SWE.4", "SWE.5"],
    viTags: ["truy vết yêu cầu", "bằng chứng kiểm thử", "sẵn sàng đánh giá", "tuân thủ aspice", "liên kết yêu cầu và test", "audit aspice"],
    key: [
      "Bidirectional: requirement ↔ test case ↔ result",
      "Every requirement covered, every test has a reason",
      "Evidence tied to a baseline/version",
      "Gaps and deviations documented, not hidden",
      "Tools: [fill: requirement/test management tools]"
    ],
    answer: "I owned the chain from engineering requirements down to validation results. The core is <strong>bidirectional traceability</strong>: every requirement maps to at least one test case, and every test case points back to a requirement, so there are no untested requirements and no tests without a reason. Each result had to be tied to a specific <strong>software version or baseline</strong>, with the logs, otherwise the evidence doesn't prove anything. Being review-ready meant that before a review I checked coverage of the mapping, open failures with their defect tickets, and any deviation or not-tested item with a justification, rather than letting the reviewer find gaps. In ASPICE terms this supports the software unit, integration and qualification test processes. We managed it with [fill: tools used for requirements and test management]. Today I'd generate as much of that evidence as possible from the pipeline automatically.",
    followups: ["What happens to traceability when a requirement changes?", "What does an assessor typically check?"]
  },

  {
    id: "project-27",
    topic: "project",
    type: "practical",
    q: "What documentation did you create with Enterprise Architect and IBM Rhapsody?",
    vi: "Bạn đã tạo những tài liệu gì bằng Enterprise Architect và IBM Rhapsody?",
    tags: ["Enterprise Architect", "IBM Rhapsody", "UML", "design documentation", "sequence diagram", "tài liệu thiết kế", "SysML"],
    viTags: ["viết tài liệu thiết kế", "sơ đồ uml", "sơ đồ tuần tự", "mô hình hóa", "vẽ sơ đồ kiến trúc", "rhapsody"],
    key: [
      "Technical and design documentation, created and maintained",
      "UML: component, sequence, state diagrams (typical)",
      "Actual diagram types/scope: [fill: what you modelled, which diagrams]",
      "Keep models in sync with code and requirements",
      "Used in reviews and onboarding"
    ],
    answer: "In the Classic role I created and maintained technical and design documentation with <strong>Enterprise Architect</strong> and <strong>IBM Rhapsody</strong>. Both are UML and SysML modelling tools, so documentation is a model rather than static pictures: component and interface structure, sequence diagrams for interactions, and state machines for behaviour. What I documented specifically was [fill: e.g. test architecture, integration interfaces, sequence of a driver or stack interaction], mainly using [fill: diagram types]. The challenge with design documentation is keeping it in sync with the code and requirements, so I treated updates as part of the change, not something done at the end. The models were useful in reviews and for onboarding, because a sequence diagram explains a startup or communication flow faster than reading code.",
    followups: ["Which UML diagram is most useful for integration work?", "How do you keep models and code consistent?"]
  },

  {
    id: "project-28",
    topic: "project",
    type: "practical",
    q: "What does your current platform look like from an infrastructure and operations point of view, and what's relevant for CI?",
    vi: "Nền tảng hiện tại của bạn trông như thế nào từ góc độ hạ tầng và vận hành, và phần nào liên quan đến CI?",
    tags: ["AI platform", "infrastructure", "Docker", "Kubernetes", "Terraform", "Azure", "GCP", "access control", "cost governance", "hạ tầng"],
    viTags: ["hạ tầng nền tảng", "vận hành hệ thống", "container docker", "điện toán đám mây", "quản lý chi phí", "phân quyền truy cập"],
    key: [
      "Containers: Docker; orchestration: Kubernetes",
      "Infrastructure as code: Terraform, on Azure and GCP",
      "Azure: App Service, networking/DNS, Entra ID",
      "Access control + cost governance of shared resources",
      "Scale/incident: [fill: platform scale + one real incident]",
      "CI relevance: reproducible envs, access, resource accounting"
    ],
    answer: "Infrastructure-wise, the applications run in <strong>Docker containers</strong>, deployed on Azure and Google Cloud, partly on <strong>Kubernetes</strong>, and the infrastructure is described with <strong>Terraform</strong> so environments can be recreated and changes reviewed like code. On Azure I manage App Service, networking and DNS, and authentication through Entra ID. Two operational topics are central: <strong>access control</strong>, who can use which API or resource, and <strong>cost governance</strong>, tracking and limiting usage of expensive shared resources. The platform serves [fill: scale, e.g. number of users or applications], and an operational issue I handled was [fill: real incident]. For CI the relevance is direct: build agents should be containerised and reproducible, infrastructure should be code, access to benches and secrets must be controlled, and shared resources like agents and benches need usage visibility. Ansible and AWS I haven't used, but Terraform and Azure cover the same concepts.",
    followups: ["Terraform vs Ansible — what's the difference?", "How would you containerise an embedded cross-compilation toolchain?"]
  }
);
