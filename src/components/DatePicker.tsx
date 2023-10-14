import { LegacyRef, forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import _DatePicker, { ReactDatePickerProps, registerLocale } from "react-datepicker";
import enGB from "date-fns/locale/pt";

import "react-datepicker/dist/react-datepicker.css";

registerLocale("de", enGB);

interface InputProps extends ReactDatePickerProps {
  error?: boolean;
  errorMessage?: string;
}

function DatePicker({ className, error, errorMessage, ...props }: InputProps, ref: LegacyRef<HTMLInputElement> | undefined) {
  const datePickerClassName = twMerge(
    "rounded-lg border border-gray-300 bg-white p-2 text-sm font-normal text-primaryDarker placeholder-black placeholder-opacity-20 outline-none transition-all focus:ring-1 focus:ring-primary",
    error ? "border-red-500" : "",
    className
  );
  

  return (
    <div className="flex flex-col">
      <_DatePicker
        dateFormat={"dd/MM/yyyy HH:mm "}
        timeCaption="time"
        timeIntervals={30}
        showTimeSelect
        timeFormat="HH:mm z"
        locale={enGB}
        wrapperClassName="w-full"
        className={datePickerClassName}
        enableTabLoop={false}
        {...props}
      />
      {error && errorMessage && <div className="text-red-500 mt-1 text-xs">{errorMessage}</div>}
    </div>
  );
}

export default forwardRef(DatePicker);