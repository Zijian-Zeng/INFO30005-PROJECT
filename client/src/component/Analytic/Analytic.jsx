import React, { useContext, useEffect, useState } from "react";
import { UserContext, myFetch } from "../Methods";
import Layout from "../Navigation/Layout";
import { useHistory } from "react-router-dom";
import Staff from "./Staff";

export default () => {
    const history = useHistory();
    //Set the routes.
    const {
        setSelectedRoute,
        closeAlert,
        detectAlert,
        loadingRoute,
        setLoadingRoute,
        fetchUser,
        user,
    } = useContext(UserContext);

    //Loading user information.
    useEffect(() => {
        setSelectedRoute("analytic");
        fetchUser().then(setLoadingRoute(false));
    }, []);

    if (loadingRoute || !user.type) return <Layout />;

    return <Layout content={<Staff />} type={user.type} />;
};
