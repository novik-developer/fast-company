import React from "react";
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

function App() {
    return (
        <>
            <ProfessionProvider>
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
            </ProfessionProvider>
            <ToastContainer />
        </>
    );
}

export default App;
