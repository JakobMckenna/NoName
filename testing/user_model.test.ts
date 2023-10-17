import {createUserPasswordData} from "../backend/data-access/user_model"
import {getUserPassword} from "../backend/data-access/user_model"

test('user created', async () => {
    const data2 = await createUserPasswordData("john1","john991@email.com","password1");
    expect(data2?.email).toBe(null);
  });

  test('user created', async () => {
    const data3 = await getUserPassword("john992@gmail.com");
    expect(data3).toBeNull();
  });




  