import React from "react";
import { useEffect, useState } from "react";

function LiveTime(props) {
  const [dateState, setDateState] = useState(new Date());
  useEffect(() => {
    setInterval(() => setDateState(new Date()), 1000);
  }, []);
  return (
    <span>
      {!props.hideTime && (<span>
        {dateState.toLocaleString("id-ID", {
          timeZone: "Asia/Makassar",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        }).replaceAll(".", ":")}
      , </span>)}
      <span>
        {dateState.toLocaleDateString("id-ID", {
          timeZone: "Asia/Makassar",
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </span>
    </span>
  );
}

export default LiveTime;
