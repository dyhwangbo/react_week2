// axiosConfig.js
import Axios from 'axios';

//refreshToken을 주기 받기 위한 설정
Axios.defaults.withCredentials = true;

const apiCall = Axios.create({
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});
apiCall.interceptors.request.use(
  config => {
    //데이터 전송 시 토큰 필요하면 여기서 추가하던가 하자.
    return config;
  },
  err => {
    console.log("요청 시 에러 발생했습니다.");
    return Promise.reject(err);
  },
);
apiCall.interceptors.response.use(
  config => {
    return config;
  },
  err => {
    if(err.response.status === 500)
    console.log("서버에서 에러 발생했습니다.");
    return Promise.reject(err);
  },
);
export default apiCall;