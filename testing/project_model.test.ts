import {createProject, getProject, updateProject, removeProject, getAllProjects, removeProjectMember, addProjectMember, getProjectMembers} from "../backend/data-access/project_model"
import {createUserPasswordData, deleteUserByID} from "../backend/data-access/user_model"

let userID: number | undefined
let projID: string | undefined
let userID2: number | undefined
let projID2: string | undefined

test('Create a user', async () => {
  const newUser = await createUserPasswordData("ProjectUser", "PU1@gmail.com", "Pass");
  userID = newUser?.id
});

test('Create a project', async () => {
    let data1 = null
    if(userID !== undefined){
        data1 = await createProject("Project test", userID);
    }
    projID = data1?.id
    expect(data1?.name).toBe("Project test");
  });

  test('Project 2 created', async () => {
    let data2 = null
    if(userID !== undefined){
        data2 = await createProject("Project test 2", userID);
    }
    expect(data2?.name).toBe("Project test 2");
  });

  test('Get project data', async () => {
    let data4 = null
    if(projID !== undefined){
        data4 = await getProject(projID);
    }
    expect(data4?.name).toBe("Project test");
  });

  test('Update project 1', async () => {
    let data5 = null
    if(projID !== undefined && userID !== undefined){
        data5 = await updateProject(projID, "Project test new", userID);
    }
    expect(data5?.name).toBe("Project test new");
  });

  test('Update project 1 again', async () => {
    let data6 = null
    if(projID !== undefined && userID !== undefined){
        data6 = await updateProject(projID, "Project test new2", userID);
    }
    expect(data6?.name).toBe("Project test new2");
  });

  test('Get all projects', async () => {
    let data8 = null
    if(projID !== undefined ){
        data8 = await getAllProjects();
    }
    expect(data8).toBeTruthy();
  });

  test('Test empty project', async () => {
    let data11 = null
    if(projID !== undefined ){
        data11 = await getProjectMembers(projID);
    }
    expect(data11).toBeNull();
  });

  test('Remove a member', async () => {
    let data9 = null
    if(userID !== undefined && projID !== undefined){
        data9 = await removeProjectMember(projID, userID);
    }
    expect(data9).toBeTruthy();
  });


  test('Create a user new', async () => {
    const newUser2 = await createUserPasswordData("ProjectUser111", "PU1111@gmail.com", "Pass111");
    userID2 = newUser2?.id
  });

  test('Create a project new', async () => {
    let data12 = null
    if(userID2 !== undefined){
        data12 = await createProject("Project test111", userID2);
    }
    projID2 = data12?.id
    expect(data12?.name).toBe("Project test111");
  });

  test('Add a member', async () => {
    let data10 = null
    if(userID2 !== undefined && projID2 !== undefined){
        data10 = await addProjectMember(projID2, userID2);
    }
    expect(data10).toBeNull(); //should be true
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

  test('Remove a project', async () => {
    let data7 = null
    if(projID2 !== undefined){
        data7 = await removeProject(projID2);
    }
    if(projID2 !== undefined){
      data7 = await getProject(projID2);
  }
    expect(data7?.name).toBe(undefined);
  });

  test('Delete user by ID', async () => {
    let data3 = null
   if(userID2 !== undefined){
     data3 = await deleteUserByID(userID2);
   }
   expect(data3).toBeNull();
  });