/* Question bank — process, linux. Loaded by lessons/luxoft/LX11-question-bank.html */
(window.QBANK = window.QBANK || []).push(
  {
    id: "process-01",
    topic: "process",
    type: "behavioral",
    q: "Walk me through the SDLC phases. Which ones have you personally worked in?",
    tags: ["SDLC", "lifecycle", "phases", "requirement", "delivery", "vòng đời phần mềm"],
    key: ["Req → design → code → integrate → test → deliver → maintain", "Me: req analysis, design docs, test design", "Me: integration, debugging, defect resolution", "Me: delivery coordination, automation lead"],
    answer: "The classic phases are requirement analysis, architecture and detailed design, implementation, integration, verification and validation, release or delivery, and then maintenance. In my nearly four years at Bosch I touched almost all of them. In the AUTOSAR Classic role I started from <strong>requirement analysis</strong> and test design for MCAL and BSW, wrote and maintained technical and design documentation in Enterprise Architect and IBM Rhapsody, executed validation on target hardware and VECU, and worked as a <strong>BSW integrator</strong> on RH850, which meant integration, debugging and defect resolution with the component teams. I also owned traceability, test evidence and review readiness. Later, as automation lead for the SENT stack, I covered planning, task breakdown, execution and delivery. The phase I did least is writing production application code from scratch; my strength is the right side of the V and the glue between phases: integration, verification and evidence.",
    followups: ["Which phase do you find most error-prone?", "How did you hand over between phases?"]
  },
  {
    id: "process-02",
    topic: "process",
    type: "theory",
    q: "Explain the V-model in automotive and how the left side maps to the right side.",
    tags: ["V-model", "verification", "validation", "left side", "right side", "mô hình chữ V"],
    key: ["Left: system req → SW req → architecture → detailed design/code", "Right: unit → integration → SW qualification → system test", "Each right level verifies its left counterpart", "Traceability links the two sides"],
    answer: "The V-model puts specification and design on the left, going from abstract to concrete, and verification on the right, going back up. At the top-left you have system requirements and system architecture, then software requirements, software architecture, detailed design and code at the bottom. Each level on the right checks its partner on the left: <strong>unit verification</strong> checks the detailed design, <strong>integration test</strong> checks the software architecture and its interfaces, <strong>software qualification</strong> checks the software requirements, and system integration and system test check the system level. In ASPICE terms that is SWE.3 to SWE.4, SWE.2 to SWE.5 and SWE.1 to SWE.6. The important point is that test cases on the right should be designed while the left side is written, and linked with traceability. In practice my work sat mainly on the right: unit and component validation for MCAL, BSW integration on RH850, and system-level testing for the Adaptive stack.",
    followups: ["How does Agile fit with the V-model?", "Where do most defects escape in the V?"]
  },
  {
    id: "process-03",
    topic: "process",
    type: "theory",
    q: "What is Automotive SPICE and how is it structured?",
    tags: ["ASPICE", "Automotive SPICE", "process groups", "SWE", "SUP", "MAN", "VDA scope", "quy trình"],
    key: ["Process assessment model for suppliers", "Groups: SYS, SWE, SUP, MAN, ACQ...", "VDA scope: SYS.2–5, SWE.1–6, SUP.1/8/9/10, MAN.3", "OEM target usually CL2, sometimes CL3", "Version 4.0 (2023) replaced 3.1"],
    answer: "Automotive SPICE is a process assessment model that OEMs use to judge how capable a supplier's development process is. It has a process reference model, which defines processes and their outcomes, and a measurement framework with capability levels. Processes are grouped: <strong>SYS</strong> for system engineering, <strong>SWE</strong> for software engineering, <strong>SUP</strong> for supporting processes like quality assurance, configuration management, problem resolution and change requests, <strong>MAN</strong> for management, plus acquisition and supply. Version 4.0 from 2023 also added hardware, machine learning and validation groups. The set OEMs usually assess is the <em>VDA scope</em>: SYS.2 to SYS.5, SWE.1 to SWE.6, SUP.1, SUP.8, SUP.9, SUP.10 and MAN.3, typically targeting capability level 2. In my AUTOSAR Classic role I worked under ASPICE expectations: requirement analysis, requirement-to-test mapping, test evidence and review readiness were my responsibility, so I know the practical side: what evidence is needed and how to keep it consistent.",
    followups: ["What changed from 3.1 to 4.0?", "Which processes matter most for an integrator?"]
  },
  {
    id: "process-04",
    topic: "process",
    type: "theory",
    q: "Briefly describe SWE.1 to SWE.6.",
    tags: ["SWE.1", "SWE.2", "SWE.3", "SWE.4", "SWE.5", "SWE.6", "ASPICE", "software engineering"],
    key: ["SWE.1 SW requirements analysis", "SWE.2 SW architectural design", "SWE.3 detailed design & unit construction", "SWE.4 unit verification", "SWE.5 component + integration verification", "SWE.6 SW verification vs SWE.1"],
    answer: "<strong>SWE.1</strong> is software requirements analysis: derive software requirements from system requirements, structure and prioritise them, and analyse their impact. <strong>SWE.2</strong> is software architectural design: components, interfaces and dynamic behaviour, including resource considerations. <strong>SWE.3</strong> is detailed design and unit construction, which is where the code comes from. Then the right side: <strong>SWE.4</strong> unit verification checks units against the detailed design; <strong>SWE.5</strong>, called 'Software Component Verification and Integration Verification' in 4.0 and 'Software Integration and Integration Test' in 3.1, integrates components according to a strategy and verifies them against the architecture; <strong>SWE.6</strong> verifies the integrated software against the software requirements. Every process needs bidirectional traceability and consistency, and results must be summarised and communicated. My hands-on work was SWE.4-style unit and component validation for MCAL driver groups, SWE.5 as a BSW integrator on RH850, and the traceability that ties them to SWE.1.",
    followups: ["What are the outputs of SWE.5?", "What is the difference between SWE.6 and SYS.5?"]
  },
  {
    id: "process-05",
    topic: "process",
    type: "theory",
    q: "What are ASPICE capability levels, and what does level 2 really require?",
    tags: ["capability level", "CL2", "CL3", "managed", "established", "NPLF", "ASPICE", "mức năng lực"],
    key: ["CL0 incomplete, CL1 performed", "CL2 managed: planned, monitored, work products controlled", "CL3 established: org standard process tailored", "Rating N/P/L/F per process attribute"],
    answer: "Level 0 is <strong>incomplete</strong>: the process outcomes are not achieved. Level 1 is <strong>performed</strong>: the work gets done and the outcomes exist, even if in an ad-hoc way. Level 2 is <strong>managed</strong>: the process is planned, monitored and adjusted, responsibilities and resources are defined, and work products are identified, reviewed and put under configuration control. Level 3 is <strong>established</strong>: the organisation has a standard process that projects tailor, and it's improved based on experience. Levels 4 and 5 add quantitative control and continuous improvement, but OEMs rarely ask for them. Each process attribute is rated N, P, L or F: not, partially, largely or fully achieved. In practice, level 2 means you can show a plan with estimates, tracking against it, who is responsible, and that your specs and reports are reviewed, versioned and baselined. That is exactly why disciplined Jira tracking, reviews and baselines matter; without them a team can do good work and still land at level 1.",
    followups: ["What is typically missing when a project fails CL2?", "How do you show 'work product management'?"]
  },
  {
    id: "process-06",
    topic: "process",
    type: "practical",
    q: "As a BSW integrator, how did you approach integration strategy and integration testing (SWE.5)?",
    tags: ["SWE.5", "integration strategy", "integration test", "BSW", "RH850", "CUBAS", "tích hợp"],
    key: ["Strategy: order, baseline, environment defined upfront", "Bottom-up: MCAL → services → ECU mgmt/comm/diag", "Integration tests derived from architecture & interfaces", "Results tied to a specific baseline", "Failures reproduced, triaged, owned by component team"],
    answer: "In the CUBAS integration team on RH850 D3, D4 and D5 I integrated and validated BswM, Diag, Can, Com, EcuM, OS, MCAL and Mem. An integration strategy answers: in what order, from which component versions, in which environment, and with what pass criteria. For a BSW stack a <strong>bottom-up</strong> order is natural: first a startup skeleton of MCAL, OS, EcuM and a minimal BswM so the ECU boots, then memory and communication, then diagnostics and the full mode rules, because each layer depends on the one below. Integration tests are derived from the architecture: interfaces between modules, startup and shutdown sequences, mode transitions, communication paths end-to-end. Each result must be linked to the exact baseline of component versions. When something failed, I reproduced it, analysed which interface or dependency was involved, and coordinated the fix with the owning BSW team, often using TRACE32 for register, memory and trace inspection. For example, [fill: one concrete integration issue you resolved, e.g. which modules and what the root cause was].",
    followups: ["Bottom-up versus big-bang: when would you choose each?", "How do you decide a component version is ready to integrate?"]
  },
  {
    id: "process-07",
    topic: "process",
    type: "practical",
    q: "What is bidirectional traceability and consistency, and how did you maintain it?",
    tags: ["traceability", "bidirectional", "consistency", "requirement-to-test", "ASPICE", "truy vết", "ma trận truy vết"],
    key: ["Req ↔ design ↔ code ↔ test case ↔ result", "Forward: every req is covered", "Backward: every test/code has a reason", "Consistency: content matches, not just a link", "Maintain continuously, re-check on every change"],
    answer: "Traceability means every requirement links to the design elements, code and test cases that realise and verify it, and to the test results. <strong>Bidirectional</strong> means you can go both ways: forward from a requirement to see it's covered, and backward from a test or a piece of code to see which requirement justifies it, which catches orphan tests and gold-plating. <strong>Consistency</strong> is the part people forget: the link must be correct in content, so the test actually checks what the requirement says, at the current version. In my AUTOSAR Classic role I owned requirement analysis, traceability and requirement-to-test mapping for MCAL and BSW validation. My habits were: link at the moment I create a test case, not at the end; tag test results with requirement IDs so reports can be generated; and when a requirement changes, run an impact check on every linked test. The tool we used was [fill: requirement/ALM tool used, e.g. DOORS, Polarion, codebeamer], and coverage gaps were reviewed [fill: how often / in which review].",
    followups: ["What happens to traceability when a requirement is deleted?", "How would you automate a coverage check?"]
  },
  {
    id: "process-08",
    topic: "process",
    type: "practical",
    q: "An ASPICE assessor is coming. What will they ask for, and what work products and evidence do you prepare?",
    tags: ["assessment", "assessor", "evidence", "work product", "information item", "ASPICE", "bằng chứng"],
    key: ["Assessor samples: pick one req, follow it end to end", "Specs, strategies, test reports, review records", "Results tied to a baseline", "Defects & change requests linked to commits", "Evidence produced daily, not before audit"],
    answer: "Assessors usually <strong>sample</strong>. They pick one requirement and ask: where is it in the architecture, which test verifies it, what was the result, on which baseline, and who reviewed the test. Then they pick a defect and follow it from report through analysis, fix, commit and retest. So the evidence I prepare is: requirement and design specifications under version control, an integration or test strategy, test specifications with traceability, test reports linked to a baseline, review records with findings and closure, and defect and change tickets linked to commits. For level 2 they also want the plan, the tracking and proof that work products are controlled. In my MCAL and BSW role, test evidence and review readiness were my responsibility, so I learned that the best preparation is generating evidence as a side effect of daily work: consistent IDs, results exported automatically with the version, and reviews recorded in the tool. Then an assessment is a demo, not a scramble.",
    followups: ["What is a typical weakness assessors find?", "How does CI help with ASPICE evidence?"]
  },
  {
    id: "process-09",
    topic: "process",
    type: "behavioral",
    q: "You owned review readiness. What does 'ready for review' mean to you?",
    tags: ["review readiness", "review", "checklist", "work product", "quality", "sẵn sàng review"],
    key: ["Complete: all reqs covered, no TODOs", "Traced: links present and consistent", "Evidence attached, tied to version", "Self-check against checklist first", "Findings recorded and closed"],
    answer: "For me a work product is ready for review when the reviewer can spend their time on the content, not on chasing missing pieces. Concretely: every in-scope requirement has at least one linked test case, and links are consistent with the current requirement version; test results are attached and tied to the exact software version or baseline; there are no open placeholders; and the document follows the template and naming rules. Before inviting anyone I did a <strong>self-review against the checklist</strong>, because the cheapest findings are the ones you catch yourself. During the review, findings are recorded in the tool, each one gets an owner, and closure is verified, since an assessor will look for that trail. In my AUTOSAR Classic role this was part of my ownership for MCAL and BSW validation. The biggest improvement came from [fill: a concrete habit or small automation you introduced for review preparation, if any].",
    followups: ["How do you handle a reviewer who disagrees with you?", "What goes on a review checklist for a test spec?"]
  },
  {
    id: "process-10",
    topic: "process",
    type: "theory",
    q: "What is configuration management (SUP.8)? Define configuration item and baseline.",
    tags: ["configuration management", "SUP.8", "configuration item", "baseline", "CM", "quản lý cấu hình"],
    key: ["CI = anything affecting the binary or evidence", "Source, configs, toolchain version, scripts, specs", "Baseline = named, immutable, agreed set", "Integration baselines vs release baselines", "Change control on baselined items"],
    answer: "Configuration management is about identifying, controlling and storing everything that makes up the product, so you can always say exactly what went into a build and recreate it. A <strong>configuration item</strong> is anything that influences the binary or the evidence: source code, AUTOSAR configuration and ARXML, generated code, build scripts, the compiler and tool versions, test specifications, requirements and documents. A <strong>baseline</strong> is a named, immutable snapshot of an agreed set of configuration items at a point in time. You typically have frequent integration baselines and formal release baselines that go through approval. SUP.8 also covers branching strategy, change control on baselined items, status reporting, and verifying that baselines are complete and consistent. For an integrator this is daily work: every integration test result only means something if you know which baseline it ran on. In my BSW integration role, results were always tied to the specific component versions integrated. [fill: how baselines were named/managed in your project].",
    followups: ["Is the compiler a configuration item?", "How do you handle generated code in CM?"]
  },
  {
    id: "process-11",
    topic: "process",
    type: "practical",
    q: "How do you ensure reproducible builds, and what goes into release notes?",
    tags: ["reproducible build", "release notes", "baseline", "toolchain", "Conan", "Docker", "tái tạo build"],
    key: ["Pin toolchain and dependency versions", "Build from a tag, in a versioned environment", "Store artifacts + build info immutably", "Release notes: version, changes, known issues", "Include test results, component versions, checksums"],
    answer: "A reproducible build means that from an old tag I can rebuild the same binary, or a verified equivalent, months later when a customer reports a bug. The ingredients are: build only from a tagged commit, <strong>pin every dependency</strong> version, pin the toolchain, ideally in a versioned container image, and store the resulting artifacts together with build information so you never rebuild just to debug. In the ARA automation work I integrated build, package and test workflows with <strong>Azure Pipelines and Conan</strong>, and Conan helped exactly here: package versions are explicit, so the pipeline pulls the same dependencies every time. I also know Docker from my platform work, which is a natural way to freeze a build environment. Release notes should state the version and baseline, the list of changes with change-request and defect IDs, known issues and limitations, test results summary, component and toolchain versions, and artifact checksums. The customer and the assessor both use them to know exactly what they received.",
    followups: ["What breaks reproducibility most often?", "How would you verify two builds are identical?"]
  },
  {
    id: "process-12",
    topic: "process",
    type: "practical",
    q: "What Git branching strategy would you use as an integrator, and how do tags act as baselines?",
    tags: ["Git", "branching", "release branch", "tag", "baseline", "trunk-based", "nhánh"],
    key: ["Main always buildable, small reviewed changes", "Cut release/X.Y when scope is frozen", "Release branch: reviewed bug fixes only", "Fix on main first, cherry-pick -x down", "Annotated tags per delivery, never moved"],
    answer: "I prefer a mostly <strong>trunk-based</strong> model: developers merge small, reviewed changes into main, and CI keeps main buildable. When the scope of a delivery is frozen, we cut a <strong>release branch</strong> like release/2.3. From then on it only accepts bug fixes with a ticket and approval, no new features. The rule is to fix on main first and then <code>cherry-pick -x</code> onto the release branches that still need it, so the fix doesn't disappear in the next release. Every delivery gets an <strong>annotated tag</strong>, which records who, when and why; that tag is the baseline for Git content and must never be moved or deleted. Commit messages carry the Jira ID so defects and change requests trace to commits. I've used Git and Jira daily, and I built an internal tool, Pullogic, for pull-request review integrated with Jira, which won an internal award, so the link between reviews, commits and tickets is something I care about. [fill: branching model your team actually used].",
    followups: ["How do you track which fixes are missing on a release branch?", "What if a fix only applies to the release branch?"]
  },
  {
    id: "process-13",
    topic: "process",
    type: "theory",
    q: "Merge versus rebase versus cherry-pick: when do you use each?",
    tags: ["Git", "merge", "rebase", "cherry-pick", "squash", "revert", "history"],
    key: ["Merge: keeps both histories, visible merge point", "Rebase: linear history, rewrites hashes", "Never rebase shared branches", "Cherry-pick -x: single fix to release branch", "Revert, not reset, on shared branches"],
    answer: "<strong>Merge</strong> joins two branches with a merge commit and keeps the original history. It's good when you want to see where a feature came in. <strong>Rebase</strong> replays my commits on top of the target branch, giving a linear history that's easy to read and bisect, but it rewrites commit hashes, so I only rebase my own local or feature branch before review, never a branch others have pulled. <strong>Cherry-pick</strong> copies a single commit to another branch; the typical use is bringing a bug fix from main down to a release branch, with <code>-x</code> so the message records the original hash for traceability. It's risky for a series of dependent commits because you can miss one. Two related ones: <strong>squash</strong> cleans up 'wip' commits before merging, unless each commit has its own traceability meaning, and <strong>revert</strong> is how you back out a broken change on a shared branch, because reset plus force-push on a shared or release branch is never acceptable.",
    followups: ["How do you resolve a conflict in generated code?", "Who should resolve an integration conflict?"]
  },
  {
    id: "process-14",
    topic: "process",
    type: "practical",
    q: "Last week's baseline passed, today's fails and there are 200 commits in between. How do you find the breaking commit?",
    tags: ["git bisect", "regression", "breaking commit", "binary search", "baseline", "tìm commit lỗi"],
    key: ["git bisect = binary search over commits", "~8 steps for 200 commits (log2)", "Automate with bisect run + smoke script", "Exit 125 = skip unbuildable commit", "Save bisect log as ticket evidence"],
    answer: "I'd use <code>git bisect</code>, which is a binary search: mark today's commit bad and the last good baseline tag good, and Git checks out the midpoint for me to test. With 200 commits that's about eight build-and-test rounds. The key is automating it with <code>git bisect run</code> and a small script that builds and runs only the failing test: exit 0 means good, 1 to 127 means bad, and 125 means skip, for commits that don't build. First I make sure the failure is <strong>reproducible and deterministic</strong>, otherwise bisect gives a false answer; for flaky failures I'd run the test several times per step. Once found, I save the bisect log in the ticket as evidence, contact the commit author, and decide between a quick revert to get main green and a proper fix. On a multi-repo baseline you first bisect at the level of component versions, then inside the repo. [fill: whether you have used bisect in a real project; if not, say so and that this is how you would apply it].",
    code: "git bisect start\ngit bisect bad  HEAD\ngit bisect good REL_2.3.0          # last passing baseline tag\ngit bisect run ./ci/build_and_smoke.sh\n#   exit 0 -> good, 1..127 -> bad, 125 -> skip\ngit bisect log > bisect.txt       # evidence for the ticket\ngit bisect reset",
    lang: "bash",
    followups: ["What if the failure is intermittent?", "What if the bad commit is a merge commit?"]
  },
  {
    id: "process-15",
    topic: "process",
    type: "theory",
    q: "Describe the defect lifecycle and what SUP.9 Problem Resolution expects.",
    tags: ["defect lifecycle", "SUP.9", "problem resolution", "bug", "Jira", "triage", "vòng đời lỗi"],
    key: ["New → analysed → assigned → fixed → verified → closed", "Record: version, steps, logs, severity", "Root cause + impact analysis", "Fix linked to commit and retest", "Track trends, escalate per strategy"],
    answer: "A defect typically goes <strong>New, Analysed or Triaged, Assigned, In Progress, Resolved, Verified, Closed</strong>, with side states like Rejected, Duplicate or Deferred. SUP.9 wants a problem resolution strategy, and every problem recorded with a unique ID, the affected version, reproduction steps and evidence, and classified by severity and priority. Then analysis to find the cause and impact, including which other releases are affected, an authorised fix, verification that it's resolved, and closure. The process also expects trend tracking and an escalation path for critical issues. In my integration work the biggest quality factor was the <strong>first report</strong>: exact baseline, target, configuration, logs or TRACE32 traces and a minimal reproduction. That turns a week of back and forth into a day. The fix must link to the commit and the retest result, and if the escape was a test gap I added the missing test so the regression suite covers it. In Jira that trail is visible end to end.",
    followups: ["How do you prioritise defects near a release?", "Who decides a defect is 'not a bug'?"]
  },
  {
    id: "process-16",
    topic: "process",
    type: "behavioral",
    q: "How do you handle a requirement change mid-project (SUP.10 Change Request)?",
    tags: ["change request", "SUP.10", "requirement change", "impact analysis", "yêu cầu thay đổi"],
    key: ["Formal CR, not a hallway agreement", "Impact analysis: design, code, tests, schedule", "Approve by CCB/owner before work", "Update traceability and tests", "Communicate, verify, close"],
    answer: "First, I make sure the change comes in as a <strong>change request</strong> with an ID, not as an informal message, because otherwise it breaks traceability and nobody can explain later why behaviour changed. Then an <strong>impact analysis</strong>: which requirements, design elements, components and test cases are affected, what's the effort and risk, and which releases need it. The change is approved by whoever owns scope, for example a change control board or the project lead, before we start. After implementation I update the requirement links, rework or add the affected tests, rerun the regression, and close the CR with evidence. Since I owned traceability and requirement-to-test mapping in my MCAL and BSW work, my specific concern was keeping links consistent: a changed requirement flags every linked test for review. In Agile, the change goes into the backlog and is planned into a sprint, but the analysis and approval trail still has to exist. [fill: an actual requirement change you handled and its impact].",
    followups: ["What if the customer pushes for the change without a CR?", "How do you estimate impact quickly?"]
  },
  {
    id: "process-17",
    topic: "process",
    type: "behavioral",
    q: "You led the SENT automation initiative. How did you plan, break down and track the work?",
    tags: ["project monitoring", "planning", "task breakdown", "Jira", "burndown", "MAN.3", "SENT", "automation lead", "lập kế hoạch"],
    key: ["Goal: cut SENT validation from ~1–2 months to 2–3 days", "Break down: workflow design → framework → cases → CI → rollout", "Jira epics/stories, sprint planning", "Track burndown, blockers, dependencies", "Deliver incrementally, measure against manual baseline"],
    answer: "The goal was clear and measurable: the manual SENT validation cycle took roughly <strong>one to two months</strong>, and we wanted it automated. I started by mapping the manual workflow and deciding what to automate first, then broke it into epics in Jira: workflow and framework design, test case implementation, execution and reporting, and CI integration. Each epic became stories small enough for a sprint, with clear acceptance criteria. For tracking I used the sprint board and the <strong>burndown</strong>, plus a short list of blockers and cross-team dependencies such as [fill: e.g. hardware/bench availability, stack releases]. I delivered incrementally, so the team could use parts of the automation before the whole thing was finished, which also gave early feedback. The result was that the full cycle came down to <strong>two to three days</strong>. What I'd highlight is that the plan was reviewed every sprint and adjusted: [fill: one concrete re-planning decision you made]. The team size was [fill: team size].",
    followups: ["What was the biggest risk and how did you mitigate it?", "How did you measure the 2–3 day figure?"]
  },
  {
    id: "process-18",
    topic: "process",
    type: "behavioral",
    q: "How do you manage risks and dependencies across teams, and how do you report status?",
    tags: ["risk management", "dependency", "status report", "cross-team", "coordination", "quản lý rủi ro", "phụ thuộc"],
    key: ["Risk list: probability, impact, owner, mitigation", "Dependencies with dates and contacts", "Escalate early, with options", "Status: done / next / blockers / risks", "Facts and trend, not just green"],
    answer: "I keep a simple, living <strong>risk list</strong>: each risk has a probability, impact, owner and a mitigation or trigger for action, and I review it at every sprint planning. <strong>Dependencies</strong> get the same treatment: what I need, from whom, by when, and what happens if it's late. As a BSW integrator I was the point between project stakeholders and several BSW component teams, so dependency coordination was daily work: aligning interface versions, agreeing when a fix would land, and making sure a blocked integration had a named owner. My rule is to escalate early and come with options, not just a problem. For status reporting I use a fixed structure: what's done, what's next, blockers, risks, and a trend, such as burndown or open defects. I avoid 'everything is green' reports; a clear amber with a mitigation plan is more useful to a manager. [fill: one real dependency or risk you escalated and the outcome].",
    followups: ["What do you do when another team keeps missing dates?", "How often do you report status?"]
  },
  {
    id: "process-19",
    topic: "process",
    type: "theory",
    bridge: true,
    q: "What is 8D? Explain the steps and the difference between containment and permanent corrective action.",
    tags: ["8D", "Eight Disciplines", "D3", "D5", "containment", "corrective action", "root cause", "giải quyết vấn đề"],
    key: ["D0 prep, D1 team, D2 problem (5W2H, is/is-not)", "D3 interim containment: protect customer now", "D4 root cause: occurrence + escape", "D5 choose/verify PCA, D6 implement/validate", "D7 prevent recurrence systemically, D8 recognise team"],
    answer: "8D is a team-based structured problem-solving method from automotive, often requested by OEMs for customer complaints. <strong>D0</strong> is preparation and emergency response; <strong>D1</strong> forms a cross-functional team; <strong>D2</strong> describes the problem precisely with 5W2H and is/is-not; <strong>D3</strong> is interim containment; <strong>D4</strong> finds the root cause, both why it occurred and why it escaped our tests and reviews; <strong>D5</strong> selects and verifies permanent corrective actions; <strong>D6</strong> implements them and confirms effectiveness, then removes the containment; <strong>D7</strong> prevents recurrence by changing the system, for example adding regression tests or updating checklists and applying the lesson to similar products; <strong>D8</strong> closes and recognises the team. The key distinction: <strong>containment</strong> protects the customer immediately without knowing the cause, for example stopping delivery or rolling back to the previous baseline, while the <strong>permanent corrective action</strong> removes the root cause. To be honest, I haven't written a formal 8D report myself, but my defect investigations followed the same logic.",
    followups: ["What is an escape root cause?", "How do you prove a root cause?"]
  },
  {
    id: "process-20",
    topic: "process",
    type: "behavioral",
    bridge: true,
    q: "Tell me about a defect you solved in a structured way. Can you map it to 8D?",
    tags: ["8D", "SENT", "defect investigation", "root cause", "UDE", "ST", "Infineon", "timing", "phân tích nguyên nhân"],
    key: ["Honest: no formal 8D report, same steps", "D2: SENT timing/signal issue, is vs is-not targets", "D4: UDE debugger, HW/SW + protocol timing", "D5–D6: fix verified on ST and Infineon", "D7: later automated SENT validation"],
    answer: "I haven't run a formal 8D report, but my SENT defect investigation followed the same steps. <strong>D1</strong>: the people involved were me and [fill: who, e.g. the SENT driver developer, target owner]. <strong>D2</strong>: the symptom was a SENT timing and signal-behaviour defect, specifically [fill: exact symptom]. Using is/is-not, it happened on [fill: target/configuration] but not on [fill: where it worked], which narrowed the suspects a lot. <strong>D3</strong>: as containment we [fill: workaround or holding the previous version, or 'none needed' if not delivered]. <strong>D4</strong>: I used the UDE Debugger to analyse hardware/software interaction and protocol-level timing, and found [fill: root cause]. The escape reason was [fill: why earlier tests missed it]. <strong>D5 and D6</strong>: the fix was [fill: fix], verified on both ST and Infineon targets. <strong>D7</strong>: in my next role I led the SENT automation, so this kind of behaviour gets checked repeatably instead of relying on manual testing. [fill: only claim this link if it is true for you].",
    followups: ["How did you confirm it was the real root cause?", "What would you do differently now?"]
  },
  {
    id: "process-21",
    topic: "process",
    type: "practical",
    bridge: true,
    q: "Which structured problem-solving tools do you know: 5-Why, Ishikawa, is/is-not? How do you apply them?",
    tags: ["5-Why", "5 Why", "Ishikawa", "fishbone", "is/is-not", "root cause analysis", "RCA", "structured problem solving"],
    key: ["Is/is-not: narrow where it does and doesn't happen", "Ishikawa: brainstorm causes by category", "5-Why: drill one chain to a system cause", "Always ask the escape 'why' too", "Prove by switching the defect on/off"],
    answer: "I use them in a natural order. <strong>Is/is-not</strong> comes first: where, when and on what does the problem happen, and where could it happen but doesn't. For example, it fails on one target but not another, or on today's baseline but not last week's. That comparison usually points straight at the difference. <strong>Ishikawa</strong>, the fishbone, is for brainstorming possible causes by category when the space is wide; for embedded I use categories like software, configuration, hardware, tools, test environment and process. Then <strong>5-Why</strong> drills down one confirmed chain until you reach a cause you can fix in the system, not just the symptom. I also ask a separate 'why wasn't it caught' chain for the escape. Most importantly, a root cause is only proven if you can turn the defect on and off. I haven't used these as formal workshop artefacts, but this is how I worked through integration failures and the SENT timing defects: compare good and bad, narrow down, prove with the debugger.",
    followups: ["When does 5-Why go wrong?", "Give an example of an escape root cause."]
  },
  {
    id: "process-22",
    topic: "process",
    type: "practical",
    q: "You used Enterprise Architect and IBM Rhapsody. Which UML diagrams did you use and why?",
    tags: ["UML", "Enterprise Architect", "EA", "IBM Rhapsody", "sequence diagram", "state machine", "component diagram", "sơ đồ"],
    key: ["Component: modules and interfaces (architecture)", "Sequence: startup, calls, timing between modules", "State machine: modes, e.g. ECU/BSW states", "Class/structure: data types and relationships", "Model kept under version control, reviewed"],
    answer: "I created and maintained technical and design documentation with Enterprise Architect and IBM Rhapsody. I pick the diagram by the question it answers. A <strong>component diagram</strong> shows modules and their provided and required interfaces, which is the architecture view and the basis for integration tests. A <strong>sequence diagram</strong> shows the order of calls between modules, for example an initialisation or a request-response flow, and it's the diagram reviewers understand fastest. A <strong>state machine</strong> diagram fits anything mode-based, like ECU state or communication mode handling, where missing transitions are a classic defect source. <strong>Class or structure diagrams</strong> describe data types and relationships. The value is that the model is one source: the same element appears in several diagrams consistently, and it can be traced to requirements. I treat models like code: versioned, reviewed, and updated with the change, otherwise they rot. In my case I used them mostly for [fill: which diagrams you actually drew, for which component or framework].",
    followups: ["What is the difference between a sequence and an activity diagram?", "How do you keep the model in sync with code?"]
  },
  {
    id: "process-23",
    topic: "process",
    type: "behavioral",
    q: "How do Agile/Scrum and ASPICE work together in automotive?",
    tags: ["Agile", "Scrum", "ASPICE", "sprint", "definition of done", "backlog", "automotive"],
    key: ["ASPICE says what outcomes, not how", "Sprints deliver increments through the V", "Definition of Done includes trace, review, evidence", "Backlog items linked to requirements/CRs", "Baselines at sprint or release boundaries"],
    answer: "They're not in conflict. ASPICE defines <strong>what outcomes</strong> and evidence must exist, not a waterfall schedule. Scrum defines <strong>how</strong> the team organises work. The trick is to make ASPICE outputs part of the sprint, mainly through the <strong>Definition of Done</strong>: a story isn't done until the requirement is linked, the code and tests are reviewed, tests pass in CI and results are stored against a version. Backlog items reference requirement or change-request IDs, so traceability is automatic. Sprint planning and the burndown give you the planning and monitoring evidence that capability level 2 asks for, and you create baselines at sprint or release boundaries. Each sprint effectively runs a small V. Where it gets hard is system-level integration with hardware, so you need an integration cadence across teams. I worked in Scrum teams at Bosch, and in the ARA role I used it to break down, track and deliver the SENT automation, while in the Classic role the ASPICE evidence side was my responsibility.",
    followups: ["What goes into your Definition of Done?", "How do you handle hardware dependencies in sprints?"]
  },
  {
    id: "process-24",
    topic: "process",
    type: "theory",
    q: "Why does functional safety (ISO 26262 / ASIL) demand more process rigour?",
    tags: ["ISO 26262", "ASIL", "functional safety", "process rigor", "an toàn chức năng", "V-model"],
    key: ["ASIL from HARA: severity × exposure × controllability", "Higher ASIL → stricter methods, coverage, independence", "Safety case built on evidence", "ASPICE = process quality, 26262 = risk control", "Both rely on V-model + traceability"],
    answer: "ISO 26262 starts from hazard analysis and risk assessment: each hazard is rated by severity, exposure and controllability, which gives an <strong>ASIL</strong> from A to D, or QM. The higher the ASIL, the more the standard demands: stricter design and coding methods, higher test coverage, up to MC/DC at ASIL D, more independent reviews, and safety analyses like FMEA. The reason is that you can't test your way to safety alone; you need confidence that the process systematically prevents and catches errors, and a <strong>safety case</strong> built from evidence. So traceability from safety goals down to tests, controlled baselines and change impact analysis aren't bureaucracy; they are how you argue that the shipped software is the one that was verified. ASPICE and ISO 26262 complement each other: ASPICE judges process capability, ISO 26262 judges risk control, and both rest on the V-model and bidirectional traceability, which is the part I worked with daily in MCAL and BSW validation.",
    followups: ["What is ASIL decomposition?", "What does freedom from interference mean?"]
  },
  {
    id: "linux-01",
    topic: "linux",
    type: "practical",
    q: "A service on an embedded Linux target doesn't start or dies after a few seconds. How do you troubleshoot?",
    tags: ["systemctl", "journalctl", "dmesg", "service", "troubleshooting", "embedded Linux", "systemd", "dịch vụ lỗi"],
    key: ["Outside-in: state → logs → kernel → resources → network", "systemctl status: exit code, restarts", "journalctl -u svc -b, dmesg -T (OOM, segfault)", "free/df/top, permissions, ports", "Reproduce manually with same user/env, then gdb"],
    answer: "I go from the outside in and let evidence narrow it down. First, <code>systemctl status</code>: is it failed, what exit code or signal, is it restart-looping. systemd shows a kill as <code>code=killed, status=9/KILL</code>, often the OOM killer; the same thing shows up as exit code 137, 128 + 9, in a shell or a container runtime. Second, its logs: <code>journalctl -u app.service -b</code>, plus the application's own log. Third, the kernel: <code>dmesg -T</code> shows OOM kills, segfaults with addresses or driver probe failures, which the service itself can't log. Fourth, resources and environment: memory, a full partition, file permissions, a port already taken. Fifth, if it's networked: is it listening, can it reach its peer. Only then do I reproduce it manually using the same user, environment and working directory as the unit file, and use strace or gdbserver. The conclusion is always one of: the application, configuration or deployment, the OS or BSP, hardware, or the test bench itself. In ARA system testing on Raspberry Pi 4 and R-Car I used exactly this kind of process and service handling and log analysis to isolate system-level failures.",
    code: "systemctl status app.service            # failed? exit code? restarts?\njournalctl -u app.service -b --no-pager | tail -50\ndmesg -T | tail -30                     # OOM killer? segfault?\nfree -h; df -h; top -b -n1 | head -15\nss -tulpn | grep 8080                   # port taken by another process?\nsystemctl cat app.service               # ExecStart, User, Environment",
    lang: "bash",
    followups: ["What does exit code 139 mean?", "How do you get logs from the previous boot?"]
  },
  {
    id: "linux-02",
    topic: "linux",
    type: "practical",
    q: "The service runs fine when started manually but fails under systemd. Why, and how do you read the unit file?",
    tags: ["systemd", "unit file", "After", "Requires", "Wants", "daemon-reload", "environment"],
    key: ["Different user, env, working dir, or started too early", "After= is order only; Requires=/Wants= pull in", "Restart=on-failure, WatchdogSec", "daemon-reload after editing", "systemctl list-dependencies, --failed"],
    answer: "When it works by hand but not under systemd, it's almost always the <strong>context</strong>: systemd runs it as a different user, with a minimal environment, a different working directory, or too early in boot before the network or a dependency is ready. So I read the unit with <code>systemctl cat</code>. The classic trap is that <code>After=</code> only defines <strong>ordering</strong>; it doesn't start the other unit. <code>Requires=</code> is a hard dependency and <code>Wants=</code> a soft one; you usually need both Wants or Requires and After. Also, <code>network.target</code> doesn't mean the network is up; you want <code>network-online.target</code>. I check <code>User=</code>, <code>EnvironmentFile=</code>, <code>WorkingDirectory=</code>, relative paths in <code>ExecStart</code>, and the restart policy. After editing, <code>systemctl daemon-reload</code>, otherwise systemd still uses the old definition. <code>systemctl --failed</code> and <code>list-dependencies</code> show whether a dependency is the real culprit, and <code>systemd-analyze blame</code> shows what slows boot.",
    code: "[Unit]\nDescription=Example app\nWants=network-online.target\nAfter=network-online.target\n\n[Service]\nUser=appuser\nEnvironmentFile=/etc/app.env\nWorkingDirectory=/opt/app\nExecStart=/opt/app/bin/app --config /etc/app.conf\nRestart=on-failure\nRestartSec=2\n\n[Install]\nWantedBy=multi-user.target",
    lang: "text",
    followups: ["What does WatchdogSec do?", "Difference between Type=simple and Type=notify?"]
  },
  {
    id: "linux-03",
    topic: "linux",
    type: "practical",
    q: "Two nodes on the test bench can't communicate. Which networking checks do you run?",
    tags: ["networking", "ip", "ping", "ss", "netstat", "tcpdump", "Wireshark", "mạng"],
    key: ["Layer by layer: link → IP/route → reachability → port → packets", "ip link / ip addr / ip route", "ping, then ss -tulpn on the server side", "tcpdump -w, analyse in Wireshark", "Check firewall, VLAN, multicast routes"],
    answer: "I go up the layers. <strong>Link</strong>: <code>ip link</code> shows whether the interface is up and has carrier; a bad cable or wrong interface name is surprisingly common on a bench. <strong>Addressing and routing</strong>: <code>ip addr</code> and <code>ip route</code>, right subnet, right default route, no duplicate IP. <strong>Reachability</strong>: <code>ping</code> the peer, keeping in mind some targets drop ICMP. <strong>Service</strong>: on the server side <code>ss -tulpn</code>, or netstat on older systems, shows whether the process is actually listening on the expected port and address; listening on 127.0.0.1 only is a classic mistake. <strong>Packets</strong>: <code>tcpdump -i eth0 port N -w cap.pcap</code> and open it in Wireshark on the host to see whether requests arrive and responses leave. If they arrive but nothing answers, it's the application; if nothing arrives, it's network or firewall, so I check iptables or nftables, VLANs, and for service discovery, multicast routing. In ARA system testing, networking checks were part of how I isolated failures at system level.",
    code: "ip -br link; ip -br addr; ip route\nping -c 3 192.168.1.20\nss -tulpn | grep <port>        # who listens, on which address\ntcpdump -i eth0 -nn port <port> -w cap.pcap",
    lang: "bash",
    followups: ["TCP connection refused versus timeout: what does each tell you?", "How do you capture on a target without tcpdump?"]
  },
  {
    id: "linux-04",
    topic: "linux",
    type: "practical",
    q: "How do you debug a crashing process remotely on a target?",
    tags: ["remote debugging", "gdbserver", "gdb", "ssh", "core dump", "strace", "gỡ lỗi từ xa"],
    key: ["ssh/scp to target, deploy binary", "Target: gdbserver :2345 ./app", "Host: gdb-multiarch + symbols, target remote", "Core dump: ulimit -c / coredumpctl", "strace for syscall-level failures"],
    answer: "I access the target over <strong>ssh</strong> and copy files with scp. For live debugging, I start the program under <code>gdbserver :2345 ./app</code> on the target, or attach to a running PID, and on the host I run the cross-architecture gdb with the <strong>unstripped binary</strong> that matches what's deployed, set the sysroot for shared libraries, and connect with <code>target remote</code>. The target only needs the small gdbserver; symbols stay on the host. For crashes that are hard to catch live, I enable <strong>core dumps</strong> with <code>ulimit -c unlimited</code> or systemd-coredump, then load the core with the same binary to get the backtrace at the moment of the crash. If the problem is at the OS boundary, like a file not found, permission denied or connection refused, <code>strace -f</code> is faster than gdb. On QNX the equivalent is pdebug on the target with gdb or the IDE on the host. Remote debugging on Raspberry Pi 4 and R-Car was part of my ARA system validation. [fill: a concrete crash you debugged this way, if you have one].",
    code: "# target\ngdbserver :2345 /opt/app/bin/app --config /etc/app.conf\n# host\ngdb-multiarch build/app\n(gdb) set sysroot /path/to/target/sysroot\n(gdb) target remote 192.168.1.20:2345\n(gdb) continue\n(gdb) bt",
    lang: "bash",
    followups: ["Why must the binary match exactly?", "How do you debug when you can't stop the process?"]
  },
  {
    id: "linux-05",
    topic: "linux",
    type: "practical",
    q: "How do you approach log analysis when a system-level test fails?",
    tags: ["log analysis", "journalctl", "grep", "timestamp", "correlation", "phân tích log"],
    key: ["Start from the failure timestamp, look backwards", "Correlate app, system, kernel, test logs", "Filter: -p err, --since, grep -E", "Compare with a passing run", "Automate recurring patterns"],
    answer: "I start from the <strong>moment of failure</strong> in the test log and work backwards, because the first error usually matters more than the last one. Then I <strong>correlate</strong> sources on the same timeline: the test framework log, the application logs, the system journal and the kernel log, which needs synchronized clocks or at least a known offset between host and target. I filter hard, with <code>journalctl -p err --since</code>, <code>grep -E</code> for known error patterns, and look for restarts, timeouts and first occurrences. The most powerful trick is <strong>diffing against a passing run</strong> on the same setup: what appears in the failing log that doesn't appear in the good one. I also separate product failures from bench failures, such as a target that didn't boot or a network glitch, so we don't file wrong defects. When the same pattern shows up repeatedly, I automate the check in the test framework, which ties to what I did with the reusable test frameworks in ARA. [fill: an example of a log pattern you tracked down].",
    code: "journalctl -b -p err --since \"10 min ago\" --no-pager\njournalctl -u app.service -o short-precise | grep -E \"timeout|error|restart\"\ndiff <(grep -v '^#' pass.log | cut -c24-) <(grep -v '^#' fail.log | cut -c24-) | head",
    lang: "bash",
    followups: ["How do you handle logs from the previous boot?", "What makes a good log message?"]
  },
  {
    id: "linux-06",
    topic: "linux",
    type: "theory",
    q: "What are the main differences between Linux and QNX?",
    tags: ["QNX", "Linux", "microkernel", "monolithic", "resource manager", "message passing", "RTOS"],
    key: ["Linux: monolithic, drivers in kernel", "QNX: microkernel, drivers as user-space resource managers", "QNX IPC: synchronous MsgSend/Receive/Reply", "QNX: hard real-time, safety-certified variant", "Crashed driver can restart without system crash"],
    answer: "Linux is a <strong>monolithic kernel</strong>: drivers, file systems and the network stack run in kernel space, so a bad driver can bring down the whole system. QNX Neutrino is a <strong>microkernel</strong>: the kernel only does scheduling, interrupts, timers and inter-process communication, and everything else, including drivers, file systems and networking, runs as separate user-space processes called <strong>resource managers</strong>. If one crashes, it can be restarted without crashing the system, which is attractive for safety. The foundation of QNX IPC is <strong>synchronous message passing</strong>: MsgSend blocks the client until the server does MsgReceive and MsgReply, and the POSIX API is built on top of that. QNX is a hard real-time OS with priority-based preemptive scheduling and there's a safety-certified variant, while standard Linux isn't hard real-time, though PREEMPT_RT helps. Linux wins on ecosystem and hardware support. I ran and validated the AUTOSAR Adaptive stack on both QNX and embedded Linux, so I've worked with both environments at system level.",
    followups: ["What is priority inversion and how does QNX handle it?", "Why would an OEM choose QNX over Linux?"]
  },
  {
    id: "linux-07",
    topic: "linux",
    type: "practical",
    q: "Which tools do you use to investigate a problem on QNX?",
    tags: ["QNX", "pidin", "slog2info", "hogs", "pdebug", "sloginfo", "công cụ QNX"],
    key: ["pidin: processes, threads, blocked states", "slog2info: system and app logs", "hogs: CPU per process", "pdebug + gdb / Momentics for remote debug", "ifconfig, netstat for network"],
    answer: "The Linux commands mostly don't exist, so I use the QNX equivalents. <code>pidin</code> is the main one: it lists processes and threads with their <strong>state</strong>, and on QNX the state is very telling because of message passing: a thread that's SEND-blocked or REPLY-blocked tells you which server it's waiting on, which is how you find a hung resource manager or a deadlock. <code>pidin -p name</code> filters, and there are views for memory and arguments. <code>slog2info</code> shows the system logger buffers, the equivalent of the journal; older systems used sloginfo. <code>hogs</code> shows which processes consume CPU, like top. For networking, <code>ifconfig</code> and <code>netstat</code>. For remote debugging, <code>pdebug</code> on the target with gdb or the Momentics IDE on the host. Processes are usually started from the image's startup script or a launch manager rather than systemd, so for startup problems I check that configuration. On the ARA stack on QNX, [fill: which of these you actually used and for what kind of issue].",
    code: "pidin | grep app          # threads and blocked states\npidin -p app mem          # memory of process 'app'\nslog2info | tail -50      # system logger\nhogs -i 1                 # CPU usage per process\nifconfig; netstat -an",
    lang: "bash",
    followups: ["What does REPLY-blocked mean?", "How are services started on QNX?"]
  },
  {
    id: "linux-08",
    topic: "linux",
    type: "theory",
    q: "Describe the boot flow of an embedded Linux system.",
    tags: ["boot flow", "bootloader", "U-Boot", "device tree", "kernel", "init", "systemd", "khởi động"],
    key: ["Boot ROM → bootloader (e.g. U-Boot)", "Kernel + device tree + command line", "Mount rootfs, start init (PID 1, often systemd)", "Services start by dependency", "Debug: serial console, dmesg, systemd-analyze"],
    answer: "On power-up the SoC runs its <strong>boot ROM</strong>, which loads the first-stage loader from flash or an SD card. Then a <strong>bootloader</strong>, commonly U-Boot, initialises memory and basic peripherals and loads the <strong>kernel</strong>, the <strong>device tree</strong> describing the hardware, and the kernel command line. On a Raspberry Pi the GPU firmware takes the first steps before the kernel, and on R-Car there's a vendor chain before U-Boot. The kernel initialises drivers according to the device tree, mounts the root filesystem, optionally via an initramfs, and starts <strong>init as PID 1</strong>, usually systemd, which brings up services according to their dependencies until it reaches the target, such as multi-user. For debugging, the serial console is the most valuable tool because it shows bootloader and early kernel output before networking exists; after that, <code>dmesg</code> covers driver probing and <code>systemd-analyze blame</code> shows slow services. When a service is missing after boot, the cause can be its own failure or a dependency, like a mount or network, that isn't ready.",
    followups: ["What is a device tree and why is it needed?", "Where would you look if the kernel panics at boot?"]
  },
  {
    id: "linux-09",
    topic: "linux",
    type: "practical",
    q: "Explain Linux file permissions and write a small Bash script you'd use on a target.",
    tags: ["permissions", "chmod", "chown", "Bash", "script", "rwx", "quyền file"],
    key: ["rwx for user / group / others", "chmod 755 = rwxr-xr-x, 640 = rw-r-----", "Execute on a directory = can enter it", "Service user must own/read its files", "Script: set -euo pipefail, check, log, exit code"],
    answer: "Each file has an owner and a group, and read, write and execute bits for <strong>user, group and others</strong>. In octal, r is 4, w is 2, x is 1, so <code>755</code> is rwxr-xr-x, typical for executables, and <code>640</code> is rw-r-----, typical for a config holding something sensitive. On a directory, execute means you can enter it. On targets the common issue is a service running as a dedicated user that can't read its config or write its log directory, which shows up as EACCES in strace; the fix is <code>chown</code> or group membership, not chmod 777. For scripting I use Bash, which is in my CV together with Python. My rules for small target scripts: <code>set -euo pipefail</code> so errors don't pass silently, quote variables, check prerequisites, log with timestamps, and return a meaningful exit code so CI or the test framework can act on it. Here's a small health check that collects evidence when a service isn't active.",
    code: "#!/usr/bin/env bash\nset -euo pipefail\nSVC=\"${1:-app.service}\"\nOUT=\"/tmp/health_$(date +%Y%m%d_%H%M%S)\"\nmkdir -p \"$OUT\"\nif systemctl is-active --quiet \"$SVC\"; then\n  echo \"$(date '+%F %T') $SVC active\"\n  exit 0\nfi\necho \"$(date '+%F %T') $SVC NOT active, collecting logs to $OUT\"\nsystemctl status \"$SVC\" --no-pager > \"$OUT/status.txt\" || true\njournalctl -u \"$SVC\" -b --no-pager > \"$OUT/journal.txt\" || true\ndmesg > \"$OUT/dmesg.txt\" 2>&1 || true   # may need root\nexit 1",
    lang: "bash",
    followups: ["What does set -o pipefail change?", "What are setuid and the sticky bit?"]
  },
  {
    id: "linux-10",
    topic: "linux",
    type: "theory",
    q: "What is cross-compilation and what is in a toolchain?",
    tags: ["cross-compilation", "toolchain", "sysroot", "gcc", "Conan", "ARM", "biên dịch chéo"],
    key: ["Build on x86 host, run on ARM target", "Toolchain: compiler, binutils, libc, debugger", "Sysroot: target headers and libraries", "Match target ABI, libc and kernel headers", "Pin toolchain version as a config item"],
    answer: "Cross-compilation means building on one architecture, usually an x86 host, for a different target, such as the ARM cores on a Raspberry Pi 4 or R-Car, because the target is too slow or doesn't have a build environment. A <strong>toolchain</strong> contains the cross compiler, for example aarch64-linux-gnu-gcc, the binutils such as the assembler, linker, objcopy and objdump, the C library for the target, and a matching gdb. You also need a <strong>sysroot</strong>: the target's headers and libraries, so you link against what's really on the device, not the host's libraries. The typical problems are ABI mismatches, a different glibc version on the target, or accidentally picking up host libraries. In CMake that's handled by a toolchain file, and package managers like <strong>Conan</strong>, which I used with Azure Pipelines, separate build and host profiles so dependencies are built for the right target. For an integrator, the toolchain version is a configuration item: pin it, ideally in a container image, or builds won't be reproducible. [fill: which toolchain/targets you actually built for].",
    code: "# CMake toolchain file (example)\nset(CMAKE_SYSTEM_NAME Linux)\nset(CMAKE_SYSTEM_PROCESSOR aarch64)\nset(CMAKE_C_COMPILER   aarch64-linux-gnu-gcc)\nset(CMAKE_CXX_COMPILER aarch64-linux-gnu-g++)\nset(CMAKE_SYSROOT /opt/sysroots/aarch64)\nset(CMAKE_FIND_ROOT_PATH_MODE_PROGRAM NEVER)\nset(CMAKE_FIND_ROOT_PATH_MODE_LIBRARY ONLY)",
    lang: "text",
    followups: ["How do you check which architecture a binary is built for?", "What is the difference between static and dynamic linking on a target?"]
  },
  {
    id: "linux-11",
    topic: "linux",
    type: "behavioral",
    q: "Tell me about a system-level failure you isolated on Raspberry Pi 4, R-Car, QNX or embedded Linux.",
    tags: ["system test", "ARA", "AUTOSAR Adaptive", "Raspberry Pi 4", "R-Car", "QNX", "isolation", "cô lập lỗi"],
    key: ["Context: ARA system validation on RPi4/R-Car/QNX/Linux", "Check process/service state first", "Logs + network: is the endpoint listening?", "Reproduce, then remote debug", "Decide: stack, config, platform or bench"],
    answer: "In my AUTOSAR Adaptive system test role, I validated the ARA stack across Raspberry Pi 4, Renesas R-Car, QNX and embedded Linux. When a test failed at system level, my job was to isolate <strong>where</strong> it failed before filing a defect. The pattern was consistent: check whether the relevant processes or services were actually running, read their logs and the system logs around the failure, check networking, for example whether the expected endpoint was listening and whether traffic arrived, then reproduce it in isolation and use remote debugging if needed. The outcome is a clear assignment: stack bug, configuration or deployment issue, platform issue, or a bench problem. One concrete case: [fill: symptom, e.g. which test failed on which platform]. I found that [fill: what the evidence showed, which commands or logs revealed it], and the root cause was [fill: cause]. It was resolved by [fill: fix/owner], and afterwards [fill: a check or automation you added, if any]. What I took away is that a precise first report saves the most time.",
    followups: ["Why did it behave differently on QNX versus Linux?", "How did you tell a bench problem from a product bug?"]
  }
);
