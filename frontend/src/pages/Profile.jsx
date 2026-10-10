
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/users/me`,
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load profile.");
        }

        setUser(data.user);
      } catch (error) {
        setError(error.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, []);

  if (loading) {
    return <main className="profile"><p>Loading profile...</p></main>;
  }

  if (error) {
    return (
      <main className="profile">
        <p className="profile__error">{error}</p>
        <Link to="/login" className="profile__link">
          Go to Login
        </Link>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="profile">
        <p>Profile not found.</p>
      </main>
    );
  }

  const initials = `${user.firstName?.charAt(0) || ""}${
    user.lastName?.charAt(0) || ""
  }`.toUpperCase();

  return (
    <main className="profile">
      <header className="profile__header">
        <div>
          <h1 className="profile__title">My Profile</h1>
          <p className="profile__description">
            View your account information.
          </p>
        </div>

        <Link to="/home" className="profile__back">
          Back to Dashboard
        </Link>
      </header>

      <section className="profile__card">
        <div className="profile__identity">
          <div className="profile__avatar">
            {initials || "P"}
          </div>

          <div className="profile__identity-info">
            <h2 className="profile__name">
              {user.firstName} {user.lastName}
            </h2>
            <p className="profile__email">{user.email}</p>
          </div>
        </div>

        <div className="profile__divider"></div>

        <div className="profile__details">
          <h3 className="profile__section-title">
            Account Information
          </h3>

          <div className="profile__field">
            <span className="profile__label">First Name</span>
            <span className="profile__value">{user.firstName}</span>
          </div>

          <div className="profile__field">
            <span className="profile__label">Last Name</span>
            <span className="profile__value">{user.lastName}</span>
          </div>

          <div className="profile__field">
            <span className="profile__label">Email Address</span>
            <span className="profile__value">{user.email}</span>
          </div>

          <div className="profile__field">
            <span className="profile__label">Member Since</span>
            <span className="profile__value">
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "Not available"}
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Profile;
