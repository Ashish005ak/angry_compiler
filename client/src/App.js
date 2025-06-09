import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp"; // use cpp() instead of c()

import axios from "axios";

export default function App() {
  const [code, setCode] = useState(`#include <stdio.h>\n\nint main() {\n  printf("Hello World");\n  return 0;\n}`);
  const [output, setOutput] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/compile", { code });
      setOutput(res.data.output);
    } catch (error) {
      setOutput("Error connecting to server.");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: 20, backgroundColor: darkMode ? "#1e1e1e" : "#fff", minHeight: "100vh", color: darkMode ? "#fff" : "#000" }}>
      <button onClick={() => setDarkMode(!darkMode)} style={{ marginBottom: 15 }}>
        {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>

      <CodeMirror
        value={code}
        height="200px"
        theme={darkMode ? "dark" : "light"}
        extensions={[cpp()]}
        onChange={(value) => setCode(value)}
      />

      <button onClick={handleSubmit} disabled={loading} style={{ marginTop: 20 }}>
        {loading ? "Compiling..." : "Compile & Run"}
      </button>

      <h3>Output:</h3>
      <pre style={{ backgroundColor: darkMode ? "#333" : "#eee", padding: 10, minHeight: 100 }}>{output}</pre>
    </div>
  );
}
