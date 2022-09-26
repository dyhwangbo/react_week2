/** 인풋 타입 텍스트를 입력하는 컴포넌트 
 * placeholder : "검색어를 입력하세요"(default) / 이외 사용자 입력
 * size : xxsmall / xsmall / small / midium(default) / large / xlarge / xlarge expand
*/


const InputText = (props) => {
    const placeholder = props.placeholder != null ? props.placeholder : "검색어를 입력하세요오";
    const size = props.size !== undefined ? props.size : "";

    const divClass = "input-group " + size;
    return (
        <>
        <div className={divClass}>
            <input type="text" className="tf-comm" defaultValue={props.value} placeholder={placeholder} onChange={(e) => props.onChange(e.target.value)} />
                <p className="txt-validation">체크 / 에러 문구 내용 영역</p>
        </div>
        </>
    )
}

export default InputText;