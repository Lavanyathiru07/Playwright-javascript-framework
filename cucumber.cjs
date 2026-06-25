
module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    import: [
      'step-definitions/**/*.js',
      'supports/**/*.js'
    ],
    format: ['progress','json:reports/cucumber-report.json'],
    ...(process.env.tag && { tags: process.env.tag }),
    timeout: 60000
  }
};
