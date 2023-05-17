import HeaderAction from "../pageobject/pageaction/headerAction";
import ProductAction from "../pageobject/pageaction/productAction";
const locator = require("../locator.json");

describe("product component test case", () => {
  let headerAction = new HeaderAction();
  let productAction = new ProductAction();

  beforeEach(() => {
    cy.fixture("login/loginRes").then((item) => {
      globalThis.logData = item;
      cy.setToken("loginToken", logData.support.res);
    });
    cy.fixture("product/brand").then((item) => (globalThis.brandList = item));

    headerAction.navigationTo("");
    cy.contains("Product").click();

    cy.fixture("product/productList").then((item) => {
      globalThis.productList = item;
      cy.intercept(
        {
          method: "GET",
          url: "/product",
        },
        { body: item, statusCode: 200 },
        { passthrough: false }
      ).as("proList");
    });
  });

  it("should get item list", () => {
    cy.getToken("loginToken").then((item) => {
      if (!item) {
        cy.get(".toast-error")
          .should("be.visible")
          .and("have.text", " Please login!!! ");
      } else {
        cy.wait("@proList");
        cy.get(locator.htmlTag.cardTag).should("have.length", 4);
      }
    });
  });

  it("should select first", () => {
    cy.getToken("loginToken").then((item) => {
      if (!item) {
        cy.get(".toast-error")
          .should("be.visible")
          .and("have.text", " Please login!!! ");
      } else {
        cy.wait("@proList");
        // cy.get('section').find('.card').eq(1).should('be.visible')
        // cy.get('section').find('.card').eq(1).next().should('be.visible')
        cy.get("section").should("have.class", "section");
      }
    });
  });
  it("should select filter type", () => {
    cy.getToken("loginToken").then((item) => {
      if (!item) {
        cy.get(".toast-error")
          .should("be.visible")
          .and("have.text", " Please login!!! ");
      } else {
        cy.wait("@proList");
        productAction.selectInput("Title").should("have.value", "title");
        productAction.searchInputField("universe");
        cy.wait(5000);
        productAction.searchInputFieldkeyEvent();
      }
    });
  });

  it.only("should add button see", () => {
    cy.setToken("loginToken", logData.admin.res);

    cy.get(".form-group:nth-child(3)").should("be.visible");
    cy.get(".form-group:nth-child(3)")
      .find(".btn-success")
      .contains("Add Product")
      .click();

    cy.get("form").then(($form) => {
      const formFields = $form.find("input, textarea,select");
      console.log(formFields);
      const formData = [];

      formFields.each((index, field) => {
        const fieldName = field.getAttribute("formControlName");
        const idName = field.getAttribute("id");

        const fieldType = field.getAttribute("type");

        switch (fieldType || idName) {
          case "text":
            cy.get(`input[formControlName = ${fieldName}]`).type(
              productList[0][fieldName]
            );
            break;

          case "radio":
            let eqs = brandList
              .map((el) => el.name)
              .indexOf(productList[0][fieldName]);
            if (eqs > -1) {
              cy.get(`input[formControlName = ${fieldName}]`).eq(eqs).check();
            }
            break;

          case "range":
            cy.get(`input[formControlName = ${fieldName}]`)
              .invoke("val", productList[0][fieldName])
              .trigger("change");
            break;

          case "select":
            cy.get(`#${idName}`).select(productList[0][fieldName]);
            break;

          case "textarea":
            cy.get(`#${idName}`).type(productList[0][fieldName]);

          default:
            "";
        }
      });
    });
  });
});
