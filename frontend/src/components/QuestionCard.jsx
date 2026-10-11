
import "./QuestionCard.css";

function QuestionCard({
  questionNumber,
  totalQuestions,
  question,
  questionType = "Multiple Choice",
  options = [],
  onEdit,
  onDelete,
}) {
  return (
    <div className="question-card">
      {/* Question Header */}
      <div className="question-card__header">
        <span className="question-card__number">
          Question {questionNumber}
        </span>

        <span className="question-card__type">
          {questionType}
        </span>
      </div>

      {/* Question Text */}
      <h3 className="question-card__title">
        {question}
      </h3>

      {/* Answer Options */}
      <div className="question-card__options">
        {options.map((option, index) => (
          <div className="question-card__option" key={option.id ?? index}>
            <span className="question-card__radio"></span>

            <span className="question-card__option-text">
              {option.text}
            </span>
          </div>
        ))}
      </div>

      {/* Question Footer */}
      <div className="question-card__footer">
        <span className="question-card__count">
          {questionNumber} of {totalQuestions} questions
        </span>

        <div className="question-card__actions">
          <button
            type="button"
            className="question-card__button question-card__button--edit"
            onClick={onEdit}
          >
            Edit
          </button>

          <button
            type="button"
            className="question-card__button question-card__button--delete"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export { QuestionCard };
