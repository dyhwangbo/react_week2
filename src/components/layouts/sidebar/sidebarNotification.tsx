
import { Drawer } from 'antd';
import { useState } from 'react';

/** 사이드바 내의 알림 */

const SidebarNotification = ({alrams}) => {
    //사이드바의 알림 Drawer 기능 처리
    const [visibleDrawer, setVisibleDrawer] = useState(false);
    return (
        <>
        <a className="util noti" href="#!" onClick={(e) => {setVisibleDrawer(true)}}>
            <i className="ico ico-32 ico-bell"></i>
            <span className="fz-16 fw-smbold">알림</span>
            <span className="badge-num">99+</span>
        </a>
        {/* <li className="one-dpeth treeview"><a href="#!"onClick={(e) => {setVisibleDrawer(true)}}>알림</a></li> */}
        <Drawer
            title="ANTD-DRAWER 기능"
            placement="right"
            closable={true}
            onClose={() => setVisibleDrawer(false)}
            visible={visibleDrawer}
        >
            {alrams.map((alram) => {
                return <div key={alram.noticeId}>
                    <p>{alram.title}</p>
                    <p>{alram.description}</p>
                </div>
            })}
        </Drawer>
        </> 
    )
}

export default SidebarNotification;

// function usetState(items: Menu[] | undefined): [any, any] {
//     throw new Error('Function not implemented.');
// }
