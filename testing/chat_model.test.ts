import {getAllMessages, saveMessage, deleteMessage, } from "../backend/data-access/chat_model"
import {createUserPasswordData, deleteUserByID} from "../backend/data-access/user_model"
import {createProject, getProject, updateProject, removeProject, getAllProjects, removeProjectMember} from "../backend/data-access/project_model"

let userID: number | undefined
let projID: string | undefined

test('Create a user', async () => {
    const newUser = await createUserPasswordData("ProjectUserNew", "PU1N@gmail.com", "PassNew");
    userID = newUser?.id
  });

  test('Create a project', async () => {
    let data1 = null
    if(userID !== undefined){
        data1 = await createProject("Project test New", userID);
    }
    projID = data1?.id
    expect(data1?.name).toBe("Project test New");
  });


test('Get all messages', async () => {
    let msg = null
    if(projID !== undefined){
        const msg = await getAllMessages(projID);
    }
    expect(msg).toBeNull()
  });


  test('Remove a project', async () => {
    let data2 = null
    if(projID !== undefined){
        data2 = await removeProject(projID);
    }
    if(projID !== undefined){
      data2 = await getProject(projID);
  }
    expect(data2?.name).toBe(undefined);
  });

  test('Delete user by ID', async () => {
    let data3 = null
   if(userID !== undefined){
     data3 = await deleteUserByID(userID);
   }
   expect(data3).toBeNull();
  });