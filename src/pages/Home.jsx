import { Link } from "react-router-dom";
import lessons from "../data/lesson";

export default function Home() {
  return (
    <div className="p-10 text-center">
      <h1 className="text-4xl font-bold">Learn JSON</h1>
      <p className="mt-4 text-lg">
        Interactive JSON tour to learn step-by-step.
      </p>
      <Link
        to="/lesson/1"
        className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded"
      >
        Start Tour
      </Link>

      <div className="mt-12 text-left">
        <h2 className="text-2xl font-semibold mb-4">Lesson Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lessons.map((lesson, index) => (
            <Link
              key={index}
              to={`/lesson/${index + 1}`}
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-medium text-lg flex items-center">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3">
                  {index + 1}
                </span>
                {lesson.title}
              </h3>
              <p className="mt-2 text-gray-600 text-sm">{lesson.content}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
