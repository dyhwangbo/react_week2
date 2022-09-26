const BoxHeaderComponent = (props) => {
    return (
        <>
        <div className="box-header">
            <div className="box-left">
                <h2 className="fz-20 fw-med fc-10">{props.title}</h2>
                {props.desc !== undefined && <span className="fz-14 fw-med fc-5">{props.desc}</span>}
                {props.icon && <i className="txt-essential"></i>}
            </div>
            <div className="box-right">
                {props.buttons !== undefined &&
                    props.buttons.map((button) => {
                        return button
                })}
            </div>
        </div>
        </>
    )
}

export default BoxHeaderComponent;