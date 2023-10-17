import {createUserPasswordData} from "../backend/data-access/user_model"
import {getUserPassword} from "../backend/data-access/user_model"

test('user created', async () => {
    const data3 = await createUserPasswordData("john1","john991@email.com","password1");
    expect(data3?.email).toBe("john99@email.com");
  });

  test('user created 2', async () => {
    const data2 = await createUserPasswordData("john2","john992@email.com","password2");
    expect(data2).toBe(true);
  });

  test('user created 3', async () => {
    const data3 = await createUserPasswordData("null", "null", "null");
    expect(data3).toBeNull();
  });

  test('user created', async () => {
    const data3 = await getUserPassword("john992@gmail.com", "password2");
    expect(data3).toBeNull();
  });

  class FakePrismaClient {
    async userCreate(data: { name: any; email: any; password: any; }) {
      // Simulate database logic and return the created user
      return {
        id: 1,
        name: data.name,
        email: data.email,
        userPassword: {
          password: data.password,
        },
      };
    }
  }

  describe('createUserPasswordData function', () => {
    it('creates user password data correctly', async () => {
      // Arrange
      const fakePrisma = new FakePrismaClient();
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
      };

      const user = await createUserPasswordData(userData.name, userData.email, userData.password);

    // Assert
    expect(user).toEqual({
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      userPassword: {
        password: 'password',
      },
    });
  });
});