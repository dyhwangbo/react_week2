import { AgGridReact } from "ag-grid-react";
import React from "react";
import { useCallback, useMemo, useRef } from "react";
import EmptyGridLayout from "./layout/emptyGridLayout";
import GridFilter from "./layout/gridFilterLayout";
import GridHeader from "./layout/gridHeaderLayout";
import GridMain from "./layout/gridMainLayout";

const GridSection = (props) => {
    //메인 그리드
    const gridRef = useRef<AgGridReact>(null);
    //데이터 없는 경우 레이아웃 설정
    const emptyGridLayout = useMemo(() => {
        return EmptyGridLayout;
    }, []);
    //그리드 준비
    const onGridReady = useCallback((params) => {
        gridRef.current!.api.sizeColumnsToFit();
    }, []);

    //페이지네이션
    const paginationRef = useRef<any>(null);
    // 그리드에서 페이징 변경시 pagination 에 있는 함수 호출
    const changePagination = () => {
        paginationRef.current!.onPaginationChanged();
    };
    //CSV EXPORT
    const csvExport = useCallback(() => {
        gridRef.current!.api.exportDataAsCsv();
    }, []);
    
    console.log("리랜더링 확인");
    return (
        <>
            <GridHeader title={props.title} csvBtn={props.csvBtn} csvExport={csvExport} />
            {props.gridFilter && <GridFilter searchFilterOptions={props.searchFilterOptions} searchEvent={props.searchEvent}  /> }
            <GridMain 
                gridRef={gridRef}
                columnDefs={props.columnDefs}
                onGridReady={onGridReady}
                emptyGridLayout={emptyGridLayout}
                paginationRef={paginationRef}
                changePagination={changePagination}
                gridData={props.gridData} 
            />
            {/* {props.pagination && <GridFooter />} */}
        </>
    )
}
//부모 컴포넌트에서 리랜더링(ex : input에 검색어 입력 등)이 발생했을 경우 같이 리랜더링 되어서 memo 추가
//React.memo : props가 바뀌었을 때만 리랜더링
export default React.memo(GridSection);