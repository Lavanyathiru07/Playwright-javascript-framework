module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    import: [
      'supports/hooks.js',
      'step-definitions/**/*.js'
    ],
    format: [
      'progress', // ✅ shows live execution in console
      'html:./reports/cucumber-report.html',
      'json:./reports/report.json'
    ],
    // parallel: 5,
    // retry:1,
    ...(process.env.TAG && { tags: process.env.TAG })
  }
};