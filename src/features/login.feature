Feature: Login Functionality
  As a user
  I want to login to the Sauce Labs Sample app
  So that I can access the products page

  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I enter "standard_user" as username
    And I enter "secret_sauce" as password
    And I tap on the login button
    Then I should see the products page 