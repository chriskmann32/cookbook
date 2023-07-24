import { useEffect, useState } from "react";
import classes from "./ChooseItem.module.css";
import { redirect, useNavigate } from "react-router-dom";

function ChooseItem(props) {
  const tod = props.tod;
  const main = props.main;
  const type = props.type;

  const [items, setItems] = useState([]);

  let navigate = useNavigate();
  const routeChange = (id, servings) => {
    let path = "/Recipe";
    navigate(path, { state: { id, servings } });
  };

  async function getTypes(tod, main, type) {
    const response = await fetch("/express_backend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        typeString: "GET ITEMS BY TYPE",
        tod,
        mainCat: main,
        type,
      }),
    });
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  }

  useEffect(() => {
    getTypes(tod, main, type).then((res) => {
      var itemHold = [];
      for (var i = 0; i < res.result.length; i++) {
        var item = {
          name: res.result[i].recipe_name,
          rating: res.result[i].rating,
          cook_time: res.result[i].cook_time,
          id: res.result[i].recipe_id,
          servings: res.result[i].servings,
        };
        itemHold[i] = item;
      }
      setItems([...itemHold]);
    });
  }, [type]);

  function listValsItems(value, index, array) {
    const hrs =
      Math.floor(value.cook_time / 60) > 0
        ? `${Math.floor(value.cook_time / 60)} Hrs`
        : "";
    const mins = value.cook_time % 60 > 0 ? `${value.cook_time % 60} Mins` : "";
    const cook_time_str = `${hrs} ${mins}`;
    return (
      <button
        className={classes.item}
        key={value.name}
        onClick={() => routeChange(value.id, value.servings)}
      >
        <div className={classes.item_name}>{value.name}</div>
        <div className={classes.item_rating}>
          {value.rating > 0
            ? String.fromCodePoint("0x2B50").repeat(value.rating)
            : String.fromCodePoint("0x2606")}
        </div>
        <div className={classes.item_time}>{cook_time_str}</div>
      </button>
    );
  }

  return (
    <div className={classes.item_container}>
      <div className={classes["item--main"]}>
        <div className={classes["item_name--main"]}>NAME</div>
        <div className={classes["item_rating--main"]}>RATING</div>
        <div className={classes["item_time--main"]}>COOK TIME</div>
      </div>
      {items.map(listValsItems)}
    </div>
  );
}

export default ChooseItem;
