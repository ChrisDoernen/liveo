import { TestBed, async } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { AngularMaterialModule } from "./angular-material.module";
import { NavigationComponent } from "./components/navigation/navigation.component";
import { ShutdownComponent } from "./components/shutdown/shutdown.component";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";

describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularMaterialModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        NavigationComponent,
        ShutdownComponent
      ]
    }).compileComponents();
  }));

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
