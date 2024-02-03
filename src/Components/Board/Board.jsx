import React from "react";
import "./Board.css";

const Board = () => {
  const dummyUser = {
    userId: 'user123',
    userName: 'John Doe',
    userRole: 'Developer',
  };

  // Dummy task data
  const dummyTasks = [
    {
      taskId: 'task001',
      teamId: 'team123',
      taskName: 'TSK-1',
      taskDescription: 'This is the description for Task 1. I have no clue what to do with this bug but well I got you and the intern',
      dueDate: '2024-02-02T12:00:00',
      priority: 'High',
      assignedTo: 'John Doe',
      taskStatus: 'pending',
      user: dummyUser,
    },

    {
      taskId: 'task004',
      teamId: 'team123',
      taskName: 'TSK-4',
      taskDescription: 'This is the description for Task 1.',
      dueDate: '2024-02-02T12:00:00',
      priority: 'High',
      assignedTo: 'John Doe',
      taskStatus: 'pending',
      user: dummyUser,
    },

    {
      taskId: 'task002',
      teamId: 'team123',
      taskName: 'TSK-2',
      taskDescription: 'This is the description for Task 2. well whta counts is that all this are now dynamic',
      dueDate: '2024-02-03T14:30:00',
      priority: 'Medium',
      assignedTo: 'John Doe',
      taskStatus: 'wip',
      user: dummyUser,
    },
    {
      taskId: 'task003',
      teamId: 'team123',
      taskName: 'TSK-3',
      taskDescription: 'This is the description for Task 3. shitty like but well its somthing ',
      dueDate: '2024-02-04T09:45:00',
      priority: 'Low',
      assignedTo: 'John Doe',
      taskStatus: 'backlog',
      user: dummyUser,
    },
    {
      taskId: 'task004',
      teamId: 'team123',
      taskName: 'TSK-4',
      taskDescription: 'This is the description for Task 4.',
      dueDate: '2024-02-05T11:15:00',
      priority: 'High',
      assignedTo: 'John Doe',
      taskStatus: 'closed',
      user: dummyUser,
    },
  ];

  const renderTasksByStatus = (status) => {
    const filteredTasks = dummyTasks.filter(task => task.taskStatus === status);

    return filteredTasks.map(task => (
      <div key={task.taskId} className="task-card" >
        <div className ="task-card-header" >
        <div> {task.taskName} </div>
        <div> {task.dueDate} </div>
         </div>
       
        <div> {task.taskDescription} </div>
        
        <div className ="task-card-footer" >
        <div> {task.priority} </div>
        <button>Close</button>
         </div>
       
      </div>
    ));
  };

  return (
    <div className="tasks-container">
      <div className="pending-container">
        <h2>Pending Tasks</h2>
        {renderTasksByStatus('pending')}
      </div>

      <div className="wip-container">
        <h2>Work in Progress</h2>
        {renderTasksByStatus('wip')}
      </div>
      <div className="backlog-container">
        <h2>Backlog</h2>
        {renderTasksByStatus('backlog')}
      </div>

      {/* <div className="closed-container">
        <h2>Closed Tasks</h2>
        {renderTasksByStatus('closed')}
      </div> */}

    </div>
  );
};

export default Board;
