import React, { useEffect, useState } from "react";
import "./styles.css";
import {browserDetection, visitorDataObj} from "./services/metric-collection";
import {getLocationData} from "./services/api-helper-geoLocation";
import {sendMetrics} from "./services/api-helper-sendReceiveMetrics";


export default function App() {
  const [logged, setLogged] = useState(false);

  useEffect( () => {
    // Create visitor object with screen width and load time populated
    let visitorData = visitorDataObj;

    // Populate geolocation data
    getLocationData().then(locale => {
      visitorData.geolocation = locale;

      // Populate browser data
      browserDetection().then(browser => {
        visitorData.deviceType = browser;

        // Send complete visitor data to server
        sendMetrics(visitorData).then(metrics => {
          console.log(`sendMetrics return: ${metrics}`)
          setLogged(true)

        }).catch(error => { // end sendMetrics
          console.error(error);
        })  
      }).catch(error => { // end browserDetection
        console.error(error);
      })
    }).catch(error => { // end getLocationData
      console.error(error);
    })
  }, [])

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      {logged ? <h2>Your information has been logged!</h2> : 
      <h2>Your information is being collected!</h2>}
    </div>
  );
}
