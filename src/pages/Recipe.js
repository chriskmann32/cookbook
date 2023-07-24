import classes from "./Recipe.module.css";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import Instructions from "./page_items/Instructions";
import Ingredients from "./page_items/Ingredients";

function Recipe() {
  const location = useLocation();
  const id = location.state.id;
  const servings = location.state.servings;
  const [item, setItem] = useState({});
  const [toggle, setToggle] = useState(false);

  async function getItem() {
    const response = await fetch("/express_backend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        typeString: "GET ITEM BY ID",
        id,
      }),
    });
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  }

  useEffect(() => {
    getItem().then((res) => {
      setItem(res.result[0]);
    });
  }, []);

  function activeChoice(event) {
    const cur = event.currentTarget.classList.contains(
      classes["button_item--active"]
    );
    console.log(cur);
    var els = document.getElementsByClassName(classes["button_item--active"]);
    for (let i = 0; i < els.length; i++) {
      els[i].classList.remove(classes["button_item--active"]);
    }
    event.currentTarget.classList.toggle(classes["button_item--active"]);
    if (!cur) {
      setToggle(!toggle);
    }
  }

  const hrs =
    Math.floor(item.cook_time / 60) > 0
      ? `${Math.floor(item.cook_time / 60)} Hrs`
      : "";
  const mins = item.cook_time % 60 > 0 ? `${item.cook_time % 60} Mins` : "";
  const cook_time_str = `${hrs} ${mins}`;

  return (
    <div className={classes.main}>
      <p className={classes.mainText}>{item.recipe_name}</p>
      <div className={classes.item} key={item.recipe_name}>
        <span className={classes.item_rating}>
          {item.rating != 0
            ? String.fromCodePoint("0x2B50").repeat(item.rating)
            : String.fromCodePoint("0x2606")}
        </span>
        <div className={classes.item_time}>{cook_time_str}</div>
      </div>
      <div>
        <button
          className={`${classes.button_item} ${classes["button_item--active"]}`}
          onClick={activeChoice}
        >
          INGREDIENTS
        </button>
        <button className={classes.button_item} onClick={activeChoice}>
          INSTRUCTIONS
        </button>
      </div>
      {toggle ? (
        <Instructions id={id} />
      ) : (
        <Ingredients id={id} servings={servings} />
      )}
    </div>
  );
}

export default Recipe;
