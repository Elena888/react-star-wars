import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchData, fetchDataHomeWorld, fetchDataFilms, addFavorites, removeFavorites, fetchFavorites } from "../../actions";

import HeroData from './heroData';
import HeroTabs from './heroTabs';
import '../../styles/pages/HeroDetails.scss'

const API_URL = 'https://swapi.dev/api/people'

class HeroDetails extends React.Component {

    componentDidMount(){
        const {fetchData, fetchDataHomeWorld, fetchDataFilms, fetchFavorites, auth} = this.props;
        const id = this.props.match.params.id;
        const url = `${API_URL}/${id}`;
        fetchData(url)
            .then(res => {
                fetchDataHomeWorld(res.homeworld)
                fetchDataFilms(res.films)
                return res
            })
            if(auth.uid) {
                fetchFavorites();
            }
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

    renderFavoritesButton = () => {
        const {auth, favorites} = this.props;
        const idHero = this.props.match.params.id;

        if(auth.uid) {
            const favoriteFind = favorites && favorites.data.find(item => item.id === idHero);
            if(favoriteFind){
                return(
                    <button
                        className="ui button violet basic"
                        onClick={this.removeFavorites}
                    >
                        <i className="icon heart"/>
                        Dislike
                    </button>
                )
            }else{
                return(
                    <button
                        className="ui button violet basic"
                        onClick={this.addToFavorites}
                    >
                        <i className="heart icon outline"/>
                        Like
                    </button>

                )
            }
        }
    };

    render(){
        const {films, homeWorld} = this.props;
        const {loading, error, heroData} = this.renderData();
        
        return (
            <section className="hero-details">
                <div className="ui aligned stackable grid container">
                    <div className="row">
                        <div className="six wide column">
                            {
                                error ?
                                    <p>Sorry! There was an error loading hero details</p>
                                :
                                    <HeroData
                                        heroData={heroData}
                                        renderButton={this.renderFavoritesButton}
                                        loading={loading}
                                    />
                            }
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

HeroDetails.propTypes = {
    hero: PropTypes.object,
    homeWorld: PropTypes.object,
    films: PropTypes.object,
    favorites: PropTypes.object,
    auth: PropTypes.object,
  };

const mapStateToProps = (state) => {
    return {
        hero: state.data,
        homeWorld: state.homeWorld,
        films: state.films,
        favorites: state.favorites,
        auth: state.firebase.auth,
    }
};
export default connect(
    mapStateToProps, 
    { fetchData, fetchDataHomeWorld, fetchDataFilms, addFavorites, removeFavorites, fetchFavorites }
)(HeroDetails)

