import React from "react";
import {
    Redirect,
    Route,
    Switch
} from "react-router-dom/cjs/react-router-dom.min";
import { ToastContainer } from "react-toastify";

import EditUserPage from "./component/page/userEditPage/userEditPage";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualitiesProvaider } from "./hooks/useQualities";
import Login from "./layout/login";
import MainPage from "./layout/mainPage";
import Users from "./layout/users";
import NavBar from "./component/ui/navBar";
import AuthProvider from "./hooks/useAuth";

function App() {
    return (
        <>
            <AuthProvider>
                <NavBar />
                <ProfessionProvider>
                    <QualitiesProvaider>
                        <Switch>
                            <Route
                                path="/users/:userId?/edit"
                                component={EditUserPage}
                            />
                            <Route path="/users/:userId?" component={Users} />
                            <Route path="/login/:type?" component={Login} />
                            <Route path="/" exact component={MainPage} />
                            <Redirect to="/" />
                        </Switch>
                    </QualitiesProvaider>
                </ProfessionProvider>
                <ToastContainer />
            </AuthProvider>
        </>
    );
}

export default App;
