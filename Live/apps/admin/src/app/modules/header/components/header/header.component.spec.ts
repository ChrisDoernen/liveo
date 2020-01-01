import { HttpClient } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { Logger } from "@live/services";
import createMockInstance from "jest-create-mock-instance";
import { InlineSVGDirective } from "ng-inline-svg";
import { InlineSVGService } from "ng-inline-svg/lib/inline-svg.service";
import { ShutdownService } from "../../../../services/shutdown/shutdown.service";
import { AngularMaterialModule } from "../../../angular-material/angular-material.module";
import { LogoHeaderComponent } from "../../../shared/components/logo-header/logo-header.component";
import { LogoComponent } from "../../../shared/components/logo/logo.component";
import { ShutdownComponent } from "../shutdown/shutdown.component";
import { HeaderComponent } from "./header.component";

describe("HeaderComponent", () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let shutdownService: jest.Mocked<ShutdownService>;

  beforeEach(() => {
    shutdownService = createMockInstance(ShutdownService);

    TestBed.configureTestingModule({
      imports: [
        AngularMaterialModule,
        RouterTestingModule
      ],
      declarations: [
        HeaderComponent,
        LogoHeaderComponent,
        ShutdownComponent,
        LogoComponent,
        InlineSVGDirective
      ],
      providers: [
        { provide: HttpClient, useValue: jest.fn() },
        { provide: ShutdownService, useValue: shutdownService },
        { provide: InlineSVGService, useValue: jest.fn() },
        { provide: Logger, useValue: jest.fn() }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
