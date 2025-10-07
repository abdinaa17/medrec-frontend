import { BrowserRouter as Router, Routes, Route } from "react-router";
import "./App.css";
import { Home, Consumers, SingleConsumer, NewConsumer } from "./pages";
import Header from "./components/Header";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/consumers" element={<Consumers />}></Route>
        <Route path="/consumers/:id" element={<SingleConsumer />}></Route>
        <Route path="/new-consumer" element={<NewConsumer />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
