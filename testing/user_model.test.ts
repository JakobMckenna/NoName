import {createUserPasswordData} from "../backend/data-access/user_model"

test('user created', async () => {
    const data = await createUserPasswordData("john1","john991@email.com","password1");
    expect(data?.email).toBe("john99@email.com");
  });

  test('user created', async () => {
    const data2 = await createUserPasswordData("john2","john992@email.com","password2");
    expect(data2).toBe(true);
  });

  test('user created', async () => {
    const data3 = await createUserPasswordData("null", "null", "null");
    expect(data3).toBeNull();
  });