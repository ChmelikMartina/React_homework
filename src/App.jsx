import React, { useState, useEffect } from "react";
import "./App.css";
import validateFloat from "./functions/validateFloat";

function App() {
  const [initialFloat, setInitialFloat] = useState(0);

  useEffect(() => {
    let temp = prompt("Set the float number.", 10.1);
    while (!validateFloat(temp)) {
      temp = prompt("Set the float number.", 10.1);
    }
    setInitialFloat(parseFloat(temp));
  }, []);
  return (
    <div className="bg-info-subtle vw-100 vh-100">
      <div className="container bg-warning-subtle">
        <div className="row">
          <div className="col-6"></div>
          <div className="col-6">
            {/* prgbar */}
            {/* vypis */}
            <div className="row">
              <div className="col-6"></div>
              <div className="col-6"></div>
            </div>
            <div className="row">
              <div className="col-6"></div>
              <div className="col-6"></div>
            </div>
            {/* textarea */}
            <div className="row">
              <div className="col-6"></div>
              <div className="col-6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
