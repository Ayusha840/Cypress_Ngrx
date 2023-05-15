/**
 * @type {Cypress.PluginConfig}
 */
import registerCodeCoverageTasks from '@cypress/code-coverage/task';
const { exec } = require('child_process');
const path = require('path')

export default (on: any, config: any) => {
  console.log("Executed");
  
  on('after:spec', (spec: { relative: string; }, results: any) => {
    if (spec.relative === 'cypress/e2e/errorChecks/console/error/error.cy.ts') {
      // Run your specific test file
      const command = 'cypress run --spec cypress/e2e/errorChecks/console/error/error.cy.ts';

      // Run the specific test file using the 'exec' command
      exec(command, (error: any, stdout: any, stderr: any) => {
        if (error) {
          console.error(`Error running specific test file: ${error}`);
        }
      });
    }
  });
  // return registerCodeCoverageTasks(on, config);
};
