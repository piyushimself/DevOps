import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { PIPELINE_STAGES, VULNERABILITY_SCENARIOS } from '../data/pipelineStagesData';
import { PipelineStageStatus, VulnerabilityScenario } from '../types';
import { 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Terminal, 
  Wrench, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  Code2,
  Lock,
  Layers,
  Info
} from 'lucide-react';

interface PipelineSimulatorProps {
  onPipelinePassed?: () => void;
}

export const PipelineSimulator: React.FC<PipelineSimulatorProps> = ({ onPipelinePassed }) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('clean-build');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [activeStageIndex, setActiveStageIndex] = useState<number>(-1);
  const [stageStatuses, setStageStatuses] = useState<Record<string, PipelineStageStatus>>({});
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [trippedScenario, setTrippedScenario] = useState<VulnerabilityScenario | null>(null);
  const [isFixed, setIsFixed] = useState<boolean>(false);
  const [hasCompletedCleanly, setHasCompletedCleanly] = useState<boolean>(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const currentScenario = 
    VULNERABILITY_SCENARIOS.find(s => s.id === selectedScenarioId) || VULNERABILITY_SCENARIOS[0];

  // Auto-scroll terminal logs
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalLogs]);

  // Handle Scenario Change
  const handleSelectScenario = (id: string) => {
    if (isRunning) return;
    setSelectedScenarioId(id);
    setIsFixed(false);
    setTrippedScenario(null);
    setHasCompletedCleanly(false);
    resetPipeline();
  };

  const resetPipeline = () => {
    setIsRunning(false);
    setActiveStageIndex(-1);
    const initialStatuses: Record<string, PipelineStageStatus> = {};
    PIPELINE_STAGES.forEach(stage => {
      initialStatuses[stage.id] = 'idle';
    });
    setStageStatuses(initialStatuses);
    setTerminalLogs([
      '[READY] DevSecOps Automated CI/CD Engine v2.4 initialized.',
      '[INFO] Select a scenario above or hit "Trigger Pipeline Run" to begin validation.',
    ]);
  };

  // Run the Pipeline
  const handleStartPipeline = () => {
    if (isRunning) return;

    setIsRunning(true);
    setTrippedScenario(null);
    setHasCompletedCleanly(false);
    setActiveStageIndex(0);

    const initialStatuses: Record<string, PipelineStageStatus> = {};
    PIPELINE_STAGES.forEach(stage => {
      initialStatuses[stage.id] = 'idle';
    });
    setStageStatuses(initialStatuses);
    setTerminalLogs([
      `[TRIGGER] Automated Pipeline build initiated for branch: feature/payment-revamp`,
      `[SCENARIO ACTIVE] ${currentScenario.title}${isFixed ? ' (SECURITY PATCH APPLIED)' : ''}`,
      `------------------------------------------------------------------------`,
    ]);

    runNextStage(0, initialStatuses);
  };

  const runNextStage = (stageIdx: number, currentStatuses: Record<string, PipelineStageStatus>) => {
    if (stageIdx >= PIPELINE_STAGES.length) {
      // All passed!
      setIsRunning(false);
      setHasCompletedCleanly(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      if (onPipelinePassed) {
        onPipelinePassed();
      }
      setTerminalLogs(prev => [
        ...prev,
        '------------------------------------------------------------------------',
        '[DEPLOYMENT SUCCESS] All 7 automated security gates passed with high assurance!',
        '[PROD] Traffic smoothly promoted to 100% on Kubernetes cluster. Zero downtime achieved.',
      ]);
      return;
    }

    const stage = PIPELINE_STAGES[stageIdx];
    setActiveStageIndex(stageIdx);

    // Set stage to running
    const updatedStatuses = { ...currentStatuses, [stage.id]: 'running' as PipelineStageStatus };
    setStageStatuses(updatedStatuses);

    setTerminalLogs(prev => [
      ...prev,
      `>>> Entering Stage ${stage.number}/7: ${stage.name} (${stage.toolUsed})...`,
    ]);

    // Check if this scenario fails at this stage (unless patched)
    const shouldFail = !isFixed && currentScenario.stageId === stage.id;

    setTimeout(() => {
      if (shouldFail) {
        // Halt pipeline
        updatedStatuses[stage.id] = 'failed';
        setStageStatuses({ ...updatedStatuses });
        setIsRunning(false);
        setTrippedScenario(currentScenario);
        setTerminalLogs(prev => [
          ...prev,
          ...stage.terminalLogFailing,
          `[CRITICAL STOP] Pipeline halted at Stage ${stage.number}. Production deployment blocked!`,
        ]);
      } else {
        // Pass stage and move to next
        updatedStatuses[stage.id] = 'passed';
        setStageStatuses({ ...updatedStatuses });
        setTerminalLogs(prev => [
          ...prev,
          ...stage.terminalLogPassing,
        ]);
        // Trigger next stage
        setTimeout(() => {
          runNextStage(stageIdx + 1, updatedStatuses);
        }, 800);
      }
    }, 1200);
  };

  // Apply Security Patch
  const handleApplyFix = () => {
    setIsFixed(true);
    setTrippedScenario(null);
    setTerminalLogs(prev => [
      ...prev,
      '[PATCH APPLIED] Security engineer replaced vulnerable pattern with enterprise best practice.',
      '[RETEST READY] Click "Re-run Pipeline" to verify the patch passes all gates!',
    ]);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Top Banner & Scenario Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">
            <span>Continuous Integration & Deployment</span>
            <span aria-hidden="true">·</span>
            <span>Zero-Trust Gates</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Automated DevSecOps Pipeline Simulator
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Experience how automated scanners halt dangerous code from reaching millions of users.
          </p>
        </div>

        {/* Pipeline Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={resetPipeline}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300 disabled:opacity-50 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            onClick={handleStartPipeline}
            disabled={isRunning}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-lg shadow-cyan-500/20 disabled:opacity-50 transition-all cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isFixed ? 'Re-run Pipeline (Verify Patch)' : 'Trigger Pipeline Run'}</span>
          </button>
        </div>
      </div>

      {/* Scenario Picker Carousel */}
      <div className="mt-6">
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
          Select Code Scenario (Inject a Vulnerability)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {VULNERABILITY_SCENARIOS.map(sc => {
            const isSelected = sc.id === selectedScenarioId;
            return (
              <button
                key={sc.id}
                onClick={() => handleSelectScenario(sc.id)}
                disabled={isRunning}
                className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-500 ring-1 ring-cyan-500/50'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/40'
                } disabled:opacity-50`}
              >
                <div className="text-[10px] font-mono text-cyan-400 font-semibold truncate">
                  {sc.category}
                </div>
                <div className="text-xs font-bold text-white truncate mt-0.5">
                  {sc.title}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Pipeline Stage Cards (7 Steps) */}
      <div className="mt-8">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
          <span className="font-semibold uppercase tracking-wider">Automated Security Gates (Stages 1 – 7)</span>
          <span className="font-mono text-cyan-400">
            {isRunning ? `Running Stage ${activeStageIndex + 1} of 7...` : 'Status: Ready'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
          {PIPELINE_STAGES.map((stage, idx) => {
            const status = stageStatuses[stage.id] || 'idle';
            const isActive = activeStageIndex === idx;

            return (
              <div
                key={stage.id}
                className={`p-3.5 rounded-xl border flex flex-col justify-between transition-all relative overflow-hidden ${
                  status === 'passed'
                    ? 'bg-emerald-950/20 border-emerald-800/60 text-emerald-200'
                    : status === 'failed'
                    ? 'bg-rose-950/30 border-rose-600 text-rose-200 ring-2 ring-rose-500/50'
                    : status === 'running'
                    ? 'bg-cyan-950/30 border-cyan-500 ring-1 ring-cyan-400 text-cyan-100 animate-pulse'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400'
                }`}
              >
                {/* Stage Header */}
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[10px] font-mono font-semibold">
                      GATE 0{stage.number}
                    </span>
                    {status === 'passed' && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    )}
                    {status === 'failed' && (
                      <XCircle className="w-4 h-4 text-rose-400" />
                    )}
                    {status === 'running' && (
                      <div className="w-3 h-3 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
                    )}
                  </div>

                  <h4 className="text-xs font-bold text-white leading-snug">
                    {stage.shortName}
                  </h4>
                  <div className="text-[11px] font-mono text-cyan-400/90 mt-0.5 truncate">
                    {stage.toolUsed}
                  </div>
                </div>

                {/* Analogy Footer */}
                <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10px] text-slate-400 line-clamp-2">
                  {stage.analogy}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tripped Gate Remediation Card (Appears if pipeline fails) */}
      {trippedScenario && (
        <div className="mt-8 p-6 rounded-2xl bg-rose-950/30 border-2 border-rose-500 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-rose-900/50">
            <div>
              <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-1">
                <AlertTriangle className="w-4 h-4" />
                <span>Security Gate Tripped & Production Blocked!</span>
              </div>
              <h3 className="text-lg font-extrabold text-white">
                {trippedScenario.title}
              </h3>
              <p className="text-xs text-rose-200/90 mt-1">
                {trippedScenario.freshmanMistake}
              </p>
            </div>

            <button
              onClick={handleApplyFix}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20 whitespace-nowrap shrink-0 transition-colors cursor-pointer"
            >
              <Wrench className="w-4 h-4" />
              <span>Apply Security Patch</span>
            </button>
          </div>

          {/* Real-World Disaster Impact */}
          <div className="mt-4 p-3 rounded-lg bg-slate-950/80 border border-rose-900/40 text-xs">
            <span className="font-bold text-rose-300 block mb-0.5">
              Why this would ruin the company if it reached production:
            </span>
            <p className="text-slate-300 leading-relaxed">
              {trippedScenario.realWorldDisaster}
            </p>
          </div>

          {/* Code Inspection Diff */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {/* Flawed Code */}
            <div className="p-4 rounded-xl bg-slate-950 border border-rose-900/60">
              <div className="flex items-center justify-between text-xs font-mono text-rose-400 mb-2">
                <span>Vulnerable Code: {trippedScenario.flawedCodeSnippet.fileName}</span>
                <span className="text-[10px] bg-rose-950/60 px-1.5 py-0.5 rounded border border-rose-800">
                  REJECTED
                </span>
              </div>
              <pre className="text-xs font-mono text-slate-300 overflow-x-auto p-2 bg-slate-900/50 rounded leading-relaxed">
                <code>{trippedScenario.flawedCodeSnippet.code}</code>
              </pre>
            </div>

            {/* Secure Patch Code */}
            <div className="p-4 rounded-xl bg-slate-950 border border-emerald-900/60">
              <div className="flex items-center justify-between text-xs font-mono text-emerald-400 mb-2">
                <span>Enterprise Patch: {trippedScenario.fixedCodeSnippet.fileName}</span>
                <span className="text-[10px] bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800">
                  APPROVED
                </span>
              </div>
              <pre className="text-xs font-mono text-emerald-200/90 overflow-x-auto p-2 bg-slate-900/50 rounded leading-relaxed">
                <code>{trippedScenario.fixedCodeSnippet.code}</code>
              </pre>
              <p className="text-[11px] text-slate-400 mt-2">
                {trippedScenario.fixedCodeSnippet.explanation}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Success Celebration Banner */}
      {hasCompletedCleanly && (
        <div className="mt-8 p-6 rounded-2xl bg-emerald-950/30 border border-emerald-500 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                Production Release Verified
              </div>
              <h3 className="text-lg font-bold text-white">
                All 7 Security Gates Passed · Zero Downtime Canary Achieved!
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Your code passed Secret Scans, SAST, SCA, Container & IaC tests, DAST probes, and canary error thresholds.
              </p>
            </div>
          </div>

          <button
            onClick={resetPipeline}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg whitespace-nowrap shrink-0 transition-colors cursor-pointer"
          >
            Test Another Scenario
          </button>
        </div>
      )}

      {/* Live Terminal Console */}
      <div className="mt-8 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-mono font-semibold text-slate-200">
              ci-cd-runner-output.log
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
          </div>
        </div>

        <div className="p-4 font-mono text-xs max-h-64 overflow-y-auto space-y-1 text-slate-300">
          {terminalLogs.map((log, index) => {
            const isAlert = log.includes('[CRITICAL-ALERT]') || log.includes('[FATAL]');
            const isSuccess = log.includes('[SUCCESS]') || log.includes('[DEPLOYMENT SUCCESS]');
            const isStage = log.includes('>>> Entering Stage');
            const isResult = log.includes('[RESULT]') || log.includes('[QUALITY GATE]');

            return (
              <div
                key={index}
                className={`${
                  isAlert
                    ? 'text-rose-400 font-bold bg-rose-950/20 py-0.5 px-1 rounded'
                    : isSuccess
                    ? 'text-emerald-400 font-bold bg-emerald-950/20 py-0.5 px-1 rounded'
                    : isStage
                    ? 'text-cyan-300 font-semibold'
                    : isResult
                    ? 'text-blue-300'
                    : 'text-slate-400'
                }`}
              >
                {log}
              </div>
            );
          })}
          <div ref={terminalEndRef} />
        </div>
      </div>
    </div>
  );
};
