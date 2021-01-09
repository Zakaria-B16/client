import React, { useEffect, useState } from "react";
import fr from "date-fns/locale/fr";
import DatePicker, { registerLocale } from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";

import "react-datepicker/dist/react-datepicker.css";
import "./DateTimePicker.sass";

// CSS Modules, react-datepicker-cssmodules.css
import "react-datepicker/dist/react-datepicker-cssmodules.css";

registerLocale("fr", fr);

const DateTimePicker = () => {
  const currentDate = new Date();
  const nextDay = currentDate.setDate(currentDate.getDate() + 1);
  const nextWeek = currentDate.setDate(currentDate.getDate() + 7);

  const setingStartDate = (day) => {
    let date = new Date(day);
    if (date.getDay() === 5) {
      return setHours(setMinutes(date.setDate(date.getDate() + 2), 0), 8);
    } else if (date.getDay() === 6) {
      return setHours(setMinutes(date.setDate(date.getDate() + 1), 0), 8);
    } else {
      return setHours(setMinutes(day, 0), 8);
    }
  };

  const [startDate, setStartDate] = useState(setingStartDate(nextDay));

  const closeHours = (startDate) => {
    let day = new Date(startDate);
    let today = day.getDay();
    if (today !== 4) {
      return [setHours(setMinutes(day, 0), 12)];
    } else {
      return [
        setHours(setMinutes(day, 0), 13),
        setHours(setMinutes(day, 0), 14),
        setHours(setMinutes(day, 0), 15),
        setHours(setMinutes(day, 0), 16),
      ];
    }
  };

  const [excluded, setExcluded] = useState(closeHours(startDate));
  // const [selectedDate, setSelectedDate] = useState({
  //   date: setingStartDate(nextDay),
  //   excludedTime: [closeHours(nextDay)],
  // });

  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 5 && day !== 6;
  };

  const selectDate = () => {
    console.log(startDate);
    setExcluded([...excluded, new Date(startDate)]);
    console.log(excluded);
    // setSelectedDate({
    //   date: startDate,
    //   excludeTime: new Date(startDate),
    // });
    // console.log(selectedDate);
  };

  // useEffect(() => {
  //   setExcluded(...excluded, ...closeHours(startDate));
  // }, [startDate]);

  const changingDate = (date) => {
    setStartDate(date);
    // setSelectedDate({
    //   date: date,
    // });
  };

  return (
    <div className="date-time-picker">
      <DatePicker
        showTimeSelect
        selected={startDate}
        locale="fr"
        onChange={(date) => changingDate(date)}
        excludeTimes={excluded.date}
        filterDate={isWeekday}
        minDate={nextDay}
        maxDate={nextWeek}
        minTime={setHours(setMinutes(new Date(), 0), 8)}
        maxTime={setHours(setMinutes(new Date(), 30), 16)}
        timeIntervals={60}
        dateFormat="MM/dd/yyyy HH:mm"
      />
      <button onClick={selectDate}>SELECT</button>
    </div>
  );
};

export default DateTimePicker;
