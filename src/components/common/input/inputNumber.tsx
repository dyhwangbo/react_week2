import { ResetButton } from "../button";

const InputNumber = (props) => {
    const placeholder = props.placeholder != null ? props.placeholder : "숫자를 입력하세요.";
    const size = props.size !== undefined ? props.size : "";

    const divClass = "inner-input-group " + size;

    return (
        <>
        <div className={divClass}>
            <input type="num" 
                className="tf-comm tf-num" 
                placeholder={placeholder}
                value={props.numberValue} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const { value } = e.target
                    // value의 값이 숫자가 아닐경우 빈문자열로 replace 해버림.
                    const onlyNumber = value.replace(/[^0-9]/g, '')
                    props.setNumberValue(onlyNumber as unknown as number)
                }}
            />
            <ResetButton onClick={props.numberReset} />
            <span className="unit-text">원</span>
        </div>

        {/* <div className={divClass}>
            <input type="text" className="tf-comm" defaultValue={props.value} placeholder={placeholder} onChange={(e) => props.onChange(e.target.value)} />
                <p className="txt-validation">체크 / 에러 문구 내용 영역</p>
        </div> */}
        </>
    )
}

export default InputNumber;