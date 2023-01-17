import Highcharts from 'highcharts'
import HighchartsReact from "highcharts-react-official";

const HighChartComponent = () => {
    const options: Highcharts.Options = {
        title: {
            text: 'My chart'
        },
        credits: {
            enabled: false
        },
        yAxis: [{ // Primary yAxis
            labels: {
                format: '{value}°C',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            title: {
                text: 'Temperature',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            }
        }, { // Secondary yAxis
            title: {
                text: 'Precipitation',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            labels: {
                format: '{value} mm',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            opposite: true
        }],
        tooltip: {
            shared: true
        },
        legend: {
            align: 'left',
            x: 180,
            verticalAlign: 'top',
            y: 80,
            floating: true,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || // theme
                'rgba(255,255,255,0.25)'
        },
        series: [{
            name: 'Precipitation',
            type: 'line',
            yAxis: 1,
            data: [27.6, 28.8, 21.7, 34.1, 29.0, 28.4, 45.6, 51.7, 39.0,
                60.0, 28.6, 32.1],
            tooltip: {
                valueSuffix: ' mm'
            }
    
        }, {
            name: 'Temperature',
            type: 'line',
            data: [-13.6, -14.9, -5.8, -0.7, 3.1, 13.0, 14.5, 10.8, 5.8,
                -0.7, -11.0, -16.4],
            tooltip: {
                valueSuffix: '°C'
            }
        }]
    }

    return ( 
    <>
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    </>
    
    )
}

export default HighChartComponent;