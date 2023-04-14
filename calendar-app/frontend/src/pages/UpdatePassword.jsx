import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UpdatePassword() {
  const { token, email } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    // Check if token and email are valid
    // You can make an API request to your Laravel backend to verify the token and email
  }, [token, email]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    // Submit password reset request to Laravel backend
    // You can make an API request to your Laravel backend to reset the user's password
  };

  return (
    <div>
      <h1>Reset your password</h1>
      {submitSuccess ? (
        <p>Your password has been reset.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            New password:
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <label>
            Confirm password:
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </label>
          {submitError && <p>{submitError}</p>}
          <button type="submit" disabled={isSubmitting}>
            Reset password
          </button>
        </form>
      )}
    </div>
  );
}

export default UpdatePassword;
