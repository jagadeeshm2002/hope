import logo from "./logo.svg";
import "./App.css";
import { Button } from "@material-tailwind/react";
import { Header } from "./components/header";

function App() {
  return (
    <div className="App">
      <Header/>
      <Button>Button</Button>
    </div>
  );
}

export default App;
