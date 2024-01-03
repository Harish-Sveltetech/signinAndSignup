
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteTask, updateTask, fetchTasks, selectAllTasks } from '../store/taskSlice';

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectAllTasks);
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [editTask, setEditTask] = useState({ id: null, title: '' });
  const [editTaskTerm, setEditTaskTerm] = useState('');

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddTask = (newTask) => {
    dispatch(addTask(newTask));
    setEditTaskTerm('');
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const handleEditTask = (task) => {
    setIsEdit(true)
    setEditTask({ id: task.id, title: task.title });
  };

  const handleUpdateTask = () => {
    console.log(">>>>>",{ taskId: editTask.id, updatedTask: { title: editTask.title } })
    dispatch(updateTask({ taskId: editTask.id, updatedTask: { title: editTask.title } }));
    setEditTask({ id: null, title: '' });
    setIsEdit(false)
  };

  return (
    <div>
      <h2>Task List</h2>
      <input
        type="text"
        className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
        placeholder="Search Tasks"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul className='py-5'>
        {currentTasks
          .filter((task) => task?.title?.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((task) => (
            <li key={task.id}>
              {task.title}{' '}
              <button onClick={() => handleDeleteTask(task.id)} className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800 ms-5 my-1">Delete</button>{' '}
              <button onClick={() => handleEditTask(task)} className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">Edit</button>
            </li>
          ))}
      </ul>
      {/* <ul className='d-flex flex-row'> */}
        {Array.from({ length: Math.ceil(tasks.length / tasksPerPage) }, (_, index) => (
          <span key={index + 1}>
            &nbsp; &nbsp;<button onClick={() => paginate(index + 1)} className='border-gray-300 rounded-md'>{index + 1}</button>
          </span>
        ))}
      {/* </ul> */}
      {!isEdit && <div className='my-5'>
        <h2>Add Task</h2>
        <input
          type="text"
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
          placeholder="New Task"
          value={editTaskTerm}
          onChange={(e) => (
            setEditTask({ ...editTask, title: e.target.value }),
            setEditTaskTerm(e.target.value)
          )}
        />
        <button onClick={() => handleAddTask(editTask)} className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800 ms-3">Add Task</button>
      </div>}
      <br />
      <br />

      {editTask.id !== null && (
        <div>
          <h2>Edit Task</h2>
          <input
            type="text"
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Edit Task"
            value={editTask.title}
            onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
          />
          <button onClick={handleUpdateTask} className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md ms-3 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">Update Task</button>
        </div>
      )}
    </div>
  );
};

export default TaskList;
