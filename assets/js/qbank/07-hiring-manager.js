/* Question bank — hiring manager round. Loaded by lessons/luxoft/LX11-question-bank.html */
(window.QBANK = window.QBANK || []).push(

  /* ================= Fit & motivation ================= */
  {
    id: "hm-01",
    topic: "hm",
    type: "behavioral",
    q: "Why should we hire you rather than another candidate?",
    vi: "Tại sao chúng tôi nên chọn bạn thay vì một ứng viên khác?",
    tags: ["why hire you", "unique value", "selling point", "fit", "hiring manager", "closing pitch"],
    viTags: ["tại sao chọn bạn", "điểm khác biệt", "giá trị mang lại", "thuyết phục nhà tuyển dụng", "vòng quản lý"],
    key: [
      "Two halves in one person: AUTOSAR integration + CI/automation",
      "Proof: SENT cycle 1–2 months → 2–3 days",
      "Integration point across several BSW teams",
      "Honest about gaps + track record of fast ramp-up",
      "Close with what they get in the first months"
    ],
    answer: "Because this role needs two things that usually come from two different people, and I have both. First, I understand the software being integrated: I was a BSW integrator on RH850 in the CUBAS team, integrating BswM, diagnostics, CAN, COM, EcuM, OS and memory, and debugging integration failures with TRACE32. Second, I know how to turn repetitive engineering work into automation: I led the SENT automation initiative that cut a one-to-two-month validation cycle to two to three days, wired build, package and test into Azure Pipelines with Conan, and I now operate cloud infrastructure with Docker, Kubernetes and Terraform.<br>I'm also honest about the gaps: I haven't used EB tresos or Jenkins in a project. But I've ramped up on new stacks several times, from Classic to Adaptive to platform engineering, and was productive quickly each time. So what you get is someone who can talk to the component teams in their language, keep the integration pipeline green, and improve it with data rather than opinions.",
    followups: ["What would you do in your first month here?", "Which gap in your profile worries you most?"]
  },
  {
    id: "hm-02",
    topic: "hm",
    type: "behavioral",
    q: "Where do you see yourself in three to five years?",
    vi: "Bạn thấy mình ở đâu sau ba đến năm năm nữa?",
    tags: ["career goals", "five years", "career path", "technical lead", "growth", "hiring manager"],
    viTags: ["định hướng nghề nghiệp", "mục tiêu 5 năm", "lộ trình phát triển", "trưởng nhóm kỹ thuật", "kế hoạch tương lai"],
    key: [
      "Own integration + CI for a whole platform project",
      "Go deeper: AUTOSAR stack, safety, ASPICE, CI at scale",
      "From leading an initiative to leading a stable team",
      "Prefer a hands-on technical lead track",
      "Avoid: 'your job' or leaving the domain"
    ],
    answer: "In three to five years I'd like to be the person who owns integration and CI for a whole platform project. That means not just running the pipeline, but deciding the integration strategy, the quality gates and how the team works, and being the technical contact the customer trusts. Technically I want to go deeper in the areas this role touches every day: the AUTOSAR Classic stack end to end, functional safety and ASPICE, and the infrastructure side of CI at scale. On the people side, I want to grow from leading an initiative, which I did with the SENT automation, to leading and developing a stable team. [fill: what you know about Luxoft's technical and management career levels, or turn it into a question]. My preference is a technical lead path where I stay hands-on.",
    followups: ["Technical track or management track?", "What would make you leave a company?"]
  },
  {
    id: "hm-03",
    topic: "hm",
    type: "practical",
    q: "What are your salary expectations?",
    vi: "Mức lương mong muốn của bạn là bao nhiêu?",
    tags: ["salary", "expectation", "negotiation", "compensation", "offer", "package", "hiring manager"],
    viTags: ["lương mong muốn", "đàm phán lương", "deal lương", "thu nhập", "phúc lợi", "chế độ đãi ngộ"],
    key: [
      "Research the market range first [fill]",
      "Give a range, not a single number",
      "Anchor on the role's scope: lead, CI + integration",
      "Total package: bonus, insurance, training, onsite",
      "Know your walk-away number; ask gross or net"
    ],
    answer: "I'd answer calmly with a range I've prepared in advance. Something like: 'Based on nearly four years in AUTOSAR integration and automation, the lead scope of this role, and what I see in the market for similar positions in Ho Chi Minh City, I'm looking for a gross monthly salary in the range of [fill: your range]. I'm flexible depending on the overall package, such as the bonus, insurance, training budget and onsite opportunities, and on the growth path in the role.'<br>If they ask about my current salary: [fill: decide in advance whether you share it or say you'd rather focus on the value of this role]. The important things are to know my walk-away number before the interview, never to name a number lower than I'd actually accept, and to ask whether the figure is gross or net, what the bonus depends on, and how often salaries are reviewed.",
    followups: ["That's above our budget. What would you accept?", "What is your current salary?"]
  },
  {
    id: "hm-04",
    topic: "hm",
    type: "practical",
    q: "When could you start, and what is your notice period?",
    vi: "Khi nào bạn có thể bắt đầu làm việc, và thời gian báo trước nghỉ việc của bạn là bao lâu?",
    tags: ["notice period", "start date", "availability", "handover", "hiring manager"],
    viTags: ["thời gian báo trước", "ngày bắt đầu", "khi nào đi làm", "bàn giao công việc", "nghỉ việc"],
    key: [
      "State the notice period precisely [fill]",
      "Commit to a proper handover",
      "Offer to prepare before the start date",
      "Negotiate with current manager if they have a hard deadline"
    ],
    answer: "My notice period at Bosch is [fill: notice period from your contract], so realistically I could start around [fill: earliest date]. I want to do a proper handover of the platform and tools I operate, because leaving a team with an undocumented system isn't how I'd want my own future team to treat me, and I think that's a good sign for a hiring manager too. If it helps, I can use the time before joining to prepare: go through EB tresos and Jenkins material, and read the project documentation if you can share it. If there's a hard deadline on your side, let me know and I'll see what I can agree with my current manager.",
    followups: ["Could you start earlier?", "Would your current employer make a counter-offer?"]
  },
  {
    id: "hm-11",
    topic: "hm",
    type: "behavioral",
    q: "Are you interviewing with other companies? Do you have other offers?",
    vi: "Bạn có đang phỏng vấn ở công ty khác không? Bạn đã có offer nào khác chưa?",
    tags: ["other offers", "other interviews", "competing offer", "timeline", "hiring manager"],
    viTags: ["offer khác", "phỏng vấn công ty khác", "có nhiều lời mời", "thời hạn trả lời", "lựa chọn công ty"],
    key: [
      "Honest but brief [fill]",
      "No company names needed; no pressure tactics",
      "Say why this role is your strongest interest",
      "Mention a real deadline politely"
    ],
    answer: "I'd be honest and brief. For example: 'Yes, I'm in conversations with [fill: number or kind of companies], but this role is my strongest interest because it combines AUTOSAR integration and CI, which are exactly the two halves of my experience.' I don't name the other companies, and I don't use them as pressure. If I have a real deadline from another offer, I say so politely so they can plan: 'I have an offer with a deadline on [fill: date], so I'd appreciate knowing your timeline.' If I'm not interviewing elsewhere, I simply say I'm looking selectively and this role fits what I want.",
    followups: ["If both offers were equal, how would you decide?"]
  },

  /* ================= Leading & working with people ================= */
  {
    id: "hm-06",
    topic: "hm",
    type: "behavioral",
    q: "This role leads the integration team. How would you lead and develop the team?",
    vi: "Vị trí này dẫn dắt team integration. Bạn sẽ lãnh đạo và phát triển team như thế nào?",
    tags: ["team lead", "leadership", "people development", "ownership", "delegation", "one-to-one", "hiring manager"],
    viTags: ["dẫn dắt team", "quản lý nhóm", "phát triển nhân sự", "phân công công việc", "trưởng nhóm tích hợp", "lãnh đạo"],
    key: [
      "First weeks: listen, learn the pipeline and the people",
      "Clear ownership: pipeline, benches, interfaces, broken-build rotation",
      "Visible work: board + a few metrics, data not feelings",
      "Grow people: pairing, joint reviews, rotate hard tasks",
      "Remove blockers; shield the team from unclear requests"
    ],
    answer: "I'd start by listening: one-to-ones with each person, learning how the pipeline and the release flow really work, and where people feel the pain. I wouldn't change processes in the first weeks without understanding why they exist. Then I'd make ownership clear: who owns which part of the pipeline, the test benches and which component interfaces, plus a rotation for broken-build duty so the load is shared. I'd make the work visible with a board and a few metrics, like build success rate and time to fix a red build, so we discuss data, not feelings. For growth, I'd pair people on hard problems, review scripts and configurations together, and rotate the interesting tasks instead of keeping them for myself. My job as lead is to remove blockers, protect the team from unclear requests, and make sure good work is seen. In the SENT initiative I did the planning, task breakdown and tracking for the team [fill: team size and one thing you learned about leading], and that's what I'd build on.",
    followups: ["How do you handle a senior engineer who resists your changes?", "How do you split your time between hands-on work and leading?"]
  },
  {
    id: "hm-07",
    topic: "hm",
    type: "behavioral",
    q: "One engineer in your team keeps delivering late or with poor quality. What do you do?",
    vi: "Một kỹ sư trong team liên tục giao việc trễ hoặc chất lượng kém. Bạn xử lý thế nào?",
    tags: ["underperformance", "difficult conversation", "feedback", "coaching", "team lead", "hiring manager"],
    viTags: ["thành viên làm chưa tốt", "giao việc trễ", "góp ý nhân viên", "nói chuyện khó", "hỗ trợ đồng nghiệp", "kèm cặp"],
    key: [
      "Talk privately and early; ask, don't assume",
      "Find the cause: clarity, skill, workload, personal",
      "Agree concrete expectations + support",
      "Follow up regularly; recognise progress",
      "No change → line manager and company process"
    ],
    answer: "First, I talk to them privately and early, with concrete examples, and I ask before I conclude anything. Often the cause isn't attitude: the task wasn't clear, a skill is missing, they're overloaded, or something is happening outside work. Then we agree on something specific: what 'done' means for the next tasks, what support they get, for example pairing or a smaller scope, and when we check in again. I follow up regularly and recognise improvement, because people respond to that. Meanwhile I protect the delivery, for example with closer reviews of their changes, without making it a public issue. If nothing changes after a fair period, I bring it to their line manager and follow the company's process; as a technical lead I wouldn't make personnel decisions on my own.",
    followups: ["What if the cause is personal and they don't want to talk about it?"]
  },
  {
    id: "hm-08",
    topic: "hm",
    type: "behavioral",
    q: "What do you do if you disagree with a technical decision made by your manager or the customer?",
    vi: "Bạn làm gì khi không đồng ý với một quyết định kỹ thuật của quản lý hoặc khách hàng?",
    tags: ["disagreement", "push back", "decision making", "disagree and commit", "stakeholder", "hiring manager"],
    viTags: ["bất đồng ý kiến", "không đồng ý với sếp", "phản biện", "tranh luận kỹ thuật", "chấp nhận quyết định"],
    key: [
      "Understand their reasons and constraints first",
      "Raise it once, privately, with data",
      "Propose an alternative or a small experiment",
      "Once decided: commit and execute",
      "Safety/compliance risk → make it documented and visible"
    ],
    answer: "First I make sure I understand why they decided that; there's often a constraint I can't see, like a contract term or a deadline. If I still disagree, I raise it once, clearly and privately, with data: what risk I see, what it costs, and evidence such as logs, measurements or a similar past defect. If possible I propose an alternative or a small experiment to settle it, because that's faster than debating. Once the decision is made, I commit and execute it properly, even if it wasn't my option, and I don't keep reopening it. The exception is safety or compliance: if I think a decision creates a real safety or ASPICE risk, I make sure that risk is documented and visible to the right people, not just mentioned in a meeting. [fill: a real example of a technical disagreement and how it ended]",
    followups: ["What if you turned out to be right afterwards?"]
  },
  {
    id: "hm-12",
    topic: "hm",
    type: "behavioral",
    q: "What kind of manager and team environment helps you do your best work?",
    vi: "Kiểu quản lý và môi trường làm việc nào giúp bạn làm việc tốt nhất?",
    tags: ["work style", "management style", "team culture", "feedback", "autonomy", "hiring manager"],
    viTags: ["phong cách làm việc", "sếp lý tưởng", "môi trường làm việc", "văn hoá team", "tự chủ trong công việc"],
    key: [
      "Clear goals, autonomy on the how",
      "Direct feedback both ways, early",
      "A team that raises problems and improves with data",
      "Show adaptability, not demands"
    ],
    answer: "I work best with a manager who is clear about the goals and priorities and then gives me room to decide how to get there, with short regular check-ins rather than detailed control. I appreciate direct feedback, positive and negative, early rather than at the yearly review, and I try to give the same back. For the team, I like an environment where problems are raised openly, decisions are based on data, and people care about improving how we work, not just closing tickets. That said, at Bosch I've worked in quite different setups, from component validation to a system team to a small platform team, and adapted to each; I don't need a perfect environment to deliver.",
    followups: ["Tell me about the best manager you've had. What did they do?"]
  },
  {
    id: "hm-13",
    topic: "hm",
    type: "behavioral",
    q: "What feedback have you received from your managers, and what did you change because of it?",
    vi: "Bạn đã nhận được những góp ý nào từ quản lý, và bạn đã thay đổi gì sau đó?",
    tags: ["feedback", "self-awareness", "improvement", "performance review", "growth", "hiring manager"],
    viTags: ["nhận góp ý", "phản hồi từ sếp", "tự cải thiện", "đánh giá cuối năm", "điểm cần phát triển"],
    key: [
      "Positive theme: ownership, automation (yearly Best/Outstanding Performance)",
      "One real development point [fill]",
      "Concrete change + result",
      "Show that you ask for feedback"
    ],
    answer: "On the positive side, the recurring feedback was about ownership and turning manual work into automation; I received the Best or Outstanding Performance recognition at department level every year at Bosch, including once at company level. For development, the feedback I remember most was [fill: a real development point, e.g. delegating more instead of doing it myself, or reporting status to management earlier]. What I changed was [fill: the concrete change], and the result was [fill: the result]. I actively ask for this kind of feedback, because it's the fastest way to improve.",
    followups: ["What feedback was hardest to accept?"]
  },

  /* ================= Customer & ways of working ================= */
  {
    id: "hm-05",
    topic: "hm",
    type: "behavioral",
    q: "At Luxoft you work for a customer, often directly with their engineers. How do you communicate with a customer, including when you have to say no or deliver bad news?",
    vi: "Ở Luxoft bạn làm cho khách hàng, thường làm việc trực tiếp với kỹ sư của họ. Bạn giao tiếp với khách hàng thế nào, kể cả khi phải từ chối hoặc báo tin xấu?",
    tags: ["customer communication", "bad news", "saying no", "expectation management", "stakeholder", "outsourcing", "hiring manager"],
    viTags: ["giao tiếp với khách hàng", "báo tin xấu", "từ chối yêu cầu", "quản lý kỳ vọng", "làm việc với khách hàng", "công ty outsource"],
    key: [
      "No surprises: early, factual",
      "Bad news: impact + cause + actions + next update",
      "Saying no = show the trade-off (scope, time, risk)",
      "Align with the PM before committing; confirm in writing",
      "CUBAS: integration point between stakeholders and BSW teams"
    ],
    answer: "The rule I follow is: no surprises. Bad news gets worse with time, so I raise it as soon as I'm confident of the facts, and always in the same shape: what happened, what the impact is, what we know about the cause, what we're doing, and when the next update comes. When a customer asks for something we can't do in the time available, I don't just say no; I make the trade-off visible: we can deliver A by Friday, or A and B by next Wednesday, or reduce the test scope with this specific risk. I align with my project manager before committing to anything that changes scope or dates, and I confirm decisions in writing after a call. At Bosch, as the integration point between project stakeholders and several BSW teams, a lot of my work was exactly this: translating technical issues into impact and decisions. [fill: one real example where you delivered bad news or pushed back]",
    followups: ["The customer insists on an unrealistic date. What now?", "How do you handle a customer who bypasses your manager?"]
  },
  {
    id: "hm-09",
    topic: "hm",
    type: "behavioral",
    q: "Three urgent things land at once: a customer-reported bug, a broken nightly build and a release deadline. How do you prioritise?",
    vi: "Ba việc gấp đến cùng lúc: một bug khách hàng báo, nightly build bị hỏng và deadline release. Bạn ưu tiên thế nào?",
    tags: ["prioritisation", "triage", "broken build", "release", "time management", "delegation", "hiring manager"],
    viTags: ["sắp xếp ưu tiên", "nhiều việc gấp", "build bị hỏng", "áp lực release", "phân chia công việc", "quản lý thời gian"],
    key: [
      "Short triage: impact, who is blocked, real deadline",
      "Broken build blocks everyone: revert first, investigate after",
      "Customer bug: acknowledge + reproduce + estimate fast",
      "Split the work; don't serialise everything on yourself",
      "Tell the PM/customer early what might slip"
    ],
    answer: "I'd spend ten minutes on triage before doing anything: what the impact of each is, who is blocked, and what the real deadline is. A broken nightly or main build usually comes first, because it blocks the whole team and the release as well; often the fastest fix is to revert the breaking change and investigate afterwards. The customer bug needs a quick first response even if the fix comes later: acknowledge it, reproduce it and give an estimate. The release depends on the other two, so I check what's actually at risk. Then I split the work instead of trying to do all three myself: one person on the build, one on reproducing the bug, and I coordinate. Finally I tell the project manager, and the customer if needed, what we're doing and what might slip, early rather than on the deadline.",
    followups: ["What if the customer bug is safety-relevant?"]
  },
  {
    id: "hm-10",
    topic: "hm",
    type: "practical",
    q: "Are you open to overtime, business trips or working onsite at the customer?",
    vi: "Bạn có sẵn sàng làm thêm giờ, đi công tác hoặc làm việc onsite tại khách hàng không?",
    tags: ["overtime", "business trip", "onsite", "travel", "flexibility", "hiring manager"],
    viTags: ["làm thêm giờ", "tăng ca", "đi công tác", "onsite nước ngoài", "làm việc tại khách hàng"],
    key: [
      "Be honest about real constraints [fill]",
      "Overtime: yes for real peaks, not as a permanent plan",
      "Permanent overtime = signal to fix the process",
      "Onsite: a chance to build customer trust",
      "Ask about typical frequency and duration"
    ],
    answer: "Yes, within reason. For overtime, I'm fine with extra effort around real peaks like a release or a critical customer issue; that's part of an integration role. If overtime becomes permanent, I see it as a signal to fix something, for example CI stability or planning, and I'd raise it. For business trips or onsite work, I'm [fill: your real availability, e.g. open to trips of a few weeks up to a few months]. I actually see onsite time as valuable: working next to the customer's engineers builds trust and makes the remote collaboration much easier afterwards. May I ask how often the team typically goes onsite, and for how long?",
    followups: ["Could you relocate for a long-term onsite assignment?"]
  },
  {
    id: "hm-16",
    topic: "hm",
    type: "behavioral",
    q: "How do you work with distributed teams across time zones, for example Vietnam and Europe?",
    vi: "Bạn làm việc với các team ở nhiều múi giờ khác nhau, ví dụ Việt Nam và châu Âu, như thế nào?",
    tags: ["distributed team", "time zones", "remote collaboration", "async communication", "handover", "hiring manager"],
    viTags: ["làm việc từ xa", "lệch múi giờ", "team đa quốc gia", "giao tiếp bất đồng bộ", "bàn giao cuối ngày"],
    key: [
      "Use overlap hours for discussion and decisions",
      "Async by default: tickets with context, logs, repro steps",
      "Handover note at the end of the day",
      "Explicit owners and response times",
      "Build trust: cameras on, onsite visits when possible"
    ],
    answer: "The overlap window is small, so I use it for things that need discussion and decisions, and handle everything else asynchronously. That means good written communication: tickets with enough context to act on, logs and reproduction steps attached, and a short handover note at the end of my day so the other site can continue without waiting for me. I make owners and expected response times explicit, so nothing falls between sites. And I invest in the relationship: cameras on in calls, being responsive, and meeting in person when there's an onsite chance, because trust makes asynchronous work much faster. [fill: your experience with international or multi-site teams at Bosch, if any]",
    followups: ["How do you handle a blocking question when the other site is offline?"]
  },
  {
    id: "hm-14",
    topic: "hm",
    type: "behavioral",
    q: "Your current work is on AI tools. Would you use AI in this role, and how do you handle confidentiality?",
    vi: "Công việc hiện tại của bạn là về AI tools. Bạn có dùng AI trong vị trí này không, và bạn đảm bảo bảo mật thông tin thế nào?",
    tags: ["AI tools", "LLM", "productivity", "confidentiality", "data protection", "governance", "hiring manager"],
    viTags: ["dùng ai trong công việc", "bảo mật thông tin", "bảo mật mã nguồn", "công cụ ai", "tăng năng suất"],
    key: [
      "Yes, as a productivity tool: scripts, log triage, docs",
      "The engineer stays responsible; review and test everything",
      "Only customer- and Luxoft-approved tools",
      "No customer code or data in public AI services",
      "Current job: access control and governance for AI tools"
    ],
    answer: "Yes, where it helps and where it's allowed. From my AI platform work I know where these tools are useful in engineering: drafting pipeline scripts, summarising long build or test logs, searching documentation and writing first drafts of reports. But the engineer stays responsible: everything generated is reviewed and tested like any other code, and nothing safety-relevant is decided by a tool. On confidentiality, customer source code, requirements and data only go into tools approved by the customer and by Luxoft, never into a public service, and I follow the project's policy. Part of my current job is setting up access control and governance for AI tools, so I take that seriously.",
    followups: ["What would you automate first with AI in an integration team?"]
  },

  /* ================= Your questions ================= */
  {
    id: "hm-15",
    topic: "hm",
    type: "practical",
    q: "What questions would you ask the hiring manager at the end of the interview?",
    vi: "Bạn sẽ hỏi hiring manager những câu gì ở cuối buổi phỏng vấn?",
    tags: ["questions for hiring manager", "reverse questions", "expectations", "career growth", "team setup", "next steps", "hiring manager"],
    viTags: ["câu hỏi ngược cho quản lý", "hỏi hiring manager", "kỳ vọng công việc", "cơ hội thăng tiến", "bước tiếp theo", "hỏi về team"],
    key: [
      "Success after 3 / 6 / 12 months?",
      "Team: size, sites, reporting line",
      "Project: phase, roadmap, stability",
      "Growth: career tracks, training, performance review",
      "Biggest challenge now; next steps in the process"
    ],
    answer: "The hiring manager round is less about tools and more about expectations, the team and growth, so I'd pick three or four of these. 'What would success look like in this role after three, six and twelve months?' 'How is the integration team set up: its size, the sites, and who I would report to and work with day to day?' 'Which phase is the project in, and what does the roadmap look like for the next one or two years?' 'What is the biggest challenge the team is facing right now?' 'How does career development work here, for example technical versus management tracks, training and certifications, and how is performance reviewed?' And at the end: 'What are the next steps in the process, and when can I expect to hear back?' The technical questions about the pipeline and the AUTOSAR stack are in intro-16; I'd keep those for the technical interviewer.",
    followups: ["(Skip anything the interviewer already answered during the interview)"]
  }
);
