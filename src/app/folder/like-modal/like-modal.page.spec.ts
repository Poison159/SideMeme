import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LikeModalPage } from './like-modal.page';

describe('LikeModalPage', () => {
  let component: LikeModalPage;
  let fixture: ComponentFixture<LikeModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LikeModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LikeModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
