import React from "react";
import {
    Redirect,
    Route,
    Switch
} from "react-router-dom/cjs/react-router-dom.min";

import Login from "./component/layout/login";
import MainPage from "./component/layout/mainPage";
import Users from "./component/layout/users";

function App() {
    return (
        <>
            <Switch>
                <Route path="/users/:userId?" component={Users} />
                <Route path="/login" component={Login} />
                <Route path="/" exact component={MainPage} />
                <Redirect to="/" />
            </Switch>
        </>
    );
}

export default App;
