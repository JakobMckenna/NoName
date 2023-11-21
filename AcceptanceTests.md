# Acceptance tests for feature 1: User Authentification

Note: These tests are meant to be completed in order
This is a sample project to be used for testing: https://github.com/JakobMckenna/NoName

## Test 1: Creating a new account

> Open the website (on local host)     
> You should see a login page, asking for an email and password     
> To create a new account:      

> Click the sign up button in the bottom right      
> Enter a name, email, and password. Write down these credentials for future tests   
> Note: Make sure the email has not been used to make an account in the past      
> Click "Create account"     
> You should be able to access the rest of the website        

## Test 2: Logging into an existing account

> Open the website (on local host)     
> You should see a login page, asking for an email and password     
> To login:

> Enter the same email and password used for the last test
> Click "Login"
> You should be able to access the rest of the website 

## Test 3: Logging out of an account

> Open the website (on local host)     
> Make sure that you are logged in        
> To log out:

> Click the menu in the top left       
> Select "Logout"      
> You should be back to the login page       

## Test 4: Trying to reuse an email

> Open the website (on local host)     
> You should see a login page, asking for an email and password     
> Click the sign up button in the bottom right      
> Enter a name, email, and password, and make sure the email is the one you used for the previous tests     
> Note: This should give you an error for reusing the email    


# Acceptance tests for feature 2: GitHub updates

## Test 1: Creating a new project 

> Follow the steps above to create an account          
> On the home screen, click "add project" from the projects tab      
> Enter a name for your project, and click "create project"      

> The project should now appear under the projects tab     
> Click on the project, and you should be taken to a new page with GitHub, Milestones, and Communication tabs

## Test 2: Linking a project
> Before starting this test, make sure you have a sample GitHub project setup to use (Can even be this projects repository)

> From the projects page, under the GitHub tab, click "Setup GitHub"       
> For owner, enter the owner of the repository       
> For repo name, enter the repository name      
> For example, from this link: https://github.com/JakobMckenna/NoName the owner is JakobMcKenna and the repo name is NoName

## Test 3: Check GitHub updates 
> Under the GitHub tab, click "see commits"     
> You should now be able to see the project commits     
> Click "See commit" on the right hand side     
> This should take you to the commit on GitHub     

> Now click the back button twice, so you are back on the project home page     
> Under the GitHub tab, click "see issues"     
> You should be able to see all of the sorted issues from your project      

## Test 4: Creating a new milestone
> Under the Milestones/Sprints tab, click "Setup/see"    
> Then click the "Manual create" button     
> Enter any name, and any start/end date     
> Click "add sprint"       
> Your sprint should now appear on the right hand side       
> You can click the name of the sprint to see if the start/end dates are correct       


# Acceptance tests for feature 3: Research/Bookmarks

## Test 1: Creating a new bookmark

> Make sure you have created a project, and a sprint using the steps above      
> On the project page, under the research tab, click "See bookmarks"       
> On the top left, click the button that says "Add Note"

> Pick any sprint, add a title, details, and a url link      
> Your bookmark should appear below

## Test 2: Testing a bookmark
> Once you have created a bookmark, click the link        
> You should be taken to the link of the bookmark      
> Switch back to the Dev Diaries tab      
> Click "Delete"     
> Your bookmark should be gone


# Acceptance tests for feature 4: Info/Communication

## Test 1: Testing chat
> From the projects page, under the Info/Communication, click "See chat"       
> Type a message in the message box (ex: "HI!")      
> Click the "Send button      
> Your message should appear in the chat

## Test 2: Searching chat
> To begin this test, type atleast 10 different messages in the chat, these can be anything      
> Click "oldest messages", this should take you back to the top of the chat     
> Click "newest messages", this should take you back to the bottom of the chat     
> In the search message tab, enter any message you have typed and it will take you too it

