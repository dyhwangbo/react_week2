import { useEffect, useState } from "react";
import { Button, DisabledButton, IcoButton } from "../../components/common/button";
import InputText from "../../components/common/input/inputText";
import SelectBoxComponent from "../../components/common/selectBox/selectBoxComponent";
import ContentHeader from "../../components/layouts/header/contentHeader";
import BoxHeaderComponent from "../../components/layouts/section/table/header/boxHeaderComponent";

const ComponentPage = () => {
    const [ buttonDisabled, setButtonDisabled ] = useState(false);
    const [ inputText, setInputText] = useState("");
    
    return (
        <>
            <ContentHeader title="컴포넌트 페이지" />
            <div className="content-body">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col col-12">
                            <section className="wrap-section wrap-tbl">
                                <div className="box-header">
                                    <div className="box-left">
                                        <h2 className="fz-20 fw-med fc-10">각종 컴포넌트 테스트</h2>
                                            <span className="fz-14 fw-med fc-5">설명글 영역 입니다.</span>
                                            <i className="txt-essential">필수</i>
                                    </div>
                                    <div className="box-right">
                                        <button type="button" className="btn outline blue small">btn outline blue</button>
                                        <button type="button" className="btn outline gray small">btn outline gray</button>
                                        <button type="button" className="btn outline red small">btn outline red</button>
                                    </div>
                                </div>
                                {/* buttons 옵션은 map으로 표현해서 키가 필수 값임(콘솔 창에서 key 없다고 찡찡댐) */}
                                <BoxHeaderComponent 
                                    title="박스헤더 컴포넌트 테스트" 
                                    desc="설며엉" 
                                    buttons={[
                                        <Button key={123} onClick={() => console.log("11번 버튼 클릭")}>버튼011</Button>,
                                        <Button key={124} size="large" color="red" onClick={() => console.log("22번 버튼 클릭")}>버튼022</Button>,
                                        <Button key={125} size={"xlarge"} line={"outline"} color="gray" onClick={() => console.log("33번 버튼 클릭")}>버튼033</Button>
                                    ]} 
                                />
                                <div className="box-body">
                                    <div className="tbl">
                                        <dl>
                                            <dt>
                                                <div className="dt-inner">
                                                    <span className="fz-16 fw-med fc-7">버튼 컴포넌트 테스트</span>
                                                </div>
                                            </dt>
                                            <dd>
                                            <div className="form-group">
                                                <span className="comp-txt">
                                                    <span className="table">
                                                        <span className="table-cell">
                                                            {/* button 컴포넌트 테스트. 옵션 설명은 각 컴포넌트 코드 참고 */}
                                                            <Button onClick={() => console.log("1번 버튼 클릭")}>버튼01</Button>
                                                            <Button size="large" color="red" onClick={() => console.log("2번 버튼 클릭")}>버튼02</Button>
                                                            <Button size={"xlarge"} line={"outline"} color="gray" onClick={() => console.log("3번 버튼 클릭")}>버튼03</Button>
                                                            <DisabledButton>disalbed 버튼</DisabledButton>
                                                            <IcoButton onClick={() => console.log("ICO BUTTON 01 클릭")}>아이콘01</IcoButton>
                                                            <IcoButton size="large" color="gray" onClick={() => console.log("아이콘 2번 버튼 클릭")}>아이콘02</IcoButton>
                                                            <IcoButton size={"xlarge"} line={"outline"} onClick={() => console.log("ICO BUTTON 03 클릭")}>아이콘03</IcoButton>
                                                        </span>
                                                    </span>
                                                </span>
                                            </div>
                                            </dd>
                                        </dl>

                                        <dl>
                                            <dt>
                                                <div className="dt-inner">
                                                    <span className="fz-16 fw-med fc-7">INPUT TEXT 컴포넌트 테스트</span>
                                                </div>
                                            </dt>
                                            <dd>
                                            <div className="form-group">
                                                <span className="comp-txt">
                                                    <span className="table">
                                                        <span className="table-cell">
                                                            {/* input type="text" 컴포넌트 테스트. 옵션 설명은 각 컴포넌트 코드 참고 */}
                                                            <InputText onChange={setInputText}>{inputText}</InputText>
                                                            <InputText size="large" onChange={setInputText}>{inputText}</InputText>
                                                        </span>
                                                    </span>
                                                </span>
                                            </div>
                                            </dd>
                                        </dl>

                                        <dl>
                                            <dt>
                                                <div className="dt-inner">
                                                    <span className="fz-16 fw-med fc-7">셀렉트박스 컴포넌트 테스트</span>
                                                </div>
                                            </dt>
                                            <dd>
                                            <div className="form-group">
                                                <span className="comp-txt">
                                                    <span className="table">
                                                        <span className="table-cell">
                                                            {/* selectBox 컴포넌트 테스트. 옵션 설명은 각 컴포넌트 코드 참고 */}
                                                            <SelectBoxComponent 
                                                                placeholder="테스트 홀더"
                                                                width={200}
                                                                optionList={[
                                                                    {name: "aaa", value : "aaa1"}, {name: "bbb", value : "bbb1"}, {name: "ccc", value : "ccc1"}
                                                                ]} 
                                                                changeFn={(e) => console.log("value is ", e)}
                                                            />
                                                        </span>
                                                    </span>
                                                </span>
                                            </div>
                                            </dd>
                                        </dl>

                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
            <div className="t">
                <p>버튼 테스트</p>
                <Button onClick={() => { setButtonDisabled(false) }}>클릭하면 DISABLED = false로 바뀜</Button>    

                {buttonDisabled ? 
                    <DisabledButton>디스에이블드~</DisabledButton>
                    :
                    <Button onClick={() => {
                        setButtonDisabled(!buttonDisabled)
                    }}>클릭하면 DISABLED로 바뀜</Button>    
                }

                <p>셀렉트 테스트</p>
            </div>
        </>
    )
}

export default ComponentPage;
