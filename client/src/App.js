import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <BrowserRouter>
    <div className="main">
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/users" element={<Register />} />

          {/* <Route path="/dashboard" element={<Navbar />}/>
          <Route path="/dashboard" element={<Dashboard />}> */}

          {/* </Route> */}
        
        
      </Routes>
      </div>
    </BrowserRouter>

  
      
    
  );
}

export default App;
