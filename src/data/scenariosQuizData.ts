import { QuizScenario, MentorQuestion } from '../types';

export const QUIZ_SCENARIOS: QuizScenario[] = [
  {
    id: 'quiz-1',
    difficulty: 'Beginner',
    context:
      'A fellow 1st-year student is building a college sports team portal. They say: "Why write a backend API in Layer 2? I can just install the `pg` PostgreSQL library directly in my React frontend, write SQL in `App.tsx`, and connect directly to the database server!"',
    question: 'Why does an enterprise security engineer immediately reject this architecture?',
    options: [
      {
        id: 'a',
        text: 'PostgreSQL only runs on Linux servers and cannot communicate over the internet.',
        isCorrect: false,
        explanation: 'Postgres can listen on internet ports, but doing so directly from client browsers is catastrophic.',
      },
      {
        id: 'b',
        text: 'The database credentials and query logic would be exposed in the frontend bundle, allowing any visitor to modify or wipe the database.',
        isCorrect: true,
        explanation:
          'Spot on! Code running in the browser is completely public. Anyone can press F12, inspect the bundle, grab the DB password, or alter the SQL commands to steal all user records.',
      },
      {
        id: 'c',
        text: 'React only supports MongoDB and cannot execute SQL statements.',
        isCorrect: false,
        explanation: 'React is a UI library; it has no database restrictions, but should never hold direct DB connections.',
      },
      {
        id: 'd',
        text: 'Backend APIs are only needed if you want to display animated CSS.',
        isCorrect: false,
        explanation: 'CSS animations are purely client-side; APIs handle business logic and authorization.',
      },
    ],
    takeaway: 'Rule of thumb: Frontends are untrusted clients. Layer 2 APIs must guard all database mutations.',
  },
  {
    id: 'quiz-2',
    difficulty: 'Intermediate',
    context:
      'It is 4:45 PM on a Friday. A senior engineer pushes a hotfix for a button color. The CI/CD pipeline halts because Snyk (SCA) detected that an existing indirect dependency `axios@0.19.0` has a High-severity Server-Side Request Forgery (SSRF) CVE. The developer says: "I just changed CSS! Please add `--skip-security-checks` so we can go home."',
    question: 'What is the correct DevSecOps protocol in this situation?',
    options: [
      {
        id: 'a',
        text: 'Approve the bypass immediately because CSS cannot cause an SSRF vulnerability.',
        isCorrect: false,
        explanation:
          'Bypassing the pipeline sets a dangerous precedent. Once deployed, the vulnerable dependency remains in production and can be exploited by attackers regardless of the CSS change.',
      },
      {
        id: 'b',
        text: 'Delete the Snyk scanner from the pipeline configuration permanently.',
        isCorrect: false,
        explanation: 'Removing security scanners leaves the entire enterprise blind to future critical CVEs.',
      },
      {
        id: 'c',
        text: 'Reject the bypass, create an automated upgrade PR to patch `axios` to a safe version, verify the pipeline passes green, and then deploy.',
        isCorrect: true,
        explanation:
          'Exactly! DevSecOps quality gates exist precisely to stop known vulnerabilities from reaching production. Upgrading the package or verifying an automated patch preserves security without blind bypasses.',
      },
      {
        id: 'd',
        text: 'Shut down the production website until Monday morning.',
        isCorrect: false,
        explanation: 'Shutting down production for a non-urgent button color fix is an unnecessary business disruption.',
      },
    ],
    takeaway: 'Never blindly bypass security gates for convenience. The pipeline is your safety net.',
  },
  {
    id: 'quiz-3',
    difficulty: 'On-Call Incident',
    context:
      'During a midnight flash sale, an automated canary deployment rolls out revision v3.2.0 to 5% of users. 90 seconds later, Prometheus records HTTP 500 error rates rising from 0.002% to 4.2% on the canary pods. The main 95% traffic remains at 0.002%.',
    question: 'How should the automated DevSecOps deployment controller respond?',
    options: [
      {
        id: 'a',
        text: 'Send traffic to 100% of users immediately to see if the error rate averages out.',
        isCorrect: false,
        explanation: 'Rolling out to 100% would immediately crash the app for all customers and cause a catastrophic outage.',
      },
      {
        id: 'b',
        text: 'Automatically abort the rollout, route 100% of traffic back to stable v3.1.0, isolate the failing canary pods for log inspection, and trigger a low-priority notification.',
        isCorrect: true,
        explanation:
          'Perfect! This is the essence of modern Progressive Delivery: the canary caught the bug before 95% of users ever saw it. Automated rollback protected customers with zero manual intervention required.',
      },
      {
        id: 'c',
        text: 'Reboot the entire AWS data center.',
        isCorrect: false,
        explanation: 'Rebooting the entire data center is extreme and would take down all unaffected services.',
      },
      {
        id: 'd',
        text: 'Wait 4 hours until the next morning standup meeting to ask the team what to do.',
        isCorrect: false,
        explanation: 'Leaving an error rate elevated for hours harms customers; automated rollback should happen in seconds.',
      },
    ],
    takeaway: 'Automated canary gates protect the company by rolling back regressions before humans even notice.',
  },
  {
    id: 'quiz-4',
    difficulty: 'Beginner',
    context:
      'You are building a Dockerfile for your university microservice. The initial draft does not include a `USER` directive, which means Linux will execute the container process as `root` (User ID 0).',
    question: 'Why does DevSecOps enforce running containers as a non-privileged user (e.g. `USER node` or `USER 10001`)?',
    options: [
      {
        id: 'a',
        text: 'Non-root users make the container run 10 times faster in memory.',
        isCorrect: false,
        explanation: 'User permissions do not change CPU or memory execution speed.',
      },
      {
        id: 'b',
        text: 'If an attacker exploits a code vulnerability and achieves remote shell access, running as root grants them full host kernel privileges and enables container escape.',
        isCorrect: true,
        explanation:
          'Crucial principle! The "Principle of Least Privilege" states software should only have the minimum permissions needed to function. An unprivileged user cannot alter system files or compromise the host server.',
      },
      {
        id: 'c',
        text: 'Docker charges an extra fee if you run containers as root.',
        isCorrect: false,
        explanation: 'Docker is open source and does not charge per user ID.',
      },
      {
        id: 'd',
        text: 'Root users cannot connect to WiFi.',
        isCorrect: false,
        explanation: 'Containers do not connect to WiFi directly; they use virtual bridge networks.',
      },
    ],
    takeaway: 'Always apply Least Privilege: Drop root privileges in containers to prevent host compromise.',
  },
];

