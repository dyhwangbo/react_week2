import { Outlet } from 'react-router';
import ContentFooter from '../footer/contentFooter';
import Sidebar from '../sidebar/sidebar';
 
const EmptyLayout = () => {
   
    return (
        <>  
             <Outlet />
             
        </>
    )
}

export default EmptyLayout;