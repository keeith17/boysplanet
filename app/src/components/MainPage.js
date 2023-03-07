import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../images/BP-title.png';


const MainPage = () => {
    return (
        <div className="main-wrap">
            <div className="content-gap">
                <div className="content-wrap">
                    <div className="logo-image">
                        <img src={Logo} alt="logo" />
                    </div>
                    <div className="buttons">
                        <div className="button-wrap">
                            <Link to="/VotePage">투표하러 가기</Link>
                        </div>
                        <div className="button-wrap">
                            <Link to="/ResultPage">결과 확인하러 가기</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainPage;