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
                    <div className="guide">
                        <p>
                        실제 투표가 아닌 여론 조사 서비스입니다.
                        </p>
                        <p>
                        크롬 또는 사파리로 접속하세요.
                        </p>
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