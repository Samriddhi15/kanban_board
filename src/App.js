import React, { useEffect, useState } from "react";
import './App.css';
import Navbar from "./Components/Navbar/Navbar";
import Board from "./Components/Board/Board";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faSignal, faMinusCircle } from '@fortawesome/free-solid-svg-icons';

function App() {
  const initialGroupingOption = localStorage.getItem('groupBy') || "status";
  const initialSortingOption = localStorage.getItem('sortBy') || "priority";

  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupingOption, setGroupingOption] = useState(initialGroupingOption);
  const [sortingOption, setSortingOption] = useState(initialSortingOption);

  const priorityLabels = {
    0: {
    label: "No Priority",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.9"
          d="M4.5 7.34375H2.75C2.50838 7.34375 2.3125 7.53963 2.3125 7.78125V8.21875C2.3125 8.46037 2.50838 8.65625 2.75 8.65625H4.5C4.74162 8.65625 4.9375 8.46037 4.9375 8.21875V7.78125C4.9375 7.53963 4.74162 7.34375 4.5 7.34375Z"
          fill="#5E5E5F"
        />
        <path
          opacity="0.9"
          d="M8.875 7.34375H7.125C6.88338 7.34375 6.6875 7.53963 6.6875 7.78125V8.21875C6.6875 8.46037 6.88338 8.65625 7.125 8.65625H8.875C9.11662 8.65625 9.3125 8.46037 9.3125 8.21875V7.78125C9.3125 7.53963 9.11662 7.34375 8.875 7.34375Z"
          fill="#5E5E5F"
        />
        <path
          opacity="0.9"
          d="M13.25 7.34375H11.5C11.2584 7.34375 11.0625 7.53963 11.0625 7.78125V8.21875C11.0625 8.46037 11.2584 8.65625 11.5 8.65625H13.25C13.4916 8.65625 13.6875 8.46037 13.6875 8.21875V7.78125C13.6875 7.53963 13.4916 7.34375 13.25 7.34375Z"
          fill="#5E5E5F"
        />
      </svg>
    ),
  },
  1: {
    label: "Urgent",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 1C1.91067 1 1 1.91067 1 3V13C1 14.0893 1.91067 15 3 15H13C14.0893 15 15 14.0893 15 13V3C15 1.91067 14.0893 1 13 1H3ZM7 4H9L8.75391 8.99836H7.25L7 4ZM9 11C9 11.5523 8.55228 12 8 12C7.44772 12 7 11.5523 7 11C7 10.4477 7.44772 10 8 10C8.55228 10 9 10.4477 9 11Z"
          fill="#FB773F"
        />
      </svg>
    ),
  },
   4: {
    label: "High",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.5 8H2.5C1.94772 8 1.5 8.44772 1.5 9V13C1.5 13.5523 1.94772 14 2.5 14H3.5C4.05228 14 4.5 13.5523 4.5 13V9C4.5 8.44772 4.05228 8 3.5 8Z"
          fill="#5C5C5E"
        />
        <path
          d="M8.5 5H7.5C6.94772 5 6.5 5.44772 6.5 6V13C6.5 13.5523 6.94772 14 7.5 14H8.5C9.05228 14 9.5 13.5523 9.5 13V6C9.5 5.44772 9.05228 5 8.5 5Z"
          fill="#5C5C5E"
        />
        <path
          d="M13.5 2H12.5C11.9477 2 11.5 2.44772 11.5 3V13C11.5 13.5523 11.9477 14 12.5 14H13.5C14.0523 14 14.5 13.5523 14.5 13V3C14.5 2.44772 14.0523 2 13.5 2Z"
          fill="#5C5C5E"
        />
      </svg>
    ),
  },

   3: {
    label: "Medium",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.5 8H2.5C1.94772 8 1.5 8.44772 1.5 9V13C1.5 13.5523 1.94772 14 2.5 14H3.5C4.05228 14 4.5 13.5523 4.5 13V9C4.5 8.44772 4.05228 8 3.5 8Z"
          fill="#5C5C5E"
        />
        <path
          d="M8.5 5H7.5C6.94772 5 6.5 5.44772 6.5 6V13C6.5 13.5523 6.94772 14 7.5 14H8.5C9.05228 14 9.5 13.5523 9.5 13V6C9.5 5.44772 9.05228 5 8.5 5Z"
          fill="#5C5C5E"
        />
        <path
          d="M13.5 2H12.5C11.9477 2 11.5 2.44772 11.5 3V13C11.5 13.5523 11.9477 14 12.5 14H13.5C14.0523 14 14.5 13.5523 14.5 13V3C14.5 2.44772 14.0523 2 13.5 2Z"
          fill="#5C5C5E"
          fill-opacity="0.4"
        />
      </svg>
    ),
  },
  2: {
    label: "Low",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.5 8H2.5C1.94772 8 1.5 8.44772 1.5 9V13C1.5 13.5523 1.94772 14 2.5 14H3.5C4.05228 14 4.5 13.5523 4.5 13V9C4.5 8.44772 4.05228 8 3.5 8Z"
          fill="#5C5C5E"
        />
        <path
          d="M8.5 5H7.5C6.94772 5 6.5 5.44772 6.5 6V13C6.5 13.5523 6.94772 14 7.5 14H8.5C9.05228 14 9.5 13.5523 9.5 13V6C9.5 5.44772 9.05228 5 8.5 5Z"
          fill="#5C5C5E"
          fill-opacity="0.4"
        />
        <path
          d="M13.5 2H12.5C11.9477 2 11.5 2.44772 11.5 3V13C11.5 13.5523 11.9477 14 12.5 14H13.5C14.0523 14 14.5 13.5523 14.5 13V3C14.5 2.44772 14.0523 2 13.5 2Z"
          fill="#5C5C5E"
        />
      </svg>
    ),
  },

  };

  const userLabels = users.reduce((labels, user) => {
    const nameParts = user.name.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts[1] : '';
    const firstLetterFirstName = firstName.charAt(0).toUpperCase();
    const firstLetterLastName = lastName.charAt(0).toUpperCase();
    const randomColor = getRandomColor();

    labels[user.id] = (
      <div className="user-label">
        <div
          className="user-pic"
          style={{
            backgroundColor: randomColor,
          }}
        >
          {firstLetterFirstName}
          {lastName && ` ${firstLetterLastName}`}
        </div>
        {user.name}
      </div>
    );
    return labels;
  }, {});

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  useEffect(() => {
    getDetails();
  }, []);

  useEffect(() => {
    localStorage.setItem('groupBy', groupingOption);
    localStorage.setItem('sortBy', sortingOption);
  }, [groupingOption, sortingOption]);

  async function getDetails() {
    try {
      const { data } = await axios.get("https://api.quicksell.co/v1/internal/frontend-assignment");
      setTickets(data.tickets);
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const organizeTickets = () => {
    if (groupingOption === 'priority') {
      const priorityStatus = {
        0: [], // No Priority
        1: [], // Urgent
        4: [], // High
        3: [], // Medium
        2: [], // Low
      };

      tickets.forEach(ticket => {
        if (priorityStatus[ticket.priority] !== undefined) {
          priorityStatus[ticket.priority].push(ticket);
        }
      });

      return priorityStatus;
    }

    if (groupingOption === 'status') {
      const ticketStatus = {
        "Backlog": [],
        "Todo": [],
        "In progress": [],
        "Done": [],
        "Cancelled": []
      };

      tickets.forEach(ticket => {
        if (ticketStatus[ticket.status]) {
          ticketStatus[ticket.status].push(ticket);
        }
      });

      return ticketStatus;
    }

    if (groupingOption === 'user') {
      const userStatus = {};

      tickets.forEach(ticket => {
        if (userStatus[ticket.userId]) {
          userStatus[ticket.userId].push(ticket);
        } else {
          userStatus[ticket.userId] = [ticket];
        }
      });

      return userStatus;
    }

    return {};
  };

  const sortByPriority = (tickets) => {
    const priorityOrder = [0, 1, 4, 3, 2];
    return [...tickets].sort((a, b) => {
      return priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
    });
  };

  const sortByTitle = (tickets) => {
    return [...tickets].sort((a, b) => a.title.localeCompare(b.title));
  };

  const handleSortingChange = (event) => {
    setSortingOption(event.target.value);
  };

  const handleGroupingChange = (event) => {
    setGroupingOption(event.target.value);
  };

  const sortedTickets = (tickets) => {
    const sortingFunctions = {
      priority: sortByPriority,
      title: sortByTitle,
    };

    const sortingFunction = sortingFunctions[sortingOption];

    if (sortingFunction) {
      return sortingFunction(tickets);
    }

    return tickets;
  };

  const boards = organizeTickets();

  return (
    <div className="app-container">
      <div className="app-navbar">
        <nav>
          <Navbar
            sortingOption={sortingOption}
            onSortingChange={handleSortingChange}
            groupingOption={groupingOption}
            onGroupingChange={handleGroupingChange}
          />
        </nav>
      </div>
      <div className="app-outer-container">
        <div className="app-boards">
          {groupingOption === 'priority'
            ? [0, 1, 4, 3, 2].map(priorityKey => (
                <Board
                  key={priorityKey}
                  title={
                    <div className="priority-label">
                      {priorityLabels[priorityKey].icon}
                      <span>{priorityLabels[priorityKey].label}</span>
                    </div>
                  }
                  count={boards[priorityKey]?.length || 0}
                  tickets={sortedTickets(boards[priorityKey] || [])}
                  sortingOption={sortingOption}
                  groupingOption={groupingOption}
                  users={users}
                />
              ))
            : Object.keys(boards).map(boardKey => (
                <Board
                  key={boardKey}
                  title={
                    groupingOption === "user"
                      ? userLabels[boardKey]
                      : boardKey
                  }
                  count={boards[boardKey].length}
                  tickets={sortedTickets(boards[boardKey])}
                  sortingOption={sortingOption}
                  groupingOption={groupingOption}
                  users={users}
                />
              ))}
        </div>
      </div>
    </div>
  );
}

export default App;
