import { DatePicker, DatePickerProps } from "antd";
import moment from "moment";


/** 싱글 데이트피커. 
 * 기본 날짜 : 오늘
 * 
*/
const SingleDatePicker = (props) => {
    const dateFormat = props.dateFormat !== undefined ? props.dateFormat : "YYYY-MM-DD";
    const defaultDate = props.defaultDate !== undefined ? props.defaultDate : moment().format(dateFormat);

    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };
    return (
        <>
            <DatePicker defaultValue={defaultDate} onChange={onChange} format={dateFormat}/>
        </>
    )
};

export { SingleDatePicker };