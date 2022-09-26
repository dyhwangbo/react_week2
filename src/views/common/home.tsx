import { useContext, useState } from "react";
import { AuthContext } from "../../auth/loginAuthContext";
import { Button, DisabledButton } from "../../components/common/button";
import { DatePicker } from "antd";
import moment from "moment";
const { RangePicker } = DatePicker;

const Home = () => {
    const loginContext = useContext(AuthContext);
    const [ disabled, setDisabled] = useState(false);
    //const [ footer, setFooter ] = useState();
    const onClickButton = () => {
        setDisabled(prevCheck => !prevCheck);
        console.log("disabled is ", disabled);
    }

    const footer = {
        오늘: [moment(), moment()],
        어제: [moment().startOf("month"), moment().endOf("month")],
        최근7일: [moment(), moment().add(5)],
        이번주: [moment(), moment()],
        지난주: [moment(), moment()],
        최근30일: [moment(), moment()]
    };

    const footer2 = {
        "오늘": () =>[moment(), moment()]
    };
 
    const [ testClass, setTestClass ] = useState("");
    const [ mode, setMode] = useState('date');
    const openChange = (e) => {
        console.log("로그");
        console.log(e);
        setTestClass("");
    }
    const testPanel = (v, mode) => {
        console.log("asdfasdf");
        if(mode[0] === "date") {
            setTestClass("");
        } else {
            setTestClass("zxcvzxcvjilzixcvjlzxcvjzxcvj");
        }
        

    }
    return (
        <>
        <div className="content-header">
            <h2 className="fz-24 fw-smbold fc-10">홈22222</h2>
        </div>
        <div className="content-body">
            <h2 className="fz-36 fc-1 fw-bold">바디 준비</h2>
            <button type="button" className="btn solid blue xlarge" onClick={() => {
                loginContext.logoutHandler();
            }}>로그아웃</button>

            <RangePicker className={testClass}
                // renderExtraFooter={() => "2022.05.01 ~ 2022.05.27 ( 27일 )"}
                // onOk={onOk}
                //ranges={null}
                // ranges={{
                //     오늘: [moment(), moment()],
                //     어제: [moment().startOf("month"), moment().endOf("month")],
                //     최근7일: [moment(), moment().add(5)],
                //     이번주: [moment(), moment()],
                //     지난주: [moment(), moment()],
                //     최근30일: [moment(), moment()]
                // }}
                //onOpenChange={openChange}
                
                //onPanelChange={testPanel}
                //onChange={onChangeDatepicker}
                //locale={locale}
            />
        </div>
        
        
        </>
    )
}

export default Home;