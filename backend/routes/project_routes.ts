/**
 * @fileoverview http project api routes 
 */

import express from 'express';
import ProjectController from '../controller/project_controller';
import NotesController from '../controller/notes_controller';

const projectRoutes = express.Router();

/**
 * Http get /project
 * gets all projects in the database
 */
projectRoutes.get("/", ProjectController.getAllProjects);

/**
 * Http post /project
 * add a project to the database
 */
projectRoutes.post("/",ProjectController.createProject);

/**
 * Http get /project/:id
 * gets project by projectID as a url query string
 */
projectRoutes.get("/:id",ProjectController.getProject);

/**
 * Http delete /project/:id
 * add a user to a project
 */
projectRoutes.delete("/:id",ProjectController.removeProject);


/**
 * Http post /project/member
 * add a user to a project
 */
projectRoutes.post("/member",ProjectController.addProjectMember);

/**
 * Http get /project/member/:id
 * gets all members of a project by projectID as a url query string
 */
projectRoutes.get("/member/:id",ProjectController.getMembers);

/**
 * Http get /project/member/:project/:user
 * gets all members of a project by projectID and userID as url query strings
 */
projectRoutes.delete("/member/:project/:user",ProjectController.removeMember);

/**
 * Http get /project/repo
 * gets github repository infomation such github owner name and repository name
 */
projectRoutes.post("/repo",ProjectController.addRepo);

/**
 * Http post /project/repo
 * posts milestone/sprint infomation to the database
 */
projectRoutes.post("/sprint",ProjectController.createSprint);

/**
 * Http delete /sprint/:id
 * deletes sprint by sprintID as url query string
 */
projectRoutes.delete("/sprint/:id",ProjectController.removeSprint);

/**
 * Http get /sprint/:id
 * gets all sprints belonging to a project by projectID as query string
 */
projectRoutes.get("/sprint/:id",ProjectController.getAllSprints);

/**
 * Http get /notes/:id
 * gets all notes belonging to a project by projectID as query string
 */
projectRoutes.get("/notes/:id",NotesController.getAll);

/**
 * Http post /project/notes
 * posts note to database
 */
projectRoutes.post("/notes",NotesController.create);

/**
 * Http post /project/notes/:id
 * deletes note by noteID as query string
 */
projectRoutes.delete("/notes/:id",NotesController.delete);

/**
 * Http patch /project/notes
 * updates note infomation 
 */
projectRoutes.patch("/notes",NotesController.update);

/**
 * Http get /chat/:id
 * gets all chat messages belonging to a project by project ID as a url query string
 */
projectRoutes.get("/chat/:id",ProjectController.getPrevMessages);

export default projectRoutes;