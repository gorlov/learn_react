import React, { ChangeEvent, useState } from "react";
import { useEffect } from "react";
import style from './ProfileInfo.module.css'

type PropsType = {
    status:string
    updateUserStatus: (status:string) => void
}

const ProfileStatus = (props:PropsType) => {

    useEffect( () => {
        setStatus(props.status)
    }, [props.status]);

    let [editMode, setEditMode] = useState(false);

    let [status, setStatus] = useState(props.status);

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateUserStatus(status);

    }

    const onStatusChange = (e:ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value);
    }

    return (
        <div>
            <h4>Статус:</h4>
            {!editMode &&
                <div>
                    <span onDoubleClick={activateEditMode} className={style.statusText}>{props.status || "+++++++"}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status} />
                </div>
            }
        </div>
    )
}



export default ProfileStatus;