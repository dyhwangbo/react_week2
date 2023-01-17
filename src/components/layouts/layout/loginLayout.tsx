import { Outlet } from 'react-router';
import ContentFooter from '../footer/contentFooter';
import Sidebar from '../sidebar/sidebar';

const LoginLayout = () => {
    //컨텐츠 헤더에 들어가는 타이틀 관련
    
    // 사이드바가 접혔을 때 필요하다면 다시 되살리자.
    // const [ sideExtend, setIsSideExtend] = useState(false);
    // const sideExtendFn = () => setIsSideExtend(value => !value);
    // const extendOption = { extendValue: sideExtend, changeFn: setIsSideExtend};
    
    return (
        <>  
            <div className='content'>
                    {/* 실질적인 페이지 내용은 다 여기서 처리 */}
                    <Outlet />
            </div>
        </>
    )
}

export default LoginLayout;