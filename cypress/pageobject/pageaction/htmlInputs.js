class htmlInputs {
  getInput(type, json) {
    let keys = Object.keys(json);

    cy.wrap(keys).each((element, index) => {
      if (type === "select") {
        cy.get("select").each(($select) => {
          cy.wrap($select)
            .invoke("attr", "formcontrolname")
            .then((formControlName) => {
              if (formControlName === element) {
                cy.wrap($select).select(json[element]);
              }
            });
        });
      } else {
        cy.get(`input[type=${type}]`).each(($input) => {
          cy.wrap($input)
            .invoke("attr", "formcontrolname")
            .then((formControlName) => {
              if (formControlName === element) {
                if (
                  type === "text" ||
                  type === "email" ||
                  type === "password"
                ) {
                  cy.wrap($input).clear().type(json[element]);
                } else if (type === "radio") {
                  cy.wrap($input)
                    .invoke("attr", "value")
                    .then((value) => {
                      if (value === json[element]) {
                        cy.wrap($input).check(json[element]);
                      }
                    });
                } else if (type === "checkbox") {
                  if (json[element]) {
                    cy.wrap($input).check().should("be.checked");
                  } else {
                    cy.wrap($input).uncheck().should("not.be.checked");
                  }
                } else if (type === "file") {
                  const fileName = json[element].name;
                  const mymeType = json[element].type;
                  cy.fixture(fileName).then((fileContent) => {
                      const blob = Cypress.Blob.base64StringToBlob(fileContent, mymeType);
                      const file = new File([blob], fileName);
                      const dataTransfer = new DataTransfer();
                      dataTransfer.items.add(file);
                      $input[0].files = dataTransfer.files;
                  });
                }
              }
            });
        });
      }
    });
  }
}

module.exports = new htmlInputs();
