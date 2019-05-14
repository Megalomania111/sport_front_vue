import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppEditUserComponent } from './app-edit-user.component';

describe('AppEditUserComponent', () => {
  let component: AppEditUserComponent;
  let fixture: ComponentFixture<AppEditUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppEditUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppEditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
