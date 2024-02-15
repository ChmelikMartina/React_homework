import React, { useState, useEffect } from "react";
import "./App.css";
import validateFloat from "./functions/validateFloat";
import RbGroup from "./components/RbGroup";
import ChbGroup from "./components/ChbGroup";
import NumImp from "./components/NumImp";
import Select from "./components/Select";
import Range from "./components/Range";
import Clock from "./components/Clock";
import ProgressBar from "./components/ProgressBar";

function App() {
  const scoopMin = 1;
  const scoopMax = 4;
  const [initialFloat, setInitialFloat] = useState(0);
  const [flavor, setFlavor] = useState("vanilla");
  const [sprinkles, setSprinkles] = useState([]);
  const [scoop, setScoop] = useState(1);
  const iceCreamTypes = ["creamy", "yogurt", "low-fat"];
  const [iceCreamType, seticeCreamType] = useState("creamy");
  const [diskSpace, setDiskSpace] = useState(50);

  useEffect(() => {
    let temp = prompt("Set the float number.", 10.1);
    while (!validateFloat(temp)) {
      temp = prompt("Set the float number.", 10.1);
    }
    setInitialFloat(parseFloat(temp));
  }, []);

  const handleData = (data, source) => {
    switch (source) {
      case "rbg-flavor": {
        setFlavor(data);
        break;
      }
      case "chb-sprinkles": {
        setSprinkles(data);
        break;
      }
      case "num-scoop": {
        if (data < scoopMin || data > scoopMax) {
          setScoop(scoopMin);
        } else {
          setScoop(data);
        }
        break;
      }
      case "sel-type": {
        seticeCreamType(data);
        break;
      }
      case "rng-disk": {
        setDiskSpace(data);
        break;
      }
      default:
        break;
    }
  };

  return (
    <div className="bg-info-subtle vw-100 vh-100">
      <div className="container bg-warning-subtle">
        <div className="row">
          <div className="col-6">
            <p>
              Enjoy your ice cream : {flavor}, {scoop} scoop, {iceCreamType}
            </p>
            <RbGroup
              label="Ice cream flavor"
              id="rbg-flavor"
              selectedValue={flavor}
              handleData={handleData}
              dataIn={[
                { label: "vanilla", value: "vanilla" },
                { label: "chocolate", value: "chocolate" },
                { label: "mix", value: "mix" },
              ]}
            />
            <ChbGroup
              label="Ice cream sprinkles"
              id="chb-sprinkles"
              selectedValue={sprinkles}
              handleData={handleData}
              dataIn={[
                { label: "ground walnuts", value: "ground walnuts" },
                { label: "chocolate shavings", value: "chocolate shavings" },
                { label: "caramel flakes", value: "caramel flakes" },
              ]}
            />
            <NumImp
              id="num-scoop"
              label="Scoop of ice cream (max.4)"
              handleData={handleData}
              dataIn={scoop}
            />
            <Select
              label="Type of ice cream"
              id="sel-type"
              dataIn={iceCreamTypes}
              handleData={handleData}
              selectedValue={iceCreamType}
            />
            <Range
              label="Disk space [%]"
              id="rng-disk"
              min="0"
              max="100"
              dataIn={diskSpace}
              handleData={handleData}
            />
            <p>
              Time: <Clock />,{diskSpace} % left on disk
            </p>
          </div>
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
