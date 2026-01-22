import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AprendePage } from './aprende.page';

describe('AprendePage', () => {
  let component: AprendePage;
  let fixture: ComponentFixture<AprendePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AprendePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
