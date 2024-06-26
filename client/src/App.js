import React, { useEffect } from "react";
import SideNavBar from "./components/sideNavBar";
import { useSelector, useDispatch } from "react-redux";
import LoginPage from "./components/Login/login";
import Axios from "axios";
import { IsUserLogined, loginFailed } from "./redux/reducers/Auth/authAction";
import { Route, Switch } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {
  isSystemOnline,
  prescriptionData_peek_dequeue,
} from "./redux/reducers/Prescription/prescriptionAction";

const App = () => {
  const dispatch = useDispatch();
  navigator.onLine
    ? dispatch(isSystemOnline(navigator.onLine))
    : dispatch(isSystemOnline(navigator.onLine));

  const auth = useSelector((state) => state.AuthReducer);
  const isOnline = useSelector((state) => state.prescriptionData.onLine);
  const prescriptionData = useSelector(
    (state) => state.prescriptionData?.prescriptionData
  );

  const isLogin = (headers) => {
    try {
      Axios.get(`../../api/auth/token`, { headers }).then((res) => {
        dispatch(IsUserLogined(res.data));
        if (isOnline && prescriptionData?.length > 0) {
          const headers = {
            "Content-Type": "application/json",
            authorization: `Bearer ${auth.token}`,
            patientId:
              prescriptionData[0]?.prescriptionHeader?.patientDetail._id,
          };
          dispatch(prescriptionData_peek_dequeue(headers));
        }
      });
    } catch (error) {
      dispatch(loginFailed());
    }
  };

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      authorization: `Bearer ${auth?.token}`,
    };
    if (auth.token != null) {
      isLogin(headers);
    }
  }, [auth.token]);

  const history = useHistory();
  const auth_token = useSelector((state) => state?.AuthReducer?.token);

  useEffect(() => {
    if (!auth_token) {
      history.push("/");
    }
  }, [auth_token]);

  return (
    <div className="App">
      <Switch>
        <Route path="/login" exact>
          <LoginPage></LoginPage>
        </Route>
        <SideNavBar />
      </Switch>
    </div>
  );
};

export default App;
