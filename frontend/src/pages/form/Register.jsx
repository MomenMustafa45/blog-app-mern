import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import FormModal from "../../components/form-modal/FormModal";
import { registerUser } from "../../redux/apiCalls/authApiCall";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../redux/slices/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const { messageRegister } = useSelector((state) => state.auth);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (userName.length === 0) return toast.error("Username is required!");
    if (email.length === 0) return toast.error("Email is required!");
    if (password.length === 0) return toast.error("Password is required!");

    dispatch(registerUser({ userName, email, password }));
  };

  const navigate = useNavigate();

  if (messageRegister) {
    swal({
      title: messageRegister,
      icon: "success",
    }).then((isOk) => {
      if (isOk) {
        // Go to Login
        navigate("/login");
        dispatch(authActions.register(null));
      }
    });
  }

  return (
    <section className="form-parent">
      <FormModal
        textInputs={[
          {
            type: "text",
            placeHolder: "UserName",
            value: userName,
            onChangeHandler: (e) => {
              setUserName(e.target.value);
            },
          },
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
            placeHolder: "Paswword",
            value: password,
            onChangeHandler: (e) => {
              setPassword(e.target.value);
            },
          },
        ]}
        btnSubmitTxt="Register"
        onSubmitHandler={onSubmitHandler}
      />
    </section>
  );
};

export default Register;
