import { UserEntityBuilder } from "@live/test-utilities";
import createMockInstance from "jest-create-mock-instance";
import "reflect-metadata";
import { DataService } from "../data/data-service";
import { AuthenticationService } from "./authentication-service";

describe("AuthenticationService", () => {
  let dataService: jest.Mocked<DataService>;
  let authenticationService: AuthenticationService;

  beforeEach(() => {
    dataService = createMockInstance(DataService);

    authenticationService = new AuthenticationService(null, dataService);
  });

  it("should construct", () => {
    expect(authenticationService).toBeTruthy();
  });

  it("should throw if user was not found in the database", () => {
    const user = new UserEntityBuilder().build();
    dataService.getUsers.mockReturnValue([]);

    expect(() => authenticationService.authenticateUser(user)).toThrowError();
  });

  it("should throw if use was not found in the database but password is not correct", () => {
    const usernameChris = "Chris";
    const passwordChris = "password";
    const passwordDatabase = "Password";
    const userInDatabase = new UserEntityBuilder().withUsername(usernameChris).withPassword(passwordDatabase).build();
    const userToAuthenticate = new UserEntityBuilder().withUsername(usernameChris).withPassword(passwordChris).build();
    dataService.getUsers.mockReturnValue([userInDatabase]);

    expect(() => authenticationService.authenticateUser(userToAuthenticate)).toThrowError();
  });

  it("should authenticate user if in database and password is correct", () => {
    const usernameChris = "Chris";
    const userInDatabase = new UserEntityBuilder().withUsername(usernameChris).build();
    const userToAuthenticate = userInDatabase;
    dataService.getUsers.mockReturnValue([userInDatabase]);

    const returnedUser = authenticationService.authenticateUser(userToAuthenticate)

    expect(returnedUser).toBe(userInDatabase);
  });
});