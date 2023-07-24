import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import classes from "./Choose.module.css";
import ChooseItem from "./page_items/ChooseItem";

function Choose() {
  const location = useLocation();
  const tod = location.state.tod;
  const main = location.state.main;

  const [subCats, setSubCats] = useState([]);
  const [typeSelect, setTypeSelect] = useState("TYPE");

  async function getTypes(tod, main) {
    const response = await fetch("/express_backend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        typeString: "GET TYPE",
        tod,
        mainCat: main,
      }),
    });
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  }

  useEffect(() => {
    getTypes(tod, main).then((res) => {
      for (var i = 0; i < res.result.length; i++) {
        subCats[i] = res.result[i].category_sub;
      }
      setSubCats([...subCats]);
    });
  }, []);

  function listValsType(value, index, array) {
    return (
      <button
        onClick={activeChoiceType}
        className={classes.select_item}
        key={value}
        value={value}
      >
        {value}
      </button>
    );
  }

  function activeChoiceType(event) {
    var els = document.getElementsByClassName(
      classes["select_item_type--active"]
    );
    for (let i = 0; i < els.length; i++) {
      els[i].classList.remove(classes["select_item_type--active"]);
    }
    event.currentTarget.classList.toggle(classes["select_item_type--active"]);
    setTypeSelect(event.currentTarget.value);
  }

  console.log(typeSelect);

  return (
    <div className={classes.main}>
      <div className={classes.mainText}>CHOOSE</div>
      <div className={classes.select_container}>
        <div className={classes.select_base}>
          <button
            onClick={activeChoiceType}
            className={`${classes["select_item_type--active"]} ${classes.select_item}`}
            key={"TYPE"}
            value={"TYPE"}
          >
            TYPE
          </button>
          {subCats.map(listValsType)}
        </div>
      </div>
      <ChooseItem tod={tod} main={main} type={typeSelect} />
    </div>
  );
}
export default Choose;
