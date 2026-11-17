import React, { useState } from 'react';
import { Award, CheckCircle2, X, Download, ShieldCheck, Printer } from 'lucide-react';
import { HANDBOOK_CHAPTERS } from '../data/handbookChaptersData';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  completedChaptersCount: number;
  pipelinePassedOnce: boolean;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  completedChaptersCount,
  pipelinePassedOnce,
}) => {
  const [studentName, setStudentName] = useState<string>('Piyush Jain');

  if (!isOpen) return null;

  const totalChapters = HANDBOOK_CHAPTERS.length;
  const progressPercent = Math.round(
    ((completedChaptersCount / totalChapters) * 0.7 + (pipelinePassedOnce ? 0.3 : 0)) * 100
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden p-6 sm:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center pb-6 border-b border-slate-800">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-cyan-500/20">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Learning Progress & Credentials
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Track your mastery of enterprise architecture layers and automated DevSecOps workflows.
          </p>
        </div>

        {/* Progress Breakdown */}
        <div className="grid grid-cols-2 gap-4 my-6">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
            <div className="text-2xl font-extrabold text-cyan-400 font-mono">
              {completedChaptersCount}/{totalChapters}
            </div>
            <div className="text-xs text-slate-400 mt-1">Handbook Chapters Read</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
            <div className="text-2xl font-extrabold text-emerald-400 font-mono">
              {pipelinePassedOnce ? 'PASSED' : 'INCOMPLETE'}
            </div>
            <div className="text-xs text-slate-400 mt-1">Pipeline Simulation Run</div>
          </div>
        </div>

        {/* Certificate Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-2 border-cyan-500/40 relative shadow-inner">
          <div className="flex items-center justify-between text-[11px] font-mono text-cyan-400 mb-4">
            <span className="flex items-center gap-1.5 font-bold">
              <ShieldCheck className="w-4 h-4" /> DEVSECOPS ENTERPRISE ACADEMY
            </span>
            <span>ID: DSO-{Math.abs(studentName.length * 9481).toString().padStart(6, '0')}</span>
          </div>

          <div className="text-center py-4">
            <div className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-2">
              Certificate of Foundational Competency
            </div>

            <div className="mb-2">
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Enter your name"
                className="text-center text-xl sm:text-2xl font-extrabold text-white bg-transparent border-b border-dashed border-cyan-500/60 pb-1 focus:outline-none focus:border-cyan-400 max-w-sm"
              />
            </div>

            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed mt-3">
              Has successfully mastered the 4 Enterprise Technology Layers, Shift-Left Automated CI/CD Pipelines, Static & Dynamic Security Scanners (SAST/DAST/SCA), and Zero-Downtime Canary Deployments.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2">
            <span>Verified: 1st-Year Engineering Curriculum</span>
            <span className="text-cyan-400 font-mono font-medium">B.Tech Software Foundations</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Certificate</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 transition-colors cursor-pointer"
          >
            Continue Learning
          </button>
        </div>
      </div>
    </div>
  );
};
