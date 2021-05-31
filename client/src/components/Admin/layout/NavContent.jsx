import React from 'react'

function NavContent( props ) {
    const { viewSideBar } = props
    return (
        <div>
            <button type="button" id="sidebarCollapse" className="btn btn-info  mt-5"  onClick={viewSideBar}>
                    <i className="fas fa-align-left"></i>
                        <span>Toggle Sidebar</span>
            </button> 
        </div>
 
    )
}

export default NavContent
