import React, { useEffect, useState } from "react";
import fr from "date-fns/locale/fr";
import DatePicker, { registerLocale } from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import setSeconds from "date-fns/setSeconds";

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
      return setHours(
        setMinutes(setSeconds(date.setDate(date.getDate() + 2), 0), 0),
        8
      );
    } else if (date.getDay() === 6) {
      return setHours(
        setMinutes(date.setDate(date.setDate(date.getDate() + 1), 0), 0),
        8
      );
    } else {
      return setHours(setMinutes(day, 0), 8);
    }
  };

  const [startDate, setStartDate] = useState(setingStartDate(nextDay));

  const closeHours = (startDate) => {
    let day = new Date(startDate);
    let today = day.getDay();
    if (today !== 4) {
      return [setHours(setSeconds(day, 0), 12)];
    } else {
      return [
        setHours(setSeconds(day, 0), 13),
        setHours(setSeconds(day, 0), 14),
        setHours(setSeconds(day, 0), 15),
        setHours(setSeconds(day, 0), 16),
      ];
    }
  };

  const [excluded, setExcluded] = useState(closeHours(startDate));

  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 5 && day !== 6;
  };

  const selectDate = () => {
    let date = new Date(startDate);
    date = setMinutes(setSeconds(date, 0), 0);
    console.log(date);
    setExcluded([...excluded, date]);
    console.log(excluded);
    setSelectedDay([...selectedDay, { date: startDate, excludeTimes: date }]);
  };

  const changingDate = (date) => {
    setStartDate(date);

    selectedDay.map((element) => {
      console.log(element.excludeTimes);
    });
  };

  const [selectedDay, setSelectedDay] = useState([
    { date: startDate, excludeTimes: closeHours(startDate) },
  ]);

  return (
    <div className="date-time-picker">
      <DatePicker
        showTimeSelect
        selected={startDate}
        locale="fr"
        onChange={(date) => changingDate(date)}
        excludeTimes={excluded}
        filterDate={isWeekday}
        minDate={nextDay}
        maxDate={nextWeek}
        minTime={setHours(setMinutes(new Date(), 0), 8)}
        maxTime={setHours(setMinutes(new Date(), 0), 16)}
        timeIntervals={60}
        dateFormat="MM/dd/yyyy HH:mm"
      />
      <button onClick={selectDate}>SELECT</button>
    </div>
  );
};

export default DateTimePicker;
