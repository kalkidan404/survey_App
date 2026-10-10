import Header from "../components/header";
import {Link} from "react-router-dom"
function Landing() {
  return (
    <>
      <Header />

      <main>
    
<h1>Got questions? Make a survey.</h1>
<p>Create your own surveys and see what people have to say.</p>



        <Link to="/register">Get Started</Link>
        <Link to="/surveys">Explore Surveys</Link>
      </main>
    </>
  );
}

export default Landing;