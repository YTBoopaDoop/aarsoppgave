import React from 'react-chat-engine';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import Chats from "./Chats";
import Login from "./login";




function App() {
  return (
    <div style={{ fontFamily: 'Avenir' }}>
      <Router>
        {<AuthProvider>
          <Switch>
            {<Route path="/chats" component={Chats} />}
            <Route path="/" component={Login} />
          </Switch>
        </AuthProvider>}
      </Router>
    </div>
  )
}




export default App