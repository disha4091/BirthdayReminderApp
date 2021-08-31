import React,{ useContext } from "react";
import { AuthContext,AuthProvider } from './auth';
import AuthRoute from './util/AuthRoute';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./LoginPage/LoginPage";
import Navbar from "./Navbar/Navbar";
import Form from "../src/Form/Form";
import Lists from "../src/Lists/Lists";
import Reminder from "../src/Reminder/Reminder";
import HomePage from "../src/HomePage/HomePage";
import Profile from "./Profile";
import Footer from "./Footer/Footer" ;
import '../node_modules/bootstrap/dist/css/bootstrap.min.css' ;
function App() {
  const { user, logout } = useContext(AuthContext); 
  var today = new Date(),

    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  return (
    <>
      <div className="App">
        <AuthProvider>
          <Router>
            <Navbar/>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/form" component={Form} />
              <Route path="/lists" component={Lists} />
              <Route path="/reminder" component={Reminder} />
              <Route path="/profile" component={Profile} />
            </Switch>
            <Footer/>
          </Router>
        </AuthProvider>
      </div>






    </>

  );
}

export default App;

