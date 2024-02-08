import { Link } from "react-router-dom";
import "./css/traditionalButton.css";

export function TraditionalButton({ label, buttonText, to }) {
  return (
    <div className="parent">
      <div className="tb-parent">{label}</div>
      <div>
        <Link className="tb-child" to={to}>
          {buttonText}
        </Link>
      </div>
    </div>
  );
}