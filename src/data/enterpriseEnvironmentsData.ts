import { 
  IdeWorkstationInfo, 
  GitHubOrgStructure, 
  DeploymentEnvironment, 
  MultiCloudProvider, 
  CloudScannerWizInfo 
} from '../types';

export const IDE_WORKSTATIONS: IdeWorkstationInfo[] = [
  {
    id: 'vscode',
    name: 'Visual Studio Code',
    iconType: 'vscode',
    roleInEnterprise: 'Default developer workstation for Web, TypeScript, Go, and Cloud/Terraform engineers.',
    analogy: 'The architect’s personal drawing desk with real-time spellcheck and auto-correct before any blueprint leaves the room.',
    localSecurityGuards: [
      {
        tool: 'SonarLint Extension',
        function: 'Underlines SQL injection and insecure code smells in yellow/red right inside the editor as you type.',
      },
      {
        tool: 'Snyk Vulnerability Scanner',
        function: 'Inspects package.json dependencies and flags known CVEs right next to the version number.',
      },
      {
        tool: 'Pre-Commit Git Hooks (GitLeaks)',
        function: 'Runs automatically on `git commit` to block commits containing passwords or AWS tokens before they leave the laptop.',
      },
    ],
    whatHappensBeforeCommit: [
      'ESLint & Prettier automatically format code on save',
      'Local unit tests execute via Vitest or Jest (`npm test`)',
      'Git pre-commit hook runs Husky to verify no secret credentials exist in staged git diff',
    ],
  },
  {
    id: 'pycharm',
    name: 'JetBrains PyCharm / IntelliJ IDEA',
    iconType: 'pycharm',
    roleInEnterprise: 'Powerhouse IDE for enterprise Java (Spring Boot), Python data engineering, and backend microservices.',
    analogy: 'A heavy-duty master craftsman’s laboratory bench with built-in microscopes and precision calipers.',
    localSecurityGuards: [
      {
        tool: 'JetBrains Security Linter',
        function: 'Deep semantic analysis across multi-module Java/Python dependencies, tracking untrusted data flow from controller to database.',
      },
      {
        tool: 'Checkmarx / SonarQube IDE Plugin',
        function: 'Syncs enterprise security rules directly from the corporate central server into the developer workspace.',
      },
    ],
    whatHappensBeforeCommit: [
      'Static bytecode verification and unused import cleanup',
      'Local integration test against testcontainers (local Docker PostgreSQL/Kafka instance)',
      'Signed GPG Git commit signature verifying developer hardware identity',
    ],
  },
  {
    id: 'visualstudio',
    name: 'Microsoft Visual Studio Enterprise',
    iconType: 'visualstudio',
    roleInEnterprise: 'Primary environment for .NET Core microservices, enterprise C# backend platforms, and Azure integrations.',
    analogy: 'The industrial factory control console with integrated diagnostics, memory profilers, and assembly analyzers.',
    localSecurityGuards: [
      {
        tool: 'Roslyn Security Analyzers',
        function: 'Compiler-integrated security checks warning against insecure deserialization, cryptographic weaknesses, and buffer issues.',
      },
      {
        tool: 'Microsoft Defender for DevOps',
        function: 'Exposes cloud configuration vulnerabilities before pushing infrastructure code to Azure DevOps or GitHub.',
      },
    ],
    whatHappensBeforeCommit: [
      'Compilation against strict Zero-Warning build policy (`<TreatWarningsAsErrors>true</TreatWarningsAsErrors>`)',
      'Local credential scanner checking appsettings.json for connection strings',
    ],
  },
];

