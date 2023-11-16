import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import List from "../views/Users";
import Register from "../views/Users/register";
import Details from "../views/Users/userDetails";
import { StatusError } from "../components/StatusError";

function PageRoutes(props) {
  return (
    <>
      <div
        className={props.show == 'show' ? 'main-content' : 'error-main-content'}
      >    
       <Routes>
          <Route path="/users" element={<List />}/>
          <Route path="/user/details/:userId" element={<Details />} />
          <Route path="/register" element={<Register />}/>
          <Route path="/error" element={<StatusError />} />
          <Route path="/signin" exact element={<Navigate to="/home" />} />
          <Route path="/" exact element={<Navigate to="/home" />} />
          <Route path="/*" exact element={<Navigate to="/error" />} />
        </Routes>
      </div>
    </>
  );
}

export default PageRoutes;
