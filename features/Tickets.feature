Feature: Online tickets

  @Dates @Regression
  Scenario: Departing from Lagos
    Given The user navigates to "https://www.cp.pt/passageiros/en/buy-tickets"
    When Departing from Lagos
    Then Arriving in Porto - Campanha
    Then Departing 3 days from Today
    Then Return 5 days from Today
    Then Submit request for tickets
    Then Click Cancel
    Then Validate all parameters for the train search
