//success

import { Link, useLocation } from "react-router-dom";
import "./Submitted.css";

function Submitted() {
  const location = useLocation();
  const surveyTitle = location.state?.surveyTitle;

  return (
    <main className="submitted">
      <section className="submitted__card">
        <div className="submitted__icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M5 12.5L10 17L19 7"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <p className="submitted__eyebrow">FORMIT SURVEYS</p>

        <h1 className="submitted__title">
          Response Submitted!
        </h1>

        <p className="submitted__description">
          Thank you for taking the time to complete this survey.
          Your response has been submitted successfully.
        </p>

        {surveyTitle && (
          <div className="submitted__survey">
            <span className="submitted__survey-label">
              Completed survey
            </span>

            <span className="submitted__survey-title">
              {surveyTitle}
            </span>
          </div>
        )}

        <div className="submitted__divider"></div>

        <p className="submitted__note">
          Your feedback matters. You can now safely leave this page.
        </p>

        <Link to="/" className="submitted__button">
          Back to Home
        </Link>
      </section>

      <p className="submitted__footer">
        Powered by <span>FormIt</span>
      </p>
    </main>
  );
}

export default Submitted;
