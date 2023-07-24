import classes from "./Instructions.module.css";
import { useState, useEffect } from "react";

function Instructions(props) {
  const id = props.id;
  const [instructions, setInstructions] = useState([]);
  //  const [currPage, setCurrPage] = useState(1);

  // function changePage() {
  //   setCurrPage(document.getElementById("page").value);
  // }

  async function getItem() {
    const response = await fetch("/express_backend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        typeString: "GET INSTRUCTIONS",
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
      var instructionHold = [];
      for (var i = 0; i < res.result.length; i++) {
        instructionHold[i] = res.result[i];
      }
      setInstructions([...instructionHold]);
    });
  }, []);

  // function selectedPage() {
  //   return (
  //     <div className={classes.item_container}>
  //       <div className={classes.item_text}>
  //         {instructions[currPage - 1].step}
  //       </div>
  //     </div>
  //   );
  // }

  function loadPages(value, index, array) {
    return (
      <div className={classes.item_container}>
        <div className={classes.item_text}>
          {index + 1 + ". " + instructions[index].step}
        </div>
      </div>
    );
  }

  console.log(instructions);

  return (
    <div className={classes.main}>
      {/* <div className={classes.page}>
        PAGE:{" "}
        <input
          onChange={changePage}
          id="page"
          type="number"
          min="1"
          value={currPage}
          max={instructions.length.toString()}
        ></input>
      </div>
      {(instructions == undefined) | (instructions.length == 0)
        ? null
        : selectedPage()} */}
      {instructions.map(loadPages)}
    </div>
  );
}

export default Instructions;
