import { ColDef, ICellRendererParams } from "ag-grid-community";
import { Collapse, Typography, notification } from "antd";
import { ChangeEvent } from "react";
import { useRef, useState } from 'react';
import ReactTooltip from "react-tooltip";
import GridSection from "../../../components/agGrid/gridSection";
import KwdRegGridSection from "../../../components/agGrid/kwdRegGridSection";
import { Button } from "../../../components/common/button";
import InputNumber from "../../../components/common/input/inputNumber";
import { InnerInput } from "../../../components/common/input";
import { ModalComponent } from "../../../components/common/modal";
import { AdGroupAddModalComponent } from "../../../components/common/modal/list/adGroupAddModalComponent";
import SelectBoxComponent from "../../../components/common/selectBox/selectBoxComponent";
import ContentHeader from "../../../components/layouts/header/contentHeader";
import { DdComponent, DtComponent } from "../../../components/layouts/table/dl";
import PageSearchFilter from "../../../components/searchFilter/pageSearchFilter";
//테스트 데이터 임포트
import dummyItemList from '../../../testDatas/adRegData.json';

//템플릿이니깐 그냥 카테고리는 퉁친다. 프로젝트에서는 데이터를 받아오는 구조로 변경.
const categoryOptionList1 = [{name:"aaa", value: "aaa"},{name:"bbb", value: "bbb"},{name:"ccc", value: "ccc"},{name:"ddd", value: "ddd"}];
const categoryOptionList2 = [{name:"aaaa", value: "aaaa"},{name:"bbbb", value: "bbbb"},{name:"cccc", value: "cccc"},{name:"dddd", value: "dddd"}];
const categoryOptionList3 = [{name:"aaaaa", value: "aaaaa"},{name:"bbbbb", value: "bbbbb"},{name:"ccccc", value: "ccccc"},{name:"ddddd", value: "ddddd"}];
const categoryOptionList4 = [{name:"aaaaaa", value: "aaaaaa"},{name:"bbbbbb", value: "bbbbbb"},{name:"cccccc", value: "cccccc"},{name:"dddddd", value: "dddddd"}];

