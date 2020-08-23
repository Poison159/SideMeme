import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TopMemesPage } from './top-memes.page';

describe('TopMemesPage', () => {
  let component: TopMemesPage;
  let fixture: ComponentFixture<TopMemesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopMemesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TopMemesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
