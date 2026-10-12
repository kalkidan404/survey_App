import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QuestionCard } from "../components/QuestionCard";
import "./CreateSurvey.css";
import SideSetting from "../components/sideSetting";

function CreateSurvey() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState("");
  const [questionType, setQuestionType] = useState("MULTIPLE_CHOICE");
  const [options, setOptions] = useState(["", ""]);

  const addOption = () => {
    setOptions((currentOptions) => [...currentOptions, ""]);
  };

  const updateOption = (index, value) => {
    setOptions((currentOptions) =>
      currentOptions.map((option, i) =>
        i === index ? value : option
      )
    );
  };

  const removeOption = (index) => {
    setOptions((currentOptions) =>
      currentOptions.filter((_, i) => i !== index)
    );
  };

  const addQuestion = () => {
    if (!questionText.trim()) {
      alert("Please enter a question.");
      return;
    }

    const questionOptions =
      questionType === "MULTIPLE_CHOICE" ||
      questionType === "CHECKBOX"
        ? options
            .filter((option) => option.trim())
            .map((option, index) => ({
              id: `${index}`,
              text: option.trim(),
            }))
        : [];

    if (
      (questionType === "MULTIPLE_CHOICE" ||
        questionType === "CHECKBOX") &&
      questionOptions.length < 2
    ) {
      alert("Please add at least two answer options.");
      return;
    }

    const question = {
      id: crypto.randomUUID(),
      text: questionText.trim(),
      type: questionType,
      options: questionOptions,
    };

    setQuestions((currentQuestions) => [
      ...currentQuestions,
      question,
    ]);

    setQuestionText("");
    setQuestionType("MULTIPLE_CHOICE");
    setOptions(["", ""]);
  };

  const editQuestion = (questionId) => {
    const question = questions.find(
      (item) => item.id === questionId
    );

    if (!question) return;

    setQuestionText(question.text);
    setQuestionType(question.type);

    setOptions(
      question.options.length > 0
        ? question.options.map((option) => option.text)
        : ["", ""]
    );

    setQuestions((currentQuestions) =>
      currentQuestions.filter((item) => item.id !== questionId)
    );
  };

  const deleteQuestion = (questionId) => {
    setQuestions((currentQuestions) =>
      currentQuestions.filter(
        (question) => question.id !== questionId
      )
    );
  };

  const createSurvey = async () => {
    try {
      if (!title.trim()) {
        alert("Please enter a survey title.");
        return;
      }

      if (questions.length === 0) {
        alert("Please add at least one question.");
        return;
      }

      const surveyResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/surveys`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            title: title.trim(),
            description: description.trim() || null,
          }),
        }
      );

      const surveyData = await surveyResponse.json();

      if (!surveyResponse.ok) {
        throw new Error(
          surveyData.message || "Failed to create survey."
        );
      }

      const surveyId = surveyData.survey.id;

      for (const question of questions) {
        const questionResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/questions`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              surveyId,
              title: question.text,
              text: question.text,
            }),
          }
        );

        const questionData = await questionResponse.json();

        if (!questionResponse.ok) {
          throw new Error(
            questionData.message || "Failed to save question."
          );
        }

        const questionId = questionData.question.id;

        for (const option of question.options) {
          const optionResponse = await fetch(
            `${import.meta.env.VITE_API_URL}/options/question/${questionId}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify({ text: option.text }),
            }
          );

          const optionData = await optionResponse.json();

          if (!optionResponse.ok) {
            throw new Error(
              optionData.message || "Failed to save option."
            );
          }
        }
      }

      navigate(`/surveys/${surveyId}`);
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to create survey.");
    }
  };

  return (
    <main className="create-survey">
      <SideSetting />

      <header className="create-survey__header">
        <h1 className="create-survey__title">Create a Survey</h1>

        <p className="create-survey__description">
          Build your survey by adding questions and answer options.
        </p>
      </header>

      <section className="create-survey__details">
        <label
          htmlFor="survey-title"
          className="create-survey__label"
        >
          Survey Title
        </label>

        <input
          id="survey-title"
          className="create-survey__input"
          type="text"
          placeholder="Enter your survey title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <label
          htmlFor="survey-description"
          className="create-survey__label"
          style={{ marginTop: "20px" }}
        >
          Survey Description <span>(Optional)</span>
        </label>

        <textarea
          id="survey-description"
          className="create-survey__input create-survey__textarea"
          placeholder="Describe your survey and explain its purpose..."
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          rows={4}
        />

        <p className="create-survey__description-hint">
          Help participants understand what your survey is about.
        </p>
      </section>

      <section className="create-survey__question-form">
        <h2 className="create-survey__section-title">
          Add a Question
        </h2>

        <label
          htmlFor="question-text"
          className="create-survey__label"
        >
          Question
        </label>

        <input
          id="question-text"
          className="create-survey__input"
          type="text"
          placeholder="Enter your question"
          value={questionText}
          onChange={(event) => setQuestionText(event.target.value)}
        />

        <label
          htmlFor="question-type"
          className="create-survey__label"
        >
          Question Type
        </label>

        <select
          id="question-type"
          className="create-survey__input"
          value={questionType}
          onChange={(event) => setQuestionType(event.target.value)}
        >
          <option value="MULTIPLE_CHOICE">Multiple Choice</option>
          <option value="CHECKBOX">Checkboxes</option>
          <option value="TEXT">Short Answer</option>
        </select>

        {(questionType === "MULTIPLE_CHOICE" ||
          questionType === "CHECKBOX") && (
          <div className="create-survey__options">
            <label className="create-survey__label">
              Answer Options
            </label>

            {options.map((option, index) => (
              <div
                className="create-survey__option-row"
                key={index}
              >
                <input
                  className="create-survey__input"
                  type="text"
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(event) =>
                    updateOption(index, event.target.value)
                  }
                />

                {options.length > 2 && (
                  <button
                    type="button"
                    className="create-survey__remove-option"
                    onClick={() => removeOption(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              className="create-survey__secondary-button"
              onClick={addOption}
            >
              + Add Option
            </button>
          </div>
        )}

        <button
          type="button"
          className="create-survey__add-question"
          onClick={addQuestion}
        >
          Add Question
        </button>
      </section>

      <section className="create-survey__questions">
        <h2 className="create-survey__section-title">
          Your Questions ({questions.length})
        </h2>

        {questions.length === 0 ? (
          <p className="create-survey__empty">
            Your questions will appear here when you add them.
          </p>
        ) : (
          questions.map((question, index) => (
            <QuestionCard
              key={question.id}
              questionNumber={index + 1}
              totalQuestions={questions.length}
              question={question.text}
              questionType={question.type.replaceAll("_", " ")}
              options={question.options}
              onEdit={() => editQuestion(question.id)}
              onDelete={() => deleteQuestion(question.id)}
            />
          ))
        )}
      </section>

      <footer className="create-survey__footer">
        <button
          type="button"
          className="create-survey__publish"
          onClick={createSurvey}
        >
          Create Survey
        </button>
      </footer>
    </main>
  );
}

export default CreateSurvey;