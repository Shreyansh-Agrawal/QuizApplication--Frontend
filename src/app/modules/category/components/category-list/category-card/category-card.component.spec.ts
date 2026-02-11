// BEGIN AI-generated - Cursor Composer

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CategoryCardComponent } from './category-card.component';
import { UserRoleService } from '../../../../../core/services/user-role.service';
import { Roles } from '../../../../../shared/constants/roles.constants';
import { SliceWordsPipe } from '../../../../../shared/pipes/slice-words.pipe';

// CategoryCardComponent has userRoleIsAdmin() and userRoleIsPlayer() checks
// that control button visibility in the template.

describe('CategoryCardComponent', () => {
  let component: CategoryCardComponent;
  let fixture: ComponentFixture<CategoryCardComponent>;
  let mockUserRoleService: jasmine.SpyObj<UserRoleService>;

  beforeEach(async () => {
    // Create spy for UserRoleService
    mockUserRoleService = jasmine.createSpyObj('UserRoleService', ['getUserRole']);
    mockUserRoleService.getUserRole.and.returnValue(Roles.admin);

    await TestBed.configureTestingModule({
      declarations: [CategoryCardComponent, SliceWordsPipe],
      providers: [
        { provide: UserRoleService, useValue: mockUserRoleService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    // Create the component instance
    fixture = TestBed.createComponent(CategoryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the category-card component', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  // --- userRoleIsAdmin ---

  it('should return true from userRoleIsAdmin when role is admin', () => {
    // Arrange - userRole is set to admin during construction
    component.userRole = Roles.admin;

    // Act
    const result = component.userRoleIsAdmin();

    // Assert
    expect(result).toBeTrue();
  });

  it('should return false from userRoleIsAdmin when role is player', () => {
    // Arrange
    component.userRole = Roles.player;

    // Act
    const result = component.userRoleIsAdmin();

    // Assert
    expect(result).toBeFalse();
  });

  // --- userRoleIsPlayer ---

  it('should return true from userRoleIsPlayer when role is player', () => {
    // Arrange
    component.userRole = Roles.player;

    // Act
    const result = component.userRoleIsPlayer();

    // Assert
    expect(result).toBeTrue();
  });

  it('should return false from userRoleIsPlayer when role is admin', () => {
    // Arrange
    component.userRole = Roles.admin;

    // Act
    const result = component.userRoleIsPlayer();

    // Assert
    expect(result).toBeFalse();
  });
});

// END AI-generated - Cursor Composer
