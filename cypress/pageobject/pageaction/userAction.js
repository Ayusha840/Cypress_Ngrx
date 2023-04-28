import UserPageElement from "../pagelement/userPageElement";

export default class UserAction{

constructor(){
    globalThis.userElement = new UserPageElement();

}
     deleteUser(id){
        cy.log('///////////',id)
        userElement.userDeleteBtn().click(id)
     }
}