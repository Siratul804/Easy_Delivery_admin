import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/Login";

import UserContxt from "./context/UserContext";
import Axios from "axios";

import { ServerProvider } from "./contex/ServerContext";

import ScrollToTop from "./ScrollToTop";

import Loading from "./loading/Loading";

import Create from "./components/Dashboard/Food/Create";
import Edit from "./components/Dashboard/Food/Edit";
import Oder from "./components/Dashboard/Oder/Oder";
import EditDetails from "./components/Dashboard/Food/EditDetails";
import Reviews from "./components/Dashboard/Review/Reviews";
import EditReview from "./components/Dashboard/Review/EditReview";
import EditReviewsDetails from "./components/Dashboard/Review/EditReviewsDetails";

function App() {
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        "http://localhost:8000/api/admin/tokenIsValied",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await Axios.get(
          "http://localhost:8000/api/admin/getUser",
          {
            headers: { "x-auth-token": token },
          }
        );
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };
    checkLoggedIn();

    setTimeout(() => setSpinner(false), 1000, <Loading />);
  }, []);

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });
  return (
    <div className="App">
      {!spinner ? (
        <>
          <BrowserRouter>
            <ServerProvider>
              <UserContxt.Provider value={{ userData, setUserData }}>
                <ScrollToTop />
                <Switch>
                  <Route exact path="/" component={Login} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/create" component={Create} />
                  <Route exact path="/edit" component={Edit} />
                  <Route exact path="/reviews" component={Reviews} />
                  <Route exact path="/reviewsEdit" component={EditReview} />
                  <Route
                    exact
                    path="/reviews/edit/details/:id"
                    component={EditReviewsDetails}
                  />
                  <Route
                    exact
                    path="/edit/details/:id"
                    component={EditDetails}
                  />
                  <Route exact path="/oder" component={Oder} />
                </Switch>
              </UserContxt.Provider>
            </ServerProvider>
          </BrowserRouter>
        </>
      ) : (
        <>
          <Loading />
        </>
      )}
    </div>
  );
}

export default App;