export const GITHUB_ORGANIZATIONS: GitHubOrgStructure[] = [
  {
    id: 'org-sandbox',
    orgHandle: 'megacorp-sandbox',
    displayName: '1. Innovation & Fresher Sandbox Org',
    purpose: 'Free experimentation ground for college interns, new hires, hackathons, and prototype testing without touching real company code.',
    repoCount: 140,
    sampleRepos: ['intern-onboarding-lab', 'hackathon-ai-chat-poc', 'learning-kubernetes-playground'],
    accessPolicy: 'Broad developer read/write. Completely segregated from corporate production credentials and networks.',
    securityEnforcement: [
      'Automated secret scanner enabled (alerts on accidental secret pushes)',
      'Isolated cloud accounts with auto-destroy policies after 14 days',
      'Strict block on importing production database dumps or customer PII',
    ],
    analogy: 'The university chemistry teaching lab where students can mix vinegar and baking soda safely with eye goggles, far away from the nuclear reactor.',
  },
  {
    id: 'org-platform',
    orgHandle: 'megacorp-platform-core',
    displayName: '2. Core Platform & Shared Infrastructure Org',
    purpose: 'Maintains company-wide foundational building blocks: Golden Docker base images, Terraform modules, shared auth SDKs, and CI/CD templates.',
    repoCount: 85,
    sampleRepos: ['golden-docker-images', 'terraform-aws-secure-vpc', 'corporate-auth-jwt-sdk', 'github-actions-security-shared'],
    accessPolicy: 'Restricted write permissions. Maintained by the central Platform & DevSecOps Engineering team.',
    securityEnforcement: [
      'Strict branch protection: Requires 2 Principal Engineer approvals on all Pull Requests',
      'Mandatory signed commits with hardware security keys (YubiKey)',
      'Automated Trivy container scanning and Cosign cryptographic image signing',
    ],
    analogy: 'The municipal government department that builds roads, clean water pipes, and power lines that all buildings in the city rely on.',
  },
  {
    id: 'org-apps',
    orgHandle: 'megacorp-customer-apps',
    displayName: '3. Customer Applications & Web Frontends Org',
    purpose: 'Houses client-facing websites, mobile application codebases (iOS/Android), marketing landing pages, and customer support portals.',
    repoCount: 320,
    sampleRepos: ['retail-web-storefront', 'mobile-ios-app', 'customer-helpdesk-portal', 'checkout-web-experience'],
    accessPolicy: 'Assigned to individual product squads (Squad A owns Checkout, Squad B owns Search, Squad C owns Profile).',
    securityEnforcement: [
      'Dependabot / Snyk automated PRs for npm packages',
      'SonarQube quality gate: 80% unit test coverage required to merge',
      'No secrets allowed in `.env` files; secrets must be pulled at build time from AWS Secrets Manager',
    ],
    analogy: 'The shopping mall retail stores (Nike, Apple, Starbucks) that customers visit, each managed by independent store teams.',
  },
  {
    id: 'org-fintech',
    orgHandle: 'megacorp-fintech-ledger',
    displayName: '4. Financial Services & High-Compliance Org',
    purpose: 'Ultra-secure repositories managing payment gateways, credit card processing, billing ledgers, and SAP ERP integrations.',
    repoCount: 45,
    sampleRepos: ['stripe-payment-router', 'tax-calculation-engine', 'sap-general-ledger-connector', 'user-wallet-service'],
    accessPolicy: 'Ultra-restricted RBAC. Requires background checks and multi-factor hardware authentication.',
    securityEnforcement: [
      'PCI-DSS & SOC-2 compliance enforced on every commit',
      'Wiz & Checkmarx deep security scans blocking builds on ANY medium or high vulnerability',
      'Ephemeral ephemeral test environments with 100% synthetic credit card numbers (no real card data ever enters Git)',
    ],
    analogy: 'The high-security bank vault where armored trucks deposit cash, monitored by biometric fingerprint scanners and dual security guards.',
  },
];

