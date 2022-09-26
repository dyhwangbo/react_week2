
const GridHeader = (props) => {
    return (
        <>
            {/* 헤더 부분 */}
            <div className="box-header">
                <div className="box-left">
                    <h2 className="fz-18 fw-med fc-10">{props.title}</h2>
                    <span className="fz-14 fw-med fc-5"></span>
                </div>
            {props.csvBtn && 
                <div className="box-right">
                    <button type="button" className="btn outline aqua btn-ico --txt-ico small" onClick={props.csvExport}>csv 다운로드<i className="ico ico-download IcoGuide" /></button>
                </div>
            }
            </div>
        </>
    )
}

export default GridHeader;