import React from 'react'
import { connect } from 'react-redux'

import { fetchData, fetchDataHomeWorld, fetchDataFilms } from "../../actions";
import Loading from '../../components/Loading'
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
  }

  render(){
    
    const {loading, error, heroData} = this.renderData()
    
    if (error) {
      return <p>Sorry! There was an error loading hero details</p>;
    }
    return (
      <section className="hero-details">
        <div className="ui container">

          {
             loading ?
             <Loading loading={loading} />
             :
             <div className="ui grid">
              <div className="sixteen wide column">
                <div className="ui middle aligned selection list">
                  <HeroData heroData={heroData} />
                </div>
                <HeroTabs
                  films={this.props.films}
                  homeWorld={this.props.homeWorld}
                />
              </div>
            </div>
          }
        </div>
      </section>
    )
  }
};

const mapStateToProps = (state) => {
  return {
      hero: state.data,
      homeWorld: state.homeWorld,
      films: state.films
  }
};

export default connect(mapStateToProps, { fetchData, fetchDataHomeWorld, fetchDataFilms })(HeroDetails)