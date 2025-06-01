import React from 'react';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value, payload: item } = payload[0];

    return (
      <div className="bg-gray-50 border-l-4 border-purple-500 rounded-md shadow-lg px-4 py-3 text-sm max-w-xs">
        <p className="text-gray-900 font-semibold tracking-tight">{name}</p>
        <div className="mt-1 text-gray-600">
          <span className="block">Count: <span className="font-bold text-gray-800">{value}</span></span>
          {item?.extraInfo && (
            <span className="block text-xs text-gray-400 mt-1 italic">
              {item.extraInfo}
            </span>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
