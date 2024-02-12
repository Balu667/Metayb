import "./Header.css";
import { Link } from "react-router-dom";
import { useLogout } from "../../hooks";
import { useSelector } from "react-redux";

function Header() {
  const { mutate } = useLogout();
  const { profileData } = useSelector((state) => state.profile);
  return (
    <nav>
      <Link to="/" className="brandlogo">
        <img
          className="logo"
          src="https://metayb.ai/wp-content/uploads/2023/02/metayb-logo.png"
          alt="logo"
        />
      </Link>
      <button
        className="secondary-btn"
        onClick={() => mutate(profileData.user.userId)}
      >
        Logout
      </button>
    </nav>
  );
}

export default Header;
