// This page is hard coded for now

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getRecordById } from "../global/firebaseFunctions";
import GreenBorderCase from "./components/GreenBorderCase";
import BatteryComponent from "./components/BatteryComponent";
import GreyContainer from "./components/GreyContainer";
import Chart from "./components/Chart";

import './highlevelcomponents/summarypg.css';
import Homepage from './highlevelcomponents/homepage';

function StationMonitoring() {
  const location = useLocation();

  const [stationInfo, setStationInfo] = useState(null);
  const [valuesArray, setValuesArray] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  const fetchObtainedState = async () => {
    try {
      const obtainedState = await getRecordById(
        "Station",
        location.state.station
      );
      setStationInfo(obtainedState);

      const normalMonthOrder = Object.keys({
        January: 0,
        February: 1,
        March: 2,
        April: 3,
        May: 4,
        June: 5,
        July: 6,
        August: 7,
        September: 8,
        October: 9,
        November: 10,
        December: 11,
      })
        .map((month) => [month, obtainedState.pastSwaps[month]])
        .reduce((acc, [month, value]) => {
          acc[month] = value;
          return acc;
        }, {});

      setValuesArray(Object.values(normalMonthOrder));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchObtainedState();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Use an IIFE to make the useEffect function asynchronous
      fetchObtainedState();
    }, process.env.REACT_APP_FETCH_RATE); // 5 seconds in milliseconds
  });

  return (
   
    <div className="summary-page">
    <Homepage />
    <h1 className="heading">Station Monitoring</h1>
    <div style={{marginTop:200}}/>
      {stationInfo ? (
        <div style={{ display: "flex", flexDirection: "row", justifyContent:'center', alignItems:'center' }}>
          <div style={{ marginRight: "20px" }}>
            {" "}
            {/* Added margin for spacing */}
            <div style={{ marginTop: "20px", marginBottom:"30px", fontSize: 45, fontWeight:'bold', color:"#285a84" }}>
                  Station: {location.state.station}
            </div>
            <GreenBorderCase
              initialWidth={500}
              initialHeight={450}
              thickness={7}
            >
              <div style={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
                {Object.keys(stationInfo.batterySlots).map((slotKey, index) => (
                  <div
                    style={{
                      width: "25%",
                      boxSizing: "border-box",
                      padding: "10px",
                    }}
                    key={slotKey}
                  >
                    <BatteryComponent
                      charge={stationInfo.batterySlots[slotKey].charge}
                      batteryNumber={slotKey}
                      timeHoursLeft={
                        stationInfo.batterySlots[slotKey].TimeToFullCharge.hours
                      }
                      timeMinutesLeft={
                        stationInfo.batterySlots[slotKey].TimeToFullCharge.remainingMinutes
                      }
                    />
                  </div>
                ))}
              </div>
            </GreenBorderCase>
        
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ marginBottom: "20px" }}>
              {" "}
              {/* Added margin for spacing */}
              <GreyContainer width={425} height={100} thickness={7}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop:10
                    }}
                  >
                    <span style={{ fontWeight: "bold", color: "#000" }}>
                      Number of Swaps This month:
                    </span>
                    <span style={{ color: "#000", marginLeft: 10 }}>
                      {stationInfo.swapsThisMonth}
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop:10
                    }}
                  >
                    <span style={{ fontWeight: "bold", color: "#000" }}>
                      Number of Swaps Today:
                    </span>
                    <span style={{ color: "#000", marginLeft: 10 }}>
                      {stationInfo.swapsToday}
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop:10
                    }}
                  >
                    <span style={{ fontWeight: "bold", color: "#000" }}>
                      Number of Swaps In Total:
                    </span>
                    <span style={{ color: "#000", marginLeft: 10 }}>
                      {stationInfo.totalSwaps}
                    </span>
                  </div>
                </div>
              </GreyContainer>
            </div>
            <Chart data={valuesArray} />
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default StationMonitoring;
