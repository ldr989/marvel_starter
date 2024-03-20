import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";

const Page404 = lazy(() => import("../pages/404"));
const MainPage = lazy(() => import("../pages/MainPage"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const SingleItemPage = lazy(() => import("../pages/SingleItemPage"));

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Suspense fallback={<Spinner width={200} height={200} />}>
                        <Switch>
                            <Route exact path="/">
                                <MainPage />
                            </Route>
                            <Route exact path="/comics">
                                <ComicsPage />
                            </Route>
                            <Route exact path="/comics/:comicId">
                                <SingleItemPage whatItem={"comic"} />
                            </Route>
                            <Route exact path="/:charId">
                                <SingleItemPage whatItem={"char"} />
                            </Route>
                            <Route path="*">
                                <Page404 />
                            </Route>
                        </Switch>
                    </Suspense>
                </main>
            </div>
        </Router>
    );
};

export default App;
