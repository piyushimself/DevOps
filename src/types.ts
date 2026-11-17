export type TabType = 'layers' | 'environments' | 'pipeline' | 'handbook' | 'challenges' | 'mentor';

export interface EnterpriseLayer {
  id: number;
  name: string;
  subtitle: string;
  badge: string;
  analogyTitle: string;
  analogyDescription: string;
  techDescription: string;
  whyItMatters: string;
  whyNotDirectAccess: string;
  tools: {
    category: string;
    items: string[];
    description: string;
  }[];
  securityRisks: {
    title: string;
    description: string;
    severity: 'critical' | 'high' | 'medium';
    mitigation: string;
  }[];
  realCompanyCase: {
    company: string;
    scenario: string;
    architectureDetail: string;
  };
}

export type PipelineStageStatus = 'idle' | 'running' | 'passed' | 'failed' | 'skipped';

export interface PipelineStage {
  id: string;
  number: number;
  name: string;
  shortName: string;
  category: 'code' | 'build' | 'deps' | 'container' | 'test' | 'deploy' | 'monitor';
  toolUsed: string;
  analogy: string;
  description: string;
  whatItChecks: string[];
  terminalLogPassing: string[];
  terminalLogFailing: string[];
}

export interface VulnerabilityScenario {
  id: string;
  title: string;
  stageId: string;
  category: string;
  freshmanMistake: string;
  realWorldDisaster: string;
  flawedCodeSnippet: {
    fileName: string;
    code: string;
    highlightLine: number;
  };
  fixedCodeSnippet: {
    fileName: string;
    code: string;
    explanation: string;
  };
  remediationGuide: string;
}

export interface HandbookChapter {
  id: string;
  chapterNumber: number;
  title: string;
  subtitle: string;
  readTime: string;
  analogyHook: string;
  sections: {
    heading: string;
    content: string[];
    diagramType?: 'layers' | 'pipeline' | 'squads' | 'canary' | 'sast_vs_dast' | 'multi_org' | 'environments';
    proTip?: string;
    analogyBox?: {
      title: string;
      analogy: string;
      technicalEquivalent: string;
    };
  }[];
  keyTakeaways: string[];
}

export interface QuizScenario {
  id: string;
  difficulty: 'Beginner' | 'Intermediate' | 'On-Call Incident';
  context: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  takeaway: string;
}

export interface MentorQuestion {
  id: string;
  category: string;
  question: string;
  shortAnswer: string;
  detailedAnalogy: string;
  techDeepDive: string;
}

/* ========================================================================
   Enterprise Environments & Multi-Cloud Types
   ======================================================================== */

export interface IdeWorkstationInfo {
  id: string;
  name: string;
  iconType: 'vscode' | 'pycharm' | 'visualstudio';
  roleInEnterprise: string;
  analogy: string;
  localSecurityGuards: {
    tool: string;
    function: string;
  }[];
  whatHappensBeforeCommit: string[];
}

export interface GitHubOrgStructure {
  id: string;
  orgHandle: string;
  displayName: string;
  purpose: string;
  repoCount: number;
  sampleRepos: string[];
  accessPolicy: string;
  securityEnforcement: string[];
  analogy: string;
}

export interface DeploymentEnvironment {
  id: 'sandbox' | 'dev' | 'qa' | 'prod';
  name: string;
  badge: string;
  cloudAccountType: string;
  dataClassification: string;
  whoHasAccess: string;
  deployTrigger: string;
  analogyTitle: string;
  analogyDescription: string;
  infrastructureSetup: {
    kubernetesNamespace: string;
    databaseTier: string;
    externalNetworking: string;
  };
  securityControls: string[];
  whatCanGoWrong: string;
}

export interface MultiCloudProvider {
  id: 'aws' | 'gcp' | 'alicloud' | 'k8s';
  name: string;
  roleInGlobalOrg: string;
  whyUsedHere: string;
  analogy: string;
  regionsDeployed: string[];
  coreServices: string[];
  securityLens: string;
}

export interface CloudScannerWizInfo {
  toolName: string;
  category: string;
  howItWorks: string;
  analogy: string;
  agentlessAdvantage: string;
  toxicCombinationsExample: {
    flaws: string[];
    riskScore: string;
    whyTraditionalScannersMissIt: string;
    wizDetection: string;
  };
}
