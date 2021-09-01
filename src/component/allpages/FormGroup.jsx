import React from "react";

const FormGroup = ({ label , placeholder , onChange , margin  , type , value , max = '' , onFocus ='' }) => {

 
  return (
    <div className={`flex flex-col ${margin}`}>
      <label htmlFor="" className="text-sm uppercase mb-2">{label}</label>
      <input
        type={type}
        className="py-2 px-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-700 text-sm"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        max={max}
        onFocus={onFocus}
      />
    </div>
  );
};

export default FormGroup;