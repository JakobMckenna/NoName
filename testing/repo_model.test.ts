import {createUserPasswordData, deleteUserByID} from "../backend/data-access/user_model"
import {createProject, removeProject, getProject} from "../backend/data-access/project_model"
import {getRepo, createRepo, updateRepo} from "../backend/data-access/repo_model"

let userID: number | undefined
let projID: string | undefined
let repoID: string | undefined

test('Create test user', async () => {
    const newUser = await createUserPasswordData("ProjectUser2", "PU12@gmail.com", "Pass2");
    userID = newUser?.id
  });
  
  test('Create test project', async () => {
      let data1 = null
      if(userID !== undefined){
          data1 = await createProject("Project test 22", userID);
      }
      projID = data1?.id
      expect(data1?.name).toBe("Project test 22");
    });

    test('Create a new repo', async () => {
        let data5 = null
        if(projID !== undefined){
            data5 = await createRepo(projID, "JakobMcKenna","NoName");
        }
        expect(data5).toBeTruthy();
      });

      test('Get the new repo', async () => {
        let data6 = null
        if(projID !== undefined){
            data6 = await getRepo(projID);
        }
        repoID = data6?.id
        expect(data6).toBeTruthy();
      });

      test('Update a non-existant repo', async () => {
        let data7 = null
        if(projID !== undefined && repoID !== undefined){
            data7 = await updateRepo(repoID, projID, "JakobMcKenna", "NoNameExists");
        }
        expect(data7).toBeNull();
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
    
    
      test('Delete user by ID', async () => {
        let data3 = null
       if(userID !== undefined){
         data3 = await deleteUserByID(userID);
       }
       expect(data3).toBeNull();
      });