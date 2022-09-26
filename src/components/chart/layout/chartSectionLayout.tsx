import ChartSelectBox from "../../common/selectBox/chartSelectBoxComponent";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { DoubleLineChartConfig } from "./function/chartConfigs";



const ChartSectionLayout = (props) => {
    return (
        <>
            {props.chartHeaderDisplay && 
                <div className="box-header">
                    <div className="box-left">
                        <h2 className="fz-20 fw-med fc-10">{props.chartHeaderTitle}</h2>
                    </div>
                    <div className="box-right">
                        {props.chartSelectOptions !== undefined &&
                            <>
                                <div className="box-right">
                                    <ChartSelectBox
                                        key={"leftSelect"} 
                                        defaultValue={props.leftDefaultValue} 
                                        optionList={props.chartSelectOptions} 
                                        setName={props.setLeftSelectName} 
                                        setValue={props.setLeftSelectValue}
                                    />
                                    <ChartSelectBox 
                                        key={"rightSelect"} 
                                        defaultValue={props.rightDefaultValue} 
                                        optionList={props.chartSelectOptions} 
                                        setName={props.setRightSelectName} 
                                        setValue={props.setRightSelectValue}
                                    />
                                </div>
                            </>
                        }
                    </div>
                </div>
            }
            <div className="box-body">
                <div className="box-top">
                    <div className="line-bar-chart-area">
                        <HighchartsReact
                            highcharts={Highcharts}
                            containerProps={{ style: { width: '100%', height: '100%' } }}
                            options={DoubleLineChartConfig(props.chartConfigs)}
                        />
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default ChartSectionLayout;