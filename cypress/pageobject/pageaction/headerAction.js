import HeaderPageElement from "../pagelement/hederPageElement"

export default class HeaderAction {
headerElement = new HeaderPageElement();
  
  
  navigationTo(link) {
    cy.visit(`http://localhost:4200/${link}`)
  }

  userNavigation(){
    headerElement.userRedirect()
  }
}
