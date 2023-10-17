import {createUserPasswordData} from "../backend/data-access/user_model"
import {getUserPassword} from "../backend/data-access/user_model"

/*test('user created', async () => {
    const data3 = await createUserPasswordData("john1","john991@email.com","password1");
    expect(data3?.email).toBe("john991@email.com");
  });

  test('user created 2', async () => {
    const data2 = await createUserPasswordData("john2","john992@email.com","password2");
    expect(data2?.name).toBe("john2");
  });

  test('user created 3', async () => {
    const data3 = await createUserPasswordData("john3","john992@email.com","password2");
    expect(data3?.name).toBe("john3");
  });*/

  test('user created', async () => {
    const data3 = await getUserPassword("john992@gmail.com", "password2");
    expect(data3).toBeNull();
  });

  