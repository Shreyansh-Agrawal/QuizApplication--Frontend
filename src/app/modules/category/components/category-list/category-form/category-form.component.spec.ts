// BEGIN AI-generated - Cursor Composer

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { CreateCategoryComponent } from './category-form.component';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/category.model';

// CreateCategoryComponent delegates to CategoryService for create/update.

describe('CreateCategoryComponent', () => {
  let component: CreateCategoryComponent;
  let fixture: ComponentFixture<CreateCategoryComponent>;
  let mockCategoryService: jasmine.SpyObj<CategoryService>;
  let successSubject: Subject<string>;

  beforeEach(async () => {
    // Create Subject for successSubject
    successSubject = new Subject<string>();

    // Create spy for CategoryService
    mockCategoryService = jasmine.createSpyObj('CategoryService', [
      'createCategory',
      'updateCategory'
    ]);
    (mockCategoryService as any).successSubject = successSubject;

    await TestBed.configureTestingModule({
      declarations: [CreateCategoryComponent],
      imports: [FormsModule],
      providers: [
        { provide: CategoryService, useValue: mockCategoryService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    // Create the component instance
    fixture = TestBed.createComponent(CreateCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the category form component', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('should have default category with name Science', () => {
    // Assert - the @Input default value
    expect(component.category.category_name).toBe('Science');
  });

  it('should call categoryService.createCategory with the category name', () => {
    // Arrange
    const category: Category = { category_id: '', category_name: 'History', admin_id: '' };

    // Act
    component.createCategory(category);

    // Assert
    expect(mockCategoryService.createCategory).toHaveBeenCalledWith('History');
  });

  it('should call categoryService.updateCategory with id and name', () => {
    // Arrange
    const category: Category = { category_id: 'cat-1', category_name: 'Updated', admin_id: '' };

    // Act
    component.updateCategory(category);

    // Assert
    expect(mockCategoryService.updateCategory).toHaveBeenCalledWith('cat-1', 'Updated');
  });

  it('should emit closeForm with false when closeCategoryForm is called', () => {
    // Arrange - spy on the EventEmitter
    spyOn(component.closeForm, 'emit');

    // Act
    component.closeCategoryForm();

    // Assert
    expect(component.closeForm.emit).toHaveBeenCalledWith(false);
  });
});

// END AI-generated - Cursor Composer
