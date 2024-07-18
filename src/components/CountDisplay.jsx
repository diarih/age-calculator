import React from 'react';

const CountDisplay = ({number = '--', label= 'label'}) => {
  return (
    <div className="text-8xl font-bold italic">
      <span className={'text-purple-700 pr-1'}>{number}</span><span className={'text-black'}>{label}</span>
    </div>
  );
};

export default CountDisplay;