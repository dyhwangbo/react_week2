import React, { useState } from 'react';
import { Outlet } from 'react-router';
import ContentFooter from '../footer/contentFooter';
import ContentHeader from '../header/contentHeader';
import Sidebar from '../sidebar/sidebar';
import { connect } from 'react-redux';

const LoginLayout = () => {
    //컨텐츠 헤더에 들어가는 타이틀 관련
    
    // 사이드바가 접혔을 때 필요하다면 다시 되살리자.
    // const [ sideExtend, setIsSideExtend] = useState(false);
    // const sideExtendFn = () => setIsSideExtend(value => !value);
    // const extendOption = { extendValue: sideExtend, changeFn: setIsSideExtend};
    
    return (
        <>  
            {/* 사이드바 영역. 클릭 했을 경우 contentHeaderTitle의 값이 바뀌어야 ContentHeader의 타이틀이 바뀜. */}
            <Sidebar />
            <div className='content'>
                    {/* 실질적인 페이지 내용은 다 여기서 처리 */}
                    <Outlet />
                
                <div className='content-footer'>
                    <ContentFooter />
                </div>
            </div>
        </>
    )
}

export default LoginLayout;