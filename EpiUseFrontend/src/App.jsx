import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import LoginPanel from "./components/LoginPanel";
self.$RefreshReg$ = () => {};
self.$RefreshSig$ = () => () => {};

function App() {
  //const [count, setCount] = useState(0)
  return (
    <div>
      <LoginPanel></LoginPanel>
    </div>
  );
}

export default App;
