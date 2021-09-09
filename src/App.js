import "./App.css";
import LoginContainer from "./container/LoginContainer";
import DeviceContainer from "./container/DeviceContainer";

import { BrowserRouter as Router, Route } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={LoginContainer} />
        <Route path="/device" component={DeviceContainer} />
      </Router>
    </div>
  );
}
