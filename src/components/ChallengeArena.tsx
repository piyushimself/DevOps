import React, { useState } from 'react';
import { QUIZ_SCENARIOS } from '../data/scenariosQuizData';
import { QuizScenario } from '../types';
import { ShieldCheck, AlertCircle, CheckCircle2, RotateCcw, Trophy, ArrowRight, Lightbulb } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ChallengeArena: React.FC = () => {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [answeredMap, setAnsweredMap] = useState<Record<string, { optionId: string; isCorrect: boolean }>>({});
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const scenario: QuizScenario = QUIZ_SCENARIOS[currentScenarioIndex];
  const hasAnsweredCurrent = !!answeredMap[scenario.id];

  const handleSelectOption = (optionId: string) => {
    if (hasAnsweredCurrent) return;

    setSelectedOptionId(optionId);
    const chosen = scenario.options.find(o => o.id === optionId)!;
    const isCorrect = chosen.isCorrect;

    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setAnsweredMap(prev => ({
      ...prev,
      [scenario.id]: { optionId, isCorrect },
    }));

    // If finished all
    if (Object.keys(answeredMap).length + 1 === QUIZ_SCENARIOS.length) {
      setTimeout(() => {
        setIsFinished(true);
        if (score + (isCorrect ? 1 : 0) >= 3) {
          confetti({
            particleCount: 70,
            spread: 60,
          });
        }
      }, 1000);
    }
  };

  const handleNext = () => {
    if (currentScenarioIndex < QUIZ_SCENARIOS.length - 1) {
      setCurrentScenarioIndex(prev => prev + 1);
      setSelectedOptionId(answeredMap[QUIZ_SCENARIOS[currentScenarioIndex + 1]?.id]?.optionId || null);
    }
  };

  const handlePrev = () => {
    if (currentScenarioIndex > 0) {
      setCurrentScenarioIndex(prev => prev - 1);
      setSelectedOptionId(answeredMap[QUIZ_SCENARIOS[currentScenarioIndex - 1]?.id]?.optionId || null);
    }
  };

  const handleReset = () => {
    setCurrentScenarioIndex(0);
    setSelectedOptionId(null);
    setScore(0);
    setAnsweredMap({});
    setIsFinished(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Header bar */}
      <div className="pb-6 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">
            <span>Enterprise War Room Simulator</span>
            <span aria-hidden="true">·</span>
            <span>Decision Making Under Fire</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            DevSecOps Incident & Decision Arena
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Step into the shoes of a junior DevSecOps engineer facing real-world architectural dilemmas.
          </p>
        </div>

        {/* Score pill */}
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono">
            <span className="text-slate-400">Score: </span>
            <span className="text-cyan-400 font-bold">{score}/{QUIZ_SCENARIOS.length}</span>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restart</span>
          </button>
        </div>
      </div>

      {/* Main Challenge Box */}
      {!isFinished ? (
        <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl">
          {/* Difficulty & Stepper */}
          <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-800">
            <span className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider">
              Incident {currentScenarioIndex + 1} of {QUIZ_SCENARIOS.length}
            </span>

            <span className="text-[11px] font-mono px-2 py-0.5 rounded border border-cyan-800 bg-cyan-950/40 text-cyan-300">
              {scenario.difficulty}
            </span>
          </div>

          {/* Scenario Context */}
          <div className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
            <strong className="text-cyan-400 block mb-1">Scenario Briefing:</strong>
            {scenario.context}
          </div>

          {/* Question */}
          <h3 className="mt-5 text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
            {scenario.question}
          </h3>

          {/* Options */}
          <div className="mt-5 space-y-3">
            {scenario.options.map((option) => {
              const isChosen = answeredMap[scenario.id]?.optionId === option.id;
              const hasAnswered = !!answeredMap[scenario.id];

              let borderStyle = 'border-slate-800 hover:border-slate-700 bg-slate-950/60';
              if (hasAnswered) {
                if (option.isCorrect) {
                  borderStyle = 'border-emerald-600 bg-emerald-950/30 text-emerald-100';
                } else if (isChosen && !option.isCorrect) {
                  borderStyle = 'border-rose-600 bg-rose-950/30 text-rose-100';
                } else {
                  borderStyle = 'border-slate-800 opacity-60 bg-slate-950/30';
                }
              }

              return (
                <div
                  key={option.id}
                  onClick={() => handleSelectOption(option.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${borderStyle}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-md bg-slate-800 text-xs font-mono font-bold flex items-center justify-center text-slate-300 shrink-0 mt-0.5">
                      {option.id.toUpperCase()}
                    </span>
                    <div className="flex-1">
                      <p className="text-xs sm:text-sm font-medium text-slate-200">
                        {option.text}
                      </p>

                      {hasAnswered && (isChosen || option.isCorrect) && (
                        <p className={`mt-2 text-xs leading-relaxed ${option.isCorrect ? 'text-emerald-300 font-medium' : 'text-rose-300'}`}>
                          {option.explanation}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Educational Takeaway (Appears after answer) */}
          {hasAnsweredCurrent && (
            <div className="mt-6 p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/40 flex items-start gap-3 text-xs">
              <Lightbulb className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-cyan-300 block mb-0.5">Key Engineering Takeaway:</strong>
                <p className="text-cyan-200/90 leading-relaxed">
                  {scenario.takeaway}
                </p>
              </div>
            </div>
          )}

          {/* Stepper Navigation */}
          <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={currentScenarioIndex === 0}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
            >
              Previous Incident
            </button>

            <button
              onClick={handleNext}
              disabled={currentScenarioIndex === QUIZ_SCENARIOS.length - 1}
              className="flex items-center gap-1 px-4 py-2 text-xs font-bold rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
            >
              <span>Next Incident</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        /* Final Score Card */
        <div className="mt-8 p-8 rounded-2xl bg-slate-900/90 border border-cyan-500 shadow-2xl text-center">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8" />
          </div>

          <h3 className="text-2xl font-extrabold text-white">
            Incident Simulation Complete!
          </h3>
          <p className="text-sm text-slate-300 mt-1">
            You scored <strong className="text-cyan-400 font-mono text-base">{score}</strong> out of {QUIZ_SCENARIOS.length} on enterprise security decisions.
          </p>

          <p className="mt-4 text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
            {score === QUIZ_SCENARIOS.length
              ? 'Flawless execution! You think like a seasoned Staff DevSecOps Engineer.'
              : score >= 2
              ? 'Solid foundation! You understand shift-left security and automated guardrails.'
              : 'Keep practicing! Review the handbook chapters and try the scenarios again.'}
          </p>

          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={handleReset}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
