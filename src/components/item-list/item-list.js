import React, {Component} from 'react';

import './item-list.css';

import Spinner from "../spinner/spinner";
// import SwapiService from "../../services/swapi-service";


export default class ItemList extends Component {

    // swapiService = new SwapiService();

    state = {
        itemList: null
    };

    componentDidMount() {

        const { getData } = this.props;

        getData()
            .then((people) => {
                this.setState({
                    itemList: people
                })
            })
    }

    renderItems(arr) {
        return arr.map((item) => {
            const { id } = item;
            const label = this.props.renderItem(item);

            return (
                <li className="list-group-item"
                    key={id}
                    onClick={() => this.props.onItemSelected(id)}>
                    {label}
                </li>
            )
        })
    }

    render() {

        const { itemList } = this.state;

        if (!itemList) {
            return <Spinner />
        }

        const items = this.renderItems(itemList);

        return(
            <ul className="item-list list-group">
                {items}
            </ul>
        )
    }

}