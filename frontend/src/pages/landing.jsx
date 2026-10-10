import Header from "../components/header";
import { Link } from "react-router-dom";
import "./Landing.css";

function Landing() {
return (
<> <Header />


  <main className="landing">
    <h1 className="landing__title">
      Got questions? <span>Make a survey.</span>
    </h1>

    <p className="landing__description">
      Create your own surveys and see what people have to say.
    </p>

    <div className="landing__actions">
      <Link to="/register" className="landing__button landing__button--primary">
        Get Started
      </Link>

      <Link to="/surveys" className="landing__button">
        Explore Surveys
      </Link>
    </div>
  </main>
</>


);
}

export default Landing;
