import { useProgress } from '../contexts/ProgressContext';
import { useConfirm } from '../contexts/ConfirmContext';
import { lessons } from '../data/lessons';
import { challenges } from '../data/challenges';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiBook, FiCode, FiPlay, FiRotateCcw } from 'react-icons/fi';

export default function Dashboard() {
  const { progress, resetLessons, resetChallenges } = useProgress();
  const { confirm } = useConfirm();

  const completedLessonsCount = progress.completedLessons.length;
  const totalLessons = lessons.length;
  const lessonPercent = Math.round((completedLessonsCount / totalLessons) * 100) || 0;

  const completedChallengesCount = progress.completedChallenges.length;
  const totalChallenges = challenges.length;
  const challengePercent = Math.round((completedChallengesCount / totalChallenges) * 100) || 0;

  return (
    <div className="p-8 lg:p-12 max-w-5xl mx-auto">
      {/* Hero */}
      <header className="mb-14">
        <div className="font-display text-key/60 text-sm tracking-wide mb-3">
          {'// welcome'}
        </div>
        <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4">
          Learn JSON by<br />writing it.
        </h1>
        <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
          Structured lessons, hands-on challenges, and a live sandbox.
          Everything runs in your browser — no setup, no accounts.
        </p>
      </header>

      {/* Progress Cards */}
      <div className="grid md:grid-cols-2 gap-5 mb-10">
        {/* Lessons Card */}
        <div className="bg-surface-1 border border-border-subtle rounded-xl p-6 group hover:border-key/30 transition-colors duration-200">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-lg bg-key/10 flex items-center justify-center">
              <FiBook className="w-[18px] h-[18px] text-key" />
            </div>
            <div>
              <h2 className="text-[15px] font-semibold text-white">Lessons</h2>
              <p className="text-xs text-slate-500">{completedLessonsCount} of {totalLessons} completed</p>
            </div>
            <span className="ml-auto text-2xl font-bold font-display text-key">{lessonPercent}%</span>
          </div>

          {/* Progress track */}
          <div className="w-full bg-surface-3 rounded-full h-1.5 mb-5 overflow-hidden">
            <div
              className="bg-key h-1.5 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${lessonPercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between">
            <Link
              to="/learn"
              className="inline-flex items-center gap-2 text-[13px] font-medium text-key hover:text-primary-300 transition-colors"
            >
              Continue learning <FiArrowRight className="w-3.5 h-3.5" />
            </Link>
            {completedLessonsCount > 0 && (
              <button
                onClick={async () => {
                  const confirmed = await confirm({
                    title: 'Reset Lesson Progress?',
                    message: 'Are you sure you want to clear your learning history? This action is permanent.',
                    confirmText: 'Reset Progress',
                    variant: 'danger'
                  });
                  if (confirmed) resetLessons();
                }}
                className="inline-flex items-center gap-1.5 text-[12px] font-medium text-slate-500 hover:text-null transition-colors"
              >
                <FiRotateCcw className="w-3 h-3" /> Reset
              </button>
            )}
          </div>
        </div>

        {/* Challenges Card */}
        <div className="bg-surface-1 border border-border-subtle rounded-xl p-6 group hover:border-string/30 transition-colors duration-200">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-lg bg-string/10 flex items-center justify-center">
              <FiCode className="w-[18px] h-[18px] text-string" />
            </div>
            <div>
              <h2 className="text-[15px] font-semibold text-white">Challenges</h2>
              <p className="text-xs text-slate-500">{completedChallengesCount} of {totalChallenges} solved</p>
            </div>
            <span className="ml-auto text-2xl font-bold font-display text-string">{challengePercent}%</span>
          </div>

          <div className="w-full bg-surface-3 rounded-full h-1.5 mb-5 overflow-hidden">
            <div
              className="bg-string h-1.5 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${challengePercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between">
            <Link
              to="/practice"
              className="inline-flex items-center gap-2 text-[13px] font-medium text-string hover:text-emerald-300 transition-colors"
            >
              Start practicing <FiArrowRight className="w-3.5 h-3.5" />
            </Link>
            {completedChallengesCount > 0 && (
              <button
                onClick={async () => {
                  const confirmed = await confirm({
                    title: 'Reset Challenge Progress?',
                    message: 'Are you sure you want to clear your challenge completion history? This action is permanent.',
                    confirmText: 'Reset Progress',
                    variant: 'danger'
                  });
                  if (confirmed) resetChallenges();
                }}
                className="inline-flex items-center gap-1.5 text-[12px] font-medium text-slate-500 hover:text-null transition-colors"
              >
                <FiRotateCcw className="w-3 h-3" /> Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Playground CTA */}
      <div className="relative overflow-hidden bg-surface-1 border border-border-subtle rounded-xl p-8 group hover:border-number/30 transition-colors duration-200">
        {/* Faint decorative brackets */}
        <div className="absolute -right-6 -bottom-8 text-[120px] font-display text-surface-3 select-none leading-none pointer-events-none opacity-60">
          {'{ }'}
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-number/10 flex items-center justify-center">
              <FiPlay className="w-[18px] h-[18px] text-number" />
            </div>
            <h2 className="text-xl font-bold text-white">Playground</h2>
          </div>
          <p className="text-slate-400 mb-6 max-w-lg text-[15px] leading-relaxed">
            Paste any JSON, format or minify it, and explore the parsed tree in real time.
            A safe place to experiment.
          </p>
          <Link
            to="/playground"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-number/15 hover:bg-number/25 text-number border border-number/20 rounded-lg text-sm font-semibold transition-all duration-150"
          >
            Open playground <FiArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
