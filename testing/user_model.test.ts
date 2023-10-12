import {createUserPasswordData} from "../backend/data-access/user_model"

test('user created', async () => {
    const data = await createUserPasswordData("john","john99@email.com","password");
    expect(data?.email).toBe("john99@email.com");
  });

  test('user created', async () => {
    const data2 = await createUserPasswordData("john","john99@email.com","password");
    expect(data2).toBe(true);
  });

  test('user created', async () => {
    const data3 = await createUserPasswordData("john","john99@email.com","password");
    expect(data3).toBeTruthy();
  });