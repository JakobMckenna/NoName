import {createUserPasswordData, deleteUserByID} from "../backend/data-access/user_model"
import {createProject, removeProject, getProject} from "../backend/data-access/project_model"
import {createRepo} from "../backend/data-access/repo_model"
import {getSprint, getSprints, createSprint, removeSprint, updateSprint} from "../backend/data-access/sprint_model"


let userID: number | undefined
let projID: string | undefined
let sprintID: string | undefined
let sprints = null

//Create a user so that we can make a project 
test('Creating a dummy user to create a project', async () => {
    const newUser = await createUserPasswordData("ProjectUser3", "PU13@gmail.com", "Pass3");
    userID = newUser?.id
  });
  
  //Create a new project
  test('New project created', async () => {
      let data1 = null
      if(userID !== undefined){
          data1 = await createProject("Project test 23", userID);
      }
      projID = data1?.id
      expect(data1?.name).toBe("Project test 23");
    });

    test('Create a new repo', async () => {
        let data5 = null
        if(projID !== undefined){
            data5 = await createRepo(projID, "JakobMcKenna","3040-A3");
        }
        expect(data5).toBeTruthy();
      });

      test('Get sprints from a project', async () => {
        let data2 = null
       if(projID !== undefined){
         data2 = await getSprints(projID);
       }
       sprints = data2
       expect(data2).toBeTruthy();
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

      test('Get a new Sprint', async () => {
        let data4 = null
       if(sprintID !== undefined){
         data4 = await getSprint(sprintID);
       }
       expect(data4).toBeTruthy();
      });

      test('Update a Sprint', async () => {
        let data4 = null
       if(sprintID !== undefined && projID !== undefined){
         data4 = await updateSprint(sprintID, projID, "new name", "2023-10-20T06:20:11.963Z", "2023-10-20T06:20:11.963Z");
       }
       expect(data4?.name).toBe("new name");
       expect(data4?.projectID).toBe(projID);
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