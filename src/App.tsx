import React, { useState, useEffect } from 'react';
import { TabType } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { EnterpriseLayersView } from './components/EnterpriseLayersView';
import { EnterpriseEnvironmentsView } from './components/EnterpriseEnvironmentsView';
import { PipelineSimulator } from './components/PipelineSimulator';
import { TrainingHandbookView } from './components/TrainingHandbookView';
import { ChallengeArena } from './components/ChallengeArena';
import { MentorView } from './components/MentorView';
import { CertificateModal } from './components/CertificateModal';
import { HANDBOOK_CHAPTERS } from './data/handbookChaptersData';
import { ShieldCheck, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('layers');
  const [completedChapterIds, setCompletedChapterIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('devsecops_completed_chapters');
      return saved ? JSON.parse(saved) : ['ch-layers'];
    } catch {
      return ['ch-layers'];
    }
  });

  const [pipelinePassedOnce, setPipelinePassedOnce] = useState<boolean>(() => {
    try {
      return localStorage.getItem('devsecops_pipeline_passed') === 'true';
    } catch {
      return false;
    }
  });

  const [isCertificateOpen, setIsCertificateOpen] = useState<boolean>(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('devsecops_completed_chapters', JSON.stringify(completedChapterIds));
    } catch {
      // ignore
    }
  }, [completedChapterIds]);

  useEffect(() => {
    try {
      localStorage.setItem('devsecops_pipeline_passed', String(pipelinePassedOnce));
    } catch {
      // ignore
    }
  }, [pipelinePassedOnce]);

  const handleToggleCompleteChapter = (chapterId: string) => {
    setCompletedChapterIds(prev =>
      prev.includes(chapterId)
        ? prev.filter(id => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  const handlePipelinePassed = () => {
    setPipelinePassedOnce(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        completedChaptersCount={completedChapterIds.length}
        totalChaptersCount={HANDBOOK_CHAPTERS.length}
        pipelinePassedOnce={pipelinePassedOnce}
        onOpenCertificate={() => setIsCertificateOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {/* Hero Section displayed on Layers and Overview */}
        {activeTab === 'layers' && (
          <HeroSection onSelectTab={setActiveTab} />
        )}

        {/* Tab Views */}
        {activeTab === 'layers' && (
          <EnterpriseLayersView />
        )}

        {activeTab === 'environments' && (
          <EnterpriseEnvironmentsView />
        )}

        {activeTab === 'pipeline' && (
          <PipelineSimulator onPipelinePassed={handlePipelinePassed} />
        )}

        {activeTab === 'handbook' && (
          <TrainingHandbookView
            completedChapterIds={completedChapterIds}
            onToggleCompleteChapter={handleToggleCompleteChapter}
          />
        )}

        {activeTab === 'challenges' && (
          <ChallengeArena />
        )}

        {activeTab === 'mentor' && (
          <MentorView />
        )}
      </main>

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        completedChaptersCount={completedChapterIds.length}
        pipelinePassedOnce={pipelinePassedOnce}
      />

      {/* Clean Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/90 py-8 px-6 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold text-slate-300">DevSecOps Enterprise Academy</span>
            <span aria-hidden="true">·</span>
            <span>Created for B.Tech 1st Year Engineering Students</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Shift-Left Security</span>
            <span aria-hidden="true">·</span>
            <span>Zero-Trust Architecture</span>
            <span aria-hidden="true">·</span>
            <span>Automated CI/CD Gates</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
