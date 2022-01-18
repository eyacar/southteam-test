import React from "react";
import { v4 as uuidv4 } from "uuid";
import Card from "./Card";

import Scss from "./style/CardsPage.module.scss";

const CardsPage = ({ data }) => {
  return (
    <div className={Scss.container}>
      {data.map((card) => (
        <Card key={uuidv4()} data={card} />
      ))}
    </div>
  );
};

export default CardsPage;
