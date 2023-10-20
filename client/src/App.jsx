import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import About from "./pages/About";
import CreateList from "./pages/CreateList";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import AllLists from "./pages/AllLists";
import UpdateList from "./pages/UpdateList";
import List from "./pages/List";
import Search from "./pages/Search";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/sign-in"
          element={<SignIn />}
        />
        <Route
          path="/sign-up"
          element={<SignUp />}
        />
        <Route
          path="/about"
          element={<About />}
        />
        <Route
          path="/list/:id"
          element={<List />}
        />
        <Route
          path="/search"
          element={<Search />}
        />

        <Route element={<PrivateRoute />}>
          <Route
            path="/lists"
            element={<AllLists />}
          />
          <Route
            path="/profile"
            element={<Profile />}
          />
          <Route
            path="/create-list"
            element={<CreateList />}
          />
          <Route
            path="/update-list/:id"
            element={<UpdateList />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
