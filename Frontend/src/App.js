import LoginLayout from "./main_app/userLogin/LoginLayout";
import {Routes, BrowserRouter as Router, Route} from "react-router-dom"
import ProfileSetup from "./main_app/userLogin/ProfileSetup";
import ImageSetup from "./main_app/userLogin/ImageSetup";
import { Helmet } from "react-helmet";
import Dashboard from "./main_app/Dashboard/Dashboard";

function App() {
  return (
    <div>
      <Helmet>
        <title>
          textZone
        </title>
        <meta name="description" content="A Platform To Chat With Your Friends !" />
      </Helmet>

      <Router>
          <Routes>
            <Route element={<LoginLayout />} path="/" />
            <Route element={<ProfileSetup />} path="/profilesetup" />
            <Route element={<ImageSetup />} path="/imagesetup" />
            <Route element={<Dashboard />} path="/dashboard" />

           
          </Routes>
      </Router>

      
    </div>
  );
}

export default App;
