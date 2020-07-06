
export const visitorDataObj = {
  loadTime: {
    time: window.performance.timing.domContentLoadedEventEnd-window.performance.timing.navigationStart,
    date: Date.now()
  },
  screenWidth: screen.width,
  geolocation: "",
  deviceType: ""
}

export const browserDetection = async () => {
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
};