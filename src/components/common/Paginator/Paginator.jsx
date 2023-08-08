import style from './Paginator.module.css';

let Paginator = ({onPageChenged, currentPageNumber, totalUsersCount, pageSize}) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize);

    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    return (
            <div>
                {pages.map(p => {
                    
                    return <span className={currentPageNumber === p ? style.selectedPage : style.pageButton}
                        onClick={(e) => { onPageChenged(p) }}>{p}</span>
                })}
            </div>
            
    )
}

export default Paginator;