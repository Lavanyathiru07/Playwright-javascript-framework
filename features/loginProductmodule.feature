Feature: Testing the login functionality and add to product functionality
  @login
  Scenario Outline: Login the application

    Given I navigate to "<url>" website
    When  I am on Home page I click the signup or login button
    Then I am on the Login page with email address "<emailadd>" and password "<password>"
    Then I navigate to Home page

    Examples:
      | url                             | emailadd                   | password |
      | https://automationexercise.com/ | test1782284883792@mail.com | test678  |


  @product @smoke
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




