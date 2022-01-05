import logo from '../logo.svg';
import '../App.css';
import Dashboard from "./Dashboard";
import {BrowserRouter,Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
        <BrowserRouter basename= {"/mjollnir"}>
            <div >
                <Route exact path="/" component={Dashboard}></Route>

            </div>
        </BrowserRouter>
    </div>
  );
}

export default App;
