import { ValueFormatterParams } from "ag-grid-community";

export const numberFormat = (params: ValueFormatterParams) => {
    return Math.floor(params.value).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
};