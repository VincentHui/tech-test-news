This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

![screenshot](https://git-repo-img.s3.eu-west-2.amazonaws.com/tech-test-news.png)

## Tech Test News

This is a simple news application that uses the news api to gather headlines and display them all together. Install packages by running `yarn install` and then start the project by running `yarn start`.
Uses `styled-components` and `msw` for mocking rest calls.

## Improvements

Due to the time constraint of two hours I would have liked the following changes if I had more time:

1. Add not just happy paths to testing and introduce some common errors testing and tests which involve the whole application not just isolated components.

2. Fix the date issues after realising they all seem to parse to an incorrect date after checking results from the newsapi fired off from Postman.

3. Actually make sure that the application is accessible and can confirm that it runs well across different screen dimensions.

4. Properly leverage styled components with theming, more custom props and inheriting styles since towards the end I was in a rush just to make sure the application looked okay.
