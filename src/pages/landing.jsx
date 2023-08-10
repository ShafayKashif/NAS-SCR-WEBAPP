import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";

import { createOrUpdateRecord, getRecords } from "../global/firebaseFunctions";
import { where } from "firebase/firestore";
import { auth } from "../config/firebase";
import "./highlevelcomponents/summarypg.css";
import Homepage from "./highlevelcomponents/homepage";

import rickshawImage from "./assets/img/rickshaw.png";
import batteryImage from "./assets/img/battery.png";
import bellImage from "./assets/img/bell.png";
import finImage from "./assets/img/fin.png";

function Landing() {
  // Backend code for the landing page goes here
  const [formData, setFormData] = useState({
    fare: 0,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      // Add your submission logic here
      console.log(formData);
      // You can send the data to your server or handle the submission as needed
      createOrUpdateRecord("Day Fare", "Fare", formData);
    } catch (err) {
      setError(err);
    }
  };

  const [stationsInfo, setStationsInfo] = useState(null);
  const [rickshawInfo, setRickshawInfo] = useState(null);
  const [technicalBss, setTechnicalBss] = useState(null);
  const [technicalDriver, setTechnicalDriver] = useState(null);

  const calculateTotalTrees = () => {
    if (rickshawInfo === null) {
      return 0;
    } else {
      let totalTreesSaved = 0;

      for (const obj of rickshawInfo) {
        totalTreesSaved += obj.treesSaved;
      }

      return totalTreesSaved;
    }
  };

  const calculateTotalDistance = () => {
    if (rickshawInfo === null) {
      return 0;
    } else {
      let totalTreesSaved = 0;

      for (const obj of rickshawInfo) {
        totalTreesSaved += obj.distanceTravelled;
      }

      return totalTreesSaved;
    }
  };

  const fetchObtainedState = async () => {
    try {
      const station = await getRecords("Station");
      const rickshaw = await getRecords("Rickshaw");
      const RequestBss = await getRecords("Technical Support BSS");
      const RequestDriver = await getRecords("Technical Support Driver");

      setStationsInfo(station);
      setRickshawInfo(rickshaw);
      setTechnicalBss(RequestBss);
      setTechnicalDriver(RequestDriver);
      console.log(rickshaw);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchObtainedState();
  }, []);

  return (
    <div className="summary-page">
      <Homepage />
      <h1 className="heading">Dashboard</h1>
      <div style={{ marginTop: 200 }} />
      <Container maxWidth="sm">
        <div className="sub-container center-top" style={{display:'flex', flexDirection:'row'}}>
          <img src={rickshawImage} alt="Image 1" />
          <div class="sub container txt" id="rickshaw-summary" >
            Rickshaw summary
          </div>
          <div>
         
          <div>

          <Typography>Trees Saved: {calculateTotalTrees()}</Typography>
          <Typography>Total distance: {calculateTotalDistance()}</Typography>
          <Typography>
            Total Rickshaws: {rickshawInfo === null ? 0 : rickshawInfo.length}
          </Typography>
          </div>
          </div>
          {/* <p>Rickshaw summary</p> */}
        </div>
        <div className="sub-container center-bottom" style={{display:'flex', flexDirection:'row'}}>
          <img src={batteryImage} alt="Image 2" />
          <div>
          <p>Battery info</p>
          <Typography>
            Total Stations: {stationsInfo === null ? 0 : stationsInfo.length}
          </Typography>
          </div>
        </div>
        <div className="sub-container center-left" style={{display:'flex', flexDirection:'row'}}>
          <img src={bellImage} alt="Image 3" />
          <div>
          <p>Number of support reqs</p>
          <Typography>
            Total Support Requests:{" "}
            {(technicalDriver ? technicalDriver.length : 0) +
              (technicalBss ? technicalBss.length : 0)}{" "}
          </Typography>
          </div>
        </div>
        <div className="sub-container center-right" style={{display:'flex', flexDirection:'row'}}>
          <img src={finImage} alt="Image 4" />
          <div>
          <p>Finances</p>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Fare"
              name="fare"
              value={formData.fare}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="outlined"
              type="number"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </form>
          </div>
        </div>

        <Typography sx={{ color: "red" }}>{error}</Typography>
      </Container>
    </div>
  );
}

export default Landing;
