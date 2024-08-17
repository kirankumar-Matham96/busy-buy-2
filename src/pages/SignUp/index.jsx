import { SignUpForm } from "../../components/SignUpForm";

/**
 * The `SignUp` component renders the sign-up page of the application.
 *
 * This component serves as a container for the `SignUpForm` component, which provides the user interface for signing up for an account. It wraps the `SignUpForm` in a `div` element, allowing for styling and layout adjustments as needed.
 *
 * @component
 * @returns {JSX.Element} A `div` element containing the `SignUpForm` component.
 */
export const SignUp = () => {
  return (
    <div>
      <SignUpForm />
    </div>
  );
};
