Feature: Testing the login functionality and add to product functionality
  @login
  Scenario Outline: Login the application
    # Given I navigate to "<url>" website
    Given I navigate to website
    When  I am on Home page I click the signup or login button
    Then I am on the Login page with email address "<emailadd>" and password "<password>"
    Then I navigate to Home page

    Examples:
      | url                             | emailadd                   | password |
      | https://automationexercise.com/ | test1782284883792@mail.com | test678  |


  @smoke @product @login
  Scenario: User searches for a product and views details
    Given I navigate to "<url>" website
    When  I am on Home page I click the signup or login button
    Then I am on the Login page with email address "<emailadd>" and password "<password>"
    When  I am on Home page I click on Products page
    When I verify user is navigated to products page
    Then I am on Product page I verify all products should be displayed
    When I am on product page I  search the product "<product>"
    Then I verify all searched "<product>" products are visible
    When I click on first product
    Then I verify that product detail page is displayed
    And I verify product name, price, description are visible

    Examples:
      | url                             | emailadd                   | password | product |
      | https://automationexercise.com/ | test1782284883792@mail.com | test678  | blue    |


  @productPurchase
  Scenario Outline: User completes purchase successfully
    Given I navigate to "<url>" website
    When  I am on Home page I click the signup or login button
    Then I am on the Login page with email address "<emailadd>" and password "<password>"
    When I add product to cart
    And I click on View Cart button
    Then I verify product is displayed in cart
    When I click on Proceed To Checkout
    Then I verify address details are displayed
    When I enter name on card name "Lavanya" and card number "4111111111111111"
    And I enter CVC "123",expiry month "12" and expiry year "2035"
    And I click on Pay and Confirm Order
    Then I verify order placed successfully

    Examples:
      | url                             | emailadd                   | password |
      | https://automationexercise.com/ | test1782284883792@mail.com | test678  |


  @subscription
  Scenario: User subscribes via footer
    Given I navigate to "<url>" website
    When I scroll to footer
    When I enter email "test@mail.com" in subscription field and click subscribe button

    Examples:
      | url                             | emailadd                   | password |
      | https://automationexercise.com/ | test1782284883792@mail.com | test678  |

@api
Scenario: Api testing
 Given I validate GET products API
 When 