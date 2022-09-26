import { useCallback, useMemo, useRef, useState } from "react";

// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridReact } from "ag-grid-react";
import { ICellRendererParams } from "ag-grid-community";
import EmptyGridLayout from "./emptyGridLayout";

//더미 그리드 데이터 생성
function makeRowData(){
    const arr = [];
    for(let i = 0; i<15; i++){ //만들 수 만큼
        arr.push({
            id: i, column01: "컬럼컬럼01컬럼컬럼01컬럼컬럼01컬럼컬럼01컬럼컬럼01컬럼컬럼01", column02: "컬럼컬럼02컬럼컬럼02", column03:"컬럼컬럼03", column04: 3500000000000+i,
            column05: "컬럼컬럼05", column06: "컬럼컬럼06", column07: "컬럼컬럼07", column08: "컬럼컬럼08"
        });
    }
    return arr;
}
//TD에 버튼 생성하는 기능
const rowInfoButtonRenderer = (props: ICellRendererParams) => {
    const rowData = props.data;
    const buttonInCellClick = () => {
        alert(`${rowData.column01}`);
    };

    return (
        <button type="button" className="btn solid blue xxsmall" onClick={buttonInCellClick}>버튼</button>
    );

};
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
//컬럼 툴팁. 값을 받아오진 못한다.. 그냥 고정 값만 표시할 수 있음. 그 외로 할꺼면 커스텀 툴팁 참고해야 함.
//https://www.ag-grid.com/react-data-grid/component-tooltip/
const cellTooltipText = () => {
    return "간단한 설명을 넣어봅니다.";
}

const AgGridExample = () => {
    const gridRef = useRef<AgGridReact>(null);
    const emptyGridRef = useRef<AgGridReact>(null);
    const [rowData] = useState(makeRowData);

    const [columnDefs] = useState([
        { field: 'column01', headerName: '헤더헤더01(헤더 클래스추가)', headerClass: "asdfasdf", headerCheckboxSelection: true,checkboxSelection: true },
        { field: 'column02', headerName: '헤더헤더02(헤더 툴팁적용)',
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
        },
        headerTooltip: "헤더헤더01 툴팁", },
        { field: 'column03', headerName: '헤더헤더03(컬럼툴팁)', tooltipValueGetter: cellTooltipText },
        { field: 'column04', headerName: '헤더헤더04(소팅적용)', sortable: true, unSortIcon: true,
            // icons: {
                // sortAscending: '<i class="ico-sort-asc"></i>', //텍스트도 가능하다. ex : 'ASC'
                // sortDescending: '<i class="ico-sort-desc"></i>',
            // },
        },
        { field: 'column05', headerName: '헤더헤더05(좌로정렬-헤더는 별도 적용 없음)', cellStyle: { textAlign: 'left'} },
        { field: 'column06', headerName: '헤더헤더06(우로정렬)', cellStyle: { textAlign: 'right'} },
        { field: 'column07', headerName: '헤더헤더07(센터정렬)', cellStyle: { textAlign: 'center'} },
        { field: 'column08', headerName: '헤더헤더08(버튼)', cellRenderer: rowInfoButtonRenderer },
        { field: 'column09', headerName: '헤더헤더09(버튼)', cellRenderer: rowRadioRenderer },
    ])


    const emptyGridComponent = useMemo(() => {
        return EmptyGridLayout;
    }, []);

    const onGridReady = useCallback((params) => {
        gridRef.current!.api.sizeColumnsToFit();
    }, []);

    const onEmptyGridReady = useCallback((params) => {
        emptyGridRef.current!.api.sizeColumnsToFit();
    }, []);


    return (
        <>

            {/* 상단 그리드 */}
            <AgGridReact
                ref={gridRef}
                rowData={rowData}
                columnDefs={columnDefs}
                onGridReady={onGridReady}
                rowSelection={'multiple'}
                suppressRowClickSelection={true}
                tooltipShowDelay={0} // 너무 느리게 떠서 추가 옵션 설정
                tooltipHideDelay={500000}
                rowHeight={64}
                // defaultColDef={{
                    // sortable: true,
                    // flex: 1,
                    // minWidth: 100,
                    // resizable: true,
                    // tooltipComponent: CustomTooltip,
                    // autoHeight: true,
                    // wrapText: true,
                // }}
                domLayout={'autoHeight'}
            />

        </>
    )
}

export default AgGridExample;