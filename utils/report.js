import reporter from 'cucumber-html-reporter';

const options = {
  theme: 'bootstrap',
  jsonFile: 'reports/cucumber-report.json',
  output: 'reports/cucumber-report.html',
  reportSuiteAsScenarios: true,
  launchReport: true,
  metadata: {
    "Environment": process.env.ENV || "dev",
    "Browser": "Chromium",
    "Platform": "Windows"
  }
};

reporter.generate(options);