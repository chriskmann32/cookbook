import classes from "./Homepage.module.css";
import { useNavigate } from "react-router-dom";

function Homepage() {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/Select";
    navigate(path);
  };

  return (
    <div className={classes.main}>
      <p className={classes.mainText}>COOKBOOK</p>
      <button className={classes.button_item} onClick={routeChange}>
        Let's Fucking Cook
      </button>
    </div>
  );
}

export default Homepage;
