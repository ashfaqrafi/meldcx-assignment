import React from "react";

export function Notification({ message, delay }) {
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setVisible((prevState) => {
        return !prevState;
      });
    }, delay);
  }, [delay]);

  return (
    <div
      style={{
        display: visible ? "flex" : "none",
      }}
      className="notification-panel"
    >
      <h1>{message}</h1>
    </div>
  );
}
