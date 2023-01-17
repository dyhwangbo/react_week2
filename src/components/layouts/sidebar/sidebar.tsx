import { useState, useEffect, useContext, useCallback } from "react";
import { AuthContext } from "../../../auth/loginAuthContext";
import { useLocation } from "react-router";
import SidebarDropDown from "./sideBarDropDown";
import SidebarMenuList from "./sidebarMenuList";
import SidebarNotification from "./sidebarNotification";
import logoImageFile from '../../../gsadp/images/logo.svg';
import SidebarNotice from "./sidebarNotice";
import SidebarUserInfo from "./sidebarUserInfo";

//메뉴리스트 임포트
import menuList from './menuList.json';
//알람리스트 임포트
import notifications from './notifications.json';

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

/* 메뉴 필터 스텝 01. 전부 불러온 메뉴에서 노출 시킬 메뉴를 필터링하여 리턴한다. 체크 목록 : show / roleGroup */
const menuFilterStep01 = (menuList, roleGroups) => {
    let tempMenuList = [];
    //1. 전부 불러온 메뉴 중 show 가 true 메뉴만 필터링.
    const showMenuList = menuList.filter(v => v.show);
    //2. 권한별로 실제 노출시킬 메뉴를 필터링.
    for(let i = 0; i < showMenuList.length; i ++){
        const splitMenuRoleGroups = showMenuList[i].roleGroup.split(",");
        if(splitMenuRoleGroups.length > 1){
            for(let j = 0; j < splitMenuRoleGroups.length; j++){
                if(roleGroups.includes(splitMenuRoleGroups[j])) {
                    tempMenuList.push(showMenuList[i]); break;
                }
            }
        } else {
            if(roleGroups.includes(splitMenuRoleGroups[0])) tempMenuList.push(showMenuList[i]);
        }
    }
    return tempMenuList;
}

/* 메뉴 생성 스탭02. 뎁스별로 메뉴를 가공하여 최종 리턴한다. */
const menuFilterStep02 = (tempMenuList) => {
    let menuMap = new Map();
    //1. 부모와 자식 메뉴로 나눔. 기준은 depth
    let parentMenuList = tempMenuList.filter(v => v.depth === 1);
    let childMenuList = tempMenuList.filter(v => v.depth !== 1);
    //모든 1뎁스 메뉴에 2뎁스 메뉴를 넣을 공간을 추가해준다.
    parentMenuList.forEach((parent) => {
        parent["leafs"] = [];
        menuMap.set(parent.menuId, parent);
    });
    //2뎁스 메뉴의 parenetId를 토대로 1뎁스 메뉴에 넣어준다.
    childMenuList.map((child) => menuMap.get(child.parentId).leafs.push(child));
    //array 형태로 가공하여 리턴.
    return Array.from(menuMap.values());
}

const Sidebar = () => {
    const authContext = useContext(AuthContext);
    const [ roleGroups, _] = useState(authContext.roleGroups);
    const [ menu, setMenu] = useState([]);
    const [ menuLoading, setMenuLoading] = useState(false);
    const [ notification, setNotification ] = useState([]);

    const menuFilter = useCallback((menuList) => {
        //1. 화면 상에 표시할 메뉴만 필터처리.
        const tempRoleGroupMenuList = menuFilterStep01(menuList, roleGroups);
        //2. 1번을 토대로 재가공하여 최종 화면에 표시될 메뉴리스트 리턴.
        const menus = menuFilterStep02(tempRoleGroupMenuList); 
        return menus;
    }, [roleGroups]);

    const loadDatas = useCallback(async () => {
        if(roleGroups === undefined || roleGroups === null) return;
        //메뉴 로드
        //const jsonMenu = await (await fetch("http://localhost:8888/menuList")).json();
        setMenu(menuFilter(menuList));
        //setMenu(menuList2);
        setMenuLoading(true);
        //알림 로드
        setNotification(notifications);
    }, [roleGroups, menuFilter]);
    useEffect(() => {loadDatas()}, [loadDatas]);

    return (
        <aside className="sidebar">
            <a className="logo" href="/">
                <img src={logoImageFile} alt="GS ADP 로고" />
            </a>
            {/* 광고주 드롭다운 메뉴 */}
            <SidebarDropDown />
            {/* 광고주 LEFT 메뉴 */}
            <ul className="sidebar-menu tree" data-widget="tree">
                <SidebarMenuList items={menu} loading={menuLoading} activeMenu={useLocation().pathname}/>
            </ul>
            {/* 광고주 알림 및 공지 */}
            <div className="util-menu">
                {/* 데이터는 추후에 notifiactions.json 처럼 불러오자. */}
                <SidebarNotification alrams={notification}/>
                <SidebarNotice />
            </div>
            {/* 광고주 정보 */}
            <div className="user-info">
                <SidebarUserInfo />
            </div>
            {/* 사이드바 open / close 처리 */}
            <a className="btn-sidebar" data-toggle="push-menu" role="button"
            //onClick={() => extendOption.changeFn(value => !value)}
            >
                <i className="ico"></i>
            </a>
        </aside>
    )
}

export default Sidebar;