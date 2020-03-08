import React, {useState} from 'react'
import Loading from '../../components/Loading'

const HeroTabs = ({films, homeWorld}) => {
  const [activeTab, setActiveTab] = useState('tab1')
  const {loading: loadingFilms, error: errorFilms, data: filmsData} = films;
  const {loading: loadingHomeWorld, error: errorHomeworld, data: homeWorldData} = homeWorld;

  return (
    <>
      <div className="ui top attached tabular menu">
        <button 
          className={`item  ${activeTab === 'tab1' ? 'active': ''}`} 
          onClick={() => setActiveTab('tab1')}>
            Home world
        </button>
        <button 
          className={`item  ${activeTab === 'tab2' ? 'active': ''}`} 
          onClick={() => setActiveTab('tab2')}>
            Films
        </button>
      </div>
  
      <div className={`ui bottom attached tab segment ${activeTab === 'tab1' ? 'active': ''}`} >
      {
        errorHomeworld ?
          <p>Sorry! There was an error loading homeworld</p>
        :
          loadingHomeWorld ?
            <Loading loading={loadingHomeWorld} />
          :                    
            <div>
                <h3>Planet: {homeWorldData.name}</h3>
                <h4>Population: {homeWorldData.population}</h4>
                <h4>Climate: {homeWorldData.climate}</h4>
            </div>
        }
      </div>
      <div className={`ui bottom attached tab segment ${activeTab === 'tab2' ? 'active': ''}`} >
        {
          errorFilms ?
            <p>Sorry! There was an error loading films</p>
          :
            loadingFilms ?
              <Loading loading={loadingFilms} />
            :
              filmsData && filmsData.length > 0 && filmsData.map(item => {
                return (
                  <div key={item.title}>
                      <h4>{item.title} ({item.release_date})</h4>
                </div>
                )
              })
        }
      </div>
  </>
  )
}

export default HeroTabs;