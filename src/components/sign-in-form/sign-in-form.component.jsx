import { useEffect, useState } from "react";
import {  signInWithGooglePopup,  createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import './sign-in-form.styles.scss';

const defaultFormFields = {
    email: "",
    password: "",
  };

const SignInForm = () => {
  // useEffect(() => {
  //   const getGoogleRedirectResult = async () => {
  //     const response = await getRedirectResult(auth);

  //     if (response) {
  //       const userDocRef = await createUserDocumentFromAuth(response.user);
  //     }
  //   };

  //   getGoogleRedirectResult();
  // });

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );

      if (response) {
        const { user } = response;
        const userDocRef = await createUserDocumentFromAuth(user);
      }

      resetFormFields();
    } catch (error) {
      if (error.code == "auth/invalid-login-credentials") {
        alert("Invalid email or password.");
      }

      console.log(error);
    }
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <div className="buttons-container">
          <Button type="submit">Sign in</Button>
          <Button
            onClick={signInWithGoogle}
            buttonType={"google"}
            type="button"
          >
            Google Sign In
          </Button>
          {/*<button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button>*/}
        </div>
      </form>
    </div>
  );
};

export default SignInForm;