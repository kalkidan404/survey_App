import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
return ( <header className="header"> <Link to="/" className="header__brand"> <span className="header__logo"> <span></span> <span></span> <span></span> </span>


    <span className="header__name">FormIt</span>
  </Link>

  <Link to="/login" className="header__login">
    LogIn
  </Link>
</header>


);
}

export default Header;