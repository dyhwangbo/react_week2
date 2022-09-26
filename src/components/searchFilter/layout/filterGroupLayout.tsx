/** 조회 필터의 항목별로 테두리를 감싸는 레이아웃 구조 */
interface filterGroupInterface {
    title: string,
    components: JSX.Element[]
}
const FilterGroupLayout = (props: filterGroupInterface) => {
    //필터 그룹 하나 당 라벨 1개 / filter-col은 여러개가 올 수 있다.
    return (
        <>
            <div className="filter-group">
                <div className="filter-label">
                    <p className="fz-16 fw-med fc-7">{props.title}</p>
                </div>
                <div className="filter-box">
                    {props.components.map((component, index) => {
                        return (
                        <div className="filter-col" key={component.key +"_"+ index}>
                            {component}
                        </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default FilterGroupLayout;