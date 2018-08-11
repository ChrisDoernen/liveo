import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectStreamComponent } from './select-stream.component';

describe('SelectStreamsComponent', () => {
  let component: SelectStreamComponent;
  let fixture: ComponentFixture<SelectStreamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectStreamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
