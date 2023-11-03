import React from "react";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Layout from "./Pages/Layout";
import Test from "./Pages/Test";
import { Provider } from "react-redux";
import store from "./store";
import { useDispatch} from "react-redux";
import { useEffect } from 'react';
import Users from "./Pages/Menu/Users";
import WorkType from "./Pages/Menu/Worktype/WorkType";
import AddWorkType from "./Pages/Menu/Worktype/AddWorkType";
import Education from "./Pages/Menu/Education/Education";
import AddEducation from "./Pages/Menu/Education/AddEducation";


function App() {
    const refreshAccessToken = localStorage.getItem("userInfo");
    console.log(refreshAccessToken)
    return (
      <Provider store={store}>
        <div>
          <BrowserRouter>
            <Routes>
              <Route path='login' element={<Login />} />
              <Route path='' element={<Layout />}>
                <Route path='' element={<Dashboard />} />
                <Route path='dashboard' element={<Dashboard />} />
                <Route path='test' element={<Test />} />
                <Route path='users' element={<Users />} />
                <Route path='worktypes' element={<WorkType />} />
                <Route path='add-worktype' element={<AddWorkType />} />
                <Route path='edit-worktype/:id' element={<AddWorkType />} />
                <Route path='education' element={<Education />} />
                <Route path='edit-education/:id' element={<AddEducation />} />
                <Route path='add-education' element={<AddEducation />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      </Provider>
    );
}

export default App;
