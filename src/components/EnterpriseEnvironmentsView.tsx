import React, { useState, useRef, useEffect } from 'react';
import { 
  IDE_WORKSTATIONS, 
  GITHUB_ORGANIZATIONS, 
  DEPLOYMENT_ENVIRONMENTS, 
  MULTI_CLOUD_PROVIDERS, 
  WIZ_CLOUD_SECURITY 
} from '../data/enterpriseEnvironmentsData';
import { 
  DeploymentEnvironment, 
  GitHubOrgStructure, 
  MultiCloudProvider, 
  IdeWorkstationInfo 
} from '../types';
import { 
  Laptop, 
  GitBranch, 
  Server, 
  Cloud, 
  ShieldCheck, 
  ShieldAlert, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Layers, 
  Terminal, 
  Radio, 
  Database,
  Globe,
  Cpu,
  AlertTriangle,
  Play,
  RotateCcw
} from 'lucide-react';

type SubViewType = 'ide' | 'github' | 'environments' | 'multicloud' | 'wiz';

export const EnterpriseEnvironmentsView: React.FC = () => {
  const [subView, setSubView] = useState<SubViewType>('environments');
  const [selectedEnvId, setSelectedEnvId] = useState<'sandbox' | 'dev' | 'qa' | 'prod'>('prod');
  const [selectedCloudId, setSelectedCloudId] = useState<'aws' | 'gcp' | 'alicloud' | 'k8s'>('aws');
  const [selectedOrgId, setSelectedOrgId] = useState<string>('org-apps');
  const [selectedIdeId, setSelectedIdeId] = useState<string>('vscode');
  
  // Interactive Code Promotion Journey State
  const [journeyStep, setJourneyStep] = useState<number | null>(null);
  const [isJourneyPlaying, setIsJourneyPlaying] = useState<boolean>(false);
  const journeyIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (journeyIntervalRef.current) {
        clearInterval(journeyIntervalRef.current);
      }
    };
  }, []);

  const selectedEnv = DEPLOYMENT_ENVIRONMENTS.find(e => e.id === selectedEnvId) || DEPLOYMENT_ENVIRONMENTS[3];
  const selectedCloud = MULTI_CLOUD_PROVIDERS.find(c => c.id === selectedCloudId) || MULTI_CLOUD_PROVIDERS[0];
  const selectedOrg = GITHUB_ORGANIZATIONS.find(o => o.id === selectedOrgId) || GITHUB_ORGANIZATIONS[2];
  const selectedIde = IDE_WORKSTATIONS.find(i => i.id === selectedIdeId) || IDE_WORKSTATIONS[0];

  // Journey steps: Laptop -> GitHub Org -> Dev -> QA -> Wiz Scan -> Prod Multi-Cloud
  const JOURNEY_STEPS = [
    {
      step: 1,
      title: 'Local Workstation (VS Code / PyCharm)',
      sub: 'Developer types code locally',
      detail: 'SonarLint checks for SQL injection inline. Pre-commit GitLeaks hook stops code if an AWS API key is detected.',
      subViewTarget: 'ide' as SubViewType,
    },
    {
      step: 2,
      title: 'GitHub Organization (megacorp-customer-apps)',
      sub: 'Pull Request opened on branch',
      detail: 'Branch protection requires 2 peer reviews. Automated CI checks run tests, linting, and Trivy container builds.',
      subViewTarget: 'github' as SubViewType,
    },
    {
      step: 3,
      title: 'Development Environment (Dev)',
      sub: 'Ephemeral PR Preview spun up',
      detail: 'Kubernetes spins up an isolated preview pod with mock databases so the squad can verify UX.',
      subViewTarget: 'environments' as SubViewType,
    },
    {
      step: 4,
      title: 'QA / Staging (Pre-Prod)',
      sub: 'Merged to main branch',
      detail: 'Deployed to full production replica with sanitized PII. OWASP ZAP runs automated penetration tests.',
      subViewTarget: 'environments' as SubViewType,
    },
    {
      step: 5,
      title: 'Wiz Cloud Security Audit',
      sub: 'Agentless risk graph validation',
      detail: 'Wiz audits the cloud posture, verifying zero toxic combinations (e.g. no open public ports with admin IAM roles).',
      subViewTarget: 'wiz' as SubViewType,
    },
    {
      step: 6,
      title: 'Multi-Cloud Production (AWS + AliCloud + GCP)',
      sub: 'Canary rollout to live customers',
      detail: 'Traffic shifted 5% -> 25% -> 100% across global Kubernetes clusters. Prometheus canary health gate monitors errors.',
      subViewTarget: 'multicloud' as SubViewType,
    },
  ];

  const handlePlayJourney = () => {
    if (journeyIntervalRef.current) {
      clearInterval(journeyIntervalRef.current);
    }
    setIsJourneyPlaying(true);
    setJourneyStep(1);
    setSubView('ide');

    let current = 1;
    journeyIntervalRef.current = setInterval(() => {
      current++;
      if (current <= JOURNEY_STEPS.length) {
        setJourneyStep(current);
        const nextStep = JOURNEY_STEPS.find(s => s.step === current);
        if (nextStep) {
          setSubView(nextStep.subViewTarget);
          if (current === 3) setSelectedEnvId('dev');
          if (current === 4) setSelectedEnvId('qa');
          if (current === 6) setSelectedEnvId('prod');
        }
      } else {
        if (journeyIntervalRef.current) {
          clearInterval(journeyIntervalRef.current);
          journeyIntervalRef.current = null;
        }
        setIsJourneyPlaying(false);
      }
    }, 2800);
  };

  const handleResetJourney = () => {
    if (journeyIntervalRef.current) {
      clearInterval(journeyIntervalRef.current);
      journeyIntervalRef.current = null;
    }
    setIsJourneyPlaying(false);
    setJourneyStep(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Header bar */}
      <div className="pb-6 border-b border-slate-800">
        <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">
          <span>Enterprise Topology & Real-World Operations</span>
          <span aria-hidden="true">·</span>
          <span>From Laptop to Global Multi-Cloud</span>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          How Enterprise Tools & Environments Fit Together
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Explore where VS Code, multiple GitHub Orgs, Sandbox/Dev/QA/Prod environments, Multi-Cloud (AWS, GCP, AliCloud), and Wiz fit into the real engineering world.
        </p>

        {/* Sub-module Navigation Bar */}
        <div className="flex flex-wrap items-center gap-2 mt-6">
          <button
            onClick={() => setSubView('environments')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              subView === 'environments'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>1. Environments (Sandbox → Prod)</span>
          </button>

          <button
            onClick={() => setSubView('github')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              subView === 'github'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>2. Multiple GitHub Orgs</span>
          </button>

          <button
            onClick={() => setSubView('ide')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              subView === 'ide'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Laptop className="w-3.5 h-3.5" />
            <span>3. Developer IDEs (VS Code / PyCharm)</span>
          </button>

          <button
            onClick={() => setSubView('multicloud')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              subView === 'multicloud'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Cloud className="w-3.5 h-3.5" />
            <span>4. Multi-Cloud (AWS + GCP + AliCloud)</span>
          </button>

          <button
            onClick={() => setSubView('wiz')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              subView === 'wiz'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>5. Cloud Security (Wiz & Scanners)</span>
          </button>
        </div>
      </div>

      {/* Interactive Code Journey Player Banner */}
      <div className="mt-6 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Interactive Promotion Journey: From Laptop to Global Cloud
            </span>
          </div>

          <div className="flex items-center gap-2">
            {!isJourneyPlaying ? (
              <button
                onClick={handlePlayJourney}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded-lg shadow transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Simulate Real Code Promotion</span>
              </button>
            ) : (
              <button
                onClick={handleResetJourney}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Simulation</span>
              </button>
            )}
          </div>
        </div>

        {/* Steps bar */}
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
          {JOURNEY_STEPS.map((s) => {
            const isActive = journeyStep === s.step;
            const isPast = journeyStep !== null && journeyStep > s.step;

            return (
              <div
                key={s.step}
                onClick={() => {
                  setJourneyStep(s.step);
                  setSubView(s.subViewTarget);
                  if (s.step === 3) setSelectedEnvId('dev');
                  if (s.step === 4) setSelectedEnvId('qa');
                  if (s.step === 6) setSelectedEnvId('prod');
                }}
                className={`p-2 rounded-lg border text-left cursor-pointer transition-all ${
                  isActive
                    ? 'bg-cyan-950/60 border-cyan-400 ring-1 ring-cyan-400'
                    : isPast
                    ? 'bg-slate-900 border-emerald-800/80 text-emerald-300'
                    : 'bg-slate-950 border-slate-800/80 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                  <span>STEP 0{s.step}</span>
                  {isPast && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                </div>
                <div className="text-[11px] font-bold truncate text-white">
                  {s.title.split(' ')[0]} {s.title.split(' ')[1]}
                </div>
              </div>
            );
          })}
        </div>

        {journeyStep !== null && (
          <div className="mt-3 p-3 rounded-lg bg-slate-950 border border-cyan-500/30 text-xs">
            {(() => {
              const step = JOURNEY_STEPS.find(s => s.step === journeyStep)!;
              return (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-cyan-400 font-bold font-mono">Step {step.step}: {step.title}</span>
                    <p className="text-slate-200 mt-0.5">{step.detail}</p>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono bg-slate-900 px-2 py-1 rounded border border-slate-800 shrink-0">
                    Inspecting: {step.subViewTarget.toUpperCase()}
                  </span>
                </div>
              );
            })()}
          </div>
        )}
      </div>

      {/* ====================================================================
          SUB-VIEW 1: DEPLOYMENT ENVIRONMENTS (SANDBOX -> DEV -> QA -> PROD)
          ==================================================================== */}
      {subView === 'environments' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          {/* Left Column: 4 Environment Cards (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>The 4 Enterprise Environments</span>
              <span className="text-cyan-400">Click to inspect</span>
            </div>

            {DEPLOYMENT_ENVIRONMENTS.map((env) => {
              const isSelected = env.id === selectedEnvId;

              return (
                <div
                  key={env.id}
                  onClick={() => setSelectedEnvId(env.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-500 shadow-lg shadow-cyan-500/10'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
                      {env.id.toUpperCase()} ENV
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {env.badge}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white">
                    {env.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                    {env.analogyDescription}
                  </p>

                  {isSelected && (
                    <div className="absolute right-0 top-0 bottom-0 w-1 bg-cyan-400 rounded-r-xl" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Detailed Environment Inspector (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                    ENVIRONMENT ARCHITECTURE & ISOLATION
                  </div>
                  <h3 className="text-xl font-extrabold text-white mt-0.5">
                    {selectedEnv.name}
                  </h3>
                </div>
                <span className="text-xs px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono">
                  {selectedEnv.badge}
                </span>
              </div>

              {/* Analogy Box */}
              <div className="mt-5 p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40">
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
                  <Sparkles className="w-4 h-4" />
                  <span>Real-World Analogy: {selectedEnv.analogyTitle}</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed italic">
                  "{selectedEnv.analogyDescription}"
                </p>
              </div>

              {/* Core Parameters Table */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 font-medium block mb-1">Cloud Account Isolation:</span>
                  <strong className="text-white font-mono">{selectedEnv.cloudAccountType}</strong>
                </div>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 font-medium block mb-1">Data Classification:</span>
                  <strong className="text-cyan-300 font-mono">{selectedEnv.dataClassification}</strong>
                </div>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 font-medium block mb-1">Who Has Access:</span>
                  <strong className="text-slate-200">{selectedEnv.whoHasAccess}</strong>
                </div>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 font-medium block mb-1">Deployment Trigger:</span>
                  <strong className="text-emerald-300">{selectedEnv.deployTrigger}</strong>
                </div>
              </div>

              {/* Infrastructure Technical Setup */}
              <div className="mt-5 p-4 rounded-xl bg-slate-950 border border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Technical Infrastructure Specifications
                </h4>
                <div className="space-y-1.5 text-xs text-slate-300 font-mono">
                  <div><span className="text-slate-500">K8s Namespace:</span> {selectedEnv.infrastructureSetup.kubernetesNamespace}</div>
                  <div><span className="text-slate-500">Database Tier:</span> {selectedEnv.infrastructureSetup.databaseTier}</div>
                  <div><span className="text-slate-500">Networking & VPN:</span> {selectedEnv.infrastructureSetup.externalNetworking}</div>
                </div>
              </div>

              {/* Security Controls */}
              <div className="mt-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Enforced Security Safeguards</span>
                </h4>
                <ul className="space-y-1.5">
                  {selectedEnv.securityControls.map((sc, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>{sc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What Can Go Wrong */}
              <div className="mt-5 p-3 rounded-lg bg-rose-950/20 border border-rose-900/40 text-xs text-rose-200/90 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-rose-300 block mb-0.5">Blast Radius & Worst-Case Scenario:</strong>
                  {selectedEnv.whatCanGoWrong}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          SUB-VIEW 2: MULTIPLE GITHUB ORGANIZATIONS
          ==================================================================== */}
      {subView === 'github' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          <div className="lg:col-span-5 flex flex-col gap-3">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>Enterprise GitHub Fleet</span>
              <span className="text-cyan-400">Select an Organization</span>
            </div>

            {GITHUB_ORGANIZATIONS.map((org) => {
              const isSelected = org.id === selectedOrgId;

              return (
                <div
                  key={org.id}
                  onClick={() => setSelectedOrgId(org.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-500 shadow-lg shadow-cyan-500/10'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono font-bold text-cyan-400">
                      @{org.orgHandle}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {org.repoCount} Repos
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white">
                    {org.displayName}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                    {org.purpose}
                  </p>

                  {isSelected && (
                    <div className="absolute right-0 top-0 bottom-0 w-1 bg-cyan-400 rounded-r-xl" />
                  )}
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-7">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                    GITHUB ENTERPRISE ORGANIZATION
                  </div>
                  <h3 className="text-xl font-extrabold text-white mt-0.5">
                    {selectedOrg.displayName}
                  </h3>
                  <div className="text-xs font-mono text-slate-400 mt-0.5">
                    github.com/{selectedOrg.orgHandle} · {selectedOrg.repoCount} active repositories
                  </div>
                </div>
              </div>

              {/* Analogy */}
              <div className="mt-5 p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40">
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
                  <Sparkles className="w-4 h-4" />
                  <span>The Real-World Analogy</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed italic">
                  "{selectedOrg.analogy}"
                </p>
              </div>

              {/* Purpose & Access */}
              <div className="mt-5 space-y-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 font-medium block mb-1">Organization Mission & Role:</span>
                  <p className="text-slate-200 leading-relaxed">{selectedOrg.purpose}</p>
                </div>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 font-medium block mb-1">Access Control & Membership Policy:</span>
                  <p className="text-slate-200 leading-relaxed">{selectedOrg.accessPolicy}</p>
                </div>
              </div>

              {/* Sample Repositories */}
              <div className="mt-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Sample Repositories Inside This Organization
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedOrg.sampleRepos.map((repo, idx) => (
                    <div key={idx} className="p-2.5 rounded bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 flex items-center gap-2">
                      <GitBranch className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span className="truncate">{selectedOrg.orgHandle}/{repo}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security Enforcement Rules */}
              <div className="mt-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Mandatory Security Rules Enforced at Org Level</span>
                </h4>
                <ul className="space-y-1.5">
                  {selectedOrg.securityEnforcement.map((rule, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          SUB-VIEW 3: DEVELOPER IDEs (VS CODE, PYCHARM, VISUAL STUDIO)
          ==================================================================== */}
      {subView === 'ide' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          <div className="lg:col-span-5 flex flex-col gap-3">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>Developer Workstation IDEs</span>
              <span className="text-cyan-400">Select Editor</span>
            </div>

            {IDE_WORKSTATIONS.map((ide) => {
              const isSelected = ide.id === selectedIdeId;

              return (
                <div
                  key={ide.id}
                  onClick={() => setSelectedIdeId(ide.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-500 shadow-lg shadow-cyan-500/10'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/40'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Laptop className="w-4 h-4 text-cyan-400" />
                    <h3 className="text-sm font-bold text-white">
                      {ide.name}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                    {ide.roleInEnterprise}
                  </p>

                  {isSelected && (
                    <div className="absolute right-0 top-0 bottom-0 w-1 bg-cyan-400 rounded-r-xl" />
                  )}
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-7">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl">
              <div className="pb-4 border-b border-slate-800">
                <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                  LOCAL DEVELOPER MACHINE & WORKSTATION
                </div>
                <h3 className="text-xl font-extrabold text-white mt-0.5">
                  {selectedIde.name}
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  {selectedIde.roleInEnterprise}
                </p>
              </div>

              {/* Analogy */}
              <div className="mt-5 p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40">
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
                  <Sparkles className="w-4 h-4" />
                  <span>Real-World Analogy</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed italic">
                  "{selectedIde.analogy}"
                </p>
              </div>

              {/* Local Security Guard Tools */}
              <div className="mt-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Shift-Left Security Tools Running Inside {selectedIde.name}</span>
                </h4>
                <div className="space-y-2">
                  {selectedIde.localSecurityGuards.map((guard, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                      <strong className="text-cyan-300 block mb-0.5 font-mono">{guard.tool}</strong>
                      <p className="text-slate-300">{guard.function}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pre-Commit Automation */}
              <div className="mt-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  What Happens Automatically Before `git commit` Leaves the Laptop
                </h4>
                <ul className="space-y-1.5">
                  {selectedIde.whatHappensBeforeCommit.map((step, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="text-cyan-400 font-bold font-mono">0{idx + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          SUB-VIEW 4: MULTI-CLOUD (AWS + GCP + ALICLOUD + KUBERNETES)
          ==================================================================== */}
      {subView === 'multicloud' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          <div className="lg:col-span-5 flex flex-col gap-3">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>Multi-Cloud Infrastructure Fleet</span>
              <span className="text-cyan-400">Select Provider</span>
            </div>

            {MULTI_CLOUD_PROVIDERS.map((cloud) => {
              const isSelected = cloud.id === selectedCloudId;

              return (
                <div
                  key={cloud.id}
                  onClick={() => setSelectedCloudId(cloud.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-500 shadow-lg shadow-cyan-500/10'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/40'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Cloud className="w-4 h-4 text-cyan-400" />
                    <h3 className="text-sm font-bold text-white">
                      {cloud.name}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                    {cloud.roleInGlobalOrg}
                  </p>

                  {isSelected && (
                    <div className="absolute right-0 top-0 bottom-0 w-1 bg-cyan-400 rounded-r-xl" />
                  )}
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-7">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl">
              <div className="pb-4 border-b border-slate-800">
                <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                  HYPERSCALE CLOUD STRATEGY
                </div>
                <h3 className="text-xl font-extrabold text-white mt-0.5">
                  {selectedCloud.name}
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  {selectedCloud.roleInGlobalOrg}
                </p>
              </div>

              {/* Why used here */}
              <div className="mt-5 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                <strong className="text-cyan-400 block mb-1">Why an Enterprise Uses {selectedCloud.name}:</strong>
                {selectedCloud.whyUsedHere}
              </div>

              {/* Analogy */}
              <div className="mt-5 p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40">
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
                  <Sparkles className="w-4 h-4" />
                  <span>Real-World Analogy</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed italic">
                  "{selectedCloud.analogy}"
                </p>
              </div>

              {/* Regions & Core Services */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 font-medium block mb-1.5">Active Enterprise Regions:</span>
                  <div className="space-y-1">
                    {selectedCloud.regionsDeployed.map((r, idx) => (
                      <div key={idx} className="font-mono text-cyan-300 text-[11px]">• {r}</div>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 font-medium block mb-1.5">Core Cloud Services:</span>
                  <div className="space-y-1">
                    {selectedCloud.coreServices.map((s, idx) => (
                      <div key={idx} className="font-mono text-emerald-300 text-[11px]">• {s}</div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Security Lens */}
              <div className="mt-5 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <span className="text-cyan-400 font-bold block mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Cloud Security Architecture</span>
                </span>
                <p className="text-slate-300 leading-relaxed">{selectedCloud.securityLens}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          SUB-VIEW 5: WIZ & MODERN CLOUD SECURITY SCANNERS (CSPM/CNAPP)
          ==================================================================== */}
      {subView === 'wiz' && (
        <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl">
          <div className="pb-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                AGENTLESS CLOUD SECURITY (CSPM / CNAPP)
              </div>
              <h3 className="text-2xl font-extrabold text-white mt-0.5">
                {WIZ_CLOUD_SECURITY.toolName}
              </h3>
            </div>
            <span className="text-xs px-3 py-1 bg-cyan-950 text-cyan-300 border border-cyan-800 rounded font-mono">
              {WIZ_CLOUD_SECURITY.category}
            </span>
          </div>

          {/* Analogy */}
          <div className="mt-6 p-5 rounded-xl bg-cyan-950/20 border border-cyan-800/40">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>The Satellite vs Hotel Guard Analogy (Why Wiz grew to $12 Billion)</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
              "{WIZ_CLOUD_SECURITY.analogy}"
            </p>
          </div>

          {/* How It Works & Agentless Advantage */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="font-bold text-cyan-400 block mb-1">How Agentless Cloud Scanning Works:</span>
              <p className="text-slate-300 leading-relaxed">
                {WIZ_CLOUD_SECURITY.howItWorks}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="font-bold text-emerald-400 block mb-1">Why Enterprises Prefer Agentless:</span>
              <p className="text-slate-300 leading-relaxed">
                {WIZ_CLOUD_SECURITY.agentlessAdvantage}
              </p>
            </div>
          </div>

          {/* The Concept of "Toxic Combinations" */}
          <div className="mt-6 p-5 rounded-xl bg-rose-950/20 border border-rose-900/50">
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-400 uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                <span>The Toxic Combination Concept: Why Individual Scanners Fail</span>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                {WIZ_CLOUD_SECURITY.toxicCombinationsExample.riskScore}
              </span>
            </div>

            <p className="text-xs text-rose-200/90 leading-relaxed mb-4">
              {WIZ_CLOUD_SECURITY.toxicCombinationsExample.whyTraditionalScannersMissIt}
            </p>

            <div className="space-y-2 mb-4">
              {WIZ_CLOUD_SECURITY.toxicCombinationsExample.flaws.map((flaw, idx) => (
                <div key={idx} className="p-2.5 rounded bg-slate-950/80 border border-rose-900/40 text-xs font-mono text-slate-200">
                  {flaw}
                </div>
              ))}
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-emerald-900/50 text-xs text-emerald-300">
              <strong className="block mb-0.5 text-emerald-400">How Wiz Solves This with an Attack Graph:</strong>
              {WIZ_CLOUD_SECURITY.toxicCombinationsExample.wizDetection}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
