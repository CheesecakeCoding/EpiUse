import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import ListGroup from "./components/ListGroup";
import LoginPanel from "./components/LoginPanel";
import Register from "./components/Register";

function App() {
  //const [count, setCount] = useState(0)
  return (
    <div>
      <LoginPanel></LoginPanel>
    </div>
  );
}

export default App;
