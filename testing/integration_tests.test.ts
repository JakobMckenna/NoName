import {createUserPasswordData, deleteUserByID, getAllUsers, getUserPassword} from "../backend/data-access/user_model"

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
