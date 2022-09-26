/** 차트 컴포넌트화를 진행하면서 필요했던 기능 정리
 * 오랫동안 무작정 찾기 보다는 일단 구현 해두고 나서 나중에 리팩토링 하자는 마인드.
*/

//차트 헤더의 셀렉트박스에서 최초 진입 시 라벨을 읽을 수 없을 때 사용했던 기능.
interface chartConfig {
    chartType?: string,
    categories: any[],
    leftSelectName: string,
    series01: any[],
    rightSelectName: string,
    series02: any[],
}

export function makeChartOption(categories, leftSelectName, series01, rightSelectName, series02){
    
    return {
        categories: categories,
        leftSelectName : leftSelectName,
        series01 : series01,
        rightSelectName : rightSelectName,
        series02 : series02
    }
};
export function lineChartConfig(props:chartConfig){
    
    return {
        //이하 기존의 옵션들 가져옴
        lang: { thousandsSep: ',', noData: "데이터 없음요. 체크바람요."},
        title: { text: '' },
        colors: ['#fb4c4c', '#fb814c', '#fbc74c', '#fbf94c', '#96fb4c', '#4cfb7d', '#4cfbc3', '#4cedfb', '#4cbbfb', '#4c75fb', '#604cfb', '#a64cfb', '#ed4cfb', '#fb4cb7', '#fb4c6d'],
        // 오른쪽 하단 highchart 표기 미설정,
        credits: { enabled: false },
        // 한 차트 내의 2개 이상의 데이터가 노출 될 경우 마우스 오버 시 같이 나오도록
        tooltip: { shared: true, crosshair: true, headerFormat: '<span style="font-weight: bold;">{point.key}</span><br/>', borderColor: '#CCC' },
        // 차트 하단의 데이터 표기 항목 배경
        legend: { backgroundColor: 'white', borderColor: '#CCC', borderWidth: 1}, 
        chart: { type: 'line', spacingLeft: 0, spacingRight: 0, marginTop: 30,},
        xAxis: { categories: props.categories},
        yAxis: [{ min: 0, title: { text: props.leftSelectName.split("").join("<br/>"), rotation:0, margin: 10}, labels:{format:'{value:,.0f}'}}
        , { min: 0, title: { text: props.rightSelectName.split("").join("<br/>"), rotation:0, margin: 10}, labels:{format:'{value:,.0f}'}, opposite : true}],

        series: [{ name: props.leftSelectName, yAxis:0, data: props.series01}, { name: props.rightSelectName, yAxis:1, data: props.series02}],
    }
    
}

export function DoubleLineChartConfig(props:chartConfig){
    return {
        //이하 기존의 옵션들 가져옴
        lang: { thousandsSep: ',', noData: "데이터 없음요. 체크바람요."},
        title: { text: '' },
        colors: ['#fb4c4c', '#fb814c', '#fbc74c', '#fbf94c', '#96fb4c', '#4cfb7d', '#4cfbc3', '#4cedfb', '#4cbbfb', '#4c75fb', '#604cfb', '#a64cfb', '#ed4cfb', '#fb4cb7', '#fb4c6d'],
        // 오른쪽 하단 highchart 표기 미설정,
        credits: { enabled: false },
        // 한 차트 내의 2개 이상의 데이터가 노출 될 경우 마우스 오버 시 같이 나오도록
        tooltip: { shared: true, crosshair: true, headerFormat: '<span style="font-weight: bold;">{point.key}</span><br/>', borderColor: '#CCC' },
        // 차트 하단의 데이터 표기 항목 배경
        legend: { backgroundColor: 'white', borderColor: '#CCC', borderWidth: 1}, 
        chart: { type: 'line', spacingLeft: 0, spacingRight: 0, marginTop: 30,},
        xAxis: { categories: props.categories},
        yAxis: [{ min: 0, title: { text: props.leftSelectName.split("").join("<br/>"), rotation:0, margin: 10}, labels:{format:'{value:,.0f}'}}
        , { min: 0, title: { text: props.rightSelectName.split("").join("<br/>"), rotation:0, margin: 10}, labels:{format:'{value:,.0f}'}, opposite : true}],
        series: [{ name: props.leftSelectName, yAxis:0, data: props.series01}, { name: props.rightSelectName, yAxis:1, data: props.series02}],
    }
    
}

