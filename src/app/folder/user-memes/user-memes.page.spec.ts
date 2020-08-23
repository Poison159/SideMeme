import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserMemesPage } from './user-memes.page';

describe('UserMemesPage', () => {
  let component: UserMemesPage;
  let fixture: ComponentFixture<UserMemesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMemesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserMemesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
