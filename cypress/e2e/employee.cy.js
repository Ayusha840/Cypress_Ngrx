import EmployeeAction from "../pageobject/pageaction/employeeAction";
import HeaderAction from "../pageobject/pageaction/headerAction";
import FormPageElement from "../pageobject/pagelement/formPageElement";
const locator = require("../locator.json");

describe("product component test case", () => {
  let headerAction = new HeaderAction();
  let employeeAction = new EmployeeAction();
  let formpageElement = new FormPageElement();
  beforeEach(() => {
    cy.fixture("login/loginRes").then((item) => {
      globalThis.logData = item;
      cy.setToken("loginToken", logData.support.res);
    });

    headerAction.navigationTo("");
    cy.contains("Employee Info").click();
    cy.fixture("employee/employeeinfo").then((item) => {
      globalThis.employeeInfo = item;
    });
  });

  /**
   * case for required error showing on input field when chlick to submit button
   */
  it.skip("should click to submit btn", () => {
    // ------- click to submit button
    employeeAction.submitBtn();

    // ------- get input field and check have class
    formpageElement.input1().should("have.class", "isErr");

    // ------- check error message show for empty skill set
    cy.get("[data-cy=skill-err]").contains("Please Fill remain skillset first");

    // ------- check class add on skill set error
    cy.get("[data-cy=skill-err]").should("have.class", "text-danger");

    cy.wait(3000);
  });

  /**
   * case fpr email validation
   */
  it.skip("should check email is valid or not", () => {
    // ------- set invlid email to email field
    employeeAction.emailvalidation(employeeInfo.formRes.invalidemail);

    // ------- check err class on email input field
    cy.get("input[formControlName =email]").should("have.class", "isErr");

    cy.wait(3000);
  });

  /**
   * case to show error add new skill set if empty field found
   */
  it.skip("should not add skill", () => {
    // ------- add all skill set
    employeeAction.addSKills(employeeInfo.formRes);

    // ------- click to add skill set button
    // ------- new empty input field append
    cy.get(".box").contains("+").click();

    // ------- click again to append one more empty field
    cy.get(".box").contains("+").click();

    // ------- check error text appear on empty skill inptu field
    cy.get("[data-cy=skill-err]").contains("Please Fill remain skillset first");

    // ------- check erro class on empty skill field
    cy.get("[data-cy=skill-err]").should("have.class", "text-danger");
  });

  /**
   * case for removing any of existing skill set
   */
  it.skip("should remove node js skills from skill set", () => {
    // ------- set all skill into skills form array
    employeeAction.addSKills(employeeInfo.formRes);

    // ------- get index of skill for removing from an skill array
    let itemIndex = employeeInfo.formRes.skillSet
      .map((el) => el.name)
      .indexOf("react");

    // ------- set condition if skill exist in skill array
    if (itemIndex > -1) {
      // ------- get button of skill item by :nth-child() and click
      cy.get(`:nth-child(${itemIndex + 1}) > .skills-section p`).click();
      cy.wait(2000);

      // ------- get add button and click for adding new skill after removing once
      cy.get(".box").contains("+").click();

      // ------- set 'new tech' skill into last append empty input field
      cy.get(":last-child > .skills-section input").type("nes tech");
      cy.wait(2000);
    }
  });

  /**
   * case for clear any filed and add new one then check error
   */
  it.skip("should clear and add new skill", () => {
    // ------- set all skill into skills form array
    employeeAction.addSKills(employeeInfo.formRes);
    cy.wait(2000);

    // ------- get index of skill for removing from an skill array
    let itemIndex = employeeInfo.formRes.skillSet
      .map((el) => el.name)
      .indexOf("react");

    // ------- set condition if skill exist in skill array
    if (itemIndex > -1) {
      // ------- get button of skill item by :nth-child() and clear text
      cy.get(`:nth-child(${itemIndex + 1}) > .skills-section input`).clear();
      cy.wait(2000);

      // ------- get add button and click for adding new skill
      cy.get(".box").contains("+").click();

      // ------- check error with class
      cy.get(`:nth-child(${itemIndex + 1})  [data-cy= skill-err]`).contains(
        "Please Fill remain skillset first",
      );
    }
  });

  /**
   * add all valid data in form
   */
  it("should fill form data ", () => {
    // ------- add eployee genreal into first
    employeeAction.addEmployeeinfo(employeeInfo.formRes);

    // ------- add project detail
    employeeAction.addProject(employeeInfo.formRes.projectdetail);
  });
});
