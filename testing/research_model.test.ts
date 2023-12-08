import {createUserPasswordData, deleteUserByID} from "../backend/data-access/user_model"
import {createProject, removeProject, getProject} from "../backend/data-access/project_model"
import {createRepo} from "../backend/data-access/repo_model"
import {createSprint, removeSprint} from "../backend/data-access/sprint_model"
import {getResearchNotes, createResearchNote, updateResearchNote, deleteResearchNote} from "../backend/data-access/research_model"

let userID: number | undefined
let projID: string | undefined
let sprintID: string | undefined
let noteID: string | undefined
let sprints = null

// createResearchNote(title: string, details: string, userID: number, sprint: string, urlList: Url[])

//setup a sample user, project, repo, and set up a sprint
//this is needed so that we can make research notes
test('Creating a dummy user to create a project', async () => {
    const newUser = await createUserPasswordData("ProjectUser31", "PU131@gmail.com", "Pass31");
    userID = newUser?.id
  });
  
  //Create a new project
  test('New project created', async () => {
      let data1 = null
      if(userID !== undefined){
          data1 = await createProject("Project test 231", userID);
      }
      projID = data1?.id
      expect(data1?.name).toBe("Project test 231");
    });

    test('Create a new repo', async () => {
        let data5 = null
        if(projID !== undefined){
            data5 = await createRepo(projID, "JakobMcKenna","COMP3020-milestone-3-main");
        }
        expect(data5).toBeTruthy();
      });

      test('Create a new sprint', async () => {
        let data6 = null
        if(projID !== undefined){
            data6 = await createSprint(projID, "Sprint 1", "2023-10-20T06:20:11.963Z", "2023-10-20T06:20:11.963Z");
        }
        sprints = data6
        sprintID = data6?.id
        expect(data6).toBeTruthy();
      });

      // createResearchNote(title: string, details: string, userID: number, sprint: string, urlList: Url[])
      //new tests for notes funcationality
      test('Create a research note', async () => {
        let data5 = null
        let urlList =  [{ url: 'http://example.com'}];
        if(projID !== undefined && userID !== undefined && sprintID !== undefined){
            data5 = await createResearchNote("New Note", "Details of note", userID, sprintID, urlList);
        }
        noteID = data5?.id
        expect(data5).toBeTruthy();
      });

      test('Get all research notes', async () => {
        let data5 = null
        if(projID !== undefined){
            data5 = await getResearchNotes(projID);
        }
        expect(data5).toBeTruthy();
      });

      // updateResearchNote(noteID: string, title: string, details: string, userID: number, sprint: string, urlList: any)
      test('Update a research note', async () => {
        let data5 = null
        let urlList =  [{ url: 'http://example2.com'}];
        if(noteID !== undefined && userID !== undefined && sprintID !== undefined){
            data5 = await updateResearchNote(noteID, "New note title", "New note details", userID, sprintID, urlList);
        }
        expect(data5).toBeTruthy();
      });

      test('Delete a research note', async () => {
        let data5 = null
        if(noteID !== undefined){
            data5 = await deleteResearchNote(noteID);
        }
        expect(data5).toBeTruthy();
      });

      //clean up the DB
      test('Remove a sprint', async () => {
        let data10 = null
       if(sprintID !== undefined){
         data10 = await removeSprint(sprintID);
       }
       expect(data10).toBeTruthy();
      });

    test('Remove a project', async () => {
        let data7 = null
        if(projID !== undefined){
            data7 = await removeProject(projID);
        }
        if(projID !== undefined){
          data7 = await getProject(projID);
      }
        expect(data7?.name).toBe(undefined);
      });
    
      test('delete user by ID', async () => {
        let data3 = null
       if(userID !== undefined){
         data3 = await deleteUserByID(userID);
       }
       expect(data3).toBeNull();
      });