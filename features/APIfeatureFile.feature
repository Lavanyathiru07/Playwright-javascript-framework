Feature: API and Products Operations
  @apicurd
  Scenario: Full CRUD with JSON body

    # ✅ POST
    Given I create user with body
    """
     {
    "name":"Lavanya",
    "password":"Password@123"

    }
    """

    Then response status should be 201

    # ✅ GET
    When I login the application
    Then response status should be 200

    # ✅ PUT
    When get the user profile details
    Then response status should be 200

    # ✅ PATCH
    When I update user with PATCH using body
      """
      {
        "name": "lavanya",
        "phone":"937737348",
        "company":"ABC pvt limited"
      }
      """
    Then response status should be 200
    When get the user profile details after update
    Then response status should be 200

    # ✅ DELETE
    When logout the user
    Then response status should be 204
  @api @products
  Scenario: Verify user can get all products
    When user sends GET request to get all products
    Then API response status should be 200
    And products list should be returned

  @api @searchProduct
  Scenario: Verify user can search for a product
    When user searches product "top" through API
    Then API response status should be 200
    And search product response should contain products

  @api @loginSearch
  Scenario: Verify login and search for a product through API
    When user verifies API login with email "test1782284883792@mail.com" and password "test678"
    Then API response status should be 200
    And API login should be successful
    When user searches product "Blue Top" through API
    Then API response status should be 200
    And search product response should contain products

