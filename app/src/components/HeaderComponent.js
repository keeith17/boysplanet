import React from 'react';
import { Link } from 'react-router-dom';

import Title from '../images/ittle.png';

const HeaderComponent = () => {
    const onClickReload=()=>{
            window.location.reload();        
    }
    return (
        <header id="header">
            <div className="header-gap">
                <div className="header-wrap">
                    <div className="logo">
                        <Link to="/"><img src={Title} alt="Title" /></Link>
                    </div>
                    <div className="reloading">
                        <div className="reloading-wrap"><i className="material-icons" onClick={onClickReload}>refresh</i></div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default HeaderComponent;