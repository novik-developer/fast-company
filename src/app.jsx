import React, { useEffect } from "react";
import {
    Redirect,
    Route,
    Switch
} from "react-router-dom/cjs/react-router-dom.min";
import { ToastContainer } from "react-toastify";

import EditUserPage from "./component/page/userEditPage/userEditPage";
import Login from "./layout/login";
import MainPage from "./layout/mainPage";
import Users from "./layout/users";
import NavBar from "./component/ui/navBar";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./component/common/protectedRoute";
import LogOut from "./layout/logOut";
import { useDispatch } from "react-redux";
import { loadQualitiesList } from "./store/qualities";
import { loadProfessionsList } from "./store/profession";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadQualitiesList());
        dispatch(loadProfessionsList());
    });
    return (
        <>
            <AuthProvider>
                <NavBar />
                <Switch>
                    <ProtectedRoute
                        path="/users/:userId?/edit"
                        component={EditUserPage}
                    />
                    <ProtectedRoute path="/users/:userId?" component={Users} />
                    <Route path="/login/:type?" component={Login} />
                    <Route path="/logout" component={LogOut} />
                    <Route path="/" exact component={MainPage} />
                    <Redirect to="/" />
                </Switch>
                <ToastContainer />
            </AuthProvider>
        </>
    );
}

export default App;
