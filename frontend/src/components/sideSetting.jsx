
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./SideSetting.css";

function SideSetting() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/users/me`,
          {
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error("Failed to get user:", error);
      }
    };

    getUser();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/users/logout`, {
        method: "POST",
        credentials: "include",
      });

      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <aside className="side-setting">
      <div className="side-setting__logo">FormIt</div>

      <Link to="/home">Dashboard</Link>

      <div className="side-setting__profile">
        <Link
          to="/profile"
          className="side-setting__avatar"
          aria-label="Profile"
        >
          {user?.firstName?.charAt(0).toUpperCase() || "P"}
        </Link>
      </div>

      <button
        className="side-setting__logout"
        onClick={handleLogout}
      >
        Logout
      </button>
    </aside>
  );
}

export { SideSetting };
