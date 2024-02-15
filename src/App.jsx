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
import TextBox from "./components/TextBox";
import Button from "./components/Button";
import TextArea from "./components/TextArea";
import File from "./components/File";
import saveText from "./functions/saveText";

function App() {
  const scoopMin = 1;
  const scoopMax = 4;
  const initCountDown = 100;
  const [initialFloat, setInitialFloat] = useState(10.1);
  const [flavor, setFlavor] = useState("vanilla");
  const [sprinkles, setSprinkles] = useState([]);
  const [scoop, setScoop] = useState(1);
  const iceCreamTypes = ["creamy", "yogurt", "low-fat"];
  const [iceCreamType, seticeCreamType] = useState("creamy");
  const [diskSpace, setDiskSpace] = useState(50);
  const [countDown, setCountDown] = useState(0);
  const [num2, setNum2] = useState(0);
  const [num1, setNum1] = useState(initialFloat);
  let [sum, setSum] = useState("Enter a float number and press the sum button");
  const [text, setText] = useState("");

  useEffect(() => {
    let temp = prompt("Set the float number.", 10.1);
    while (!validateFloat(temp)) {
      temp = prompt("Set the float number.", 10.1);
    }
    setInitialFloat(parseFloat(temp));
  }, []);

  useEffect(() => {
    if (countDown < initCountDown) {
      const timer = setInterval(() => {
        setCountDown(countDown + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countDown]);

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
      case "txb-number1": {
        setNum1(data);
        break;
      }
      case "txb-number2": {
        setNum2(data);
        break;
      }
      case "txa-text": {
        setText(data);
        break;
      }
      case "file-load": {
        setText(data);
        break;
      }
      default:
        break;
    }
  };

  const handleEvent = (source) => {
    switch (source) {
      case "btn-sum": {
        if (!validateFloat(num1) || !validateFloat(num2)) {
          setSum("Value is NOT valid");
        } else {
          let calc = parseFloat(num1) + parseFloat(num2);
          setSum(`${calc}`);
        }
        break;
      }
      case "btn-download": {
        saveText(text);
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
            <ProgressBar id="pgb-progress" dataIn={countDown} />
            <p>
              Installation is in progress, please wait{" "}
              {initCountDown - countDown} seconds
            </p>
            <div className="row">
              <div className="col-6">
                <TextBox
                  label="Number 1"
                  id="txb-number1"
                  handleData={handleData}
                  dataIn={num1}
                />
              </div>
              <div className="col-6">
                <TextBox
                  label="Number 2"
                  id="txb-number2"
                  handleData={handleData}
                  dataIn={num2}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <Button label="Sum" id="btn-sum" handleEvent={handleEvent} />
              </div>
              <div className="col-6">
                <p>{sum}</p>
              </div>
            </div>
            <TextArea
              id="txa-text"
              label="Text oparetions"
              handleData={handleData}
              height={150}
              dataIn={text}
            />
            <div className="row">
              <div className="col-6">
                <File
                  id="file-load"
                  label="Load text from file"
                  handleData={handleData}
                />
              </div>
              <div className="col-6">
                <Button
                  id="btn-download"
                  label="Download the text file"
                  handleEvent={handleEvent}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
