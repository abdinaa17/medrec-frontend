import { Link } from "react-router";

const Home = () => {
  return (
    <main>
      <p>Welcome to Medrec</p>
      <Link to="/consumers">See your consumers</Link>
    </main>
  );
};

export default Home;
