import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NovelsManagementComponent } from './novels-management.component';

describe('NovelsManagementComponent', () => {
  let component: NovelsManagementComponent;
  let fixture: ComponentFixture<NovelsManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovelsManagementComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NovelsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
