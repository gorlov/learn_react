import React from 'react';
import { useState } from 'react';
import style from './Paginator.module.css';

const Paginator = ({ onPageChenged, currentPageNumber, totalUsersCount, pageSize, portionSize=5 }) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize);

    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }


    let portionCount = Math.ceil(pagesCount / portionSize);
    const [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = (portionNumber + 1) * portionSize;


    console.log(portionNumber);

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




        </div>

    )
}
export default React.memo(Paginator);