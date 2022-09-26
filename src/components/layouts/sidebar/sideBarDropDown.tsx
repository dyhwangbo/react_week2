  
const SidebarDropDown = () => {
    
    return (
        <>
            <div className="adv-account">
                <div className="comp-dropdown">
                    <a className="dropdown-toggle" data-bs-toggle="dropdown" data-toggle="dropdown">
                        <div className="box-left">
                            <div className="info-top">
                                <i className="ico ico-mng-account"></i>
                                <span className="fz-15 fw-smbold fc-10 txt-dot">GS SHOP</span>
                            </div>
                            <div className="info-bottom">
                                <span className="fz-13 fw-smbold fc-5">관리 계정</span>
                                <i className="dot"></i>
                                <span className="fz-13 fw-smbold fc-3">관리자</span>
                            </div>
                        </div>
                        <div className="box-right">
                            <i className="ico ico-16 ico-arrow"></i>
                        </div>
                    </a>
                    <div className="dropdown-menu">
                        <form className="input-group xsmall expand">
                            <i className="ico ico-search"></i>
                            <input type="text" className="tf-comm" placeholder="관리 계정 검색" />
                            <button type="reset" className="btn btn-reset"></button>
                        </form>
                        <div className="dropdown-group">
                            <a className="dropdown-group-list" href="#!"><span>GS리테일 넷비전</span></a>
                            <a className="dropdown-group-list" href="#!"><span>GS리테일 후레쉬서브</span></a>
                            <a className="dropdown-group-list" href="#!"><span>GS리테일 파르나스 호텔</span></a>
                            <a className="dropdown-group-list" href="#!"><span>GS리테일 네트웍스</span></a>
                            <a className="dropdown-group-list selected" href="#!"><span>GS SHOP</span></a>
                            <a className="dropdown-group-list" href="#!"><span>GS리테일 OOOOO</span></a>
                            <a className="dropdown-group-list empty" href="#!"><i className="ico ico-empty-filter IcoGuide"></i><span>검색 결과가 없습니다.</span></a>
                        </div>
                        <a className="dropdown-group-list logout" href="#!">
                            <span><i className="ico ico-logout"></i>관리 계정 로그아웃</span>
                        </a>
                    </div>
                </div>
            </div>
        </> 
    )
}

export default SidebarDropDown;

// function usetState(items: Menu[] | undefined): [any, any] {
//     throw new Error('Function not implemented.');
// }
