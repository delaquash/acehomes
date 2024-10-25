import {GoogleAuthProvider, getAuth, signInWithPopup}  from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";


const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleSubmit= async () => {
    try {
      const provider =new GoogleAuthProvider();
      const auth = getAuth(app)
      const result = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL
        })
      })
      const data = await res.json();
      dispatch(loginSuccess(data));
      navigate("/")
    } catch (error) {
      console.log("Could not sign in", error)
    }
  }
  return (
    <button onClick={handleSubmit} type="button" className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
      Continue with google
    </button>
  )
}

export default OAuth