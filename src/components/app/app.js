import React, { Component } from 'react';

import './app.css';

import Header from '../header/header';
import RandomPlanet from "../random-planet/random-planet";
import ErrorIndicator from "../error-indicator/error-indicator";
import ErrorButton from "../error-button/error-button";
import PeoplePage from "../people-page/people-page";
import ItemList from "../item-list/item-list";
import ItemDetails from "../item-details/item-details";
import SwapiService from "../../services/swapi-service";
import Row from "../row/row";
import ErrorBoundry from "../error-boundry/error-boundry";


export default class App extends Component {

    swapiService = new SwapiService();

    state = {
        showRandomPlanet: true,
        hasError: false
    };

    toggleRandomPlanet = () => {
        this.setState((state) => {
            return {
                showRandomPlanet: !state.showRandomPlanet
            }
        });
    };

    componentDidCatch() {
        this.setState({
            hasError: true
        })
    }

    render() {

        if (this.state.hasError) {
            return <ErrorIndicator />
        }

        const planet = this.state.showRandomPlanet ?
            <RandomPlanet/> :
            null;

        const { getPerson, getStarship } = this.swapiService;

        const personDetails = (
            <ItemDetails
                itemId={11}
                getData={getPerson}/>
        );

        const starshipDetails = (
            <ItemDetails
                itemId={5}
                getData={getStarship}/>
        );

        return (
            <ErrorBoundry>
                <div className="stardb-app">
                    <Header />
                    {/*{ planet }*/}

                    {/*<div className="row mb2 button-row">*/}
                        {/*<button*/}
                            {/*className="toggle-planet btn btn-warning btn-lg"*/}
                            {/*onClick={this.toggleRandomPlanet}>*/}
                            {/*Toggle Random Planet*/}
                        {/*</button>*/}
                        {/*<ErrorButton />*/}
                    {/*</div>*/}

                    {/*<PeoplePage />*/}

                    <Row right={starshipDetails} left={personDetails}/>

                </div>
            </ErrorBoundry>
        );
    }

}