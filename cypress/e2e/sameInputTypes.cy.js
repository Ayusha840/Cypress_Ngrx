import inputsUser from '../fixtures/inputsUser.json';
import htmlInputs from '../pageobject/pageaction/htmlInputs';

describe("Case for Dialog", () => {

  it("fill text inputs", () => {
    
    cy.visit("/add-user");
    
    // cy.get('form').then(($form) => {
    //     console.log("form:", $form);
        
    //     const formFields = $form.find('input, select')

    //     console.log("formFields:", formFields);
    //     formFields.each((index, field) => {
    //         const temp = field.getAttribute('type')
    //         htmlInputs.getInput(temp, inputsUser)
    //     })
    // })


    cy.get('form').then(($form) => {
      console.log("form:", $form);
      
      const formFields = $form.find('input, select')
    
      console.log("formFields:", formFields);
      formFields.each((index, field) => {
        
        if (field.tagName.toLowerCase() === 'select') {
          const fieldType = field.tagName.toLowerCase();
          htmlInputs.getInput(fieldType, inputsUser);
        } else {
          const fieldType = field.getAttribute('type');
          htmlInputs.getInput(fieldType, inputsUser);
        }

      });
    });
    
    // htmlInputs.getInput('text', inputsUser)
    // htmlInputs.getInput('email', inputsUser)
    // htmlInputs.getInput('checkbox', inputsUser)
    // htmlInputs.getInput('radio', inputsUser)
  
})


});
