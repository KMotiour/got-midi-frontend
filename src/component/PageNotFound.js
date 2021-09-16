import React from 'react'

import Navber from './navber/Navber'
function PageNotFound() {
    return (
        <div>
            <div>
                <Navber />
            </div>
            <div>
            <h2>Not Found</h2>
            <p>The requested resource was not found on this server.</p>
            </div>
            
        </div>
    )
}

export default PageNotFound
