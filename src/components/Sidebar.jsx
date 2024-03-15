import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CardContext } from "../context/card.context";
import { Button, Form, ListGroup } from "react-bootstrap";
import { BACKEND_URL } from "../services/BACKEND_URL.JS";
import axios from "axios";
import "./Sidebar.css";

const Sidebar = ({ setDeckId }) => {
  const { decks, setDecks, getDecks } = useContext(CardContext);

  const navigate = useNavigate();

  const [newDeckName, setNewDeckName] = useState("");

  const addDeck = () => {
    /* const newDeckName = prompt("Enter deck name"); */
    if (newDeckName !== "") {
      axios
        .post(`${BACKEND_URL}/decks`, { name: newDeckName, cards: [] })
        .then((response) => {
          console.log("New Deck", response.data);
          getDecks();
        })
        .catch((err) => {
          console.log(err);
        });
      setNewDeckName("");
    }
  };

  const removeDeck = (deckToRemove) => {
    axios
      .delete(`${BACKEND_URL}/decks/${deckToRemove}`)
      .then((response) => {
        console.log("Deletion response", response.data);
        setDecks((prevDecks) =>
          prevDecks.filter((deck) => deck.id !== deckToRemove)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="sidebar">
      <h2 className="deck-title">ALL DECKS</h2>

      <hr style={{ borderColor: "white", borderWidth: "2px" }} />

      <form className="deck-input-container" onSubmit={(e) => { e.preventDefault(); addDeck(); }}>
        <input
          className="deck-name-input"
          type="text"
          value={newDeckName}
          onChange={(e) => setNewDeckName(e.target.value)}
          placeholder="Enter deck name"
        />
        <button className="add-deck-button" type='submit'>
          +
        </button>
        </form>
      

      <ul className="decks-ul">
        {decks.map((deck) => (
          <li key={deck.id}>

            <div className="deck-link-container">
            
                <Link className="deck-link" to={`/deck/${deck.id}`}>
                <div className="deck-name-container">
                  <h3
                    className="deck-name-txt"
                    onClick={() => setDeckId(deck.id)}
                  >
                    {deck.name}
                  </h3>
                  </div>
                </Link>
             
              <Link
                className="deck-x"
                variant="danger"
                onClick={() => removeDeck(deck.id)}
              >
                X
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
