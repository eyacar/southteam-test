import { Card as MaterialCard } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Icon from "../../../../asset/icon.png";

import Scss from "./style/Card.module.scss";

const Card = ({ data }) => {
  const { name, email, phone, location, picture } = data;
  return (
    <MaterialCard
      variant="outlined"
      sx={{
        maxWidth: 275,
        minHeight: 300,
        m: (theme) => theme.spacing(2),
        boxShadow: "3px 1px 10px rgba(0,0,0,0.3)",
      }}
    >
      <CardContent
        sx={{
          p: 0,
        }}
      >
        <div className={Scss.header}>
          <Typography sx={{ fontSize: 20, color: "white" }}>{name}</Typography>
          <img src={picture.large} alt={name} className={Scss.header__image} />
          <img src={Icon} alt="Icon editor" className={Scss.header__icon} />
        </div>
        <Typography sx={{ mb: 2 }} color="text.secondary" variant="body2">
          {email}
        </Typography>
        <Typography sx={{ mb: 2 }} color="text.secondary" variant="body2">
          {phone}
        </Typography>
        <Typography
          sx={{ mb: 1, ml: 1, mr: 1 }}
          color="text.secondary"
          variant="body2"
        >
          {location}
        </Typography>
      </CardContent>
    </MaterialCard>
  );
};

export default Card;
