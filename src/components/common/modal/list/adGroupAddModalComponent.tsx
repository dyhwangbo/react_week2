import { Modal } from "antd";
import { Dispatch, SetStateAction } from "react";

/** 광고 등록에서 신규 광고 그룹 생성 시 사용되는 모달
 * 인터파크를 참고해서 만듬
 */


interface AdGroupAddOptions {
    modalKey: string,
    title: string,
    width?: number,
    visible: boolean,
    setVisible : Dispatch<SetStateAction<boolean>>
    agroupName: string,
    setAgroupName : Dispatch<SetStateAction<string>>,
    addGroupFn : () => void,

}
const AdGroupAddModalComponent = (props: AdGroupAddOptions) => {

    return (
        <>
        <Modal
            key={props.modalKey}
            title="그룹 신규 생성" 
            width={800}
            visible={props.visible}
            onOk={props.addGroupFn}
            onCancel={()=> {
                props.setAgroupName(""); 
                props.setVisible(false)
            }}
            okText="생성"
            cancelText="취소"
        >
        <section className="wrap-section wrap-tbl">
            <div className="box-body">
                <div className="tbl">
                    <dl>
                        <dt>
                            <div className="dt-inner">
                                <span className="fz-16 fw-med fc-7">그룹명 입력<i className="txt-essential"></i></span>
                            </div>
                        </dt>
                        <dd>
                            <div className="form-group">
                                <div className="input-group xlarge expand">
                                    <div className="inner-input-group">
                                        <input 
                                            type="text" 
                                            className="tf-comm" 
                                            placeholder="제목을 입력해주세요."
                                            value={props.agroupName}
                                            onChange={(e) => props.setAgroupName(e.target.value)}
                                        />
                                    </div>
                                    <p className="txt-validation">체크 / 에러 문구 내용 영역</p>
                                    <p className="txt-desc">그룹 명은 10~20자 내외의 어쩌구 저쩌구</p>
                                </div>
                            </div>
                        </dd>
                    </dl>
                
                </div>
            </div>
        </section> 
        </Modal>

        </>
    )
}

export { AdGroupAddModalComponent };