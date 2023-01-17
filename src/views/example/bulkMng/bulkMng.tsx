import ContentHeader from "../../../components/layouts/header/contentHeader";
import { DdComponent, DtComponent } from "../../../components/layouts/table/dl";
import SelectBoxComponent from "../../../components/common/selectBox/selectBoxComponent";
import { useEffect, useState } from "react";
import { FormGroupInput } from "../../../components/common/input/input";
import { Button } from "../../../components/common/button";

const jobReqList = [
    {name:"광고 대량 등록", value: "adBulkReg"},
    {name:"광고 대량 수정", value: "adBulkUpdate"},
    {name:"광고 대량 삭제", value: "adBulkDelete"}
];

const BulkMng = () => {
    const [ jobReqDiv, setJobReqDiv] = useState("");
    const [ jobReqName, setJobReqName] = useState("");
    const [ disabled, setDisabled] = useState(true);
    const [ file, setFile ] = useState("");

    useEffect(() => {
        if(jobReqDiv !== "") setDisabled(false);
        else setDisabled(true);
    }, [jobReqDiv]);
    return (
        <>
            <div>
                <ContentHeader title={"운영대량관리"} />
                <div className="container-fluid">
                        <div className="row">
                            <div className="col col-12">
                                {/* <!-- Wrap-Tbl : Start --> */}
                                <section className="wrap-section wrap-tbl">
                                    <div className="box-header">
                                        <div className="box-left">
                                            <h2 className="fz-20 fw-med fc-10">작업 요청</h2>
                                            <span className="fz-14 fw-med fc-5">설명글 영역 입니다.</span>
                                            <i className="txt-essential">필수</i>
                                        </div>
                                        <div className="box-right">
                                            <button type="button" className="btn outline blue small">btn outline blue</button>
                                            <button type="button" className="btn outline gray small">btn outline gray</button>
                                            <button type="button" className="btn outline red small">btn outline red</button>
                                        </div>
                                    </div>
                                    <div className="box-body">
                                        <div className="tbl">
                                            <dl>
                                                <dt>
                                                    <DtComponent title={"작업 선택"} highlight={true} />
                                                </dt>
                                                <dd>
                                                    <DdComponent>
                                                        {/* DdComponent의 children 영역 시작 */}
                                                            <SelectBoxComponent 
                                                                key={"jobReqDiv"} width={300} placeholder={"작업을 선택해주세요."} 
                                                                optionList={jobReqList} changeFn={setJobReqDiv} />
                                                        {/* DdComponent의 children 영역 종료 */}       
                                                    </DdComponent>
                                                </dd>
                                            </dl>
                                            <dl>
                                                <dt>
                                                    <DtComponent title={"다운로드"} highlight={true} />
                                                </dt>
                                                <dd>
                                                    <DdComponent>
                                                        <Button disabled={disabled}>템플릿 다운로드</Button>
                                                        <Button disabled={disabled}>전체 다운로드</Button>
                                                    </DdComponent>
                                                </dd>
                                            </dl>
                                            <dl>
                                                <dt>
                                                    <DtComponent title={"작업명"} highlight={false} />
                                                </dt>
                                                <dd>
                                                    {/* DdComponent의 children 영역 시작 */}
                                                    <FormGroupInput name={"jobReqName"} expand={true} value={jobReqName} onChange={setJobReqName}/>
                                                    {/* DdComponent의 children 영역 종료 */}       
                                                </dd>
                                            </dl>

                                            <dl>
                                                <dt>
                                                    <DtComponent title={"파일 선택"} highlight={false} />
                                                </dt>
                                                <dd>
                                                    {/* DdComponent의 children 영역 시작 */}
                                                    <FormGroupInput name={"jobReqName"} expand={true} value={jobReqName} onChange={setJobReqName}/>
                                                    {/* DdComponent의 children 영역 종료 */}       
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                </div>
                                
                다운로드
                작업명
                업로드

                등록
                취소
            </div>

            <div>
                작업 히스토리

            </div>
        </>
    )
}

export default BulkMng;