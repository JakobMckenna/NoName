import {createUserPasswordData, deleteUserByID, updateUser, getAllUsers, getUserProjects} from "../backend/data-access/user_model"
import {getUserPassword} from "../backend/data-access/user_model"

let userID1: number | undefined
let userID2: number | undefined
let userID3: number | undefined
let userID4: number | undefined

//Create new users
test('User 1 created', async () => {
    const data1 = await createUserPasswordData("john1","john889@email.com","password1");
    userID1 = data1?.id
    expect(data1?.email).toBe("john889@email.com");
  });

  test('User 2 created', async () => {
    const data2 = await createUserPasswordData("john2","john999@email.com","password2");
    userID2 = data2?.id
    expect(data2?.name).toBe("john2");
  });
 
  test('User 3 created', async () => {
    const data3 = await createUserPasswordData("john3","john978@email.com","password3");
    userID3 = data3?.id
    expect(data3?.email).toBe("john978@email.com")
  });

  test('User 4 created', async () => {
    const data9 = await createUserPasswordData("john31","john9771@email.com","password31");
    userID4 = data9?.id
    expect(data9).toBeTruthy
  });

  //Test passwords
  test('Testing wrong password', async () => {
    const data4 = await getUserPassword("john912@gmail.com");
    expect(data4).toBeNull();
  });

  test('Testing correct password', async () => {
    const data5 = await getUserPassword("john999@email.com");
    expect(data5?.userPassword?.password).toBe("password2");
  });

    //Update a user
    test('Updating user info', async () => {
      if(userID4 !== undefined){
        const data13 = await updateUser(userID4,"john33","john9783@email.com","password33");
        expect(data13).toBeTruthy;
      }
    });

     //Getting all users
     test('Getting users (There should be 4 right now)', async () => {
        const data14 = await getAllUsers();
        expect(data14).toBeTruthy;
      
     });

     //get user projects
     test('Getting user projects (Should be none)', async () => {
      const data15 = await getAllUsers();
      expect(data15).toBeNull;
    
   });

  //Delete users
  test('delete user by ID', async () => {
     let data6 = null
    if(userID1 !== undefined){
      data6 = await deleteUserByID(userID1);
    }
    expect(data6).toBeNull();
  });

  test('delete user by ID2', async () => {
    let data7 = null
   if(userID2 !== undefined){
     data7 = await deleteUserByID(userID2);
   }
   expect(data7).toBeNull();
 });

 test('delete user by ID3', async () => {
  let data8 = null
 if(userID3 !== undefined){
   data8 = await deleteUserByID(userID3);
 }
 expect(data8).toBeNull();
});

test('delete user by ID4', async () => {
  let data9 = null
 if(userID4 !== undefined){
   data9 = await deleteUserByID(userID4);
 }
 expect(data9).toBeNull();
});

test('Create user with bad data', async () => {
  const data1 = await createUserPasswordData("1","1@1","1");
  expect(data1).toBeNull();
});

test('Create user with bad email', async () => {
  const data1 = await createUserPasswordData("1","1","1");
  expect(data1).toBeNull();
});

test('delete user by bad ID', async () => {
   let data6 = null
   data6 = await deleteUserByID(66666);
   expect(data6).toBeNull();
});
  
test('Updating with bad user info', async () => {
  if(userID4 !== undefined){
    const data13 = await updateUser(userID4,"1","1","1");
    expect(data13).toBeNull();
  }
});

test('Testing password for non existant user', async () => {
  const data5 = await getUserPassword("fakeuser");
  expect(data5).toBeNull();
});
  