import React, {Component} from 'react';

import './people-page.css';
import ItemList from "../item-list/item-list";
import PersonDetails from "../person-details/person-details";
import SwapiService from "../../services/swapi-service";
import Row from "../row/row";
import ErrorBoundry from "../error-boundry/error-boundry";


export default class PeoplePage extends Component {

    swapiService = new SwapiService();

    state = {
        selectedPerson: 5,
    };

    onPersonSelected = (id) => {
      this.setState({
          selectedPerson: id
      })
    };

    render() {
        const itemList = (
            <ItemList
                    onItemSelected={this.onPersonSelected}
                    getData={this.swapiService.getAllPeople}
                    renderItem={(item) => `${item.name} (${item.gender}, ${item.birthYear})`}/>
        );

        const personDetails = (<PersonDetails personId={this.state.selectedPerson} />);

        return(
            <ErrorBoundry>
                <Row left={itemList} right={personDetails}/>
            </ErrorBoundry>
        )
    }

}