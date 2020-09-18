import React from 'react';
import './style.scss'

const BoxItem = ({getActiveCard, pricePre, priceNext, active}) => {
    return (
        <div className={active ? 'modelItem active' : 'modelItem'} onClick={getActiveCard}>
            <div className="modelItem-pre">
                <div className="pre-title">Пополнить на</div>
                <div className="pre-prцice">$ {pricePre}</div>
            </div>
            <div className="modelItem-next">
                <div className="next-title">Получить</div>
                <div className="next-price">$ {priceNext}</div>
            </div>
        </div>
    );
};

export default BoxItem;
