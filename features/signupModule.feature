

Feature: testing the signup functionality in automation execise 


@dow
Scenario Outline: Signup functionality
Given I navigate to "<url>" website
When  I am on Home page I click the signup or login button
Then I am on login page I signup with "<username>" and email for signup
Then I am on signup page I select the Title "<title>"
And I am on signup page I enter the password "<password>"
And I am on signup page I select the date "<day>" month "<month>" and year "<year>"
And I am on signup page I select the checkbox
And I am on signup page I enter the firstname "<firstname>" and secondname "<secondname>"
And I am on signup page I enter the company name "<companyname>" and address "<address>"
And I am on signup page I select the country "<country>"
And I am on signup page I enter the state "<state>" city "<city>"
And I am on signup page I enter the zipcode "<zipcode>" and mobileNumber "<mobilenumber>"
And I am on signup page I click the create account button
# And I am on Home Page I delete the account

Examples:

|       url                     |username|emailaddress    |title|password|day|month|year|firstname|secondname|companyname|address|country|state|city|zipcode|mobilenumber|
|https://automationexercise.com/|Test today|test89@gmail.com|Mr   |test678|7  |May   |2019|testing|QAAA|ABC pvt ltm|chennai        |Canada|tamil nadu|chennai|698544|9484747432|
