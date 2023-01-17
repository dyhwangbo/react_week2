import { useContext } from "react";
import { AuthContext } from "../../auth/loginAuthContext";

const Home = () => {
    const loginContext = useContext(AuthContext);
    
    return (
        <>
        <div className="content-header">
            <h2 className="fz-24 fw-smbold fc-10">사라질 홈이다.</h2>
        </div>
        <div className="content-body">
            <h2 className="fz-36 fc-1 fw-bold">바디 준비</h2>
            <button type="button" className="btn solid blue xlarge" onClick={() => { loginContext.logout(); }}>로그아웃</button>
        </div>
        </>
    )
}

export default Home;