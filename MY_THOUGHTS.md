I'll use this document to write down my thoughts behind the changes in each commit:

### Commit 1: App setup
This commit is just about setting up the repository the way I want it and getting ready to start development. For this, I used Vite with the React + TS template to get things going quickly, because there's no need to reinvent the wheel. I've also added the testing libraries and config needed since they're part of the essentials.

### Commit 2: Routing setup
I'm tackling the problem from the highest level first then moving down. First level we have is that there are two pages, so I've added good ol' react-router to the app to navigate between them. Since this is a simple feedback collector, I've thought about how I'd want it to work if I was shopping at IKEA and came across those sad-to-smiley faces feedback collection tablets they have. If I somehow navigated to a different screen, would I want it to show me an error page? No, I'd just want it to take me back to the smileys so I can submit my answers. As such, I decided to only go for the form and results pages, and redirect any other route back to the form page. This maximises usability and funnels users into the pathway we want them to take.
