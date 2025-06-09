const fs = require('fs');
const { exec } = require('child_process');
const { transformErrorWithAI } = require('../services/aiService');

exports.compileCode = (req, res) => {
  const userCode = req.body.code;

  // Save user code to temp.c
  fs.writeFileSync('temp.c', userCode);

  // Step 1: Compile
  exec('gcc temp.c -o temp', async (compileError, compileStdout, compileStderr) => {
    if (compileError) {
      // Compilation failed, get angry error from AI
      try {
        const angryMsg = await transformErrorWithAI(compileStderr);
        return res.status(200).json({ success: false, output: angryMsg });
      } catch (aiError) {
        // If AI fails, fallback to raw compiler error output
        return res.status(200).json({ success: false, output: compileStderr });
      }
    }

    // Step 2: Run the executable if compilation succeeded
    exec('temp.exe', (runError, runStdout, runStderr) => {
      if (runError) {
        // Runtime error — return stderr directly
        return res.status(200).json({ success: false, output: runStderr });
      }

      // Success — return program output
      return res.status(200).json({ success: true, output: runStdout });
    });
  });
};
