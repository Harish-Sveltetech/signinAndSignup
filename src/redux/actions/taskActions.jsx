
import axios from "axios";

export const fetchTasks = () => async (dispatch) => {
  const response = await axios.get("http://localhost:3001/tasks");
  dispatch({ type: "FETCH_TASKS_SUCCESS", payload: response.data });
};

export const addTask = (task) => async (dispatch) => {
  const response = await axios.post("http://localhost:3001/tasks", task);
  dispatch({ type: "ADD_TASK_SUCCESS", payload: response.data });
};

export const deleteTask = (taskId) => async (dispatch) => {
  await axios.delete(`http://localhost:3001/tasks/${taskId}`);
  dispatch({ type: "DELETE_TASK_SUCCESS", payload: taskId });
};
