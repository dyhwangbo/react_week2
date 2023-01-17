import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from '../components/layouts/layout/layout';
import LoginLayout from '../components/layouts/layout/loginLayout';
import Login from '../views/common/login';

import { useContext } from 'react';
import { AuthContext } from '../auth/loginAuthContext';
import Home from '../views/common/home';
import AuthError from '../views/error/authError';
import PageNotFound from '../views/error/pageNotFound';
import AdReg from '../views/example/adReg/adReg';
import AdvReport01 from '../views/example/advReport/advReport01VA';
import AdvReport02 from '../views/example/advReport/advReport02';
import AdvReport03 from '../views/example/advReport/advReport03';
import BulkMng from '../views/example/bulkMng/bulkMng';
import HighChartComponent from '../views/example/pageComponent/highchartComponent';
import PluginAll from '../views/example/publish/pluginAll';
import { LoginRoute, PublicRoute } from './protectedRoute';

/** 라우터의 경우 PATH가 일치할 경우 가장 먼저 일치하는 컴포넌트로 이동. */
const MenuRouters = () => {
    const authContext = useContext(AuthContext);
    const { isLoggedIn, roleGroups} = authContext;
    console.log(`MenuRouter Params Check.. isLoggedIn : ${isLoggedIn} / roleGroups : ${roleGroups}`);
    
    return (
        /* HTML5의 history API를 활용하여 UI를 업데이트 */
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginRoute isLogin={isLoggedIn}><Login /></LoginRoute>}/>
            <Route element={<Layout />}>
                <Route path="/home" element={<PublicRoute entrys="ROLE_ADV,ROLE_MGR,ROLE_DEV"><Home /></PublicRoute>} />
                <Route path="/view/advReport/advReport01" 
                    element={<PublicRoute entrys="ROLE_MGR,ROLE_ADV"><AdvReport01 /></PublicRoute>} />
                <Route path="/view/advReport/advReport02" 
                    element={<PublicRoute entrys="ROLE_MGR,ROLE_ADV"><AdvReport02 /></PublicRoute>} />
                <Route path="/view/advReport/advReport03" 
                    element={<PublicRoute entrys="ROLE_ADV"><AdvReport03 /></PublicRoute>} />
                <Route path="/view/adReg/adReg" 
                    element={<PublicRoute entrys="ROLE_ADV"><AdReg /></PublicRoute>} />
                
                <Route path="/example/publish"
                    element={<PublicRoute entrys="ROLE_ADV"><PluginAll /></PublicRoute>} />
                
                <Route path="/view/bulkMng"
                    element={<PublicRoute entrys="ROLE_MGR,ROLE_ADV"><BulkMng /></PublicRoute>} />

                <Route path="/view/chartTest"
                    element={<PublicRoute entrys="ROLE_MGR,ROLE_ADV"><HighChartComponent /></PublicRoute>} />

                    
                <Route path="/error/authError" element={<AuthError />} ></Route>
                <Route path="/error/pageNotFound" element={<PageNotFound />} ></Route>
                <Route path="*" element={<PageNotFound />}></Route>
            </Route>

            {/* 레이아웃 별도 구성이 될 거 같아서 일단 자리만 잡아둠. */}
            <Route element={<LoginLayout />}>
                <Route path="/common/login" element={<LoginRoute isLogin={isLoggedIn}><Login /></LoginRoute>}/>
            </Route>
            {/* {
                // 로그인이 안되어 있을 경우에는 
                isLoggedIn ? (
                    <Route element={<Layout />}>
                        
                        {authContext.isLoggedIn && (<Route path="/example/componentPage" element={<ComponentPage /> }/> )}
                        {authContext.isLoggedIn && (<Route path="/example/publish" element={<PluginAll /> }/> )}
                
                        <Route path="/error/authError" element={<AuthError />} ></Route>
                        <Route path="*" element={<PageNotFound />}></Route>
                    </Route>
                ) : (
                    <Route element={<LoginLayout />}>
                        <Route path="/common/login" element={<Login /> } />
                    </Route>
                    
                )
            } */}
        </Routes>
        </BrowserRouter>
    )
};

// 나중에 필요하면 살려서 확인하자.  
//{/* <Route path="/adGridReport" element={<PublicRoute isLogin={authContext.isLoggedIn} children={<AdGridReport /> } />}  />
//                         <Route path="/adChartGridReport" element={<PublicRoute isLogin={authContext.isLoggedIn} children={<AdChartGridReport /> } />}  />
//                         <Route path="/adChartGridReport02" element={<PublicRoute isLogin={authContext.isLoggedIn} children={<AdChartGridReport02 /> } />}  /> */}
//                         {/* 로그인 시 해당 메뉴로 접근하면 페이지 없음으로 뜸 */}
//                         {/* {!authContext.isLoggedIn &&(<Route path="/adGroupReport2" element={<AdGroupReport2 /> }/> )} */}
//                         {/* 비 로그인 시 해당 메뉴로 접근하면 페이지 없음으로 뜸 */}
//                         {/* {authContext.isLoggedIn && (<Route path="/example/agGridExample" element={<AgGridExample /> }/> )} */}
//                         {/* {authContext.isLoggedIn && (<Route path="/example/emptyAgGridExample" element={<EmptyAgGridExample /> }/> )}
//                         {authContext.isLoggedIn && (<Route path="/example/emptyPage" element={<EmptyPage /> }/> )} */}
//                         {/* <Route path="/adminAdGroupReport" element={<ProtectedRoute isLogin={isLogin} isAuth={isAuth(roleGroup, [role.DEV, role.MGR])}children={<AdminAdGroupReport /> } />} />  */}
                        
                        
//                         {/* ANTD 예제 */}
//                         {/* 
//                         <Route path="/view/example/antd/dropDown" element={<ProtectedRoute isLogin={isLogin()} isAuth={isAuth([role.DEV, role.MGR])}children={<AntdDropDown /> } />} />
//                         <Route path="/view/example/antd/fileUpload" element={<ProtectedRoute isLogin={isLogin()} isAuth={isAuth([role.DEV, role.MGR])}children={<AntdFileUpload /> } />} />
//                         <Route path="/view/example/antd/modal" element={<ProtectedRoute isLogin={isLogin()} isAuth={isAuth([role.DEV, role.MGR])}children={<AntdModal /> } />} />
//                         <Route path="/view/example/antd/selectBox" element={<ProtectedRoute isLogin={isLogin()} isAuth={isAuth([role.DEV, role.MGR])}children={<AntdSelectBox /> } />} />
//                         <Route path="/view/example/antd/tooltip" element={<ProtectedRoute isLogin={isLogin()} isAuth={isAuth([role.DEV, role.MGR])}children={<AntdTooltip /> } />} />
//                         <Route path="/view/example/antd/pluginsAll" element={<ProtectedRoute isLogin={isLogin()} isAuth={isAuth([role.DEV, role.MGR])}children={<PluginAll /> } />} /> 
//                         */}

export default MenuRouters;