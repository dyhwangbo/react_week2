import { ColDef, ICellRendererParams } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import KwdRegGridMain from "./kwdGridMainLayout";
import EmptyGridLayout from "./layout/emptyGridLayout";
import GridFilter from "./layout/gridFilterLayout";
import GridHeader from "./layout/gridHeaderLayout";
import GridMain from "./layout/gridMainLayout";

const KwdRegGridSection = forwardRef((props: any, ref: any) => {

    useImperativeHandle(ref, () => ({
        kwdList: () => {
            console.log("GridDatas 실행");
            if(gridRef.current!.api === undefined) return;
            let rowData = [];
            
            gridRef.current!.api.forEachNode(node => rowData.push(
                {'kwdName' : node.data.kwdName, 'bidCost' : node.data.bidCost}
            ))
            return rowData;
        }
    }));

    
    const gridRef = useRef<AgGridReact>(null);

    const [kwdRegGridRowData, setKwdRegGridRowData] = useState([]);
    
    const kwdGridInfoButtonRenderer = (props: ICellRendererParams) => {
        const buttonInCellClick = () => {
            let rowData = [];
            gridRef.current!.api.forEachNode(node => node.rowIndex !== props.rowIndex ? rowData.push(node.data) : null);
            setKwdRegGridRowData(rowData);
        };
    
        return (
            <button type="button" className="btn solid blue xxsmall" onClick={buttonInCellClick}>삭제</button>
        );
    };

    const [kwdGridColumnDefs] = useState<ColDef[]>([
        { field: 'kwdName', headerName: '키워드 입력', editable: true, cellStyle: { textAlign: 'left'}  },
        { field: 'bidCost', headerName: '입찰가 입력(vat 제외)', editable: true, cellStyle: { textAlign: 'left'}  },
        { field: 'column09', headerName: '로우 삭제', cellRenderer: kwdGridInfoButtonRenderer, cellStyle: { textAlign: 'center'} },
    ])

    //데이터 없는 경우 레이아웃 설정
    const emptyGridLayout = useMemo(() => {
        return EmptyGridLayout;
    }, []);

    //그리드 준비
    const onGridReady = useCallback((params) => {
        gridRef.current!.api.sizeColumnsToFit();
    }, []);

    const addRowEvent = () => {
        setKwdRegGridRowData((prev) => { return [...prev, []]}) 
        console.log("이벤트 후 ", kwdRegGridRowData);
     }

    useEffect(() => {
        props.setKwdRegRowData(kwdRegGridRowData);
    },[ kwdRegGridRowData])
    
    return (
        <>
            <GridHeader title={props.title} csvBtn={false} />
            {props.gridFilter && <GridFilter searchFilterOptions={props.searchFilterOptions} searchEvent={props.searchEvent}  /> }
            <KwdRegGridMain
                gridRef={gridRef}
                columnDefs={kwdGridColumnDefs}
                onGridReady={onGridReady}
                emptyGridLayout={emptyGridLayout}
                gridData={kwdRegGridRowData} 
            />
            {/* {props.pagination && <GridFooter />} */}
            <button type="button" className="btn solid blue xxsmall" onClick={addRowEvent}>로우 추가</button>
        </>
    )
});
export default KwdRegGridSection;