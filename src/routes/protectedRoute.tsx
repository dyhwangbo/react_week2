import { Navigate } from 'react-router';

/** 메뉴 접근 시 sessionStorage 값을 사용하여 로그인 및 권한 체크를 체크한다. 
 *  
 */
export const PublicRoute = ({ isLogin, children }) => {
  console.log("ProtectedRoute isLogin Value is ", isLogin);
    if(!isLogin) return <Navigate replace to="/common/login" />;
    //if(!isAuth) return <Navigate replace to={"/error/authError"} /> 
    return children;
  };

/** 로그인 메뉴 진입 시 현재 로그인이 되어 있는 경우 강제로 home 화면으로 진행 */
export const LoginRoute = ({ isLogin, children }) => {
    return isLogin ? <Navigate replace to="/home" /> : children;
};