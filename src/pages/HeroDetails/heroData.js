import React from 'react'

const HeroData = ({heroData}) => {
  return (
      heroData.map((item, index) => {
        
        if(index === 0){
          return <h1 key={item.name}>{item.value}</h1>
        }else{
          return (
            <div className="item" key={item.name}>
                <i className={`${item.icon} icon large middle aligned`} />
                <div className="content">
                  <p>{`${item.value} ${item.name}`}</p>
                </div>
              </div>
          )
        }
      })
  )
}

export default HeroData;