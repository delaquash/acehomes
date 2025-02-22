import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import OAuth from "../components/OAuth";


const SignUp = () => {
    const [formData, setFormData ] = useState({})
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          setLoading(true);
          const res = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
          const data = await res.json();
          console.log(data);
          if (data.success === false) {
            setLoading(false);
            setError(data.message);
            return;
          }
          setLoading(false);
          setError(null);
          navigate('/sign-in');
        } catch (error) {
          setLoading(false);
          setError(error.message);
        }
      };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={handleChange}
          type="text"
          id="username"
          className="border p-3 rounded-lg"
          placeholder="Username"
        />
        <input
          onChange={handleChange}
          type="email"
          id="email"
          className="border p-3 rounded-lg"
          placeholder="Email"
        />
        <input
          onChange={handleChange}
          type="password"
          id="password"
          className="border p-3 rounded-lg"
          placeholder="Password"
        />
        <button 
            disabled={loading}
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? "Loading..." : "Sign In"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">
            Sign Up
            </span>
        </Link>
      </div>
      <div className="flex items-center justify-center">
        {error && <p className="text-red-700">{error.message}</p>}
      </div>
    </div>
  );
}

export default SignUp