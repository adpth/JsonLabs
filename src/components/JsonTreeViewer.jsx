import { useState } from 'react';
import { FiChevronRight, FiChevronDown } from 'react-icons/fi';

export default function JsonTreeViewer({ data, name = "root", isLast = true }) {
  const [isExpanded, setIsExpanded] = useState(true);

  if (data === null) {
    return <ValueRenderer name={name} value="null" type="null" isLast={isLast} />;
  }

  if (typeof data === 'string') {
    return <ValueRenderer name={name} value={`"${data}"`} type="string" isLast={isLast} />;
  }

  if (typeof data === 'number') {
    return <ValueRenderer name={name} value={data} type="number" isLast={isLast} />;
  }

  if (typeof data === 'boolean') {
    return <ValueRenderer name={name} value={data ? 'true' : 'false'} type="boolean" isLast={isLast} />;
  }

  const isArray = Array.isArray(data);
  const keys = Object.keys(data);
  const isEmpty = keys.length === 0;

  const toggleExpand = () => setIsExpanded(!isExpanded);

  if (isEmpty) {
    return (
      <div className="font-mono text-[13px] leading-7">
        {name !== null && <span className="text-key">&quot;{name}&quot;: </span>}
        <span className="text-slate-500">{isArray ? '[]' : '{}'}{!isLast && ','}</span>
      </div>
    );
  }

  return (
    <div className="font-mono text-[13px] leading-7">
      <div
        className="flex items-center cursor-pointer select-none hover:bg-key/5 -mx-1 px-1 rounded transition-colors duration-100"
        onClick={toggleExpand}
      >
        <span className="text-slate-500 mr-1 flex-shrink-0 w-4 h-4 flex items-center justify-center">
          {isExpanded ? <FiChevronDown className="w-3 h-3" /> : <FiChevronRight className="w-3 h-3" />}
        </span>
        {name !== null && <span className="text-key">&quot;{name}&quot;: </span>}
        <span className="text-slate-500">
          {isArray ? '[' : '{'}
          {!isExpanded && (
            <span className="text-slate-600 ml-1">
              {keys.length} {keys.length === 1 ? 'item' : 'items'} {isArray ? ']' : '}'}
            </span>
          )}
          {!isExpanded && !isLast && ','}
        </span>
      </div>

      {isExpanded && (
        <div className="pl-5 border-l border-border-subtle ml-[7px]">
          {keys.map((key, index) => (
            <JsonTreeViewer
              key={key}
              name={isArray ? null : key}
              data={data[key]}
              isLast={index === keys.length - 1}
            />
          ))}
        </div>
      )}

      {isExpanded && (
        <div className="ml-[18px]">
          <span className="text-slate-500">{isArray ? ']' : '}'}{!isLast && ','}</span>
        </div>
      )}
    </div>
  );
}

function ValueRenderer({ name, value, type, isLast }) {
  const typeColors = {
    string: 'text-string',
    number: 'text-number',
    boolean: 'text-boolean',
    null: 'text-null',
  };

  return (
    <div className="font-mono text-[13px] leading-7 flex pl-5">
      {name !== null && <span className="text-key mr-1">&quot;{name}&quot;:</span>}
      <span className={typeColors[type]}>{value}</span>
      {!isLast && <span className="text-slate-500">,</span>}
    </div>
  );
}
