
import ReactTooltip from 'react-tooltip';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button, notification, Tabs, Upload, UploadFile } from 'antd';

import { DatePicker } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import moment from 'moment';
import 'antd/es/date-picker/locale/ko_KR';
import locale from 'antd/es/date-picker/locale/ko_KR';

import { DatePickerProps, Select } from 'antd';

import { UploadOutlined } from '@ant-design/icons';

import { Modal } from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';


import { AgGridReact } from 'ag-grid-react';
import { ICellRendererParams, ColDef } from 'ag-grid-community';
import AgGridExample from './agGridExample';
import EmptyAgGridExample from './emptyAgGridExample';
// import CustomTooltip from './CustomTooltip';
// import NoDataTemplate from './NoDataTemplate';




// 데이트피커
const { RangePicker } = DatePicker;
// const { onOk } = Button;

// 탭 (ant)
const { TabPane } = Tabs;
const onChange = (key: string) => {
    console.log(key);
};


// 셀렉트박스 (ant)
const { Option } = Select;
const AntdSelectBox = () => {
    //antd 셀렉트박스 관련
    const [ antdSelect01, setAntdSelect01] = useState("");
    const [ antdSelect02, setAntdSelect02] = useState("");
    const antdSelect01Change = (value: string) => {
        console.log("01 설정 :", value);
        setAntdSelect01(value);
    }
}


