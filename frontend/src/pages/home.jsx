
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [user, setUser] = useState(null);
  const [surveys, setSurveys] = useState([]);
  const [recentSurveys, setRecentSurveys] = useState([]);
  const [dashboardData, setDashboardData] = useState({
    activeSurveys: 0,
    responsesReceived: 0,
  });
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/users/me`,
          { credentials: "include" }
        );

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error("Failed to get user:", error);
      }
    };

    const getRecentSurveys = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/surveys/recent`,
          { credentials: "include" }
        );

        if (response.ok) {
          const data = await response.json();
          setRecentSurveys(data.surveys);
        }
      } catch (error) {
        console.error("Failed to get recent surveys:", error);
      }
    };

    const getDashboardData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/dashboard`,
          { credentials: "include" }
        );

        if (response.ok) {
          const data = await response.json();

          setDashboardData({
            activeSurveys: data.activeSurveys,
            responsesReceived: data.responsesReceived,
          });
        }
      } catch (error) {
        console.error("Failed to get dashboard data:", error);
      }
    };

    getUser();
    getRecentSurveys();
    getDashboardData();
  }, []);

  const getSurveys = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/surveys`,
        { credentials: "include" }
      );

      if (response.ok) {
        const data = await response.json();
        setSurveys(data.surveys);
        setShowAll(true);
      }
    } catch (error) {
      console.error("Failed to get surveys:", error);
    }
  };

  const displayedSurveys = showAll ? surveys : recentSurveys;

  return (
    <main>
      <h2>Welcome back{user?.name ? `, ${user.name}` : ""}!</h2>

      <Link to="/surveys/create">Create New Survey</Link>

      <section>
        <div>
          <h3>Active Surveys</h3>
          <p>{dashboardData.activeSurveys}</p>
        </div>

        <div>
          <h3>Responses Received</h3>
          <p>{dashboardData.responsesReceived}</p>
        </div>
      </section>

      <section>
        <h3>Your Surveys</h3>

        {displayedSurveys.length === 0 ? (
          <p>You haven't created any surveys yet.</p>
        ) : (
          <ul>
            {displayedSurveys.map((survey) => (
              <li key={survey.id}>
                <Link to={`/surveys/${survey.id}`}>
                  {survey.title}
                </Link>

                {survey._count && (
                  <span> — {survey._count.responses} responses</span>
                )}
              </li>
            ))}
          </ul>
        )}

        {!showAll && (
          <button onClick={getSurveys}>See More</button>
        )}

        {showAll && (
          <button onClick={() => setShowAll(false)}>
            Show Recent Surveys
          </button>
        )}
      </section>
    </main>
  );
}

export { Home };
