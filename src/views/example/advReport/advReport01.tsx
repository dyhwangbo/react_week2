
import ContentHeader from "../../../components/layouts/header/contentHeader";
import PageSearchFilter from "../../../components/searchFilter/pageSearchFilter";

//테스트 데이터 임포트
import { ColDef } from 'ag-grid-community';
import GridSection from '../../../components/agGrid/gridSection';

export interface AdvReport01Props {
    searchOptions: {
        title: string;
        component: JSX.Element[];
    }[],
    columnDefs: ColDef[],
    reportData: any[],
    searchEvent: () => void,
}

/** 조회 필터(단독) + 데이터 그리드 1개 */
export const AdvReport01View = ({searchOptions, columnDefs, reportData, searchEvent}: AdvReport01Props) => {
    return ( 
        <>
            <ContentHeader title="단독 조회 필터 + 데이터 그리드 리포트 조회 페이지 템플릿" />
            <div className="content-body">
                <div className="container-fluid">
                    {/* 필터 섹션 */}
                    <div className="row">
                        <div className="col col-12">
                            <section className="wrap-section wrap-filter">
                                <PageSearchFilter searchFilterOptions={searchOptions} searchEvent={searchEvent} />
                            </section>
                        </div>
                    </div>
                    
                    {/* 그리드 섹션 */}
                    <div className="row">
                        <div className="col col-12">
                            <section className="wrap-section wrap-datagrid">
                                <GridSection 
                                    title={"그리드으~헤더어~"}
                                    csvBtn={true}
                                    csvFileName={"심플 리포트"}
                                    columnDefs={columnDefs}
                                    gridData={reportData}
                                />
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </> 
    )
};