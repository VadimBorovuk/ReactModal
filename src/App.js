import React, {useState} from "react";
import {Modal, Select} from 'antd';

import BoxItems from "./components/BoxItems/index";
import Timer from "./components/Timer";
import './main.scss';

const {Option} = Select;

const App = () => {
    const [selectValue, setSelectValue] = useState('bank-card');
    const [visible, setVisible] = useState(true);
    const [cards, setCards] = useState([
        {id: 1, pricePre: "50", priceNext: "100", active: false},
        {id: 2, pricePre: "100", priceNext: "200", active: true},
        {id: 3, pricePre: "500", priceNext: "1000", active: false}
    ]);

    const showModal = () => setVisible(true);

    const handleCancel = () => setVisible(false);

    const changeValue = (value) => setSelectValue(value)

    const checkInfo = () => {
        let activeItem = cards.filter(card => card.active)
        let newItem = activeItem.map(item => {
            return `Пополнить на ${item.pricePre}, получить ${item.priceNext}`
        })
        alert(`
             active card:' - ${newItem}
            'selectValue' - ${selectValue}
        `)

    }

    const getBonusScore = () => {
        let activeItem = cards.filter(card => card.active)
        return activeItem.map(item => {
            return `${item.priceNext - item.pricePre}`
        })
    }

    const getActiveCard = (id) => {
        const cardsChanged = cards.map(card => {
            card.active = false;
            if (card.id === id) {
                card.active = true
            }
            return card
        });
        setCards(cardsChanged)
    }

    return (
        <div className="app">
            <button className="btn-modal__open" onClick={showModal}>
                Открыть модалку
            </button>
            <Modal
                title="+100%"
                visible={visible}
                onCancel={handleCancel}>
                <Timer/>
                <div className="modalTitle">
                    Укажите свой депозит!
                </div>
                <Select
                    onChange={changeValue}
                    name={selectValue} dropdownStyle={{background: '#3C4561', color: '#fff'}}
                    defaultValue="Банковская карта"
                    className="selectMenu">
                    <Option value="bank-card">Банковская карта</Option>
                    <Option value="bitcoin">Биткоин</Option>
                    <Option value="Expose-score">Выставить счет</Option>
                </Select>
                <BoxItems cards={cards} getActiveCard={getActiveCard}/>
                <div className="modalInfo-cash">
                    <span>$ {getBonusScore()}</span> будет зачислено вам на счет
                </div>
                <button type="button" onClick={checkInfo} className="modalBuy">Пополнить
                </button>
                <div className="modalDescription">
                    <div className="modal-descText">
                        При пополнении счета с банковской карты считание средств <br/>
                        происходит по курсу банка клиента
                    </div>
                    <a href='/' className="modal-descLink">Подробнее</a>
                </div>
            </Modal>
        </div>
    );
}

export default App;