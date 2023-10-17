# Datavant

## Author
[Erick Wright]("https://github.com/wright15")

# Development-9-prototype Automation Suite

This project is a automation test suite designed using BDD as a test philosophy. This allows encapsulation of functions in human readable language, allowing developers to program tests to business standards by using language derived directly from acceptance criteria or standards outlined in definition of done documentation.

This project uses cucumber and playwright for its framework.

## Installation
If you want to build a project from the ground up use the package manager [NPM](https://www.npmjs.com/) to install dependencies.

```bash
npm install --save-dev @cucumber/cucumber
```

```bash
npm init playwright@latest --yes -- --quiet --browser=chromium --browser=firefox --browser=webkit --gha
```

Make sure to prepare the file structure which the project is dependent on to run.

```bash
mkdir features
mkdir features/step_definitions
```
## Usage

```bash
.\node_modules\.bin\cucumber-js --tags "@Regression"
```
You can also specify tags that run specific features such as the guests feature.

```bash
.\node_modules\.bin\cucumber-js --tags "@Dates"
```

## Test cases oddities and suggestions for better user experience, ease of implementation or testing?

In the process of developing tests for text validation within page elements, I encountered a few peculiarities from both functional and user experience perspectives. These challenges required some creative solutions to ensure the tests worked effectively.

1. Dynamic Page Response: The page's dynamic response to typing posed a significant challenge. Automation tools usually focus on finding text within specific elements. However, in this case, this conventional approach didn't yield the desired results. To tackle this, I opted for a less common approach of retrieving the text content of the entire document body. While this was effective in capturing the dynamic responses, it's not the standard method for text validation in UI testing. To improve this, we can explore options for targeting specific elements better, which could simplify testing.

2. Date Format Discrepancy: Another noteworthy issue I encountered was the inconsistency in date formats. On the page, dates were displayed as "11, October 2023," but in the document body text content, the date was represented as "2023-10-11." This discrepancy complicated the validation of date parameters within tests. A more consistent approach to date formatting could streamline the testing process. Ensuring that the date format remains uniform across both the displayed page and the document body would enhance the user experience and ease of testing. This could be achieved by using a single source of truth for date formatting and then rendering it accordingly on the page.

3. Dynamic Values for Departure and Return Dates: To enhance ease of implementation, I incorporated the use of dynamic values for return and departure dates. This allowed for flexibility when changing the number of days for departure and arrival. This logic extension to include dynamic months and days in our test cases was an effective way to accommodate the dynamic nature of date inputs. However, further optimization could involve implementing standardized date pickers or calendars that are more intuitive for users.

In summary, while I was able to work around these challenges creatively, there is room for improvement to ensure a smoother user experience, easier implementation, and more efficient testing. Addressing the inconsistencies in date formatting and exploring better strategies for element targeting can enhance the overall quality of the tests and the user experience.


The features are dates.feature, guests.feature, and location.feature. These files hold the test steps in human readable language using BDD via Gherkin. 

The stepdefs.js file is for the logic that runs the scenarios. In the stepdefs.js file the code is organized by what feature the code corresponds to. This logic was written using JavaScript. 


## License

[MIT](https://choosealicense.com/licenses/mit/)