export const DEPLOYMENT_ENVIRONMENTS: DeploymentEnvironment[] = [
  {
    id: 'sandbox',
    name: 'Sandbox Environment',
    badge: 'Isolated Playground',
    cloudAccountType: 'AWS / GCP Sandbox Account (Self-Contained)',
    dataClassification: 'Fake / Mock Synthetic Data Only (Zero Real Users)',
    whoHasAccess: 'All developers, interns, and freshers have self-service creation access.',
    deployTrigger: 'Local developer command (`npm run deploy:sandbox`) or personal git branch.',
    analogyTitle: 'Flight Simulator Training Cockpit',
    analogyDescription: 'A pilot trainee can crash the plane into a virtual mountain 100 times without breaking a single piece of metal or hurting any real passenger.',
    infrastructureSetup: {
      kubernetesNamespace: 'ns-sandbox-devname',
      databaseTier: 'Local Docker Postgres or AWS RDS single-node instance',
      externalNetworking: 'Completely isolated VPC; cannot route to corporate internal network',
    },
    securityControls: [
      'Auto-shutdown script terminates all running compute at 8:00 PM to save cloud costs',
      'No production API credentials or customer databases allowed',
      'Budget cap alert: Shuts down instances if monthly spending exceeds $200',
    ],
    whatCanGoWrong: 'Worst case: A developer forgets a high-power GPU instance running over the weekend, triggering a cloud budget alarm.',
  },
  {
    id: 'dev',
    name: 'Development Environment (Dev)',
    badge: 'Squad Integration',
    cloudAccountType: 'Dedicated AWS/GCP Dev Account',
    dataClassification: 'Mock APIs & Seeded Test Data',
    whoHasAccess: 'Engineering squad members and automated CI/CD runners.',
    deployTrigger: 'Automatically deployed when an engineer opens a Pull Request (`PR-412`). Ephemeral preview environments spun up by ArgoCD.',
    analogyTitle: 'Kitchen Station Rehearsal',
    analogyDescription: 'The chefs practice cooking a new pasta recipe in the staff kitchen to test the cooking time and taste before putting it on tomorrow’s real menu.',
    infrastructureSetup: {
      kubernetesNamespace: 'ns-dev-feature-branches',
      databaseTier: 'Shared development PostgreSQL cluster with randomized seed fixtures',
      externalNetworking: 'Accessible only through Corporate WireGuard / Tailscale VPN',
    },
    securityControls: [
      'Pre-commit secret scans and SonarLint enforcement',
      'Automated preview environments tear down automatically once the Pull Request is merged or closed',
      'Mocked external payment endpoints (Stripe test mode tokens)',
    ],
    whatCanGoWrong: 'Two developers merge conflicting database migrations simultaneously, breaking the dev database schema for 30 minutes until rolled back.',
  },
  {
    id: 'qa',
    name: 'QA / Staging Environment (Pre-Prod)',
    badge: 'Production Mirror',
    cloudAccountType: 'Dedicated Staging AWS/GCP/AliCloud Account',
    dataClassification: 'Sanitized Production Replica (All PII & passwords scrambled)',
    whoHasAccess: 'QA Automation engineers, Security testers, and CI/CD pipelines.',
    deployTrigger: 'Automatic deployment on merge to the `main` branch.',
    analogyTitle: 'The Dress Rehearsal in Full Costume',
    analogyDescription: 'The actors perform the entire theater play with actual stage lights, sound systems, and full costumes before the real public audience arrives tomorrow evening.',
    infrastructureSetup: {
      kubernetesNamespace: 'ns-staging-cluster',
      databaseTier: 'Multi-AZ AWS Aurora / Postgres cluster with replica matching production hardware sizing',
      externalNetworking: 'Protected behind corporate Cloudflare Access with Single Sign-On (SSO)',
    },
    securityControls: [
      'Automated DAST penetration probes (OWASP ZAP) attacking running endpoints',
      'Performance load tests simulating 20,000 virtual users checking for memory leaks',
      'Wiz CSPM scanning cloud infrastructure for misconfigured security groups or open S3 buckets',
    ],
    whatCanGoWrong: 'A load test overloads a third-party SMS vendor quota, temporarily delaying verification codes in staging.',
  },
  {
    id: 'prod',
    name: 'Production Environment (Prod)',
    badge: 'Live World (Real Customers)',
    cloudAccountType: 'Hardened Multi-Region Cloud Accounts (AWS, GCP, AliCloud)',
    dataClassification: 'Real Customer PII, Payment Data & Legal Records (Confidential)',
    whoHasAccess: 'Zero human write access! Only automated CI/CD pipelines with cryptographic signatures can deploy.',
    deployTrigger: 'Canary Deployment via ArgoCD Flagger (5% -> 25% -> 50% -> 100%) after passing all security gates.',
    analogyTitle: 'The Real Highway with 100,000 Cars Driving at 100 km/h',
    analogyDescription: 'The highway is packed with real families. Road maintenance crews cannot shut down the whole highway; they must patch asphalt lane-by-lane with bright orange safety cones and warning lights.',
    infrastructureSetup: {
      kubernetesNamespace: 'ns-production-multi-region',
      databaseTier: 'Multi-region distributed PostgreSQL/Spanner with automatic failover, read replicas, and continuous point-in-time recovery (PITR)',
      externalNetworking: 'Global Anycast CDN (Cloudflare/CloudFront) with DDoS protection and WAF',
    },
    securityControls: [
      'Zero direct SSH or bash terminal access for developers ("No human in production")',
      'All data encrypted with customer-managed keys (AWS KMS / GCP Cloud KMS) with AES-256',
      'Falco kernel monitoring + Datadog 24/7 observability and automated canary rollbacks',
      'Wiz agentless cloud security monitoring every VM, container, and IAM role every 4 hours',
    ],
    whatCanGoWrong: 'A critical undetected zero-day bug could leak customer data or cause a multi-million-dollar outage (which is why Canary gates and Wiz defense exist!).',
  },
];

