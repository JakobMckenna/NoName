import {createUserPasswordData} from "../backend/data-access/user_model"

test('user created', async () => {
    const data = await createUserPasswordData("john","john99@email.com","password");
    expect(data?.email).toBe("john99@email.com");
  });