/* running nodemon restarts server when db.json changes */
import { useState, useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { CardContext } from "./context/card.context";
import "./App.css";
import axios from "axios";
import CardLibrary from "./pages/CardLibrary";
import NavigationBar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import DeckBuilder from "./pages/DeckBuilder";
import { BACKEND_URL } from "./services/BACKEND_URL.JS";
import { DragDropContext } from "react-beautiful-dnd";
import IntroPage from "./pages/IntroPage";

const App = () => {
  const { cards, getDecks, decks, setDecks } = useContext(CardContext);
  const [introVisible, setIntroVisible] = useState(true);
  const [deckId, setDeckId] = useState(0);

  const handleSlideUpComplete = () => {
    setIntroVisible(false);
  };



  const addCardToDeck = (cardId, deckId) => {
    console.log("Addding card to deck ===>", cardId, deckId);
    axios
      .get(`${BACKEND_URL}/decks/${deckId}`)
      .then((response) => {
        let thisDeckCards = [...response.data.cards];
        // Check if the deck already has 3 of the same card
        let sameCardCount = thisDeckCards.filter((id) => id === cardId).length;
        if (sameCardCount < 3) {
          thisDeckCards.push(cardId);
          axios
            .put(`${BACKEND_URL}/decks/${deckId}`, {
              ...response.data,
              cards: thisDeckCards,
            })
            .then((response) => {
              console.log("Updated Deck", response.data);
              getDecks();
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log(
            "You can't have more than 3 of the same card in your deck."
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeCard = (cardToRemove, deck) => {
    console.log("Deleting card from deck===>", cardToRemove, deck);

    axios
      .get(`${BACKEND_URL}/decks/${deck}`)
      .then((response) => {
        let thisDeckCards = [...response.data.cards];
        thisDeckCards.splice(cardToRemove, 1);
        console.log("These are the new cards");
        axios
          .put(`${BACKEND_URL}/decks/${deck}`, {
            ...response.data,
            cards: thisDeckCards,
          })
          .then((response) => {
            console.log("Updated Deck", response.data);
            getDecks();
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDragStart = (e, cardId) => {
    console.log("Starting drag", cardId);

    e.dataTransfer.setData("text/plain", cardId);
  };

  const handleDrop = (e) => {
    console.log("DROPPPING!!!");
    e.preventDefault();

    const cardId = e.dataTransfer.getData("text/plain");

    addCardToDeck(Number(cardId), deckId);
  };

  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="App">
     {introVisible && <IntroPage onSlideUpComplete={handleSlideUpComplete} />}
      <NavigationBar />
      <Sidebar setDeckId={setDeckId} />

      <DragDropContext>
        <div className="app-body">
          <Routes>
            <Route
              path="/deck/:deckId"
              element={
                <DeckBuilder
                  removeCard={removeCard}
                  setDeckId={setDeckId}
                  handleDrop={handleDrop}
                  handleOnDragOver={handleOnDragOver}
                />
              }
            />
          </Routes>

          <CardLibrary
            cards={cards}
            addCardToDeck={addCardToDeck}
            deckId={deckId}
            handleOnDragOver={handleOnDragOver}
            handleDragStart={handleDragStart}
            // onDragEnd={onDragEnd}
          />
        </div>
      </DragDropContext>
    </div>
  );
};

export default App;
