import { Navigate } from "react-router"
import React from "react"
import { connect } from "react-redux"
import { AppStateRedicerType } from "../redux/redux_store"


let mapStateToPropsForRedirect = (state: AppStateRedicerType) => ({
    isAuth: state.auth.isAuth
})

type MapPropsType = {
    isAuth: boolean
}

type DispatchProppsType = {
}

export const withAuthRedirect = (WrappedComponent:any) => {

    const RedirectComponent:React.FC<MapPropsType & DispatchProppsType> = (props) => {

        let { isAuth, ...tailProps } = props;

        if (!isAuth) return <Navigate to={'/login'} />

        return <WrappedComponent {...tailProps} />

    }

    let ConnectedRedirectComponent = connect<MapPropsType, DispatchProppsType, any, AppStateRedicerType>(mapStateToPropsForRedirect)(RedirectComponent);

    return ConnectedRedirectComponent;
}