import {createProject, getProject, updateProject, removeProject, getAllProjects, removeProjectMember} from "../backend/data-access/project_model"
import {createUserPasswordData, deleteUserByID} from "../backend/data-access/user_model"

let userID: number | undefined
let projID: string | undefined

test('project created', async () => {
  const newUser = await createUserPasswordData("ProjectUser", "PU1@gmail.com", "Pass");
  userID = newUser?.id
  console.log("USERID is " + userID)
});

test('project created', async () => {
    let data1 = null
    if(userID !== undefined){
        data1 = await createProject("Project test", userID);
    }
    projID = data1?.id
    expect(data1?.name).toBe("Project test");
  });

  test('project 2 created', async () => {
    let data2 = null
    if(userID !== undefined){
        data2 = await createProject("Project test 2", userID);
    }
    expect(data2?.name).toBe("Project test 2");
  });

  test('get project', async () => {
    let data4 = null
    if(projID !== undefined){
        data4 = await getProject(projID);
    }
    expect(data4?.name).toBe("Project test");
  });

  test('update project', async () => {
    let data5 = null
    if(projID !== undefined && userID !== undefined){
        data5 = await updateProject(projID, "Project test new", userID);
    }
    expect(data5?.name).toBe("Project test new");
  });

  test('update project again', async () => {
    let data6 = null
    if(projID !== undefined && userID !== undefined){
        data6 = await updateProject(projID, "Project test new2", userID);
    }
    expect(data6?.name).toBe("Project test new2");
  });

  test('get all projects', async () => {
    let data8 = null
    if(projID !== undefined ){
        data8 = await getAllProjects();
    }
    expect(data8).toBeTruthy();
  });

  test('remove a member', async () => {
    let data9 = null
    if(userID !== undefined && projID !== undefined){
        data9 = await removeProjectMember(projID, userID);
    }
    expect(data9).toBeTruthy();
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