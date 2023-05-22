import FormPageElement from "../pagelement/formPageElement";

export default class EmployeeAction {
  constructor() {
    globalThis.formELement = new FormPageElement();
  }

  /**
   * submit button on form
   */
  submitBtn() {
    formELement.submitBtn().click();
  }

  /**
   *
   * @param {*} email get email value from employee cy
   */
  emailvalidation(email) {
    // ------- set email value in email field by getting form control name
    cy.get("input[formControlName =email]").type(email);
  }

  /**
   * add employee information
   * @param {*} employeeInfo get employee general infomration
   */
  addEmployeeinfo(employeeInfo) {
    // ------- get full form fields
    cy.get("form").then(($form) => {
      // ------- select field by tags
      const formFields = $form.find("input, textarea,select");

      formFields.each((index, field) => {
        const fieldName = field.getAttribute("formControlName");
        const idName = field.getAttribute("id");
        const dataCy = field.getAttribute("data-cy");
        const fieldType = field.getAttribute("type");
        switch (fieldType || idName) {
          case "text":
            //------- here all input field with type input
            //------- datacy === form-aaray-item is for all skill form array fields
            if (dataCy === "form-array-item") {
              employeeInfo.skillSet.map((el, index) => {
                cy.get(`#form-array-item${index} `).type(el.name);
                if (employeeInfo.skillSet.length !== index + 1) {
                  cy.contains("+").click();
                }
              });
            }

            // ------- dataCy === "form-control" for only input fields
            if (dataCy === "form-control") {
              cy.get("[data-cy=form-control]")
                .get(`input[formControlName = ${fieldName}]`)
                .type(employeeInfo[fieldName]);
            }
            break;

          case "password":
            cy.get(`input[formControlName = ${fieldName}]`).type(
              employeeInfo[fieldName],
            );
            break;

          case "date":
            cy.get(`input[formControlName = ${fieldName}]`).type(
              employeeInfo[fieldName],
            );
            break;

          case "select":
            cy.get(`#${idName}`).select(employeeInfo[fieldName]);
            break;

          case "textarea":
            cy.get(`#${idName}`).type(employeeInfo[fieldName]);
            break;

          default:
            "";
        }
      });
    });
  }

  /**
   * @param {*} projectdetail get all project detail array
   */
  addProject(projectdetail) {
    // ------ array for getting all unique ids for all form fields
    const visitedIds = [];

    projectdetail.map((el, iIndex) => {
      //------- after filled all general info data click to button for adding project detail
      cy.contains("Add Project").click();

      // ------- get full form fields
      cy.get("form").then(($form) => {
        const formFields = $form.find("input, textarea,select");

        formFields.each((jIndex, field) => {
          const fieldName = field.getAttribute("formControlName");
          const idName = field.getAttribute("id");
          const dataCy = field.getAttribute("data-cy");
          const fieldType = field.getAttribute("type");

          // ------- check if input field id is unique
          if (visitedIds.indexOf(idName) === -1) {
            // ------- push all unique ids
            visitedIds.push(idName);

            if (dataCy === "project-form-array") {
              switch (fieldType || idName) {
                case "text":
                  cy.get(
                    `#project-form-array${iIndex} > input[formControlName = ${fieldName}]`,
                  ).type(el[fieldName]);

                  break;

                case "date":
                  cy.get(
                    `#project-form-array${iIndex} > input[formControlName = ${fieldName}]`,
                  ).type(el[fieldName]);

                  break;

                case "select":
                  cy.get(`#${idName}`).select(el[fieldName]);

                  break;

                case "textarea":
                  cy.get(
                    `#project-form-array${iIndex}  >  textarea[formControlName = ${fieldName}]`,
                  ).type(el[fieldName]);

                  break;

                default:
                  "";
              }
            }
          }
        });
      });

      if (projectdetail.length === iIndex + 1) {
        cy.contains("Submit").click();
      }
    });
  }

  /**
   *
   * @param {*} employeeInfo get all skillset item
   */
  addSKills(employeeInfo) {
    employeeInfo.skillSet.map((el, index) => {
      cy.get(`#form-array-item${index} `).type(el.name);
      if (employeeInfo.skillSet.length !== index + 1) {
        cy.contains("+").click();
      }
    });
  }
}
