import {createUserPasswordData, deleteUserByID} from "../backend/data-access/user_model"
import {getUserPassword} from "../backend/data-access/user_model"

let userID1: number | undefined
let userID2: number | undefined
let userID3: number | undefined

test('user created', async () => {
    const data1 = await createUserPasswordData("john1","john889@email.com","password1");
    userID1 = data1?.id
    expect(data1?.email).toBe("john889@email.com");
  });

  test('user created', async () => {
    const data2 = await createUserPasswordData("john2","john999@email.com","password2");
    userID2 = data2?.id
    expect(data2?.name).toBe("john2");
  });
  test('user created', async () => {
    const data3 = await createUserPasswordData("john3","john977@email.com","password3");
    userID3 = data3?.id
    expect(data3?.email).toBe("john977@email.com")
  });

  test('no pass', async () => {
    const data4 = await getUserPassword("john912@gmail.com");
    expect(data4).toBeNull();
  });

  test('should have pass', async () => {
    const data5 = await getUserPassword("john999@email.com");
    expect(data5?.userPassword?.password).toBe("password2");
  });

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
  
  