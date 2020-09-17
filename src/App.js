import React from "react";
import {Modal, Button, Select} from 'antd';
import Timer from "./components/Timer/Timer";
import Item from "./components/Item/Item";

import './assets/styles/main.scss';

const {Option} = Select;

class App extends React.Component {
    state = {
        visible: false,
        cards: [
            {id: 1, pricePre: "50", priceNext: "100", active: false},
            {id: 2, pricePre: "100", priceNext: "200", active: true},
            {id: 3, pricePre: "500", priceNext: "1000", active: false}
        ]
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleChange = (value) => {
        alert(`${value}`);
    }

    checkInfo = () => {
        let activeItem = this.state.cards.filter(card => card.active)
        let newItem = activeItem.map(item => {
            return `Пополнить на ${item.pricePre}, получить ${item.priceNext}`
        })
        alert('active card:' + newItem)

    }

    getScore = () => {
        let activeItem = this.state.cards.filter(card => card.active)
        let todoItem = activeItem.map(item => {
            return `${item.priceNext - item.pricePre}`
        })
        return todoItem
    }

    getActiveCard = (id) => {
        const cardsChanged = this.state.cards.map(card => {
            card.active = false;
            if(card.id === id) {
                card.active = true
            }
            return card
        });

        this.setState({
            cards: cardsChanged,
        });
    }

    render() {
        const {cards} = this.state;
        return (
            <div className="app">
                <Button type="primary" onClick={this.showModal}>
                    Open Modal
                </Button>
                <Modal
                    title="+100%"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}>
                    <div className="timerBlock">
                        <div className="timerIcon"></div>
                        <Timer/>
                    </div>
                    <div className="modalTitle">
                        Укажите свой депозит!
                    </div>
                    <Select defaultValue="Банковская карта" className="selectMenu" onChange={this.handleChange}>
                        <Option value="Банковская карта">Банковская карта</Option>
                        <Option value="Биткоин">Биткоин</Option>
                        <Option value="Выставить счет">Выставить счет</Option>
                    </Select>
                    <div className="modalCards">
                        {cards.map((card, index) => {
                            return (
                                <Item key={index}
                                      getActiveCard={() => this.getActiveCard(card.id)}
                                      pricePre={card.pricePre}
                                      priceNext={card.priceNext}
                                      active={card.active}/>
                            )
                        })}
                    </div>
                    <div className="modalInfo-cash">
                        <span>$ {this.getScore()}</span> будет зачислено вам на счет
                    </div>
                    <button type="button" onClick={this.checkInfo} className="modalBuy">Пополнить
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
}

export default App;