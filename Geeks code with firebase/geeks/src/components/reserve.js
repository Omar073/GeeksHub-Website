import React, { useState } from 'react';
import DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

function ReservationForm() {
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());

  const renderInput = (props, openCalendar) => {
    function handleChange(e) {
      props.onChange(e.target.value);
    }

    return (
      <input
        {...props}
        className="pl-1 bg-sky-950 text-white rounded-full border-purple-600 border hover:bg-purple-600 shadow-[0_4px_9px_-4px_#3b71ca] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] transition duration-150"
        onClick={openCalendar}
        onChange={handleChange}
      />
    );
  };

  const renderDay = (props, currentDate, selectedDate) => {
    let className = '';
  
    if (currentDate.isSame(selectedDate, 'day')) {
      className = 'rdtActive';
    }
  
    if (currentDate.isSame(new Date(), 'day')) {
      className += ' rdtToday';
    }
  
    if (!currentDate.isSame(selectedDate, 'month')) {
      className += ' rdtDisabled';
    }
  
    if (!currentDate.isSame(selectedDate, 'day')) {
      className += ' rdtInactive';
    }
  
    return (
      <td
        {...props}
        className={className}
        style={{
          backgroundColor: !currentDate.isSame(selectedDate, 'month') ? 'grey' : '',
          color: !currentDate.isSame(selectedDate, 'day') ? 'blue' : 'black',
        }}
      >
        {currentDate.date()}
      </td>
    );
  };
  

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="rounded-lg p-8 bg-sky-950 text-white text-center">
        <h1 className="text-4xl font-bold mb-4">Make A Reservation: </h1>
        <div className="flex items-center justify-center mb-4 ">
          <DateTime
            value={selectedDateTime}
            onChange={(date) => setSelectedDateTime(date.toDate())}
            renderInput={renderInput}
            renderDay={renderDay}
          />
        </div>
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 hover:bg-blue-600 shadow-[0_4px_9px_-4px_#3b71ca] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]">
          Reserve
        </button>
      </div>
    </div>
  );
}

export default ReservationForm;
