
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed. Please try again.");
      }

      navigate("/home");
    } catch (error) {
      setError(error.message || "Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login">
      <section className="login__card">
        <Link to="/" className="login__brand">
          Form<span>It</span>
        </Link>

        <header className="login__header">
          <h1 className="login__title">Welcome back</h1>
          <p className="login__description">
            Sign in to continue building your surveys.
          </p>
        </header>

        <form className="login__form" onSubmit={handleLogin}>
          {error && (
            <p className="login__error" role="alert">
              {error}
            </p>
          )}

          <div className="login__field">
            <label htmlFor="login-email" className="login__label">
              Email address
            </label>

            <input
              id="login-email"
              className="login__input"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="login__field">
            <label htmlFor="login-password" className="login__label">
              Password
            </label>

            <input
              id="login-password"
              className="login__input"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <button
            className="login__submit"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="login__register">
          Don't have an account?{" "}
          <Link to="/register">Create one</Link>
        </p>
      </section>
    </main>
  );
}

export default Login;
