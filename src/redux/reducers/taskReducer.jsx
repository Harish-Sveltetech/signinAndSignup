// src/reducers/taskReducer.js
const initialState = {
    tasks: [],
  };
  
  const taskReducer = (state = initialState, action) => {
    switch (action.type) {
      case "FETCH_TASKS_SUCCESS":
        return { ...state, tasks: action.payload };
      case "ADD_TASK_SUCCESS":
        return { ...state, tasks: [...state.tasks, action.payload] };
      case "DELETE_TASK_SUCCESS":
        return { ...state, tasks: state.tasks.filter((task) => task.id !== action.payload) };
      default:
        return state;
    }
  };
  
  export default taskReducer;
  