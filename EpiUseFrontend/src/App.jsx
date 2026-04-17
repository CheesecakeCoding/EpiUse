//import ListGroup from "./components/ListGroup";

import { useState } from "react";
import Login from "./components/Login";

function App() {
  const [needLogin, setNeedLogin] = useState(true);
  function handleLogin(val) {
    setNeedLogin(val);
  }
  return (
    <>
      <div className="container LoginContainer">
        {needLogin && <Login handleLogin={handleLogin} />}
      </div>
    </>
  );
}

export default App;
