I'll use this document to write down my thoughts behind the changes in each commit:

### Commit 1: App setup
This commit is just about setting up the repository the way I want it and getting ready to start development. For this, I used Vite with the React + TS template to get things going quickly, because there's no need to reinvent the wheel. I've also added the testing libraries and config needed since they're part of the essentials.

### Commit 2: Routing setup
I'm tackling the problem from the highest level first then moving down. First level we have is that there are two pages, so I've added good ol' react-router to the app to navigate between them. Since this is a simple feedback collector, I've thought about how I'd want it to work if I was shopping at IKEA and came across those sad-to-smiley faces feedback collection tablets they have. If I somehow navigated to a different screen, would I want it to show me an error page? No, I'd just want it to take me back to the smileys so I can submit my answers. As such, I decided to only go for the form and results pages, and redirect any other route back to the form page. This maximises usability and funnels users into the pathway we want them to take.

### Commit 3: Setting up the FeedbackSubmissionsContext
To store all the feedback submission data and be able to modify it in one screen then use it in another, I've wrapped the application in a React Context. Seeing as this is a front-end only app, the context will also basically act as our database (in a real production app, you'd likely have API calls to make instead of just updating the state in a context or whatever else). 
I've also added a separate state to keep count of the ratings distribution. This is to improve efficiency, rather than having to count them again each time, and to also more closely simulate a real application where such data would likely be queried from the backend instead of crunching all the numbers in the front-end.

### Commit 4: Setting up the feedback form page
For this part, I chose to use 2 third party libraries because they significantly simplify the work and logic. The two libraries are Material UI and react-hook-form. I'm using MUI for all the components so I don't have to spend time styling them myself and adding accessibility features and such, and react-hook-form to handle the validation with minimal setup requirements.
In terms of the page/form layout, I used nested Stacks (basically flex-boxes) with additional rules to make them responsive (e.g. comment field moves below the other fields on smaller screens). 
Because a lot of the logic around updating the data was already done in the context, the only logic that needs to live in the form is the validation, so there isn't really much more to it than that.

### Commit 5: Setting up the results page
This was probably one of the easiest parts: all the heavy lifting and the infrastructure was already done, and all that was left to do was use the data we already have and make it pretty. 
For the charting, I went with the Recharts library as it's very lightweight and simple, perfect for this applications minimal requirements.
I decided to create the comments list and the chart parts as 'containers' instead of having the logic in the ResultsPage component for the sake of separation of concerns. This makes them more easily testable and makes the code more reusable, if we ever wanted to expand on this app. 
