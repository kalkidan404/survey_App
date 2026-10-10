
import { useNavigate } from "react-router-dom";
import "./SurveyCard.css";

function SurveyCard({ survey, onDelete }) {
  const navigate = useNavigate();

  const handleOpen = () => {
    navigate(`/surveys/${survey.id}`);
  };

  const responseCount = survey._count?.responses ?? 0;

  return (
    <article className="survey-card">
      <div className="survey-card__header">
        <span
          className={`survey-card__status ${
            survey.isActive
              ? "survey-card__status--active"
              : "survey-card__status--inactive"
          }`}
        >
          {survey.isActive ? "Active" : "Inactive"}
        </span>

        <button
          type="button"
          className="survey-card__delete"
          onClick={() => onDelete?.(survey.id)}
          aria-label={`Delete ${survey.title}`}
        >
          Delete
        </button>
      </div>

      <div className="survey-card__body">
        <h3 className="survey-card__title">{survey.title}</h3>

        <p className="survey-card__responses">
          {responseCount} {responseCount === 1 ? "response" : "responses"}
        </p>
      </div>

      <div className="survey-card__footer">
        <span className="survey-card__date">
          Created{" "}
          {new Date(survey.createdAt).toLocaleDateString()}
        </span>

        <button
          type="button"
          className="survey-card__open"
          onClick={handleOpen}
        >
          Open Survey →
        </button>
      </div>
    </article>
  );
}

export { SurveyCard };
