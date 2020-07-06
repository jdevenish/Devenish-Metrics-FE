import React, { useEffect, useState } from "react";
import "./styles.css";
import {browserDetection} from "./services/metric-collection";
import {getLocationData} from "./services/api-helper-geoLocation";
import {sendMetrics} from "./services/api-helper-sendReceiveMetrics";


export default function App() {
  const [logged, setLogged] = useState(false);

  useEffect( () => {
    getLocationData().then(locale => {
      browserDetection().then(browser => {
        let visitorData = {
          loadTime: {
            time: window.performance.timing.domContentLoadedEventEnd-window.performance.timing.navigationStart,
            date: Date.now()
          },
          screenWidth: screen.width,
          geolocation: locale,
          deviceType: browser
        };
        sendMetrics(visitorData).then(metrics => {
          console.log(`sendMetrics return: ${metrics}`)
        }).catch(error => {
          console.error(error);
        })
        setLogged(true)
      }).catch(error => {
        console.error(error);
      })
    }).catch(error => {
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
