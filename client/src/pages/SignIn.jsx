import { useState } from "react";
import { Link } from "react-router-dom";
import { loginStart, loginSuccess, loginEnd } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import  OAuth  from "../components/OAuth";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(loginEnd(data.message));
        return;
      }
      dispatch(loginSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(loginEnd(error.message));
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={handleChange}
          id="email"
          type="email"
          className="border p-3 rounded-lg"
          placeholder="Email.."
        />
        <input
          onChange={handleChange}
          id="password"
          type="passoword"
          className="border p-3 rounded-lg"
          placeholder="Password"
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-85 disabled:opacity-80">
          {loading ? "Loading..." : "Sign In"}
        </button>
        <OAuth /> 
      </form>
      <div className="flex gap-4 text-2xl font-bold">
        <p>Dont have an account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700">Sign Up</span>
        </Link>
      </div>
      {error && <p className="text-red-700 mt-5 text-center"></p>}
    </div>
  );
};

export default SignIn;
