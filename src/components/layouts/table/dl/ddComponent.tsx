const DdComponent = (props) => {
    const {children} = props;
    return (
        <>
            <div className="form-group">
                <span className="comp-txt">
                    <span className="table">
                        <span className="table-cell">
                        {children}
                        </span>
                    </span>
                </span>
            </div>
        </>
    )
}

export { DdComponent };