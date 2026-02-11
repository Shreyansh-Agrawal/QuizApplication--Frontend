// BEGIN AI-generated - Cursor Composer

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CategoryListComponent } from './category-list.component';
import { CategoryService } from '../../services/category.service';
import { UserRoleService } from '../../../../core/services/user-role.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Roles } from '../../../../shared/constants/roles.constants';
import { Category } from '../../models/category.model';

// CategoryListComponent has role-based checks, selectCategory branching,
// and form open/close logic worth testing.

describe('CategoryListComponent', () => {
  let component: CategoryListComponent;
  let fixture: ComponentFixture<CategoryListComponent>;
  let mockCategoryService: jasmine.SpyObj<CategoryService>;
  let mockUserRoleService: jasmine.SpyObj<UserRoleService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockConfirmationService: jasmine.SpyObj<ConfirmationService>;
  let mockMessageService: jasmine.SpyObj<MessageService>;
  let categoryListSubject: Subject<Category[]>;
  let successSubject: Subject<string>;

  beforeEach(async () => {
    // Create Subjects for reactive service properties
    categoryListSubject = new Subject<Category[]>();
    successSubject = new Subject<string>();

    // Create spy objects for all injected services
    mockCategoryService = jasmine.createSpyObj('CategoryService', [
      'getAllCategories',
      'deleteCategory'
    ]);
    (mockCategoryService as any).categoryList = categoryListSubject;
    (mockCategoryService as any).successSubject = successSubject;

    mockUserRoleService = jasmine.createSpyObj('UserRoleService', ['getUserRole']);
    mockUserRoleService.getUserRole.and.returnValue(Roles.admin);

    mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);
    mockConfirmationService = jasmine.createSpyObj('ConfirmationService', ['confirm']);
    mockMessageService = jasmine.createSpyObj('MessageService', ['add']);

    await TestBed.configureTestingModule({
      declarations: [CategoryListComponent],
      providers: [
        { provide: CategoryService, useValue: mockCategoryService },
        { provide: UserRoleService, useValue: mockUserRoleService },
        { provide: Router, useValue: mockRouter },
        { provide: ConfirmationService, useValue: mockConfirmationService },
        { provide: MessageService, useValue: mockMessageService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    // Create the component instance
    fixture = TestBed.createComponent(CategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the category-list component', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  // --- userRoleIsAdmin ---

  it('should return true from userRoleIsAdmin when userRole is admin', () => {
    // Arrange - userRole is set to admin during construction (from mock)
    component.userRole = Roles.admin;

    // Act
    const result = component.userRoleIsAdmin();

    // Assert
    expect(result).toBeTrue();
  });

  it('should return false from userRoleIsAdmin when userRole is not admin', () => {
    // Arrange
    component.userRole = Roles.player;

    // Act
    const result = component.userRoleIsAdmin();

    // Assert
    expect(result).toBeFalse();
  });

  // --- selectCategory ---

  it('should navigate to /quiz/play when player selects a category', () => {
    // Arrange - mock getUserRole to return player
    mockUserRoleService.getUserRole.and.returnValue(Roles.player);
    const category: Category = { category_id: '1', category_name: 'Science', admin_id: 'a1' };

    // Act
    component.selectCategory(category);

    // Assert
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/quiz/play');
  });

  it('should not navigate when admin selects a category', () => {
    // Arrange - mock getUserRole to return admin
    mockUserRoleService.getUserRole.and.returnValue(Roles.admin);
    const category: Category = { category_id: '1', category_name: 'Science', admin_id: 'a1' };

    // Act
    component.selectCategory(category);

    // Assert - no navigation should occur
    expect(mockRouter.navigateByUrl).not.toHaveBeenCalled();
  });

  it('should not navigate when super-admin selects a category', () => {
    // Arrange
    mockUserRoleService.getUserRole.and.returnValue(Roles.superAdmin);
    const category: Category = { category_id: '1', category_name: 'Science', admin_id: 'a1' };

    // Act
    component.selectCategory(category);

    // Assert
    expect(mockRouter.navigateByUrl).not.toHaveBeenCalled();
  });

  // --- form open/close ---

  it('should open create category form with editMode false', () => {
    // Act
    component.openCreateCategoryForm();

    // Assert
    expect(component.showCategoryForm).toBeTrue();
    expect(component.editMode).toBeFalse();
  });

  it('should open update category form with editMode true and the category set', () => {
    // Arrange
    const category: Category = { category_id: '1', category_name: 'Math', admin_id: 'a1' };

    // Act
    component.openUpdateCategoryForm(category);

    // Assert
    expect(component.showCategoryForm).toBeTrue();
    expect(component.editMode).toBeTrue();
    expect(component.category).toBe(category);
  });

  it('should close category form', () => {
    // Arrange - form is open
    component.showCategoryForm = true;

    // Act
    component.closeCategoryForm();

    // Assert
    expect(component.showCategoryForm).toBeFalse();
  });
});

// END AI-generated - Cursor Composer
