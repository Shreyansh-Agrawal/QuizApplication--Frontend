// BEGIN AI-generated - Cursor Composer

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HomeComponent } from './home.component';

// HomeComponent is an empty shell -- just verify it creates without errors.

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    // Configure TestBed with NO_ERRORS_SCHEMA to ignore template elements
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    // Create the component instance
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the home component', () => {
    // Assert
    expect(component).toBeTruthy();
  });
});

// END AI-generated - Cursor Composer
