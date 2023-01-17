import { ICellRendererParams, ColDef } from "ag-grid-community";
import moment from "moment";
import { useState } from "react";
import GridSection from "../../../components/agGrid/gridSection";
import { RangeDatePicker } from "../../../components/common/datepicker";
import { InnerInput } from "../../../components/common/input/input";
import SelectBoxComponent from "../../../components/common/selectBox/selectBoxComponent";
import ContentHeader from "../../../components/layouts/header/contentHeader";

import dataList from '../../../testDatas/reportData.json';
import { numberFormat } from "./advReportFunctions";

/** searchDiv 리스트 생성 */
const searchDivOptions = [{name:"광고주", value: "adv"},{name:"상품번호", value: "itemNo"},{name:"광고그룹명", value: "adGroupName"},{name:"키워드명", value: "kwdName"}];
const AdvReport03 = () => {
    const [ searchDiv, setSearchDiv ] = useState("itemNo");
    const [ searchText, setSearchText] = useState("");
    const [ startDate, setStartDate ] = useState(moment().subtract(7, 'd'));
    const [ endDate, setEndDate ] = useState(moment().subtract(1, 'd'));
    const [ reportData, setReportData ] = useState([]);

    const searchFilterOptions = [
        {
            title: "템플릿 검색 기준",
            component: [<SelectBoxComponent key={"searchDiv"} width={300} defaultValue={"itemNo"} placeholder={"홀더홀더"}optionList={searchDivOptions} changeFn={setSearchDiv} />]
        },{
            title: "검색어 입력",
            component: [<InnerInput name={"searchText"} placeholder={"검색어 입려억~~"} value={searchText} onChange={setSearchText} />]
        }
        , {
             title: "기간 조해33",
             component: [<RangeDatePicker key={"adReport03RangeDate"} startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate}/>]
         }
    ]
    const searchEvent = () => {
        const body = {
            searchDiv : searchDiv,
            searhcText : searchText,
            startDate : startDate,
            endDate : endDate,
        }
        console.log(body);
        //apiCall이 필요하다..
        // apiCall.post("/post/searchAdGroupReport", body)
        // .then(res => { setReportData(res.data)})
        // .catch(error => message.error(SEARCH_SYSTEM_ERROR_MSG));
        setReportData(dataList);
    }

    //TD에 라디오 생성하는 기능
    const rowRadioRenderer = (props: ICellRendererParams) => {
        const uniqId = "switch-"+props.data.id;
        return (
            <div className="comp-switch mini">
                <input type="checkbox" id={uniqId} />
                <label htmlFor={uniqId} />
            </div>
        );
    }
    
    const [columnDefs] = useState<ColDef[]>([
        { field: 'basicDate', headerName: '날짜', headerClass: "asdfasdf", headerCheckboxSelection: true,checkboxSelection: true, cellStyle: { textAlign: 'center'} },
        { field: 'impCnt', headerName: '노출 수', cellStyle: { textAlign: 'right'}, valueFormatter: numberFormat, 
        headerComponentParams: {
            template:
                '<div class="ag-cell-label-container" role="presentation">' +
                '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
                '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
                '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
                '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
                '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
                '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
                '    <span ref="eText" class="ag-header-cell-text" role="columnheader"></span>' +
                '    <a class="ico-tooltip"></a> ' +
                '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
                '  </div>' +
                '</div>'
        }, headerTooltip: "일별 노출 수를 나타내는 지표입니다.", },
        { field: 'clickCnt', headerName: '클릭 수', cellStyle: { textAlign: 'right'}, valueFormatter: numberFormat },
        { field: 'convCnt', headerName: '전환 수', sortable: true, unSortIcon: true, cellStyle: { textAlign: 'right'}, valueFormatter: numberFormat },
        { field: 'directSellCost', headerName: '직접 판매 금액', cellStyle: { textAlign: 'right'}, valueFormatter: numberFormat  },
        { field: 'indirSellCost', headerName: '간접 판매 금액', cellStyle: { textAlign: 'right'}, valueFormatter: numberFormat  },
        { field: 'sellCost', headerName: '총 판매 금액', cellStyle: { textAlign: 'right'}, valueFormatter: numberFormat},
        { field: 'dcAdspend', headerName: '할인 광고비', cellStyle: { textAlign: 'right'}, valueFormatter: numberFormat},
        { field: 'column10', headerName: 'DP용(라디오)', cellRenderer: rowRadioRenderer, cellStyle: { textAlign: 'center'} },
    ])
    
    return ( 
        <>
            <ContentHeader title="그리드에 조회 필터가 포함되어 있는 형태 페이지 템플릿" />
            <div className="content-body">
                <div className="container-fluid">
                    {/* 그리드 섹션 */}
                    <div className="row">
                        <div className="col col-12">
                            <section className="wrap-section wrap-datagrid">
                                <GridSection 
                                    title={"그리드으~헤더어~333"}
                                    gridFilter={true}
                                    searchFilterOptions={searchFilterOptions} searchEvent={searchEvent}
                                    csvBtn={true}
                                    columnDefs={columnDefs}
                                    gridData={reportData}
                                />
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AdvReport03;