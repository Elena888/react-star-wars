import React from 'react'

const Loading = ({loading, children}) => {
    return(
        <>
        {loading && <div className="ui active centered  loader"/>}
            {children}
        </>
    )
};

export default Loading;
