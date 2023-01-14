import React, { useEffect, useRef } from "react";
import { useGlobalContext } from "./context";

function AlertBar() {
  let { alertType, setAlertType, progWidth, setProgWidth } = useGlobalContext();
  let progressRef = useRef(null);

  useEffect(() => {
    let timeOutId = setTimeout(() => {
      setAlertType({ ...alertType, show: false });
    }, 2500);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [alertType.show]);

  useEffect(() => {
    let timeIntervalId = setInterval(() => {
      setProgWidth((prev) => prev + 1);
    }, 25);

    if (progWidth === 100) {
      clearInterval(timeIntervalId);
    }

    return () => {
      clearInterval(timeIntervalId);
    };
  }, []);

  useEffect(() => {
    if (alertType.show && progWidth <= 100) {
      progressRef.current.style.width = `${progWidth}%`;
      progressRef.current.style.backgroundColor = alertType.color;
    }
  }, [progWidth]);

  return (
    <div className={alertType.show ? "alert-bar alert-bar-show" : "alert-bar"}>
      <p>{alertType.text}</p>
      <div className="progress-line" ref={progressRef}></div>
    </div>
  );
}

export default AlertBar;
