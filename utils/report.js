import reporter from 'cucumber-html-reporter';

const options = {
  theme: 'bootstrap',

  jsonFile: 'reports/cucumber-report.json',
  output: 'reports/cucumber-report.html',

  reportSuiteAsScenarios: true,
  launchReport: true,

  metadata: {
    "App Name": "Automation Exercise",
    "Test Environment": "QA",
    "Browser": "Chromium",
    "Platform": "Windows",
    "Executed By": "Lavanya"
  }
};

reporter.generate(options);
