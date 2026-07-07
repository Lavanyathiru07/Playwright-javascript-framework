let Logger = {

  // ✅ White color (default → no color needed)
  step(input) {
    console.log(`[STEP] ${input}`);
  },

  // ✅ White color (default terminal)
  info(input) {
    console.log(`[INFO] ${input}`);
  },

  // ✅ Blue for action (optional but helpful)
  action(input) {
    console.log(`[ACTION] ${input}`);
  },

  // ✅ Green for success
  success(input) {
    console.log('\x1b[32m[SUCCESS] ' + input + '\x1b[0m');
  },

  // ✅ Yellow for warning
  warn(input) {
    console.log('\x1b[33m[WARNING] ' + input + '\x1b[0m');
  },

  // ✅ Red for error
  error(input) {
    console.error('\x1b[31m[ERROR] ' + input + '\x1b[0m');
    throw new Error(input);
  }

};

export default Logger;
