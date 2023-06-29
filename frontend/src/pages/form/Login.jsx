import { useState } from "react";
import { toast } from "react-toastify";
import FormModal from "../../components/form-modal/FormModal";
import "./form.css";
import { useDispatch } from "react-redux";
import { login } from "../../redux/apiCalls/authApiCall";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (email.length === 0) return toast.error("Email is required!");
    if (password.length === 0) return toast.error("Password is required!");

    dispatch(login({ email, password }));
  };

  return (
    <section className="form-parent">
      <FormModal
        textInputs={[
          {
            type: "text",
            placeHolder: "email",
            value: email,
            onChangeHandler: (e) => {
              setEmail(e.target.value);
            },
          },
          {
            type: "password",
            placeHolder: "password",
            value: password,
            onChangeHandler: (e) => {
              setPassword(e.target.value);
            },
          },
        ]}
        btnSubmitTxt="Login"
        onSubmitHandler={onSubmitHandler}
        title="Login"
      />
    </section>
  );
};

export default Login;
