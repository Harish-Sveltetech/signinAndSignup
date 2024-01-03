
import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './store/taskSlice';

const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});

export default store;



// import { createStore, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import taskReducer from "./redux/reducers/taskReducer";
// // import taskReducer from "./reducers/taskReducer";

// const store = createStore(taskReducer, applyMiddleware(thunk));

// export default store;
