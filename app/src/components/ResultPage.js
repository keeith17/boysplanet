import React from 'react';

import HeaderComponent from './HeaderComponent';

const ResultPage = () => {
    const thisTimes=()=>{
        let now = new Date();	// 현재 날짜 및 시간
        let year = now.getFullYear();
        let month = now.getMonth();
        let date = now.getDate();
        let hours = now.getHours();
        return String(`${year}년 ${month}월 ${date}일 ${hours}시`);
    }
    return (
        <div className="result-wrap">
            <HeaderComponent />
            <div className="result-gap">
                <div className="title">
                    <div className="title-gap">
                        <div className="title-wrap">
                            <p>연습생 순위</p>
                            <p>Boys Current Rank</p>
                        </div>
                    </div>
                </div>
                <div className="contents">
                    <div className="contents-gap">
                        <div className="contents-wrap">
                            <div className="infos">
                                <div className="times">
                                    {thisTimes()}
                                </div>
                                <div className="filter-box">
                                    <select>
                                        <option value="forSix">6인 기준</option>
                                        <option value="forOne">원픽 기준</option>
                                        <option value="forOff">방송 순위</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultPage;