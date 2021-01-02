import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NovelManagementComponent } from './novel-management.component';

describe('NovelManagementComponent', () => {
  let component: NovelManagementComponent;
  let fixture: ComponentFixture<NovelManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovelManagementComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NovelManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
