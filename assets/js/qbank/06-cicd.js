/* Question bank — cicd. Loaded by lessons/luxoft/LX12-question-bank.html */
(window.QBANK = window.QBANK || []).push(
  {
    id: "cicd-01",
    topic: "cicd",
    type: "theory",
    q: "What is the difference between Continuous Integration, Continuous Delivery and Continuous Deployment?",
    vi: "Tích hợp liên tục, chuyển giao liên tục và triển khai liên tục khác nhau như thế nào?",
    tags: ["CI", "CD", "continuous integration", "continuous delivery", "continuous deployment", "release", "khái niệm"],
    viTags: ["tích hợp liên tục", "chuyển giao liên tục", "triển khai liên tục", "phân biệt ci cd", "khái niệm ci/cd", "phát hành phần mềm"],
    key: [
      "CI: every change is built + tested automatically, merged often",
      "Delivery: every green build is releasable, human approves release",
      "Deployment: green build goes out automatically, no manual gate",
      "Automotive: delivery with gates, not auto-deploy to vehicles"
    ],
    answer: "<strong>Continuous Integration</strong> means every change is merged often and is built and tested automatically, so integration problems show up within minutes instead of at the end of a sprint. <strong>Continuous Delivery</strong> goes one step further: every build that passes the pipeline is packaged and <em>ready</em> to release, but a person or a formal gate decides when it actually goes out. <strong>Continuous Deployment</strong> removes that last manual step, so every green build is deployed automatically.<br><br>In automotive embedded work we almost always use the delivery model. The pipeline produces a versioned, tested artifact with evidence attached. The release to a customer or a vehicle goes through review, approval and traceability under ASPICE. Continuous deployment in the strict sense fits better for internal tools or cloud services. For example, an internal web service that redeploys a container on every green build. For ECU software you want a controlled release gate instead.",
    followups: ["Where would you put the quality gates in an ECU delivery pipeline?", "What does 'shift-left' mean in this context?"]
  },
  {
    id: "cicd-02",
    topic: "cicd",
    type: "theory",
    q: "Walk me through the anatomy of a CI pipeline for embedded / AUTOSAR software.",
    vi: "Hãy mô tả cấu trúc một CI pipeline cho phần mềm nhúng / AUTOSAR.",
    tags: ["pipeline", "stages", "cross-compiler", "VECU", "bench", "HIL", "SIL", "evidence", "embedded CI", "quy trình"],
    viTags: ["cấu trúc pipeline", "đường ống build", "ci cho phần mềm nhúng", "các stage của pipeline", "biên dịch chéo", "kiểm thử trên bench", "bằng chứng kiểm thử"],
    key: [
      "Checkout + fetch pinned deps (Conan, lockfile)",
      "Cross-compile in pinned toolchain image, static checks",
      "Host unit tests, then package versioned artifact",
      "Deploy to VECU / bench, run integration tests",
      "Publish JUnit reports, logs, evidence for traceability"
    ],
    answer: "I think of it as a chain where each stage is cheaper and faster than the next. First, <strong>checkout</strong> and resolve dependencies at pinned versions, in my case with Conan and a lockfile. Then <strong>build</strong> with the cross-compiler for the target, ideally inside a versioned Docker image so the toolchain is the same everywhere. Static analysis usually runs here too. Next, <strong>unit tests</strong> that can run on the host, because they give feedback in minutes. Then <strong>package</strong> the ELF/HEX plus metadata into a versioned artifact.<br><br>After that comes the part that is specific to embedded: <strong>deploy</strong> to a virtual ECU for SIL tests, and to a real target or HIL bench for integration tests. There you flash, check the ECU boots with the expected version, and run the test suite. Finally <strong>report</strong>: JUnit results in the CI UI, logs and traces archived, and test evidence linked to requirements, which matters for ASPICE. The principle is fail fast: we should catch most defects before we ever touch our limited hardware.",
    followups: ["Which of these stages would you run on every PR vs nightly?", "How do you keep the bench stage from blocking developers?"]
  },
  {
    id: "cicd-03",
    topic: "cicd",
    type: "behavioral",
    q: "Tell me about your hands-on experience with CI/CD.",
    vi: "Kể về kinh nghiệm thực tế của bạn với CI/CD.",
    tags: ["experience", "Azure Pipelines", "Conan", "SENT", "ARA", "kinh nghiệm", "CI/CD"],
    viTags: ["kinh nghiệm thực tế", "kinh nghiệm ci/cd", "dự án đã làm", "giới thiệu bản thân", "phỏng vấn devops"],
    key: [
      "ARA team: build, package, test integrated with Azure Pipelines + Conan",
      "SENT automation: 1-2 months to 2-3 days",
      "Reusable frameworks adopted by ARA system team",
      "Now: Terraform, Docker, K8s on Azure/GCP",
      "Honest: no Jenkins/GitLab in project, concepts map directly"
    ],
    answer: "My main CI/CD experience is from my AUTOSAR Adaptive role at Bosch. There I integrated build, package and test workflows with <strong>Azure Pipelines</strong> and <strong>Conan</strong>, so that engineering work became repeatable and could run as CI jobs instead of manual steps. That was part of the SENT automation initiative I led. It brought the full validation cycle down from about one to two months to two to three days. The ARA system team started using the frameworks we built for testing and development workflows. In that setup I was responsible for [fill: your concrete pipeline scope, e.g. which stages you wrote, how many pipelines, which targets].<br><br>In my current role I deploy and operate applications on Azure and Google Cloud using <strong>Terraform</strong>, <strong>Docker</strong> and <strong>Kubernetes</strong>, so I also see the infrastructure side. To be honest: I have not used Jenkins or GitLab CI in a project. But the concepts are the same: agents, stages, artifacts, triggers and quality gates. So I would learn them quickly.",
    followups: ["What was the hardest pipeline problem you solved?", "How did Conan help in that pipeline?"]
  },
  {
    id: "cicd-04",
    topic: "cicd",
    type: "theory",
    q: "Explain the main building blocks of Azure Pipelines.",
    vi: "Giải thích các thành phần chính của Azure Pipelines.",
    tags: ["Azure Pipelines", "Azure DevOps", "stage", "job", "step", "agent", "template", "variables", "artifact", "trigger"],
    viTags: ["thành phần azure pipelines", "cấu trúc pipeline", "stage job step", "máy build agent", "biến pipeline", "kích hoạt pipeline", "mẫu pipeline"],
    key: [
      "Pipeline > Stage > Job > Step (YAML in repo)",
      "Job runs on one agent; agent runs one job at a time",
      "Microsoft-hosted vs self-hosted agents (pools, demands)",
      "Templates for reuse; variables, variable groups, secrets",
      "Artifacts pass outputs between stages; triggers start runs"
    ],
    answer: "An Azure pipeline is defined in YAML inside the repository. The levels are <strong>pipeline, stage, job, step</strong>. A stage is a big phase like Build or Test. Stages run in order according to <code>dependsOn</code>. A job is a set of steps that runs on <em>one agent</em>, and jobs inside a stage can run in parallel. A step is a single script or task.<br><br>The <strong>agent</strong> is the machine that runs a job. Each agent runs one job at a time, so to run jobs in parallel you need more agents. Microsoft-hosted agents are clean VMs for every job. Self-hosted agents are your own machines in a pool. You need them for custom toolchains or attached hardware, and you select them with <code>demands</code> or capabilities.<br><br>For reuse there are <strong>templates</strong>: shared step, job or stage definitions with parameters. <strong>Variables</strong> and variable groups hold configuration, and secret variables are masked in logs. <strong>Artifacts</strong> move build outputs between stages. <strong>Triggers</strong> start the pipeline on push, on pull request, on a schedule, or when another pipeline finishes.",
    followups: ["When would you choose a self-hosted agent?", "What is the difference between a template and a variable group?"]
  },
  {
    id: "cicd-05",
    topic: "cicd",
    type: "practical",
    q: "Sketch a representative multi-stage YAML pipeline for an embedded project.",
    vi: "Phác thảo một YAML pipeline nhiều stage điển hình cho dự án nhúng.",
    tags: ["YAML", "azure-pipelines.yml", "multi-stage", "template", "artifact", "PublishTestResults", "Conan", "ví dụ"],
    viTags: ["pipeline nhiều giai đoạn", "ví dụ file yaml", "mẫu pipeline", "xuất kết quả test", "đóng gói artifact", "pipeline cho dự án nhúng"],
    key: [
      "Triggers on main + PR",
      "Build stage in pinned container, Conan with lockfile",
      "Publish JUnit even on failure (condition: always)",
      "HW stage on bench pool selected by demands",
      "Shared template for flash-and-test"
    ],
    answer: "This is an example sketch, not a copy of a real project pipeline. It runs on pushes to main and on pull requests. The <strong>Build</strong> stage runs inside a pinned toolchain container. It installs dependencies with Conan using a cross profile and a lockfile, builds, runs host unit tests and publishes the JUnit report with <code>condition: always()</code>, so we see results even when tests fail. The firmware is published as a pipeline artifact.<br><br>The <strong>HwTest</strong> stage depends on Build, runs on a self-hosted bench pool, and uses <code>demands</code> to pick an agent with the right target attached. It downloads the exact artifact from the build stage, so we test what we built. It calls a shared <strong>template</strong> for flashing and testing, so every variant uses the same logic. Secrets come from a linked variable group and never appear in the file. In a real setup I would add static analysis, timeouts on each job and a cleanup step that always runs.",
    code: "trigger:\n  branches: { include: [ main ] }\npr:\n  branches: { include: [ main ] }\n\nvariables:\n  - group: ci-shared              # linked group, secret values live in Azure DevOps\n  - name: CONAN_PROFILE\n    value: profiles/target-cross\n\nstages:\n- stage: Build\n  jobs:\n  - job: build\n    pool: { name: build-pool }\n    container: registry.example/build-image:1.4.0   # pinned toolchain\n    timeoutInMinutes: 60\n    steps:\n    - checkout: self\n    - script: |\n        set -euo pipefail\n        conan install . -pr:h $(CONAN_PROFILE) -pr:b default --lockfile=conan.lock --build=missing\n        cmake --preset conan-release\n        cmake --build --preset conan-release\n      displayName: Conan install + cross build\n    - script: |\n        cmake --preset host-tests            # separate native build\n        cmake --build --preset host-tests\n        ctest --preset host-tests --output-junit unit.xml\n      displayName: Host unit tests\n    - task: PublishTestResults@2\n      condition: always()\n      inputs:\n        testResultsFormat: JUnit\n        testResultsFiles: '**/unit.xml'\n    - publish: build/out\n      artifact: firmware\n\n- stage: HwTest\n  dependsOn: Build\n  jobs:\n  - job: bench\n    pool:\n      name: bench-pool\n      demands: [ 'target -equals rh850' ]\n    steps:\n    - download: current\n      artifact: firmware\n    - template: templates/flash-and-test.yml\n      parameters: { target: rh850 }",
    lang: "yaml",
    followups: ["How would you run the same tests for three hardware variants?", "Where do the secrets in 'ci-shared' come from?"]
  },
  {
    id: "cicd-06",
    topic: "cicd",
    type: "practical",
    q: "Why and how would you use self-hosted agents with hardware attached?",
    vi: "Tại sao và làm thế nào để dùng self-hosted agent có gắn phần cứng?",
    tags: ["self-hosted agent", "agent pool", "capabilities", "demands", "bench", "HIL", "debugger", "máy build"],
    viTags: ["máy build tự quản lý", "agent tự host", "gắn phần cứng", "nhóm agent", "phần cứng thật", "máy build riêng", "debugger trên agent"],
    key: [
      "Needed for debuggers, CAN interfaces, licenses, big caches",
      "Label via capabilities, select via demands",
      "One job per agent = natural exclusive bench lock",
      "Health check before job, clean state after",
      "Treat as pets: monitor, keep config as code"
    ],
    answer: "Microsoft-hosted agents are great for pure software builds, but they cannot reach a debugger on a USB port, a CAN interface or a lab network. So for hardware tests you register your own machines as <strong>self-hosted agents</strong> in a dedicated pool, for example one PC per bench. You add <strong>capabilities</strong> like the target type, and the pipeline picks the right machine with <code>demands</code>. A nice side effect: an agent runs one job at a time, so you get exclusive access to the bench with no extra work.<br><br>Running the benches well is what makes it work. Build agents are like cattle: identical, rebuilt from an image. Bench agents are pets: stateful and limited in number. So I would run a <strong>health check</strong> before each job: power cycle and check the debugger responds. And I would always restore a clean state in a final step. If the health check fails, the job should report an infrastructure error, not a test failure. In my project [fill: whether you used Microsoft-hosted or self-hosted agents and what hardware or VECU they drove].",
    followups: ["How do you handle a bench that goes offline in the middle of a run?", "How would you scale when there are more jobs than benches?"]
  },
  {
    id: "cicd-07",
    topic: "cicd",
    type: "theory",
    q: "What is Conan and what are its key concepts?",
    vi: "Conan là gì và các khái niệm chính của nó là gì?",
    tags: ["Conan", "package manager", "C/C++", "recipe", "conanfile", "profile", "remote", "lockfile", "binary cache", "quản lý gói"],
    viTags: ["quản lý gói", "trình quản lý gói c/c++", "công thức đóng gói", "khóa phiên bản phụ thuộc", "bộ nhớ đệm binary", "quản lý thư viện phụ thuộc"],
    key: [
      "C/C++ package manager: versions + binaries per configuration",
      "Recipe (conanfile.py): deps, build, package",
      "Profile: os, arch, compiler, build_type (host vs build)",
      "Remote: server holding packages; local cache",
      "Package ID: reuse binary if config matches, else --build=missing",
      "Lockfile pins exact versions and revisions"
    ],
    answer: "Conan is a package manager for C and C++. The key difference from something like pip is that C/C++ binaries depend on the configuration. So Conan manages <strong>binaries per configuration</strong>, not just source versions.<br><br>The <strong>recipe</strong>, a <code>conanfile.py</code>, declares dependencies and how to build and package the library. A <strong>profile</strong> describes the configuration: OS, architecture, compiler and version, build type. There is a host profile for the target and a build profile for the machine running the build, which is exactly what cross-compilation needs. A <strong>remote</strong> is a server that stores packages; each machine also has a local cache.<br><br>From the settings and options Conan calculates a <strong>package ID</strong>. If a binary with that ID exists on the remote, it is downloaded. If not, <code>--build=missing</code> builds it from source, and it can be uploaded for everybody else. That binary caching is what makes CI fast. A <strong>lockfile</strong> pins exact versions and revisions of the whole dependency graph, so the build is reproducible. I used Conan together with Azure Pipelines to make our build and test workflows repeatable.",
    followups: ["What is the difference between the host and build profile?", "Conan 1 vs Conan 2: what changed?"]
  },
  {
    id: "cicd-08",
    topic: "cicd",
    type: "practical",
    q: "How do you set up Conan for cross-compilation?",
    vi: "Làm thế nào để cấu hình Conan cho biên dịch chéo?",
    tags: ["Conan", "cross-compilation", "profile", "toolchain", "-pr:h", "-pr:b", "biên dịch chéo"],
    viTags: ["biên dịch chéo", "cross compile", "cấu hình profile conan", "bộ công cụ biên dịch", "profile host và build", "build cho vi điều khiển"],
    key: [
      "Host profile = target; build profile = CI machine",
      "Toolchain path via [buildenv] or [conf]",
      "Profiles versioned in repo, one per target",
      "Change target = change profile, not code",
      "Custom compilers may need settings extension"
    ],
    answer: "You use <strong>two profiles</strong>. The <em>host</em> profile describes the target the binaries will run on: architecture, compiler, version, build type. The <em>build</em> profile describes the machine doing the build, usually just the default Linux x86 profile. Tools that must run during the build, like code generators, are built for the build profile. The libraries that go into the firmware are built for the host profile.<br><br>The profile also points to the cross toolchain, either through <code>[buildenv]</code> variables like <code>CC</code> and <code>CXX</code>, or through <code>[conf]</code> entries that the CMake toolchain generator picks up. I keep profiles in the repository, one per target. So switching target just means switching <code>-pr:h</code>, not touching code. The example is a generic ARM Linux profile. For bare-metal targets with a commercial compiler you may need to extend Conan's settings, because those compilers are not in the default list. In my project the profiles were [fill: which targets / toolchains your Conan profiles covered, and Conan 1.x or 2.x].",
    code: "# profiles/armv8-gcc12  (Conan 2 style, illustrative)\n[settings]\nos=Linux\narch=armv8\ncompiler=gcc\ncompiler.version=12\ncompiler.libcxx=libstdc++11\nbuild_type=Release\n\n[buildenv]\nCC=aarch64-linux-gnu-gcc\nCXX=aarch64-linux-gnu-g++\n\n# usage in CI\n# conan install . -pr:h profiles/armv8-gcc12 -pr:b default --lockfile=conan.lock --build=missing",
    lang: "text",
    followups: ["What changes in the package ID when you switch build_type?", "How would you handle a compiler Conan does not know?"]
  },
  {
    id: "cicd-09",
    topic: "cicd",
    type: "practical",
    q: "How do you make builds reproducible?",
    vi: "Làm thế nào để các bản build có thể tái lập được?",
    tags: ["reproducible build", "lockfile", "Docker", "pinned toolchain", "digest", "determinism", "tái lập", "works on my machine"],
    viTags: ["build tái lập", "tái tạo bản build", "cố định phiên bản toolchain", "khóa phụ thuộc", "tính tất định", "máy tôi chạy được", "môi trường build nhất quán"],
    key: [
      "Pin toolchain: versioned Docker image, ideally by digest",
      "Pin dependencies: Conan lockfile committed",
      "Never 'latest', no network fetch of floating versions",
      "Same script locally and in CI",
      "Record build info: commit, image, lockfile, profile"
    ],
    answer: "Reproducible means the same commit gives the same binary on any machine, today or in two years. For automotive that matters, because you may need to rebuild an old release for a fix or an audit.<br><br>I handle it on three levels. First the <strong>toolchain</strong>: compiler, CMake, Python and generators are frozen in a versioned Docker image. The pipeline references it by a fixed tag, or better by digest, never <code>latest</code>. Second the <strong>dependencies</strong>: a Conan lockfile committed to the repo pins every package version and revision, and profiles pin the configuration. Third the <strong>process</strong>: developers run the same build script locally as CI does, so there is no hidden CI-only step.<br><br>Finally, record what you used: commit, image digest, lockfile and profile go into the artifact metadata. [fill: how environment pinning helped in the SENT automation work, only if it really did]",
    followups: ["What can still make two builds differ byte-for-byte?", "How do you update a pinned toolchain safely?"]
  },
  {
    id: "cicd-10",
    topic: "cicd",
    type: "theory",
    q: "Docker: what is the difference between an image and a container, and how does layer caching work?",
    vi: "Docker: image và container khác nhau thế nào, và cơ chế cache theo layer hoạt động ra sao?",
    tags: ["Docker", "image", "container", "layer", "cache", "Dockerfile", "container vs VM", "lớp"],
    viTags: ["phân biệt image và container", "bộ nhớ đệm layer", "lớp image", "container và máy ảo", "tối ưu dockerfile", "đóng gói ứng dụng"],
    key: [
      "Image: read-only template of stacked layers",
      "Container: running instance + thin writable layer",
      "RUN/COPY/ADD create layers; cached if inputs unchanged",
      "Change a layer = rebuild it and all above",
      "Rarely-changing steps first, source last"
    ],
    answer: "An <strong>image</strong> is a read-only template made of stacked layers. A <strong>container</strong> is a running instance of an image with a thin writable layer on top. Anything written there disappears when the container is removed, unless you use a volume. Unlike a VM, a container shares the host kernel, so it is lightweight and starts in seconds.<br><br>Each <code>RUN</code>, <code>COPY</code> or <code>ADD</code> instruction creates a layer. Docker reuses a cached layer if the instruction and everything before it are unchanged. Once one layer changes, that layer and all layers above it are rebuilt. So the rule is: put things that rarely change at the bottom, like the base OS, system packages and the compiler. Put things that change often at the top, like the project requirements and source. Then a normal code change only rebuilds the last small layer. In CI you also want to reuse the cache across agents, for example by pulling the previous image and using it as a cache source.",
    code: "FROM ubuntu:24.04\nRUN apt-get update && apt-get install -y --no-install-recommends \\\n      cmake ninja-build python3 python3-venv git \\\n    && rm -rf /var/lib/apt/lists/*\n# rarely changes -> early layers stay cached\nCOPY toolchain/ /opt/toolchain/\nENV PATH=/opt/toolchain/bin:$PATH\n# changes sometimes -> later layer\nCOPY requirements.txt /tmp/\nRUN python3 -m venv /opt/venv && /opt/venv/bin/pip install -r /tmp/requirements.txt",
    lang: "text",
    followups: ["Why combine apt-get update and install in one RUN?", "What is a multi-stage build?"]
  },
  {
    id: "cicd-11",
    topic: "cicd",
    type: "practical",
    q: "Why containerize embedded toolchains, and what are the limits, e.g. for USB debuggers?",
    vi: "Tại sao nên container hoá toolchain nhúng, và giới hạn là gì, ví dụ với debugger USB?",
    tags: ["Docker", "toolchain", "multi-stage build", "USB", "device passthrough", "license server", "debugger", "container hoá"],
    viTags: ["container hoá toolchain", "đóng gói môi trường build", "truy cập thiết bị usb", "máy chủ bản quyền", "giới hạn của docker", "debugger trong container"],
    key: [
      "Same compiler everywhere, disposable, fast agent setup",
      "Multi-stage: build tools in stage 1, copy result only",
      "Tag with version or pin digest",
      "Limits: license servers, Windows-only tools",
      "USB/debug HW passthrough fragile: run bench on host"
    ],
    answer: "The main reason is reproducibility. The compiler, CMake, Python and code generators are frozen in one versioned image, so every agent and every developer builds with exactly the same tools. A new build agent is ready as soon as it can pull the image. A <strong>multi-stage build</strong> helps keep that image small: the first stage compiles or unpacks tools, and the final stage copies only what is needed. This reduces size and attack surface.<br><br>There are real limits though. Commercial compilers often need a network <strong>license server</strong>, so the container needs a connection to it. Some automotive tools are Windows-only, which means Windows containers or a VM. And <strong>hardware access</strong> is the big one. You can pass a device into a container with <code>--device</code> or privileged mode. But USB debuggers and CAN interfaces re-enumerate on reset, and they need vendor kernel drivers on the host and udev rules, so it becomes unreliable. My approach would be: build and static analysis fully containerized, and bench execution directly on the host PC, with the Python test environment still pinned in a virtualenv.",
    followups: ["How would you give a container access to a serial port if you had to?", "Why is running privileged containers a concern?"]
  },
  {
    id: "cicd-12",
    topic: "cicd",
    type: "theory",
    q: "Give me the Kubernetes basics. When does it make sense?",
    vi: "Trình bày kiến thức cơ bản về Kubernetes. Khi nào thì nên dùng nó?",
    tags: ["Kubernetes", "K8s", "pod", "deployment", "service", "ingress", "ConfigMap", "Secret", "AKS", "GKE"],
    viTags: ["cơ bản kubernetes", "điều phối container", "khi nào dùng k8s", "triển khai ứng dụng", "cụm máy chủ", "quản lý container"],
    key: [
      "Pod: smallest unit, 1+ containers sharing network",
      "Deployment: N replicas, rolling update, rollback",
      "Service: stable address + load balancing to pods",
      "ConfigMap for config, Secret for sensitive values",
      "Worth it for long-running services / elastic agents"
    ],
    answer: "Kubernetes orchestrates containers across a cluster: it schedules them, restarts them when they fail and scales them. The <strong>pod</strong> is the smallest unit, one or a few containers that share an IP and volumes. A <strong>Deployment</strong> keeps a desired number of pod replicas running and does rolling updates and rollbacks. A <strong>Service</strong> gives a stable address and load balancing in front of pods whose IPs change. An Ingress routes external HTTP traffic to services. <strong>ConfigMaps</strong> hold configuration and <strong>Secrets</strong> hold sensitive values, both kept out of the image.<br><br>It makes sense for long-running services that need high availability and scaling, or for elastic CI agents that live only for one job. For a single small tool it is often too much, and a managed app service is simpler. In my current role I deploy and operate applications on Azure and GCP with Docker and Kubernetes, [fill: which managed K8s you used (AKS / GKE) and what you ran on it]. For a hardware bench, Kubernetes adds little, because benches are fixed physical machines.",
    followups: ["What happens to a running pod when you change its ConfigMap?", "Deployment vs StatefulSet?"]
  },
  {
    id: "cicd-13",
    topic: "cicd",
    type: "theory",
    q: "Explain Terraform: state, plan/apply, modules and drift.",
    vi: "Giải thích Terraform: state, plan/apply, module và drift.",
    tags: ["Terraform", "IaC", "infrastructure as code", "state", "plan", "apply", "module", "drift", "HCL", "hạ tầng"],
    viTags: ["hạ tầng dạng code", "quản lý hạ tầng", "trạng thái terraform", "lệch cấu hình", "mô-đun terraform", "tự động hoá hạ tầng"],
    key: [
      "Declarative HCL: describe desired state",
      "State maps code to real resource IDs; remote + locked",
      "plan = preview diff, apply = execute",
      "Modules = reusable parameterized building blocks",
      "Drift: manual change outside code, found by plan"
    ],
    answer: "Terraform is declarative infrastructure as code: in HCL I describe the resources I want, and Terraform works out how to get there. The <strong>state</strong> file maps each resource in the code to the real resource ID in the cloud. It can contain sensitive values and the team shares it, so it must be stored remotely, with locking and encryption, and never committed to Git.<br><br><code>terraform plan</code> compares code, state and reality and shows the diff: create, change, destroy. <code>terraform apply</code> runs it in dependency order. In a pipeline I run plan on the pull request so reviewers see the impact, and apply only after approval. <strong>Modules</strong> package a group of resources with parameters, so you can create the same environment several times without copy-paste. <strong>Drift</strong> is when someone changes a resource manually in the portal. The next plan shows it, and the fix is either to bring the change into code or let Terraform revert it. I use Terraform to manage the Azure and GCP infrastructure for the internal platform I operate.",
    code: "resource \"azurerm_resource_group\" \"rg\" {\n  name     = \"rg-example\"\n  location = var.location\n}\n\nmodule \"web_app\" {\n  source              = \"./modules/app_service\"\n  name                = \"example-app\"\n  resource_group_name = azurerm_resource_group.rg.name\n}",
    lang: "text",
    followups: ["What happens if two people apply at the same time without locking?", "How do you import an existing resource?"]
  },
  {
    id: "cicd-14",
    topic: "cicd",
    type: "practical",
    q: "Your integration CI takes 2 hours. How do you speed it up?",
    vi: "CI tích hợp của bạn mất 2 tiếng. Bạn sẽ làm thế nào để tăng tốc?",
    tags: ["slow pipeline", "performance", "cache", "parallelization", "incremental build", "test selection", "SENT", "tối ưu", "tăng tốc"],
    viTags: ["tăng tốc build", "pipeline chậm", "tối ưu thời gian build", "chạy song song", "build tăng dần", "bộ nhớ đệm", "chọn lọc test"],
    key: [
      "Measure first: per-stage time, queue time",
      "Cache: Conan binaries, Docker layers, compiler cache",
      "Parallelize jobs, shard tests across agents",
      "Incremental: rebuild/regenerate only what changed",
      "Tier: fast PR check, full suite nightly"
    ],
    answer: "First I <strong>measure</strong>, not guess: time per stage, queue time waiting for agents, and which jobs take the longest. Usually a few steps take most of the time.<br><br>Then I work on the biggest items. <strong>Caching</strong>: Conan binary packages on the remote so dependencies are downloaded instead of rebuilt, Docker layer caching for the toolchain image, and a compiler cache for object files. <strong>Parallelization</strong>: independent jobs in parallel, and tests sharded across agents, balanced by past duration. <strong>Incremental work</strong>: only regenerate configuration or rebuild components when their inputs changed. <strong>Test selection and tiering</strong>: a fast check on every pull request, the full regression nightly, and bench time kept for what really needs hardware.<br><br>The SENT automation is my real example of this way of thinking. The old cycle took one to two months [fill: what exactly took the time, same as project-17]. Automating it brought it down to two to three days. The lesson: speed came from removing manual loops, and from measuring where the time went.",
    followups: ["How do you prove the optimization did not reduce test coverage?", "What if the bottleneck is the number of benches?"]
  },
  {
    id: "cicd-15",
    topic: "cicd",
    type: "practical",
    q: "The pipeline fails randomly. How do you make CI stable?",
    vi: "Pipeline lỗi ngẫu nhiên. Làm thế nào để CI chạy ổn định?",
    tags: ["flaky test", "stability", "retry", "quarantine", "infra error", "timeout", "health check", "ổn định", "lỗi ngẫu nhiên"],
    viTags: ["pipeline chập chờn", "lỗi ngẫu nhiên", "test không ổn định", "ổn định ci", "chạy lại khi lỗi", "cách ly test lỗi", "lỗi hạ tầng"],
    key: [
      "Classify: PASS / FAIL (code) / INFRA_ERROR",
      "Retry only infrastructure errors, never real failures",
      "Quarantine flaky tests with owner + ticket",
      "Bench health checks, pinned tools, timeouts everywhere",
      "Track flaky rate and success rate over time"
    ],
    answer: "An unstable CI is worse than a slow one, because developers stop trusting red results and just press re-run. So I would fix stability before speed.<br><br>Step one is <strong>classification</strong>. Every failure should be one of three things: a real code failure, a flaky test, or an infrastructure error like a bench that did not respond. The pipeline should report infrastructure errors separately so developers are not blamed. Step two: <strong>retries only for infrastructure errors</strong>, like a failed download or a debugger connection. Never retry test failures automatically, otherwise you hide real bugs. Step three: <strong>quarantine</strong> flaky tests. Find them by re-running the same commit. If the result changes, move the test to a quarantine list, where it still runs but does not block, with an owner and a ticket to fix it. Step four: remove sources of randomness: pinned tool versions, health checks on benches before each job, and timeouts on every step.<br><br>Then track flaky rate and success rate weekly. [fill: what made the SENT pipeline stable in practice]",
    followups: ["How do you detect flaky tests automatically?", "What if half the suite ends up in quarantine?"]
  },
  {
    id: "cicd-16",
    topic: "cicd",
    type: "practical",
    q: "How do you run tests on real hardware as part of CI?",
    vi: "Làm thế nào để chạy test trên phần cứng thật như một phần của CI?",
    tags: ["HIL", "bench", "hardware in the loop", "flash", "TRACE32", "VECU", "real target", "test trên phần cứng"],
    viTags: ["phần cứng thật", "kiểm thử trên phần cứng", "phần cứng trong vòng lặp", "nạp firmware", "test trên bench", "board thật"],
    key: [
      "Lock bench exclusively (one job per agent)",
      "Health check: power cycle, debugger reachable",
      "Flash exact CI artifact, verify version/boot",
      "Run tests with per-test timeouts",
      "Always collect logs, restore state, release bench"
    ],
    answer: "I structure a bench job as fixed phases. <strong>Lock</strong> the bench so only one job uses it; with self-hosted agents, one job per agent does that. <strong>Health check</strong>: power cycle, and check the debugger and communication interfaces respond. If this fails, mark the bench offline and report an infrastructure error. <strong>Flash</strong> the exact artifact produced by the build stage. Then <strong>verify</strong> the ECU boots and reports the expected software version, so we know we test the right binary. <strong>Test</strong> with a runner like Pytest, with a timeout on every test. Finally, in a step that <em>always</em> runs, <strong>collect</strong> logs and traces, power off and release the bench.<br><br>Benches are limited, so I push as much as possible to earlier stages. Host unit tests and virtual ECU tests catch most issues, and the bench is kept for things that really need hardware, like timing and peripheral behavior. In my background I validated MCAL drivers on both target hardware and VECU, and used TRACE32 and UDE for flashing and debugging; [fill: how much of that hardware execution was triggered from CI vs run manually].",
    followups: ["How do you share one bench between many pull requests?", "What goes into the VECU stage vs the bench stage?"]
  },
  {
    id: "cicd-17",
    topic: "cicd",
    type: "practical",
    q: "How do you handle secrets and credentials in a pipeline?",
    vi: "Bạn xử lý secret và thông tin đăng nhập trong pipeline như thế nào?",
    tags: ["secrets", "credentials", "variable group", "Key Vault", "masking", "least privilege", "service connection", "bảo mật"],
    viTags: ["bảo mật mật khẩu", "quản lý bí mật", "thông tin đăng nhập", "che giấu biến nhạy cảm", "quyền tối thiểu", "kho khóa bí mật", "bảo mật pipeline"],
    key: [
      "Never in the repo, not even in history",
      "Pipeline secret store / vault, referenced by name",
      "Masked in logs; don't echo or pass on command line",
      "Least privilege, scoped to pipeline, rotated",
      "Prefer identity-based access over static keys"
    ],
    answer: "The first rule is simple: secrets never go into the repository, not in YAML, not in scripts, not in history. If one is ever committed, you rotate it, because deleting the file does not remove it from Git history.<br><br>Instead, secrets live in the CI system's secret store or a vault, and the pipeline references them by name. For example, a secret variable <code>$(MY_SECRET)</code> from a variable group linked to a vault. Secret variables are masked in logs. But you still avoid echoing them or passing them as command-line arguments, because other processes can see those. Environment variables mapped only into the step that needs them are safer.<br><br>Then <strong>least privilege</strong>: each pipeline or service connection gets only the permissions it needs, access is limited to specific pipelines, and credentials are rotated. Where possible I prefer identity-based access, like a managed identity or workload identity federation, over long-lived static keys, so there is nothing to leak. On the platform I operate, authentication goes through Entra ID, which follows the same idea.",
    code: "steps:\n- script: ./scripts/upload.sh\n  displayName: Upload package\n  env:\n    REMOTE_TOKEN: $(MY_SECRET)   # mapped only into this step, masked in logs",
    lang: "yaml",
    followups: ["Why are secret variables not automatically available to scripts in Azure Pipelines?", "How would you rotate a leaked token?"]
  },
  {
    id: "cicd-18",
    topic: "cicd",
    type: "practical",
    q: "How do you integrate Pytest into CI?",
    vi: "Làm thế nào để tích hợp Pytest vào CI?",
    tags: ["Pytest", "Python", "JUnit XML", "virtualenv", "venv", "requirements", "markers", "fixture", "báo cáo test"],
    viTags: ["tích hợp pytest", "kiểm thử python", "báo cáo kết quả test", "môi trường ảo python", "tự động hoá kiểm thử", "chạy test trong pipeline"],
    key: [
      "Isolated venv, pinned requirements",
      "--junitxml so CI shows results and trends",
      "Markers to select subsets (smoke, hil)",
      "Fixtures for setup/teardown of targets",
      "Exit code drives pass/fail"
    ],
    answer: "I run Pytest in an isolated <strong>virtual environment</strong> with pinned requirements. So the CI agent's global Python does not matter, and the test environment is reproducible. Pytest's exit code decides whether the step fails. <code>--junitxml</code> writes a JUnit XML report that the CI system shows as a test tab with history, so you see which test failed and whether it is a new failure.<br><br>Inside the suite, <strong>fixtures</strong> handle setup and teardown, for example connecting to a target or a virtual ECU once per session and always cleaning up. <strong>Markers</strong> like <code>smoke</code> or <code>hil</code> let the pipeline select subsets: a fast smoke set on every pull request and the full set nightly. <strong>Parametrize</strong> gives data-driven tests, one test body with many input sets, [fill: whether the SENT framework was data-driven like this]. I used Pytest for MCAL test logic and automation at Bosch.",
    code: "#!/usr/bin/env bash\nset -euo pipefail\npython3 -m venv .venv\n. .venv/bin/activate\npip install -r requirements.txt\npytest tests/ -m \"smoke\" --junitxml=reports/junit.xml -o junit_family=xunit2",
    lang: "bash",
    followups: ["How would you publish that XML in Azure Pipelines?", "Fixture scope: function vs session?"]
  },
  {
    id: "cicd-19",
    topic: "cicd",
    type: "practical",
    q: "Show me a small Bash script you would use as pipeline glue. What makes it robust?",
    vi: "Cho xem một đoạn script Bash nhỏ bạn dùng để kết nối các bước trong pipeline. Điều gì làm nó chắc chắn?",
    tags: ["Bash", "shell", "set -euo pipefail", "trap", "scripting", "glue", "PowerShell", "script"],
    viTags: ["viết script bash", "kịch bản shell", "script kết nối pipeline", "xử lý lỗi trong bash", "script an toàn", "dừng khi lỗi"],
    key: [
      "set -e: stop on first error",
      "set -u: fail on undefined variable",
      "pipefail: pipeline fails if any command fails",
      "trap for cleanup on exit",
      "Quote variables, explicit exit codes"
    ],
    answer: "The first line after the shebang is always <code>set -euo pipefail</code>. <code>-e</code> stops the script at the first failing command, so CI does not continue with a broken build. <code>-u</code> treats an undefined variable as an error. This catches typos like an empty path that would otherwise expand to something dangerous. <code>pipefail</code> makes a pipeline fail if any command in it fails, not just the last one. Without it, <code>make | tee build.log</code> would succeed even if make failed.<br><br>Beyond that: quote every variable, use a <code>trap</code> to clean up on exit whether the script succeeded or not, check required inputs at the top, and return meaningful exit codes. In this sketch exit code 3 means infrastructure error, so the pipeline can tell it apart from a test failure. For Windows agents I would write the same logic in PowerShell with <code>$ErrorActionPreference = 'Stop'</code>. I use both Bash and PowerShell regularly.",
    code: "#!/usr/bin/env bash\nset -euo pipefail\n\nARTIFACT=\"${1:?usage: $0 <artifact-dir>}\"\nLOG_DIR=\"${LOG_DIR:-logs}\"\nmkdir -p \"$LOG_DIR\"\n\ncleanup() { echo \"collecting logs\"; cp -r /tmp/run-*.log \"$LOG_DIR\"/ 2>/dev/null || true; }\ntrap cleanup EXIT\n\nif ! ./tools/check_target.sh; then\n  echo \"##vso[task.logissue type=error]target not reachable\"\n  exit 10                         # infra error; pytest uses 0-5\nfi\n\n./tools/flash.sh \"$ARTIFACT/app.hex\" 2>&1 | tee \"$LOG_DIR/flash.log\"\npytest tests/ --junitxml=\"$LOG_DIR/junit.xml\"",
    lang: "bash",
    followups: ["Where can set -e surprise you?", "Why is '|| true' used in the cleanup function?"]
  },
  {
    id: "cicd-20",
    topic: "cicd",
    type: "theory",
    q: "What are common YAML pitfalls in pipeline definitions?",
    vi: "Những lỗi YAML thường gặp khi định nghĩa pipeline là gì?",
    tags: ["YAML", "pitfalls", "indentation", "Norway problem", "quoting", "multiline", "anchors", "lỗi cú pháp"],
    viTags: ["lỗi cú pháp yaml", "lỗi thụt lề", "bẫy yaml", "dấu nháy trong yaml", "chuỗi nhiều dòng", "cấu hình pipeline sai"],
    key: [
      "Indentation defines structure; spaces only, no tabs",
      "Implicit types: yes/no/on/off, 1.10 vs \"1.10\"",
      "Quote strings with : # * { or leading zeros",
      "| keeps newlines, > folds lines",
      "Validate / lint before pushing"
    ],
    answer: "The most common one is <strong>indentation</strong>. It defines the structure, tabs are not allowed, and one space off can silently move a step into the wrong job or make a key a string instead of a mapping. Second, <strong>implicit typing</strong>: in YAML 1.1 parsers, unquoted <code>yes</code>, <code>no</code>, <code>on</code>, <code>off</code> can become booleans, so a country code <code>NO</code> turns into false. A version like <code>1.10</code> becomes the number 1.1, and leading zeros can be read as octal. So I quote versions and anything that must stay a string.<br><br>Third, <strong>special characters</strong>: a value containing <code>: </code>, <code>#</code>, or starting with <code>*</code>, <code>&amp;</code> or <code>{</code> needs quotes. Otherwise it is parsed as a mapping, comment, alias or flow map. Fourth, <strong>multiline strings</strong>: <code>|</code> keeps newlines, which you want for scripts; <code>&gt;</code> folds lines into one, which can merge two commands. Also, CI systems add their own expression syntax on top, like <code>$(var)</code> vs <code>${{ }}</code> in Azure, which are evaluated at different times. I lint and validate before pushing.",
    followups: ["In Azure Pipelines, what is the difference between $(var) and ${{ variables.var }}?", "What are YAML anchors and does every CI system support them?"]
  },
  {
    id: "cicd-21",
    topic: "cicd",
    type: "practical",
    q: "How do you use Git and branch policies as a quality gate in CI?",
    vi: "Làm thế nào để dùng Git và branch policy làm cổng chất lượng trong CI?",
    tags: ["Git", "pull request", "PR", "branch policy", "required checks", "protected branch", "quality gate", "code review", "merge"],
    viTags: ["cổng chất lượng", "chính sách nhánh", "bảo vệ nhánh", "yêu cầu hợp nhất", "review code", "kiểm tra bắt buộc trước khi merge"],
    key: [
      "Feature branch, PR into protected main",
      "PR trigger runs validation pipeline",
      "Required: green build + reviewer approval",
      "No direct push to main",
      "Tag releases, trace artifact to commit"
    ],
    answer: "The flow I use is: work on a feature branch, open a <strong>pull request</strong> into a protected main branch, and let the pipeline run on the PR. <strong>Branch policies</strong> then act as the quality gate. Nobody can push directly to main, a merge requires the validation build to pass, and at least one reviewer must approve, often a code owner of the affected component. You can also require linked work items, for example a Jira ticket, which helps traceability.<br><br>A few practical points. The validation build should be fast, so the PR check runs build, unit tests and static analysis, and the long hardware regression runs nightly or on merge. Build policies can be set to expire when main moves on, so what you merge was tested against current main. And after merge, release commits are <strong>tagged</strong>, and every artifact records the commit it came from. I use Git and Jira daily. One of the internal tools I built, Pullogic, is a pull-request review tool integrated with Jira, so I have thought about review workflow.",
    followups: ["What is the risk if the PR build is tested against a stale main?", "Merge commit vs squash vs rebase: which do you prefer?"]
  },
  {
    id: "cicd-22",
    topic: "cicd",
    type: "theory",
    q: "How do you manage and version build artifacts?",
    vi: "Bạn quản lý và đánh phiên bản cho các artifact build như thế nào?",
    tags: ["artifact", "versioning", "semantic versioning", "build once", "promotion", "retention", "traceability", "phiên bản"],
    viTags: ["quản lý phiên bản", "đánh số phiên bản", "quản lý artifact", "build một lần", "truy vết bản build", "thời gian lưu trữ", "thăng cấp artifact"],
    key: [
      "Build once, promote the same binary through stages",
      "Unique version: semver + build number + commit",
      "Attach metadata: commit, lockfile, toolchain, test results",
      "Immutable: never overwrite a released version",
      "Retention: short for dev, permanent for releases"
    ],
    answer: "My principle is <strong>build once, promote many</strong>. The binary that was tested is the binary that is released. You never rebuild for the release, because a rebuild could differ in compiler, dependency or timestamp, and then your test evidence no longer applies.<br><br>Each artifact gets a <strong>unique, immutable version</strong>, for example a semantic version plus build number plus short commit hash, and a released version is never overwritten. Along with it I store <strong>metadata</strong>: the source commit, the lockfile or dependency list, the toolchain image, the configuration and a link to the test results. That answers the auditor's question: where does this binary come from and what was it tested with? This connects to configuration management under ASPICE.<br><br>For storage, pipeline artifacts are fine for passing outputs between stages. But for anything shared you want a proper repository with retention rules: development builds expire after a while, releases are kept. For C/C++ libraries, Conan packages on a remote give you versioning and binaries per configuration. I also apply Conan versioning discipline on the dependency side.",
    followups: ["How would you implement promotion between dev, test and release repositories?", "What belongs in the build metadata for a safety-relevant ECU?"]
  },
  {
    id: "cicd-23",
    topic: "cicd",
    type: "theory",
    bridge: true,
    q: "Have you worked with Jenkins? How would you write a Jenkins pipeline?",
    vi: "Bạn đã làm việc với Jenkins chưa? Bạn sẽ viết một Jenkins pipeline như thế nào?",
    tags: ["Jenkins", "Jenkinsfile", "declarative pipeline", "agent", "label", "stage", "post", "bridge", "Azure Pipelines"],
    viTags: ["viết jenkinsfile", "pipeline khai báo", "kinh nghiệm jenkins", "so sánh jenkins và azure", "máy build jenkins", "chuyển đổi công cụ ci"],
    key: [
      "Honest: not in a project; used Azure Pipelines",
      "Jenkinsfile in repo = azure-pipelines.yml",
      "agent { label } = pool + demands",
      "stages/steps = stages/jobs/steps",
      "post { always } = condition: always(); credentials store = secret vars"
    ],
    answer: "I haven't used Jenkins in a project. My pipeline experience is with <strong>Azure Pipelines</strong>, which is the same concept with different syntax, so let me map it. A <strong>Jenkinsfile</strong> in the repository is the equivalent of <code>azure-pipelines.yml</code>. In a declarative pipeline, <code>agent { label 'x' }</code> selects a node, like a pool plus demands in Azure. The Jenkins controller schedules, and agents or nodes execute, similar to Azure DevOps and its agents. <code>stages</code> and <code>steps</code> map to stages, jobs and steps. The <code>post { always { ... } }</code> block is like <code>condition: always()</code> for publishing results and cleaning up. <code>junit</code> publishes test results, <code>archiveArtifacts</code> stores outputs, and the Jenkins credentials store with <code>withCredentials</code> plays the role of secret variables.<br><br>The main differences are Groovy instead of YAML, declarative versus scripted pipelines, and a large plugin ecosystem that must be maintained. Since the concepts are the same, I would learn it quickly, starting by reading your existing Jenkinsfiles and shared libraries.",
    code: "pipeline {\n  agent { label 'linux-build' }\n  options { timeout(time: 60, unit: 'MINUTES') }\n  stages {\n    stage('Build') { steps { sh './ci/build.sh' } }\n    stage('Test')  { steps { sh './ci/test.sh' } }\n  }\n  post {\n    always {\n      junit 'reports/*.xml'\n      archiveArtifacts artifacts: 'build/out/**', fingerprint: true\n    }\n  }\n}",
    lang: "text",
    followups: ["Declarative vs scripted pipeline?", "What is a Jenkins shared library?"]
  },
  {
    id: "cicd-24",
    topic: "cicd",
    type: "theory",
    bridge: true,
    q: "What do you know about GitLab CI?",
    vi: "Bạn biết gì về GitLab CI?",
    tags: ["GitLab", "GitLab CI", ".gitlab-ci.yml", "runner", "executor", "needs", "DAG", "rules", "bridge"],
    viTags: ["kiến thức gitlab ci", "file cấu hình gitlab", "máy chạy runner", "phụ thuộc giữa các job", "quy tắc chạy job", "so sánh công cụ ci"],
    key: [
      "Honest: not in a project; concepts from Azure Pipelines",
      ".gitlab-ci.yml = azure-pipelines.yml",
      "Runner (shell / docker executor) = agent",
      "Runner tags = demands; needs: = dependsOn / DAG",
      "artifacts vs cache; rules: = conditions/triggers"
    ],
    answer: "I haven't used GitLab CI in a project, but the model maps directly onto Azure Pipelines, which I have used. The pipeline lives in <code>.gitlab-ci.yml</code> at the repository root, like <code>azure-pipelines.yml</code>. You declare <strong>stages</strong>, and jobs belong to a stage. Jobs run on a <strong>GitLab Runner</strong>, the equivalent of an agent. The runner has an executor, for example shell or Docker, where each job gets a fresh container, similar to container jobs in Azure. Runner <strong>tags</strong> select the right machine, like demands, so a bench runner would carry a tag for its target.<br><br><code>needs:</code> lets a job start as soon as its dependencies finish. This builds a DAG instead of waiting for the whole stage, similar to <code>dependsOn</code>. GitLab separates <strong>artifacts</strong>, outputs passed to later jobs, from <strong>cache</strong>, reused dependencies between runs. <code>rules:</code> control when jobs run, for merge requests or specific branches, and protected branches plus merge request pipelines give the quality gate. I would learn it quickly by reading your existing pipeline files.",
    code: "stages: [build, test]\n\nbuild:\n  stage: build\n  image: registry.example/build-image:1.4.0\n  script:\n    - ./ci/build.sh\n  artifacts:\n    paths: [build/out/]\n\nhw_test:\n  stage: test\n  needs: [build]\n  tags: [bench-rh850]\n  script:\n    - ./ci/flash_and_test.sh build/out\n  artifacts:\n    when: always\n    reports:\n      junit: reports/junit.xml",
    lang: "yaml",
    followups: ["What is the difference between artifacts and cache in GitLab?", "How would you prevent two jobs from using one bench at the same time?"]
  },
  {
    id: "cicd-25",
    topic: "cicd",
    type: "theory",
    bridge: true,
    q: "Have you used Artifactory? How does it relate to Conan?",
    vi: "Bạn đã dùng Artifactory chưa? Nó liên quan thế nào đến Conan?",
    tags: ["Artifactory", "JFrog", "Conan remote", "repository", "local", "remote", "virtual", "promotion", "bridge", "kho artifact"],
    viTags: ["kho artifact", "kho lưu trữ gói", "máy chủ conan", "kho nhị phân", "thăng cấp gói", "quản lý gói"],
    key: [
      "Honest: used Conan in CI, not Artifactory itself",
      "Artifactory can host Conan repos (a Conan remote)",
      "Local / remote (proxy) / virtual repositories",
      "Also Docker, PyPI, generic (ELF/HEX)",
      "Promotion dev to release; build info for traceability"
    ],
    answer: "I haven't used Artifactory in a project. What I did use is <strong>Conan</strong> integrated with Azure Pipelines, and Conan works through remotes: servers that store recipes and prebuilt binaries. Artifactory is one of the most common servers used for exactly that, because it can host <strong>Conan repositories</strong>. So from the pipeline's point of view it is just <code>conan remote add</code> pointing at an Artifactory URL, plus credentials from the secret store. [fill: what your Conan remote actually was, if you can say].<br><br>Beyond Conan, Artifactory is a universal artifact repository. It has <strong>local</strong> repositories for what you produce, <strong>remote</strong> repositories that proxy and cache external sources like PyPI or Docker Hub, and <strong>virtual</strong> repositories that combine both under one URL. It stores Docker images, Python packages and generic files like ELF or HEX firmware. The features I find most relevant for automotive are <strong>promotion</strong> and <strong>build info</strong>. Promotion moves the same binary from a dev repo to test to release instead of rebuilding. Build info records commit and dependencies for traceability. The concepts match what I already do, so I would learn it quickly.",
    followups: ["Why use a remote (proxy) repository for PyPI?", "What is build promotion and why not rebuild for release?"]
  },
  {
    id: "cicd-26",
    topic: "cicd",
    type: "theory",
    bridge: true,
    q: "Do you know Ansible? How does it compare to Terraform?",
    vi: "Bạn có biết Ansible không? So với Terraform thì thế nào?",
    tags: ["Ansible", "Terraform", "configuration management", "provisioning", "playbook", "idempotent", "agentless", "SSH", "bridge", "IaC"],
    viTags: ["quản lý cấu hình", "cấp phát hạ tầng", "so sánh ansible terraform", "hạ tầng dạng code", "tự động hoá máy chủ", "không cần agent"],
    key: [
      "Honest: Terraform yes, Ansible not in a project",
      "Terraform: provisions infra (VMs, networks), keeps state",
      "Ansible: configures machines (packages, files, services)",
      "Agentless over SSH/WinRM; YAML playbooks, roles",
      "Idempotent: rerun = same result, only report 'changed'"
    ],
    answer: "I haven't used Ansible in a project; I use <strong>Terraform</strong> for infrastructure as code on Azure and GCP. They work together at different layers. Terraform is <strong>provisioning</strong>: it creates the cloud resources, like virtual machines, networks, DNS and app services, declaratively, with a state file that tracks what exists. Ansible is <strong>configuration management</strong>: once a machine exists, it installs packages, copies configuration files, and sets up services and tools. A typical combination is Terraform creating build agent VMs and Ansible configuring them. Or Ansible keeping bench PCs consistent: same debugger software version, same drivers, same Python environment.<br><br>Key Ansible concepts: it is <strong>agentless</strong>, connecting over SSH or WinRM, so nothing needs to be installed on the target except Python for Linux hosts. An <strong>inventory</strong> lists hosts in groups, <strong>playbooks</strong> in YAML apply tasks to groups, and <strong>roles</strong> package reusable tasks. The most important property is <strong>idempotency</strong>: rerunning a playbook gives the same end state, and it only reports a change when something really changed. That is the same desired-state thinking as Terraform, so I would learn it quickly.",
    followups: ["Why is a shell task not idempotent by default?", "How would you keep secrets in Ansible?"]
  },
  {
    id: "cicd-27",
    topic: "cicd",
    type: "theory",
    bridge: true,
    q: "The JD mentions AWS. What is your cloud experience?",
    vi: "Mô tả công việc có nhắc đến AWS. Kinh nghiệm về cloud của bạn thế nào?",
    tags: ["AWS", "Azure", "GCP", "EC2", "S3", "IAM", "EKS", "AKS", "Entra ID", "cloud", "bridge"],
    viTags: ["điện toán đám mây", "kinh nghiệm cloud", "kinh nghiệm aws", "nền tảng đám mây", "quản lý quyền truy cập", "yêu cầu công việc"],
    key: [
      "Honest: Azure + GCP in production, not AWS",
      "EC2 = Azure VM / GCE; S3 = Blob / Cloud Storage",
      "IAM = Entra ID + Azure RBAC / GCP IAM",
      "EKS = AKS / GKE; ECR = ACR / Artifact Registry",
      "Same IaC with Terraform, different provider"
    ],
    answer: "My hands-on cloud experience is <strong>Azure and Google Cloud</strong>. I deploy and operate applications and infrastructure with Terraform, Docker and Kubernetes, and I manage Azure services like App Service, networking and DNS, and Entra ID authentication. I haven't used AWS in a project, but the services map closely. <strong>EC2</strong> is the equivalent of an Azure VM or a GCP Compute Engine instance. It would be the build agents, with auto scaling on queue length. <strong>S3</strong> matches Azure Blob Storage or Cloud Storage for logs, reports and caches. <strong>IAM</strong> roles match Entra ID identities with Azure role assignments, or GCP IAM. The principle is the same: give agents roles, not static keys, with least privilege. <strong>EKS</strong> maps to AKS or GKE, and <strong>ECR</strong> to Azure Container Registry or Artifact Registry.<br><br>Also, since I already use Terraform, working with AWS is mostly a matter of a different provider and resource names, while state, plan and modules stay the same. So I would learn it quickly, focusing on how your build agents and networking to the lab are set up.",
    followups: ["How would you connect cloud build agents with on-prem benches or license servers?", "What are spot instances and when would you use them for CI?"]
  },
  {
    id: "cicd-28",
    topic: "cicd",
    type: "behavioral",
    q: "Tell me about the infrastructure you operate today: deployment, access control, cost.",
    vi: "Kể về hạ tầng bạn đang vận hành hiện nay: triển khai, kiểm soát truy cập, chi phí.",
    tags: ["AI platform", "operations", "Azure", "GCP", "access control", "Entra ID", "cost governance", "Terraform", "vận hành"],
    viTags: ["vận hành hạ tầng", "kiểm soát truy cập", "quản lý chi phí", "nền tảng ai", "triển khai hệ thống", "chi phí cloud", "hạ tầng hiện tại"],
    key: [
      "Internal engineering platform on Azure + GCP",
      "Deploy with Terraform, Docker, Kubernetes, App Service",
      "Access control via Entra ID auth",
      "Cost governance: visibility + controls",
      "Same ops mindset applies to CI infrastructure"
    ],
    answer: "Since April 2025 I build and operate an internal engineering platform at Bosch. On the infrastructure side, it runs on <strong>Azure and Google Cloud</strong>. The infrastructure is defined with <strong>Terraform</strong>, applications are packaged with <strong>Docker</strong> and run on <strong>Kubernetes</strong> or Azure App Service, and I manage the networking and DNS around it.<br><br>Two operational topics take a lot of my attention. <strong>Access control</strong>: users authenticate through Entra ID, and API access is managed so only authorized people and services can reach it. [fill: how access is granted, e.g. groups, roles, keys per project]. <strong>Cost governance</strong>: usage is made visible and is controlled before costs get too high. [fill: concrete scale and the specific cost-control mechanism you implemented, e.g. budgets, quotas, alerts].<br><br>Why it is relevant here: operating CI infrastructure is the same discipline. You define infrastructure as code, you control who can access what, you measure usage and cost, and you care about reliability, not just about writing the pipeline.",
    followups: ["How do you roll out an infrastructure change safely?", "How would you apply cost governance to CI agents?"]
  }
);
