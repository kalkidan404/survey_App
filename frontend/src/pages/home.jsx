import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import SideSetting from "../components/sideSetting";
function Home() {
const [user, setUser] = useState(null);
const [search, setSearch] = useState("");
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

const displayedSurveys = (showAll ? surveys : recentSurveys).filter(
(survey) => survey.title.toLowerCase().includes(search.toLowerCase())
);

return ( <main className="home"> 
<SideSetting />
<header className="home__header"> <div> <h2 className="home__welcome">
Welcome back{user?.firstName ? `, ${user.firstName}` : ""}!! </h2> </div>


    <div className="home__header-actions">
      <Link
        to="/surveys/create"
        className="home__button home__button--primary"
      >
        Create New Survey
      </Link>
    </div>
  </header>

  <section className="home__stats">
    <div className="home__stat-card">
      <span className="home__stat-label">Active Surveys</span>
      <span className="home__stat-value home__stat-value--accent">
        {dashboardData.activeSurveys}
      </span>
    </div>

    <div className="home__stat-card">
      <span className="home__stat-label">Responses Received</span>
      <span className="home__stat-value">
        {dashboardData.responsesReceived}
      </span>
    </div>
  </section>

  <div className="home__content">
    <div className="home__main">
      <section className="home__section">
        <div className="home__section-header">
          <h3 className="home__section-title">Your Surveys</h3>

          <input 
          className="home__search-input"
            type="text"
            placeholder="Search surveys..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {displayedSurveys.length === 0 ? (
          <div className="home__empty">
            <p className="home__empty-title">
              You haven't created any surveys yet.
            </p>
          </div>
        ) : (
          <div className="home__surveys">
            {displayedSurveys.map((survey) => (
              <div className="home__survey-card" key={survey.id}>
                <div className="home__survey-info">
                  <h4 className="home__survey-title">
                    <Link
                      to={`/surveys/${survey.id}`}
                      className="home__section-link"
                    >
                      {survey.title}
                    </Link>
                  </h4>

                  <div className="home__survey-meta">
  <Link
    to={`/surveys/${survey.id}/responses`}
    className="home__section-link"
  >
    {survey._count?.responses ?? 0} responses →
  </Link>
</div>

                </div>
              </div>
            ))}
          </div>
        )}

        {!showAll && (
          <button className="home__button" onClick={getSurveys}>
            See More
          </button>
        )}

        {showAll && (
          <button
            className="home__button"
            onClick={() => setShowAll(false)}
          >
            Show Recent Surveys
          </button>
        )}
      </section>
    </div>
  </div>
</main>


);
}

export default Home;
