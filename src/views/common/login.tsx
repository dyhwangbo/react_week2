import { UserOutlined } from "@ant-design/icons";
import { Input, message } from "antd";
import { useContext, useState } from "react";
import { AuthContext } from "../../auth/loginAuthContext";
import useCall from "../../hooks/apiCall";

const Login = () => {
    const [ id, setId] = useState("");
    const [ password, setPassword ] = useState("");

    const authContext = useContext(AuthContext);
    
    
    const onSubmitHandler = (event) => {
        // page refresh를 막아준다
        event.preventDefault();
        console.log(authContext);
        //서버에 로그인 시도를 하여 로그인되면 루트 페이지("/")로 이동하고 실패할 경우 알럿을 표시한다.
        //현재 로그인 서버용으로는 인텔리J의 lego -> helloContorller
        // useCall.post("/post/login", { id: id, password : password })
        //     .then(res => {
        //         const isLogin = res.data.isLogin;
        //         const msg = res.data.msg; 
        //         const roleGroup = res.data.roleGroup;
                
        //         console.log(isLogin);
        //         console.log(roleGroup);
        //         //API 요청하는 콜마다 헤더에 ACCESS_TOKEN 담아 보내도록 설정하는 로직
        //         useCall.defaults.headers.common['Authorization'] = `Bearer ${isLogin}`;
        //         //로컬 스토리지에 로그인 성공 여부를 넣는다.(추후 토큰 방식 또는 실제 로그인 가능 할 경우 토큰 등으로 대체 예정)
        //         authContext.loginHandler(isLogin, roleGroup);
        //         //로그인이 정상적으로 처리되었을 경우 홈으로 아니면 메시지를 표시한다.
        //         if(!isLogin) message.error(msg);
        //     })
        //     .catch(error => {
        //         console.log(error);
        //         message.error("시스템 과부하로 로그인 시도가 실패했습니다. 관리자에게 문의해주세요.");
        //     });

        //백엔드 안 올라가 있는 상태를 가정하여 이걸로 강제 로그인을 시도한다.
        //isLogin = true or false / roleGroup = ["ROLE_ADV", "ROLE_MGR"] 등..
        const isLogin = true;
        const roleGroup = ["ROLE_ADV","ROLE_MGR","ROLE_LOGIN"]
        useCall.defaults.headers.common['Authorization'] = `Bearer ${isLogin}`;
        authContext.loginHandler(isLogin, roleGroup);
    }

    return (
        <>
        <div className='content-header'>
            <h2 className="fz-24 fw-smbold fc-10">로그인 페이지</h2>
        </div>
        <div className='content-body'>
        <section className="wrap-section wrap-tbl">
            <div className="box-header">
                <div className="box-left">
                    <h2 className="fz-20 fw-med fc-10">로그인 정보 입력</h2>
                </div>
                <div className="box-right">
                    <button type="submit" className="btn outline blue small" onClick={onSubmitHandler} >로그인 시도</button>
                </div>
            </div>
            <div className="box-body">
                <form id="loginForm">
                <div className="tbl">
                    <dl className="col-two">
                        <dt>
                            <div className="dt-inner">
                                <span className="fz-16 fw-med fc-7">아이디 입력<a className="ico-tooltip" data-tip="true"></a></span>
                            </div>
                        </dt>
                        <dd>
                            <div className="form-group">
                                <span className="comp-txt">
                                    <span className="table">
                                        <Input size="large" placeholder="large size" prefix={<UserOutlined />} value={id} onChange={(e) => setId(e.target.value)}/>
                                    </span>
                                </span>
                            </div>
                        </dd>
                        <dt>
                            <div className="dt-inner">
                                <span className="fz-16 fw-med fc-7">비밀번호 입력<a className="ico-tooltip" data-tip="true"></a></span>
                            </div>
                        </dt>
                        <dd>
                            <div className="form-group">
                                <span className="comp-txt">
                                    <span className="table">
                                        <Input.Password size="large" placeholder="input password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                    </span>
                                </span>
                            </div>
                        </dd>
                    </dl>
                </div>
                </form>
            </div>
        </section>
    </div>
    </>
    )
}

export default Login;