import React, { useState } from 'react';
import { MENTOR_PRESETS } from '../data/scenariosQuizData';
import { MentorQuestion } from '../types';
import { HelpCircle, Send, Sparkles, BookOpen, MessageSquare, Terminal, ChevronRight } from 'lucide-react';

export const MentorView: React.FC = () => {
  const [selectedQuestion, setSelectedQuestion] = useState<MentorQuestion>(MENTOR_PRESETS[0]);
  const [customInput, setCustomInput] = useState<string>('');
  const [customAnswer, setCustomAnswer] = useState<MentorQuestion | null>(null);
  const [isAnswering, setIsAnswering] = useState<boolean>(false);

  // Handle asking custom question
  const handleAsk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim() || isAnswering) return;

    setIsAnswering(true);
    const query = customInput.toLowerCase();

    setTimeout(() => {
      // Intelligent matching or dynamic 1st-year explanation
      let match = MENTOR_PRESETS.find(p => 
        query.includes('sap') || query.includes('postgres') ? p.id === 'q-1' :
        query.includes('mono') || query.includes('micro') ? p.id === 'q-2' :
        query.includes('sast') || query.includes('dast') ? p.id === 'q-3' :
        query.includes('k8s') || query.includes('kube') ? p.id === 'q-4' : null
      );

      if (!match) {
        // Dynamic answer tailored for 1st-year engineer
        match = {
          id: 'custom-' + Date.now(),
          category: 'DevSecOps Guidance',
          question: customInput,
          shortAnswer: 'In enterprise engineering, automated guardrails always beat human memory.',
          detailedAnalogy:
            'Think of modern cloud architecture like a giant modern airline. Pilots do not fly by hand or memorize 500 emergency engine switches. Automated fly-by-wire flight computers check sensor telemetry 100 times a second to ensure the plane never stalls.',
          techDeepDive:
            'Large organizations use Infrastructure as Code (Terraform) and GitOps (ArgoCD) so every server, firewall rule, and microservice is version-controlled in Git. No engineer manually clicks buttons in cloud consoles in production.',
        };
      }

      setCustomAnswer(match);
      setSelectedQuestion(match);
      setIsAnswering(false);
      setCustomInput('');
    }, 600);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      {/* Header bar */}
      <div className="pb-6 border-b border-slate-800">
        <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">
          <span>Senior DevSecOps Tech Lead</span>
          <span aria-hidden="true">·</span>
          <span>Plain English & Relatable Analogies</span>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Ask the Tech Lead: B.Tech Fresher Q&A
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          No question is too basic! Ask about microservices, cloud servers, security tools, or how big organizations operate.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        {/* Left Column: Preset Questions (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
            Frequently Asked by 1st-Year Students
          </label>

          {MENTOR_PRESETS.map((preset) => {
            const isSelected = selectedQuestion.id === preset.id;

            return (
              <div
                key={preset.id}
                onClick={() => {
                  setSelectedQuestion(preset);
                  setCustomAnswer(null);
                }}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-500 shadow-md shadow-cyan-500/10'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/40'
                }`}
              >
                <div className="text-[10px] font-mono font-semibold text-cyan-400 mb-1">
                  {preset.category}
                </div>
                <h4 className="text-xs font-bold text-white leading-snug">
                  {preset.question}
                </h4>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
                  <span className="truncate">{preset.shortAnswer}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-cyan-400 shrink-0 ml-1" />
                </div>
              </div>
            );
          })}

          {/* Ask your own question input */}
          <form onSubmit={handleAsk} className="mt-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <label className="text-xs font-bold text-slate-200 block mb-2 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
              <span>Ask Your Own Question</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="e.g. Why do we need Docker?"
                className="flex-1 px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
              <button
                type="submit"
                disabled={!customInput.trim() || isAnswering}
                className="px-3 py-2 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 text-slate-950 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
              >
                <Send className="w-3 h-3" />
                <span>Ask</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: In-Depth Explanation Card (7 cols) */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl">
            {/* Header */}
            <div className="pb-4 border-b border-slate-800">
              <div className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider mb-1">
                {selectedQuestion.category}
              </div>
              <h3 className="text-xl font-extrabold text-white leading-tight">
                {selectedQuestion.question}
              </h3>
            </div>

            {/* Quick Answer */}
            <div className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                TL;DR 10-Second Summary
              </span>
              <p className="text-sm font-semibold text-cyan-300">
                "{selectedQuestion.shortAnswer}"
              </p>
            </div>

            {/* The Relatable Analogy */}
            <div className="mt-6 p-5 rounded-xl bg-cyan-950/20 border border-cyan-800/40">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4" />
                <span>The Relatable Real-World Analogy</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                "{selectedQuestion.detailedAnalogy}"
              </p>
            </div>

            {/* Technical Enterprise Reality */}
            <div className="mt-6">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                <Terminal className="w-4 h-4 text-slate-400" />
                <span>How Tech Giants Implement This in Real Life</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                {selectedQuestion.techDeepDive}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
