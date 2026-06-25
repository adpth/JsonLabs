import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import LessonLayout from "../components/LessonLayout";
import CodeEditor from "../components/CodeEditor";
import lessons from "../data/lessons";

export default function Lesson() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);

  const lesson = lessons.find((l) => l.id === parseInt(id));
  const section = lesson.sections[currentSection];

  const nextSection = () => {
    if (currentSection < lesson.sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      const nextLesson = lessons.find((l) => l.id === lesson.id + 1);
      if (nextLesson) {
        navigate(`/lesson/${nextLesson.id}`);
        setCurrentSection(0);
      }
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    } else {
      const prevLesson = lessons.find((l) => l.id === lesson.id - 1);
      if (prevLesson) {
        navigate(`/lesson/${prevLesson.id}`);
        setCurrentSection(prevLesson.sections.length - 1);
      }
    }
  };

  const theory = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{lesson.title}</h2>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
          {lesson.difficulty}
        </span>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">{section.title}</h3>
        <div className="prose max-w-none">
          <p className="whitespace-pre-line">{section.content}</p>
        </div>

        {section.examples && (
          <div className="space-y-3">
            <h4 className="font-medium">Examples:</h4>
            {section.examples.map((example, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-md border">
                {example.description && (
                  <p className="text-sm text-gray-600 mb-2">
                    {example.description}
                  </p>
                )}
                <pre className="text-sm overflow-x-auto bg-gray-800 text-gray-100 p-3 rounded">
                  {typeof example.code === "string"
                    ? example.code
                    : JSON.stringify(example.code, null, 2)}
                </pre>
                {example.isInvalid && (
                  <p className="text-sm text-red-500 mt-1">
                    This is invalid JSON!
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-between pt-6 border-t mt-6">
        <button
          onClick={prevSection}
          disabled={currentSection === 0 && lesson.id === 1}
          className={`px-4 py-2 rounded-lg ${
            currentSection === 0 && lesson.id === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-blue-600 hover:bg-blue-50"
          }`}
        >
          ← Previous
        </button>

        <div className="flex items-center space-x-2">
          {lesson.sections.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSection(idx)}
              className={`w-3 h-3 rounded-full ${
                idx === currentSection ? "bg-blue-600" : "bg-gray-300"
              }`}
              aria-label={`Go to section ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSection}
          disabled={
            currentSection === lesson.sections.length - 1 &&
            lesson.id === lessons.length
          }
          className={`px-4 py-2 rounded-lg ${
            currentSection === lesson.sections.length - 1 &&
            lesson.id === lessons.length
              ? "text-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {currentSection === lesson.sections.length - 1 &&
          lesson.id === lessons.length
            ? "Complete!"
            : "Next →"}
        </button>
      </div>
    </div>
  );

  return (
    <LessonLayout
      theory={theory}
      editor={
        <CodeEditor
          initialCode={JSON.stringify(
            section.examples?.[0]?.code || {},
            null,
            2
          )}
        />
      }
    />
  );
}
