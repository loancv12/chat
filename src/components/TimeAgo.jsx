import { parseISO, formatDistanceToNow } from "date-fns";

import React from "react";

const TimeAgo = ({ timestamp }) => {
  //   debugger;
  let timeAgo = "";
  if (timestamp) {
    const date = timestamp.toDate();
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }
  return (
    <span title={timestamp}>
      &nbsp; <i>{timeAgo}</i>
    </span>
  );
};

export default TimeAgo;
