import { useState } from "react";

export default function JSONEditor({ initialValue, onValidate }) {
  const [value, setValue] = useState(initialValue || "");
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);

    try {
      JSON.parse(newValue);
      setError(null);
      onValidate && onValidate(true);
    } catch (err) {
      setError(err.message);
      onValidate && onValidate(false);
    }
  };

  return (
    <div className="space-y-2">
      <textarea
        className="w-full h-64 p-4 font-mono text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        value={value}
        onChange={handleChange}
        spellCheck="false"
      />
      {error && (
        <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
}
