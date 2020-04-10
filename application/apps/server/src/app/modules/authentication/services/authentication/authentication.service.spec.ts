import { Test, TestingModule } from "@nestjs/testing";
import { AuthenticationService } from "./authentication.service";

describe("AuthService", () => {
  let service: AuthenticationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthenticationService],
    }).compile();

    service = module.get<AuthenticationService>(AuthenticationService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should construct", () => {
    expect(authenticationService).toBeTruthy();
  });

  it("should throw if user was not found in the database", () => {
    service.getUser.mockReturnValue(null);

    expect(() => service.authenticate("someUsername", "password")).toThrowError();
  });

  it("should throw if user was found in the database but password is not correct", () => {
    const username = "Chris";
    const invalidPassword = "password";
    const validPassword = "Password";
    const userInDatabase = new UserEntityBuilder().withUsername(username).withPassword(validPassword).build();
    service.getUser.mockReturnValue(userInDatabase);

    expect(() => service.authenticate(username, invalidPassword)).toThrowError();
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
