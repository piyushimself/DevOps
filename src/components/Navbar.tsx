import React from 'react';
import { TabType } from '../types';
import { ShieldCheck, PlayCircle, Layers, BookOpen, HelpCircle, Award, Download } from 'lucide-react';

interface NavbarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  completedChaptersCount: number;
  totalChaptersCount: number;
  pipelinePassedOnce: boolean;
  onOpenCertificate: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  completedChaptersCount,
  totalChaptersCount,
  pipelinePassedOnce,
  onOpenCertificate,
}) => {
  const handleDownloadSingleFile = async () => {
    try {
      const res = await fetch('/devsecops-academy.html');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'index.html'; // Ready to drop into GitHub Pages!
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download failed', err);
    }
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between gap-8 px-6 py-3.5 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      {/* Zone 1: Wordmark */}
      <div 
        onClick={() => onTabChange('layers')}
        className="flex items-center gap-2.5 cursor-pointer select-none whitespace-nowrap shrink-0 group"
      >
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <span className="text-base font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
          DevSecOps <span className="text-cyan-400 font-semibold text-sm">Enterprise Academy</span>
        </span>
      </div>

      {/* Zone 2: Clean single-line navigation links */}
      <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
        <button
          onClick={() => onTabChange('layers')}
          className={`flex items-center gap-2 py-1 transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'layers'
              ? 'text-cyan-400 border-b-2 border-cyan-400 font-semibold'
              : 'hover:text-white text-slate-400'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Enterprise Layers</span>
        </button>

        <button
          onClick={() => onTabChange('environments')}
          className={`flex items-center gap-2 py-1 transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'environments'
              ? 'text-cyan-400 border-b-2 border-cyan-400 font-semibold'
              : 'hover:text-white text-slate-400'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Orgs & Multi-Cloud</span>
        </button>

        <button
          onClick={() => onTabChange('pipeline')}
          className={`flex items-center gap-2 py-1 transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'pipeline'
              ? 'text-cyan-400 border-b-2 border-cyan-400 font-semibold'
              : 'hover:text-white text-slate-400'
          }`}
        >
          <PlayCircle className="w-4 h-4" />
          <span>Pipeline Simulator</span>
        </button>

        <button
          onClick={() => onTabChange('handbook')}
          className={`flex items-center gap-2 py-1 transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'handbook'
              ? 'text-cyan-400 border-b-2 border-cyan-400 font-semibold'
              : 'hover:text-white text-slate-400'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Training Handbook</span>
        </button>

        <button
          onClick={() => onTabChange('challenges')}
          className={`flex items-center gap-2 py-1 transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'challenges'
              ? 'text-cyan-400 border-b-2 border-cyan-400 font-semibold'
              : 'hover:text-white text-slate-400'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Incident Arena</span>
        </button>

        <button
          onClick={() => onTabChange('mentor')}
          className={`flex items-center gap-2 py-1 transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'mentor'
              ? 'text-cyan-400 border-b-2 border-cyan-400 font-semibold'
              : 'hover:text-white text-slate-400'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Tech Lead Q&A</span>
        </button>
      </nav>

      {/* Zone 3: Primary CTA & Action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onOpenCertificate}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0 shadow-sm"
          title="View your learning progress and certificate"
        >
          <Award className="w-4 h-4 text-cyan-400" />
          <span className="hidden sm:inline">Progress</span>
          <span className="text-slate-400 font-mono text-xs">
            {completedChaptersCount}/{totalChaptersCount}
          </span>
          {pipelinePassedOnce && (
            <span className="w-2 h-2 rounded-full bg-emerald-400" title="Pipeline Certified" />
          )}
        </button>

        <button
          onClick={handleDownloadSingleFile}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20 transition-all whitespace-nowrap shrink-0 cursor-pointer"
          title="Download single-file index.html ready for GitHub Pages hosting"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Download HTML</span>
        </button>

        <button
          onClick={() => onTabChange('pipeline')}
          className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-md shadow-cyan-500/20 transition-all hover:shadow-cyan-500/30 whitespace-nowrap shrink-0 cursor-pointer"
        >
          Launch Pipeline
        </button>
      </div>
    </header>
  );
};
