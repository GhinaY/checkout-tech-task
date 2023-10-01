`Author: Ghina Yashar`

# Overview

Hi all! This is my submission for the Checkout.com front-end challenge.

For more insight into my thought process as I build this app, refer to [MY_THOUGHTS.md](MY_THOUGHTS.md), where I will be explaining the changes in every commit.

<em>This application was built with React + TypeScript + Vite.</em>

# About the application
This is a feedback collection application that collects inputs through a form, then displays the results afterwards.

This application is composed of two pages:
1. The feedback form page (path: `/`)
1. The feedback results page (path: `/results`)

All other paths will redirect the user back to the form page.

The intended user experience flow is as follows:
1. User visits the feedback form page
1. User enters their feedback
1. The form validates the input as needed
1. User clicks the submit button
1. Upon submission, the user is redirected to the results page. 
1. User is able to view the distribution of submitted ratings, as well as the 3 most recent comments submitted.

## Form validation
Validation for each field runs when the field is blurred, and again before the form is submitted.
The applied form validation rules are as follows:
1. All fields are required
1. Name field must not be longer than 100 characters (note that there are no other validation rules for the name field as there are no global standards for peoples' names)
1. Email field must not be longer than 50 characters
1. Email field value must match the regex pattern `/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/`
1. Comment field must not exceed 500 characters
1. Ratings field value must match the regex pattern `/^[1-5]{1}$/`

## Internal workings
The application works as a single page application using react-router for navigation and a React Context to store the submitted feedback. As such, the data will be lost on refresh. 
The stored data is:
1. An array of objects representing all the submissions, and 
1. An object representing the ratings distribution.

On each new form submission, the new data will be amended to the array and the rating counts will be updated accordingly.

## Areas for improvement
- Using `sessionStorage` or `localStorage` to persist the form submissions for easier viewing if the user wanted to visit the results page directly.
- Or better yet, a database in the backend with an API that the frontend can call to get/amend the data.
- Keeping the user more informed about the state of the application, such as disabling the Submit button on the form page until all field validation passes.
- More/better testing: I didn't aim for full coverage as the spec sheet said it isn't needed.
- The `src/containers/FeedbackForm/index.tsx` file currently covers a lot of logic, which makes it harder to read and harder for testing. Would benefit from being refactored into smaller parts that can be tested more easily independently with only integration tests being needed at the higher level.
- The Material UI styling arguments have made some files harder to read. Ideally those would be extracted to separate `styles` files.
- There is a split second after form submission where the chart has yet to render and the "Latest comments" headline is higher up in the page, and then it's pushed down when the chart does appear. A loading state, a skeleton or something of the sort should be able fix that.
- Styling. I'm no Picasso 🎨
# Scripts

## Development

To run locally: 
```
npm run dev
```

To lint code:
```
npm run lint
```

To run tests:
```
npm run test
```

To check test coverage:
```
npm run coverage
```

## Production
To create a production build:
```
npm run build
```

To preview the production build:
```
npm run preview
```
