import {createUserPasswordData, deleteUserByID} from "../backend/data-access/user_model"
import {createProject, removeProject, getProject} from "../backend/data-access/project_model"
import {createRepo} from "../backend/data-access/repo_model"
import {createSprint} from "../backend/data-access/sprint_model"
import {getResearchNotes, createResearchNote, updateResearchNote, deleteResearchNote} from "../backend/data-access/research_model"

let userID: number | undefined
let projID: string | undefined
let sprintID: string | undefined
let sprints = null