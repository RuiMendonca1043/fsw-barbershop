import DatePicker from "react-datepicker";

export default function DateTimePicker() {

  return (
    <div className="flex w-full flex-col">
      <DatePicker
              isClearable
              name="datetime1"
              className={"form-control"}
              onChange={()=>{}}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={30}
              timeCaption="time"
              dateFormat="MM-dd-yyyy hh:mm"
            />
      </div>
  );
}