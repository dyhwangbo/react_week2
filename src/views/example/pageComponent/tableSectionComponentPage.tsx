import { Button } from "../../../components/common/button";
import ContentHeader from "../../../components/layouts/header/contentHeader";
import BoxHeaderComponent from "../../../components/layouts/section/table/header/boxHeaderComponent";

const TableSectionComponentPage = () => {

    return ( 
        <>
        <ContentHeader title="컴포넌트 페이지" />
            <div className="content-body">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col col-12">
                            <section className="wrap-section wrap-tbl">
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
        </>
    )
}

export default TableSectionComponentPage;