import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { HomeComponent } from "./home.component";
import { HeaderComponent } from "../header/header.component";
import { RouterModule } from "@angular/router";
import { InlineSVGDirective } from "ng-inline-svg";
import { InlineSVGService } from "ng-inline-svg/lib/inline-svg.service";
import createMockInstance from "jest-create-mock-instance";
import { async as _async } from "rxjs/scheduler/async";
import { DataService } from "src/app/services/data/data.service";

describe("HomeComponent", () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let dataService: jest.Mocked<DataService>;

  beforeEach(() => {
    const inlineSVGService = jest.fn();
    dataService = createMockInstance(DataService);

    TestBed.configureTestingModule({
      declarations: [HomeComponent, HeaderComponent, InlineSVGDirective],
      providers: [
        { provide: DataService, useValue: dataService },
        { provide: InlineSVGService, useValue: inlineSVGService }
      ],
      imports: [RouterModule]
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
