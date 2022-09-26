import { Fragment, useEffect, useImperativeHandle, forwardRef, useState, useRef } from 'react';

import { Select } from 'antd';
const { Option } = Select;


//페이지 사이즈는 고정(10/30/50/100);
const GridPagination = (props: any, ref: any) => {
  
  const [isFirst, chkFirst] = useState(true);
  const [isLast, chkLast] = useState(true);
  const [isSelectDisabled, chkSelectDisabled] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const { gridRef } = props;
  const pagesizeSelect = useRef<any>(null);

  // const pageSizes = [10, 20, 30, 40, 50];
  
  const [ currentPageSize, setCurrentPageSize] = useState(10);

  const pageInterval = 10;

  const [pageNumObj, pageMoves] = useState({ firstPageNum: 1, lastPageNum: 0, curPageNum: 1, });

  // 기존 소스라서 주석 처리
  // const pageSizeOptTag: any[] = [];
  // pageSizes.forEach((value, index) => {
  //   pageSizeOptTag.push(<option key={index} value={value}>{value} Row</option>);
  // });

  //그리드 페이지 당 얼만큼 보여줄지 이벤트
  const pagiantionSelectChange = (e) => {
    console.log("pagiantionSelectChange")
    console.log(e);
    setCurrentPageSize(e);
    
  }
  //처음으로 이동 이벤트
  const onBtFirst = () => {
    pageMoves((prevState) => ({ ...prevState, curPageNum: 1 }));
      gridRef.current!.api.paginationGoToFirstPage();
  };
  //마지막으로 이동 이벤트
  const onBtLast = () => {
    pageMoves((prevState) => ({ ...prevState, curPageNum: gridRef.current!.api.paginationGetTotalPages() }));
      gridRef.current!.api.paginationGoToLastPage();
  };
  //다음 페이지 이동 이벤트
  const onBtNext = () => {
    pageMoves((prevState) => ({ ...prevState, curPageNum: prevState.curPageNum + 1 }));
      gridRef.current!.api.paginationGoToNextPage();
  };
  //이전 페이지 이동 이벤트
  const onBtPrevious = () => {
    pageMoves((prevState) => ({ ...prevState, curPageNum: prevState.curPageNum - 1 }));
      gridRef.current!.api.paginationGoToPreviousPage();
  };

  const pageNumberMove = (e : any) => {
    gridRef.current!.api.paginationGoToPage(Number(e.target.dataset.value) - 1);
    pageMoves((prevState) => ({ ...prevState, curPageNum: Number(e.target.dataset.value) }));
  };

  const PageNumberNav = () => {
    const pageNumbers: JSX.Element[] = [];
    if (pageNumObj.lastPageNum === 0) return <Fragment></Fragment>;
    for (let i = pageNumObj.firstPageNum; i <= pageNumObj.lastPageNum; i += 1) {
      pageNumbers.push(<a key={i} href="#!" className={ `page-num${pageNumObj.curPageNum === i ? ' selected' : ''}` } data-value={i} onClick={pageNumberMove}>{i}</a>);
    }
    return <Fragment>{ pageNumbers }</Fragment>;
  };

  const onPageSizeChanged = () => {
    console.log(pagesizeSelect);
    if (!gridRef.current!.api) return;
    console.log("페이지 변경");
    //gridRef.current!.api!.paginationSetPageSize((pagesizeSelect.current!).value as unknown as number);
    gridRef.current!.api!.paginationSetPageSize(currentPageSize as number);
  };
  const onPaginationChanged = () => {
    if (!gridRef.current!.api) return;
      // 페이징 체크박스 부분에서 페이징 및 체크박스 관련 이벤트 발생시 체크박스 모두 해제 후
      // 페이지에 맞는 로우만 전체 체크박스 선택
      gridRef.current!.api.deselectAll();

      // Initialize pagination data
      const paginationSize = gridRef.current!.api.paginationGetPageSize();
      const currentPageNum = gridRef.current!.api.paginationGetCurrentPage();
      const totalPages = gridRef.current!.api.paginationGetTotalPages();
      const totalRowsCount = gridRef.current!.api.getDisplayedRowCount();

      // Calculate current page row indexes
      const currentPageRowStartIndex = (currentPageNum * paginationSize);
      let currentPageRowLastIndex = (currentPageRowStartIndex + paginationSize);
      if (currentPageRowLastIndex > totalRowsCount) currentPageRowLastIndex = (totalRowsCount);

      for (let i = 0; i < totalRowsCount; i += 1) {
        const isWithinCurrentPage = (i >= currentPageRowStartIndex && i < currentPageRowLastIndex);
          gridRef.current!.api.getDisplayedRowAtIndex(i).setRowSelectable(isWithinCurrentPage);
      }

      if (totalPages > 0) {
        pageMoves((prevPage) => {
          const currPage = { ...prevPage };

          currPage.lastPageNum = totalPages > currPage.firstPageNum + pageInterval - 1 ? currPage.firstPageNum + pageInterval - 1 : totalPages;
          currPage.firstPageNum = currPage.lastPageNum >= pageInterval && currPage.lastPageNum - pageInterval + 1 < currPage.firstPageNum ? currPage.lastPageNum - pageInterval + 1 : currPage.firstPageNum;
          currPage.curPageNum = currentPageNum + 1;

          if (currPage.curPageNum > currPage.lastPageNum) {
            currPage.lastPageNum = currPage.curPageNum;
            currPage.firstPageNum = currPage.curPageNum - pageInterval + 1 > 0 ? currPage.curPageNum - pageInterval + 1 : 1;
          } else if (currPage.curPageNum < currPage.firstPageNum) {
            currPage.firstPageNum = currPage.curPageNum;
            currPage.lastPageNum = currPage.curPageNum + pageInterval - 1;
          }

          return currPage;
        });
      } else {
        pageMoves({
          firstPageNum: 1,
          lastPageNum: 0,
          curPageNum: 1,
        });
      }
      setTotalRows(totalRowsCount);
      chkSelectDisabled(totalPages === 0);
      chkFirst(currentPageNum === 0);
      chkLast(totalPages === 0 || totalPages === currentPageNum + 1);
  };

  // 부모컴포넌트에서 자식 컴포넌트의 함수를 실행하기 위한 forwardRef와 useImperativeHandle을 사용
  useImperativeHandle(ref, () => ({
    onPaginationChanged,
  }));
  useEffect(() => {
    console.log("pagination useEffect");
    onPageSizeChanged();
    onPaginationChanged();
    // $(pagesizeSelect.current as PlainObject).select2({
    //   width: '120px',
    //   minimumResultsForSearch: Infinity,
    //   dropdownCssClass: 'small',
    // }).on('select2:select', () => {
    //   onPageSizeChanged();
    // });
    // onPaginationChanged();
  }, [ currentPageSize]);
  return (
        <>
            <div className="box-left">
                <span className="fz-16 fw-med fc-5">총{totalRows.toLocaleString(undefined, { })}건</span>
            </div>
            <div className="box-right">
              <div className="pagenation">
                  {/* 페이지네이션 한 번에 보여줄 수 있는 로우 셀렉트 박스(기존 - SELECT2 사용) */}
                  {/* <select className="select2-single small" disabled={isSelectDisabled} ref={pagesizeSelect}>
                      {pageSizeOptTag}
                  </select> */}
                  <Select className="small w-150" defaultValue={10}  onChange={pagiantionSelectChange}>
                    <Option value={10} label={"10 Row"}>10 Row</Option>
                    <Option value={30} label={"30 Row"}>30 Row</Option>
                    <Option value={50} label={"50 Row"}>50 Row</Option>
                    <Option value={100} label={"100 Row"}>100 Row</Option>
                  </Select>
                  <div className="page-nav">
                      <button type="button" className="btn-nav first" onClick={onBtFirst} disabled={isFirst}><i className="ico"></i></button>
                      <button type="button" className="btn-nav prev" onClick={onBtPrevious} disabled={isFirst}><i className="ico"></i></button>
                      <PageNumberNav/>
                      <button type="button" className="btn-nav next" onClick={onBtNext} disabled={isLast}><i className="ico"></i></button>
                      <button type="button" className="btn-nav last" onClick={onBtLast} disabled={isLast}><i className="ico"></i></button>
                  </div>
              </div>
            </div>
        </>
  );
};
export default forwardRef(GridPagination);
