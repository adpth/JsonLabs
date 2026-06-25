export default function LessonLayout({ theory, editor }) {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="md:w-1/2 w-full overflow-y-auto p-6 bg-white border-r border-gray-200">
        <div className="prose max-w-none">{theory}</div>
      </div>

      <div className="md:w-1/2 w-full overflow-y-auto bg-gray-50">
        <div className="max-w-xl mx-auto">{editor}</div>
      </div>
    </div>
  );
}
