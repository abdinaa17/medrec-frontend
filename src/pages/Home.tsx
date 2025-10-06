import { Link } from "react-router";

const Home = () => {
  return (
    <main className="container p-3">
      <p>Welcome to Medrec</p>
      <Link to="/consumers">See your consumers</Link>
    </main>
  );
};

export default Home;
