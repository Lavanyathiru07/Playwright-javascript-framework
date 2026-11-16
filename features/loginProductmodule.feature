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

  @searchCart
  Scenario: Login, search for a product, and verify it in the cart
    Given I navigate to "https://automationexercise.com/" website
    When I am on Home page I click the signup or login button
    Then I am on the Login page with email address "test1782284883792@mail.com" and password "test678"
    When I am on Home page I click on Products page
    Then I am on Product page I verify all products should be displayed
    When I am on product page I  search the product "Blue Top"
    Then I verify all searched "Blue Top" products are visible
    When I add product to cart
    And I click on View Cart button
    Then I verify product is displayed in cart

  @smoke @product @login @automation
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

  @UIAPI
  Scenario Outline: Register user through API and shop through UI

    Given user creates account through API
    When user logs into application
    When  I am on Home page I click on Products page
    When I verify user is navigated to products page
    Then I am on Product page I verify all products should be displayed
    When I am on product page I  search the product "<product>"
    Then I verify all searched "<product>" products are visible
    When I add product to cart
    And I click on View Cart button
    Then I verify product is displayed in cart
    When user deletes account through API
    Then user should not be able to login

    Examples:
      | product |
      | blue    |

  @priceUi
  Scenario: Validate product information between API and UI

    Given user creates account through API
    When user logs into application
    When user retrieves all products through API
    And user selects a product from API response
    And user searches same product in UI
    Then product name should match API response
    And product price should match API response
    When I add product to cart
    And I click on View Cart button
    Then cart price should match API price
    When I click on Proceed To Checkout
    When places order successfully
    When I enter name on card name "Lavanya" and card number "4111111111111111"
    And I enter CVC "123",expiry month "12" and expiry year "2035"
    When user deletes account through API
    Then user should not be able to login


  @refresh
  Scenario: Create account through API and verify through UI
    Given user creates account through API
    When user logs into application
    Then user name should be displayed on homepage
    When user updates account details through API
    And user refreshes the application
    Then updated account details should be reflected in UI
    When user deletes account through API
    Then user should not be able to login

  @apichaining
  Scenario: Create, verify and delete user
    Given user creates account through API
    When user verifies login through API
    Then login verification should be successful
    When user deletes account through API
    When user verifies login using deleted credentials
    Then login verification should fail

    
