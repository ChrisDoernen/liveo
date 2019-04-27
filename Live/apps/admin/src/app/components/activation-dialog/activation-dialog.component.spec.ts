import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ActivationDialogComponent } from "./activation-dialog.component";

describe("ActivationDialogComponent", () => {
  let component: ActivationDialogComponent;
  let fixture: ComponentFixture<ActivationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
