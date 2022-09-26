import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../auth/loginAuthContext';

import { Menu } from './sidebar';

interface MenuListProps {
    items: Menu[] | undefined;
    loading:boolean;
    activeMenu: String;
    contentTitleOption?: {title, titleChange}; // 필요하면 추가.
}


const SidebarMenuList = (props: MenuListProps) => {
    const context = useContext(AuthContext);

    let roleGroup = context.roleGroups;
    if(roleGroup === null) return (<></>);
    
    return (
        <>
            {props.loading && props.items?.map((menu) => (
                menu.show === true ? 
                    roleGroup.includes(menu.roleGroup) ? 
                    menu.leaf === true ? 
                    <li key={menu.menuId} className="one-depth treeview">
                        <a className="one-depth-title" href="#!">
                            <div className="box-left">
                                <i className="ico ico-32 ico-menu-03"></i>
                                <span className="fz-16">{menu.name}</span>
                            </div>
                            <div className="box-right">
                                <i className="ico ico-16 ico-arrow"></i>
                            </div>
                        </a>
                        <ul className="two-depth treeview-menu">
                            {menu.leafs?.map((leafMenu: any) => (
                                leafMenu.show === true ? 
                                <li key={leafMenu.menuId} className={(props.activeMenu === leafMenu.path) ? "two-depth-title selected" : "two-depth-title"}>
                                    <Link to={leafMenu.path}>
                                        {leafMenu.name}
                                    </Link>
                                </li>
                                
                                : null
                            ))}
                        </ul>
                    </li> : 
                    //1뎁스의 메뉴 생성. 클래스가 붙으면 이동을 안한다.. 왜일까..
                    // <li 
                    //     key={menu.id} 
                    //     className={props.activeMenu === menu.path ? "one-depth treeview active" : "one-depth treeview" }
                    //     onClick={(e:any) => titleChange(e)}
                    // >
                        <li key={menu.menuId}
                        // className="one-depth treeview"
                        >
                        <Link to={menu.path} className="one-depth-title">
                            <div className="box-left">
                                <i className="ico ico-32 ico-menu-01"></i>
                                <span className="fz-16">{menu.name}</span>
                            </div>
                        </Link>
                    </li>
                    //롤 그룹이 안맞아서 표시 안함
                    : null
                //show 가 false 라서 표시 안함.
                : null
            ))}
       </> 
            
    )
}

export default SidebarMenuList;

// function usetState(items: Menu[] | undefined): [any, any] {
//     throw new Error('Function not implemented.');
// }
