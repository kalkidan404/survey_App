//the questions to b answered found through reply

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Response.css";

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
              When people complete your survey, their responses
              will appear here.
            </p>
          </div>
        ) : (
          <div className="responses__list">
            {responses.map((item, index) => {
              const answers = item.answers || [];

              return (
                <article
                  className="responses__card"
                  key={item.id || index}
                >
                  <div className="responses__card-header">
                    <div className="responses__respondent">
                      <div className="responses__avatar">
                        {index + 1}
                      </div>

                      <div>
                        <h3 className="responses__respondent-name">
                          Respondent {index + 1}
                        </h3>

                        <p className="responses__date">
                          {item.createdAt
                            ? new Date(
                                item.createdAt
                              ).toLocaleString()
                            : "Submission date unavailable"}
                        </p>
                      </div>
                    </div>

                    <span className="responses__badge">
                      Submitted
                    </span>
                  </div>

                  <div className="responses__answers">
                    {answers.length === 0 ? (
                      <p className="responses__no-answers">
                        No answers available for this response.
                      </p>
                    ) : (
                      answers.map((answer, answerIndex) => (
                        <div
                          className="responses__answer"
                          key={answer.id || answerIndex}
                        >
                          <h4 className="responses__question">
                            {answer.question?.text ||
                              answer.questionText ||
                              `Question ${answerIndex + 1}`}
                          </h4>

                          <p className="responses__answer-text">
                            {Array.isArray(answer.value)
                              ? answer.value.join(", ")
                              : answer.value ??
                                answer.text ??
                                "No answer provided"}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}

export default Response;
