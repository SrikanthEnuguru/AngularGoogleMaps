import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMapsComponent } from './my-maps.component';

describe('MyMapsComponent', () => {
  let component: MyMapsComponent;
  let fixture: ComponentFixture<MyMapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyMapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
