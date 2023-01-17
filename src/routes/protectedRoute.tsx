import { useContext } from 'react';
import { Navigate } from 'react-router';
import { AuthContext } from '../auth/loginAuthContext';

/** 로그인 메뉴 진입 시 현재 로그인이 되어 있는 경우 강제로 home 화면으로 진행 */
export const LoginRoute = ({ isLogin, children }) => {
    return isLogin ? <Navigate replace to="/home" />: children;
};

/** 메뉴 접근 시 sessionStorage 값을 사용하여 로그인 및 권한 체크를 체크 */
export const PublicRoute = ({ entrys, children }) => {
    const authContext = useContext(AuthContext);
    const { isLoggedIn, roleGroups } = authContext;

    console.log(`PublicRoute :> isLogin(context) : ${isLoggedIn} / entrys : ${entrys} / roleGroups(context) : ${roleGroups}`)

    if(!isLoggedIn) return <Navigate replace to="/common/login" />
    else {
        // 로컬스토리지에 접근할 수 있는 롤 그룹이 하나라도 있다면 해당 메뉴로 이동 / 그 외에는 모두 권한 없음
        const entrysArray = entrys.split(",");
        const checkArray = entrysArray.filter(x => roleGroups.includes(x)); 
        return checkArray.length > 0 ? children : <Navigate replace to="/error/authError" />;
    }
};