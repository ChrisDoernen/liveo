import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { Logger } from "@live/services";
import createMockInstance from "jest-create-mock-instance";
import { MockComponent } from "ng-mocks";
import { AngularMaterialModule } from "../../modules/angular-material/angular-material.module";
import { LogoHeaderComponent } from "../../modules/shared/components/logo-header/logo-header.component";
import { AuthenticationService } from "../../modules/shared/services/authentication/authentication.service";
import { ActivatedRouteBuilder } from "../../test-utilities/test-data-builder/activated-route-builder";
import { LoginComponent } from "./login.component";

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let activatedRoute: ActivatedRoute;
  let authenticationService: jest.Mocked<AuthenticationService>;

  beforeEach(() => {
    activatedRoute = new ActivatedRouteBuilder().build();
    authenticationService = createMockInstance(AuthenticationService);

    TestBed.configureTestingModule({
      imports: [
        AngularMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      declarations: [
        LoginComponent,
        MockComponent(LogoHeaderComponent)
      ],
      providers: [
        { provide: Logger, useValue: jest.fn() },
        { provide: AuthenticationService, useValue: authenticationService },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
