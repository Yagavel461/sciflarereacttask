import React, { useEffect, useState } from 'react';

export const DateAndTime = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  const formatDate = (date) => {
    const options = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };

    return date.toLocaleDateString(undefined, options);
  };

  const formatTime = (date) => {
    const options = {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    };

    const timeString = date.toLocaleTimeString('en-US', options);

    // Manually format the hour to display "12" instead of "0"
    const [hour, minute] = timeString.split(':');
    const formattedHour =
      parseInt(hour, 10) === 0 || parseInt(hour, 10) === 12
        ? '12'
        : (parseInt(hour, 10) % 12).toString();

    return `${formattedHour}:${minute} `;
  };

  return (
    <div className="pe-3 border-end date-time date_text font-size-16">
      {formatDate(currentDateTime)} {formatTime(currentDateTime)}
    </div>
  );
};

export default DateAndTime;
