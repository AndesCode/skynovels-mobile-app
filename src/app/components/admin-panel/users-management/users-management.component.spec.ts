import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UsersManagementComponent } from './users-management.component';

describe('UsersManagementComponent', () => {
  let component: UsersManagementComponent;
  let fixture: ComponentFixture<UsersManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersManagementComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UsersManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
