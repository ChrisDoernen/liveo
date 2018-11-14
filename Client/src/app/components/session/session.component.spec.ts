import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SessionComponent } from './session.component';
import { SessionService } from 'src/app/services/session-service/session-service';

describe('SessionComponent', () => {
  let component: SessionComponent;
  let fixture: ComponentFixture<SessionComponent>;

  beforeEach(() => {
    const sessionServiceSpy = jasmine.createSpyObj('SessionService', ['']);

    TestBed.configureTestingModule({

      declarations: [ SessionComponent ],
      providers: [
        { provide: SessionService, useValue: sessionServiceSpy} 
      ] 
    })
  
    fixture = TestBed.createComponent(SessionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
