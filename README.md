# Group NoName
By Isabelle, Jakob, Susie, and Tehillah.

# Project summary and vision
Dev Diaries is a free web application with the goal of making project management for developers easier than ever. 

With Dev Diaries, we aim to provide a central hub for all aspects of project management and planning - for free! We will have features that benefit every type of stakeholder, from project managers, to developers, and even investors. Dev Diaries will start as a web application, but may expand to other forms if it is received well. The goal is to provide a simple yet useful interface that improves the developing experience of everybody using our website. 

Project managers will be able to access a plethora of features to manage and develop projects more efficiently than ever. One feature that would be useful to project managers is the ability to access live updates from a GitHub repository. These updates would also show some statistics relating to time spent on tasks or estimated time remaining on tasks. Another useful tool Dev Diaries would provide is the ability to communicate between members. Having an integrated chat feature will allow project managers to effectively communicate with co-workers, in the same place that everything else is managed. Having a chat allows a record of all communications, which is crucial in making sure that everybody is on the same page.

Developers who use our project will also benefit greatly from the features we have planned. One important feature that we hope will improve the efficiency of developers is the ability to save and organize research from the web. All developers get stuck at some point, and need to get information from the web to solve their problem. By allowing users of Dev Diaries to store links to the websites as bookmarks, we will allow an easy way to save and share research with co-workers. We will also add tools to allow developers to manage their time, and even make sure they are taking a healthy amount of breaks while working.

Dev Diaries also allows users to store documents on the website. By having everything all in one place, from project velocity statistics to research to chat logs, anybody new who joins the team will have an easier time catching up on the project, and project managers can have an even stronger relationship with their developers. 

Dev Diaries will be considered successful if users prefer it over similar apps. We will also consider it successful if we can see a 10% increase in efficiency on projects that are managed on our site. In the end, we want to give all users an easier way to manage projects and work together!



# Core features
### User authentication
A crucial feature for every website is have user accounts. We want to have seperate accounts for each user and allow them to store information safely. Users will sign up with a name, email, and password. We will only allow unique emails so that users cannot have the same account credentials.

### Live updates from repository
One of our core features is to have live updates from the project’s GitHub repository. We want to track each developer’s progress using the GitHub API and display the information on our web application. This allows the entire team to see how far along everyone else is so they know if the project is on track or if they have to make adjustments on the timeline.

### Save and organize research/bookmarks from the web
It’s common for a team working on a project to do different kinds of research online and share these resources with their teammates. We want our app to be able to aid in this process by providing developers the ability to save and organize their research and bookmarks from the web.

### Communication function between members
We also want team members to be able to communicate with each other in the app. In this way, they won’t need to find an external means of communication that works for everybody.

### Time management tools
Lastly, we thought it would be a good idea to have a feature that would help users with time management. This feature would use periodic notifications to check in with developers to see how their progress is going and remind them to take breaks.

### Capacity Requirement
Dev Diaries will be able to respond to 50 users with a total of 200 requests per minute concurrently.


# Technologies
### Next JS
Next.js is an open-source web development framework created by the private company Vercel providing React-based web applications with server-side rendering and static website generation.

### Express JS
Express JS Is a lightweight single threaded backend server library. Since Express JS is a back-end framework, it has access to libraries that can not be directly accessed on react JS and can more reliably communicate with databases and provide features such caching api responses and blocking from network attacks. It also interacts with outside API’s better whereas if you access them on react js , you risk a cross origin resource sharing error. Which could be a problem if it's not dealt with from the external api .

### MongoDB
MySQL is an open-source relational database management system.


# User stories
### Live updates from the repository
“As a developer, I want to connect to my projects GitHub and see changes automatically so I don’t have to check Dev Diaries as well as GitHub”

“As a new programmer, I want to see an easy to read summary of my project so that I don’t get overwhelmed by all the information on GitHub”

“As a project manager, I want to keep track of my team members progress with easy to access statistics so I that I can be a more effective project manager”

### Save and organize research/bookmarks from the web

“As a developer who needs a lot of help from outside coding resources, I want to be able to easily save websites and resources I find and organize them by user story, feature, or task so that I can revisit resources as needed”

“As a student, I want to keep track of websites I used in my project so I that can properly credit all resources”

“As a developer, I want to share resources I found helpful with my team members so that we can limit redundant research”

### Communication function between members

“As a team member who easily forgets what is discussed in person, I want chat functionality so I can have a better understanding of what my peers have said”

“As a team member, I want to be able to easily find past communication about our project so that I don’t have to waste time having to check multiple platforms”

### Time management tools

“As a developer who struggles to manage my time, I want an easy to read summary of my timeline and progress to help me stay on time”

“As a user who gets hyper-focused on a project, I want notifications at set intervals to encourage me to stretch, drink water, go for a walk, or otherwise care for myself so I can be a more effective developer”

“As a developer, I want reminders when approaching a milestone goal to help keep me on track”
