import React from "react";

function TimeTable() {
  const events = [
    { title: "ML", time: "09:30 - 11:00", day: "Mon", color: "#ffcccc" },
    { title: "Project Mng", time: "11:00 - 12:30", day: "Tue", color: "#cceeff" },
    { title: "DA", time: "12:00 - 13:30", day: "Thu", color: "#ffd700" },
    { title: "Cloud Computing", time: "14:00 - 15:40", day: "Wed", color: "#cceeff" },
    { title: "ML", time: "15:00 - 16:00", day: "Fri", color: "#ffcccc" },
  ];

  return (
    <div className="timetable">
      <h3>Weekly Course Schedule</h3>
      <div className="week">
        <div className="times">
          {["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"].map((time, index) => (
            <div key={index} className="time-slot">{time}</div>
          ))}
        </div>
        <div className="days">
          {events.map((event, index) => (
            <div key={index} className="event" style={{ backgroundColor: event.color }}>
              <p>{event.title}</p>
              <p>{event.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TimeTable;
