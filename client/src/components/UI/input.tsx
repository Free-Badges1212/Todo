import React from "react";

interface InputProps {
  state: string;
  setState: (prev: string) => void;
  placeholder?: string
}

const Input = ({ setState, state, placeholder }: InputProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setState(e.target.value);
  return (
    <input
      value={state}
      onChange={handleInputChange}
      placeholder={placeholder}
      className="border-2 px-4 h-full focus:shadow-lg focus:shadow-purple-600 border-purple-600 bg-white bg-transparent min-w-[120px]  placeholder:text-purple-600 rounded-md outline-none text-purple-600 placeholder:text-[16px] font-roboto focus:purple-400"
    />
  );
};

export default Input;
