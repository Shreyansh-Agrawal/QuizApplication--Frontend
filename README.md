# Smart Quiz - Quiz Management System

Smart Quiz is a comprehensive quiz management system built using Angular. It facilitates quiz creation, management, and participation, catering to users with different roles such as superadmin, admin, and player.

## Deployment

The application is deployed and accessible on https://smartquiz-shreyansh.netlify.app

## Demo

https://github.com/Shreyansh-Agrawal/QuizApplication--Frontend/assets/72445442/ab3a78fd-5446-49ce-be25-af93101e4d4d

## Features

### Super-admin
- Create, read, and delete admins
- View players
- View categories

### Admin
- CRUD operations on categories
- CRUD operations on questions
- View and delete players
- Download/Upload quiz data

### Player
- View leaderboard
- View own scores
- Take quizzes

### Common Features
- Update profile and password
- View leaderboard
- View categories

## Screens

- **User-list**: Displays lists of admins and players with delete and create options.
- **Category list**: Allows CRUD operations on categories. Users can start quizzes by clicking on category cards.
- **Question list**: Enables CRUD operations on questions with a submit button for each question.
- **User profile**: Provides options to update password and profile information.
- **Leaderboard**: Displays the leaderboard.
- **Past scores screen**: Shows past scores.
- **Quiz question**: Component for playing quizzes.

## Folder Structure

- **core**: Contains core functionalities such as guards, interceptors, and services.
  - **guards**: Route guards to secure routes.
  - **interceptors**: HTTP interceptors for handling requests and responses.
  - **services**: Core services used throughout the application.

- **shared**: Contains shared components, constants, models, and pipes.
  - **components**: Reusable UI components.
  - **constants**: Constants and configuration files.
  - **models**: Shared data models.
  - **pipes**: Custom pipes for data transformation.

- **modules**: Contains feature modules for different functionalities.
  - **auth**: Manages authentication.
  - **category**: Handles categories and quizzes.
  - **question**: Manages questions.
  - **quiz**: Handles quizzes and scores.
  - **user**: Manages user profiles and lists.

## Additional Details

- **Styling**: Utilizes ng prime for CSS components and icons.
- **Performance**: Implements lazy loading and a custom preload strategy based on users' internet speed.
- **Security**: Implements route guards to secure routes and ensure user authentication.

## Installation

To run the project locally:

1. Clone the repository using `git clone https://github.com/Shreyansh-Agrawal/QuizApplication--Frontend.git`
2. Install dependencies using `npm install`.
3. Run the development server using `ng serve`.

## Testing

### Running Unit Tests

The project uses **Jasmine + Karma** for unit testing with **144 tests** covering services, guards, interceptor, pipe, and all components.

**Run all tests in headless mode (quick verification):**
```bash
npm test -- --no-watch --browsers=ChromeHeadless
```

**Run tests in watch mode (development):**
```bash
npm test
```
Opens Chrome with Jasmine UI, watches files, auto-reruns on changes.

**Run tests with code coverage:**
```bash
npm test -- --code-coverage
```
Generates coverage report in `coverage/` folder.

**Run specific test file:**
```bash
npm test -- --include='**/user-role.service.spec.ts'
```

### Test Coverage

| Category | Files | Tests | What's Covered |
|----------|-------|-------|----------------|
| Core Services | 1 | 16 | JWT decoding, role mapping, login status |
| Core Interceptor | 1 | 3 | Token header injection logic |
| Core Guards | 5 | 11 | Role-based route access control |
| Shared Pipe | 1 | 6 | String truncation logic |
| Question Service | 1 | 9 | Data transformation utilities |
| Components | 20 | 99 | Role checks, form logic, data filtering |

### Angular Unit Testing Guide (For Beginners)

#### The Stack
- **Jasmine** - Assertion framework (provides `describe()`, `it()`, `expect()`)
- **Karma** - Test runner (launches browser, executes tests)
- **TestBed** - Angular's test utility that creates a mini module per test

#### Basic Test Structure

```typescript
describe('ClassName', () => {           // Test suite
  let thing: Thing;
  
  beforeEach(() => {                    // Setup runs before each test
    thing = new Thing();
  });
  
  it('should do something', () => {     // Individual test case
    // Arrange - setup test data
    const input = 'test';
    
    // Act - call the method under test
    const result = thing.doSomething(input);
    
    // Assert - verify the result
    expect(result).toBe('expected');
  });
});
```

