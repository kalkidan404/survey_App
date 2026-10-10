import {Link} from "react-router-dom"
function Header() {
  return (
    <header>
      <div className="logo">FormIt</div>
      <Link to="/login">LogIn</Link>
    </header>
  );
}

export default Header;