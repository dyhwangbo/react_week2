import { Outlet } from 'react-router';
import ContentFooter from '../footer/contentFooter';
import Sidebar from '../sidebar/sidebar';
 
const Layout = () => {
    //컨텐츠 헤더에 들어가는 타이틀 관련
    //const [ contentHeaderTitle, setContentHeaderTitle ] = useState("GS_RETAIL");
    //const contentTitleOption = {headerTitle: contentHeaderTitle, titleChange: setContentHeaderTitle};

    // 사이드바가 접혔을 때 필요하다면 다시 되살리자.
    // const [ sideExtend, setIsSideExtend] = useState(false);
    // const sideExtendFn = () => setIsSideExtend(value => !value);
    // const extendOption = { extendValue: sideExtend, changeFn: setIsSideExtend};
    
    return (
        <>  
            {/* 사이드바 영역. */}
            <Sidebar />
            <div className='content'>
                    {/* <ContentHeader title={contentHeaderTitle} /> */}
                {/* 실질적인 페이지 내용은 다 여기서 처리 */}
                <Outlet />
                <div className='content-footer'>
                    <ContentFooter />
                </div>
            </div>
        </>
    )
}

export default Layout;