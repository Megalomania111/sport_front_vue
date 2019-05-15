import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppEditEventComponent } from './app-edit-event.component';

describe('AppEditEventComponent', () => {
  let component: AppEditEventComponent;
  let fixture: ComponentFixture<AppEditEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppEditEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppEditEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
