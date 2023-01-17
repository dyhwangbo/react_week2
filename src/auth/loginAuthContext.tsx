import { createContext, useState } from "react";


export const AuthContext = createContext(null);

export const AuthContextProvider = props => {
  const { children } = props;
  //로그인 후 로컬 스토리지에 해당 데이터가 있으면 true / 없으면 false 또느 null로 들어감. 추후에 토큰 값으로 변경
  const [token, setToken] = useState(localStorage.getItem('token'));

  //각 메뉴 라우팅 시에 login 여부 체크는 이걸로 진행
  const userIsLoggedIn = !!token;
  
  //사이드 바 메뉴 그릴 때 roleGroup은 이걸로 확인
  const [roleGroups, setRoleGroups] = useState(localStorage.getItem("roleGroups"));
  
  //로그인 성공 시 이 핸들러 호출. 로그인 처리 및 권한 처리도 같이 진행한다.
  const loginHandler = (token,roleGroups) => {
    setToken(token);
    localStorage.setItem('token', token);
    roleGroupAddHandler(roleGroups);
  };
  //로그아웃 진행 시 해당 핸들러 불러오면 된다. 로컬 스토리지에 존재하던 값 제거.
  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('token');
    roleGroupRemoveHandler();
  };

  const roleGroupAddHandler = roleGroups => {
    setRoleGroups(roleGroups);
    localStorage.setItem('roleGroups', roleGroups);
  }

  const roleGroupRemoveHandler = () => {
    setRoleGroups(null);
    localStorage.removeItem('roleGroups');
  }

  const loginContext = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    roleGroups: roleGroups,
    roleGroupAddHandler: roleGroupAddHandler,
    roleGroupRemoveHandler: roleGroupRemoveHandler
  };

  return (
    <AuthContext.Provider value={loginContext}>{children}</AuthContext.Provider>
  );
};