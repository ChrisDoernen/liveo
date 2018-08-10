import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectStreamsComponent } from './select-streams.component';

describe('SelectStreamsComponent', () => {
  let component: SelectStreamsComponent;
  let fixture: ComponentFixture<SelectStreamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectStreamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectStreamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
