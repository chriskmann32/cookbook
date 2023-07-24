// const [ingredients, setIngredients] = useState([]);
// const [instructions, setInstructions] = useState([]);
import classes from "./Ingredients.module.css";
import { useEffect, useState } from "react";

function Ingredients(props) {
  const id = props.id;
  const servingsDefault = props.servings;
  const [ingredients, setIngredients] = useState([]);
  const [servings, setServings] = useState(servingsDefault);

  function changeServings() {
    setServings(document.getElementById("servings").value);
  }

  async function getItem() {
    const response = await fetch("/express_backend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        typeString: "GET INGREDIENTS",
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
      var ingredientHold = [];
      for (var i = 0; i < res.result.length; i++) {
        ingredientHold[i] = res.result[i];
      }
      setIngredients([...ingredientHold]);
    });
    document.getElementById("servings").value = servings;
  }, []);

  function gcd(x, y) {
    if (y == 0) {
      return x;
    }
    return gcd(y, x % y);
  }

  function findFrac(value) {
    const nums = Math.floor(value);
    var denom = 1000;
    var numerator = (value % 1) * 1000 + nums * 1000;
    denom = denom * servingsDefault;
    numerator = numerator * servings;
    const divisor = gcd(numerator, denom);
    numerator = numerator / divisor;
    denom = denom / divisor;
    const whole = Math.floor(numerator / denom);
    numerator = numerator - denom * whole;
    // console.log("W: " + whole + " N: " + numerator + " D: " + denom);
    if (numerator == 0) {
      return `${whole}`;
    } else if (whole == 0) {
      return `${numerator}/${denom}`;
    }
    return `${whole} ${numerator}/${denom}`;
  }

  function gottenItem(event) {
    event.currentTarget.classList.toggle(classes["item_container--active"]);
  }

  function listValsItems(value, index, array) {
    return (
      <div
        onClick={gottenItem}
        className={classes.item_container}
        key={value.ingredient}
      >
        <div className={classes.item_quantity}>{findFrac(value.quantity)}</div>
        <div className={classes.item_unit}>{value.unit}</div>
        <div className={classes.item_ingredient}>{value.ingredient}</div>
        <button className={classes["item_button--title"]}>CHECK</button>
      </div>
    );
  }

  return (
    <div className={classes.main}>
      <div className={classes.servings}>
        SERVINGS:{" "}
        <input
          onChange={changeServings}
          id="servings"
          type="number"
          min="1"
          max="10"
        ></input>
      </div>
      <div className={classes["item_container--title"]}>
        <div className={classes["item_quantity--title"]}>QUANTITY</div>
        <div className={classes["item_unit--title"]}>UNIT</div>
        <div className={classes["item_ingredient--title"]}>INGREDIENT</div>
        <button className={classes["item_button--title"]}>CHECK</button>
      </div>
      {ingredients.map(listValsItems)}
    </div>
  );
}

export default Ingredients;
