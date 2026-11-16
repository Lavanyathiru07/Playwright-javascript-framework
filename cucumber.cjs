module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    import: [
      'supports/hooks.js',
      'step-definitions/**/*.js'
    ],
    format: [
      'progress',
      'allure-cucumberjs/reporter'
    ],
    formatOptions: {
      resultsDir: 'allure-results'
    },
    // parallel: 5,
    // retry:1,
    ...(process.env.TAG && { tags: process.env.TAG })
  }
};