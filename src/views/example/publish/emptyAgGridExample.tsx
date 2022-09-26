import { useCallback, useMemo, useRef, useState } from "react";

// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridReact } from "ag-grid-react";
import { ICellRendererParams } from "ag-grid-community";
import EmptyGridLayout from "./emptyGridLayout";

const EmptyAgGridExample = () => {
    const emptyGridRef = useRef<AgGridReact>(null);
    const [rowData] = useState([]);
    const [ emptyClass ] = useState(rowData.length > 0 ? "" : "ag-grid-empty");

    const [columnDefs] = useState([
        { field: 'column01', headerName: '헤더헤더01(헤더 클래스추가)', headerClass: "asdfasdf" },
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
        { field: 'column03', headerName: '헤더헤더03(컬럼툴팁)',  },
        { field: 'column04', headerName: '헤더헤더04(소팅적용)', sortable: true, unSortIcon: true,
            icons: {
                sortAscending: '<i class="ico-sort-asc"></i>', //텍스트도 가능하다. ex : 'ASC'
                sortDescending: '<i class="ico-sort-desc"></i>',
            },
        },
        { field: 'column05', headerName: '헤더헤더05(좌로정렬-헤더는 별도 적용 없음)', cellStyle: { textAlign: 'left'} },
        { field: 'column06', headerName: '헤더헤더06(우로정렬)', cellStyle: { textAlign: 'right'} },
        { field: 'column07', headerName: '헤더헤더07(센터정렬)', cellStyle: { textAlign: 'center'} },
        { field: 'column08', headerName: '헤더헤더08(버튼)', },
        { field: 'column09', headerName: '헤더헤더09(버튼)', },
    ])


    const emptyGridComponent = useMemo(() => {
        return EmptyGridLayout;
    }, []);

    const onEmptyGridReady = useCallback((params) => {
        emptyGridRef.current!.api.sizeColumnsToFit();
    }, []);


    return (
        <>
            <AgGridReact
                className={emptyClass}
                ref={emptyGridRef}
                rowData={[]}
                columnDefs={columnDefs}
                onGridReady={onEmptyGridReady}
                noRowsOverlayComponent ={emptyGridComponent}
                rowHeight={64}
                domLayout={'autoHeight'}
            />

        </>
    )
}

export default EmptyAgGridExample;