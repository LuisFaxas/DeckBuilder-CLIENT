import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./CardDetails.css";

const CardDetails = ({ card, show, handleClose }) => {
  console.log("CardDetails", show);
  return (
    <Modal show={show} onHide={handleClose} className="modal-container">
      <Modal.Header className="modal-header" closeButton>
        <Modal.Title>{card.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <img className="details-img" src={card.imageUrl} alt={card.title} />
        <div className="modal-content">
          <p> Type: {card.types} </p>
          <hr className="line-d"></hr>
          <p> Level: {card.level}</p>
          <hr className="line-d"></hr>
          <div className="power-div">
            <p> Attack: {card.atk}</p>
            <p> Defense: {card.def}</p>
          </div>
          <hr className="line-d"></hr>
          <p> Attribute: {card.attribute}</p>
          
          <div className="description-div">
            <p>Description: </p>
            <p>{card.lore}</p>
          </div>
          <div className="tips-div">
          <p>Tips:</p>
            {card.tips.map((tip, index) => (
              <p key={index}>{tip.value}</p>
            ))}
          </div>
          
        </div>
        
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CardDetails;

/* {
  "id": 30438,
  "title": "\"A\" Cell Breeding Device",
  "wikiUrl": "/wiki/%22A%22_Cell_Breeding_Device",
  "image": "ACellBreedingDevice-FOTB-EN-C-UE.png",
  "lore": "During each of your Standby Phases, put 1 A-Counter on 1 face-up monster your opponent controls.",
  "archetypesRelated": [
    "Alien"
  ],
  "actions": [
    "Distributes A-Counter(s)"
  ],
  "effectTypes": [
    "Trigger-like"
  ],
  "imageUrl": "https://vignette1.wikia.nocookie.net/yugioh/images/1/1d/ACellBreedingDevice-FOTB-EN-C-UE.png",
  "tips": [
    {
      "value": " This card can be searched by \"Dark Sage\", \"Ancient Gear Drill\", \"Alchemic Magician\", \"Angmarl the Fiendish Monarch\", \"Left Arm Offering\", \"Watch Dog\" and \"The Despair Uranus\"."
    },
    {
      "value": " With \"Alien Telepath\" and \"\"A\" Cell Incubator\" on the field combined with this, you can keep saving up A-Counters until it's destroyed."
    },
    {
      "value": " Use \"Light of Intervention\" or \"Ceasefire\" to get your opponent's monsters face-up to use \"\"A\" Cell Breeding Device\" each turn."
    }
  ],
  "sets": [
    {
      "number": "FOTB-EN043",
      "setName": "Force of the Breaker",
      "rarity": "Common"
    } */

/* {
      "id": 15856,
      "title": "8-Claws Scorpion",
      "wikiUrl": "/wiki/8-Claws_Scorpion",
      "image": "8ClawsScorpion-GLD1-EN-C-LE.png",
      "lore": "Once per turn, you can flip this card into face-down Defense Position. When this card attacks an opponent's face-down Defense Position monster, this card's ATK becomes 2400 during damage calculation only.",
      "attribute": "DARK",
      "actions": [
        " Flips itself face-down",
        " Changes Battle Positions"
      ],
      "types": [
        "Insect",
        "Effect"
      ],
      "level": "2",
      "atk": "300",
      "def": "200",
      "effectTypes": [
        "Ignition",
        "Trigger"
      ],
      "imageUrl": "https://vignette2.wikia.nocookie.net/yugioh/images/d/da/8ClawsScorpion-GLD1-EN-C-LE.png",
      "tips": [
        {
          "value": " This card can be searched by \"Dogu\", \"Single Purchase\", \"Temple of the Kings\", \"Ties of the Brethren\", \"Painful Escape\", \"Transmodify\", \"Sangan\", \"Rescue Ferret\", \"Mimiclay\", \"Serpentine Princess\", \"Vampire Dragon\", \"Dragunity Corsesca\", \"Ninjitsu Art of Transformation\", \"Insect Imitation\", \"Chaos Zone\", \"Mystic Tomato\", \"Gokipon\", \"Verdant Sanctuary\", Flamvell Poun\", \"Danipon\" and \"Howling Insect\"."
        },
        {
          "value": " \"Swords of Concealing Light\", \"Desertapir\", \"Book of Moon\" and \"Tsukuyomi\" can be used to switch the opponent's monsters to Defense Position."
        },
        {
          "value": " Cards that inflict Piercing damage, such as \"Fairy Meteor Crush\" or \"Big Bang Shot\" can be used with this card to inflict large amounts of damage."
        }
      ],
      "tipsTraditional": [
        {
          "value": " This card can be searched by \"Last Will\" and \"Witch of the Black Forest\"."
        }
      ],
      "sets": [
        {
          "number": "GLD1-EN007",
          "setName": "Gold Series",
          "rarity": "Common"
        },
        {
          "number": "PGD-024",
          "setName": "Pharaonic Guardian (NA)",
          "rarity": "Common"
        }
      ]
    }, */
