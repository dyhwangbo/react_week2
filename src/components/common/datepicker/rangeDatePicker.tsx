/** 조회필터에서 사용하는 RangePicker 컴포넌트 */

 import { DatePicker } from 'antd';
import { RangePickerProps } from 'antd/lib/date-picker';
import moment from 'moment';
import { useEffect, useState } from 'react';
const { RangePicker } = DatePicker;

const RangeDatePicker = (props) => {    
    const [ nextBtnDisabled, setNextBtnDisabled ] = useState(true);
    
    const changeRange: RangePickerProps['onChange'] = (dates, dateStrings) => {
        if (dates) {
            props.setStartDate(moment(dateStrings[0]).format("YYYYMMDD"));
            props.setEndDate(moment(dateStrings[1]).format("YYYYMMDD"));
        } else {
          console.log('Clear');
        }
      };
    const changeRangePrev = () => sideBtnEvent("prev");
    
    const changeRangeNext = () => sideBtnEvent("next");
    
    const sideBtnEvent = (type: string) => {
        
        console.log("asdfasdfasdf");
        const interval = moment(props.endDate).diff(props.startDate) + 86400000;
        console.log(props.startDate);
        console.log(props.endDate);

        props.setStartDate(moment(props.startDate).add(type === "prev" ? -interval : +interval, 'ms'));
        props.setEndDate(moment(props.endDate).add(type === "prev" ? -interval : +interval, 'ms'));


    };
    
    const nextBtnDisalbedCheck = () => {
        //하루만큼 차이를 더한다.
        var addMilSec = 86400000+1;
        //어제 날짜 기준으로(리포트 기준 적용) 데이터가 어제 날짜보다 크다면 disabled
		if(moment().startOf('day').add(-1,'d').valueOf() < 
            moment(props.endDate).add(-1,'d').valueOf() + moment(props.endDate).add(-1,'d').diff(moment(props.startDate).add(-1,'d')).valueOf()+addMilSec){
			setNextBtnDisabled(true);
		}else{
			setNextBtnDisabled(false);
		} 

        return true;
    }

    useEffect(() => {
        nextBtnDisalbedCheck();
    }, [props.startDate, props.endDate])
    return (
        <>  
            <div className='comp-datepicker range'>
                <button type="button" className="btn outline gray btn-ico" onClick={changeRangePrev}><i className="ico ico-prev"></i></button>
                    <RangePicker
                        defaultValue={[moment(props.startDate), moment(props.endDate)]}
                        placeholder={["시작일 선택","종료일 선택"]}
                        ranges={{
                            '오늘': [moment(), moment()],
	                        '어제': [moment().subtract(1, 'd'), moment().subtract(1, 'd')],
	                        //'이번주': [moment().startOf('isoWeek'), moment().subtract(1, 'd')],
	                        //'저번주': [moment().subtract(1, 'week').startOf('isoWeek'), moment().subtract(1, 'week').endOf('isoWeek')],
	                        '최근 7일': [moment().subtract(7, 'd'), moment().subtract(1, 'd')],
	                        '이번 달': [moment().startOf('month'), moment().subtract(1, 'd')],
	                        '지난 달': [moment().subtract(1, 'M').startOf('month'), moment().subtract(1, 'M').endOf('month')],
	                        '최근 60일': [moment().subtract(60, 'd'), moment().subtract(1, 'd')],
	                        //'최근 90일': [moment().subtract(90, 'd'), moment().subtract(1, 'd')]
                        }}
                        value={[moment(props.startDate), moment(props.endDate)]}
                        onChange={changeRange}
                        dropdownClassName="zxcvvvvvvv"
                        format={"YYYY-MM-DD"}
                    />
                <button type="button" className="btn outline gray btn-ico" onClick={changeRangeNext} disabled={nextBtnDisabled}><i className="ico ico-next"></i></button>
            </div>
        </>
    )
}
export { RangeDatePicker };