import { useState, useEffect } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { useToast } from '../contexts/ToastContext';
import { challenges } from '../data/challenges';
import CodeEditor from '../components/CodeEditor';
import { FiCheckCircle, FiCircle, FiHelpCircle, FiPlay } from 'react-icons/fi';

export default function PracticePage() {
  const { progress, markChallengeCompleted } = useProgress();
  const { addToast } = useToast();

  const [selectedId, setSelectedId] = useState(challenges[0].id);
  const [code, setCode] = useState('');
  const [hintIndex, setHintIndex] = useState(-1);

  const activeChallenge = challenges.find(c => c.id === selectedId);
  const isCompleted = progress.completedChallenges.includes(activeChallenge?.id);

  const completedCount = progress.completedChallenges.length;
  const progressPercent = Math.round((completedCount / challenges.length) * 100) || 0;

  useEffect(() => {
    if (activeChallenge) {
      if (activeChallenge.type !== 'identify') {
        setCode(activeChallenge.initialCode);
      } else {
        setCode('');
      }
      setHintIndex(-1);
    }
  }, [selectedId, activeChallenge]);

  const handleRunCode = () => {
    if (activeChallenge.validate(code)) {
      markChallengeCompleted(activeChallenge.id);
      addToast('Challenge solved!', 'success');
    } else {
      addToast('Not quite — check the hints.', 'error');
    }
  };

  const handleOptionSelect = (index) => {
    if (index === activeChallenge.correctOptionIndex) {
      markChallengeCompleted(activeChallenge.id);
      addToast('Correct!', 'success');
    } else {
      addToast('Wrong answer — try again.', 'error');
    }
  };

  const showNextHint = () => {
    if (hintIndex < activeChallenge.hints.length - 1) {
      setHintIndex(prev => prev + 1);
    }
  };

  return (
    <div className="flex flex-col h-full bg-void">
      {/* Header */}
      <header className="bg-surface-0 border-b border-border-subtle px-6 py-5 flex-shrink-0">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">Practice</h1>
            <p className="text-sm text-slate-500 mt-0.5">Apply what you learned with hands-on challenges.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-32 bg-surface-3 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-string h-1.5 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-sm font-display font-bold text-string">{progressPercent}%</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden max-w-7xl mx-auto w-full">
        {/* Challenge list */}
        <aside className="w-72 flex-shrink-0 border-r border-border-subtle overflow-y-auto p-4 space-y-1.5 bg-surface-0">
          {challenges.map((challenge) => {
            const completed = progress.completedChallenges.includes(challenge.id);
            const active = selectedId === challenge.id;

            return (
              <button
                key={challenge.id}
                onClick={() => setSelectedId(challenge.id)}
                className={`w-full text-left px-3.5 py-3 rounded-lg transition-all duration-150 ${
                  active
                    ? 'bg-key/10 border border-key/20'
                    : 'border border-transparent hover:bg-surface-2'
                }`}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <span className={`text-[11px] font-semibold uppercase tracking-wider font-display ${
                    active ? 'text-key' : 'text-slate-500'
                  }`}>
                    {challenge.type}
                  </span>
                  {completed ? (
                    <FiCheckCircle className="text-string w-4 h-4" />
                  ) : (
                    <FiCircle className="text-surface-3 w-4 h-4" />
                  )}
                </div>
                <h3 className={`text-sm font-medium ${
                  active ? 'text-white' : 'text-slate-300'
                }`}>{challenge.title}</h3>
              </button>
            );
          })}
        </aside>

        {/* Challenge area */}
        <main className="flex-1 flex flex-col overflow-hidden bg-void">
          {activeChallenge && (
            <>
              {/* Description */}
              <div className="p-6 border-b border-border-subtle flex-shrink-0 bg-surface-0">
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-xl font-bold text-white tracking-tight">{activeChallenge.title}</h2>
                  {isCompleted && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-string/10 text-string rounded-md text-xs font-semibold border border-string/20">
                      <FiCheckCircle className="w-3 h-3" /> Solved
                    </span>
                  )}
                </div>
                <p className="text-[15px] text-slate-400 leading-relaxed">{activeChallenge.description}</p>

                {/* Hints */}
                {activeChallenge.hints && activeChallenge.hints.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {activeChallenge.hints.slice(0, hintIndex + 1).map((hint, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-boolean bg-boolean/5 p-3 rounded-lg border border-boolean/10">
                        <FiHelpCircle className="mt-0.5 flex-shrink-0 w-4 h-4" />
                        <span>{hint}</span>
                      </div>
                    ))}
                    {hintIndex < activeChallenge.hints.length - 1 && (
                      <button
                        onClick={showNextHint}
                        className="text-sm text-boolean/70 hover:text-boolean font-medium flex items-center gap-1.5 transition-colors"
                      >
                        <FiHelpCircle className="w-3.5 h-3.5" /> Show hint
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Editor or options */}
              <div className="flex-1 min-h-0 relative">
                {activeChallenge.type === 'identify' ? (
                  <div className="p-6 space-y-3">
                    {activeChallenge.options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleOptionSelect(idx)}
                        className="w-full text-left p-4 font-mono text-sm bg-surface-1 border border-border-subtle rounded-lg hover:border-key/40 hover:bg-surface-2 transition-all duration-150"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                ) : (
                  <>
                    <CodeEditor
                      value={code}
                      onChange={setCode}
                      className="h-full rounded-none border-0"
                    />
                    <button
                      onClick={handleRunCode}
                      className="absolute bottom-5 right-5 flex items-center gap-2 px-5 py-2.5 bg-string/15 hover:bg-string/25 text-string border border-string/20 rounded-lg text-sm font-semibold transition-all duration-150 glow-string"
                    >
                      <FiPlay fill="currentColor" className="w-3.5 h-3.5" /> Validate
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
