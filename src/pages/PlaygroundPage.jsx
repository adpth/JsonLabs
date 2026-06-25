import { useState, useEffect } from 'react';
import { useToast } from '../contexts/ToastContext';
import { playgroundSamples } from '../data/playgroundSamples';
import CodeEditor from '../components/CodeEditor';
import JsonTreeViewer from '../components/JsonTreeViewer';
import { FiCopy, FiAlignLeft, FiMinimize2, FiAlertTriangle, FiCheck, FiChevronDown } from 'react-icons/fi';

export default function PlaygroundPage() {
  const [code, setCode] = useState('{\n  "message": "Welcome to the playground",\n  "ready": true\n}');
  const [parsedData, setParsedData] = useState(null);
  const [error, setError] = useState(null);
  const [justCopied, setJustCopied] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    try {
      if (!code.trim()) {
        setParsedData(null);
        setError(null);
        return;
      }
      const parsed = JSON.parse(code);
      setParsedData(parsed);
      setError(null);
    } catch (e) {
      setError(e.message);
    }
  }, [code]);

  const handleFormat = () => {
    if (!error && parsedData) {
      setCode(JSON.stringify(parsedData, null, 2));
      addToast('Formatted', 'success');
    } else {
      addToast('Fix syntax errors first', 'error');
    }
  };

  const handleMinify = () => {
    if (!error && parsedData) {
      setCode(JSON.stringify(parsedData));
      addToast('Minified', 'success');
    } else {
      addToast('Fix syntax errors first', 'error');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setJustCopied(true);
      addToast('Copied', 'success');
      setTimeout(() => setJustCopied(false), 2000);
    }).catch(() => {
      addToast('Copy failed', 'error');
    });
  };

  const handleSampleChange = (e) => {
    if (e.target.value) {
      const sample = playgroundSamples.find(s => s.id === e.target.value);
      if (sample) setCode(sample.code);
      e.target.value = '';
    }
  };

  return (
    <div className="flex flex-col h-full bg-void">
      {/* Toolbar */}
      <header className="bg-surface-0 border-b border-border-subtle px-5 py-3 flex items-center gap-3 flex-shrink-0">
        <h1 className="font-display text-sm font-semibold text-white mr-2">playground</h1>

        <div className="h-4 w-px bg-border-subtle" />

        {/* Sample selector */}
        <div className="relative">
          <select
            className="appearance-none bg-surface-2 border border-border-subtle text-sm text-slate-300 rounded-md pl-3 pr-7 py-1.5 outline-none focus:border-key/40 cursor-pointer transition-colors"
            onChange={handleSampleChange}
            defaultValue=""
          >
            <option value="" disabled>Load sample…</option>
            {playgroundSamples.map(sample => (
              <option key={sample.id} value={sample.id}>{sample.name}</option>
            ))}
          </select>
          <FiChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
        </div>

        <div className="h-4 w-px bg-border-subtle" />

        {/* Action buttons */}
        <ToolbarButton onClick={handleFormat} icon={FiAlignLeft} label="Format" />
        <ToolbarButton onClick={handleMinify} icon={FiMinimize2} label="Minify" />
        <ToolbarButton
          onClick={handleCopy}
          icon={justCopied ? FiCheck : FiCopy}
          label={justCopied ? 'Copied' : 'Copy'}
        />

        {/* Status indicator */}
        <div className="ml-auto flex items-center gap-2">
          {error ? (
            <div className="flex items-center gap-1.5 text-null text-xs font-medium">
              <FiAlertTriangle className="w-3.5 h-3.5" />
              <span>Invalid</span>
            </div>
          ) : code.trim() ? (
            <div className="flex items-center gap-1.5 text-string text-xs font-medium">
              <FiCheck className="w-3.5 h-3.5" />
              <span>Valid</span>
            </div>
          ) : null}
        </div>
      </header>

      {/* Split panes */}
      <div className="flex flex-1 overflow-hidden">
        {/* Editor */}
        <div className="w-1/2 border-r border-border-subtle flex flex-col relative">
          <div className="px-4 py-2 border-b border-border-subtle bg-surface-0">
            <span className="text-[11px] font-display text-slate-500 tracking-wide">editor</span>
          </div>
          <div className="flex-1 min-h-0">
            <CodeEditor
              value={code}
              onChange={setCode}
              className="h-full rounded-none border-0"
            />
          </div>
          {error && (
            <div className="absolute bottom-0 left-0 right-0 bg-null/10 border-t border-null/20 text-null px-4 py-2.5 text-xs font-mono flex items-center gap-2 backdrop-blur-sm">
              <FiAlertTriangle className="flex-shrink-0 w-3.5 h-3.5" />
              <span className="truncate">{error}</span>
            </div>
          )}
        </div>

        {/* Tree viewer */}
        <div className="w-1/2 flex flex-col bg-surface-0">
          <div className="px-4 py-2 border-b border-border-subtle">
            <span className="text-[11px] font-display text-slate-500 tracking-wide">tree view</span>
          </div>
          <div className="flex-1 overflow-y-auto p-5">
            {!error && parsedData !== null ? (
              <div className="bg-void border border-border-subtle rounded-lg p-4 overflow-x-auto">
                <JsonTreeViewer data={parsedData} />
              </div>
            ) : error ? (
              <div className="h-full flex items-center justify-center flex-col text-slate-500 space-y-3">
                <FiAlertTriangle className="w-8 h-8 text-null/40" />
                <p className="text-sm">Fix the syntax error to view the tree</p>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-500">
                <p className="text-sm">Enter JSON to view the parsed tree</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
function ToolbarButton({ onClick, icon: Icon, label }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-400 hover:text-white hover:bg-surface-2 rounded-md transition-all duration-150"
    >
      <Icon className="w-3.5 h-3.5" />
      {label}
    </button>
  );
}
