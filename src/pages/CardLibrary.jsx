/* import "./CardLibrary.css"; */
import "./CardLibrary.css";
import "./Cards.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  CardContainer,
  CardBody,
  CardItem,
} from "../components/ui/3d-card.tsx";
import {
  Button,
  Card,
  ListGroup,
  Pagination,
  Navbar,
  Form,
  FormControl,
} from "react-bootstrap";
import CardDetails from "./CardDetail.jsx";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Dropdown from "react-bootstrap/Dropdown";
import { MdFilterListAlt } from "react-icons/md";

const CardLibrary = ({
  cards,
  addCardToDeck,
  deckId,
  handleOnDragOver,
  handleDragStart,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("");

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setShowModal(true);
    console.log("Card clicked", card, showModal);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const cardsPerPage = 12;

  console.log("this is deckId", deckId);

  // Function to update searchTerm based on user input
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
    setCurrentPage(1); // Reset to the first page when filter changes
  };

  // Filter cards based on search term
  /* const filteredCards = searchTerm
    ? cards.filter((card) =>
        card.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : cards; */

  // Function to filter cards by search term and selected filter attribute
  const getFilteredCards = (cards, searchTerm, filter) => {
    let result = cards;
    if (searchTerm) {
      result = result.filter((card) =>
        card.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filter) {
      result = result.filter((card) => {
        switch (filter) {
          case "All":
            return true; // Show all cards
              case "1":
              case "2":
              case "3":
              case "4":
              case "5":
              case "6":
              case "7":
              case "8":
              case "9":
              case "10":
            return card.level === filter;

          case "creature":
            return card.type === "creature";
          case "artifact":
            return card.type === "artifact";
          // Add more cases for each filter option
          default:
            return true; // If no filter is selected, do not filter out any cards
        }
      });
    }
    return result;
  };

  // Compute the filtered cards based on search term and selected filter
  const filteredCards = getFilteredCards(cards, searchTerm, filter);

  // Get current cards
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);

  // Change page
  /*  const paginate = (direction) => {
    if (
      direction === "next" &&
      currentPage < Math.ceil(cards.length / cardsPerPage)
    ) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }; */

  const paginate = (direction) => {
    if (
      direction === "next" &&
      currentPage < Math.ceil(filteredCards.length / cardsPerPage)
    ) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div className="card-library">
        <h1 className="card-library-title">CARD LIBRARY</h1>
        <nav className="cd-navbar">
          <div className="pagination">
            <IoIosArrowBack
              size={35}
              className="prev"
              onClick={() => paginate("prev")}
            />
            <div className="middle-nav-cd">
              <input
                type="text"
                placeholder="Card Search"
                className="card-search"
                value={searchTerm}
                onChange={handleSearchChange}
              />

              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  <MdFilterListAlt id="filter-icon" />
                </Dropdown.Toggle>

                <Dropdown.Menu id="dropdown-menu">
                  <Dropdown.Item id="dropdown-item" onClick={() => handleFilterChange("All")}>
                    All
                  </Dropdown.Item>
                  <Dropdown.Header>By Level</Dropdown.Header>
                  {[...Array(10)].map((e, i) => (
                    <Dropdown.Item id="dropdown-item" key={i} onClick={() => handleFilterChange(String(i + 1))}>
                      {i + 1}
                    </Dropdown.Item>
                  ))}
                
                  {/* Add more dropdown items for additional attributes as needed */}
                </Dropdown.Menu>
              </Dropdown>

            </div>
            <IoIosArrowForward
              size={35}
              className="next"
              onClick={() => paginate("next")}
            />
          </div>
        </nav>

        <div className="cardContainer" onDragOver={(e) => handleOnDragOver(e)}>
          {currentCards.map((card, index) => (
            <div
              key={index}
              draggable
              onDragStart={(e) => handleDragStart(e, card.id)}
            >
              <CardContainer className="inter-var" key={index} draggable>
                <CardBody
                  className="cardBody"
                  onDragStart={(e) => handleDragStart(e)}
                >
                  <CardItem as="p" className="cardName">
                    {card.title}
                  </CardItem>
                  <CardItem translateZ="50" className="cardItem">
                    <img
                      src={card.imageUrl}
                      alt={card.name}
                      onClick={() => {
                        console.log("CardContainer clicked");
                        handleCardClick(card);
                      }}
                    />
                  </CardItem>
                  <div className="add-cc">
                    <CardItem
                      translateZ={20}
                      as="button"
                      className="add-card-button"
                      onClick={(e) => {
                        console.log("Button clicked", card.id, deckId);
                        addCardToDeck(card.id, deckId);
                      }}
                    >
                      Add to Deck
                    </CardItem>
                    <CardItem
                      translateZ={20}
                      as="button"
                      className="add-card-button"
                      onClick={(e) => {
                        console.log("Button clicked", card.id, deckId);
                        addCardToDeck(card.id, deckId);
                      }}
                    >
                      Buy Card
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>
            </div>
          ))}
        </div>

        {selectedCard && (
          <CardDetails
            show={showModal}
            handleClose={handleCloseModal}
            card={selectedCard}
          />
        )}
      </div>
    </div>
  );
};
export default CardLibrary;
