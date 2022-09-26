import FilterGroupLayout from "../../searchFilter/layout/filterGroupLayout";

const GridFilter = (props) => {
    return (
        <>
            {/* 그리드 내부에 들어가는 조회 필터 부분 */}
            <div className="box-filter-area">
                <div className="comp-filter">
                    <div className="box-body">
                    <div className="filter-icon-area"><i className="ico ico-filter"></i></div>
                        <div className="filter-content">
                            <div className="filter-row">
                            {/* 타이틀 1개에 항목은 여러개 있을 수 있다.(ex: 카테고리 검색 등) */}
                                {props.searchFilterOptions.map((child, index) => {
                                return <FilterGroupLayout key={child.component.key+"_filterGroup_"+index} title={child.title} components={child.component} />
                                })}
                            </div>
                        </div>
            
                        {/* 버튼 눌렀을 시 이벤트 발생. 이벤트는 부모 컴포넌트에서 전달해줘야 한다. */}
                        <div className="filter-inquire">
                            <button type="button" className="btn outline blue btn-ico --ico-txt" onClick={props.searchEvent}>
                            <i className="ico"></i>선택 조건 조회2
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GridFilter;