export const MULTI_CLOUD_PROVIDERS: MultiCloudProvider[] = [
  {
    id: 'aws',
    name: 'Amazon Web Services (AWS)',
    roleInGlobalOrg: 'Primary Global Infrastructure Backbone',
    whyUsedHere: 'Unmatched breadth of services, global availability, and robust enterprise compute (EKS, RDS, S3, DynamoDB).',
    analogy: 'The primary international cargo highway network connecting massive distribution centers across North America and Europe.',
    regionsDeployed: ['us-east-1 (N. Virginia)', 'us-west-2 (Oregon)', 'eu-west-1 (Ireland)', 'ap-southeast-1 (Singapore)'],
    coreServices: ['Amazon EKS (Kubernetes)', 'Amazon RDS Aurora (PostgreSQL)', 'AWS KMS (Encryption Keys)', 'Amazon CloudFront & WAF'],
    securityLens: 'AWS IAM roles for service accounts (IRSA), VPC private subnets, and AWS GuardDuty threat detection.',
  },
  {
    id: 'gcp',
    name: 'Google Cloud Platform (GCP)',
    roleInGlobalOrg: 'Big Data Analytics & AI/ML Intelligence Engine',
    whyUsedHere: 'Best-in-class data warehousing with BigQuery, advanced Kubernetes engine (GKE), and native Vertex AI model capabilities.',
    analogy: 'The high-tech aerospace research laboratory that analyzes satellite weather patterns and calculates optimal flight trajectories.',
    regionsDeployed: ['us-central1 (Iowa)', 'europe-west3 (Frankfurt)', 'asia-south1 (Mumbai)'],
    coreServices: ['Google Kubernetes Engine (GKE)', 'BigQuery Data Warehouse', 'Google Cloud Armor (DDoS/WAF)', 'Cloud Pub/Sub'],
    securityLens: 'GCP BeyondCorp Zero-Trust access, Workload Identity Federation, and automated DLP (Data Loss Prevention) scanning.',
  },
  {
    id: 'alicloud',
    name: 'Alibaba Cloud (AliCloud)',
    roleInGlobalOrg: 'Asia-Pacific & Greater China Regional Compliance Hub',
    whyUsedHere: 'Strict Chinese Cybersecurity Law mandates that Chinese citizen data cannot leave mainland China. AliCloud provides certified domestic data centers in Shanghai, Beijing, and Hangzhou with local ICP licenses.',
    analogy: 'The specialized domestic postal and customs service operating inside a sovereign territory with unique local legal requirements.',
    regionsDeployed: ['cn-shanghai (Shanghai)', 'cn-beijing (Beijing)', 'ap-southeast-1 (Singapore)'],
    coreServices: ['Alibaba Cloud ACK (Kubernetes)', 'PolarDB (Distributed Relational DB)', 'Anti-DDoS Pro', 'OSS (Object Storage)'],
    securityLens: 'MLPS 2.0 (Multi-Level Protection Scheme) legal compliance and isolated national border firewalls.',
  },
  {
    id: 'k8s',
    name: 'Kubernetes (Unified Abstraction Plane)',
    roleInGlobalOrg: 'The Universal Cloud-Agnostic Operating Layer',
    whyUsedHere: 'Prevents vendor lock-in! The same containerized microservice can deploy to AWS EKS, GCP GKE, or AliCloud ACK using identical Helm charts and Kubernetes manifests without rewriting any code.',
    analogy: 'The standardized shipping container size (ISO 668). The same container can be loaded onto an American train, a German ship, or a Chinese truck without unpacking the contents.',
    regionsDeployed: ['Deployed across all 12 multi-cloud regions globally'],
    coreServices: ['Kubernetes Pods & Deployments', 'Envoy Service Mesh / Istio (mTLS)', 'ArgoCD GitOps Controller', 'Horizontal Pod Autoscaler (HPA)'],
    securityLens: 'Pod Security Standards (Restricted), NetworkPolicies blocking cross-namespace traffic, and Open Policy Agent (OPA/Gatekeeper) validating manifests.',
  },
];

