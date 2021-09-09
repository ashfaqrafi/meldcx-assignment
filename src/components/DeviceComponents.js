import React from "react";

export function DeviceWrapper({ number }) {
  const [circles, setCircles] = React.useState([]);

  React.useEffect(() => {
    setCircles((prevState) => {
      prevState = [...Array(number).keys()];
      return prevState;
    });

    return () => {
      setCircles([...Array(number).keys()]);
    };
  }, [number]);

  return (
    <div className="device-animation">
      {circles.map((data) => {
        return (
          <div key={data} className="device-animation-holder">
            <span
              style={{ transform: `rotate(${data * 30}deg)` }}
              className="device-animation-circle"
            ></span>
          </div>
        );
      })}
      <>
        {number ? (
          <div className="device-text">
            <p className="device-number">{number}</p> <br />
            DEVICES <br />
            ONLINE
          </div>
        ) : (
          <p className="device-text">
            <span className="text-position">Calculating...</span>
          </p>
        )}
      </>
    </div>
  );
}

export function DeviceControl({ children }) {
  return <div className="device-control"> {children} </div>;
}
