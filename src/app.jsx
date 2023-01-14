import React from "react";
import {
    Redirect,
    Route,
    Switch
} from "react-router-dom/cjs/react-router-dom.min";

import UserEditPage from "./component/page/userEditPage/userEditPage";
import Login from "./layout/login";
import MainPage from "./layout/mainPage";
import Users from "./layout/users";

function App() {
    return (
        <>
            <Switch>
                <Route path="/users/:userId?/edit" component={UserEditPage} />
                <Route path="/users/:userId?" component={Users} />
                <Route path="/login/:type?" component={Login} />
                <Route path="/" exact component={MainPage} />
                <Redirect to="/" />
            </Switch>
        </>
    );
}

export default App;
