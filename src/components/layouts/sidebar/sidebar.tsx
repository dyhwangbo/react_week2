import { useLocation } from "react-router";
import SidebarDropDown from "./sideBarDropDown";
import SidebarMenuList from "./sidebarMenuList";
import SidebarNotification from "./sidebarNotification";
import logoImageFile from '../../../gsadp/images/logo.svg';
import SidebarNotice from "./sidebarNotice";
import SidebarUserInfo from "./sidebarUserInfo";

//메뉴리스트 임포트
import menuList from './menuList.json';
//"noImplicitAny": false 추가함.(암시적 any 타입일 경우 에러나는 걸 무시하도록.)
export interface Menu {
    menuId: string;
    name: string;
    path: string;
    show: boolean;
    roleGroup: string;
    leaf: boolean;
    leafs?: any;
}


//const Sidebar = ({extendOption}) => {
    const Sidebar = () => {
    const activeMenu = useLocation().pathname;
    
    return (
        <aside className="sidebar">
            <a className="logo" href="/home">
                <img src={logoImageFile} alt="GS ADP 로고" />
            </a>
            {/* 광고주 드롭다운 메뉴 */}
            <SidebarDropDown />

            <ul className="sidebar-menu tree" data-widget="tree">
                <SidebarMenuList items={menuList} loading={true} activeMenu={activeMenu}/>
            </ul>
            {/* 고정적으로 나오는 사이드바 하단의 메뉴은 강제 설정해준다. 추후에 다른 레이아웃도 쓴다면 컴포넌트화를 고려해보자. */}
            <div className="util-menu">
                <SidebarNotification />
                <SidebarNotice />
            </div>
            <div className="user-info">
                <SidebarUserInfo />
            </div>
            {/* 사이드바 open / close 처리 */}
            <a className="btn-sidebar" data-toggle="push-menu" role="button" href="#!" 
            //onClick={() => extendOption.changeFn(value => !value)}
            >
                <i className="ico"></i>
            </a>
        </aside>
    )
}

export default Sidebar;