export const WIZ_CLOUD_SECURITY: CloudScannerWizInfo = {
  toolName: 'Wiz & Modern Cloud Scanners (CSPM / CNAPP)',
  category: 'Agentless Cloud Security & Risk Graph',
  howItWorks:
    'Instead of installing slow, resource-heavy software agents inside thousands of virtual machines, Wiz connects directly to cloud APIs (AWS, GCP, Azure, AliCloud) and takes read-only snapshot images of virtual disks out-of-band. It analyzes operating system vulnerabilities, cloud IAM permissions, secrets, and network routing into one unified security graph.',
  analogy:
    'Traditional antivirus was like hiring a security guard to stand inside every individual room of a 5,000-room hotel. Wiz is like a military satellite and thermal camera scanning the entire hotel exterior, instantly spotting that Room 304 has an open balcony window with an unsecured ladder reaching directly to the manager’s jewelry safe!',
  agentlessAdvantage:
    'Zero performance impact on production servers, deploys in 15 minutes across 100,000 servers, and eliminates blind spots where developers forgot to install monitoring agents.',
  toxicCombinationsExample: {
    flaws: [
      '1. Virtual Machine exposed to public internet on port 80 (Web)',
      '2. Unpatched Apache Log4j vulnerability in Java application (CVE-2021-44228)',
      '3. VM possesses an attached AWS IAM Role with `AmazonS3FullAccess`',
      '4. An unencrypted S3 bucket contains 5 million customer credit card records',
    ],
    riskScore: 'CRITICAL (Priority 1 Toxic Combination)',
    whyTraditionalScannersMissIt:
      'A network scanner only sees an open port (Low). A dependency scanner only sees a library vulnerability (Medium/High). An IAM scanner only sees a broad policy (Medium). None of them understand how an attacker can link all four together to steal data.',
    wizDetection:
      'Wiz builds an attack graph path showing: Hacker -> Public Port 80 -> Log4j RCE -> Steal Cloud Metadata Token -> Use IAM Role -> Download Customer S3 Bucket. It alerts the security team with a single actionable high-priority ticket before an attacker finds it.',
  },
};
