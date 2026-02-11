// BEGIN AI-generated - Cursor Composer

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PageNotFoundComponent } from './page-not-found.component';

// PageNotFoundComponent is an empty shell -- just verify it creates without errors.

describe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;

  beforeEach(async () => {
    // Configure TestBed with NO_ERRORS_SCHEMA to ignore template elements
    await TestBed.configureTestingModule({
      declarations: [PageNotFoundComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    // Create the component instance
    fixture = TestBed.createComponent(PageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the page-not-found component', () => {
    // Assert
    expect(component).toBeTruthy();
  });
});

// END AI-generated - Cursor Composer
