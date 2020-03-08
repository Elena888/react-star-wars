import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'

import { fetchData, fetchDataHomeWorld, fetchDataFilms, addFavorites, removeFavorites } from "../../actions";

import HeroData from './heroData';
import HeroTabs from './heroTabs';

class HeroDetails extends React.Component {

    componentDidMount(){
        const id = this.props.match.params.id;
        const url = `https://swapi.co/api/people/${id}`;
        this.props.fetchData(url)
            .then(res => {
                this.props.fetchDataHomeWorld(res.homeworld)
                this.props.fetchDataFilms(res.films)
                return res
            })
    }

    renderData = () => {
        const {loading, error, data} = this.props.hero;
        const {name, height, mass, hair_color, skin_color, eye_color, birth_year, gender} = data;
        const heroData = [
            {
                icon: 'pencil alternate',
                name: 'Name',
                value: name,
            },
            {
                icon: 'child',
                name: 'Height',
                value: height,
            },
            {
                icon: 'life ring',
                name: 'Mass',
                value: mass,
            },
            {
                icon: 'cut',
                name: 'Hair color',
                value: hair_color,
            },
            {
                icon: 'tint',
                name: 'Skin',
                value: skin_color,
            },
            {
                icon: 'eye',
                name: 'Eyes',
                value: eye_color,
            },
            {
                icon: 'info circle',
                name: 'Birth Year',
                value: birth_year,
            },
            {
                icon: 'user circle',
                name: '',
                value: gender,
            }]

        return {heroData, loading, error}
    };

    addToFavorites = () => {
        const {addFavorites, hero: {data}} = this.props;
        const id = this.props.match.params.id;
        const dataHero = {
            id,
            name: data.name,
            gender: data.gender
        };
        addFavorites(dataHero)
    };

    removeFavorites = () => {
        const {removeFavorites} = this.props;
        const id = this.props.match.params.id;

        removeFavorites(id)
    };

    renderButton = () => {
        const {auth, favorites} = this.props;
        const idHero = this.props.match.params.id;

        if(auth.uid) {
            const favoriteFind = favorites && favorites.find(item => item.id === idHero);

            if(favoriteFind){
                return(
                    <button
                        className="ui black large button"
                        onClick={this.removeFavorites}
                    >
                        <i className="icon heart"/>
                        Dislike
                    </button>
                )
            }else{
                return(
                    <button
                        className="ui red large button"
                        onClick={this.addToFavorites}
                    >
                        <i className="icon heart"/>
                        Like
                    </button>

                )
            }
        }
    };


    render(){
        const {films, homeWorld} = this.props;
        const {loading, error, heroData} = this.renderData()

        if (error) {
            return <p>Sorry! There was an error loading hero details</p>;
        }
        return (
            <section className="hero-details">
                <div className="ui container">
                    <div className="ui grid">
                        <div className="six wide column">
                            <HeroData
                                heroData={heroData}
                                renderButton={this.renderButton}
                                loading={loading}
                            />
                        </div>
                        <div className="ten wide column">
                            <HeroTabs
                                films={films}
                                homeWorld={homeWorld}
                            />
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        hero: state.data,
        homeWorld: state.homeWorld,
        films: state.films,
        auth: state.firebase.auth,
        favorites: state.firestore.ordered.favorites,
    }
};
export default compose(
    connect(mapStateToProps, { fetchData, fetchDataHomeWorld, fetchDataFilms, addFavorites, removeFavorites }),
    firestoreConnect(props => {
            if (!props.auth.uid) return []

            return(
                [
                    {
                        collection: 'favorites',
                        where: [
                            ['userId', '==', props.auth.uid]
                        ],

                    }
                ]
            )
        }
    ),

)(HeroDetails)

