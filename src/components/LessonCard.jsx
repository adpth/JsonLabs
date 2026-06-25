export default function LessonCard({
  title,
  description,
  examples,
  completed,
}) {
  return (
    <div
      className={`p-6 border rounded-lg shadow-sm ${
        completed ? "bg-green-50 border-green-200" : "bg-white"
      }`}
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>

      {examples && (
        <div className="space-y-3">
          <h4 className="font-medium">Examples:</h4>
          {examples.map((example, idx) => (
            <div key={idx} className="p-3 bg-gray-50 rounded-md">
              <pre className="text-sm overflow-x-auto">
                {JSON.stringify(example, null, 2)}
              </pre>
            </div>
          ))}
        </div>
      )}

      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
        {completed ? "Review" : "Start Lesson"}
      </button>
    </div>
  );
}
