# Dev Diaries User Manual

## Outline

1. Introduction to Dev Diaries
    - About Dev Diaries
    - Goals and Objectives

2. Getting Started
    - Sign-In/Sign-Up Process
    - Dashboard Overview
    - Navigation & Interface Elements

3. Managing Projects
    - Creating a New Project
    - Project Overview & Tiles
    - Accessing a Project

4. Project Tiles & Functionalities
    - GitHub Integration
        - Setting up GitHub for Live Updates
        - Viewing Recent Commits & Issues
    - Milestones & Sprints
        - Creating Milestones/Sprints
        - Syncing with GitHub
    - Research & Bookmarks
        - Organizing Research Notes
        - Sharing Resources with Teammates
    - Communication
        - Accessing & Using Chat Functionality
        - Adding/Removing Team Members

5. GitHub Integration
    - Exploring GitHub Updates & Statistics
    - Viewing Commit Details

6. Navigation & User Flow
    - Moving Between Project Sections
    - Return to Landing Page

7. Preferences & Settings
    - Dark/Light Mode Toggle
    - Accessing User Settings
    - Logging Out

8. User Stories and Interactions
    - User Stories & Scenarios
    - Corresponding User Interactions

---

## 1. Introduction to Dev Diaries

### About Dev Diaries
Dev Diaries is a free web application designed to streamline project management for developers. Our aim is to provide a comprehensive platform for project planning and collaboration across various stakeholders, from project managers to developers and investors. With a user-friendly interface, Dev Diaries enhances the development experience for all users.

### Goals and Objectives
Our primary goal is to offer a central hub for project management, delivering a range of features that cater to the diverse needs of different team members. From real-time GitHub updates to efficient communication tools and time management features, Dev Diaries strives to simplify project handling and collaboration.

## 2. Getting Started

### Sign-In/Sign-Up Process

