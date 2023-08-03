import style from './IgnLogs.module.css'

const IgnLogs = (props) => {

    return (
        <div className={style.lroot}>
            <form className={style.logForm}>
                <div>
                    <p>Начальная строка</p>
                    <input placeholder="28"></input>
                </div>
                <div>
                    <p>Конечная строка</p>
                    <input placeholder="32"></input>
                </div>
                <div className={style.forButton}>
                    <button>Показать</button>
                </div>
            </form>
        </div>
    )
}


export default IgnLogs;