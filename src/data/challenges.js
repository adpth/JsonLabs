export const challenges = [
  {
    id: "fix-1",
    type: "fix",
    title: "Fix the String Quotes",
    description: "JSON strings and keys must be enclosed in double quotes. Fix the snippet below so it is valid JSON.",
    initialCode: `{
  'name': 'JSONLabs',
  'isEducational': true
}`,
    validate: (code) => {
      try {
        const parsed = JSON.parse(code);
        return parsed.name === "JSONLabs" && parsed.isEducational === true;
      } catch {
        return false;
      }
    },
    hints: [
      "Look at the quotes around the keys and values.",
      "Replace single quotes (') with double quotes (\")."
    ]
  },
  {
    id: "fix-2",
    type: "fix",
    title: "Remove Trailing Comma",
    description: "JSON does not allow trailing commas at the end of objects or arrays. Fix the syntax error.",
    initialCode: `{
  "apples": 5,
  "oranges": 10,
}`,
    validate: (code) => {
      try {
        const parsed = JSON.parse(code);
        return parsed.apples === 5 && parsed.oranges === 10;
      } catch {
        return false;
      }
    },
    hints: [
      "Look at the last key-value pair.",
      "Remove the comma after 10."
    ]
  },
  {
    id: "write-1",
    type: "write",
    title: "Create a User Object",
    description: "Write a JSON object representing a user. It should have a key 'username' (string), 'age' (number), and 'isActive' (boolean).",
    initialCode: `{\n  \n}`,
    validate: (code) => {
      try {
        const parsed = JSON.parse(code);
        return typeof parsed.username === 'string' && typeof parsed.age === 'number' && typeof parsed.isActive === 'boolean';
      } catch {
        return false;
      }
    },
    hints: [
      "Start with curly braces.",
      "Make sure all keys are wrapped in double quotes."
    ]
  },
  {
    id: "write-2",
    type: "write",
    title: "Create an Array of Colors",
    description: "Write a JSON array containing three strings: 'red', 'green', and 'blue'.",
    initialCode: `[\n  \n]`,
    validate: (code) => {
      try {
        const parsed = JSON.parse(code);
        return Array.isArray(parsed) && parsed.length === 3 && parsed.includes("red") && parsed.includes("green") && parsed.includes("blue");
      } catch {
        return false;
      }
    },
    hints: [
      "Arrays use square brackets.",
      "Separate elements with commas."
    ]
  },
  {
    id: "identify-1",
    type: "identify",
    title: "Identify Valid JSON",
    description: "Which of the following is a valid JSON object?",
    options: [
      `{ name: "John" }`,
      `{ "name": "John" }`,
      `{ 'name': 'John' }`
    ],
    correctOptionIndex: 1,
    hints: [
      "JSON requires double quotes around keys and string values."
    ]
  }
];
