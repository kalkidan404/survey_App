//survey/:id

import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Survey.css";

function Survey() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [survey, setSurvey] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/surveys/${id}`,
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load survey.");
        }

        setSurvey(data.survey);
      } catch (error) {
        setError(error.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSurvey();
    }
  }, [id]);

  const handleAnswerChange = (questionId, value, type) => {
    setAnswers((previous) => {
      if (type === "CHECKBOX") {
        const currentAnswers = previous[questionId] || [];

        const updatedAnswers = currentAnswers.includes(value)
          ? currentAnswers.filter((answer) => answer !== value)
          : [...currentAnswers, value];

        return {
          ...previous,
          [questionId]: updatedAnswers,
        };
      }

      return {
        ...previous,
        [questionId]: value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!survey?.questions?.length) {
      setError("This survey has no questions to answer.");
      return;
    }

    const unansweredQuestion = survey.questions.find((question) => {
      const answer = answers[question.id];

      return (
        answer === undefined ||
        answer === "" ||
        (Array.isArray(answer) && answer.length === 0)
      );
    });

    if (unansweredQuestion) {
      setError("Please answer every question before submitting.");
      return;
    }

    try {
      setSubmitting(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/surveys/${id}/responses`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            answers: survey.questions.map((question) => ({
              questionId: question.id,
              value: answers[question.id],
            })),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit your response.");
      }

      navigate("/submitted", {
        state: {
          surveyTitle: survey.title,
        },
      });
    } catch (error) {
      setError(error.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="survey">
        <p className="survey__status">Loading survey...</p>
      </main>
    );
  }

  if (error && !survey) {
    return (
      <main className="survey">
        <p className="survey__error">{error}</p>

        <Link to="/" className="survey__back">
          Back to Home
        </Link>
      </main>
    );
  }

  if (!survey) {
    return (
      <main className="survey">
        <p className="survey__status">Survey not found.</p>
      </main>
    );
  }

  const questions = survey.questions || [];

  return (
    <main className="survey">
      <header className="survey__header">
        <Link to="/" className="survey__brand">
          Form<span>It</span>
        </Link>

        <p className="survey__eyebrow">SURVEY</p>

        <h1 className="survey__title">{survey.title}</h1>

        <p className="survey__description">
          Please answer the following questions.
        </p>

        <div className="survey__progress">
          <span>
            {Object.keys(answers).filter((questionId) => {
              const answer = answers[questionId];

              return (
                answer !== "" &&
                answer !== undefined &&
                (!Array.isArray(answer) || answer.length > 0)
              );
            }).length}{" "}
            of {questions.length} answered
          </span>

          <div className="survey__progress-track">
            <div
              className="survey__progress-bar"
              style={{
                width: `${
                  questions.length
                    ? (Object.keys(answers).filter((questionId) => {
                        const answer = answers[questionId];

                        return (
                          answer !== "" &&
                          answer !== undefined &&
                          (!Array.isArray(answer) || answer.length > 0)
                        );
                      }).length /
                        questions.length) *
                      100
                    : 0
                }%`,
              }}
            />
          </div>
        </div>
      </header>

      {questions.length === 0 ? (
        <section className="survey__empty">
          <h2>No questions available</h2>
          <p>This survey does not have any questions yet.</p>
        </section>
      ) : (
        <form className="survey__form" onSubmit={handleSubmit}>
          {questions.map((question, index) => {
            const type = question.type || question.questionType;
            const options = question.options || [];

            return (
              <section className="survey__question" key={question.id}>
                <div className="survey__question-heading">
                  <span className="survey__question-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="survey__question-type">
                    {String(type || "TEXT").replaceAll("_", " ")}
                  </span>
                </div>

                <h2 className="survey__question-title">
                  {question.text || question.title}
                </h2>

                {type === "MULTIPLE_CHOICE" && (
                  <div className="survey__options">
                    {options.map((option, optionIndex) => {
                      const value =
                        typeof option === "string"
                          ? option
                          : option.text ?? option.value ?? "";

                      return (
                        <label
                          className="survey__option"
                          key={option.id || optionIndex}
                        >
                          <input
                            type="radio"
                            name={question.id}
                            value={value}
                            checked={answers[question.id] === value}
                            onChange={() =>
                              handleAnswerChange(
                                question.id,
                                value,
                                type
                              )
                            }
                          />

                          <span className="survey__option-indicator" />

                          <span className="survey__option-text">
                            {value}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                )}

                {type === "CHECKBOX" && (
                  <div className="survey__options">
                    {options.map((option, optionIndex) => {
                      const value =
                        typeof option === "string"
                          ? option
                          : option.text ?? option.value ?? "";

                      return (
                        <label
                          className="survey__option"
                          key={option.id || optionIndex}
                        >
                          <input
                            type="checkbox"
                            value={value}
                            checked={(answers[question.id] || []).includes(
                              value
                            )}
                            onChange={() =>
                              handleAnswerChange(
                                question.id,
                                value,
                                type
                              )
                            }
                          />

                          <span className="survey__option-indicator" />

                          <span className="survey__option-text">
                            {value}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                )}

                {(type === "TEXT" || !type) && (
                  <textarea
                    className="survey__textarea"
                    placeholder="Write your answer here..."
                    value={answers[question.id] || ""}
                    onChange={(event) =>
                      handleAnswerChange(
                        question.id,
                        event.target.value,
                        type
                      )
                    }
                    rows={4}
                  />
                )}
              </section>
            );
          })}

          {error && (
            <p className="survey__error" role="alert">
              {error}
            </p>
          )}

          <footer className="survey__footer">
            <p className="survey__footer-note">
              Please review your answers before submitting.
            </p>

            <button
              type="submit"
              className="survey__submit"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit Response"}
            </button>
          </footer>
        </form>
      )}

      <p className="survey__footer-brand">
        Powered by <span>FormIt</span>
      </p>
    </main>
  );
}

export default Survey;
