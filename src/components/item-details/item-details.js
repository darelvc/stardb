import React, {Component} from 'react';

import './item-details.css';
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner/spinner";
import ErrorButton from "../error-button/error-button";


export default class ItemDetails extends Component {

    swapiService = new SwapiService();

    state = {
        item: null,
        loading: true
    };

    componentDidMount() {
        this.updateItem()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.itemId === this.props.itemId ) {
            this.updateItem();
        }
    }

    updateItem() {
        const { itemId } = this.props;

        if (!itemId) {
            return;
        }

        this.swapiService
            .getPerson(itemId)
            .then(item => {
                this.setState({
                    item,
                    loading: false
                })
            })
    }

    render() {

        if (!this.state.item) {
            return (
                <div className="item-details card">
                    <span>
                        Select a person from a list
                    </span>
                </div>
            )
        }

        const { itemId } = this.props;
        const { loading, item: { id }, item } = this.state;
        const loadingPerson = loading ?
            <Spinner /> :
            <ItemView item={item} />;

        return(
            <div className="item-details card">
                { loadingPerson }
            </div>
        )
    }

}


const ItemView = ({ item }) => {

    const {id, name, gender, birthYear, eyeColor} = item;

    return (
        <React.Fragment>
            <img className="person-image"
                src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
                alt={ name }/>
            <div className="card-body">
                <h4>{ name } { id }</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Gender</span>
                        <span>{ gender }</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Birth Year</span>
                        <span>{ birthYear }</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Eye Color</span>
                        <span>{ eyeColor }</span>
                    </li>
                </ul>
                <ErrorButton/>
            </div>
        </React.Fragment>
  )
};