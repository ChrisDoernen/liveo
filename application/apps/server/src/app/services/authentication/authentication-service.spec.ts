import { UserEntityBuilder } from "@liveo/test-utilities";
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
    dataService.getUser.mockReturnValue(null);

    expect(() => authenticationService.authenticate("someUsername", "password")).toThrowError();
  });

  it("should throw if user was found in the database but password is not correct", () => {
    const username = "Chris";
    const invalidPassword = "password";
    const validPassword = "Password";
    const userInDatabase = new UserEntityBuilder().withUsername(username).withPassword(validPassword).build();
    dataService.getUser.mockReturnValue(userInDatabase);

    expect(() => authenticationService.authenticate(username, invalidPassword)).toThrowError();
  });

  it("should authenticate user if in database and password is correct", () => {
    const username = "Chris";
    const password = "password";

    const userInDatabase = new UserEntityBuilder().withUsername(username).withPassword(password).build();
    dataService.getUser.mockReturnValue(userInDatabase);

    const returnedUser = authenticationService.authenticate(username, password);

    expect(returnedUser).toBe(userInDatabase);
  });
});