import {createUserPasswordData, deleteUserByID} from "../backend/data-access/user_model"

let userID1: number | undefined

test('User 1 created', async () => {
    const data1 = await createUserPasswordData("test user 1","test1@email.com","testpass");
    userID1 = data1?.id
    expect(data1?.email).toBe("test1@email.com");
  });

  test('delete user by ID', async () => {
    let data6 = null
   if(userID1 !== undefined){
     data6 = await deleteUserByID(userID1);
   }
   expect(data6).toBeNull();
 });