import React from 'react';
import MonthView from './month-view/month-view';

const CalendarContainer: React.FC = () => {
  return (
    <div className="w-full">
      <MonthView />
    </div>
  );
};

export default CalendarContainer;
