import { UserEntityBuilder } from "@liveo/test-utilities";
import { Test, TestingModule } from "@nestjs/testing";
import createMockInstance from "jest-create-mock-instance";
import { DataService } from "../../../database/services/data/data.service";
import { UsersService } from "./users.service";

describe("AuthService", () => {
  let service: UsersService;
  let dataService: jest.Mocked<DataService>;

  beforeEach(async () => {
    dataService = createMockInstance(DataService);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: DataService,
          useValue: dataService
        }
      ]
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should get user from data service", () => {
    const username = "Bernd";

    const user = new UserEntityBuilder().withUsername(username).build();
    dataService.getUser.mockReturnValue(user);

    expect(service.getUser(username)).toBe(user);
  });
});
