import { ValueFormatterParams } from "ag-grid-community";

/* 그리드 내부 숫자 이쁘게 찍기 
    valueFormatter: numberFormat
*/
export const numberFormat = (params: ValueFormatterParams) => {
    return Math.floor(params.value).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
};

/* 그리드 내부 숫자 이쁘게 하기 + 오른쪽에 텍스트 붙여주기
    valueFormatter: (params) => appendText(params.value, "원")
 */
export const appendText = (params: ValueFormatterParams, text) => {
    const number = Math.floor(params.value);
    if(isNaN(number)) return params.value + text;
    else return numberFormat(params) + text;
}

/* 마스킹 처리 */
export const maskText = (params: ValueFormatterParams, maskCnt: number, criterion?: any ) => {
    var tmp = params.value.split(criterion);
    var idx = tmp[0].length
	var maskText = idx<=maskCnt? tmp[0].slice(0,1) : tmp[0].slice(0,idx-maskCnt);
	var maskMax = idx<=maskCnt? idx-1: maskCnt; 
	for(var i=0; i<maskMax; i++) maskText = maskText +'*';
	return maskText+criterion+tmp[1];
}

/* 리포트 데이터 등에서 사용할만한 날짜 포맷 변환 기능. 모멘트 쓰고 싶진 않을 때는 이걸로... */
export const dateFormat = (params:ValueFormatterParams, dot?: string) => {
    if(params.value.length !== 8) return params.value;
    return params.value.replace(/(\d{4})(\d{2})(\d{2})/g, dot === undefined ? '$1-$2-$3' : `$1${dot}$2${dot}$3`);
}