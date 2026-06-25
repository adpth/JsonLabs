import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { ProgressProvider } from './contexts/ProgressContext';
import { ToastProvider } from './contexts/ToastContext';
import { ConfirmProvider } from './contexts/ConfirmContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import LessonPage from './pages/LessonPage';
import PracticePage from './pages/PracticePage';
import PlaygroundPage from './pages/PlaygroundPage';

function App() {
  return (
    <ThemeProvider>
      <ProgressProvider>
        <ConfirmProvider>
          <ToastProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="learn" element={<LessonPage />} />
                <Route path="practice" element={<PracticePage />} />
                <Route path="playground" element={<PlaygroundPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </ToastProvider>
        </ConfirmProvider>
      </ProgressProvider>
    </ThemeProvider>
  );
}

export default App;
