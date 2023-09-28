import '@4tw/cypress-drag-drop'

describe('Constructor spec', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080)
    cy.visit('/')
    cy.get('[class^=burger-ingredients_item__]').eq(1).as('fluebun')
    cy.get('[class^=burger-ingredients_item__]').eq(2).as('spicy')
    cy.get('[class^=burger-ingredients_item__]').eq(9).as('meteorit')
    cy.get('[class^=burger-constructor_constructor-section__]').as('dropTarget')
    cy.get(".button_type_primary").as('orderButton')
  })

  it('should open and close ingredient details popup', ()=> {
    cy.get('[class^=burger-ingredients_item__]').first().click()
    cy.get('body').should('have.css', 'overflow', 'hidden');
    cy.get('[class^=ingredient-details_wrapper__] h2').should("contain", "Краторная булка N-200i")
    cy.wait(2000).get('[class^=modal_close__]').click()
    cy.get('body').should('not.have.css', 'overflow', 'hidden');
  })

  it('should add active class to tab by scroll', ()=> {
    cy.get('.tab').eq(0).as('buns-tab')
    cy.get('.tab').eq(1).as('sauces-tab')
    cy.get('.tab').eq(2).as('main-tab')
    cy.get('[id=sauce]').scrollIntoView({ easing: 'linear' })
    cy.get('@buns-tab').should('not.have.class', 'tab_type_current')
    cy.get('@sauces-tab').should('have.class', 'tab_type_current')
    cy.get('@main-tab').should('not.have.class', 'tab_type_current')
    cy.wait(1000).get('[id=main]').scrollIntoView({ easing: 'linear' })
    cy.get('@buns-tab').should('not.have.class', 'tab_type_current')
    cy.get('@sauces-tab').should('not.have.class', 'tab_type_current')
    cy.get('@main-tab').should('have.class', 'tab_type_current')
  })

  it("should button 'Оформить заказ' disabled until to be add bun plus one item from main or sauces", ()=> {
    cy.get('@orderButton').should('contain', 'Оформить заказ').and('be.disabled')
    cy.get('@spicy').drag('@dropTarget')
    cy.get('@orderButton').should('contain', 'Добавьте булку').and('be.disabled')
    cy.get('@fluebun').drag('@dropTarget')
    cy.get('@orderButton').should('contain', 'Оформить заказ').and('not.be.disabled')
  })
  it("should capable delete ingredients from constructor", ()=> {
    cy.get('@spicy').drag('@dropTarget')
    cy.get('@meteorit').drag('@dropTarget')
    cy.get('.constructor-element__action').eq(2).click()
    cy.get('.constructor-element__action').eq(1).click()
    cy.contains('Перетащите сюда булки, соусы и начинки')
  })
  
  it("should capable to make order", ()=> {
    cy.get('@spicy').drag('@dropTarget')
    cy.get('@meteorit').drag('@dropTarget')
    cy.get('@fluebun').drag('@dropTarget')
    cy.get('@orderButton').click()
    cy.get('input[name="email"]').type('mytest@test.ru')
    cy.get('input[name="password"]').type('testtest')
    cy.get('button[type="submit').click()
    cy.get('@orderButton').click()
    cy.wait(17000).get('[class^=order-details_wrapper__] h2').should((number)=> {
      const orderNumber = number.text()
      expect(orderNumber).to.match(/^[0-9]*$/)
    })
    cy.get('[class^=modal_close__]').click()
  })
  
})
