import {createProject} from "../backend/data-access/project_model"
import {createUserPasswordData, deleteUserByID} from "../backend/data-access/user_model"

let userID: number | undefined
//const newUser = await createUserPasswordData("ProjectUser", "PU@gmail.com", "Pass");
//console.log(newUser)
//userID = newUser.id

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
    expect(data1?.name).toBe("Project test");
  });

  test('project 2 created', async () => {
    let data2 = null
    if(userID !== undefined){
        data2 = await createProject("Project test 2", userID);
    }
    expect(data2?.name).toBe("Project test 2");
  });

  test('delete user by ID', async () => {
    let data3 = null
   if(userID !== undefined){
     data3 = await deleteUserByID(userID);
   }
   expect(data3).toBeNull();
  });