import { Navigate, Route, Routes} from "react-router-dom";
import Login from "../views/Login/login";
import Signup from "../views/Signup/signup";

function PublicRouter() {
    return (
    <Routes>
        <Route path="/signin" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/*" element={<Navigate to="/signin" />} />
    </Routes>
    
    );
  }

export default PublicRouter;
