export const timeFromNow = function (timeStamp) {
  const timeDifference = (Date.now() - timeStamp) / 1000;
  if (timeDifference < 60) {
    return "Just now";
  } else if (timeDifference >= 60 && timeDifference < 3600) {
    const minuteCount = Math.floor(timeDifference / 60);
    return `${minuteCount} m`;
  } else if (timeDifference >= 3600 && timeDifference < 86400) {
    const hourCount = Math.floor(timeDifference / 3600);
    return `${hourCount} h`;
  } else if (timeDifference >= 86400 && timeDifference < 604800) {
    const dayCount = Math.floor(timeDifference / 86400);
    return `${dayCount} d`;
  } else if (timeDifference >= 604800) {
    const weeksCount = Math.floor(timeDifference / 604800);
    return `${weeksCount} w`;
  }
};

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const generateId = () => {
  return Math.floor(Math.random() * 2000); // Not entirely reliable but works for now;
};

export const timeFromNowFoImages = function (timeStamp) {
  const timestampDateObj = new Date(timeStamp);
  const timeDifference = (Date.now() - timeStamp) / 1000;
  if (timeDifference < 60) {
    return "a few seconds ago";
  } else if (timeDifference >= 60 && timeDifference < 3600) {
    const minuteCount = Math.floor(timeDifference / 60);
    return `${minuteCount} ${minuteCount === 1 ? "minute" : "minutes"} ago`;
  } else if (timeDifference >= 3600 && timeDifference < 86400) {
    const hourCount = Math.floor(timeDifference / 3600);
    return `${hourCount} ${hourCount === 1 ? "hour" : "hours"} ago`;
  } else if (timeDifference >= 86400 && timeDifference < 604800) {
    const dayCount = Math.floor(timeDifference / 86400);
    return `${dayCount} ${dayCount === 1 ? "day" : "days"} ago`;
  } else if (timeDifference >= 604800 && timeDifference < 31536000) {
    const date = timestampDateObj.getDate();
    const month = timestampDateObj.getMonth();
    return `${MONTHS[month - 1]} ${date}`;
  } else if (timeDifference >= 31536000) {
    const date = timestampDateObj.getDate();
    const month = timestampDateObj.getMonth();
    const year = timestampDateObj.getFullYear();
    return `${MONTHS[month - 1]} ${date},  ${year}`;
  }
};

export const readableCount = function (followersCount) {
  if (followersCount < 10000) {
    return followersCount;
  } else if (followersCount > 10000 && followersCount < 1000000) {
    const readableCount = Math.floor(followersCount / 10000);
    return `${readableCount}K`;
  } else if (followersCount > 1000000 && followersCount < 1000000000) {
    const readableCount = Math.floor(followersCount / 1000000);
    return `${readableCount}M`;
  } else if (followersCount > 1000000000) {
    const readableCount = Math.floor(followersCount / 1000000000);
    return `${readableCount}B`;
  }
};

export const debounce = (func, delay) => {
  let inDebounce;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(context, args), delay);
  };
};
