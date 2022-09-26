/** 일반 버튼 스타일 및 사이즈 정의(옵션 내용은 주석 참고)
 * line : solid(default) / outline
 * color : blue(default) / gray / red
 * size : empty(default) / xxsmall / xsmall / small / large / xlarge / 
*/

const Button = (props) => {
    //버튼 쓸때 필수 값
    const { children, onClick } = props;
    //옵션 값이므로 기본 값 설정.
    const style = props.line !== undefined ? props.line : "solid";
    const color = props.color !== undefined ? props.color : "blue";
    const size = props.size !== undefined ? props.size : "";
    return (
        <button 
            type="button"
            className={"btn "+style+" "+color+" "+size}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

/** 버튼 컴포넌트에서 disabled만 추가된 버튼 */
const DisabledButton = (props) => {
    const { children, onClick } = props;
    
    const style = props.line !== undefined ? props.line : "solid";
    const color = props.color !== undefined ? props.color : "blue";
    const size = props.size !== undefined ? props.size : "";
    return (
        <button 
            type="button"
            className={"btn "+style+" "+color+" "+size}
            onClick={onClick}
            disabled={true}
        >
            {children}
        </button>
    )
}

const IcoButton = (props) => {
    //버튼 쓸때 필수 값
    const { children, onClick } = props;
    //버튼 옵션 값이므로 기본 값 설정.
    const style = props.line !== undefined ? props.line : "solid";
    const color = props.color !== undefined ? props.color : "blue";
    const size = props.size !== undefined ? props.size : "";

    //아이콘 버튼 한정 옵션
    const icon = props.icon !== undefined ? props.icon : "ico-filter";
    //--txt-ico  / --ico-txt / --ico-prev / --next-ico
    const position = props.position !== undefined ? props.position : "--ico-txt";
    return (
        <button 
            type="button"
            className={"btn btn-ico "+style+" "+color+" "+position+" "+size}
            onClick={onClick}
        >
            {/* 아이콘은 필요할 떄마다 디자인 팀에게 문의 */}
            <i className={"ico "+icon}></i>
            {children}
        </button>
    )
}

const ResetButton = (props) => {
    //버튼 쓸때 필수 값
    const { children, onClick } = props;
return (
    <button 
        type="button"
        className="btn btn-reset"
        onMouseDown={onClick}
    >
        {children}
    </button>
)
}
export { IcoButton, ResetButton }


export { Button, DisabledButton }
