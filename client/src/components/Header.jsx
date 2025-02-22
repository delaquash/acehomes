import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import  {Link}  from "react-router-dom";

const Header = () => {
  const {  currentUser } = useSelector((state)=> state.user)
  return (
    <header className="bg-slate-200 shadow-md">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
          <Link to="/">
            <h1 className="font-bold text-sm sm:text-xl flex flex-wrap gap-4">
                <span className="text-slate-500">Delaquash</span>
                <span className="text-slate-700">Estate</span>
            </h1>
            </Link>
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
            <input type="text" className="bg-transparent focus:outline-none w-74 sm:w-64" placeholder="Search..."/>
            <FaSearch className="text-slate-600"/>
        </form> 
        <ul className="flex gap-4 font-bold text-lg">
          <Link to="/home">
            <li className="hidden sm:inline text-slate-700 hover:underline">Home</li>
          </Link>
          
          <Link to="/about">
          <li className="hidden sm:inline text-slate-700 hover:underline">About</li>
          </Link>
          
          <Link to="profile">
          { currentUser ? (
            <image src={ currentUser.avatar} className="rounded-full h-7 w-7 object-cover" 
            alt="Profile" />
          ) : (
            <li className=" text-slate-700 hover:underline">Sign In</li>
          )}

          {/* <li></li> */}
          </Link>
 
        </ul>

        </div>
    </header>
  )
}

export default Header