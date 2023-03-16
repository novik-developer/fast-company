import React, { useEffect } from "react";
import {
    Redirect,
    Route,
    Switch
} from "react-router-dom/cjs/react-router-dom.min";
import { ToastContainer } from "react-toastify";

import EditUserPage from "./component/page/userEditPage/userEditPage";
import { ProfessionProvider } from "./hooks/useProfession";
import Login from "./layout/login";
import MainPage from "./layout/mainPage";
import Users from "./layout/users";
import NavBar from "./component/ui/navBar";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./component/common/protectedRoute";
import LogOut from "./layout/logOut";
import { useDispatch } from "react-redux";
import { loadQualitiesList } from "./store/qualities";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadQualitiesList());
    });
    return (
        <>
            <AuthProvider>
                <NavBar />
                <ProfessionProvider>
                    <Switch>
                        <ProtectedRoute
                            path="/users/:userId?/edit"
                            component={EditUserPage}
                        />
                        <ProtectedRoute
                            path="/users/:userId?"
                            component={Users}
                        />
                        <Route path="/login/:type?" component={Login} />
                        <Route path="/logout" component={LogOut} />
                        <Route path="/" exact component={MainPage} />
                        <Redirect to="/" />
                    </Switch>
                </ProfessionProvider>
                <ToastContainer />
            </AuthProvider>
        </>
    );
}

export default App;
