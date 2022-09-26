import { useEffect, useState } from "react";
import ChartSectionLayout from "./layout/chartSectionLayout";
import { makeChartOption } from "./layout/function/chartConfigs";

const chartSelectOptions = [
    {name:"노출수", value: "impCnt"},
    {name:"클릭수", value: "clickCnt"},
    {name:"전환수", value: "convCnt"},
    {name:"할인광고비", value: "dcAdspend"},
    {name:"직접 판매 금액", value: "directSellCost"},
    {name:"간접 판매 금액", value: "indirSellCost"},
    {name:"판매금액", value: "sellCost"}
];

const ChartSection = (props) => {
    //부모 컴포넌트에서 받아온 원본 데이터.
    const chartData = props.data;

    //헤더 부분의 셀렉트 박스
    const [ leftSelectName, setLeftSelectName] = useState(convertSelectData("name", props.leftSelectName));
    const [ leftSelectValue, setLeftSelectValue] = useState<string>(convertSelectData("value", props.leftSelectName));
    const [ rightSelectName, setRightSelectName] = useState(convertSelectData("name", props.rightSelectName));
    const [ rightSelectValue, setRightSelectValue] = useState<string>(convertSelectData("value", props.rightSelectName));

    //카테고리 및 라인별 데이터
    const [ categories, setCategories ] = useState([]);
    const [ series01, setSeries01 ] = useState([]);
    const [ series02, setSeries02 ] = useState([]);

    const chartConfigs = makeChartOption(categories, leftSelectName, series01, rightSelectName, series02);

    //데이터 업데이트 시 실행
    function updateSeries(){
        const tempSeries01 = [];
        const tempSeries02 = [];
        chartData.map((item) => {
            tempSeries01.push(getSeriesDataBySelectValue(leftSelectValue, item));
            tempSeries02.push(getSeriesDataBySelectValue(rightSelectValue, item));
        })
        setSeries01(tempSeries01);
        setSeries02(tempSeries02);
    }

    //차트 데이터 변경 / 셀렉트박스 데이터 변경 시 차트 업데이트
    useEffect(() => {
        if(chartData.length === 0) return;
        
        const tempCategorys = [];
        //카테고리 및 시리즈 설정
        chartData.map((item) => {
            tempCategorys.push(item.basicDate);
        })
        //series01,02 설정
        setCategories(tempCategorys);
        updateSeries();
    }, [chartData, leftSelectName, rightSelectName]);

    

    return (
        <>
            <ChartSectionLayout 
                chartHeaderDisplay={props.chartHeaderDisplay}
                chartHeaderTitle={props.chartHeaderTitle}
                chartConfigs={chartConfigs}
                chartSelectOptions={chartSelectOptions}
                leftDefaultValue={leftSelectValue}
                rightDefaultValue={rightSelectValue}
                setLeftSelectName={setLeftSelectName}
                setLeftSelectValue={setLeftSelectValue}
                setRightSelectName={setRightSelectName}
                setRightSelectValue={setRightSelectValue}
            />
        </>

    )
}

export default ChartSection;

function convertSelectData(type: string, selectName: any) {
    if(selectName === undefined) return "";
    else return type === "name" ? selectName : getValueByName(selectName);

}

export function getNameByValue(defaultValue){
    switch(defaultValue){
        case "impCnt" : return "노출수"
        case "clickCnt" : return "클릭수"
        case "convCnt" : return "전환수"
        case "dcAdspend" : return "할인광고비"
        case "directSellCost" : return "직접 판매 금액"
        case "indirSellCost" : return "간접 판매 금액"
        case "sellCost" : return "판매 금액"
        default : return "-"
    }
}

export function getValueByName(defaultValue){
    switch(defaultValue){
        case "노출수" : return "impCnt"
        case "클릭수" : return "clickCnt"
        case "전환수" : return "convCnt"
        case "할인광고비" : return "dcAdspend"
        case "직접 판매 금액" : return "directSellCost"
        case "간접 판매 금액" : return "indirSellCost"
        case "판매 금액" : return "sellCost"
        default : return "-"
    }
}


export function getSeriesDataBySelectValue(value: string, item: any): any {
    switch(value){
        case "impCnt" : return item.impCnt
        case "clickCnt" : return item.clickCnt
        case "convCnt" : return item.convCnt
        case "dcAdspend" : return item.dcAdspend
        case "directSellCost" : return item.directSellCost
        case "indirSellCost" : return item.indirSellCost
        case "sellCost" : return item.sellCost
        
        default : return 0
    }
}