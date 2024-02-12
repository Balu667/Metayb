import { Route, Routes, Navigate } from "react-router-dom";
import { lazy } from "react";
import Header from "../components/Header";

const DashboardComponent = lazy(() => import("../views/users/Dashboard/Dashboard"));

const UserPaths = [
    {
        path: "/",
        element: DashboardComponent,
    }
];

function UserApp() {

    return (
        <>
            <Header />
            <Routes>
                {UserPaths.map((parentElement, parentIndex) => (
                    <Route
                        key={parentIndex}
                        path={parentElement.path}
                        element={<parentElement.element />}>
                        {parentElement?.children?.map(
                            (childrenElement, childrenIndex) => (
                                <Route
                                    path={childrenElement.path}
                                    element={<childrenElement.element />}
                                    key={childrenIndex}>
                                    {childrenElement?.children?.map(
                                        (nestedChild, nestedChildIndex) => (
                                            <Route
                                                key={nestedChildIndex}
                                                path={nestedChild.path}
                                                element={<nestedChild.element />}
                                            />
                                        )
                                    )}
                                </Route>
                            )
                        )}
                    </Route>
                ))}
                <Route path="*" element={<Navigate to={"/"} />} />
            </Routes>
        </>
    );
}

export default UserApp;
