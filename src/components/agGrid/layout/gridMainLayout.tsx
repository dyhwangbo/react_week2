import { ColDef, ICellRendererParams, ValueFormatterParams } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useRef, useState, useMemo, useCallback } from "react";
import EmptyGridLayout from "./emptyGridLayout";

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import GridPagination from "../gridPagination";

const GridMain = (props) => {
    //그리드 데이터
    const rowData = props.gridData;
    const columnDefs = props.columnDefs;
    console.log(columnDefs);
    //실제 작업시에는 props로 불러오는 형태로 변경
    return (
        <>
            <div className="box-body">
                {rowData.length === 0 ? 
                <div className="ag-grid-empty">
                    <AgGridReact
                        ref={props.gridRef}
                        rowData={rowData}
                        columnDefs={columnDefs}
                        onGridReady={props.onGridReady}
                        noRowsOverlayComponent ={props.emptyGridLayout}
                        rowSelection={'multiple'}
                        suppressRowClickSelection={true}
                        tooltipShowDelay={0} // 너무 느리게 떠서 추가 옵션 설정
                        tooltipHideDelay={500000}
                        rowHeight={64}
                        pagination={true}
                        paginationPageSize={10}
                        suppressPaginationPanel={true}
                        onPaginationChanged={props.changePagination}
                        domLayout={'autoHeight'}
                    />
                </div>
                :
                <AgGridReact
                    ref={props.gridRef}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    onGridReady={props.onGridReady}
                    noRowsOverlayComponent ={props.emptyGridLayout}
                    rowSelection={'multiple'}
                    suppressRowClickSelection={true}
                    tooltipShowDelay={0} // 너무 느리게 떠서 추가 옵션 설정
                    tooltipHideDelay={500000}
                    rowHeight={64}
                    pagination={true}
                    paginationPageSize={10}
                    suppressPaginationPanel={true}
                    onPaginationChanged={props.changePagination}
                    domLayout={'autoHeight'}
                />
            }
                
            </div>
            <div className="box-footer">
                <GridPagination gridRef={props.gridRef} ref={props.paginationRef}/>
            </div>

        </>
    )
}

export default GridMain;