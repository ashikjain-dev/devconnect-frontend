import { BrowserRouter, Routes, Route } from "react-router";
import { Provider } from "react-redux";
import Body from "./components/Body";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import Logout from "./components/Logout";
import appStore from "./utils/appStore";
import Connections from "./components/Connections";
import Feed from "./components/Feed";
import Request from "./components/Request";
function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<Request />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
