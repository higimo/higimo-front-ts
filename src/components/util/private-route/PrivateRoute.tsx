import { AUTH_STATUS_DIC, useAuth } from "../../../hook/use-auth";
import { Route, RouteProps } from "preact-iso";

export const PrivateRoute = (props: RouteProps<{}>) => {
    const { isAuth, statusLoading, redirectToLogin } = useAuth();

    if (!isAuth && AUTH_STATUS_DIC.AUTHENTICATED === statusLoading) {
        redirectToLogin()
    }
    return <Route {...props} />
}