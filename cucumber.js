module.exports = {
    default: {
        requireModule: ['ts-node/register'],
        require: ['src/step_definitions/**/*.ts'],
        format: ['progress', 'html:reports/cucumber-report.html'],
        paths: ['src/features/'],
        publishQuiet: true,
        timeout: 120000
    }
}; 