export const MENTOR_PRESETS: MentorQuestion[] = [
  {
    id: 'q-1',
    category: 'Enterprise Architecture',
    question: 'Why does SAP cost millions of dollars when PostgreSQL is free?',
    shortAnswer: 'Postgres is just a storage engine; SAP is an entire business operating system with decades of legal and tax compliance.',
    detailedAnalogy:
      'Think of PostgreSQL like a set of blank, high-quality notebook pages. You can write anything in it, but you have to write the rules yourself. SAP is like an entire certified accounting firm with 10,000 pages of pre-written, legally audited corporate rules for tax calculations in 120 countries, multi-currency trade, supply chain customs clearance, and stock audits.',
    techDeepDive:
      'Enterprises run SAP S/4HANA because it connects factory floor robots, inventory warehouses, payroll, and government tax reporting into one ACID-compliant transactional pipeline. If a company invents their own custom accounting tables in Postgres, a single bug could result in massive regulatory fines or tax fraud audits.',
  },
  {
    id: 'q-2',
    category: 'Microservices vs Monolith',
    question: 'What is the real difference between a Monolith and Microservices for a 1st year student?',
    shortAnswer: 'A Monolith is one giant Swiss Army knife; Microservices are a toolbox of specialized individual tools.',
    detailedAnalogy:
      'Imagine a college festival where ONE student is responsible for sound, lights, food catering, ticketing, and stage setup (Monolith). If that student gets sick or drops the notebook, the entire festival halts! In Microservices, you have 5 separate students. If the food student is delayed, the band still performs on stage without disruption.',
    techDeepDive:
      'A Monolith has all code in a single repository and deploys as one binary. While easy to build initially, when a team reaches 50+ engineers, building and testing takes hours. Microservices allow independent teams to deploy 50 times a day with independent database schemas, isolated failure domains, and horizontal scaling.',
  },
  {
    id: 'q-3',
    category: 'DevSecOps & Tools',
    question: 'What is the difference between SAST and DAST in 10 seconds?',
    shortAnswer: 'SAST looks inside the house blueprints; DAST tests if the front door is unlocked from the street.',
    detailedAnalogy:
      'SAST is like an X-ray of your body while you are lying down asleep. It looks at your bones and organs (reading raw source code) to find internal fractures. DAST is like a fitness coach testing your stamina on a treadmill while you are running (poking the live running app with external requests).',
    techDeepDive:
      'SAST (Static Application Security Testing) parses the Abstract Syntax Tree (AST) before compilation. DAST (Dynamic Application Security Testing) deploys the code to a staging sandbox and sends fuzzing attacks over HTTP to detect runtime misconfigurations, header leaks, and unhandled 500 errors.',
  },
  {
    id: 'q-4',
    category: 'Infrastructure & Cloud',
    question: 'What is Kubernetes in the simplest real-world words?',
    shortAnswer: 'Kubernetes is an automated shipping yard manager for software containers.',
    detailedAnalogy:
      'Imagine a busy seaport with 10,000 metal shipping containers. A human manager cannot manually inspect every container, carry them by hand, or decide where to place them. Kubernetes is the giant automated robotic crane system. If one container catches fire, the crane throws it in the sea and spins up an exact identical copy in 10 seconds.',
    techDeepDive:
      'Kubernetes (K8s) is a container orchestrator. It ensures your declared state (e.g. "Run exactly 8 instances of order-service across 3 availability zones") matches reality. If a server node crashes, K8s reschedules the missing pods on healthy nodes, updates internal DNS, and load balances traffic automatically.',
  },
];
