
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Response.css";
import  SideSetting from "../components/sideSetting";
function Response() {
  const { id } = useParams();

  const [responses, setResponses] = useState([]);
  const [survey, setSurvey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/surveys/${id}/responses`,
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load responses.");
        }

        setResponses(data.responses || []);
        setSurvey(data.survey || null);
      } catch (error) {
        setError(error.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchResponses();
    }
  }, [id]);

  if (loading) {
    return (
      <main className="responses">
        <p className="responses__status">Loading responses...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="responses">
        <p className="responses__error">{error}</p>

        <Link to="/home" className="responses__back">
          Back to Dashboard
        </Link>
      </main>
    );
  }

  return (
    <main className="responses">
      <SideSetting/>
      <header className="responses__header">
        <div>
          <p className="responses__eyebrow">SURVEY RESULTS</p>

          <h1 className="responses__title">
            {survey?.title || "Survey Responses"}
          </h1>

          <p className="responses__description">
            Review the answers submitted by your respondents.
          </p>
        </div>

        <Link to="/home" className="responses__back">
          Back to Dashboard
        </Link>
      </header>

      <section className="responses__summary">
        <div className="responses__summary-card">
          <span className="responses__summary-label">
            Total Responses
          </span>

          <span className="responses__summary-number">
            {responses.length}
          </span>
        </div>
      </section>

      <section className="responses__content">
        <div className="responses__section-header">
          <h2 className="responses__section-title">
            Individual Responses
          </h2>

          <span className="responses__count">
            {responses.length} submissions
          </span>
        </div>

        {responses.length === 0 ? (
          <div className="responses__empty">
            <h3>No responses yet</h3>

            <p>
              When people complete your survey, their answers
              will appear here.
            </p>
          </div>
        ) : (
          <div className="responses__list">
            {responses.map((item, index) => {
              const answers = item.answers || [];

              return (
                <details
                  className="responses__card"
                  key={item.id || index}
                >
                  
<summary className="responses__card-header">
  <h3 className="responses__respondent-name">
    Response {index + 1}
  </h3>
</summary>


                  <div className="responses__answers">
                    {answers.length === 0 ? (
                      <p className="responses__no-answers">
                        No answers available for this response.
                      </p>
                    ) : (
                      answers.map((answer, answerIndex) => {
                        const answerValue =
                          answer.value ?? answer.text;

                        return (
                          <div
                            className="responses__answer"
                            key={answer.id || answerIndex}
                          >
                            <h4 className="responses__question">
                              {answer.question?.text ||
                                answer.question?.title ||
                                `Question ${answerIndex + 1}`}
                            </h4>

                            <p className="responses__answer-text">
                              {Array.isArray(answerValue)
                                ? answerValue.join(", ")
                                : answerValue != null &&
                                    answerValue !== ""
                                  ? String(answerValue)
                                  : "No answer provided"}
                            </p>
                          </div>
                        );
                      })
                    )}
                  </div>
                </details>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}

export default Response;
