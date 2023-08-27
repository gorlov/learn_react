import React from 'react';
import { useState } from 'react';
import style from './Paginator.module.css';

type PropsType = {
    onPageChenged: (pageNumber: number) => void
    currentPageNumber: number
    totalUsersCount: number
    pageSize: number
    portionSize?: number
    // pagesCount: number
}

const Paginator: React.FC<PropsType> = ({ onPageChenged, currentPageNumber, totalUsersCount, pageSize, portionSize = 5 }) => {

// const Paginator: React.FC<PropsType> = ({ onPageChenged, currentPageNumber, pagesCount,  portionSize = 5 }) => {


    let pagesCount = Math.ceil(totalUsersCount / pageSize);

    let pages: Array<number> = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    const [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = (portionNumber + 1) * portionSize;


    console.log(`portionNumber = ${portionNumber}`);

    return (
        <div className={style.pagination}>

            {portionNumber > 1 &&
                <i className={style.leftChevron} title="Назад" onClick={() => { setPortionNumber(portionNumber - 1) }} />}

            {pages.filter(
                p => p >= leftPortionPageNumber && p <= rightPortionPageNumber).map((p) => {
                    return <span className={currentPageNumber === p ? style.selectedPage : style.pageButton} key={p}
                        onClick={(e) => { onPageChenged(p) }}>{p}</span>
                })
            }

            {portionCount > portionNumber &&

                <i className={style.rightChevron} title="Вперед" onClick={() => { setPortionNumber(portionNumber + 1) }} />}

{ pagesCount === 1 ? null :
                <span 
                    className={currentPageNumber === pagesCount ? style.selectedPage : style.pageButton}
                    onClick={(e) => { onPageChenged(pagesCount) }}
                >{pagesCount}</span>
}
        </div>

    )
}
export default React.memo(Paginator);