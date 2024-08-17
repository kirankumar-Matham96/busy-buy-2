import { SignInForm } from "../../components/SignInForm";

/**
 * The `SignIn` component renders the sign-in page of the application.
 *
 * This component serves as a container for the `SignInForm` component, which provides the user interface for signing in to the application. It wraps the `SignInForm` in a `div` element, which can be styled or extended as needed.
 *
 * @component
 * @returns {JSX.Element} A `div` element containing the `SignInForm` component.
 */
export const SignIn = () => {
  return (
    <div>
      <SignInForm />
    </div>
  );
};
