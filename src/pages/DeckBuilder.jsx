import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import {
  CardContainer,
  CardBody,
  CardItem,
} from "../components/ui/3d-card.tsx";
import CardDetails from "./CardDetail.jsx";
import { CardContext } from "../context/card.context";
import "./DeckBuilder.css";
import "./Cards.css";

const DeckBuilder = ({ removeCard, setDeckId, handleDrop, handleOnDragOver }) => {
  const { decks, cards } = useContext(CardContext);

  const [deck, setDeck] = useState(null);

  const [theseCards, setTheseCards] = useState([]);

  const { deckId } = useParams();

  const [selectedCard, setSelectedCard] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setShowModal(true);
    console.log("Card clicked", card, showModal);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (decks.length === 0) {
      setDeck(null);
      setTheseCards([]);
      setDeckId(deckId);
    } else {
      let thisDeck = decks.find((deck) => deck.id == deckId);
      console.log("Found deck ===>", thisDeck, deckId);
      if (thisDeck) {
        setDeck(thisDeck);
        let theseCards = cards.filter((card) =>
          thisDeck.cards.includes(card.id)
        );
        console.log("These are the cards ===>", theseCards);
        setTheseCards(theseCards);
        setDeckId(deckId);
      } else {
        setDeck(null);
        setTheseCards([]);
        setDeckId(deckId);
      }
    }
  }, [deckId, decks, cards]);

  return (
    <div className="card-library" onDrop={(e) => handleDrop(e)} onDragOver={(e) => handleOnDragOver(e)}>
    <h1 className="deck-builder-title">DECK BUILDER</h1>
      <nav className="db-navbar">
      <h2 className="db-name"> DECK NAME: {deck && deck.name}</h2>
      <h2 className="db-name"> CARD COUNT: {deck ? deck.cards.length : 0}</h2>
      </nav>

        <div
          className="cardContainer"
          
        >
          {deck && (
            <>
              {deck.cards.map((cardId, index) => {
                // Get the card data using the card ID
                const card = theseCards.find((card) => card.id == cardId);

                if (!card) {
                  console.error(`Card with ID ${cardId} not found`);
                  return null;
                }

                return (
                  <CardContainer key={`${card.id}${index}`}>
                    <CardBody className="cardBody">
                      <CardItem as="p" translateZ="1000" className="cardName">
                        {card.title}
                      </CardItem>
                      <CardItem translateZ="1000" className="cardItem">
                        <img
                          src={card.imageUrl}
                          alt={card.title}
                          onClick={() => {
                            console.log("CardContainer clicked");
                            handleCardClick(card);
                          }}
                        />
                      </CardItem>
                      <button
                        className="delete-button"
                        variant="danger"
                        onClick={() => removeCard(index, deck.id)}
                      >
                        x
                      </button>
                    </CardBody>
                  </CardContainer>
                );
              })}
            </>
          )}

        </div>


      {selectedCard && (
        <CardDetails
          show={showModal}
          handleClose={handleCloseModal}
          card={selectedCard}
        />
      )}
    </div>
  );
};

export default DeckBuilder;
