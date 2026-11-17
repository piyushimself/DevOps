import { EnterpriseLayer } from '../types';

export const ENTERPRISE_LAYERS: EnterpriseLayer[] = [
  {
    id: 1,
    name: 'Websites & User Interfaces',
    subtitle: 'The Customer & Employee Front Door',
    badge: 'Presentation Layer',
    analogyTitle: 'The Restaurant Menu & Digital Ordering Screen',
    analogyDescription:
      'Imagine walking into a massive airport food court. You look at the glossy touch-screen kiosk, browse pizza toppings, and press "Order". The screen looks pretty, shows photos, and has buttons. But the screen does NOT bake the pizza, does NOT keep the money in a safe, and does NOT own the flour inventory. It is simply a friendly messenger translating your finger taps into structured requests.',
    techDescription:
      'The client-facing applications running directly in the browser or on smartphones. Includes customer brand websites (amazon.com), mobile apps (iOS/Android), and internal staff portals (Customer Support dashboard, inventory scanner UI). Built with React, Next.js, Vue, Swift, Flutter, and Tailwind.',
    whyItMatters:
      'It creates the first impression and handles human interaction. However, because it runs on the user’s personal device (browser/phone), it is completely untrusted! An attacker can open Chrome DevTools (F12), alter JavaScript variables, and inspect all outgoing network calls.',
    whyNotDirectAccess:
      'A 1st-year fresher often wonders: "Why can\'t my React app just connect to PostgreSQL or SAP directly with a SQL query?" If it did, your database password would be visible in the JavaScript bundle to anyone who presses right-click "Inspect Element". A malicious student could run `DROP TABLE students;` or set `itemPrice = 0.00` before ordering!',
    tools: [
      {
        category: 'Client Frameworks',
        items: ['React', 'Next.js', 'React Native', 'Flutter', 'Angular'],
        description: 'Component-driven user interface builders running in browser or mobile OS.',
      },
      {
        category: 'Delivery & CDN',
        items: ['Cloudflare', 'AWS CloudFront', 'Akamai', 'Vercel Edge'],
        description: 'Distributes static HTML/JS files to servers close to users worldwide in milliseconds.',
      },
      {
        category: 'Edge Security',
        items: ['Content Security Policy (CSP)', 'WAF Bot Protection', 'CAPTCHA (Cloudflare Turnstile)'],
        description: 'Blocks automated scrapers, clickjacking, and Cross-Site Scripting (XSS).',
      },
    ],
    securityRisks: [
      {
        title: 'Cross-Site Scripting (XSS)',
        description: 'Attackers inject malicious JavaScript into comments or search bars that steal session cookies from other users.',
        severity: 'critical',
        mitigation: 'Strict React automatic escaping, Content Security Policy (CSP) headers, and sanitized HTML parsing.',
      },
      {
        title: 'Exposed Secrets in Frontend Bundles',
        description: 'Developers accidentally leaving API secrets or database passwords in `.env` files prefixed with `NEXT_PUBLIC_` or `VITE_`.',
        severity: 'critical',
        mitigation: 'Automated Git pre-commit secret scanners (GitLeaks, TruffleHog) and CI build linting.',
      },
      {
        title: 'Broken Client-Side Validation',
        description: 'Assuming that because a form field requires age >= 18, the user cannot bypass it via curl or Postman.',
        severity: 'high',
        mitigation: 'Never trust frontend checks alone; enforce strict validation in Layer 2 APIs with Zod/Joi.',
      },
    ],
    realCompanyCase: {
      company: 'Amazon.com / Netflix',
      scenario: 'Handling 100 Million Concurrent Browse Sessions',
      architectureDetail:
        'Netflix renders its homepage differently for TV, mobile, and web. It uses server-driven UI and Edge CDNs so the browser only renders what the backend API authorizes, never exposing raw internal database schemas.',
    },
  },
  {
    id: 2,
    name: 'Backend Applications & Microservices',
    subtitle: 'The Brain, Logic & Workflow Engine',
    badge: 'Application & Business Logic Layer',
    analogyTitle: 'The Head Chefs, Waiters & Kitchen Coordinators',
    analogyDescription:
      'Back in the restaurant, behind the swinging kitchen doors, sits a team of specialized chefs. One chef only slices vegetables (Product Catalog Service), another handles the payment register (Payment Service), and another packs the delivery box (Shipping Service). When your kiosk sends an order, the kitchen coordinator (API Gateway) verifies your token and sends orders to each chef over an internal intercom (Kafka / gRPC).',
    techDescription:
      'The heart of business logic. Large enterprises do not build one giant 200,000-line server (Monolith). Instead, they break it down into dozens or hundreds of independent Microservices (Auth Service, Search Service, Recommendation Engine, Order Service). Each microservice has its own focused responsibility and communicates via REST APIs, gRPC, or asynchronous message streams like Apache Kafka.',
    whyItMatters:
      'If the Search Service crashes under Black Friday load, users can still view their existing orders and checkout items already in their cart! Different engineering teams can deploy changes 50 times a day to their individual service without breaking other teams.',
    whyNotDirectAccess:
      'Services must strictly authenticate every request with JSON Web Tokens (JWT) or mutual TLS (mTLS). An internal microservice like "Tax Calculator" must reject unauthorized calls even if the request is originating from inside the company network (Zero Trust Architecture).',
    tools: [
      {
        category: 'Runtimes & Frameworks',
        items: ['Node.js / Express / NestJS', 'Go (Golang)', 'Java Spring Boot', 'Python FastAPI', 'Rust'],
        description: 'High-performance backend languages executing business rules and mathematical calculations.',
      },
      {
        category: 'Gateways & Routing',
        items: ['Kong API Gateway', 'Envoy Proxy', 'AWS API Gateway', 'NGINX'],
        description: 'Front-door router that checks JWT auth tokens, enforces rate limits, and routes to internal services.',
      },
      {
        category: 'Event Streams & Messaging',
        items: ['Apache Kafka', 'RabbitMQ', 'AWS SQS / SNS', 'Redis Pub/Sub'],
        description: 'Decoupled asynchronous message queues enabling services to pass data without waiting synchronously.',
      },
    ],
    securityRisks: [
      {
        title: 'Broken Object Level Authorization (BOLA / IDOR)',
        description: 'A student changes `/api/orders/101` to `/api/orders/102` in the URL and can view someone else\'s private shopping cart.',
        severity: 'critical',
        mitigation: 'Always verify `order.userId === authenticatedUser.id` on every database lookup, never trust the ID parameter blindly.',
      },
      {
        title: 'SQL / NoSQL Injection',
        description: 'Raw string concatenation in database queries allowing attackers to execute commands like `OR 1=1--`.',
        severity: 'critical',
        mitigation: 'Use parameterized queries, Prepared Statements, and trusted ORMs (Prisma, Drizzle, Hibernate).',
      },
      {
        title: 'Denial of Service & API Rate Limiting Bypass',
        description: 'An attacker spams 50,000 OTP requests per second, exhausting SMS credits and overloading memory.',
        severity: 'high',
        mitigation: 'Implement Redis token bucket rate limiters and API Gateway throttling policies.',
      },
    ],
    realCompanyCase: {
      company: 'Uber / Grab',
      scenario: 'Matching 25 Million Daily Rides in Real-Time',
      architectureDetail:
        'Uber runs over 4,000 microservices. When a rider taps "Request Ride", the Dispatch Service calculates coordinates, the Pricing Service calculates surge multipliers, the Driver Notification Service broadcasts via WebSockets, all mediated through Kafka.',
    },
  },
  {
    id: 3,
    name: 'Enterprise Business Systems & Databases',
    subtitle: 'The Vault, Master Ledger & Source of Truth',
    badge: 'Enterprise Core & State Layer',
    analogyTitle: 'The Central Bank Vault, Ledger Book & HR Archive',
    analogyDescription:
      'At the end of the day, how does the restaurant chain know how much total tax it owes to the government? Where are employee bank salaries stored? Where is the contractual supplier agreement for 10 tons of cheese? That is NOT in the kitchen! It is locked in the central corporate headquarters vault with triple-authenticated biometric locks and audit books where no line can ever be erased without a legal audit trail.',
    techDescription:
      'Where the permanent financial records, customer history, supply chain orders, and enterprise resource planning (ERP) reside. Includes enterprise giants like SAP (Supply Chain & General Ledger), Salesforce (CRM & Customer Deals), Workday (HR & Payroll), alongside mission-critical databases like Oracle, PostgreSQL, Snowflake, and MongoDB.',
    whyItMatters:
      'If a frontend app crashes, customers refresh their browser. If an enterprise database gets corrupted or leaked, the company can face billions of dollars in regulatory fines (GDPR/HIPAA), stock crash, or immediate bankruptcy. This layer requires strict ACID guarantees and compliance audits.',
    whyNotDirectAccess:
      'Direct modifications are strictly forbidden. All state mutations must happen through regulated transactional APIs with cryptographic audit logging. No developer has production write permissions without change advisory board (CAB) approvals.',
    tools: [
      {
        category: 'Relational & Distributed DBs',
        items: ['PostgreSQL', 'MySQL', 'Oracle Database', 'AWS Aurora', 'Spanner'],
        description: 'ACID-compliant relational storage for financial transactions, accounts, and relational records.',
      },
      {
        category: 'Enterprise ERP & CRM',
        items: ['SAP S/4HANA', 'Salesforce CRM', 'Workday', 'Microsoft Dynamics 365'],
        description: 'Integrated enterprise suites managing corporate finance, payroll, supplier contracts, and sales pipelines.',
      },
      {
        category: 'Data Warehousing & Analytics',
        items: ['Snowflake', 'Google BigQuery', 'Databricks', 'AWS Redshift'],
        description: 'Massive analytics engines processing billions of historical records for AI models and financial forecasting.',
      },
    ],
    securityRisks: [
      {
        title: 'Unencrypted Data at Rest / Backup Exposure',
        description: 'A database backup file (`dump.sql`) left in a public AWS S3 bucket with customer credit cards or medical history.',
        severity: 'critical',
        mitigation: 'Enforce AES-256 KMS customer-managed key encryption, strict IAM roles, and automated S3 bucket leak alarms.',
      },
      {
        title: 'Privilege Escalation & Shared Superuser Credentials',
        description: 'Multiple engineers sharing the `postgres` or `sa` admin password instead of individual federated Single Sign-On (SSO).',
        severity: 'critical',
        mitigation: 'Role-Based Access Control (RBAC), short-lived AWS IAM database tokens, and zero shared credentials.',
      },
      {
        title: 'Data Sovereignty & Compliance Violations (GDPR / HIPAA)',
        description: 'Storing European citizen personal data on servers in countries without adequate privacy safeguards.',
        severity: 'high',
        mitigation: 'Row-level multi-region data residency sharding and automated PII masking pipelines.',
      },
    ],
    realCompanyCase: {
      company: 'Walmart / Target',
      scenario: 'Managing $600 Billion in Global Inventory Across 10,000 Stores',
      architectureDetail:
        'Walmart connects in-store barcode scanners and e-commerce checkouts directly into an SAP ERP backbone synchronized with distributed cloud databases. If a shelf runs low on peanut butter in Texas, automated restock orders dispatch from the nearest distribution center.',
    },
  },
  {
    id: 4,
    name: 'Infrastructure & Cloud Platforms',
    subtitle: 'The Foundation: Compute, Network & Security Shell',
    badge: 'Foundation & Operating Substrate',
    analogyTitle: 'The Mall Building, Electricity Grid, Roads & Security Guards',
    analogyDescription:
      'Where does the restaurant, kitchen, and vault physically sit? Inside a reinforced concrete building equipped with dual backup diesel generators, fiber-optic telecom cables, air conditioning cooling towers, fire sprinklers, and perimeter security guards checking ID cards at every gate. If the building loses power or someone cuts the cables, everything above stops working instantly!',
    techDescription:
      'The modern compute substrate where code executes: Cloud service providers (AWS, Google Cloud, Microsoft Azure), bare-metal servers, container orchestrators (Kubernetes, Docker), Software-Defined Networking (VPC, Subnets, DNS, Load Balancers), and Infrastructure as Code (Terraform, OpenTofu, Ansible).',
    whyItMatters:
      'Modern infrastructure is no longer physical servers with cables in a basement; it is "Infrastructure as Code" (IaC). You write 20 lines of Terraform code, and 50 virtual servers and load balancers spin up in Frankfurt in 90 seconds. If those 20 lines contain an error (like `0.0.0.0/0` open to the world), your servers get hacked immediately.',
    whyNotDirectAccess:
      'Infrastructure must be completely immutable. Engineers never SSH into production servers to edit config files manually ("No pets, only cattle!"). If a server misbehaves, the orchestrator destroys it and spins up a brand-new pristine container from a cryptographically signed image.',
    tools: [
      {
        category: 'Cloud Providers',
        items: ['Amazon Web Services (AWS)', 'Google Cloud (GCP)', 'Microsoft Azure'],
        description: 'Global hyperscale data centers providing on-demand compute, storage, and networking.',
      },
      {
        category: 'Containers & Orchestration',
        items: ['Kubernetes (K8s)', 'Docker', 'AWS ECS / Fargate', 'Helm'],
        description: 'Packages applications with all dependencies into lightweight portable containers and auto-scales them.',
      },
      {
        category: 'Infrastructure as Code (IaC)',
        items: ['Terraform', 'OpenTofu', 'AWS CDK', 'Pulumi', 'Ansible'],
        description: 'Declares cloud resources as Git-versioned code files, enabling automated peer review and security linting.',
      },
    ],
    securityRisks: [
      {
        title: 'Publicly Exposed Security Groups (Port 22 / 3389 to 0.0.0.0/0)',
        description: 'Leaving server management ports open to the public internet, allowing botnets to brute-force passwords in minutes.',
        severity: 'critical',
        mitigation: 'IaC security scanners (Checkov, tfsec) in CI/CD pipeline, AWS SSM Session Manager with zero open ports.',
      },
      {
        title: 'Containers Running as Root with Privileged Flags',
        description: 'Docker containers running as `root` user allowing container escape vulnerabilities to take over the host kernel.',
        severity: 'critical',
        mitigation: 'Trivy image vulnerability scanning, enforcing `USER nonroot` and Kubernetes Pod Security Standards.',
      },
      {
        title: 'DDoS (Distributed Denial of Service)',
        description: 'Botnet bombarding the servers with 100 Gbps of junk packets, choking network bandwidth.',
        severity: 'high',
        mitigation: 'AWS Shield, Cloudflare Magic Transit, and elastic multi-zone Anycast load balancing.',
      },
    ],
    realCompanyCase: {
      company: 'Spotify / Apple Music',
      scenario: 'Streaming Music to 500 Million Global Listeners Without Glitches',
      architectureDetail:
        'Spotify runs tens of thousands of containerized microservices across multi-region Kubernetes clusters. Automated autoscalers dynamically spin up new pods within 15 seconds during morning commute hours when millions hit play at once.',
    },
  },
];

