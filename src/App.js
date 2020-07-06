import React, { useEffect, useState } from "react";
import "./styles.css";
import {browserDetection} from "./services/metric-collection";
import {getLocationData} from "./services/api-helper-geoLocation";
import {sendMetrics} from "./services/api-helper-sendReceiveMetrics";

function BrowserDetection(  ) {
  let deviceType = "";
  if (navigator.userAgent.search("MSIE")>0) {
   deviceType = "IE"
  }else if (navigator.userAgent.search("Chrome")>0) {
    deviceType= "Chrome"
  }else if (navigator.userAgent.search("Firefox")>0) {
    deviceType="Firefox"
  }else if (navigator.userAgent.search("Safari")>0 && navigator.userAgent.search("Chrome") < 0) {
    deviceType = "Safari"
  }else {
    deviceType = "Other"
  }

  return deviceType;
}


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
        console.log(visitorData);
        sendMetrics(visitorData).then(metrics => {

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
