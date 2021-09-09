import React, { useEffect, useState } from "react";
import { DeviceWrapper, DeviceControl } from "../components/DeviceComponents";
import { Notification } from "../components/Notification";
import { Redirect } from "react-router-dom";
import axios from "axios";

const url = "http://35.201.2.209:8000";
const user_info = {
  name: "Ashfaq Mahmood",
  email: "ashfaq.bd92@gmail.com",
  repoUrl: "https://github.com/ashfaqrafi/meldCX-assignment",
  message: "Hello meldCX",
};

export default function DeviceContainer({ history }) {
  const [number, setNumber] = useState(0);
  const [init, setInit] = useState(false);
  const [notify, setNotify] = useState(false);
  const getAccessToken = localStorage.getItem("meldCX_access_token");

  async function getDeviceData() {
    await axios
      .get(`${url}/devices`)
      .then((res) => {
        const devices = res.data.devices.length;
        return devices;
      })
      .then((data) => {
        setNumber((prev) => {
          prev = data;
          return prev;
        });
      })
      .catch((e) => console.log(e));
  }

  function toNotify() {
    axios
      .post(`${url}/notify`, user_info, {
        headers: {
          Authorization: `Bearer ${getAccessToken}`,
        },
      })
      .then(() => {
        setNotify(true);
      })
      .catch((e) => console.log(e));
  }

  function logOut() {
    localStorage.clear();
    history.push("/");
  }

  useEffect(() => {
    if (getAccessToken !== null && !init) {
      getDeviceData();
      setInit(true);
    }

    const pollTime = setInterval(() => {
      getDeviceData();
      document.location.reload();
    }, 5000);

    return () => {
      clearInterval(pollTime);
    };
  }, [getAccessToken, init]);

  if (getAccessToken !== null) {
    return (
      <div className="container">
        <DeviceWrapper number={number} />
        {notify && <Notification message="Notification sent!" delay={2000} />}
        <div className="device-controller">
          <DeviceControl>
            <button onClick={toNotify} className="notify-button">
              NOTIFY
            </button>
            <button onClick={logOut} className="logut-button">
              LOG OUT
            </button>
          </DeviceControl>
        </div>
      </div>
    );
  }

  return <Redirect from="/device" to="/" />;
}
