export const lessons = [
  {
    id: "lesson-1",
    level: "Beginner",
    title: "Introduction to JSON",
    content: `
# What is JSON?

JSON (JavaScript Object Notation) is a lightweight, text-based data interchange format. It is a language-independent standard that defines a simple syntax for representing structured data.

* **Origin**: Designed by Douglas Crockford in the early 2000s, JSON was based on a subset of JavaScript (ES3 syntax), but it operates completely independently of any specific language.
* **Purpose**: JSON serves as a modern, lightweight alternative to XML for transmitting structured data between client applications and web servers.
* **Adoption**: Due to its simplicity, JSON is universally used in REST APIs, configuration files (such as npm's package.json), and modern database systems like PostgreSQL and MongoDB.
* **Readability**: It is extremely easy for humans to read and write while remains simple for computers to parse and generate.
    `,
    example: `{
  "platform": "JSONLabs",
  "version": "1.0.0",
  "isWebNative": true,
  "developerTarget": "all"
}`
  },
  {
    id: "lesson-2",
    level: "Beginner",
    title: "Basic Data Types",
    content: `
# Core Data Types in JSON

JSON supports six primitive and structural data types. It does not support complex runtime types like functions, undefined, or symbols.

* **String**: A sequence of zero or more Unicode characters, which must always be enclosed in double quotes (e.g., "hello").
* **Number**: Double-precision floating-point numbers. They can be positive, negative, integers, decimals, or write in scientific E-notation (e.g., 100, -2.5, 6.02e23).
* **Boolean**: Lowercase literal values: true or false.
* **Null**: The lowercase literal value: null, which represents an empty or non-existent value.
* **Object & Array**: Structural containers that contain other valid JSON types, allowing you to build hierarchical datasets.
    `,
    example: `{
  "username": "developer101",
  "xpPoints": 1500,
  "isActive": true,
  "certificateUrl": null
}`
  },
  {
    id: "lesson-3",
    level: "Beginner",
    title: "JSON Objects",
    content: `
# Understanding Objects

An object in JSON is an unordered collection of key-value pairs. It starts and ends with curly braces, serving as the primary way to represent structured entities.

* **Braces**: Wrapped in curly braces { and }.
* **Keys**: Every key must be a valid string wrapped in double quotes. Unquoted keys or keys with single quotes are invalid.
* **Separator**: A colon (:) separates each key from its value.
* **Commas**: Key-value pairs are separated by commas. No trailing comma is allowed after the final pair.
* **Values**: Values can be of any valid JSON type, including nested objects or arrays.
    `,
    example: `{
  "id": 4092,
  "profile": {
    "displayName": "Sarah Connor",
    "role": "Moderator"
  }
}`
  },
  {
    id: "lesson-4",
    level: "Beginner",
    title: "JSON Arrays",
    content: `
# Understanding Arrays

An array in JSON is an ordered sequence of zero or more values. It represents lists of items and allows collections of values to be stored under a single key.

* **Brackets**: Wrapped in square brackets [ and ].
* **Order**: Elements in an array preserve their insertion order and are indexed starting at 0.
* **Flexibility**: An array can contain any valid JSON type, including strings, numbers, objects, or even other nested arrays.
* **Commas**: Elements are separated by commas. Like objects, trailing commas after the final element are strictly prohibited.
* **Homogeneity**: Although JSON arrays technically allow mixed data types in a single list, keeping arrays homogeneous (containing identical types) is a best practice.
    `,
    example: `{
  "favoriteTags": ["json", "javascript", "webdev"],
  "recentScores": [98, 100, 85, 92]
}`
  },
  {
    id: "lesson-5",
    level: "Intermediate",
    title: "Nested Structures",
    content: `
# Nesting Objects and Arrays

Real-world datasets require complex hierarchies. JSON handles this by nesting objects and arrays inside each other to model relational and nested data models.

* **Deep Nesting**: An object can have properties that point to other objects, which in turn contain arrays of more objects.
* **Modeling Relationships**: You can represent one-to-many relationships (e.g., a user having multiple phone numbers) or one-to-one configurations.
* **Accessing Data**: When parsed into JavaScript, nested values are accessed sequentially using dot notation or bracket notation (e.g., user.address.city).
* **Avoid Bloat**: While deep nesting is powerful, excessively deep structures make parsing slow and increase payload sizes.
    `,
    example: `{
  "organization": "JSONLabs",
  "departments": [
    {
      "name": "Engineering",
      "lead": {
        "firstName": "Alice",
        "lastName": "Smith"
      },
      "tags": ["frontend", "performance"]
    }
  ]
}`
  },
  {
    id: "lesson-6",
    level: "Intermediate",
    title: "JSON vs JavaScript Objects",
    content: `
# Syntax Differences

Although JSON is derived from JavaScript object literals, they are governed by entirely different syntax specifications. Confusing the two is a very common source of bugs.

* **Quotes**: JSON requires double quotes for all keys and string values. JavaScript allows unquoted keys, single quotes, or backticks.
* **Functions & Methods**: JavaScript objects can contain functions and methods. JSON only stores raw data; no executable code or functions are allowed.
* **Comments**: JavaScript allows single-line (//) and multi-line (/* */) comments. The JSON specification has no support for comments.
* **Special Types**: JavaScript objects support undefined, Symbol, BigInt, and RegExp. JSON does not support these; trying to serialize them will either fail or output null.
    `,
    example: `{
  "notes": "JavaScript allows: { name: 'Alice' }. JSON strictly requires double quotes: { \\"name\\": \\"Alice\\" }",
  "validJsonValue": 42
}`
  },
  {
    id: "lesson-7",
    level: "Intermediate",
    title: "Parsing and Stringifying",
    content: `
# Serialization & Deserialization

To work with JSON in JavaScript, you must convert back and forth between a raw JSON string and a memory-resident JavaScript object.

* **JSON.parse()**: Converts a raw JSON string into a JavaScript object. This process is called parsing or deserialization. It throws a SyntaxError if the string is invalid.
* **JSON.stringify()**: Converts a JavaScript object into a valid JSON string. This process is called serialization or stringification.
* **Space Argument**: JSON.stringify accepts an optional third parameter to indent the output, formatting it for human readability (e.g., JSON.stringify(obj, null, 2)).
* **Reviver & Replacer**: Both methods support transformer functions (replacer and reviver) to filter or modify values during conversions.
    `,
    example: `// JavaScript Context Example
const jsonStr = '{"status":"ok","code":200}';
const parsedObj = JSON.parse(jsonStr);

// Convert back to formatted string
const formattedStr = JSON.stringify(parsedObj, null, 2);`
  },
  {
    id: "lesson-8",
    level: "Intermediate",
    title: "Common Syntax Errors",
    content: `
# Syntax Gotchas and Pitfalls

JSON is a strict format. Even a single syntax mistake will cause parsers to reject the entire document. Understanding these errors is critical for debugging APIs.

* **Single Quotes**: Wrapping keys or strings in single quotes (e.g., 'key': 'value') is a syntax violation.
* **Trailing Commas**: Putting a comma after the final property in an object or array (e.g., [1, 2, 3,]) is invalid.
* **Unquoted Keys**: Forgetting to wrap keys in quotes (e.g., { name: "Alice" }) is invalid in JSON.
* **Leading/Trailing Whitespace in Numbers**: Numbers cannot have leading zeros (e.g., 05) or naked decimals (e.g., 42.).
* **Comments**: Placing inline comments will cause immediate parsing failures.
    `,
    example: `{
  "invalidSingleQuotes": "Use double quotes instead",
  "noTrailingCommas": "Make sure to remove the comma after this line"
}`
  },
  {
    id: "lesson-9",
    level: "Advanced",
    title: "JSON Schema Basics",
    content: `
# Schema Definition & Validation

JSON Schema is a declarative vocabulary used to annotate and validate the structure, constraints, and data types of JSON documents.

* **Validation Rules**: A schema acts as a contract. It defines which properties are required, what types they must be, and range limits.
* **Meta-Schemas**: The $schema keyword declares which version of the JSON Schema standard is being used (e.g., Draft 7 or Draft 2020-12).
* **Type Constraints**: You can define string formats (e.g., email, date-time), number ranges (minimum, maximum), and array sizes (minItems).
* **Reuse**: The $ref keyword allows you to reference and reuse common sub-schemas, keeping validation structures DRY (Don't Repeat Yourself).
    `,
    example: `{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "User",
  "type": "object",
  "properties": {
    "id": { "type": "integer" },
    "email": { "type": "string", "format": "email" }
  },
  "required": ["id", "email"]
}`
  },
  {
    id: "lesson-10",
    level: "Advanced",
    title: "JSON in APIs",
    content: `
# API Payloads and Conventions

JSON is the dominant format for data transmission in REST APIs, GraphQL, and webhook integrations. Understanding HTTP standards for JSON is crucial.

* **Content-Type**: When sending JSON in requests or returning it in responses, the HTTP header Content-Type must be set to application/json.
* **Standard Case**: While casing is not enforced by JSON, web APIs standardly use camelCase (e.g., userId) or snake_case (e.g., user_id) for keys.
* **HTTP Methods**: POST, PUT, and PATCH methods pass complex structures inside the request body as JSON strings.
* **Error Payloads**: Modern APIs return structured JSON error payloads containing code, message, and details fields for client-side diagnostics.
    `,
    example: `{
  "status": "success",
  "data": {
    "id": "usr_90a1f",
    "createdAt": "2026-06-25T00:00:00Z"
  },
  "error": null
}`
  },
  {
    id: "lesson-11",
    level: "Advanced",
    title: "Best Practices",
    content: `
# Clean JSON Guidelines

Designing predictable, robust, and clean JSON payloads is an essential skill for software engineers and systems architects.

* **Consistent Naming**: Standardize on one naming convention (camelCase or snake_case) across all APIs.
* **Avoid Redundancy**: Do not repeat context inside keys. Use { "user": { "name": "Alice" } } instead of { "user": { "userName": "Alice" } }.
* **Flatten When Possible**: Avoid unnecessarily nesting properties. Shallow structures are easier to read, parse, and maintain.
* **Strict Nulls**: Avoid omitting optional keys. Instead, specify them with a null value to make schemas explicit.
* **ISO 8601 Dates**: JSON has no native Date type. Always format timestamps as ISO 8601 strings (e.g., "YYYY-MM-DDTHH:mm:ssZ").
    `,
    example: `{
  "eventId": "evt_29841",
  "timestamp": "2026-06-25T14:30:00Z",
  "metadata": {
    "sourceIp": "192.168.1.1",
    "userAgent": "Chrome"
  }
}`
  },
  {
    id: "lesson-12",
    level: "Advanced",
    title: "Performance & Optimization",
    content: `
# High Performance JSON

Large JSON payloads can cause high memory usage and parsing latency. Optimizing JSON generation and deserialization is key for high-throughput applications.

* **Minification**: Production payloads should be minified (whitespace, tabs, and newlines removed) to reduce bandwidth and speed up parsing.
* **Compression**: Web servers should always compress JSON responses using algorithms like Gzip or Brotli, which can reduce payload sizes by up to 80%.
* **Streaming Parsers**: For huge files (megabytes to gigabytes), use streaming parsers (e.g., JSONStream in Node.js) to process data chunk-by-chunk without crashing memory.
* **Short Keys**: In large arrays containing thousands of items, using shorter key names (e.g., "qty" instead of "orderedQuantity") significantly shrinks overall network sizes.
    `,
    example: `{"id":42,"qty":5,"status":"shipped"}`
  }
];