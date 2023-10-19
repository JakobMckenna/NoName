import {createUserPasswordData} from "../backend/data-access/user_model"
import {getUserPassword} from "../backend/data-access/user_model"

test('user created', async () => {
    const data1 = await createUserPasswordData("john1","john993@email.com","password1");
    expect(data1?.email).toBe("john993@email.com");
  });

  test('user created', async () => {
    const data2 = await createUserPasswordData("john1","john991@email.com","password1");
    expect(data2?.name).toBe("john1");
  });
  test('user created', async () => {
    const data3 = await createUserPasswordData("john1","john991@email.com","password1");
    expect(data3?.email).toBeTruthy()
  });

  test('no pass', async () => {
    const data4 = await getUserPassword("john912@gmail.com");
    expect(data4).toBeNull();
  });

  test('should have pass', async () => {
    const data5 = await getUserPassword("john911@email.com");
    expect(data5).toBe("password1");
  });
  
  