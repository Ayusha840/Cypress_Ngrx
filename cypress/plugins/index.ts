/**
 * @type {Cypress.PluginConfig}
 */
import registerCodeCoverageTasks from '@cypress/code-coverage/task';

export default (on: any, config: any) => {
  return registerCodeCoverageTasks(on, config);
};
