import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Layout from '../components/layouts/layout/layout';
import LoginLayout from '../components/layouts/layout/loginLayout';
import Home from '../views/common/home';
import Login from '../views/common/login';

import AuthError from '../views/error/authError';
import PageNotFound from '../views/error/pageNotFound';
import { PublicRoute, LoginRoute } from './protectedRoute';
import { useContext } from 'react';
import { AuthContext } from '../auth/loginAuthContext';
import ComponentPage from '../views/example/componentPage';
import AdvReport01 from '../views/example/advReport/advReport01';
import AdvReport02 from '../views/example/advReport/advReport02';
import AdvReport03 from '../views/example/advReport/advReport03';
import MgrReport01 from '../views/example/mgrReport/mgrReport01';
import MgrReport02 from '../views/example/mgrReport/mgrReport02';
import MgrReport03 from '../views/example/mgrReport/mgrReport03';
import PluginAll from '../views/example/publish/pluginAll';
import AdReg from '../views/example/adReg/adReg';

/** 라우터의 경우 일치하는 가장 첫번째로 이동. */
const MenuRouters = () => {
    const authContext = useContext(AuthContext);
    console.log("MenuRouter...")
    console.log(authContext.isLoggedIn);
    return (
    <BrowserRouter>
    <Routes>
        {
            authContext.isLoggedIn ? (
                <Route element={<Layout />}>
                    {/* 루트 주소로 접속했을 경우 home으로 보내준다. 홈은 별도 권한이 없음. */}
                    <Route path="/common/login" element={<Navigate replace to="/home"/>}></Route>
                    <Route path="/" element={<Navigate replace to="/home"/>}></Route>
                    <Route path="/home" element={<PublicRoute isLogin={authContext.isLoggedIn} children={<Home /> } />} />
                    <Route path="/view/advReport/advReport01" element={<AdvReport01 />} />
                    <Route path="/view/advReport/advReport02" element={<AdvReport02 />} />
                    <Route path="/view/advReport/advReport03" element={<AdvReport03 />} />

                    <Route path="/view/adReg/adReg" element={<AdReg />} />

                    
                    {authContext.isLoggedIn && (<Route path="/example/componentPage" element={<ComponentPage /> }/> )}
                    {authContext.isLoggedIn && (<Route path="/example/publish" element={<PluginAll /> }/> )}
            
                    {/* <Route path="/adGridReport" element={<PublicRoute isLogin={authContext.isLoggedIn} children={<AdGridReport /> } />}  />
                    <Route path="/adChartGridReport" element={<PublicRoute isLogin={authContext.isLoggedIn} children={<AdChartGridReport /> } />}  />
                    <Route path="/adChartGridReport02" element={<PublicRoute isLogin={authContext.isLoggedIn} children={<AdChartGridReport02 /> } />}  /> */}
                    {/* 로그인 시 해당 메뉴로 접근하면 페이지 없음으로 뜸 */}
                    {/* {!authContext.isLoggedIn &&(<Route path="/adGroupReport2" element={<AdGroupReport2 /> }/> )} */}
                    {/* 비 로그인 시 해당 메뉴로 접근하면 페이지 없음으로 뜸 */}
                    {/* {authContext.isLoggedIn && (<Route path="/example/agGridExample" element={<AgGridExample /> }/> )} */}
                    {/* {authContext.isLoggedIn && (<Route path="/example/emptyAgGridExample" element={<EmptyAgGridExample /> }/> )}
                    {authContext.isLoggedIn && (<Route path="/example/emptyPage" element={<EmptyPage /> }/> )} */}
                    {/* <Route path="/adminAdGroupReport" element={<ProtectedRoute isLogin={isLogin} isAuth={isAuth(roleGroup, [role.DEV, role.MGR])}children={<AdminAdGroupReport /> } />} />  */}
                    
                    
                    {/* ANTD 예제 */}
                    {/* 
                    <Route path="/view/example/antd/dropDown" element={<ProtectedRoute isLogin={isLogin()} isAuth={isAuth([role.DEV, role.MGR])}children={<AntdDropDown /> } />} />
                    <Route path="/view/example/antd/fileUpload" element={<ProtectedRoute isLogin={isLogin()} isAuth={isAuth([role.DEV, role.MGR])}children={<AntdFileUpload /> } />} />
                    <Route path="/view/example/antd/modal" element={<ProtectedRoute isLogin={isLogin()} isAuth={isAuth([role.DEV, role.MGR])}children={<AntdModal /> } />} />
                    <Route path="/view/example/antd/selectBox" element={<ProtectedRoute isLogin={isLogin()} isAuth={isAuth([role.DEV, role.MGR])}children={<AntdSelectBox /> } />} />
                    <Route path="/view/example/antd/tooltip" element={<ProtectedRoute isLogin={isLogin()} isAuth={isAuth([role.DEV, role.MGR])}children={<AntdTooltip /> } />} />
                    <Route path="/view/example/antd/pluginsAll" element={<ProtectedRoute isLogin={isLogin()} isAuth={isAuth([role.DEV, role.MGR])}children={<PluginAll /> } />} /> 
                    */}
                    
                    {/* 에러 페이지 등은 모두 여기에 기록. */}
                    <Route path="/error/authError" element={<AuthError />} ></Route>
                    <Route path="*" element={<PageNotFound />}></Route>
                </Route>
            ) : (
                <Route element={<LoginLayout />}>
                    <Route path="*" element={<Navigate replace to="/common/login"/>}></Route>
                    <Route path="/common/login" element={<LoginRoute isLogin={authContext.isLoggedIn} children={<Login /> } />} />
                </Route>
                
            )
        }
        
        
        
    </Routes>
    </BrowserRouter>
    )
};
export default MenuRouters;