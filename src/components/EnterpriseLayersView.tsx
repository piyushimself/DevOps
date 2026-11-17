import React, { useState, useRef, useEffect } from 'react';
import { ENTERPRISE_LAYERS, USER_ORDER_FLOW } from '../data/enterpriseLayersData';
import { EnterpriseLayer } from '../types';
import { 
  Layers, 
  HelpCircle, 
  ShieldAlert, 
  Briefcase, 
  ArrowRight, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles,
  Smartphone,
  Cpu,
  Database,
  Server,
  Lock,
  Globe
} from 'lucide-react';

export const EnterpriseLayersView: React.FC = () => {
  const [selectedLayerId, setSelectedLayerId] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'tech' | 'analogy'>('tech');
  const [activeFlowStep, setActiveFlowStep] = useState<number | null>(null);
  const [isFlowPlaying, setIsFlowPlaying] = useState<boolean>(false);
  const flowIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (flowIntervalRef.current) {
        clearInterval(flowIntervalRef.current);
      }
    };
  }, []);

  const selectedLayer: EnterpriseLayer = 
    ENTERPRISE_LAYERS.find(l => l.id === selectedLayerId) || ENTERPRISE_LAYERS[0];

  // Helper icons for each layer
  const getLayerIcon = (id: number) => {
    switch (id) {
      case 1:
        return <Smartphone className="w-5 h-5 text-cyan-400" />;
      case 2:
        return <Cpu className="w-5 h-5 text-blue-400" />;
      case 3:
        return <Database className="w-5 h-5 text-indigo-400" />;
      case 4:
        return <Server className="w-5 h-5 text-emerald-400" />;
      default:
        return <Layers className="w-5 h-5 text-cyan-400" />;
    }
  };

  // Play request flow animation
  const handlePlayFlow = () => {
    if (flowIntervalRef.current) {
      clearInterval(flowIntervalRef.current);
    }
    setIsFlowPlaying(true);
    setActiveFlowStep(1);
    setSelectedLayerId(USER_ORDER_FLOW[0].layerId);

    let current = 1;
    flowIntervalRef.current = setInterval(() => {
      current++;
      if (current <= USER_ORDER_FLOW.length) {
        setActiveFlowStep(current);
        const stepData = USER_ORDER_FLOW.find(s => s.step === current);
        if (stepData) {
          setSelectedLayerId(stepData.layerId);
        }
      } else {
        if (flowIntervalRef.current) {
          clearInterval(flowIntervalRef.current);
          flowIntervalRef.current = null;
        }
        setIsFlowPlaying(false);
      }
    }, 2400);
  };

  const handleResetFlow = () => {
    if (flowIntervalRef.current) {
      clearInterval(flowIntervalRef.current);
      flowIntervalRef.current = null;
    }
    setIsFlowPlaying(false);
    setActiveFlowStep(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Header bar with Mode Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            The 4 Enterprise Technology Layers
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            How a global company isolates responsibilities so thousands of engineers can ship safely.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg self-start sm:self-auto">
          <button
            onClick={() => setViewMode('tech')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
              viewMode === 'tech'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Technical Architecture
          </button>
          <button
            onClick={() => setViewMode('analogy')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
              viewMode === 'analogy'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Real-World Analogy
          </button>
        </div>
      </div>

      {/* Main 2-Column Interactive Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        {/* Left Column: Visual Layer Stack (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>Enterprise Hierarchy (Top to Bottom)</span>
            <span className="text-cyan-400">Click a layer to inspect</span>
          </div>

          {ENTERPRISE_LAYERS.map((layer) => {
            const isSelected = layer.id === selectedLayerId;
            const isHighlightedInFlow = 
              activeFlowStep !== null && 
              USER_ORDER_FLOW.find(s => s.step === activeFlowStep)?.layerId === layer.id;

            return (
              <div
                key={layer.id}
                onClick={() => setSelectedLayerId(layer.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'bg-slate-900/90 border-cyan-500 shadow-md shadow-cyan-500/10'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                } ${isHighlightedInFlow ? 'ring-2 ring-cyan-400 animate-pulse' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 p-2 rounded-lg bg-slate-800/80 border border-slate-700 shrink-0">
                    {getLayerIcon(layer.id)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-mono font-semibold text-cyan-400">
                        Layer {layer.id}
                      </span>
                      <span className="text-[11px] text-slate-400 truncate">
                        {layer.badge}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white truncate mt-0.5">
                      {viewMode === 'tech' ? layer.name : layer.analogyTitle}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                      {viewMode === 'tech' ? layer.subtitle : layer.analogyDescription}
                    </p>
                  </div>
                </div>

                {isSelected && (
                  <div className="absolute right-0 top-0 bottom-0 w-1 bg-cyan-400" />
                )}
              </div>
            );
          })}

          {/* Interactive Request Flow Box */}
          <div className="mt-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <Globe className="w-4 h-4 text-cyan-400" />
                <span>Life of an Order (Real-Time Packet Flow)</span>
              </div>
              <div className="flex items-center gap-2">
                {!isFlowPlaying ? (
                  <button
                    onClick={handlePlayFlow}
                    className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded transition-colors cursor-pointer"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Trace Order</span>
                  </button>
                ) : (
                  <button
                    onClick={handleResetFlow}
                    className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 rounded transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                )}
              </div>
            </div>

            <p className="text-xs text-slate-400 mb-3">
              Watch what happens when a customer taps "Buy $99 Headphones" on their smartphone as the request travels across all 4 layers.
            </p>

            {/* Stepper pills */}
            <div className="grid grid-cols-6 gap-1 mb-3">
              {USER_ORDER_FLOW.map((s) => (
                <div
                  key={s.step}
                  onClick={() => {
                    setActiveFlowStep(s.step);
                    setSelectedLayerId(s.layerId);
                  }}
                  className={`h-2 rounded-full cursor-pointer transition-all ${
                    activeFlowStep === s.step
                      ? 'bg-cyan-400 scale-y-125'
                      : activeFlowStep && activeFlowStep > s.step
                      ? 'bg-cyan-600'
                      : 'bg-slate-800'
                  }`}
                  title={`Step ${s.step}: ${s.component}`}
                />
              ))}
            </div>

            {/* Current step callout */}
            {activeFlowStep !== null ? (
              <div className="p-3 rounded-lg bg-slate-950 border border-cyan-500/30 text-xs">
                {(() => {
                  const step = USER_ORDER_FLOW.find(s => s.step === activeFlowStep)!;
                  return (
                    <div>
                      <div className="flex items-center justify-between text-cyan-400 font-mono font-medium mb-1">
                        <span>Step {step.step} of 6: {step.component}</span>
                        <span className="text-[11px] text-slate-400">{step.layerName}</span>
                      </div>
                      <p className="text-slate-200 mt-1 font-medium">{step.technicalAction}</p>
                      <div className="mt-2 text-slate-400 flex items-start gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-emerald-300/90">{step.securityGate}</span>
                      </div>
                    </div>
                  );
                })()}
              </div>
            ) : (
              <div className="text-[11px] text-slate-500 text-center py-2">
                Click "Trace Order" to step through the journey of a transaction!
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Deep-Dive Inspector (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Main Layer Inspector Card */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl">
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700">
                  {getLayerIcon(selectedLayer.id)}
                </div>
                <div>
                  <div className="text-xs font-mono font-semibold text-cyan-400">
                    LAYER {selectedLayer.id} · {selectedLayer.badge}
                  </div>
                  <h3 className="text-xl font-extrabold text-white">
                    {selectedLayer.name}
                  </h3>
                </div>
              </div>

              <span className="text-xs font-medium text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700">
                {selectedLayer.subtitle}
              </span>
            </div>

            {/* Analogy & Why it Matters Callout */}
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40">
                <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 mb-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>Real-World Analogy</span>
                </div>
                <h4 className="text-sm font-bold text-white mb-1">
                  {selectedLayer.analogyTitle}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedLayer.analogyDescription}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-800/40">
                <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 mb-1.5">
                  <HelpCircle className="w-4 h-4" />
                  <span>Why This Layer Exists</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedLayer.whyItMatters}
                </p>
              </div>
            </div>

            {/* Crucial 1st-year misconception: Direct Access */}
            <div className="mt-4 p-4 rounded-xl bg-amber-950/20 border border-amber-800/40">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-1">
                <ShieldAlert className="w-4 h-4" />
                <span>1st-Year Engineering Question: "Why can't Layer 1 connect directly to Layer 3?"</span>
              </div>
              <p className="text-xs text-amber-200/90 leading-relaxed">
                {selectedLayer.whyNotDirectAccess}
              </p>
            </div>

            {/* Industry Tools Used at this Layer */}
            <div className="mt-6">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Industry Standard Tools & Technologies at Layer {selectedLayer.id}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {selectedLayer.tools.map((toolGroup, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
                    <div className="text-xs font-semibold text-slate-200 mb-1.5">
                      {toolGroup.category}
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {toolGroup.items.map((item, itemIdx) => (
                        <span
                          key={itemIdx}
                          className="text-[11px] font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-800/50 px-1.5 py-0.5 rounded"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                    <p className="text-[11px] text-slate-400 leading-normal">
                      {toolGroup.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Risks & DevSecOps Defenses */}
            <div className="mt-6">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Top Security Vulnerabilities Guarded by DevSecOps
              </h4>
              <div className="space-y-2.5">
                {selectedLayer.securityRisks.map((risk, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row sm:items-start justify-between gap-3"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{risk.title}</span>
                        <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded border border-rose-500/30 text-rose-400 bg-rose-950/30">
                          {risk.severity}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{risk.description}</p>
                    </div>

                    <div className="sm:w-64 shrink-0 text-xs text-emerald-400 bg-emerald-950/30 border border-emerald-900/40 p-2 rounded">
                      <span className="font-semibold block text-[10px] uppercase tracking-wider text-emerald-300 mb-0.5">
                        DevSecOps Fix
                      </span>
                      {risk.mitigation}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Real Company Case Study */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shrink-0">
                <Briefcase className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <div className="font-semibold text-slate-200">
                  Real Enterprise Case: {selectedLayer.realCompanyCase.company}
                </div>
                <div className="text-cyan-400 font-medium">
                  {selectedLayer.realCompanyCase.scenario}
                </div>
                <p className="text-slate-400 mt-0.5 leading-relaxed">
                  {selectedLayer.realCompanyCase.architectureDetail}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
