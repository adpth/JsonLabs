import { useState } from 'react';
import { useProgress } from '../contexts/ProgressContext';
import { useToast } from '../contexts/ToastContext';
import { useConfirm } from '../contexts/ConfirmContext';
import { lessons } from '../data/lessons';
import CodeEditor from '../components/CodeEditor';
import { FiCheck, FiChevronLeft, FiChevronRight, FiRotateCcw } from 'react-icons/fi';

export default function LessonPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { progress, markLessonCompleted, resetLessons } = useProgress();
  const { addToast } = useToast();
  const { confirm } = useConfirm();

  const lesson = lessons[currentIndex];
  const isCompleted = progress.completedLessons.includes(lesson.id);

  const handleComplete = () => {
    if (!isCompleted) {
      markLessonCompleted(lesson.id);
      addToast('Lesson completed!', 'success');
    }
    if (currentIndex < lessons.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const renderContent = (text) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('# ')) {
        return (
          <h2 key={i} className="text-2xl font-bold mb-5 text-white tracking-tight">
            {line.slice(2)}
          </h2>
        );
      }
      if (line.startsWith('* ')) {
        const content = line.slice(2);
        const boldParsed = content.split(/\*\*(.*?)\*\*/g).map((part, j) =>
          j % 2 === 1
            ? <strong key={j} className="text-white font-semibold">{part}</strong>
            : part
        );
        return (
          <li key={i} className="ml-5 list-disc mb-2.5 text-slate-300 leading-relaxed text-[15px]">
            {boldParsed}
          </li>
        );
      }
      if (line.trim() === '') return null;
      return (
        <p key={i} className="mb-4 text-slate-300 leading-relaxed text-[15px]">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="flex h-full">
      {/* Theory pane */}
      <div className="w-1/2 flex flex-col bg-surface-0 border-r border-border-subtle">
        <div className="flex-1 overflow-y-auto p-8 lg:p-10">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <span className="font-display text-xs text-key/70 tracking-wide">
              lesson {currentIndex + 1}/{lessons.length}
            </span>
            {isCompleted && (
              <span className="inline-flex items-center gap-1 text-xs text-string font-medium">
                <FiCheck className="w-3 h-3" /> done
              </span>
            )}
            {progress.completedLessons.length > 0 && (
              <button
                onClick={async () => {
                  const confirmed = await confirm({
                    title: 'Reset Lesson Progress?',
                    message: 'Are you sure you want to clear your learning history? This action is permanent.',
                    confirmText: 'Reset Progress',
                    variant: 'danger'
                  });
                  if (confirmed) {
                    resetLessons();
                    setCurrentIndex(0);
                    addToast('Lesson progress reset', 'info');
                  }
                }}
                className="ml-auto inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-null transition-colors"
              >
                <FiRotateCcw className="w-3 h-3" /> Reset all
              </button>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-8">
            {lesson.title}
          </h1>

          {/* Content */}
          <div className="max-w-prose">
            {renderContent(lesson.content)}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between px-8 py-4 border-t border-border-subtle bg-surface-1">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-surface-2 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150"
          >
            <FiChevronLeft className="w-4 h-4" /> Previous
          </button>

          <button
            onClick={handleComplete}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-key/15 hover:bg-key/25 text-key border border-key/20 text-sm font-semibold transition-all duration-150"
          >
            {isCompleted ? 'Next lesson' : 'Complete & continue'}
            <FiChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Editor pane */}
      <div className="w-1/2 flex flex-col bg-void">
        <div className="px-6 py-4 border-b border-border-subtle flex items-center justify-between">
          <h2 className="font-display text-sm font-medium text-slate-400">
            interactive example
          </h2>
          {isCompleted && (
            <span className="flex items-center gap-1.5 text-xs text-string font-medium">
              <FiCheck className="w-3 h-3" /> completed
            </span>
          )}
        </div>
        <div className="flex-1 min-h-0">
          <CodeEditor
            value={lesson.example}
            onChange={() => {}}
            className="h-full rounded-none border-0"
          />
        </div>
        <div className="px-6 py-3 border-t border-border-subtle">
          <p className="text-xs text-slate-500 text-center">
            Edit freely — it won't affect the lesson.
          </p>
        </div>
      </div>
    </div>
  );
}
