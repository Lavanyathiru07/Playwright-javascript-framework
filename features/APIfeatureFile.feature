Feature: API Full CRUD Operations
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
