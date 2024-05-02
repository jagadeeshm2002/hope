import logo from "./logo.svg";
import "./App.css";
import { Button } from "@material-tailwind/react";
import { Header } from "./components/header";
import { Footer } from "./components/footer";

function App() {
  return (
    <div className="App">
      <Header/>
      <Button>Button</Button>
      <Footer/>
    </div>
  );
}

export default App;
