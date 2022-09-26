import { AgGridReact } from "ag-grid-react";

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import GridPagination from "./gridPagination";
import { useMemo } from "react";
import { ColDef } from "ag-grid-community";

const KwdRegGridMain = (props) => {
    //그리드 데이터
    const rowData = props.gridData;
    const columnDefs = props.columnDefs;
    console.log(columnDefs);
    //실제 작업시에는 props로 불러오는 형태로 변경

    const defaultColDef = useMemo<ColDef>(() => {
        return {
            resizable: true
        }
    }, [])
    return (
        <>
            <div className="box-body" style={{width: 1600}}>
                {rowData.length === 0 ? 
                <div className="ag-grid-empty">
                    <AgGridReact
                        ref={props.gridRef}
                        rowData={rowData}
                        columnDefs={columnDefs}
                        defaultColDef={defaultColDef}
                        onGridReady={props.onGridReady}
                        noRowsOverlayComponent ={props.emptyGridLayout}
                        rowSelection={'multiple'}
                        suppressRowClickSelection={true}
                        tooltipShowDelay={0} // 너무 느리게 떠서 추가 옵션 설정
                        tooltipHideDelay={500000}
                        rowHeight={64}
                        domLayout={'autoHeight'}
                    />
                </div>
                :
                <AgGridReact
                    ref={props.gridRef}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    onGridReady={props.onGridReady}
                    noRowsOverlayComponent ={props.emptyGridLayout}
                    rowSelection={'multiple'}
                    suppressRowClickSelection={true}
                    tooltipShowDelay={0} // 너무 느리게 떠서 추가 옵션 설정
                    tooltipHideDelay={500000}
                    rowHeight={64}
                    domLayout={'autoHeight'}
                />
            }
                
            </div>
            <div className="box-footer">
                
            </div>

        </>
    )
}

export default KwdRegGridMain;