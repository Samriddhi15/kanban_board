Interactive Kanban Board Application

This project is a responsive and interactive Kanban board application built using React JS. It dynamically fetches data from an API and allows users to group and sort tickets in various ways. The application's state is preserved even after page reload, ensuring a seamless user experience.

Features

Grouping Options

Users can group tickets dynamically based on the following:

By Status: Group tickets based on their current status.

By User: Arrange tickets according to the assigned user.

By Priority: Group tickets based on their priority level.

Sorting Options

Users can sort the tickets displayed in the Kanban board:

By Priority: Tickets are arranged in descending order of priority.

By Title: Tickets are sorted in ascending order by their title.

Priority Levels

The tickets are assigned one of the following priority levels (retrieved from the API):

4 - Urgent

3 - High

2 - Medium

1 - Low

0 - No priority

Additional Features

State Persistence: The selected view state is saved and restored after page reload.

Responsive Design: The Kanban board adjusts dynamically for various screen sizes and devices.

Visually Appealing UI: A clean and intuitive design inspired by provided screenshots.

Technologies Used

React JS for the frontend

API Integration: Data is fetched from QuickSell API

CSS for styling and responsiveness

Installation

Follow these steps to set up and run the application locally:

Clone the Repository

git clone <repository-url>
cd <repository-name>

Install Dependencies

npm install

Start the Development Server

npm start

Access the Application
Open your browser and navigate to http://localhost:3000.

API Integration

The application fetches data from the following API endpoint:

Endpoint: https://api.quicksell.co/v1/internal/frontend-assignment

Data: The API provides ticket details such as status, assigned user, priority level, and title.

Application Flow

Display Button: Users click the "Display" button to fetch and display tickets.

Grouping Options: Select a grouping option to reorganize the Kanban board.

Sorting Options: Apply sorting to reorder tickets within the selected group.

State Persistence: The application retains the grouping and sorting state even after a page refresh.

File Structure

src/
|-- components/
|   |-- KanbanBoard.js   # Main Kanban board component
|   |-- Ticket.js        # Individual ticket component
|   |-- Header.js        # Header with buttons and controls
|
|-- utils/
|   |-- api.js           # API calls and data fetching
|   |-- helpers.js       # Utility functions for grouping and sorting
|
|-- App.js               # Main application component
|-- index.js             # Application entry point




Future Enhancements

Add drag-and-drop functionality for rearranging tickets.

Implement search functionality to filter tickets by keywords.

Provide dark mode support.

License

This project is licensed under the MIT License. Feel free to use and modify it as per your needs.

Author

Developed by Samriddhi Meena.

For any queries or suggestions, feel free to contact me at samriddhi6355@gmail.com.

