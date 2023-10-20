import {createUserPasswordData, deleteUserByID} from "../backend/data-access/user_model"
import {createProject, removeProject, getProject} from "../backend/data-access/project_model"
import {createRepo} from "../backend/data-access/repo_model"
import {getSprint, getSprints, createSprint, removeSprint} from "../backend/data-access/sprint_model"
import {getResearchNotes, createResearchNote} from "../backend/data-access/research_model"

let userID: number | undefined
let projID: string | undefined
let sprintID: string | undefined
let sprints = null

test('create user', async () => {
    const newUser = await createUserPasswordData("ProjectUser3", "PU13@gmail.com", "Pass3");
    userID = newUser?.id
  });
  
  test('project created', async () => {
      let data1 = null
      if(userID !== undefined){
          data1 = await createProject("Project test 23", userID);
      }
      projID = data1?.id
      expect(data1?.name).toBe("Project test 23");
    });

    test('create a repo', async () => {
        let data5 = null
        if(projID !== undefined){
            data5 = await createRepo(projID, "JakobMcKenna","3040-A3");
        }
        expect(data5).toBeTruthy();
      });

      test('get sprints', async () => {
        let data2 = null
       if(projID !== undefined){
         data2 = await getSprints(projID);
       }
       sprints = data2
       expect(data2).toBeTruthy();
      });

      test('create a sprint', async () => {
        let data6 = null
        if(projID !== undefined){
            data6 = await createSprint(projID, "Sprint 1", "2023-10-20T06:20:11.963Z", "2023-10-20T06:20:11.963Z");
        }
        sprints = data6
        sprintID = data6?.id
        expect(data6).toBeTruthy();
      });

      test('get sprint', async () => {
        let data4 = null
       if(sprintID !== undefined){
         data4 = await getSprint(sprintID);
       }
       expect(data4).toBeTruthy();
      });

      /*test('create note', async () => {
        let data11 = null
       if(userID !== undefined && sprintID !== undefined){
         data11 = await createResearchNote("Title", "details", userID, sprintID, 23 );
       }
       expect(data11).toBeTruthy();
      });*/

      test('remove sprint', async () => {
        let data10 = null
       if(sprintID !== undefined){
         data10 = await removeSprint(sprintID);
       }
       expect(data10).toBeTruthy();
      });

    test('remove a project', async () => {
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