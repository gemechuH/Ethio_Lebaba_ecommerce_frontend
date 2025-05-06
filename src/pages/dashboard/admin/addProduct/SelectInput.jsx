import React from "react";

const SelectInput = ({ Label, name, value, options, onChange }) => {







  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {Label}
      </label>
      <select
        
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        
        className="w-full px-3 py-2 border border-gray-300 bg-gray-300 rounded-md shadow-sm focus:outline-none"
          >
              {
                  options.map((option, index) => (
                      <option key={index} value={option.value}>{option.label} </option>
                  ))
              }
          </select>
    </div>
  );
};

export default SelectInput;
