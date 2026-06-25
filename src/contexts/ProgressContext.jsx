import { createContext, useContext, useEffect, useState } from 'react';

const ProgressContext = createContext();

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('jsonlabs-progress');
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          console.error('Failed to parse progress', e);
        }
      }
    }
    return {
      completedLessons: [],
      completedChallenges: [],
    };
  });

  useEffect(() => {
    localStorage.setItem('jsonlabs-progress', JSON.stringify(progress));
  }, [progress]);

  const markLessonCompleted = (lessonId) => {
    setProgress((prev) => ({
      ...prev,
      completedLessons: prev.completedLessons.includes(lessonId)
        ? prev.completedLessons
        : [...prev.completedLessons, lessonId],
    }));
  };

  const markChallengeCompleted = (challengeId) => {
    setProgress((prev) => ({
      ...prev,
      completedChallenges: prev.completedChallenges.includes(challengeId)
        ? prev.completedChallenges
        : [...prev.completedChallenges, challengeId],
    }));
  };

  const resetLessons = () => {
    setProgress((prev) => ({ ...prev, completedLessons: [] }));
  };

  const resetChallenges = () => {
    setProgress((prev) => ({ ...prev, completedChallenges: [] }));
  };

  return (
    <ProgressContext.Provider
      value={{ progress, markLessonCompleted, markChallengeCompleted, resetLessons, resetChallenges }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useProgress = () => useContext(ProgressContext);
