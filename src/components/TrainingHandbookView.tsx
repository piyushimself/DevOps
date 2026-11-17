import React, { useState } from 'react';
import { HANDBOOK_CHAPTERS } from '../data/handbookChaptersData';
import { HandbookChapter } from '../types';
import { 
  BookOpen, 
  Search, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  Lightbulb, 
  Bookmark,
  Share2
} from 'lucide-react';

interface TrainingHandbookViewProps {
  completedChapterIds: string[];
  onToggleCompleteChapter: (chapterId: string) => void;
}

export const TrainingHandbookView: React.FC<TrainingHandbookViewProps> = ({
  completedChapterIds,
  onToggleCompleteChapter,
}) => {
  const [selectedChapterId, setSelectedChapterId] = useState<string>(HANDBOOK_CHAPTERS[0].id);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const selectedChapter: HandbookChapter = 
    HANDBOOK_CHAPTERS.find(c => c.id === selectedChapterId) || HANDBOOK_CHAPTERS[0];

  const currentIndex = HANDBOOK_CHAPTERS.findIndex(c => c.id === selectedChapterId);

  // Filter chapters based on search query
  const filteredChapters = HANDBOOK_CHAPTERS.filter(ch => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      ch.title.toLowerCase().includes(q) ||
      ch.subtitle.toLowerCase().includes(q) ||
      ch.sections.some(s => s.heading.toLowerCase().includes(q) || s.content.some(c => c.toLowerCase().includes(q)))
    );
  });

  const isCompleted = completedChapterIds.includes(selectedChapter.id);

  const handleNext = () => {
    if (currentIndex < HANDBOOK_CHAPTERS.length - 1) {
      setSelectedChapterId(HANDBOOK_CHAPTERS[currentIndex + 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setSelectedChapterId(HANDBOOK_CHAPTERS[currentIndex - 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Header bar */}
      <div className="pb-6 border-b border-slate-800">
        <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">
          <span>The 1st-Year Engineering Curriculum</span>
          <span aria-hidden="true">·</span>
          <span>7 Comprehensive Chapters</span>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          DevSecOps & Enterprise Architecture Master Handbook
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Written specifically for a B.Tech 1st-year student with real-world analogies, clean breakdowns, and zero gatekeeping.
        </p>
      </div>

      {/* Main 2-Column Reader Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        {/* Left Sidebar: Table of Contents (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search concepts (e.g. SAST, SAP, Canary)..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Chapter List */}
          <div className="space-y-2">
            {filteredChapters.map((ch) => {
              const isSelected = ch.id === selectedChapterId;
              const chCompleted = completedChapterIds.includes(ch.id);

              return (
                <div
                  key={ch.id}
                  onClick={() => setSelectedChapterId(ch.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-500 shadow-md shadow-cyan-500/10'
                      : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/40'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono font-semibold text-cyan-400">
                      CHAPTER 0{ch.chapterNumber}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {ch.readTime}
                      </span>
                      {chCompleted && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      )}
                    </div>
                  </div>

                  <h3 className="text-xs font-bold text-white mt-1 leading-snug">
                    {ch.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                    {ch.subtitle}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Reader Area: Chapter Content (8 cols) */}
        <div className="lg:col-span-8">
          <article className="p-6 sm:p-8 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-xl">
            {/* Chapter Header */}
            <div className="pb-6 border-b border-slate-800">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  Chapter {selectedChapter.chapterNumber} of {HANDBOOK_CHAPTERS.length}
                </span>

                <button
                  onClick={() => onToggleCompleteChapter(selectedChapter.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                    isCompleted
                      ? 'bg-emerald-950/60 border border-emerald-800 text-emerald-300'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                  }`}
                >
                  <CheckCircle2 className={`w-3.5 h-3.5 ${isCompleted ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span>{isCompleted ? 'Completed' : 'Mark as Read'}</span>
                </button>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                {selectedChapter.title}
              </h1>
              <p className="text-sm text-cyan-300/80 mt-1 font-medium">
                {selectedChapter.subtitle}
              </p>

              {/* Analogy Hook Banner */}
              <div className="mt-5 p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/40 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <p className="text-xs text-cyan-200 leading-relaxed font-medium">
                  {selectedChapter.analogyHook}
                </p>
              </div>
            </div>

            {/* Chapter Body Sections */}
            <div className="mt-8 space-y-8">
              {selectedChapter.sections.map((sec, idx) => (
                <div key={idx} className="space-y-3">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {sec.heading}
                  </h3>

                  <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
                    {sec.content.map((paragraph, pIdx) => (
                      <p key={pIdx}>{paragraph}</p>
                    ))}
                  </div>

                  {/* Analogy Callout Box if present */}
                  {sec.analogyBox && (
                    <div className="mt-4 p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
                        <Sparkles className="w-4 h-4" />
                        <span>{sec.analogyBox.title}</span>
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed italic">
                        "{sec.analogyBox.analogy}"
                      </p>
                      <div className="pt-2 border-t border-slate-800/80 text-xs text-slate-400">
                        <strong className="text-cyan-300 font-semibold">Technical Reality: </strong>
                        {sec.analogyBox.technicalEquivalent}
                      </div>
                    </div>
                  )}

                  {/* Pro-Tip Box if present */}
                  {sec.proTip && (
                    <div className="mt-4 p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 flex items-start gap-3">
                      <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <div className="text-xs text-amber-200/90 leading-relaxed">
                        <strong className="font-bold text-amber-300 block mb-0.5">
                          B.Tech Fresher Pro Tip:
                        </strong>
                        {sec.proTip}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Key Takeaways Box */}
            <div className="mt-10 p-5 rounded-xl bg-slate-950 border border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Chapter Summary Checklist</span>
              </h4>
              <ul className="space-y-2">
                {selectedChapter.keyTakeaways.map((takeaway, tIdx) => (
                  <li key={tIdx} className="text-xs text-slate-300 flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">✓</span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom Chapter Navigation */}
            <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Chapter</span>
              </button>

              <button
                onClick={handleNext}
                disabled={currentIndex === HANDBOOK_CHAPTERS.length - 1}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                <span>Next Chapter</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};
