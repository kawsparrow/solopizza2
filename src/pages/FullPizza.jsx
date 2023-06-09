import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FullPizza = () => {
  const [pizza, setPizza] = React.useState;

  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://642a63fcb11efeb759987bb1.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
        alert("დაფიქსირდა შეცდომა");
        navigate("/");
      }
    }

    fetchPizza().then((r) => r);
  }, []);

  if (!pizza) {
    return <>Loading...</>;
  }
  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="/" />
      <h2>{pizza.title}</h2> <br />
      <h3>შემადგენლობა: {pizza.description}</h3> <br />
      <h4>ღირებულება: {pizza.price} ლარი</h4>
    </div>
  );
};

export default FullPizza;
