import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickUpCategoryComponent } from './pick-up-category.component';

describe('PickUpCategoryComponent', () => {
  let component: PickUpCategoryComponent;
  let fixture: ComponentFixture<PickUpCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickUpCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickUpCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
