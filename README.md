# Smart Quiz - Quiz Management System

Smart Quiz is a comprehensive quiz management system built using Angular. It facilitates quiz creation, management, and participation, catering to users with different roles such as superadmin, admin, and player.

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
