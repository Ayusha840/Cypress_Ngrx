import BtnPageElement from '../pagelement/btnPageElement'
import FormPageElement from '../pagelement/formPageElement'

export default class UserAction {
  constructor() {
    globalThis.userElement = new BtnPageElement()
    globalThis.formElement = new FormPageElement()
    globalThis.btnElement = new BtnPageElement()
  }
  clickActionBtn(type) {
    if (type === 'add') {
      userElement.userAddBtn().click()
    }
    if (type === 'update') {
      userElement.userUpdateBtn().click()
    }
  }

  createUser(data) {
  
    formElement.input1().clear().type(data.first_name)
    formElement.input2().clear().type(data.last_name)
    formElement.input3().clear().type(data.email)
    formElement.submitBtn().click()
  }
  updateUser(data) {
    formElement.input1().clear().type(data.first_name)
    formElement.input2().clear().type(data.last_name)
    formElement.input3().clear().type(data.email)
  }

  deleteUser() {
    return btnElement.userDeleteBtn()
  }
}
