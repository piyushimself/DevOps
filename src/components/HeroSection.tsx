import React from 'react';
import { TabType } from '../types';
import { Layers, PlayCircle, BookOpen, ArrowRight, ShieldCheck, Cpu, Database, Server } from 'lucide-react';

interface HeroSectionProps {
  onSelectTab: (tab: TabType) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectTab }) => {
  return (
    <section className="relative overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-slate-900/60 via-slate-950 to-slate-950 py-12 md:py-16 px-6">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[320px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        {/* Editorial Subtitle / Kicker */}
        <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 tracking-wider uppercase mb-3">
          <span>B.Tech 1st Year Engineering Guide</span>
          <span aria-hidden="true">·</span>
          <span>Enterprise Architecture</span>
          <span aria-hidden="true">·</span>
          <span>Automated CI/CD Workflows</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-balance max-w-4xl leading-[1.15]">
          How Very Large Tech Organizations Work, Live & Deploy in Real Life.
        </h1>

        {/* Subhead / Analogy hook */}
        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed text-balance">
          Forget confusing corporate jargon. Discover how companies like Netflix, Amazon, and Uber take code from a developer’s laptop to 100 million users safely using 4 distinct technology layers and automated DevSecOps security guardrails.
        </p>

        {/* 4 Interactive Exploration Gateways */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {/* Card 1: Enterprise Layers */}
          <div
            onClick={() => onSelectTab('layers')}
            className="group p-5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900 transition-all cursor-pointer shadow-sm relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <span className="text-xs text-slate-400 group-hover:text-cyan-400 flex items-center gap-1 transition-colors">
                Layers <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
              The 4 Enterprise Layers
            </h3>
            <p className="mt-1 text-xs text-slate-400 leading-relaxed">
              From web buttons to microservices, SAP business ledgers, and AWS cloud infrastructure.
            </p>
          </div>

          {/* Card 2: Orgs & Multi-Cloud */}
          <div
            onClick={() => onSelectTab('environments')}
            className="group p-5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900 transition-all cursor-pointer shadow-sm relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                <Server className="w-5 h-5" />
              </div>
              <span className="text-xs text-slate-400 group-hover:text-emerald-400 flex items-center gap-1 transition-colors">
                Topology <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
              Orgs, Multi-Cloud & Wiz
            </h3>
            <p className="mt-1 text-xs text-slate-400 leading-relaxed">
              VS Code, PyCharm, GitHub Orgs, Sandbox/Dev/QA/Prod, AWS, GCP, AliCloud & Wiz CSPM.
            </p>
          </div>

          {/* Card 3: Pipeline Simulator */}
          <div
            onClick={() => onSelectTab('pipeline')}
            className="group p-5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-900 transition-all cursor-pointer shadow-sm relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                <PlayCircle className="w-5 h-5" />
              </div>
              <span className="text-xs text-slate-400 group-hover:text-blue-400 flex items-center gap-1 transition-colors">
                Simulate <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
              Automated Pipeline
            </h3>
            <p className="mt-1 text-xs text-slate-400 leading-relaxed">
              Trigger a live CI/CD run, inject real flaws (secrets, SQLi, CVEs), trip gates, and patch code.
            </p>
          </div>

          {/* Card 4: Training Handbook */}
          <div
            onClick={() => onSelectTab('handbook')}
            className="group p-5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900 transition-all cursor-pointer shadow-sm relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-xs text-slate-400 group-hover:text-indigo-400 flex items-center gap-1 transition-colors">
                Handbook <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
              9-Chapter Handbook
            </h3>
            <p className="mt-1 text-xs text-slate-400 leading-relaxed">
              Complete fresher curriculum: SAST/DAST, Spotify Squads, Canary, Multi-Org & Multi-Cloud.
            </p>
          </div>
        </div>

        {/* Quick Facts Strip */}
        <div className="mt-8 pt-6 border-t border-slate-800/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400 shrink-0" />
            <span><strong className="text-slate-200">Layer 1 & 2:</strong> Untrusted UI & Microservices</span>
          </div>
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-blue-400 shrink-0" />
            <span><strong className="text-slate-200">Layer 3:</strong> ACID Ledgers & SAP Vaults</span>
          </div>
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-indigo-400 shrink-0" />
            <span><strong className="text-slate-200">Layer 4:</strong> Cloud, K8s & Terraform</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span><strong className="text-slate-200">DevSecOps:</strong> Automated Security Gates</span>
          </div>
        </div>
      </div>
    </section>
  );
};