// 파일 업로드 - 리스트 미리보기 (ant)
const fileList: UploadFile[] = [
    {
      uid: '-1',
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-2',
      name: 'yyy.png',
      status: 'error',
    },
    {
        uid: '-xxx',
        percent: 50,
        name: 'image.png',
        status: 'uploading',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ];



const PluginAll = () => {

    // 다이얼로그, 컨펌창
    const [ antdModalOpen, setAntdModalOpen ] = useState(false);

    const antdModalOkEvent = () => { setAntdModalOpen(false); }
    const antdModalCancelEvent = () => { setAntdModalOpen(false); }

    const antdModalConfirm = () => {
        Modal.confirm({
            title: 'Confirm',
            icon: <ExclamationCircleOutlined />,
            content: '광고 등록을 진행하시겠습니까?',
            okText: '등록',
            cancelText: '취소',
            });
    }

    // 탭 + 셀렉트박스
    const [ tabSelect, setTabSelect ] = useState("");
    const operations =
        <Select placeholder="선택해주세요" onChange={(value) => setTabSelect(value)} className="small w-150">
            <Option value="옵션 01">옵션 01</Option>
            <Option value="옵션 02">옵션 02</Option>
            <Option value="옵션 03" disabled>옵션 03 Disabled 옵션 03 Disabled</Option>
            <Option value="옵션 04">옵션 04</Option>
        </Select>;


    // 라디오버튼
    const [radioSelected, setRadioSelected] = useState('2');
    const [radioSelected2, setRadioSelected2] = useState('4');
    const handleChange = event => setRadioSelected(event.target.value);
    const handleChange2= event => setRadioSelected2(event.target.value);

    const [ antdSelect01, setAntdSelect01] = useState("");
    const [ antdSelect02, setAntdSelect02] = useState("");
    const antdSelect01Change = (value: string) => {
        console.log("01 설정 :", value);
        setAntdSelect01(value);
    }
    const antdSelect02Change = (value: string) => {
        console.log("02 설정 :", value);
        setAntdSelect02(value);
    }
    const antdSelect01Search = (value: string) => {
        console.log('search:', value);
    }
    const antdSelect02Search = (value: string) => {
        console.log('search:', value);
    }


    // 체크박스
    // const [bChecked, setChecked] = useState(false);
    // const checkHandler = ({ target }) => {
    //     setChecked(!bChecked);
    //     checkedItemHandler(issue.id, target.checked);
    // };

    // 데이트피커 (기간)
    // const onChange: RangePickerProps['onChange'] = (dates, dateStrings) => {
    const onChangeDatepicker: RangePickerProps['onChange'] = (dates, dateStrings) => {
        if (dates) {
        console.log('From: ', dates[0], ', to: ', dates[1]);
        console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
        } else {
        console.log('Clear');
        }
    };

    // 데이트피커 (싱글)
    const onChangeDateSingle: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };


    // 토스트 (Ant - Notification)
    type NotificationType = 'success' | 'info' | 'warning' | 'error';

    const openNotificationWithIcon = (type: NotificationType) => {
        notification[type]({
            message: '',
            description:
            '토스트 메시지 내용 영역입니다. 토스트 메시지 내용 영역입니다. 토스트 메시지 내용 영역입니다. 토스트 메시지 내용 영역입니다. 토스트 메시지 내용 영역입니다. ',
            duration: 0,
        });
    };



    // AG-grid

    const gridRef = useRef();
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const [rowData, setRowData] = useState();
    const [columnDefs, setColumnDefs] = useState([
        {
        field: 'athlete',
        headerCheckboxSelection: true,
        checkboxSelection: true,
        showDisabledCheckboxes: true,
        },
        { field: 'sport' },
        { field: 'year', maxWidth: 120 },
    ]);
    const defaultColDef = useMemo(() => {
        return {
        flex: 1,
        minWidth: 100,
        };
    }, []);
    const isRowSelectable = useMemo(() => {
        return (params) => {
        return !!params.data && params.data.year === 2012;
        };
    }, []);

    const onGridReady = useCallback((params) => {
        fetch('https://www.ag-grid.com/example-assets/small-olympic-winners.json')
        .then((resp) => resp.json())
        .then((data) => setRowData(data));
    }, []);


    return (
        <>
            <Tabs defaultActiveKey="1" onChange={onChange} className="layout-tab">
                <TabPane tab="서비스 소개" key="1">
                    {/* <!-- Container-Fluid : Start --> */}
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col col-12">
                                {/* <!-- Wrap-Tbl : Start --> */}
                                <section className="wrap-section wrap-tbl">
                                    <div className="box-header">
                                        <div className="box-left">
                                            <h2 className="fz-20 fw-med fc-10">테이블 메인 타이틀</h2>
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
                                                    <div className="dt-inner">
                                                        <span className="fz-16 fw-med fc-7">
                                                            타이틀
                                                            <a className="ico-tooltip" data-tip></a>
                                                            <ReactTooltip>
                                                                <p className='fz-16 fw-smbold fc-0'>텍스트 툴팁 타이틀</p>
                                                                <p className='fz-14 fw-med fc-0'>텍스트 툴팁 내용</p>
                                                            </ReactTooltip>
                                                            <i className="txt-essential"></i>
                                                        </span>
                                                    </div>
                                                </dt>
                                                <dd>
                                                    <div className="form-group">
                                                        {/* <!-- Comp-Txt : Start --> */}
                                                        <span className="comp-txt">
                                                            <span className="table">
                                                                <span className="table-cell">
                                                                    <b className="fz-16 fc-5">설명글 입니다.</b>
                                                                </span>
                                                            </span>
                                                        </span>
                                                        {/* <!-- Comp-Txt : End --> */}
                                                    </div>
                                                </dd>
                                            </dl>
                                            <dl className="col-two">
                                                <dt>
                                                    <div className="dt-inner">
                                                        <span className="fz-16 fw-med fc-7">
                                                            타이틀 타이틀 타이틀 타이틀 타이틀 타이틀 타이틀
                                                            <a className="ico-tooltip" data-tip></a>
                                                            <ReactTooltip>
                                                                <p className='fz-16 fw-smbold fc-0'>텍스트 툴팁 타이틀</p>
                                                                <p className='fz-14 fw-med fc-0'>텍스트 툴팁 내용</p>
                                                            </ReactTooltip>
                                                            <i className="txt-essential"></i>
                                                        </span>
                                                    </div>
                                                </dt>
                                                <dd>
                                                    <div className="form-group">
                                                        {/* <!-- Comp-Txt : Start --> */}
                                                        <span className="comp-txt">
                                                            <span className="table">
                                                                <span className="table-cell">
                                                                    <b className="fz-16 fc-5">설명글 입니다.</b>
                                                                </span>
                                                            </span>
                                                        </span>
                                                        {/* <!-- Comp-Txt : End --> */}
                                                    </div>
                                                </dd>
                                                <dt>
                                                    <div className="dt-inner">
                                                        <span className="fz-16 fw-med fc-7">타이틀</span>
                                                    </div>
                                                </dt>
                                                <dd>
                                                    <div className="form-group">
                                                        {/* <!-- Comp-Txt : Start --> */}
                                                        <span className="comp-txt">
                                                            <span className="table">
                                                                <span className="table-cell">
                                                                    <b className="fz-16 fc-5">설명글 입니다.</b>
                                                                </span>
                                                            </span>
                                                        </span>
                                                        {/* <!-- Comp-Txt : End --> */}
                                                    </div>
                                                </dd>
                                            </dl>
                                            <dl className="vertical">
                                                <dt>
                                                    <div className="dt-inner">
                                                        <span className="fz-16 fw-med fc-7">
                                                            타이틀 타이틀 타이틀 타이틀 타이틀 타이틀 타이틀
                                                            <a className="ico-tooltip" data-tip></a>
                                                            <ReactTooltip>
                                                                <p className='fz-16 fw-smbold fc-0'>텍스트 툴팁 타이틀</p>
                                                                <p className='fz-14 fw-med fc-0'>텍스트 툴팁 내용</p>
                                                            </ReactTooltip>
                                                            <i className="txt-essential"></i>
                                                        </span>
                                                    </div>
                                                </dt>
                                                <dd>
                                                    <div className="form-group">
                                                        {/* <!-- Comp-Txt : Start --> */}
                                                        <span className="comp-txt">
                                                            <span className="table">
                                                                <span className="table-cell">
                                                                    <b className="fz-16 fc-5">설명글 입니다.</b>
                                                                </span>
                                                            </span>
                                                        </span>
                                                        {/* <!-- Comp-Txt : End --> */}
                                                    </div>
                                                </dd>
                                            </dl>
                                            <dl className="vertical col-two">
                                                <dt>
                                                    <div className="dt-inner">
                                                        <span className="fz-16 fw-med fc-7">
                                                            타이틀 타이틀 타이틀 타이틀 타이틀 타이틀 타이틀 타이틀 타이틀 타이틀 타이틀 타이틀 타이틀 타이틀
                                                            <a className="ico-tooltip" data-tip></a>
                                                            <ReactTooltip>
                                                                <p className='fz-16 fw-smbold fc-0'>텍스트 툴팁 타이틀</p>
                                                                <p className='fz-14 fw-med fc-0'>텍스트 툴팁 내용</p>
                                                            </ReactTooltip>
                                                            <i className="txt-essential"></i>
                                                        </span>
                                                    </div>
                                                </dt>
                                                <dd>
                                                    <div className="form-group">
                                                        {/* <!-- Comp-Txt : Start --> */}
                                                        <span className="comp-txt">
                                                            <span className="table">
                                                                <span className="table-cell">
                                                                    <b className="fz-16 fc-5">설명글 입니다.</b>
                                                                </span>
                                                            </span>
                                                        </span>
                                                        {/* <!-- Comp-Txt : End --> */}
                                                    </div>
                                                </dd>
                                                <dt>
                                                    <div className="dt-inner">
                                                        <span className="fz-16 fw-med fc-7">타이틀</span>
                                                    </div>
                                                </dt>
                                                <dd>
                                                    <div className="form-group">
                                                        {/* <!-- Comp-Txt : Start --> */}
                                                        <span className="comp-txt">
                                                            <span className="table">
                                                                <span className="table-cell">
                                                                    <b className="fz-16 fc-5">설명글 입니다. 설명글 입니다. 설명글 입니다. 설명글 입니다. 설명글 입니다. 설명글 입니다. 설명글 입니다. 설명글 입니다. 설명글 입니다. 설명글 입니다. 설명글 입니다. 설명글 입니다. 설명글 입니다. 설명글 입니다. 설명글 입니다. 설명글 입니다. 설명글 입니다. 설명글 입니다. 설명글 입니다. 설명글 입니다. 설명글 입니다. 설명글 입니다. </b>
                                                                </span>
                                                            </span>
                                                        </span>
                                                        {/* <!-- Comp-Txt : End --> */}
                                                    </div>
                                                </dd>
                                            </dl>

                                            <dl className="col-two">
                                                <dt>
                                                    <div className="dt-inner">
                                                        <span className="fz-16 fw-med fc-7">
                                                            버튼
                                                            <a className="ico-tooltip" data-tip></a>
                                                            <ReactTooltip>
                                                                <p className='fz-16 fw-smbold fc-0'>텍스트 툴팁 타이틀</p>
                                                                <p className='fz-14 fw-med fc-0'>텍스트 툴팁 내용</p>
                                                            </ReactTooltip>
                                                            <i className="txt-essential"></i>
                                                        </span>
                                                    </div>
                                                </dt>
                                                <dd>
                                                    <div className="form-group">
                                                        {/* <!-- Comp-Txt : Start --> */}
                                                        <p className="comp-txt">
                                                            <span className="table">
                                                                <span className="table-cell">
                                                                    <b className="fz-16 fc-5">버튼 스타일</b>
                                                                </span>
                                                            </span>
                                                        </p>
                                                        {/* <!-- Comp-Txt : End --> */}
                                                    </div>
                                                    <div className="form-group">
                                                        <button type="button" className="btn solid blue">btn solid blue</button>
                                                        <button type="button" className="btn solid gray">btn solid gray</button>
                                                        <button type="button" className="btn solid red">btn solid red</button>
                                                    </div>
                                                    <div className="form-group">
                                                        <button type="button" className="btn outline blue">btn outline blue</button>
                                                        <button type="button" className="btn outline gray">btn outline gray</button>
                                                        <button type="button" className="btn outline red">btn outline red</button>
                                                    </div>

                                                    <div className="form-group">
                                                        {/* <!-- Comp-Txt : Start --> */}
                                                        <p className="comp-txt">
                                                            <span className="table">
                                                                <span className="table-cell">
                                                                    <b className="fz-16 fc-5">Disabled</b>
                                                                </span>
                                                            </span>
                                                        </p>
                                                        {/* <!-- Comp-Txt : End --> */}
                                                    </div>
                                                    <div className="form-group">
                                                        <button type="button" className="btn solid blue" disabled>btn solid blue</button>
                                                        <button type="button" className="btn solid gray" disabled>btn solid gray</button>
                                                        <button type="button" className="btn solid red" disabled>btn solid red</button>
                                                    </div>
                                                    <div className="form-group">
                                                        <button type="button" className="btn outline blue" disabled>btn outline blue</button>
                                                        <button type="button" className="btn outline gray" disabled>btn outline gray</button>
                                                        <button type="button" className="btn outline red" disabled>btn outline red</button>
                                                    </div>


                                                    <div className="form-group">
                                                        {/* <!-- Comp-Txt : Start --> */}
                                                        <p className="comp-txt">
                                                            <span className="table">
                                                                <span className="table-cell">
                                                                    <b className="fz-16 fc-5">아이콘 버튼- 현재는 공통틀만 (추후, 필요한 아이콘과 필요한 사이즈만 처리 해둘 예정)</b>
                                                                </span>
                                                            </span>
                                                        </p>
                                                        {/* <!-- Comp-Txt : End --> */}
                                                    </div>
                                                    <div className="form-group">
                                                        <button type="button" className="btn solid blue btn-ico"><i className="ico ico-filter IcoGuide"></i></button>
                                                        <button type="button" className="btn solid blue btn-ico --ico-txt"><i className="ico ico-download IcoGuide"></i>버튼</button>
                                                        <button type="button" className="btn solid blue btn-ico --txt-ico">버튼<i className="ico ico-plus IcoGuide"></i></button>
                                                        <button type="button" className="btn solid blue btn-ico --ico-prev"><i className="ico ico-download IcoGuide"></i>이전</button>
                                                        <button type="button" className="btn solid blue btn-ico --next-ico">다음<i className="ico ico-download IcoGuide"></i></button>
                                                    </div>
                                                    <div className="form-group">
                                                        <button type="button" className="btn outline blue btn-ico"><i className="ico ico-filter IcoGuide"></i></button>
                                                        <button type="button" className="btn outline blue btn-ico --ico-txt"><i className="ico ico-download IcoGuide"></i>버튼</button>
                                                        <button type="button" className="btn outline blue btn-ico --txt-ico">버튼<i className="ico ico-plus IcoGuide"></i></button>
                                                        <button type="button" className="btn outline blue btn-ico --ico-prev"><i className="ico ico-download IcoGuide"></i>이전</button>
                                                        <button type="button" className="btn outline blue btn-ico --next-ico">다음<i className="ico ico-download IcoGuide"></i></button>
                                                    </div>
                                                </dd>
                                                <dt>
                                                    <div className="dt-inner">
                                                        <span className="fz-16 fw-med fc-7">
                                                            버튼 사이즈
                                                            <a className="ico-tooltip" data-tip></a>
                                                            <ReactTooltip>
                                                                <p className='fz-16 fw-smbold fc-0'>텍스트 툴팁 타이틀</p>
                                                                <p className='fz-14 fw-med fc-0'>텍스트 툴팁 내용</p>
                                                            </ReactTooltip>
                                                            <i className="txt-essential"></i>
                                                        </span>
                                                    </div>
                                                </dt>
                                                <dd>
                                                    <div className="form-group">
                                                        {/* <!-- Comp-Txt : Start --> */}
                                                        <p className="comp-txt">
                                                            <span className="table">
                                                                <span className="table-cell">
                                                                    <b className="fz-16 fc-5">버튼 사이즈</b>
                                                                </span>
                                                            </span>
                                                        </p>
                                                        {/* <!-- Comp-Txt : End --> */}
                                                    </div>
                                                    <div className="form-group">
                                                        {/* <!-- Comp-Txt : Start --> */}
                                                        <span className="comp-txt">
                                                            <span className="table">
                                                                <span className="table-cell">
                                                                    <b className="fz-16 fc-5">xxsmall (auto * 24)</b>
                                                                </span>
                                                            </span>
                                                        </span>
                                                        {/* <!-- Comp-Txt : End --> */}
                                                        <button type="button" className="btn solid blue xxsmall">버튼</button>
                                                    </div>
                                                    <div className="form-group">
                                                        {/* <!-- Comp-Txt : Start --> */}
                                                        <span className="comp-txt">
                                                            <span className="table">
                                                                <span className="table-cell">
                                                                    <b className="fz-16 fc-5">xsmall (min 80 * 32)</b>
                                                                </span>
                                                            </span>
                                                        </span>
                                                        {/* <!-- Comp-Txt : End --> */}
                                                        <button type="button" className="btn solid blue xsmall">버튼</button>
                                                    </div>
                                                    <div className="form-group">
                                                        {/* <!-- Comp-Txt : Start --> */}
                                                        <span className="comp-txt">
                                                            <span className="table">
                                                                <span className="table-cell">
                                                                    <b className="fz-16 fc-5">small (min 100 * 40)</b>
                                                                </span>
                                                            </span>
                                                        </span>
                                                        {/* <!-- Comp-Txt : End --> */}
                                                        <button type="button" className="btn solid blue small">버튼</button>
                                                    </div>
                                                    <div className="form-group">
                                                        {/* <!-- Comp-Txt : Start --> */}
                                                        <span className="comp-txt">
                                                            <span className="table">
                                                                <span className="table-cell">
                                                                    <b className="fz-16 fc-5">기본 사이즈 (min 120 * 48)</b>
                                                                </span>
                                                            </span>
                                                        </span>
                                                        {/* <!-- Comp-Txt : End --> */}
                                                        <button type="button" className="btn solid blue">버튼</button>
                                                    </div>
                                                    <div className="form-group">
                                                        {/* <!-- Comp-Txt : Start --> */}
                                                        <span className="comp-txt">
                                                            <span className="table">
                                                                <span className="table-cell">
                                                                    <b className="fz-16 fc-5">large (min 200 * 56)</b>
                                                                </span>
                                                            </span>
                                                        </span>
                                                        {/* <!-- Comp-Txt : End --> */}
                                                        <button type="button" className="btn solid blue large">버튼</button>
                                                    </div>
                                                    <div className="form-group">
                                                        {/* <!-- Comp-Txt : Start --> */}
                                                        <span className="comp-txt">
                                                            <span className="table">
                                                                <span className="table-cell">
                                                                    <b className="fz-16 fc-5">xlarge (min 300 * 64)</b>
                                                                </span>
                                                            </span>
                                                        </span>
                                                        {/* <!-- Comp-Txt : End --> */}
                                                        <button type="button" className="btn solid blue xlarge">버튼</button>
                                                    </div>
                                                    <div className="divider"></div>


                                                    <div className="form-group">
                                                        {/* <!-- Comp-Txt : Start --> */}
                                                        <p className="comp-txt">
                                                            <span className="table">
                                                                <span className="table-cell">
                                                                    <b className="fz-16 fc-5">아이콘 버튼 사이즈</b>
                                                                </span>
                                                            </span>
                                                        </p>
                                                        {/* <!-- Comp-Txt : End --> */}
                                                    </div>
                                                    <div className="form-group">
                                                        {/* <!-- Comp-Txt : Start --> */}
                                                        <p className="comp-txt">
                                                            <span className="table">
                                                                <span className="table-cell">
                                                                    <b className="fz-16 fc-5">xxsmall (auto * 24)</b>
                                                                </span>
                                                            </span>
                                                        </p>
                                                        {/* <!-- Comp-Txt : End --> */}
                                                        <button type="button" className="btn solid blue btn-ico xxsmall"><i className="ico ico-filter IcoGuide"></i></button>
                                                        <button type="button" className="btn solid blue btn-ico --ico-txt xxsmall"><i className="ico ico-download IcoGuide"></i>버튼</button>
                                                        <button type="button" className="btn solid blue btn-ico --txt-ico xxsmall">버튼<i className="ico ico-plus IcoGuide"></i></button>
                                                        <button type="button" className="btn solid blue btn-ico --ico-prev xxsmall"><i className="ico ico-download IcoGuide"></i>이전</button>
                                                        <button type="button" className="btn solid blue btn-ico --next-ico xxsmall">다음<i className="ico ico-download IcoGuide"></i></button>

                                                        <br></br>

                                                        <button type="button" className="btn outline blue btn-ico xxsmall"><i className="ico ico-filter IcoGuide"></i></button>
                                                        <button type="button" className="btn outline blue btn-ico --ico-txt xxsmall"><i className="ico ico-download IcoGuide"></i>버튼</button>
                                                        <button type="button" className="btn outline blue btn-ico --txt-ico xxsmall">버튼<i className="ico ico-plus IcoGuide"></i></button>
                                                        <button type="button" className="btn outline blue btn-ico --ico-prev xxsmall"><i className="ico ico-download IcoGuide"></i>이전</button>
                                                        <button type="button" className="btn outline blue btn-ico --next-ico xxsmall">다음<i className="ico ico-download IcoGuide"></i></button>
                                                    </div>

                                                    <div className="form-group">
                                                        {/* <!-- Comp-Txt : Start --> */}
                                                        <p className="comp-txt">
                                                            <span className="table">
                                                                <span className="table-cell">
                                                                    <b className="fz-16 fc-5">xsmall (min 80 * 32)</b>
                                                                </span>
                                                            </span>
                                                        </p>
                                                        {/* <!-- Comp-Txt : End --> */}
                                                        <button type="button" className="btn solid blue btn-ico xsmall"><i className="ico ico-filter IcoGuide"></i></button>
                                                        <button type="button" className="btn solid blue btn-ico --ico-txt xsmall"><i className="ico ico-download IcoGuide"></i>버튼</button>
                                                        <button type="button" className="btn solid blue btn-ico --txt-ico xsmall">버튼<i className="ico ico-plus IcoGuide"></i></button>
                                                        <button type="button" className="btn solid blue btn-ico --ico-prev xsmall"><i className="ico ico-download IcoGuide"></i>이전</button>
                                                        <button type="button" className="btn solid blue btn-ico --next-ico xsmall">다음<i className="ico ico-download IcoGuide"></i></button>

                                                        <br></br>

                                                        <button type="button" className="btn outline blue btn-ico xsmall"><i className="ico ico-filter IcoGuide"></i></button>
                                                        <button type="button" className="btn outline blue btn-ico --ico-txt xsmall"><i className="ico ico-download IcoGuide"></i>버튼</button>
                                                        <button type="button" className="btn outline blue btn-ico --txt-ico xsmall">버튼<i className="ico ico-plus IcoGuide"></i></button>
                                                        <button type="button" className="btn outline blue btn-ico --ico-prev xsmall"><i className="ico ico-download IcoGuide"></i>이전</button>
                                                        <button type="button" className="btn outline blue btn-ico --next-ico xsmall">다음<i className="ico ico-download IcoGuide"></i></button>
                                                    </div>


                                                    <div className="form-group">
                                                        {/* <!-- Comp-Txt : Start --> */}
                                                        <p className="comp-txt">
                                                            <span className="table">
                                                                <span className="table-cell">
                                                                    <b className="fz-16 fc-5">small (min 100 * 40)</b>
                                                                </span>
                                                            </span>
                                                        </p>
                                                        {/* <!-- Comp-Txt : End --> */}
                                                        <button type="button" className="btn solid blue btn-ico small"><i className="ico ico-filter IcoGuide"></i></button>
                                                        <button type="button" className="btn solid blue btn-ico --ico-txt small"><i className="ico ico-download IcoGuide"></i>버튼</button>
                                                        <button type="button" className="btn solid blue btn-ico --txt-ico small">버튼<i className="ico ico-plus IcoGuide"></i></button>
                                                        <button type="button" className="btn solid blue btn-ico --ico-prev small"><i className="ico ico-download IcoGuide"></i>이전</button>
                                                        <button type="button" className="btn solid blue btn-ico --next-ico small">다음<i className="ico ico-download IcoGuide"></i></button>

                                                        <br></br>

                                                        <button type="button" className="btn outline blue btn-ico small"><i className="ico ico-filter IcoGuide"></i></button>
                                                        <button type="button" className="btn outline blue btn-ico --ico-txt small"><i className="ico ico-download IcoGuide"></i>버튼</button>
                                                        <button type="button" className="btn outline blue btn-ico --txt-ico small">버튼<i className="ico ico-plus IcoGuide"></i></button>
                                                        <button type="button" className="btn outline blue btn-ico --ico-prev small"><i className="ico ico-download IcoGuide"></i>이전</button>
                                                        <button type="button" className="btn outline blue btn-ico --next-ico small">다음<i className="ico ico-download IcoGuide"></i></button>
                                                    </div>

                                                    <div className="form-group">
                                                        {/* <!-- Comp-Txt : Start --> */}
                                                        <p className="comp-txt">
                                                            <span className="table">
                                                                <span className="table-cell">
                                                                    <b className="fz-16 fc-5">기본 사이즈 (min 120 * 48)</b>
                                                                </span>
                                                            </span>
                                                        </p>
                                                        {/* <!-- Comp-Txt : End --> */}
                                                        <button type="button" className="btn solid blue btn-ico"><i className="ico ico-filter IcoGuide"></i></button>
                                                        <button type="button" className="btn solid blue btn-ico --ico-txt"><i className="ico ico-download IcoGuide"></i>버튼</button>
                                                        <button type="button" className="btn solid blue btn-ico --txt-ico">버튼<i className="ico ico-plus IcoGuide"></i></button>
                                                        <button type="button" className="btn solid blue btn-ico --ico-prev"><i className="ico ico-download IcoGuide"></i>이전</button>
                                                        <button type="button" className="btn solid blue btn-ico --next-ico">다음<i className="ico ico-download IcoGuide"></i></button>

                                                        <br></br>

                                                        <button type="button" className="btn outline blue btn-ico"><i className="ico ico-filter IcoGuide"></i></button>
                                                        <button type="button" className="btn outline blue btn-ico --ico-txt"><i className="ico ico-download IcoGuide"></i>버튼</button>
                                                        <button type="button" className="btn outline blue btn-ico --txt-ico">버튼<i className="ico ico-plus IcoGuide"></i></button>
                                                        <button type="button" className="btn outline blue btn-ico --ico-prev"><i className="ico ico-download IcoGuide"></i>이전</button>
                                                        <button type="button" className="btn outline blue btn-ico --next-ico">다음<i className="ico ico-download IcoGuide"></i></button>
                                                    </div>

                                                    <div className="form-group">
                                                        {/* <!-- Comp-Txt : Start --> */}
                                                        <p className="comp-txt">
                                                            <span className="table">
                                                                <span className="table-cell">
                                                                    <b className="fz-16 fc-5">large (min 200 * 56)</b>
                                                                </span>
                                                            </span>
                                                        </p>
                                                        {/* <!-- Comp-Txt : End --> */}
                                                        <button type="button" className="btn solid blue btn-ico large"><i className="ico ico-filter IcoGuide"></i></button>
                                                        <button type="button" className="btn solid blue btn-ico --ico-txt large"><i className="ico ico-download IcoGuide"></i>버튼</button>
                                                        <button type="button" className="btn solid blue btn-ico --txt-ico large">버튼<i className="ico ico-plus IcoGuide"></i></button>
                                                        <button type="button" className="btn solid blue btn-ico --ico-prev large"><i className="ico ico-download IcoGuide"></i>이전</button>
                                                        <button type="button" className="btn solid blue btn-ico --next-ico large">다음<i className="ico ico-download IcoGuide"></i></button>

                                                        <br></br>

                                                        <button type="button" className="btn outline blue btn-ico large"><i className="ico ico-filter IcoGuide"></i></button>
                                                        <button type="button" className="btn outline blue btn-ico --ico-txt large"><i className="ico ico-download IcoGuide"></i>버튼</button>
                                                        <button type="button" className="btn outline blue btn-ico --txt-ico large">버튼<i className="ico ico-plus IcoGuide"></i></button>
                                                        <button type="button" className="btn outline blue btn-ico --ico-prev large"><i className="ico ico-download IcoGuide"></i>이전</button>
                                                        <button type="button" className="btn outline blue btn-ico --next-ico large">다음<i className="ico ico-download IcoGuide"></i></button>
                                                    </div>


                                                    <div className="form-group">
                                                        {/* <!-- Comp-Txt : Start --> */}
                                                        <p className="comp-txt">
                                                            <span className="table">
                                                                <span className="table-cell">
                                                                    <b className="fz-16 fc-5">xlarge (min 300 * 64)</b>
                                                                </span>
                                                            </span>
                                                        </p>
                                                        {/* <!-- Comp-Txt : End --> */}
                                                        <button type="button" className="btn solid blue btn-ico xlarge"><i className="ico ico-filter IcoGuide"></i></button>
                                                        <button type="button" className="btn solid blue btn-ico --ico-txt xlarge"><i className="ico ico-download IcoGuide"></i>버튼</button>
                                                        <button type="button" className="btn solid blue btn-ico --txt-ico xlarge">버튼<i className="ico ico-plus IcoGuide"></i></button>
                                                        <button type="button" className="btn solid blue btn-ico --ico-prev xlarge"><i className="ico ico-download IcoGuide"></i>이전</button>
                                                        <button type="button" className="btn solid blue btn-ico --next-ico xlarge">다음<i className="ico ico-download IcoGuide"></i></button>

                                                        <br></br>

                                                        <button type="button" className="btn outline blue btn-ico xlarge"><i className="ico ico-filter IcoGuide"></i></button>
                                                        <button type="button" className="btn outline blue btn-ico --ico-txt xlarge"><i className="ico ico-download IcoGuide"></i>버튼</button>
                                                        <button type="button" className="btn outline blue btn-ico --txt-ico xlarge">버튼<i className="ico ico-plus IcoGuide"></i></button>
                                                        <button type="button" className="btn outline blue btn-ico --ico-prev xlarge"><i className="ico ico-download IcoGuide"></i>이전</button>
                                                        <button type="button" className="btn outline blue btn-ico --next-ico xlarge">다음<i className="ico ico-download IcoGuide"></i></button>
                                                    </div>

                                                </dd>
                                            </dl>
                                            <dl className="col-two">
                                                <dt>
                                                    <div className="dt-inner">
                                                        <span className="fz-16 fw-med fc-7">
                                                            버튼 그룹<br />(단일 선택)
                                                            <a className="ico-tooltip" data-tip></a>
                                                            <ReactTooltip>
                                                                <p className='fz-16 fw-smbold fc-0'>텍스트 툴팁 타이틀</p>
                                                                <p className='fz-14 fw-med fc-0'>텍스트 툴팁 내용</p>
                                                            </ReactTooltip>
                                                            <i className="txt-essential"></i>
                                                        </span>
                                                    </div>
                                                </dt>
                                                <dd>
                                                    <div className="form-group">
                                                        {/* <!-- Comp-Txt : Start --> */}
                                                        <span className="comp-txt">
                                                            <span className="table">
                                                                <span className="table-cell">
                                                                    <b className="fz-16 fc-5">xsmall ( * 32)</b>
                                                                </span>
                                                            </span>
                                                        </span>
                                                        {/* <!-- Comp-Txt : End --> */}
                                                        {/* <!-- Btn-Group : Start --> */}
                                                        <div className="btn-group xsmall">
                                                            <button type="button" className="btn selected">옵션1</button>
                                                            <button type="button" className="btn">옵션2</button>
                                                            <button type="button" className="btn">옵션3</button>
                                                        </div>
                                                        {/* <!-- Btn-Group : End --> */}
                                                    </div>
                                                    <div className="form-group">
                                                        {/* <!-- Comp-Txt : Start --> */}
                                                        <span className="comp-txt">
                                                            <span className="table">
                                                                <span className="table-cell">
                                                                    <b className="fz-16 fc-5">small ( * 40)</b>
                                                                </span>
                                                            </span>
                                                        </span>
                                                        {/* <!-- Comp-Txt : End --> */}
                                                        {/* <!-- Btn-Group : Start --> */}
                                                        <div className="btn-group small">
                                                            <button type="button" className="btn selected">옵션1</button>
                                                            <button type="button" className="btn">옵션2</button>
                                                            <button type="button" className="btn">옵션3</button>
                                                        </div>
                                                        {/* <!-- Btn-Group : End --> */}
                                                    </div>
                                                    <div className="form-group">
                                                        {/* <!-- Comp-Txt : Start --> */}
                                                        <span className="comp-txt">
                                                            <span className="table">
                                                                <span className="table-cell">
                                                                    <b className="fz-16 fc-5">기본 사이즈 ( * 48)</b>
                                                                </span>
                                                            </span>
                                                        </span>
                                                        {/* <!-- Comp-Txt : End --> */}
                                                        {/* <!-- Btn-Group : Start --> */}
                                                        <div className="btn-group">
                                                            <button type="button" className="btn selected">옵션1</button>
                                                            <button type="button" className="btn">옵션2</button>
                                                            <button type="button" className="btn">옵션3</button>
                                                        </div>
                                                        {/* <!-- Btn-Group : End --> */}
                                                    </div>
                                                </dd>
                                                <dt>
                                                    <div className="dt-inner">
                                                        <span className="fz-16 fw-med fc-7">
                                                            스위치
                                                            <a className="ico-tooltip" data-tip></a>
                                                            <ReactTooltip>
                                                                <p className='fz-16 fw-smbold fc-0'>텍스트 툴팁 타이틀</p>
                                                                <p className='fz-14 fw-med fc-0'>텍스트 툴팁 내용</p>
                                                            </ReactTooltip>
                                                            <i className="txt-essential"></i>
                                                        </span>
                                                    </div>
                                                </dt>
                                                <dd>
                                                    <div className="form-group">
                                                        {/* <!-- Comp-Txt : Start --> */}
                                                        <p className="comp-txt">
                                                            <span className="table">
                                                                <span className="table-cell">
                                                                    <b className="fz-16 fc-5">기본</b>
                                                                </span>
                                                            </span>
                                                        </p>
                                                        {/* <!-- Comp-Txt : End --> */}
                                                        {/* <!-- Comp-Switch : Start --> */}
                                                            <div className="comp-switch">
                                                                <input type="checkbox" id="switch-01" checked />
                                                                <label htmlFor="switch-01"></label>
                                                            </div>
                                                            <div className="comp-switch">
                                                                <input type="checkbox" id="switch-02" />
                                                                <label htmlFor="switch-02"></label>
                                                            </div>
                                                            <div className="comp-switch">
                                                                <input type="checkbox" id="switch-03" checked disabled />
                                                                <label htmlFor="switch-03"></label>
                                                            </div>
                                                            <div className="comp-switch">
                                                                <input type="checkbox" id="switch-04" disabled />
                                                                <label htmlFor="switch-04"></label>
                                                            </div>
                                                            {/* <!-- Comp-Switch : End --> */}
                                                    </div>
                                                    <div className="form-group">
                                                        {/* <!-- Comp-Txt : Start --> */}
                                                        <p className="comp-txt">
                                                            <span className="table">
                                                                <span className="table-cell">
                                                                    <b className="fz-16 fc-5">mini - 데이터그리드 Row 내부 사용UI</b>
                                                                </span>
                                                            </span>
                                                        </p>
                                                        {/* <!-- Comp-Txt : End --> */}
                                                        {/* <!-- Comp-Switch : Start --> */}
                                                            <div className="comp-switch mini">
                                                                <input type="checkbox" id="switch-05" checked />
                                                                <label htmlFor="switch-05"></label>
                                                            </div>
                                                            <div className="comp-switch mini">
                                                                <input type="checkbox" id="switch-06" />
                                                                <label htmlFor="switch-06"></label>
                                                            </div>
                                                            <div className="comp-switch mini">
                                                                <input type="checkbox" id="switch-07" checked disabled />
                                                                <label htmlFor="switch-07"></label>
                                                            </div>
                                                            <div className="comp-switch mini">
                                                                <input type="checkbox" id="switch-08" disabled />
                                                                <label htmlFor="switch-08"></label>
                                                            </div>
                                                            {/* <!-- Comp-Switch : End --> */}
                                                    </div>
                                                </dd>
                                            </dl>
                                            <dl className="col-two">
                                                <dt>
                                                    <div className="dt-inner">
                                                        <span className="fz-16 fw-med fc-7">
                                                            라디오버튼
                                                            <a className="ico-tooltip" data-tip></a>
                                                            <ReactTooltip>
                                                                <p className='fz-16 fw-smbold fc-0'>텍스트 툴팁 타이틀</p>
                                                                <p className='fz-14 fw-med fc-0'>텍스트 툴팁 내용</p>
                                                            </ReactTooltip>
                                                            <i className="txt-essential"></i>
                                                        </span>
                                                    </div>
                                                </dt>
                                                <dd>
                                                    <div className="form-group">
                                                        {/* <!-- Comp-Radio : Start --> */}
                                                        <div className="comp-radio">
                                                            <input type="radio" id="inp-radio-01" name="inp-radio-g01" value="1" onChange={handleChange} checked={radioSelected === '1'} />
                                                            <label htmlFor="inp-radio-01">라디오버튼버튼명이 길어지면 이렇게 표기 됩니다</label>
                                                        </div>
                                                        <div className="comp-radio">
                                                            {/* <input type="radio" id="inp-radio-02" name="inp-radio-g01" defaultChecked /> */}
                                                            <input type="radio" id="inp-radio-02" name="inp-radio-g01" value="2" onChange={handleChange} checked={radioSelected === '2'} />
                                                            <label htmlFor="inp-radio-02">라디오버튼이 길어지면 이렇게</label>
                                                        </div>
                                                        {/* <!-- Comp-Radio : End --> */}
                                                    </div>
                                                    <div className="form-group">
                                                        {/* <!-- Comp-Radio : Start --> */}
                                                        <div className="comp-radio">
                                                            <input type="radio" id="inp-radio-03" name="inp-radio-g02" value="3" onChange={handleChange2} checked={radioSelected2 === '3'} disabled />
                                                            <label htmlFor="inp-radio-03">라디오버튼이 길어지면 이렇게</label>
                                                        </div>
                                                        <div className="comp-radio">
                                                            <input type="radio" id="inp-radio-04" name="inp-radio-g02" value="4" onChange={handleChange2} checked={radioSelected2 === '4'} disabled />
                                                            <label htmlFor="inp-radio-04">라디오버튼</label>
                                                        </div>
                                                        {/* <!-- Comp-Radio : End --> */}
                                                    </div>
                                                    <div className="form-group">
                                                        {/* <!-- Comp-Radio : Start --> */}
                                                        <div className="comp-radio error">
                                                            <input type="radio" id="inp-radio-05" />
                                                            <label htmlFor="inp-radio-05">라디오버튼</label>
                                                        </div>
                                                        <div className="comp-radio error">
                                                            <input type="radio" id="inp-radio-06" checked />
                                                            <label htmlFor="inp-radio-04">라디오버튼</label>
                                                        </div>
                                                        {/* <!-- Comp-Radio : End --> */}
                                                    </div>

                                                </dd>
                                                <dt>
                                                    <div className="dt-inner">
                                                        <span className="fz-16 fw-med fc-7">
                                                            체크박스
                                                            <a className="ico-tooltip" data-tip></a>
                                                            <ReactTooltip>
                                                                <p className='fz-16 fw-smbold fc-0'>텍스트 툴팁 타이틀</p>
                                                                <p className='fz-14 fw-med fc-0'>텍스트 툴팁 내용</p>
                                                            </ReactTooltip>
                                                            <i className="txt-essential"></i>
                                                        </span>
                                                    </div>
                                                </dt>
                                                <dd>
                                                    <div className="form-group">
                                                        {/* <!-- Comp-Checkbox : Start --> */}
                                                        <div className="comp-checkbox">
                                                            <input type="checkbox" id="inp-check-01" />
                                                            <label htmlFor="inp-check-01">체크박스</label>
                                                        </div>
                                                        <div className="comp-checkbox">
                                                            <input type="checkbox" id="inp-check-02" checked />
                                                            <label htmlFor="inp-check-02">체크박스버튼명이 길어지면 이렇게 표기 됩니다</label>
                                                        </div>
                                                        <div className="comp-checkbox">
                                                            <input type="checkbox" id="inp-check-03" disabled />
                                                            <label htmlFor="inp-check-03">체크박스</label>
                                                        </div>
                                                        <div className="comp-checkbox">
                                                            <input type="checkbox" id="inp-check-04" checked disabled/>
                                                            <label htmlFor="inp-check-04">체크박스</label>
                                                        </div>
                                                        <div className="comp-checkbox error">
                                                            <input type="checkbox" id="inp-check-05" />
                                                            <label htmlFor="inp-check-05">체크박스</label>
                                                        </div>
                                                        <div className="comp-checkbox error">
                                                            <input type="checkbox" id="inp-check-06" checked />
                                                            <label htmlFor="inp-check-06">체크박스</label>
                                                        </div>
                                                        {/* <!-- Comp-Checkbox : End --> */}
                                                    </div>
                                                </dd>
                                            </dl>
                                            <dl className="col-two">
                                                <dt>
                                                    <div className="dt-inner">
                                                        <span className="fz-16 fw-med fc-7">
                                                            인풋
                                                            <a className="ico-tooltip" data-tip></a>
                                                            <ReactTooltip>
                                                                <p className='fz-16 fw-smbold fc-0'>텍스트 툴팁 타이틀</p>
                                                                <p className='fz-14 fw-med fc-0'>텍스트 툴팁 내용</p>
                                                            </ReactTooltip>
                                                            <i className="txt-essential"></i>
                                                        </span>
                                                    </div>
                                                </dt>
                                                <dd>
                                                    <div className="form-group">
                                                        {/* <!-- Input-Group : Start --> */}
                                                        <div className="input-group">
                                                            <div className="inner-input-group">
                                                                <input type="text" className="tf-comm" placeholder="제목을 입력해주세요." />
                                                            </div>
                                                            <p className="txt-validation">체크 / 에러 문구 내용 영역</p>
                                                            <p className="txt-desc">추가설명 문구 영역</p>
                                                        </div>
                                                        {/* <!-- Input-Group : End --> */}
                                                    </div>
                                                    <div className="form-group">
                                                        {/* <!-- Input-Group : Start --> */}
                                                        <div className="input-group">
                                                            <div className="inner-input-group">
                                                                <input type="text" className="tf-comm" placeholder="제목을 입력해주세요." value="가나다라마바사" />
                                                            </div>
                                                            <p className="txt-validation">체크 / 에러 문구 내용 영역</p>
                                                            <p className="txt-desc">추가설명 문구 영역</p>
                                                        </div>
                                                        {/* <!-- Input-Group : End --> */}
                                                    </div>
                                                    <div className="form-group">
                                                        {/* <!-- Input-Group : Start --> */}
                                                        <div className="input-group">
                                                            <div className="inner-input-group">
                                                                <input type="text" className="tf-comm" placeholder="제목을 입력해주세요." disabled />
                                                            </div>
                                                            <p className="txt-validation">체크 / 에러 문구 내용 영역</p>
                                                            <p className="txt-desc">추가설명 문구 영역</p>
                                                        </div>
                                                        {/* <!-- Input-Group : End --> */}
                                                    </div>
                                                    <div className="form-group">
                                                        {/* <!-- Input-Group : Start --> */}
                                                        <div className="input-group">
                                                            <div className="inner-input-group">
                                                                <input type="text" className="tf-comm" placeholder="제목을 입력해주세요." value="가나다라마바사" disabled />
                                                            </div>
                                                            <p className="txt-validation">체크 / 에러 문구 내용 영역</p>
                                                            <p className="txt-desc">추가설명 문구 영역</p>
                                                        </div>
                                                        {/* <!-- Input-Group : End --> */}
                                                    </div>
                                                    <div className="form-group">
                                                        {/* <!-- Input-Group : Start --> */}
                                                        <div className="input-group error">
                                                            <div className="inner-input-group">
                                                                <input type="text" className="tf-comm" placeholder="제목을 입력해주세요." />
                                                            </div>
                                                            <p className="txt-validation">체크 / 에러 문구 내용 영역</p>
                                                            <p className="txt-desc">추가설명 문구 영역</p>
                                                        </div>
                                                        {/* <!-- Input-Group : End --> */}
                                                    </div>
                                                    <div className="form-group">
                                                        {/* <!-- Input-Group : Start --> */}
                                                        <div className="input-group error expand">
                                                            <div className="inner-input-group">
                                                                <input type="text" className="tf-comm" placeholder="제목을 입력해주세요." value="가나다라마바사" />
                                                            </div>
                                                            <p className="txt-validation">체크 / 에러 문구 내용 영역</p>
                                                            <p className="txt-desc">추가설명 문구 영역</p>
                                                        </div>
                                                        {/* <!-- Input-Group : End --> */}
                                                    </div>
                                                    <div className="divider"></div>
                                                    <div className="form-group">
                                                        {/* <!-- Input-Group : Start --> */}
                                                        <div className="input-group">
                                                            <div className="inner-input-group">
                                                                <input type="num" className="tf-comm tf-num" placeholder="단가를 입력해주세요." />
                                                                <button type="button" className="btn btn-reset"></button>
                                                                <span className="unit-text">원</span>
                                                            </div>
                                                            <p className="txt-validation">체크 / 에러 문구 내용 영역</p>
                                                            <p className="txt-desc bullet-dot">.tf-num 에는 숫자만 입력가능하게 해주세요.</p>
                                                            <p className="txt-desc bullet-dot">숫자 자릿수 체크 (,) 처리 부탁드려요.</p>
                                                            <p className="txt-desc bullet-dot">.btn-reset 클릭 시 value 값 리셋해주세요.</p>
                                                        </div>
                                                        {/* <!-- Input-Group : End --> */}
                                                    </div>
                                                    <div className="form-group">
                                                        {/* <!-- Input-Group : Start --> */}
                                                        <div className="input-group error">
                                                            <div className="inner-input-group">
                                                                <input type="num" className="tf-comm tf-num" placeholder="단가를 입력해주세요." />
                                                                <button type="button" className="btn btn-reset"></button>
                                                                <span className="unit-text">원</span>
                                                            </div>
                                                            <p className="txt-validation">체크 / 에러 문구 내용 영역</p>
                                                            <p className="txt-desc">추가설명 문구 영역</p>
                                                        </div>
                                                        {/* <!-- Input-Group : End --> */}
                                                    </div>
                                                    <div className="form-group">
                                                        {/* <!-- Input-Group : Start --> */}
                                                        <div className="input-group expand">
                                                            <div className="inner-input-group">
                                                                <input type="num" className="tf-comm tf-num" placeholder="단가를 입력해주세요." />
                                                                <button type="button" className="btn btn-reset"></button>
                                                                <span className="unit-text">원</span>
                                                            </div>
                                                            <p className="txt-validation">체크 / 에러 문구 내용 영역</p>
                                                        </div>
                                                        {/* <!-- Input-Group : End --> */}
                                                    </div>
                                                    <div className="divider"></div>
                                                    <div className="form-group">
                                                        {/* <!-- Input-Group : Start --> */}
                                                        <div className="input-group">
                                                            <div className="inner-input-group">
                                                                <input type="text" className="tf-comm letter-count" placeholder="글자수 카운트" />
                                                                <p className="letter-count-text">
                                                                    <span>5</span>
                                                                    <span>/</span>
                                                                    <span>20</span>
                                                                </p>
                                                            </div>
                                                            <p className="txt-validation">체크 / 에러 문구 내용 영역 </p>
                                                            <p className="txt-desc bullet-dot">인풋 입력 시, 글자수 카운트 되게 해주세요.</p>
                                                        </div>
                                                        {/* <!-- Input-Group : End --> */}
                                                    </div>
                                                    <div className="form-group">
                                                        {/* <!-- Input-Group : Start --> */}
                                                        <div className="input-group error">
                                                            <div className="inner-input-group">
                                                                <input type="text" className="tf-comm letter-count" placeholder="글자수 카운트" />
                                                                <p className="letter-count-text">
                                                                    <span>5</span>
                                                                    <span>/</span>
                                                                    <span>20</span>
                                                                </p>
                                                            </div>
                                                            <p className="txt-validation">체크 / 에러 문구 내용 영역 길게 테스트 체크 / 에러 문구 내용 영역 길게 테스트 체크 / 에러 문구 내용 영역 길게 테스트 체크 / 에러 문구 내용 영역 길게 테스트 체크 / 에러 문구 내용 영역 길게 테스트 체크 / 에러 문구 내용 영역 길게 테스트 </p>
                                                            <p className="txt-desc">설명글 영역 길게 테스트 설명글 영역 길게 테스트 설명글 영역 길게 테스트 설명글 영역 길게 테스트 테스트 설명글 영역 길게 테스트 테스트 설명글 영역 길게 테스트 테스트 설명글 영역 길게 테스트</p>
                                                        </div>
                                                        {/* <!-- Input-Group : End --> */}
                                                    </div>
                                                    <div className="form-group">
                                                        {/* <!-- Input-Group : Start --> */}
                                                        <div className="input-group expand">
                                                            <div className="inner-input-group">
                                                                <input type="text" className="tf-comm letter-count" placeholder="글자수 카운트" />
                                                                <p className="letter-count-text">
                                                                    <span>5</span>
                                                                    <span>/</span>
                                                                    <span>20</span>
                                                                </p>
                                                            </div>
                                                            <p className="txt-validation">체크 / 에러 문구 내용 영역</p>
                                                        </div>
                                                        {/* <!-- Input-Group : End --> */}
                                                    </div>
                                                </dd>
                                                <dt>
                                                    <div className="dt-inner">
                                                        <span className="fz-16 fw-med fc-7">
                                                            인풋 사이즈
                                                            <a className="ico-tooltip" data-tip></a>
                                                            <ReactTooltip>
                                                                <p className='fz-16 fw-smbold fc-0'>텍스트 툴팁 타이틀</p>
                                                                <p className='fz-14 fw-med fc-0'>텍스트 툴팁 내용</p>
                                                            </ReactTooltip>
                                                            <i className="txt-essential"></i>
                                                        </span>
                                                    </div>
                                                </dt>
                                                <dd>
                                                    <div className="form-group">
                                                        {/* <!-- Comp-Txt : Start --> */}
                                                        <span className="comp-txt">
                                                            <span className="table">
                                                                <span className="table-cell">
                                                                    <b className="fz-16 fc-5">xxsmall ( * 24)</b>
                                                                </span>
                                                            </span>
                                                        </span>
                                                        {/* <!-- Comp-Txt : End --> */}
                                                        {/* <!-- Input-Group : Start --> */}
                                                        <div className="input-group xxsmall">
                                                            <div className="inner-input-group">
                                                                <input type="text" className="tf-comm" placeholder="제목을 입력해주세요." />
                                                            </div>
                                                            <p className="txt-validation">체크 / 에러 문구 내용 영역</p>
                                                            <p className="txt-desc">추가설명 문구 영역</p>
                                                        </div>
                                                        {/* <!-- Input-Group : End --> */}
                                                    </div>
                                                    <div className="form-group">
                                                        {/* <!-- Comp-Txt : Start --> */}
                                                        <span className="comp-txt">
                                                            <span className="table">
                                                                <span className="table-cell">
                                                                    <b className="fz-16 fc-5">xsmall ( * 32)</b>
                                                                </span>
                                                            </span>
                                                        </span>
                                                        {/* <!-- Comp-Txt : End --> */}
                                                        {/* <!-- Input-Group : Start --> */}
                                                        <div className="input-group xsmall">
                                                            <div className="inner-input-group">
                                                                <input type="text" className="tf-comm" placeholder="제목을 입력해주세요." />
                                                            </div>
                                                            <p className="txt-validation">체크 / 에러 문구 내용 영역</p>
                                                            <p className="txt-desc">추가설명 문구 영역</p>
                                                        </div>
                                                        {/* <!-- Input-Group : End --> */}
                                                    </div>
                                                    <div className="form-group">
                                                        {/* <!-- Comp-Txt : Start --> */}
                                                        <span className="comp-txt">
                                                            <span className="table">
                                                                <span className="table-cell">
                                                                    <b className="fz-16 fc-5">small ( * 40)</b>
                                                                </span>
                                                            </span>
                                                        </span>
                                                        {/* <!-- Comp-Txt : End --> */}
                                                        {/* <!-- Input-Group : Start --> */}
                                                        <div className="input-group small">
                                                            <div className="inner-input-group">
                                                                <input type="text" className="tf-comm" placeholder="제목을 입력해주세요." />
                                                            </div>
                                                            <p className="txt-validation">체크 / 에러 문구 내용 영역</p>
                                                            <p className="txt-desc">추가설명 문구 영역</p>
                                                        </div>
                                                        {/* <!-- Input-Group : End --> */}
                                                    </div>
                                                    <div className="form-group">
                                                        {/* <!-- Comp-Txt : Start --> */}
                                                        <span className="comp-txt">
                                                            <span className="table">
                                                                <span className="table-cell">
                                                                    <b className="fz-16 fc-5">기본 사이즈 (300 * 48)</b>
                                                                </span>
                                                            </span>
                                                        </span>
                                                        {/* <!-- Comp-Txt : End --> */}
                                                        {/* <!-- Input-Group : Start --> */}
                                                        <div className="input-group">
                                                            <div className="inner-input-group">
                                                                <input type="text" className="tf-comm" placeholder="제목을 입력해주세요." />
                                                            </div>
                                                            <p className="txt-validation">체크 / 에러 문구 내용 영역</p>
                                                            <p className="txt-desc">추가설명 문구 영역</p>
                                                        </div>
                                                        {/* <!-- Input-Group : End --> */}
                                                    </div>
                                                    <div className="form-group">
                                                        {/* <!-- Comp-Txt : Start --> */}
                                                        <span className="comp-txt">
                                                            <span className="table">
                                                                <span className="table-cell">
                                                                    <b className="fz-16 fc-5">large ( * 56)</b>
                                                                </span>
                                                            </span>
                                                        </span>
                                                        {/* <!-- Comp-Txt : End --> */}
                                                        {/* <!-- Input-Group : Start --> */}
                                                        <div className="input-group large">
                                                            <div className="inner-input-group">
                                                                <input type="text" className="tf-comm" placeholder="제목을 입력해주세요." />
                                                            </div>
                                                            <p className="txt-validation">체크 / 에러 문구 내용 영역</p>
                                                            <p className="txt-desc">추가설명 문구 영역</p>
                                                        </div>
                                                        {/* <!-- Input-Group : End --> */}
                                                    </div>
                                                    <div className="form-group">
                                                        {/* <!-- Comp-Txt : Start --> */}
                                                        <span className="comp-txt">
                                                            <span className="table">
                                                                <span className="table-cell">
                                                                    <b className="fz-16 fc-5">xlarge ( * 64)</b>
                                                                </span>
                                                            </span>
                                                        </span>
                                                        {/* <!-- Comp-Txt : End --> */}
                                                        {/* <!-- Input-Group : Start --> */}
                                                        <div className="input-group xlarge">
                                                            <div className="inner-input-group">
                                                                <input type="text" className="tf-comm" placeholder="제목을 입력해주세요." />
                                                            </div>
                                                            <p className="txt-validation">체크 / 에러 문구 내용 영역</p>
                                                            <p className="txt-desc">추가설명 문구 영역</p>
                                                        </div>
                                                        {/* <!-- Input-Group : End --> */}
                                                    </div>
                                                    <div className="form-group">
                                                        {/* <!-- Comp-Txt : Start --> */}
                                                        <span className="comp-txt">
                                                            <span className="table">
                                                                <span className="table-cell">
                                                                    <b className="fz-16 fc-5">expand (width: 100%)</b>
                                                                </span>
                                                            </span>
                                                        </span>
                                                        {/* <!-- Comp-Txt : End --> */}
                                                        {/* <!-- Input-Group : Start --> */}
                                                        <div className="input-group xlarge expand">
                                                            <div className="inner-input-group">
                                                                <input type="text" className="tf-comm" placeholder="제목을 입력해주세요." />
                                                            </div>
                                                            <p className="txt-validation">체크 / 에러 문구 내용 영역</p>
                                                            <p className="txt-desc">추가설명 문구 영역</p>
                                                        </div>
                                                        {/* <!-- Input-Group : End --> */}
                                                    </div>
                                                    <div className="form-group">
                                                        {/* <!-- Comp-Txt : Start --> */}
                                                        <p className="comp-txt">
                                                            <span className="table">
                                                                <span className="table-cell">
                                                                    <b className="fz-16 fc-5">width 사이즈 클래스</b>
                                                                </span>
                                                            </span>
                                                        </p>
                                                        {/* <!-- Comp-Txt : End --> */}
                                                        {/* <!-- Comp-Txt : Start --> */}
                                                        <p className="comp-txt">
                                                            <span className="table">
                                                                <span className="table-cell">
                                                                    <b className="fz-16 fc-5 bullet-star">기본 공통 width : 300px</b>
                                                                </span>
                                                            </span>
                                                        </p>
                                                        {/* <!-- Comp-Txt : End --> */}
                                                        {/* <!-- Comp-Txt : Start --> */}
                                                        <p className="comp-txt">
                                                            <span className="table">
                                                                <span className="table-cell">
                                                                    <b className="fz-16 fc-5">w-100 : 100px / w-150 : 150px / w-200 : 200px / w-400 : 400px / w-500 : 500px</b>
                                                                </span>
                                                            </span>
                                                        </p>
                                                        {/* <!-- Comp-Txt : End --> */}

                                                    </div>
                                                </dd>
                                            </dl>
                                            <dl className="col-two">
                                                <dt>
                                                    <div className="dt-inner">
                                                        <span className="fz-16 fw-med fc-7">
                                                            셀렉트박스
                                                            <a className="ico-tooltip" data-tip></a>
                                                            <ReactTooltip>
                                                                <p className='fz-16 fw-smbold fc-0'>텍스트 툴팁 타이틀</p>
                                                                <p className='fz-14 fw-med fc-0'>텍스트 툴팁 내용</p>
                                                            </ReactTooltip>
                                                            <i className="txt-essential"></i>
                                                        </span>
                                                    </div>
                                                </dt>
                                                <dd>
                                                    <div className="form-group">

                                                        {/* <!-- Comp-Txt : Start --> */}
                                                        <p className="comp-txt">
                                                            <span className="table">
                                                                <span className="table-cell">
                                                                    <b className="fz-16 fc-5">셀렉트박스 - 기본</b>
                                                                </span>
                                                            </span>
                                                        </p>
                                                        {/* <!-- Comp-Txt : End --> */}

                                                        {/* <!-- SelectBox : Start --> */}
                                                        <Select placeholder="선택해주세요" onChange={antdSelect01Change}>
                                                            <Option value="옵션 01">옵션 01</Option>
                                                            <Option value="옵션 02">옵션 02</Option>
                                                            <Option value="옵션 03" disabled>옵션 03 Disabled 옵션 03 Disabled</Option>
                                                            <Option value="옵션 04">옵션 04</Option>
                                                        </Select>
                                                        {/* <!-- SelectBox : End --> */}
                                                    </div>
                                                    <div className="form-group">
                                                        {/* <!-- SelectBox : Start --> */}
                                                        <Select placeholder="선택해주세요" onChange={antdSelect01Change} disabled>
                                                            <Option value="옵션 01">옵션 01</Option>
                                                            <Option value="옵션 02">옵션 02</Option>
                                                            <Option value="옵션 03" disabled>옵션 03 Disabled</Option>
                                                            <Option value="옵션 04">옵션 04</Option>
                                                        </Select>
                                                        {/* <!-- SelectBox : End --> */}
                                                    </div>
                                                    <div className="form-group">
                                                        {/* <!-- Comp-Txt : Start --> */}
                                                        <p className="comp-txt">
                                                            <span className="table">
                                                                <span className="table-cell">
                                                                    <b className="fz-16 fc-5">셀렉트박스 - 검색</b>
                                                                </span>
                                                            </span>
                                                        </p>
                                                        {/* <!-- Comp-Txt : End --> */}

                                                        {/* <!-- SelectBox - Search : Start --> */}
                                                        <Select
                                                            showSearch
                                                            placeholder="선택해주세요"
                                                            optionFilterProp="children"
                                                            onChange={antdSelect02Change}
                                                            onSearch={antdSelect02Search}
                                                            filterOption={(input, option) =>
                                                                (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                                                            }
                                                            notFoundContent="검색 결과가 없습니다."
                                                            // className="xlarge w-200"
                                                        >
                                                            <Option value="옵션 01">옵션 01</Option>
                                                            <Option value="옵션 02">옵션 02</Option>
                                                            <Option value="옵션 03" disabled>옵션 03</Option>
                                                            <Option value="옵션 04">옵션 04</Option>
                                                        </Select>
                                                        {/* <!-- SelectBox - Search : End --> */}
                                                    </div>
                                                    <div className="form-group">
                                                        {/* <!-- SelectBox - Search : Start --> */}
                                                        <Select
                                                            showSearch
                                                            placeholder="선택해주세요"
                                                            optionFilterProp="children"
                                                            onChange={antdSelect02Change}
                                                            onSearch={antdSelect02Search}
                                                            filterOption={(input, option) =>
                                                                (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                                                            }
                                                            notFoundContent="검색 결과가 없습니다."
                                                            disabled
                                                        >
                                                            <Option value="옵션 01">옵션 01</Option>
                                                            <Option value="옵션 02">옵션 02</Option>
                                                            <Option value="옵션 03" disabled>옵션 03</Option>
                                                            <Option value="옵션 04">옵션 04</Option>
                                                        </Select>
                                                        {/* <!-- SelectBox - Search : End --> */}
                                                    </div>
                                                </dd>
                                                <dt>
                                                    <div className="dt-inner">
                                                        <span className="fz-16 fw-med fc-7">
                                                            셀렉트박스<br></br>사이즈
                                                            <a className="ico-tooltip" data-tip></a>
                                                            <ReactTooltip>
                                                                <p className='fz-16 fw-smbold fc-0'>텍스트 툴팁 타이틀</p>
                                                                <p className='fz-14 fw-med fc-0'>텍스트 툴팁 내용</p>
                                                            </ReactTooltip>
                                                            <i className="txt-essential"></i>
                                                        </span>
                                                    </div>
                                                </dt>
                                                <dd>
                                                    <div className="form-group">
                                                        {/* <!-- Comp-Txt : Start --> */}
                                                        <span className="comp-txt">
                                                            <span className="table">
                                                                <span className="table-cell">
                                                                    <b className="fz-16 fc-5">xxsmall ( * 24)</b>
                                                                </span>
                                                            </span>
                                                        </span>
                                                        {/* <!-- Comp-Txt : End --> */}
                                                        {/* <!-- SelectBox : Start --> */}
                                                        <Select placeholder="선택해주세요" onChange={antdSelect01Change} className="xxsmall">
                                                            <Option value="옵션 01">옵션 01</Option>
                                                            <Option value="옵션 02">옵션 02</Option>
                                                            <Option value="옵션 03" disabled>옵션 03 Disabled</Option>
                                                            <Option value="옵션 04">옵션 04</Option>
                                                        </Select>
                                                        {/* <!-- SelectBox : End --> */}
                                                    </div>
                                                    <div className="form-group">
                                                        {/* <!-- Comp-Txt : Start --> */}
                                                        <span className="comp-txt">
                                                            <span className="table">
                                                                <span className="table-cell">
                                                                    <b className="fz-16 fc-5">xsmall ( * 32)</b>
                                                                </span>
                                                            </span>
                                                        </span>
                                                        {/* <!-- Comp-Txt : End --> */}
                                                        {/* <!-- SelectBox : Start --> */}
                                                        <Select placeholder="선택해주세요" onChange={antdSelect01Change} className="xsmall">
                                                            <Option value="옵션 01">옵션 01</Option>
                                                            <Option value="옵션 02">옵션 02</Option>
                                                            <Option value="옵션 03" disabled>옵션 03 Disabled</Option>
                                                            <Option value="옵션 04">옵션 04</Option>
                                                        </Select>
                                                        {/* <!-- SelectBox : End --> */}
                                                    </div>

                                                    <div className="form-group">
                                                        {/* <!-- Comp-Txt : Start --> */}
                                                        <span className="comp-txt">
                                                            <span className="table">
                                                                <span className="table-cell">
                                                                    <b className="fz-16 fc-5">small ( * 40)</b>
                                                                </span>
                                                            </span>
                                                        </span>
                                                        {/* <!-- Comp-Txt : End --> */}
                                                        {/* <!-- SelectBox : Start --> */}
                                                        <Select placeholder="선택해주세요" onChange={antdSelect01Change} className="small">
                                                            <Option value="옵션 01">옵션 01</Option>
                                                            <Option value="옵션 02">옵션 02</Option>
                                                            <Option value="옵션 03" disabled>옵션 03 Disabled</Option>
                                                            <Option value="옵션 04">옵션 04</Option>
                                                        </Select>
                                                        {/* <!-- SelectBox : End --> */}
                                                    </div>
                                                    <div className="form-group">
                                                        {/* <!-- Comp-Txt : Start --> */}
                                                        <span className="comp-txt">
                                                            <span className="table">
                                                                <span className="table-cell">
                                                                    <b className="fz-16 fc-5">기본 사이즈 (300 * 48)</b>
                                                                </span>
                                                            </span>
                                                        </span>
                                                        {/* <!-- Comp-Txt : End --> */}
                                                        {/* <!-- SelectBox : Start --> */}
                                                        <Select placeholder="선택해주세요" onChange={antdSelect01Change}>
                                                            <Option value="옵션 01">옵션 01</Option>
                                                            <Option value="옵션 02">옵션 02</Option>
                                                            <Option value="옵션 03" disabled>옵션 03 Disabled</Option>
                                                            <Option value="옵션 04">옵션 04</Option>
                                                        </Select>
                                                        {/* <!-- SelectBox : End --> */}
                                                    </div>
                                                    <div className="form-group">
                                                        {/* <!-- Comp-Txt : Start --> */}
                                                        <span className="comp-txt">
                                                            <span className="table">
                                                                <span className="table-cell">
                                                                    <b className="fz-16 fc-5">large ( * 56)</b>
                                                                </span>
                                                            </span>
                                                        </span>
                                                        {/* <!-- Comp-Txt : End --> */}
                                                        {/* <!-- SelectBox : Start --> */}
                                                        <Select placeholder="선택해주세요" onChange={antdSelect01Change} className="large">
                                                            <Option value="옵션 01">옵션 01</Option>
                                                            <Option value="옵션 02">옵션 02</Option>
                                                            <Option value="옵션 03" disabled>옵션 03 Disabled</Option>
                                                            <Option value="옵션 04">옵션 04</Option>
                                                        </Select>
                                                        {/* <!-- SelectBox : End --> */}
                                                    </div>
                                                    <div className="form-group">
                                                        {/* <!-- Comp-Txt : Start --> */}
                                                        <span className="comp-txt">
                                                            <span className="table">
                                                                <span className="table-cell">
                                                                    <b className="fz-16 fc-5">xlarge ( * 64)</b>
                                                                </span>
                                                            </span>
                                                        </span>
                                                        {/* <!-- Comp-Txt : End --> */}
                                                        {/* <!-- SelectBox : Start --> */}
                                                        <Select placeholder="선택해주세요" onChange={antdSelect01Change} className="xlarge">
                                                            <Option value="옵션 01">옵션 01</Option>
                                                            <Option value="옵션 02">옵션 02</Option>
                                                            <Option value="옵션 03" disabled>옵션 03 Disabled</Option>
                                                            <Option value="옵션 04">옵션 04</Option>
                                                        </Select>
                                                        {/* <!-- SelectBox : End --> */}
                                                    </div>
                                                    <div className="form-group">
                                                        {/* <!-- Comp-Txt : Start --> */}
                                                        <p className="comp-txt">
                                                            <span className="table">
                                                                <span className="table-cell">
                                                                    <b className="fz-16 fc-5">width 사이즈 클래스</b>
                                                                </span>
                                                            </span>
                                                        </p>
                                                        {/* <!-- Comp-Txt : End --> */}
                                                        {/* <!-- Comp-Txt : Start --> */}
                                                        <p className="comp-txt">
                                                            <span className="table">
                                                                <span className="table-cell">
                                                                    <b className="fz-16 fc-5 bullet-star">기본 공통 width : 300px</b>
                                                                </span>
                                                            </span>
                                                        </p>
                                                        {/* <!-- Comp-Txt : End --> */}
                                                        {/* <!-- Comp-Txt : Start --> */}
                                                        <p className="comp-txt">
                                                            <span className="table">
                                                                <span className="table-cell">
                                                                    <b className="fz-16 fc-5">w-100 : 100px / w-150 : 150px / w-200 : 200px / w-400 : 400px / w-500 : 500px</b>
                                                                </span>
                                                            </span>
                                                        </p>
                                                        {/* <!-- Comp-Txt : End --> */}

                                                    </div>
                                                </dd>
                                            </dl>
                                            <dl className="col-two">
                                                <dt>
                                                    <div className="dt-inner">
                                                        <span className="fz-16 fw-med fc-7">
                                                            데이트피커
                                                            <a className="ico-tooltip" data-tip></a>
                                                            <ReactTooltip>
                                                                <p className='fz-16 fw-smbold fc-0'>텍스트 툴팁 타이틀</p>
                                                                <p className='fz-14 fw-med fc-0'>텍스트 툴팁 내용</p>
                                                            </ReactTooltip>
                                                            <i className="txt-essential"></i>
                                                        </span>
                                                    </div>
                                                </dt>
                                                <dd>
                                                    <div className="form-group">
                                                        {/* <!-- Comp-Txt : Start --> */}
                                                        <p className="comp-txt">
                                                            <span className="table">
                                                                <span className="table-cell">
                                                                    <b className="fz-16 fc-5">싱글 - Default</b>
                                                                </span>
                                                            </span>
                                                        </p>
                                                        {/* <!-- Comp-Txt : End --> */}

                                                        {/* <!-- Comp-Datepicker Single : Start --> */}
                                                        <div className="comp-datepicker single">
                                                            <DatePicker onChange={onChangeDateSingle} locale={locale} />
                                                        </div>
                                                        {/* <!-- Comp-Datepicker Single : End --> */}

                                                    </div>
                                                    <div className="form-group">
                                                        {/* <!-- Comp-Txt : Start --> */}
                                                        <p className="comp-txt">
                                                            <span className="table">
                                                                <span className="table-cell">
                                                                    <b className="fz-16 fc-5">싱글 - Disabled</b>
                                                                </span>
                                                            </span>
                                                        </p>
                                                        {/* <!-- Comp-Txt : End --> */}

                                                        {/* <!-- Comp-Datepicker Single : Start --> */}
                                                        <div className="comp-datepicker single">
                                                            <DatePicker onChange={onChangeDateSingle} disabled locale={locale} />
                                                        </div>
                                                        {/* <!-- Comp-Datepicker Single : End --> */}

                                                    </div>
                                                    <div className="form-group">
                                                        {/* <!-- Comp-Txt : Start --> */}
                                                        <p className="comp-txt">
                                                            <span className="table">
                                                                <span className="table-cell">
                                                                    <b className="fz-16 fc-5">기간 - Default</b>
                                                                </span>
                                                            </span>
                                                        </p>
                                                        {/* <!-- Comp-Txt : End --> */}


                                                        {/* <!-- Comp-DatePicker Range : Start --> */}
                                                        <div className="comp-datepicker range">
                                                            <button type="button" className="btn outline gray btn-ico"><i className="ico ico-prev"></i></button>
                                                            <RangePicker
                                                                // renderExtraFooter={() => '2022.05.01 ~ 2022.05.27 ( 27일 )'}
                                                                // onOk={onOk}
                                                                ranges={{
                                                                    '오늘': [moment(), moment()],
                                                                    '어제': [moment().startOf('month'), moment().endOf('month')],
                                                                    '최근 7일': [moment(), moment()],
                                                                    '이번 주': [moment(), moment()],
                                                                    '지난 주': [moment(), moment()],
                                                                    '최근 30일': [moment(), moment()],
                                                                }}
                                                                onChange={onChangeDatepicker}
                                                                locale={locale}
                                                            />
                                                            <button type="button" className="btn outline gray btn-ico"><i className="ico ico-next"></i></button>
                                                        </div>
                                                        {/* <!-- DatePicker Range : End --> */}

                                                    </div>
                                                    <div className="form-group">
                                                        {/* <!-- Comp-Txt : Start --> */}
                                                        <p className="comp-txt">
                                                            <span className="table">
                                                                <span className="table-cell">
                                                                    <b className="fz-16 fc-5">기간 - Disabled</b>
                                                                </span>
                                                            </span>
                                                        </p>
                                                        {/* <!-- Comp-Txt : End --> */}

                                                        {/* <!-- DatePicker Range : Start --> */}
                                                        <div className="comp-datepicker range">
                                                            <button type="button" className="btn outline gray btn-ico" disabled><i className="ico ico-prev"></i></button>
                                                            <RangePicker
                                                                // renderExtraFooter={() => '2022.05.01 ~ 2022.05.27 ( 27일 )'}
                                                                // onOk={onOk}
                                                                ranges={{
                                                                    '오늘': [moment(), moment()],
                                                                    '어제': [moment().startOf('month'), moment().endOf('month')],
                                                                    '최근 7일': [moment(), moment()],
                                                                    '이번 주': [moment(), moment()],
                                                                    '지난 주': [moment(), moment()],
                                                                    '최근 30일': [moment(), moment()],
                                                                }}
                                                                onChange={onChangeDatepicker}
                                                                locale={locale}
                                                                disabled
                                                            />
                                                            <button type="button" className="btn outline gray btn-ico" disabled><i className="ico ico-next"></i></button>
                                                        </div>
                                                        {/* <!-- DatePicker Range : End --> */}

                                                    </div>
                                                </dd>
                                                <dt>
                                                    <div className="dt-inner">
                                                        <span className="fz-16 fw-med fc-7">
                                                            파일 업로드
                                                            <a className="ico-tooltip" data-tip></a>
                                                            <ReactTooltip>
                                                                <p className='fz-16 fw-smbold fc-0'>텍스트 툴팁 타이틀</p>
                                                                <p className='fz-14 fw-med fc-0'>텍스트 툴팁 내용</p>
                                                            </ReactTooltip>
                                                            <i className="txt-essential"></i>
                                                        </span>
                                                    </div>
                                                </dt>
                                                <dd>
                                                    <div className="form-group">
                                                        {/* <!-- Comp-Txt : Start --> */}
                                                        <p className="comp-txt">
                                                            <span className="table">
                                                                <span className="table-cell">
                                                                    <b className="fz-16 fc-5">파일 업로드 - Default (single, multiple)</b>
                                                                </span>
                                                            </span>
                                                        </p>
                                                        {/* <!-- Comp-Txt : End --> */}

                                                    </div>
                                                    <div className="form-group">
                                                        {/* <!-- Comp-File-Upload Single : Start --> */}
                                                        <div className="comp-file-upload single">
                                                            <Upload
                                                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                                                listType="picture"
                                                                maxCount={1}
                                                                // defaultFileList={[...fileList]}
                                                                >
                                                                <Button icon={<UploadOutlined />} >파일 선택</Button>
                                                            </Upload>
                                                        </div>
                                                        {/* <!-- Comp-File-Upload Single : End --> */}
                                                    </div>
                                                    <div className="form-group">
                                                        {/* <!-- Comp-File-Upload Multiple : Start --> */}
                                                        <div className="comp-file-upload multiple">
                                                            <Upload
                                                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                                                listType="picture"
                                                                maxCount={3}
                                                                defaultFileList={[...fileList]}
                                                                multiple
                                                                >
                                                                <Button icon={<UploadOutlined />}>파일 선택</Button>
                                                            </Upload>
                                                        </div>
                                                        {/* <!-- Comp-File-Upload Multiple : End --> */}
                                                    </div>
                                                    <div className="form-group">
                                                        {/* <!-- Comp-Txt : Start --> */}
                                                        <p className="comp-txt">
                                                            <span className="table">
                                                                <span className="table-cell">
                                                                    <b className="fz-16 fc-5">파일 업로드 - Disabled  (single, multiple)</b>
                                                                </span>
                                                            </span>
                                                        </p>
                                                        {/* <!-- Comp-Txt : End --> */}
                                                    </div>

                                                    <div className="form-group">
                                                        {/* <!-- Comp-File-Upload Single : Start --> */}
                                                        <div className="comp-file-upload single">
                                                            <Upload
                                                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                                                listType="picture"
                                                                maxCount={1}
                                                                >
                                                                <Button icon={<UploadOutlined />} disabled={true}>파일 선택</Button>
                                                            </Upload>
                                                        </div>
                                                        {/* <!-- Comp-File-Upload Single : End --> */}
                                                    </div>
                                                    <div className="form-group">
                                                        {/* <!-- Comp-File-Upload Multiple : Start --> */}
                                                        <div className="comp-file-upload multiple">
                                                            <Upload
                                                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                                                listType="picture"
                                                                maxCount={3}
                                                                multiple
                                                                >
                                                                <Button icon={<UploadOutlined />} disabled={true}>파일 선택</Button>
                                                            </Upload>
                                                        </div>
                                                        {/* <!-- Comp-File-Upload Multiple : End --> */}
                                                    </div>
                                                </dd>
                                            </dl>
                                            <dl className="col-two">
                                                <dt>
                                                    <div className="dt-inner">
                                                        <span className="fz-16 fw-med fc-7">
                                                            다이얼로그 / 컨펌 / 알럿 / 토스트
                                                            <a className="ico-tooltip" data-tip></a>
                                                            <ReactTooltip>
                                                                <p className='fz-16 fw-smbold fc-0'>텍스트 툴팁 타이틀</p>
                                                                <p className='fz-14 fw-med fc-0'>텍스트 툴팁 내용</p>
                                                            </ReactTooltip>
                                                            <i className="txt-essential"></i>
                                                        </span>
                                                    </div>
                                                </dt>
                                                <dd>
                                                    <div className="form-group">
                                                        <button type="button" className="btn solid blue" onClick={()=> setAntdModalOpen(true)}>다이얼로그</button>
                                                        <Modal title="가장 기본적인 모달 형태" visible={antdModalOpen} onOk={antdModalOkEvent} onCancel={antdModalCancelEvent}>
                                                            <p>여기에</p>
                                                            <p>글을</p>
                                                            <p>쓰면 됩니당</p>
                                                        </Modal>
                                                        <button type="button" className="btn solid blue" onClick={antdModalConfirm}>컨펌 / 알럿</button>
                                                    </div>
                                                    <div className="form-group">
                                                        <Button className="btn outline blue" onClick={() => openNotificationWithIcon('success')}>Success</Button>
                                                        <Button className="btn outline blue" onClick={() => openNotificationWithIcon('info')}>Info</Button>
                                                        <Button className="btn outline blue" onClick={() => openNotificationWithIcon('warning')}>Warning</Button>
                                                        <Button className="btn outline blue" onClick={() => openNotificationWithIcon('error')}>Error</Button>
                                                    </div>
                                                </dd>
                                                <dt>
                                                    <div className="dt-inner">
                                                        <span className="fz-16 fw-med fc-7">
                                                            파일 리스트 <br></br> (Read)
                                                            <a className="ico-tooltip" data-tip></a>
                                                            <ReactTooltip>
                                                                <p className='fz-16 fw-smbold fc-0'>텍스트 툴팁 타이틀</p>
                                                                <p className='fz-14 fw-med fc-0'>텍스트 툴팁 내용</p>
                                                            </ReactTooltip>
                                                            <i className="txt-essential"></i>
                                                        </span>
                                                    </div>
                                                </dt>
                                                <dd>
                                                    <div className="form-group">
                                                        {/* <!-- Comp-File-List : Start --> */}
                                                        <div className="comp-file-list">
                                                            <div className="file-list-top">
                                                                <span className="fz-12 fw-med fc-5">첨부 파일 총 <strong className="fz-12 fw-med fc-11">3</strong>개</span>
                                                                <button type="button" className="btn"><i className="ico ico-download"></i> 첨부파일 모두 저장</button>
                                                            </div>
                                                            <div className="file-list-middle">
                                                                <a className="file-item">
                                                                    <i className="bullet-file">File</i>
                                                                    <span className="fz-12 fw-smbold fc-7">파일명 파일명 파일명 파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명파일명.ppt </span>
                                                                    <i className="ico ico-download"></i>
                                                                </a>
                                                                <a className="file-item">
                                                                    <i className="bullet-file">File</i>
                                                                    <span className="fz-12 fw-smbold fc-7">사진.jpg</span>
                                                                    <i className="ico ico-download"></i>
                                                                </a>
                                                                <a className="file-item">
                                                                    <i className="bullet-file">File</i>
                                                                    <span className="fz-12 fw-smbold fc-7">read page 에는 이렇게 보여지게 됩니다.ppt </span>
                                                                    <i className="ico ico-download"></i>
                                                                </a>
                                                            </div>
                                                        </div>
                                                        {/* <!-- Comp-File-List : End --> */}
                                                    </div>
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                    <div className="box-footer">
                                        <div className="box-left">
                                            <button type="button" className="btn outline blue small">버튼</button>
                                            <button type="button" className="btn outline gray small">버튼</button>
                                            <button type="button" className="btn outline red small">버튼</button>
                                        </div>
                                        <div className="box-center">
                                            <button type="button" className="btn solid gray">취소</button>
                                            <button type="button" className="btn solid blue">확인</button>
                                        </div>
                                        <div className="box-right">
                                        <button type="button" className="btn outline blue small">버튼</button>
                                            <button type="button" className="btn outline gray small">버튼</button>
                                            <button type="button" className="btn outline red small">버튼</button>
                                        </div>
                                    </div>
                                </section>
                                {/* <!-- Wrap-Tbl : End --> */}
                            </div>
                        </div>
                    </div>
                    {/* <!-- Container-Fluid : End --> */}

                </TabPane>
                <TabPane tab="Tab 2" key="2">
                    Content of Tab Pane 2
                </TabPane>
                <TabPane tab="Tab 3" key="3">
                    Content of Tab Pane 3
                </TabPane>
            </Tabs>

            {/* <!-- Container-Fluid : Start --> */}
            <div className="container-fluid">
                <div className="row">
                    <div className="col col-12">
                        {/* <!-- Wrap-Filter : Start --> */}
                        <section className="wrap-section wrap-filter">
                            <div className="box-body">
                                <div className="filter-icon-area">
                                    <i className="ico ico-filter"></i>
                                </div>
                                <div className="filter-content">

                                    <div className="filter-row">
                                        <div className="filter-group">
                                            <div className="filter-label">
                                                <p className="fz-16 fw-med fc-7">타이틀</p>
                                            </div>
                                            <div className="filter-box">
                                                <div className="filter-col">
                                                    <div className="CompGuide">셀렉트박스</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="filter-group">
                                            <div className="filter-label">
                                                <p className="fz-16 fw-med fc-7">타이틀</p>
                                            </div>
                                            <div className="filter-box">
                                                <div className="filter-col">
                                                    <div className="CompGuide w-150">셀렉트박스 w-150</div>
                                                </div>
                                                <div className="filter-col">
                                                    {/* <!-- Input-Group : Start --> */}
                                                    <div className="input-group">
                                                        <input type="text" className="tf-comm" placeholder="제목을 입력해주세요." />
                                                        <p className="txt-validation">체크 / 에러 문구 내용 영역</p>
                                                    </div>
                                                    {/* <!-- Input-Group : End --> */}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="filter-group">
                                            <div className="filter-label">
                                                <p className="fz-16 fw-med fc-7">타이틀</p>
                                            </div>
                                            <div className="filter-box">
                                                <div className="filter-col">
                                                    {/* <!-- SelectBox : Start --> */}
                                                    <Select placeholder="대카테고리" onChange={antdSelect01Change} className="w-200">
                                                        <Option value="옵션 01">옵션 01</Option>
                                                        <Option value="옵션 02">옵션 02</Option>
                                                        <Option value="옵션 03" disabled>옵션 03 Disabled 옵션 03 Disabled</Option>
                                                        <Option value="옵션 04">옵션 04</Option>
                                                    </Select>
                                                    {/* <!-- SelectBox : End --> */}
                                                </div>
                                                <div className="filter-col">
                                                    {/* <!-- SelectBox : Start --> */}
                                                    <Select placeholder="중카테고리" onChange={antdSelect01Change} className="w-200">
                                                        <Option value="옵션 01">옵션 01</Option>
                                                        <Option value="옵션 02">옵션 02</Option>
                                                        <Option value="옵션 03" disabled>옵션 03 Disabled 옵션 03 Disabled</Option>
                                                        <Option value="옵션 04">옵션 04</Option>
                                                    </Select>
                                                    {/* <!-- SelectBox : End --> */}
                                                </div>
                                                <div className="filter-col">
                                                    {/* <!-- SelectBox : Start --> */}
                                                    <Select placeholder="소카테고리" onChange={antdSelect01Change} className="w-200">
                                                        <Option value="옵션 01">옵션 01</Option>
                                                        <Option value="옵션 02">옵션 02</Option>
                                                        <Option value="옵션 03" disabled>옵션 03 Disabled 옵션 03 Disabled</Option>
                                                        <Option value="옵션 04">옵션 04</Option>
                                                    </Select>
                                                    {/* <!-- SelectBox : End --> */}
                                                </div>
                                                <div className="filter-col">
                                                    {/* <!-- SelectBox : Start --> */}
                                                    <Select placeholder="세카테고리" onChange={antdSelect01Change} className="w-200">
                                                        <Option value="옵션 01">옵션 01</Option>
                                                        <Option value="옵션 02">옵션 02</Option>
                                                        <Option value="옵션 03" disabled>옵션 03 Disabled 옵션 03 Disabled</Option>
                                                        <Option value="옵션 04">옵션 04</Option>
                                                    </Select>
                                                    {/* <!-- SelectBox : End --> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="filter-inquire">
                                    <button type="button" className="btn outline blue btn-ico --ico-txt"><i className="ico"></i>선택 조건 조회</button>
                                </div>
                            </div>
                        </section>
                        {/* <!-- Wrap-Filter : End --> */}
                    </div>
                </div>

                <div className="row">
                    <div className="col col-12">
                        {/* <!-- Wrap-Chart : Start --> */}
                        <section className="wrap-section wrap-chart">
                            <div className="box-header">
                                <div className="box-left">
                                    <h2 className="fz-20 fw-med fc-10">일 별 방문자 수 비교 그래프</h2>
                                </div>
                                <div className="box-right">
                                    {/* <!-- SelectBox : Start --> */}
                                    <Select placeholder="선택해주세요" onChange={antdSelect01Change} className="small w-150">
                                        <Option value="옵션 01">옵션 01</Option>
                                        <Option value="옵션 02">옵션 02</Option>
                                        <Option value="옵션 03" disabled>옵션 03 Disabled 옵션 03 Disabled</Option>
                                        <Option value="옵션 04">옵션 04</Option>
                                    </Select>
                                    {/* <!-- SelectBox : End --> */}
                                    {/* <!-- SelectBox : Start --> */}
                                    <Select placeholder="선택해주세요" onChange={antdSelect01Change} className="small w-150">
                                        <Option value="옵션 01">옵션 01</Option>
                                        <Option value="옵션 02">옵션 02</Option>
                                        <Option value="옵션 03" disabled>옵션 03 Disabled 옵션 03 Disabled</Option>
                                        <Option value="옵션 04">옵션 04</Option>
                                    </Select>
                                    {/* <!-- SelectBox : End --> */}
                                </div>
                            </div>
                            <div className="box-body">
                                <div className="box-top">
                                    <div className="GuideArea line-bar-chart-area"></div>
                                </div>
                                <div className="box-bottom">
                                    <ul className="chart-label">
                                        <li className="label"><i className="badge badge-04"></i><span>신규 방문자 수</span></li>
                                        <li className="label"><i className="badge badge-01"></i><span>재 방문자 수</span></li>
                                        <li className="label"><i className="badge badge-05"></i><span>재 방문율</span></li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                        {/* <!-- Wrap-Chart : End --> */}
                    </div>
                </div>


                <div className="row">
                    <div className="col col-8">
                        <Tabs tabBarExtraContent={operations} className="layout-tab">
                            <TabPane tab="일별" key="1">
                                {/* <!-- Wrap-Chart : Start --> */}
                                <section className="wrap-section wrap-chart">
                                    <div className="box-body">
                                        <div className="box-top">
                                            <div className="GuideArea line-bar-chart-area"></div>
                                        </div>
                                        <div className="box-bottom">
                                            <ul className="chart-label">
                                                <li className="label"><i className="badge badge-04"></i><span>신규 방문자 수</span></li>
                                                <li className="label"><i className="badge badge-01"></i><span>재 방문자 수</span></li>
                                                <li className="label"><i className="badge badge-05"></i><span>재 방문율</span></li>
                                            </ul>
                                        </div>
                                    </div>
                                </section>
                                {/* <!-- Wrap-Chart : End --> */}
                            </TabPane>
                            <TabPane tab="Tab 2" key="2">
                                Content of tab 2
                            </TabPane>
                            <TabPane tab="Tab 3" key="3">
                                Content of tab 3
                            </TabPane>
                        </Tabs>
                    </div>
                    <div className="col col-4">
                        {/* <!-- Wrap-Chart : Start --> */}
                        <section className="wrap-section wrap-chart">
                            <div className="box-header">
                                <div className="box-left">
                                    <h2 className="fz-20 fw-med fc-10">총 회원 수</h2>
                                </div>
                                <div className="box-right">
                                    <span className="fz-20 fw-med fc-10">12,345명</span>
                                </div>
                            </div>
                            <div className="box-body">
                                <div className="box-top">
                                    <div className="GuideArea pie-chart-area"></div>
                                </div>
                                <div className="box-bottom">
                                    <ul className="chart-label">
                                        <li className="label"><i className="badge badge-04"></i><span>신규 회원 (오늘 가입)</span></li>
                                        <li className="label"><i className="badge badge-01"></i><span>기존 회원</span></li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                        {/* <!-- Wrap-Chart : End --> */}
                    </div>
                </div>

                <div className="row">
                    <div className="col col-12">
                        {/* <!-- Wrap-Datagrid : Start --> */}
                        <section className="wrap-section wrap-datagrid">
                            <div className="box-header">
                                <div className="box-left">
                                    <h2 className="fz-18 fw-med fc-10">기본 그리드</h2>
                                    <span className="fz-14 fw-med fc-5">(조회시간: 2021-08-08 11:11:11)</span>
                                </div>
                                <div className="box-right">
                                    <button type="button" className="btn outline blue btn-ico --txt-ico small">csv 다운로드<i className="ico ico-download IcoGuide"></i></button>
                                </div>
                            </div>
                            <div className="box-btn-option">
                                <div className="box-left">
                                    <button type="button" className="btn outline blue small w-auto">ON</button>
                                    <button type="button" className="btn outline gray small w-auto">OFF</button>
                                    <button type="button" className="btn outline red small w-auto">삭제</button>
                                    <button type="button" className="btn outline gray small">입찰 정보 일괄 변경</button>
                                </div>
                                <div className="box-right">
                                    <button type="button" className="btn solid blue btn-ico --ico-txt small"><i className="ico IcoGuide"></i>즐겨찾기 그룹 등록</button>
                                </div>
                            </div>
                            <div className="box-filter-area">
                                {/* <!-- Comp-Filter : Start --> */}
                                <div className="comp-filter">
                                    <div className="box-body">
                                        <div className="filter-icon-area">
                                            <i className="ico ico-filter"></i>
                                        </div>
                                        <div className="filter-content">

                                            <div className="filter-row">
                                                <div className="filter-group">
                                                    <div className="filter-label">
                                                        <p className="fz-16 fw-med fc-7">타이틀</p>
                                                    </div>
                                                    <div className="filter-box">
                                                        <div className="filter-col">
                                                            <div className="CompGuide">셀렉트박스</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="filter-group">
                                                    <div className="filter-label">
                                                        <p className="fz-16 fw-med fc-7">타이틀</p>
                                                    </div>
                                                    <div className="filter-box">
                                                        <div className="filter-col">
                                                            {/* <!-- SelectBox : Start --> */}
                                                            <Select placeholder="대카테고리" onChange={antdSelect01Change} className="w-200">
                                                                <Option value="옵션 01">옵션 01</Option>
                                                                <Option value="옵션 02">옵션 02</Option>
                                                                <Option value="옵션 03" disabled>옵션 03 Disabled 옵션 03 Disabled</Option>
                                                                <Option value="옵션 04">옵션 04</Option>
                                                            </Select>
                                                            {/* <!-- SelectBox : End --> */}
                                                        </div>
                                                        <div className="filter-col">
                                                            {/* <!-- SelectBox : Start --> */}
                                                            <Select placeholder="중카테고리" onChange={antdSelect01Change} className="w-200">
                                                                <Option value="옵션 01">옵션 01</Option>
                                                                <Option value="옵션 02">옵션 02</Option>
                                                                <Option value="옵션 03" disabled>옵션 03 Disabled 옵션 03 Disabled</Option>
                                                                <Option value="옵션 04">옵션 04</Option>
                                                            </Select>
                                                            {/* <!-- SelectBox : End --> */}
                                                        </div>
                                                        <div className="filter-col">
                                                            {/* <!-- SelectBox : Start --> */}
                                                            <Select placeholder="소카테고리" onChange={antdSelect01Change} className="w-200">
                                                                <Option value="옵션 01">옵션 01</Option>
                                                                <Option value="옵션 02">옵션 02</Option>
                                                                <Option value="옵션 03" disabled>옵션 03 Disabled 옵션 03 Disabled</Option>
                                                                <Option value="옵션 04">옵션 04</Option>
                                                            </Select>
                                                            {/* <!-- SelectBox : End --> */}
                                                        </div>
                                                        <div className="filter-col">
                                                            {/* <!-- SelectBox : Start --> */}
                                                            <Select placeholder="세카테고리" onChange={antdSelect01Change} className="w-200">
                                                                <Option value="옵션 01">옵션 01</Option>
                                                                <Option value="옵션 02">옵션 02</Option>
                                                                <Option value="옵션 03" disabled>옵션 03 Disabled 옵션 03 Disabled</Option>
                                                                <Option value="옵션 04">옵션 04</Option>
                                                            </Select>
                                                            {/* <!-- SelectBox : End --> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="filter-inquire">
                                            <button type="button" className="btn outline blue btn-ico --ico-txt"><i className="ico"></i>선택 조건 조회</button>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- Comp-Filter : End --> */}
                            </div>
                            {/* <div className="box-body" style={{height: 800}}> */}
                            <div className="box-body">

                                {/* <div className="ag-grid"> */}
                                    {/* <div className="ag-grid-inner"> */}
                                        <AgGridExample />
                                    {/* </div> */}
                                {/* </div> */}

                                {/* <EmptyAgGridExample /> */}
                                {/* <AgGridReact
                                    ref={gridRef}
                                    rowData={rowData}
                                    columnDefs={columnDefs}
                                    // defaultColDef={defaultColDef}
                                    defaultColDef={{
                                        sortable: true,
                                        flex: 1,
                                        minWidth: 100,
                                        resizable: true,
                                        // tooltipComponent: CustomTooltip,
                                        // autoHeight: true,
                                        // wrapText: true,
                                    }}
                                    rowSelection={'multiple'}
                                    suppressRowClickSelection={true}
                                    isRowSelectable={isRowSelectable}
                                    onGridReady={onGridReady}
                                    rowHeight={64}
                                    tooltipShowDelay={0}
                                    tooltipHideDelay={50000}

                                ></AgGridReact> */}


                            </div>
                            <div className="box-footer">
                                <div className="box-left">
                                    <span className="fz-16 fw-med fc-5">총 1,024건</span>
                                </div>
                                <div className="box-right">
                                    {/* <!-- Pagenation : Start --> */}
                                    <div className="pagenation">
                                        {/* <!-- SelectBox : Start --> */}
                                        <Select value="10 Row" onChange={antdSelect01Change} className="small w-150">
                                            <Option>10 Row</Option>
                                            <Option>30 Row</Option>
                                            <Option>50 Row</Option>
                                            <Option>100 Row</Option>
                                        </Select>
                                        {/* <!-- SelectBox : End --> */}
                                        {/* <!-- Page-Nav : Start --> */}
                                        <div className="page-nav">
                                            <button type="button" className="btn-nav first" disabled><i className="ico"></i></button>
                                            <button type="button" className="btn-nav prev" disabled><i className="ico"></i></button>
                                            <a className="page-num selected">1</a>
                                            <a className="page-num">2</a>
                                            <a className="page-num">3</a>
                                            <a className="page-num">4</a>
                                            <a className="page-num">5</a>
                                            <a className="page-num">6</a>
                                            <a className="page-num">7</a>
                                            <a className="page-num">8</a>
                                            <a className="page-num">9</a>
                                            <a className="page-num">10</a>
                                            <button type="button" className="btn-nav next"><i className="ico"></i></button>
                                            <button type="button" className="btn-nav last"><i className="ico"></i></button>
                                        </div>
                                        {/* <!-- Page-Nav : End --> */}
                                    </div>
                                    {/* <!-- Pagenation : End --> */}
                                </div>
                            </div>
                        </section>
                        {/* <!-- Wrap-Datagrid : End --> */}
                    </div>
                </div>

                <div className="row">
                    <div className="col col-12">
                        {/* <!-- Wrap-Datagrid : Start --> */}
                        <section className="wrap-section wrap-datagrid">
                            <div className="box-header">
                                <div className="box-left">
                                    <h2 className="fz-18 fw-med fc-10">Empty Data</h2>
                                    <span className="fz-14 fw-med fc-5">(조회시간: 2021-08-08 11:11:11)</span>
                                </div>
                                <div className="box-right">
                                    <button type="button" className="btn outline blue btn-ico --txt-ico small">csv 다운로드<i className="ico ico-download IcoGuide"></i></button>
                                </div>
                            </div>
                            <div className="box-btn-option">
                                <div className="box-left">
                                    <button type="button" className="btn outline blue small w-auto">ON</button>
                                    <button type="button" className="btn outline gray small w-auto">OFF</button>
                                    <button type="button" className="btn outline red small w-auto">삭제</button>
                                    <button type="button" className="btn outline gray small">입찰 정보 일괄 변경</button>
                                </div>
                                <div className="box-right">
                                    <button type="button" className="btn solid blue btn-ico --ico-txt small"><i className="ico IcoGuide"></i>즐겨찾기 그룹 등록</button>
                                </div>
                            </div>
                            <div className="box-filter-area">
                                {/* <!-- Comp-Filter : Start --> */}
                                <div className="comp-filter">
                                    <div className="box-body">
                                        <div className="filter-icon-area">
                                            <i className="ico ico-filter"></i>
                                        </div>
                                        <div className="filter-content">

                                            <div className="filter-row">
                                                <div className="filter-group">
                                                    <div className="filter-label">
                                                        <p className="fz-16 fw-med fc-7">타이틀</p>
                                                    </div>
                                                    <div className="filter-box">
                                                        <div className="filter-col">
                                                            <div className="CompGuide">셀렉트박스</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="filter-group">
                                                    <div className="filter-label">
                                                        <p className="fz-16 fw-med fc-7">타이틀</p>
                                                    </div>
                                                    <div className="filter-box">
                                                        <div className="filter-col">
                                                            {/* <!-- SelectBox : Start --> */}
                                                            <Select placeholder="대카테고리" onChange={antdSelect01Change} className="w-200">
                                                                <Option value="옵션 01">옵션 01</Option>
                                                                <Option value="옵션 02">옵션 02</Option>
                                                                <Option value="옵션 03" disabled>옵션 03 Disabled 옵션 03 Disabled</Option>
                                                                <Option value="옵션 04">옵션 04</Option>
                                                            </Select>
                                                            {/* <!-- SelectBox : End --> */}
                                                        </div>
                                                        <div className="filter-col">
                                                            {/* <!-- SelectBox : Start --> */}
                                                            <Select placeholder="중카테고리" onChange={antdSelect01Change} className="w-200">
                                                                <Option value="옵션 01">옵션 01</Option>
                                                                <Option value="옵션 02">옵션 02</Option>
                                                                <Option value="옵션 03" disabled>옵션 03 Disabled 옵션 03 Disabled</Option>
                                                                <Option value="옵션 04">옵션 04</Option>
                                                            </Select>
                                                            {/* <!-- SelectBox : End --> */}
                                                        </div>
                                                        <div className="filter-col">
                                                            {/* <!-- SelectBox : Start --> */}
                                                            <Select placeholder="소카테고리" onChange={antdSelect01Change} className="w-200">
                                                                <Option value="옵션 01">옵션 01</Option>
                                                                <Option value="옵션 02">옵션 02</Option>
                                                                <Option value="옵션 03" disabled>옵션 03 Disabled 옵션 03 Disabled</Option>
                                                                <Option value="옵션 04">옵션 04</Option>
                                                            </Select>
                                                            {/* <!-- SelectBox : End --> */}
                                                        </div>
                                                        <div className="filter-col">
                                                            {/* <!-- SelectBox : Start --> */}
                                                            <Select placeholder="세카테고리" onChange={antdSelect01Change} className="w-200">
                                                                <Option value="옵션 01">옵션 01</Option>
                                                                <Option value="옵션 02">옵션 02</Option>
                                                                <Option value="옵션 03" disabled>옵션 03 Disabled 옵션 03 Disabled</Option>
                                                                <Option value="옵션 04">옵션 04</Option>
                                                            </Select>
                                                            {/* <!-- SelectBox : End --> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="filter-inquire">
                                            <button type="button" className="btn outline blue btn-ico --ico-txt"><i className="ico"></i>선택 조건 조회</button>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- Comp-Filter : End --> */}
                            </div>
                            <div className="box-body">
                                <EmptyAgGridExample />
                            </div>
                            <div className="box-footer">
                                <div className="box-left">
                                    <span className="fz-16 fw-med fc-5">총 1,024건</span>
                                </div>
                                <div className="box-right">
                                    {/* <!-- Pagenation : Start --> */}
                                    <div className="pagenation">
                                        {/* <!-- SelectBox : Start --> */}
                                        <Select value="10 Row" onChange={antdSelect01Change} className="small w-150">
                                            <Option>10 Row</Option>
                                            <Option>30 Row</Option>
                                            <Option>50 Row</Option>
                                            <Option>100 Row</Option>
                                        </Select>
                                        {/* <!-- SelectBox : End --> */}
                                        {/* <!-- Page-Nav : Start --> */}
                                        <div className="page-nav">
                                            <button type="button" className="btn-nav first" disabled><i className="ico"></i></button>
                                            <button type="button" className="btn-nav prev" disabled><i className="ico"></i></button>
                                            <a className="page-num selected">1</a>
                                            <a className="page-num">2</a>
                                            <a className="page-num">3</a>
                                            <a className="page-num">4</a>
                                            <a className="page-num">5</a>
                                            <a className="page-num">6</a>
                                            <a className="page-num">7</a>
                                            <a className="page-num">8</a>
                                            <a className="page-num">9</a>
                                            <a className="page-num">10</a>
                                            <button type="button" className="btn-nav next"><i className="ico"></i></button>
                                            <button type="button" className="btn-nav last"><i className="ico"></i></button>
                                        </div>
                                        {/* <!-- Page-Nav : End --> */}
                                    </div>
                                    {/* <!-- Pagenation : End --> */}
                                </div>
                            </div>
                        </section>
                        {/* <!-- Wrap-Datagrid : End --> */}
                    </div>
                </div>

                <div className="row">
                    <div className="col col-12">
                        {/* <!-- Wrap-Help : Start --> */}
                        <section className="wrap-section wrap-help">
                            <div className="box-header">
                                <div className="box-left">
                                    <h2 className="fz-18 fw-med fc-10">도움말</h2>
                                </div>
                            </div>
                            <ul className="box-body">
                                <li className="item-help">
                                    <i className="bullet-01"></i>
                                    <span className="fz-14 fc-7">도움말 내용입니다. 도움말 내용 도움말 내용 도움말 내용 도움말 내용 도움말 내용 도움말 내용 도움말 내용 도움말 내용 도움말 내용 도움말 내용 도움말 내용 도움말 내용 도움말 내용입니다. 도움말 내용 도움말 내용 도움말 내용 도움말 내용 도움말 내용 도움말 내용 도움말 내용입니다. 도움말 내용 도움말 내용 도움말 내용 도움말 내용 도움말 내용 도움말 내용 도움말 내용 도움말 내용 도움말 내용 도움말 내용 도움말 내용 도움말 내용</span>
                                </li>
                                <li className="item-help">
                                    <i className="bullet-01"></i>
                                    <span className="fz-14 fc-7">도움말 내용입니다.</span>
                                </li>
                                <li className="item-help">
                                    <span className="fz-14 fc-7">1. 도움말 내용입니다. 도움말 내용 도움말 내용 도움말 내용 도움말 내용 도움말 내용 도움말 내용 도움말 내용 도움말 내용 도움말 내용 도움말 내용 도움말 내용 도움말 내용 도움말 내용입니다. 도움말 내용 도움말 내용 도움말 내용 도움말 내용 도움말 내용 도움말 내용 도움말 내용입니다. 도움말 내용 도움말 내용 도움말 내용 도움말 내용 도움말 내용 도움말 내용 도움말 내용 도움말 내용 도움말 내용 도움말 내용 도움말 내용 도움말 내용</span>
                                </li>
                                <li className="item-help">
                                    <span className="fz-14 fc-7">2. 도움말 내용입니다.</span>
                                </li>
                            </ul>
                        </section>
                        {/* <!-- Wrap-Help : End --> */}
                    </div>
                </div>

            </div>
            {/* <!-- Container-Fluid : End --> */}



        </>
    )
}
export default PluginAll;