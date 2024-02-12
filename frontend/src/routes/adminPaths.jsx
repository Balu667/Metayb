import { Navigate, Route, Routes } from "react-router-dom";
import { lazy } from "react";
import Header from "../components/Header";

const DashboardComponent = lazy(() => import("../views/Admin/AdminDashboard/index"));

const AdminPaths = [
    {
        path: "/",
        element: DashboardComponent,
    }
];

function AdminApp() {

    return (
        <>
            <Header />
            <Routes>
                {AdminPaths.map((parentElement, parentIndex) => (
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

export default AdminApp;
