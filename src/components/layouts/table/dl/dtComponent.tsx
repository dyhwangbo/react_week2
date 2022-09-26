import React from "react";

const DtComponent = (props) => {
    return (
        <>
            <div className="dt-inner">
                <span className="fz-16 fw-med fc-7">
                    {props.title.split("\n").map((text, index, array) => 
                        index + 2 > array.length ? 
                        <React.Fragment key={"dt-"+text+"_"+index}>{text}</React.Fragment> : 
                        <React.Fragment key={"dt-"+text+"_"+index}>{text}<br />
                        </React.Fragment>
                    )}
                    {props.highlight && <i className="txt-essential"></i>}
                    <br />
                    {props.children}
                </span>
            </div>
        </>
    )
}

export { DtComponent };