
/** 페이지 상단의 조회 필터 단독으로 구성할 때 사용되는 컴포넌트 */

import { IcoButton } from "../common/button";
import FilterGroupLayout from "./layout/filterGroupLayout";

const PageSearchFilter = (props) => {
    return (
        <>
            
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
            
            <div className="filter-inquire">
                {/* 버튼 눌렀을 시 이벤트 발생. 이벤트는 부모 컴포넌트에서 전달해줘야 한다. */}
                <IcoButton line="outline" onClick={props.searchEvent}>선택 조건 조회</IcoButton>
            </div>
        </div>   
            
        </>
    )   
}

export default PageSearchFilter;