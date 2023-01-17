/** 인풋 타입 텍스트를 입력하는 컴포넌트 
 * placeholder : "검색어를 입력하세요"(default) / 이외 사용자 입력
 * size : xxsmall / xsmall / small / midium(default) / large / xlarge / xlarge expand
*/

import { Dispatch, SetStateAction } from "react";

interface InputProps {
    name:string,
    value:string,
    placeholder?:string,
    size?:string,
    expand?:boolean,
    onChange: Dispatch<SetStateAction<any>>;
}

const convertPlaceHolder = (str?: string) => str !== undefined ? str : "검색어를 입력하세요.";
const convertSize = (size?: string) => size !== undefined ? size : "";
const convertDivClass = (size: string, expand?: boolean, ) => expand !== undefined ? "input-group expand" + size : "input-group " + size;

const InnerInput = (props: InputProps) => {
    return (
        <>
        <div className={convertDivClass(convertSize(props.size), props.expand)}>
            <input type="text" name={props.name} className="tf-comm" defaultValue={props.value} placeholder={convertPlaceHolder(props.placeholder)} onChange={props.onChange} />
                <p className="txt-validation">체크 / 에러 문구 내용 영역</p>
        </div>
        </>
    )
}

const FormGroupInput = (props: InputProps) => {
    return (
        <>
            <div className="form-group">
                <div className={convertDivClass(convertSize(props.size), props.expand)}>
                    <div className="inner-input-group">
                        <input type="text" className="tf-comm letter-count" placeholder={convertPlaceHolder(props.placeholder)} 
                            name={props.name} defaultValue={props.value} onChange={props.onChange}/>
                            <p className="txt-validation">체크 / 에러 문구 내용 영역</p>
                    </div>
                </div>
            </div>
            
        </>
    )
}
export { InnerInput, FormGroupInput }