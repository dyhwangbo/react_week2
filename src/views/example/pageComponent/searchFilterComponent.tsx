
interface filterTypes {
    title : string,
    subTitle : string,
}
//위의 인터페이스를 보고 어떤 타입인지 소스를 별도로 보지 않아도 된다.
const SearchFilterComponent = (props: filterTypes) => {
    const { title, subTitle } = props;
    return ( 
        <>
            <span>{title}</span>
            <span>{subTitle}</span>
        </>
    )
}
export default SearchFilterComponent;