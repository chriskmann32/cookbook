import classes from "./MainNavigation.module.css";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const MainNavigation = () => {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/";
    navigate(path);
  };
  return (
    <div>
      <div className={classes.pullMenu}>
        <div onClick={routeChange} className={classes.pullMenuItem}>
          <div className={classes.pullMenuText}>Menu</div>
        </div>
      </div>
    </div>
  );
};

export default MainNavigation;
