import { Link } from "react-router-dom";
import "../assets/css/notfound.css"; // optional if you want separate CSS

function NotFoundPage() {
  return (
    <div className="notfound-container">
      <h1>404</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/login" className="notfound-btn">Back to Home</Link>
    </div>
  );
}

export default NotFoundPage;