1. **Signing In:**
    - Enter your registered credentials: email (1) and password (2) in the provided fields on the sign-in page ([Figure 1](#f1))
    - Click the "Login" button (3) to access your Dev Diaries dashboard.  
    <a name="f1"></a>
<figure>
    <img src="./frontend/src/assets/man_signIn.jpeg" style="max-width:300px;" />
  <figcaption>Figure 1: Sign In</figcaption>
</figure>   

<br>

2. **Signing Up:**
    - If you don't have an account, click on “Sign Up" (4) ([Figure 1](#f1))
    - Fill in the required details ([Figure 2](#f2))
        1. Name: Must be a minimum of 3 characters.
        2. Email: Must be a valid email format and at least 6 characters.
        3. Password: Must be a minimum of 6 characters.
    - Click the "Create Account” (4) button to create your Dev Diaries account.
    - To return to the Sign In page, click Sign Up (5)

<a name="f2"></a>
<figure>
  <img src="./frontend/src/assets/man_signup.jpg" style="max-width:300px;" />
  <figcaption>Figure 2: Sign Up</figcaption>
</figure>


### Dashboard Overview

<a name="f3"></a>
<figure>
  <img src="./frontend/src/assets/man_dash.jpeg" style="max-width:300px;" />
  <figcaption>Figure 3: Dashboard Overview</figcaption>
</figure>
The user dashboard displays an "Add Project" button (1) for creating new projects, a search bar for quick project access (2), and each project listed (3) ([Figure 3](#f3))

### Navigation & Interface Elements

<a name="f4"></a>
<figure>
  <img src="./frontend/src/assets/man_header.jpg" style="max-height:80px"/>
  <figcaption>Figure 4: Header & Interface Elements</figcaption>
</figure>
- **Header:** 
The header, found on each page, displays the "Dev Diary" title; clicking on it will return you to your dashboard. It also features a toggle for dark/light modes (2) ([Figure 5](#f5)). It also includes a side navigation bar (1). Clicking on the navigation bar icon (1) opens the side navigation with options for Home (1), Settings (2), and Logout (3) ([Figure 6](#f6)).

<a name="f5"></a>
<figure>
  <img src="./frontend/src/assets/man_light_mode.jpg" style="max-height:400px;" />
  <figcaption>Figure 5: Light Mode</figcaption>
</figure>

<a name="f5"></a>
<figure>
  <img src="./frontend/src/assets/man_nav.jpg" style="max-height:200px;" />
  <figcaption>Figure 6: Navigation</figcaption>
</figure>

## 3. Managing Projects

### Creating a New Project

Users can create new projects by clicking the "Add Project" button on the dashboard ([Figure 3](#f3)). The Create Project popup appears and requires a unique project name (1). Clicking the “Create Project” button (2) to complete this process. ([Figure 7](#f7))

<a name="f7"></a>
<figure>
  <img src="./frontend/src/assets/man_newproj.jpg" style="max-height:300px;" />
  <figcaption>Figure 7: Create a New Project</figcaption>
</figure>

### Project Overview & Tiles

When a project is selected, users are directed to a project-specific page displaying tiles representing different aspects of project management. These tiles offer specific functionalities related to GitHub integration, milestones/sprints, research/bookmarks, and communication.

<a name="f8"></a>
<figure>
  <img src="./frontend/src/assets/man_projOverview.jpeg" style="max-width:400px;" />
  <figcaption>Figure 8: Project Overview</figcaption>
</figure>

## 4. Project Tiles & Functionalities

### a. GitHub Integration

#### Setting up GitHub for Live Updates

1. Click "Setup GitHub" (3) ([Figure 8](#f8))
2. Enter the required details: Repository owner (1) and repository name (2) ([Figure 9](#f9))
3. Click "Add Repo" (3) to link your project to the GitHub repository for automatic updates.

<a name="f9"></a>
<figure>
  <img src="./frontend/src/assets/man_setup_github.jpg" style="max-height:300px;" />
  <figcaption>Figure 9: Setup Repository</figcaption>
</figure>

#### Viewing Recent Commits & Issues

1. You will now be able to access issues (1) and commits (2) ([Figure 10](#f10))
2. Click update (3) to update the owner or repo name.

<a name="f10"></a>
<figure>
  <img src="./frontend/src/assets/man_projFull.jpg" style="max-width:400px;" />
  <figcaption>Figure 10: Connected Project</figcaption>
</figure>


### b. Milestones & Sprints

#### Creating Milestones/Sprints

1. Select "Setup/See" under Milestones/Sprints (4) ([Figure 8](#f8))
2. Choose "Manual Create" to create a new sprint or milestone.
3. Enter details such as Name, Start Date, and Deadline.
4. Click "Add Sprint" to create the milestone/sprint.

<a name="f11"></a>
<figure>
  <img src="./frontend/src/assets/man_create_milestone.jpg" />
  <figcaption>Figure 11: Connected Project</figcaption>
</figure>

### c. Research & Bookmarks

#### Organizing Research Notes

1. Access the "Research Notes" tile.
2. Click "Add Note" to create a new note.
3. Input Title, Details, URL, and assign it to a specific sprint or milestone.
4. Click "Create Note" to save research for reference.

#### Sharing Resources with Teammates

1. Create a note as explained above.
2. The note will be accessible to team members within the specified sprint or milestone.

### d. Communication

#### Accessing & Using Chat Functionality

1. Click on "See Chat" to access the chat feature.
2. Use the search option or scroll to find past messages.
3. Type in the message field and press "Send" to communicate with team members.

#### Adding/Removing Team Members

1. Click "Add/See User" to manage team members.
2. To add a member, enter their username or email and click "Add Member."
3. To remove a member, select the user and click "Remove."

## 5. GitHub Integration

### Exploring GitHub Updates & Statistics

#### Viewing Commit Details

1. Select "See Commits" to view the latest commits.
2. Sort commits by choosing options such as "Newest" or "Oldest."
3. Filter commits by user or search term.

## 6. Navigation & User Flow

### Moving Between Project Sections

To navigate between project sections, simply click on the desired tile representing the feature or functionality you wish to access.

## 7. Preferences & Settings

### Dark/Light Mode Toggle

Toggle between Dark and Light modes by clicking on the moon/sun icon in the header.

### Accessing User Settings

Access and modify user settings by clicking on the "Settings" option in the side nav bar.

### Logging Out

To log out of your Dev Diaries account, click on "Logout" in the side nav bar.

## 8. User Stories and Interactions

### User Stories & Scenarios

Each user story corresponds to specific actions within Dev Diaries. Refer to the following steps to accomplish tasks aligned with user stories:
- Developer Requiring External Help:
    - Use the "Research Notes" feature to save helpful websites or resources.
    - Organize resources by creating notes and categorizing them under relevant sprints or milestones.
    - Share resources with team members by assigning notes to specific project phases.
- Project Manager Tracking Team Progress:
    - Access live updates from the GitHub repository via the corresponding tile.
    - Monitor recent commits and issues to track team activity.
    - Use the chat functionality to communicate with team members and stay updated on project discussions.

### Corresponding User Interactions

Interact with Dev Diaries using the guided steps provided to accomplish specific tasks associated with user stories and scenarios.
