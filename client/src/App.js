import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import axios from "axios";
import Header from "./header";
import "./App.css";

export default function App() {
  const [code, setCode] = useState(`#include <stdio.h>

int main() {
  printf("Hello World");
  return 0;
}`);
  const [output, setOutput] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setOutput("");
    try {
      const res = await axios.post("http://localhost:5000/api/compile", { code });
      setOutput(res.data.output);
    } catch (error) {
      setOutput("Error connecting to server.");
    }
    setLoading(false);
  };

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <div className={`app-container ${darkMode ? "dark" : "light"}`}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main className="main-content">
        <CodeMirror
          value={code}
          height="300px"
          theme={darkMode ? "dark" : "light"}
          extensions={[cpp()]}
          onChange={setCode}
          className="code-editor"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`compile-btn ${loading ? "disabled" : ""}`}
        >
          {loading ? "Compiling..." : "Compile & Run"}
        </button>

        <h3>Output:</h3>
        <pre className="output-box" aria-live="polite">
          {output}
        </pre>
      </main>
    </div>
  );
}