#### Common Assertions
- `expect(x).toBe(y)` - Identity check (===)
- `expect(x).toEqual(y)` - Deep equality for objects/arrays
- `expect(x).toBeTrue()` / `toBeFalse()` - Boolean checks
- `expect(x).toBeNull()` / `toBeUndefined()` - Null/undefined checks
- `expect(arr).toContain(item)` - Array membership
- `expect(spy).toHaveBeenCalled()` - Mock verification

#### Testing Pure Functions (No TestBed)

For services with no dependencies or pipes:

```typescript
describe('MyPipe', () => {
  let pipe: MyPipe;
  
  beforeEach(() => {
    pipe = new MyPipe();  // Direct instantiation
  });
  
  it('should transform value', () => {
    expect(pipe.transform('input')).toBe('output');
  });
});
```

#### Testing Components/Services with Dependencies (Use TestBed)

```typescript
describe('MyComponent', () => {
  let component: MyComponent;
  let fixture: ComponentFixture<MyComponent>;
  let mockService: jasmine.SpyObj<MyService>;
  
  beforeEach(async () => {
    // Create mocks for dependencies
    mockService = jasmine.createSpyObj('MyService', ['getData']);
    
    // Configure a mini Angular module
    await TestBed.configureTestingModule({
      declarations: [MyComponent],
      imports: [FormsModule],                   // If component uses forms
      providers: [
        { provide: MyService, useValue: mockService }
      ],
      schemas: [NO_ERRORS_SCHEMA]               // Ignore unknown child components
    }).compileComponents();
  });
  
  beforeEach(() => {
    fixture = TestBed.createComponent(MyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();  // Triggers ngOnInit
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

#### Creating and Using Mocks

**Create spy object (mock):**
```typescript
mockService = jasmine.createSpyObj('ServiceName', ['method1', 'method2']);
```

**Configure return values:**
```typescript
mockService.getData.and.returnValue('fake data');
mockService.getUsers.and.returnValue(of([user1, user2]));  // For Observables
```

**Mock Subjects (reactive streams):**
```typescript
const dataSubject = new Subject<string>();
(mockService as any).data$ = dataSubject;

// Later: emit values
dataSubject.next('new data');
```

**Verify mock was called:**
```typescript
expect(mockService.getData).toHaveBeenCalled();
expect(mockService.getData).toHaveBeenCalledWith('arg1', 'arg2');
expect(mockService.getData).toHaveBeenCalledTimes(2);
```

**Spy on component methods:**
```typescript
spyOn(component, 'myMethod').and.returnValue(5);
spyOn(component.closeForm, 'emit');  // For EventEmitters
```

#### Testing Guards

Guards use functional style with `inject()`:

```typescript
const result = TestBed.runInInjectionContext(() => 
  authGuard(mockRoute, mockState)
);
expect(result).toBeTrue();
```

#### Testing Interceptors

```typescript
const request = new HttpRequest('GET', 'https://api.com', null);
const mockHandler = jasmine.createSpyObj('HttpHandler', ['handle']);
mockHandler.handle.and.returnValue(of({} as HttpEvent<any>));

interceptor.intercept(request, mockHandler);

const clonedReq = mockHandler.handle.calls.mostRecent().args[0];
expect(clonedReq.headers.get('Authorization')).toBe('Bearer token');
```

#### What to Test

**Focus on testing:**
- Pure logic and utility functions
- Branching logic (if/switch/ternary)
- Security-critical code (guards, auth)
- Data transformations
- Role-based checks

**Skip testing:**
- Empty components with no logic
- HTTP boilerplate (subscribe patterns)
- Simple getters/setters
- Type definitions
- Configuration files

#### Key Angular Testing Concepts

- **fixture.detectChanges()** - Triggers change detection (renders template, runs ngOnInit)
- **NO_ERRORS_SCHEMA** - Ignores unknown HTML elements in templates (avoids importing all UI libraries)
- **FormsModule** - Required when template uses `#formName="ngForm"`
- **Test isolation** - Each test should be independent; use `beforeEach()` to reset state
