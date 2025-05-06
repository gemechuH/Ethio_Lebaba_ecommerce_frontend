import React from "react";

const InputText = ({ Label, name, type ="text", value, onChange, placeholder }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {Label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 bg-gray-300 rounded-md shadow-sm focus:outline-none"
      />
    </div>
  );
};

export default InputText;
