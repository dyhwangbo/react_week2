import React from 'react';
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


const SidebarMenuList = React.memo((props: MenuListProps) => {
    const authContext = useContext(AuthContext);
    const { isLoggedIn } = authContext;
    //console.log(roleGroups.split(","));
    //const [ splitRoleGroup, setSplitRoleGroup ] = useState(authContext.split(","));
    //console.log(roleGroup.split(","));

    if(isLoggedIn === undefined) return (<></>);
    return (
        <>
        {props.loading && props.items?.map((menu) => (
            menu.leafs.length > 0 ? 
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
                        <li key={leafMenu.menuId} className={(props.activeMenu === leafMenu.path) ? "two-depth-title selected" : "two-depth-title"}>
                            <Link to={leafMenu.path}>
                                {leafMenu.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </li> : 
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
            ))
            }
       </>
            
    )
}
)
export default SidebarMenuList;