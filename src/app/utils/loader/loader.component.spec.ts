// BEGIN AI-generated - Cursor Composer

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LoaderComponent } from './loader.component';

// LoaderComponent is an empty shell -- just verify it creates without errors.

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;

  beforeEach(async () => {
    // Configure TestBed with NO_ERRORS_SCHEMA to ignore PrimeNG spinner element
    await TestBed.configureTestingModule({
      declarations: [LoaderComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    // Create the component instance
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the loader component', () => {
    // Assert
    expect(component).toBeTruthy();
  });
});

// END AI-generated - Cursor Composer
