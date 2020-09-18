import React from 'react';
import './style.scss';
import BoxItem from "./BoxItem";

const BoxItems = ({cards,getActiveCard}) => {

    return (
        <div className="modalCards">
            {cards.map((card, index) => {
                return (
                    <BoxItem key={index}
                             getActiveCard={() => getActiveCard(card.id)}
                             pricePre={card.pricePre}
                             priceNext={card.priceNext}
                             active={card.active}/>
                )
            })}
        </div>
    );
};

export default BoxItems;