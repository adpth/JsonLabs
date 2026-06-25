import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const ConfirmContext = createContext();

export function ConfirmProvider({ children }) {
  const [dialogState, setDialogState] = useState(null);

  const confirm = useCallback(({ title, message, confirmText = 'Confirm', cancelText = 'Cancel', variant = 'danger' }) => {
    return new Promise((resolve) => {
      setDialogState({
        title,
        message,
        confirmText,
        cancelText,
        variant,
        resolve: (val) => {
          setDialogState(null);
          resolve(val);
        }
      });
    });
  }, []);

  useEffect(() => {
    if (!dialogState) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        dialogState.resolve(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dialogState]);

  const confirmButtonClass = dialogState?.variant === 'danger'
    ? 'px-4 py-2 rounded-lg bg-null/10 hover:bg-null/20 text-null border border-null/20 text-sm font-semibold transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-null/30'
    : 'px-4 py-2 rounded-lg bg-key/10 hover:bg-key/20 text-key border border-key/20 text-sm font-semibold transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-key/30';

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      <AnimatePresence>
        {dialogState && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => dialogState.resolve(false)}
              className="absolute inset-0 bg-void/70 backdrop-blur-sm"
            />

            {/* Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="relative w-full max-w-sm overflow-hidden rounded-xl border border-border bg-surface-0 p-6 shadow-2xl z-10"
              role="dialog"
              aria-modal="true"
              aria-labelledby="confirm-dialog-title"
            >
              <h3 id="confirm-dialog-title" className="font-display text-[15px] font-bold text-white mb-2 tracking-tight">
                {dialogState.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                {dialogState.message}
              </p>
              
              <div className="flex items-center justify-end gap-2.5">
                <button
                  onClick={() => dialogState.resolve(false)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-surface-2 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-slate-700"
                >
                  {dialogState.cancelText}
                </button>
                <button
                  onClick={() => dialogState.resolve(true)}
                  className={confirmButtonClass}
                >
                  {dialogState.confirmText}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </ConfirmContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useConfirm = () => useContext(ConfirmContext);
