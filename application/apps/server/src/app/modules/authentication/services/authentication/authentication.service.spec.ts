import { UserEntityBuilder } from "@liveo/test-utilities";
import { Test, TestingModule } from "@nestjs/testing";
import createMockInstance from "jest-create-mock-instance";
import { UsersService } from "../../../users/services/users/users.service";
import { AuthenticationService } from "./authentication.service";

describe("AuthenticationService", () => {
  let authenticationService: AuthenticationService;
  let usersService: jest.Mocked<UsersService>;

  beforeEach(async () => {
    usersService = createMockInstance(UsersService);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthenticationService,
        {
          provide: UsersService,
          useValue: usersService
        }
      ]
    }).compile();

    authenticationService = module.get<AuthenticationService>(AuthenticationService);
  });

  it("should be defined", () => {
    expect(authenticationService).toBeDefined();
  });

  it("should throw if user was not found in the database", () => {
    usersService.getUser.mockReturnValue(null);

    expect(() => authenticationService.authenticate("someUsername", "password")).toThrowError();
  });

  it("should throw if user was found in the database but password is not correct", () => {
    const username = "Chris";
    const invalidPassword = "password";
    const validPassword = "Password";
    const userInDatabase = new UserEntityBuilder().withUsername(username).withPassword(validPassword).build();
    usersService.getUser.mockReturnValue(userInDatabase);

    expect(() => authenticationService.authenticate(username, invalidPassword)).toThrowError();
  });

  it("should authenticate user if in database and password is correct", () => {
    const username = "Chris";
    const password = "password";

    const userInDatabase = new UserEntityBuilder().withUsername(username).withPassword(password).build();
    usersService.getUser.mockReturnValue(userInDatabase);

    const returnedUser = authenticationService.authenticate(username, password);

    expect(returnedUser).toBe(userInDatabase);
  });
});
