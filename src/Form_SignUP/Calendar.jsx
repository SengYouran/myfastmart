import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css"; // default styles

function Calendar({ refCalendar }) {
  return (
    <div className="container_calendar">
      <Flatpickr
        ref={refCalendar}
        className="calendar-mobile"
        options={{
          appendTo: document.body,
          static: true, // ជួយរក្សា position fixed នៅក្រៅ DOM structure
          disableMobile: true, // ✅ បង្ខំឲ្យប្រើ UI desktop នៅលើ mobile
        }}
      />
    </div>
  );
}

export default Calendar;
