import { useNavigate } from "react-router-dom";
import classes from "./Select.module.css";
import { useState } from "react";

function Select() {
  const tods = ["BREAKFAST", "LUNCH", "DINNER", "DESSERT", "DRINK"];
  const mainCats = ["MEAT", "FISH", "VEGGIE", "PASTA"];
  const [todSelect, setTodSelect] = useState("TIME");
  const [mainCatSelect, setMainCatSelect] = useState("CATEGORY");

  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/Choose";
    navigate(path, { state: { tod: todSelect, main: mainCatSelect } });
  };

  function listValsCat(value, index, array) {
    return (
      <button
        onClick={activeChoiceCat}
        className={classes.select_item}
        key={value}
        value={value}
      >
        {value}
      </button>
    );
  }

  function listValsTod(value, index, array) {
    return (
      <button
        onClick={activeChoiceTod}
        className={classes.select_item}
        key={value}
        value={value}
      >
        {value}
      </button>
    );
  }

  function activeChoiceCat(event) {
    var els = document.getElementsByClassName(
      classes["select_item_cat--active"]
    );
    for (let i = 0; i < els.length; i++) {
      els[i].classList.remove(classes["select_item_cat--active"]);
    }
    event.currentTarget.classList.toggle(classes["select_item_cat--active"]);
    setMainCatSelect(event.currentTarget.value);
  }

  function activeChoiceTod(event) {
    console.log("clicked");
    var els = document.getElementsByClassName(
      classes["select_item_tod--active"]
    );
    for (let i = 0; i < els.length; i++) {
      els[i].classList.remove(classes["select_item_tod--active"]);
    }
    event.currentTarget.classList.toggle(classes["select_item_tod--active"]);
    setTodSelect(event.target.value);
  }

  return (
    <div className={classes.main}>
      <p className={classes.mainText}>SELECT</p>
      <div className={classes.select_container}>
        <div className={classes.select_base}>
          <button
            onClick={activeChoiceCat}
            className={`${classes["select_item_cat--active"]} ${classes.select_item}`}
            key={"CATEGORY"}
            value={"CATEGORY"}
          >
            CATEGORY
          </button>
          {mainCats.map(listValsCat)}
        </div>
        <div className={classes.select_base}>
          <button
            onClick={activeChoiceTod}
            className={`${classes["select_item_tod--active"]} ${classes.select_item}`}
            key={"TIME"}
            value={"TIME"}
          >
            TIME
          </button>
          {tods.map(listValsTod)}
        </div>
        <div className={classes.select_base}>{}</div>
        <div className={classes.sentence_container}>
          <div className={classes.sentence}>
            COOK A{" "}
            <div className={classes.sentence_select}>{mainCatSelect}</div> FOR{" "}
            <div className={classes.sentence_select}>{todSelect}</div>
          </div>
        </div>
        <button onClick={routeChange} className={classes.confirmButton}>
          CONFIRM
        </button>
      </div>
    </div>
  );
}

export default Select;
