import React from 'react'
import Navber from '../component/navber/Navber'
function Layout(props) {
    return (
        <div>
            <Navber />
            <div className="main">
            {props.children}
            </div>
        </div>
    )
}

export default Layout