export interface RequestFlowStep {
  step: number;
  layerId: number;
  layerName: string;
  component: string;
  analogyAction: string;
  technicalAction: string;
  securityGate: string;
}

export const USER_ORDER_FLOW: RequestFlowStep[] = [
  {
    step: 1,
    layerId: 1,
    layerName: 'Layer 1: Websites & UI',
    component: 'React Smartphone App',
    analogyAction: 'Customer taps "Buy Headphones for $99" on their phone screen.',
    technicalAction: 'React state packs JSON payload `{ itemId: "HP-401", qty: 1 }` and sends POST request to `https://api.mega-corp.com/v1/orders`.',
    securityGate: 'Input validation: Prevents negative quantities and escapes characters against XSS.',
  },
  {
    step: 2,
    layerId: 4,
    layerName: 'Layer 4: Infrastructure',
    component: 'Cloudflare & AWS CloudFront WAF',
    analogyAction: 'Security guard at the mall gate verifies the customer is not on a ban list.',
    technicalAction: 'Edge WAF analyzes IP reputation, inspects HTTP headers, blocks SQLi/DDoS signatures, and terminates SSL/TLS encryption.',
    securityGate: 'WAF & Bot Management: Blocks known malicious IP addresses and DDoS flood attempts.',
  },
  {
    step: 3,
    layerId: 2,
    layerName: 'Layer 2: Backend & Microservices',
    component: 'Kong API Gateway & Auth Service',
    analogyAction: 'The head concierge checks your hotel keycard to confirm your identity.',
    technicalAction: 'Validates `Authorization: Bearer <JWT>` cryptographic signature, extracts `userId`, and checks rate limits (max 20 req/min).',
    securityGate: 'Zero Trust Auth: Rejects expired or forged signatures; checks OAuth 2.0 scopes.',
  },
  {
    step: 4,
    layerId: 2,
    layerName: 'Layer 2: Backend & Microservices',
    component: 'Order & Payment Microservices (Go / Node.js)',
    analogyAction: 'The head chef confirms the ingredients are in stock and charges your credit card.',
    technicalAction: 'Order Service talks to Stripe API over mTLS to capture payment, then publishes `OrderPlaced` event to Kafka topic.',
    securityGate: 'BOLA / IDOR Verification: Ensures authenticated user owns the payment method.',
  },
  {
    step: 5,
    layerId: 3,
    layerName: 'Layer 3: Enterprise DBs & ERP',
    component: 'PostgreSQL & SAP S/4HANA',
    analogyAction: 'The corporate accountant writes the transaction in the indelible financial audit ledger.',
    technicalAction: 'Executes ACID transaction updating inventory count `count = count - 1` and registers general ledger entry in SAP.',
    securityGate: 'ACID Row Locks & Encryption: Data encrypted with AES-256 KMS key at rest.',
  },
  {
    step: 6,
    layerId: 4,
    layerName: 'Layer 4: Infrastructure',
    component: 'Kubernetes Cluster & Autoscaler',
    analogyAction: 'The building management sees high demand and automatically opens more service counters.',
    technicalAction: 'K8s Horizontal Pod Autoscaler monitors CPU/memory metrics via Prometheus and maintains 99.999% uptime.',
    securityGate: 'Runtime Defense: Falco monitors system calls to ensure no unauthorized process executions.',
  },
];
