/** 셀렉트박스 컴포넌트 */
import { Select } from "antd";
import { Dispatch, SetStateAction } from "react";

export type optionProps = {
    name: string,
    value: string
}

export interface ChartSelectBoxInterface {
    width?: number,
    defaultValue?: string,
    placeholder?: string,
    optionList: optionProps[]
    setName: Dispatch<SetStateAction<string>>,
    setValue: Dispatch<SetStateAction<string>>,
}
const ChartSelectBox = (props: ChartSelectBoxInterface) => {
    const widthClass = props.width != null ? `small w-${props.width}` : "small w-150"; 
    const placeholder= props.placeholder != null ? props.placeholder : "조회 기준 선택";

    return (
        <>
            <Select defaultValue={props.defaultValue}  className={widthClass} placeholder={placeholder} labelInValue={true} onChange={(e:any)=>{
                props.setName(e.label);
                props.setValue(e.value);

            }}>
                {props.optionList.map((option) => {
                    return <Select.Option key={option.value} value={option.value}>{option.name}</Select.Option>
                })}
            </Select>
        </>
    )

}

export default ChartSelectBox;