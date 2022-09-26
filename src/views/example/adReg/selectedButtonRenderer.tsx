import React from 'react';
import { ICellRendererParams } from 'ag-grid-community';

const selectedButtonRenderer = (props:ICellRendererParams, setItemSelectTitle, setSelectedItemData, setActiveKey) => {
    const rowData = props.data;
        const buttonInCellClick = () => {
            console.log("클릭", rowData);
            setItemSelectTitle("선택한 상품 명 : " + rowData.itemName);
            setSelectedItemData(rowData);

            setActiveKey((prev: any) => {
                return [...prev, "adRegPanel03"]
            });
        };
    return (
        <>
            <button type="button" className="btn solid blue xxsmall" onClick={buttonInCellClick}>버튼</button>
        </>
    )
}

export default selectedButtonRenderer