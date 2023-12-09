import {createUserPasswordData, deleteUserByID, getUserProjects, getUserPassword} from "../backend/data-access/user_model"
import {createProject, getProject, updateProject, removeProject, getAllProjects, removeProjectMember, addProjectMember, getProjectMembers} from "../backend/data-access/project_model"
import {getRepo, createRepo, updateRepo} from "../backend/data-access/repo_model"

test('Create and delete user', async () => {
    let userID: number | undefined
    const data1 = await createUserPasswordData("test user 1","test1@email.com","testpass");
    userID = data1?.id
    expect(data1?.email).toBe("test1@email.com");

    let data2 = null
    if(userID !== undefined){
        data2 = await deleteUserByID(userID);
      }
      expect(data2).toBeNull();
  });

  test('Create and delete user, and get user information', async () => {
    let userID: number | undefined
    const data1 = await createUserPasswordData("test user 124","test124@email.com","testpass24");
    userID = data1?.id
    expect(data1?.email).toBe("test124@email.com");

    const data5 = await getUserPassword("test124@email.com");
    expect(data5?.userPassword?.password).toBe("testpass24");

    let data2 = null
    if(userID !== undefined){
        data2 = await deleteUserByID(userID);
      }
      expect(data2).toBeNull();
  });

  test('Make project and get users project', async () => {
    let userID: number | undefined
    let projID: string | undefined

    const data1 = await createUserPasswordData("test user 1241","test1241@email.com","testpass241");
    userID = data1?.id
    expect(data1?.email).toBe("test1241@email.com");

    const data5 = await getUserPassword("test1241@email.com");
    expect(data5?.userPassword?.password).toBe("testpass241");

    let data6 = null
        if(userID !== undefined){
            data6 = await createProject("Project tester", userID);
        }
        projID = data6?.id
        expect(data6?.name).toBe("Project tester");

    let data7 = null
    if(projID !== undefined){
        data7 = await removeProject(projID);
    }
    if(projID !== undefined){
      data7 = await getProject(projID);
  }
    expect(data7?.name).toBe(undefined);

    let data2 = null
    if(userID !== undefined){
        data2 = await deleteUserByID(userID);
      }
      expect(data2).toBeNull();
  });

  test('Make project and add a repo', async () => {
    let userID: number | undefined
    let projID: string | undefined
    let repoID: string | undefined

    const data1 = await createUserPasswordData("test user 1241","test1241@email.com","testpass241");
    userID = data1?.id
    expect(data1?.email).toBe("test1241@email.com");

        let data6 = null
        if(userID !== undefined){
            data6 = await createProject("Project tester", userID);
        }
        projID = data6?.id
        expect(data6?.name).toBe("Project tester");

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


    let data7 = null
    if(projID !== undefined){
        data7 = await removeProject(projID);
    }
    if(projID !== undefined){
      data7 = await getProject(projID);
  }
    expect(data7?.name).toBe(undefined);

    let data2 = null
    if(userID !== undefined){
        data2 = await deleteUserByID(userID);
      }
      expect(data2).toBeNull();
  });


 