interface itemVo { itemId: number, itemNo: string, itemName: string }
const AdReg = () => {
    /** 상태 선언 */
    //collapse 조작을 위한 키 선언
    const [ activeKey, setActiveKey ] = useState(["adRegPanel01"]);

    //조회 필터에 사용될 컴포넌트 선언
    const [ searchText, setSearchText] = useState("");
    const [ category01, setCategory01 ] = useState("");
    const [ category02, setCategory02 ] = useState("");
    const [ category03, setCategory03 ] = useState("");
    const [ category04, setCategory04 ] = useState("");
    //상품 데이터
    const [ itemData, setItemData ] = useState([]);
    //선택한 상품 데이터
    const [ selectedItemData, setSelectedItemData ] = useState<itemVo>();
    //상품 선택 후 3번째 판넬에 들어갈 타이틀
    const [ itemSelectTitle, setItemSelectTitle] = useState("추가 입력 후 등록");
    //그룹 리스트 및 생성용
    const [ agroupList, setAgroupList] = useState([{name:"인생세일", value: "190315890"},{name:"기타", value: "20348923"}]);
    //그룹 선택 
    const [ agroupId, setAgroupId] = useState("");
    //신규 그룹 생성 모달
    const [ agroupModalVisible, setAgroupModalVisible] = useState(false);
    //신규 그룹 명
    const [ newAgroupName, setNewAgroupName] = useState("");
    //입찰가 입력
    const [ bidCost, setBidCost ] = useState(0);
    //입찰가 모달창 보여주기
    const [ itemBidCostModalVisible, setItemBidCostModalVisible] = useState(false);
    //키워드 입력 리스트 노출 옵션
    const [ kwdGridChecked, setKwdGridChecked] = useState(false);
    //키워드 입력 그리드의 데이터 모음
    const [kwdRegRowData, setKwdRegRowData] = useState([]);
    //광고 등록 시 키워드 등록 그리드에서 최종적으로 데이터 체크를 하기 위한 ref 설정
    const kwdRegGridRef = useRef<any>();
    
    /** 기능 선언 */
    const searchFilterOptions = [
        {
            title: "상품명 입력",
            component: [<InnerInput name={"searchText"} placeholder={"검색어 입력해랏"} value={searchText} onChange={setSearchText} />]
        },
        {
            title: "카테고리 선택",
            component: [
                <SelectBoxComponent key={"ct01"} placeholder={"대카 선택"} optionList={categoryOptionList1} changeFn={setCategory01} />,
                <SelectBoxComponent key={"ct02"} placeholder={"중카 선택"} optionList={categoryOptionList2} changeFn={setCategory02} />,
                <SelectBoxComponent key={"ct03"} placeholder={"소카 선택"} optionList={categoryOptionList3} changeFn={setCategory03} />,
                <SelectBoxComponent key={"ct04"} placeholder={"세카 선택"} optionList={categoryOptionList4} changeFn={setCategory04} />,
            ]
        },
    ]
    //상품 조회 이벤트. 조회 후에 판넬을 열어준다.
    const searchEvent = () => {
        const body = { searhcText : searchText, ct01: category01, ct02: category02, ct03: category03, ct04: category04 }
        console.log(body);
        //apiCall이 필요하다..
        // apiCall.post("/post/searchAdGroupReport", body)
        // .then(res => { setReportData(res.data)})
        // .catch(error => message.error(SEARCH_SYSTEM_ERROR_MSG));
        //setReportData(dataList);
        //상품 그리드에 표시될 데이터 적재 후 아코디언을 조종한다.
        setItemData(dummyItemList);
        setActiveKey((prev) => { return [...prev, "adRegPanel02"] });
    }

    //상품선택 그리드의 버튼 랜더러
    const itemGridButtonRenderer = (props: ICellRendererParams) => {
        const rowData = props.data;
        const buttonInCellClick = () => {
            console.log("클릭", rowData);
            setItemSelectTitle("선택한 상품 명 : " + rowData.itemName);
            setSelectedItemData(rowData);
            setActiveKey((prev) => {
                return [...prev, "adRegPanel03"]
            });
        };
        return (
            <button type="button" className="btn solid blue xxsmall" onClick={buttonInCellClick}>버튼</button>
        );
    };
    
    const [columnDefs] = useState<ColDef[]>([
        { field: 'itemId', headerName: '상품 ID', cellStyle: { textAlign: 'left'}  },
        { field: 'itemNo', headerName: '상품 번호', cellStyle: { textAlign: 'left'}  },
        { field: 'itemName', headerName: '상품명', cellStyle: { textAlign: 'left'}  },
        { field: 'column09', headerName: 'DP용(버튼)', cellRenderer: itemGridButtonRenderer, cellStyle: { textAlign: 'center'}}
    ])

    //입력한 입찰가 리셋
    const bidCostReset = () => setBidCost(0); 
    //신규 그룹 등록. 템플릿이므로 여기서는 그냥 로컬 데이터로 넣어줌.
    const newAgroupInsertEvent = () => {
        setAgroupList((prev) => {
            return [...prev, {name: newAgroupName, value: newAgroupName}]
        });
        //생성한 항목으로 변경
        setAgroupId(newAgroupName);

        //다이얼로그 닫고 메시지 출력
        setAgroupModalVisible(false);
        notification.open({
            message: '신규 광고그룹 생성',
            description:
            `광고그룹명 : ${newAgroupName} 생성이 완료되었습니다.`,
            onClick: () => {
                console.log('Notification Clicked!');
            },
        })
        
    }

    function makeKwdLstMsg(kwdRegRowData) {
        let kwdListMsg = "[";
        kwdRegRowData.forEach((data,index) => kwdListMsg += `{이름 : ${data.kwdName} / 입찰가 : ${data.bidCost}}`);
        kwdListMsg += "]";
        return kwdListMsg;
    }
    const adRegEvent = () => {
        //최종적으로 입력한 데이터를 알아내기 위해 자식 컴포넌트의 함수를 호출한다.
        setKwdRegRowData(kwdRegGridRef.current.kwdList());
        console.log("광고 등록을 위한 파라미터 체크");
        console.log(kwdRegRowData);
        let kwdListMsg = makeKwdLstMsg(kwdRegRowData);
        const body = {
            itemId : selectedItemData.itemId,
            itemNo : selectedItemData.itemNo,
            itemBidCost : bidCost,
            agroupId : agroupId,
            kwdList : kwdRegRowData
        }

        //이 부분부터 서버로 보내면 될듯. 아래는 퍼블리시 기준으로 파라미터 정상적으로 읽히는 지 체크.
        // let kwdListMsg = "[";
        // body.kwdList.forEach((data,index) => kwdListMsg += `{이름 : ${data.kwdName} / 입찰가 : ${data.bidCost}}`);
        // kwdListMsg += "]";
        
        console.log(body);

        notification.open({
            message: '광고 등록 파라미터 체크',
            description:
            `상품 id : ${body.itemId} / 상품 번호 : ${body.itemNo} / 그룹 id : ${body.agroupId} / 키워드 리스트 : ${kwdListMsg}`,
            onClick: () => {
                console.log('Notification Clicked!');
            },
        });
    }
    
    return (
        <>
        <ContentHeader title="인터파크를 본 딴 레이아웃(디자인 필요하긴 함..)" />
        <div className="content-body">
                <div className="container-fluid">
                    {/* 그리드 섹션 */}
                    <div className="row">
                        <div className="col col-12">
                        <Collapse activeKey={activeKey} >
                            <Collapse.Panel header="상품 조회" key={"adRegPanel01"}>
                                <section className="wrap-section wrap-filter">
                                    <PageSearchFilter searchFilterOptions={searchFilterOptions} searchEvent={searchEvent} />
                                </section>
                            </Collapse.Panel>
                            <Collapse.Panel header="상품 선택" key={"adRegPanel02"}>
                                <GridSection 
                                    title={"상품등록 그리드"}
                                    csvBtn={false}
                                    columnDefs={columnDefs}
                                    gridData={itemData}
                                />
                            </Collapse.Panel>
                            <Collapse.Panel header={itemSelectTitle} key={"adRegPanel03"}>
                                <section className="wrap-section wrap-tbl">
                                    <div className="box-body">
                                        <div className="tbl">
                                            <dl>
                                                <dt>
                                                    <DtComponent title={"그룹 선택"} highlight={true}></DtComponent>
                                                </dt>
                                                <dd>
                                                    <DdComponent>
                                                        {/* DdComponent의 children 영역 시작 */}
                                                        <SelectBoxComponent 
                                                            key={"searchDiv"} 
                                                            width={200} 
                                                            value={agroupId}
                                                            placeholder={"그룹 선택"} 
                                                            optionList={agroupList} 
                                                            changeFn={setAgroupId}
                                                        />
                                                        <Button onClick={() => setAgroupModalVisible(true)}>그룹 신규 생성</Button>
                                                        <AdGroupAddModalComponent
                                                            modalKey={"adGroupAddModal"}
                                                            title="신규 그룹 생성"
                                                            visible={agroupModalVisible}
                                                            setVisible={setAgroupModalVisible}
                                                            agroupName={newAgroupName}
                                                            setAgroupName={setNewAgroupName}
                                                            addGroupFn={newAgroupInsertEvent}
                                                        />
                                                        {/* DdComponent의 children 영역 종료 */}       
                                                    </DdComponent>
                                                </dd>
                                            </dl>
                                            <dl>
                                                <dt>
                                                    <DtComponent title={"상품입찰가 \n (VAT 제외)"} highlight={true}>
                                                        <Typography.Link href="#!">상품입찰가란?</Typography.Link>
                                                        <ModalComponent
                                                            modalKey={"itemBidCostModal"}
                                                            title={"상품입찰가 설명"}
                                                            visible={itemBidCostModalVisible}
                                                            setVisible={setItemBidCostModalVisible}
                                                            descriptions={[
                                                                "상품 입찰가 는 인터파크 만의 인공지능(AI) 광고 시스템인 쎈PICK AI+ 를 통한 광고 노출 시 적용되는 입찰가로, 상품 입찰가 이하의 금액에서 자동으로 효율적으로 입찰이 이뤄집니다. 쎈PICK AI+ 는 상품 정보를 분석하여 상품 별 구매 확률이 높은 페이지를 알아서 PICK하여 노출합니다.",
                                                                "페이지 별 노출 위치 안내: 검색 결과 페이지 카테고리 페이지 상품 상세 페이지",
                                                                "본 상품에 대해 자동 노출되는 키워드 예시 입니다. 이 외에도 다양한 키워드가 자동 추출& 자동 평가 됩니다."
                                                            ]}
                                                        />
                                                    </DtComponent>
                                                </dt>
                                                <dd>
                                                    <DdComponent>
                                                        <div className="input-group">
                                                            <InputNumber 
                                                                placeholder={"상품입찰가를 입력해주세요."}
                                                                numberValue={bidCost}
                                                                setNumberValue={setBidCost}
                                                                numberReset={bidCostReset}
                                                            />
                                                            <p className="txt-desc bullet-dot">
                                                                권장입찰가 : 90 ~ 90원  <a data-for="bidCostTooltip" className="ico-tooltip" data-tip  />
                                                            </p>
                                                                {/* 개발모드에서는 툴팁이 안 사라짐.. 빼고 싶으면 index.tsx에서 strictMode 제거 하면 됨. */}
                                                            <ReactTooltip
                                                                id="bidCostTooltip" getContent={dataTip => 
                                                                <p className='fz-14 fw-med fc-0'>고연관 키워드에 정상노출되기 위한 적정입찰가 입니다.</p>}
                                                            />
                                                        </div>
                                                    </DdComponent>
                                                </dd>
                                            </dl>
                                            <dl>
                                                <dt>
                                                    <DtComponent title={"키워드 선택\n(선택)"} />
                                                </dt>
                                                <dd>
                                                    <DdComponent>
                                                        <div className="comp-checkbox">
                                                            <input type="checkbox" id="inp-check-01" 
                                                                checked={kwdGridChecked} 
                                                                onChange={() => setKwdGridChecked(!kwdGridChecked)} 
                                                            />
                                                            <label htmlFor="inp-check-01">체크박스</label>
                                                        </div>
                                                    </DdComponent>
                                                </dd>
                                            </dl>
                                            { kwdGridChecked && 
                                                <dl>
                                                    <dt>
                                                        <DtComponent title="키워드 입력 리스트"></DtComponent>
                                                    </dt>
                                                    <dd>
                                                        <DdComponent>
                                                            <section className="wrap-section wrap-datagrid">
                                                                <KwdRegGridSection 
                                                                title={"키워드 입력 그리드"}
                                                                csvBtn={false}
                                                                setKwdRegRowData={setKwdRegRowData}
                                                                ref={kwdRegGridRef}
                                                                />
                                                            </section>
                                                        </DdComponent>
                                                    </dd>
                                                </dl>
                                            }
                                        </div>
                                    </div>
                                </section>
                                <button type="button" className="btn solid blue xlarge" onClick={adRegEvent}>광고 등록</button>
                            </Collapse.Panel>
                        </Collapse>
                        </div>
                    </div>
                </div>
            </div>
        
        </>
    )
}
export default AdReg;