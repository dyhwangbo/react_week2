/** 셀렉트박스 컴포넌트 */
import { Select } from "antd";
import { Dispatch, SetStateAction } from "react";

export type optionProps = {
    name: string,
    value: string
}

export interface SelectBoxInterface {
    width?: number,
    defaultValue?: string,
    value?: string,
    placeholder?: string,
    optionList: optionProps[]
    changeFn: Dispatch<SetStateAction<any>>
}
const SelectBoxComponent = (props: SelectBoxInterface) => {
    const widthClass = props.width !== undefined ? `w-${props.width}` : "w-150";
    const placeholder= props.placeholder !== undefined ? props.placeholder : "조회 기준 선택";
    
    const selectedValue = props.value !== undefined ? props.value.length !== 0 ? props.value : undefined : undefined;

    return (
        <>
            <Select defaultValue={props.defaultValue} value={selectedValue} className={widthClass} placeholder={placeholder} onChange={props.changeFn}>
                {props.optionList.map((option) => {
                    return <Select.Option key={option.value} value={option.value}>{option.name}</Select.Option>
                })}
            </Select>
        </>
    )

}

export default SelectBoxComponent;