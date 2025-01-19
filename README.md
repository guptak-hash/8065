# 8065


# Task Management App


This is a simple task management application that allows users to add tasks, assign them to employees, mark them as completed, and update their status. The app utilizes React's useReducer hook for state management and interacts with Firebase Realtime Database for data storage.

# Features

1.Add New Tasks: Users can input a task description and set its priority and assignee.
2.Assign Employees: Tasks can be assigned to employees from a predefined list.
3.Toggle Task Completion: Users can mark tasks as completed, which updates their status and completion time.
4.Delete Tasks: Users can remove tasks from the list.
5.Priority Levels: Tasks can have different priority levels ranging from critical to low.
6.Real-time Database Integration: The app interacts with Firebase to store and fetch task data.


# Tech Stack

1.React: For building the user interface.
2.Firebase: For real-time data storage and retrieval.
3.JavaScript: ES6 features like useState, useEffect, and useReducer for managing state and side effects.

# Installation

To run this project locally, follow these steps:

1. Clone the repository:
  git clone <repository_url>
cd <project_folder>

2. Install dependencies:
    npm install

3. Start the development server:
    npm start
The app should now be running at http://localhost:3000.


# Firebase Setup
To set up Firebase Realtime Database, follow these steps:

1. Go to Firebase Console.
2. Create a new Firebase project.
3. Set up Firebase Realtime Database and get your project configuration.
4. Replace the Firebase configuration in your project with the credentials provided by Firebase.


# Usage
1. Add Task: Enter a task in the input field, set the priority level and assign an employee from the dropdown, then click "Submit."
2. Toggle Task Completion: Click the checkbox next to a task to mark it as completed or pending.
3. Reassign Task: Use the "Reassign" dropdown to assign a different employee to a task.
4. Delete Task: Click the "Delete" button to remove a task from the list.



# State Management
The application uses the useReducer hook for managing the state of tasks. The state is modified through the following actions:

ADD_TODO: Adds a new task to the state.
SET_TODOS: Loads tasks from the Firebase database into the state.
DELETE_TODO: Removes a task from the state.
ASSIGN_EMPLOYEE: Assigns an employee to a task.
TOGGLE_COMPLETE: Marks a task as completed or pending.


