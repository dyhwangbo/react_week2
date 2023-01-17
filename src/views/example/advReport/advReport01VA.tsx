import moment from "moment";
import { useState } from 'react';

import { RangeDatePicker } from '../../../components/common/datepicker';
import SelectBoxComponent from "../../../components/common/selectBox/selectBoxComponent";

//테스트 데이터 임포트
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { InnerInput } from '../../../components/common/input';
import dataList from '../../../testDatas/reportData.json';
import { AdvReport01Props, AdvReport01View } from "./advReport01";
import { appendText, dateFormat, maskText, numberFormat } from './advReportFunctions';

const AdvReport01 = () => {
    //조회 필터에 사용될 컴포넌트 선언
    const [ searchDiv, setSearchDiv ] = useState("itemNo");
    const [ searchText, setSearchText] = useState("");
    const [ startDate, setStartDate ] = useState(moment().subtract(7, 'd'));
    const [ endDate, setEndDate ] = useState(moment().subtract(1, 'd'));

    //차트 및 그리드 원본 데이터
    const [ reportData, setReportData ] = useState([]);

    /** searchDiv 리스트 생성 */
    const searchDivOptions = [{name:"광고주", value: "adv"},{name:"상품번호", value: "itemNo"},{name:"광고그룹명", value: "adGroupName"},{name:"키워드명", value: "kwdName"}];

    //조회 필터
    const searchOptions = [
        {
            title: "템플릿 검색 기준",
            component: [<SelectBoxComponent key={"searchDiv"} width={300} defaultValue={"itemNo"} placeholder={"홀더홀더"} optionList={searchDivOptions} changeFn={setSearchDiv} />]
        },{
            title: "검색어 입력",
            component: [<InnerInput name={"searchText"} placeholder={"검색어 입려억~~"} value={searchText} onChange={setSearchText} />]
        }
        , {
            title: "기간 조해2",
            component: [<RangeDatePicker key={"rangeDate"} startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate}/>]
        }
    ];

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
        { field: 'basicDate', headerName: '날짜', headerClass: "asdfasdf", 
            headerCheckboxSelection: true,checkboxSelection: true, cellStyle: { textAlign: 'center'}, valueFormatter: (params) => dateFormat(params) },
        { field: 'email', headerName: '이메일', cellStyle: { textAlign: 'right'}, valueFormatter: (params) => maskText(params, 5, "@") }, 
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
        { field: 'clickCnt', headerName: '클릭 수', cellStyle: { textAlign: 'right'}},
        { field: 'convCnt', headerName: '전환 수', sortable: true, unSortIcon: true, cellStyle: { textAlign: 'right'}, valueFormatter: numberFormat, 
            // icons: {
                // sortAscending: '<i class="ico-sort-asc"></i>', //텍스트도 가능하다. ex : 'ASC'
                // sortDescending: '<i class="ico-sort-desc"></i>',
            // },
        },
        { field: 'directSellCost', headerName: '직접 판매 금액', cellStyle: { textAlign: 'right'}, 
            valueFormatter: (params) => appendText(params, "원")  },
        { field: 'indirSellCost', headerName: '간접 판매 금액', cellStyle: { textAlign: 'right'}, valueFormatter: numberFormat,  },
        { field: 'sellCost', headerName: '총 판매 금액', cellStyle: { textAlign: 'right'}, valueFormatter: numberFormat,  },
        { field: 'dcAdspend', headerName: '할인 광고비', cellStyle: { textAlign: 'right'}, valueFormatter: numberFormat,  },
        { field: 'column10', headerName: 'DP용(라디오)', cellRenderer: rowRadioRenderer, cellStyle: { textAlign: 'center'} },
    ])

    const searchEvent = () => {
        //apiCall이 필요하다..
        const body = { searchDiv : searchDiv, searhcText : searchText, startDate : startDate, endDate : endDate };
        console.log(body);
        // apiCall.post("/post/searchAdGroupReport", body)
        // .then(res => { setReportData(res.data)})
        // .catch(error => message.error(SEARCH_SYSTEM_ERROR_MSG));
        console.log(dataList);
        setReportData(dataList);
    }

    const reportProps: AdvReport01Props = {
        searchOptions,
        columnDefs,
        reportData,
        searchEvent
    }
    
    return <AdvReport01View {...reportProps} />
}

export default AdvReport01
