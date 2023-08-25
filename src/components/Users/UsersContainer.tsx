import React from "react";
import Preloader from "../common/preloader/Preloader";
import { getIsFetching } from "../../redux/users-selectors";
import { useSelector } from "react-redux";
import { Users } from "./Users";


type UserPagePropsType = {
    pageTytle: string
}

export const UsersPage: React.FC<UserPagePropsType> = (props) => {

    const isFetching = useSelector(getIsFetching);

    return (
        <>
        <h3>{props.pageTytle}</h3>
            {isFetching === true ? <Preloader /> : null}
            
            <Users />
        </>)
}

