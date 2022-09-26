import { Button, Modal } from "antd";
import { Dispatch, SetStateAction } from "react";

/**단순 텍스트와 OK 버튼으로만 이루어진 모달 컴포넌트. CSS 등이 없어 일단 p tag 로 작성. 
 * 필요한 문장이 많을 수도 있어 배열로 구성.
 *  **/
interface ModalOptions {
    modalKey: string,
    title: string,
    width? : number,
    visible : boolean,
    setVisible : Dispatch<SetStateAction<boolean>>
    descriptions : string[]
}
const ModalComponent = (props: ModalOptions) => {
    return (
        <>
            <Modal
                key={props.modalKey}
                title={props.title}
                width={props.width !== undefined ? props.width : 800}
                visible={props.visible}
                onCancel={()=>props.setVisible(false)} //모달 상단의 x 버튼이다.
                footer={[
                    <Button key="submit" type="primary" onClick={() => props.setVisible(false)} >확인</Button>
                ]}
            >
                {props.descriptions.map((desc, index) => {
                    return <p key={props.modalKey+"_p_"+index}>{desc}</p>
                })}
            </Modal>
        </>
    )
}
export { ModalComponent };