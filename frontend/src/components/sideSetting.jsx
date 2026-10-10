import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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
    <>
      <Link to="/home">Dashboard</Link>

      <Link to="/profile">
        {user?.name?.charAt(0).toUpperCase() || "P"}
      </Link>

      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

export { SideSetting };