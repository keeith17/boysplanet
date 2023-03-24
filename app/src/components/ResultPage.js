import React, {useState, useEffect} from 'react';
import axios from 'axios';

import HeaderComponent from './HeaderComponent';
const ResultPage = () => {
    //새로고침 시간 확인
    const thisTimes=()=>{
        let now = new Date();	// 현재 날짜 및 시간
        let year = now.getFullYear();
        let month = now.getMonth()+1;
        let date = now.getDate();
        let hours = now.getHours();
        if(filter.filtered.includes('forOff')){
            return '8회(3/23) 기준';
        } else {
            return String(`${year}년 ${month}월 ${date}일 ${hours}시`);
        }
    }
    //연습생 정보 스테이트
    const [boysRank, setBoysRank] = useState(
        {
            boysRankTeam: [],
            boysRankOne: []
        }
    )
    //받은 투표수 스테이트
    const [voteCount, setVoteCount] = useState(
        {
            voteCountTeam: [],
            voteCountOne: []
        }
    )
    //합친 어레이(실시간투표 연습생정보 + 받은투표수) 스테이트
    const [ranking, setRanking] = useState(
        {
            boysRankingTeam:[],
            boysRankingOne:[]
        }
    )
    //오피셜 투표 스테이트
    const [official, setOfficial] = useState(
        {
            officialRanking:[]
        }
    )
    //셀렉트 필터
    const [filter, setFilter] = useState(
        {
            filtered:'forSix'
        }
    )
    //셀렉트 변경시
    const onChangeSelect=(e)=>{
        setFilter({...filter, filtered:e.target.value});
    }
    //정보 받아오는 부분
    const getCurrSurvey = () =>{
        axios({
            url: "http://boysplanet.hkamio.com:8080/getCurrSurvey?isDead=0",
            method:"GET",
        }).then((res)=>{
            setBoysRank({...boysRank, boysRankTeam:res.data.teamResult.boysInfo, boysRankOne:res.data.oneResult.boysInfo});
            setVoteCount({...voteCount, voteCountTeam:res.data.teamResult.teamVoteInfo, voteCountOne:res.data.oneResult.oneVoteInfo});
        }).catch((err)=>{
            console.log(err);
        })
    }
    const getOfficeSurvey = () =>{
        axios({
            url: "http://boysplanet.hkamio.com:8080/getOfficialInfo?ep=8",
            method:"GET",
        }).then((res)=>{
            setOfficial({...official, officialRanking:res.data.data});
        }).catch((err)=>{
            console.log(err);
        })
    }
    useEffect(()=>{
        getCurrSurvey();
        getOfficeSurvey();
    }, []);

    //어레이 오브젝트 합쳐 보기 (팀)

    const rearray=()=>{
        const map = new Map ();
        boysRank.boysRankTeam.forEach(item => map.set(item.boysNum, item));
        voteCount.voteCountTeam.forEach(item => map.set(item.boysNum, {...map.get(item.boysNum), ...item}));
        const mergeArr = Array.from(map.values());
        setRanking({...ranking, boysRankingTeam:mergeArr});
        
        const map2 = new Map ();
        boysRank.boysRankOne.forEach(item => map2.set(item.boysNum, item));
        voteCount.voteCountOne.forEach(item => map2.set(item.boysNum, {...map2.get(item.boysNum), ...item}));
        const mergeArr2 = Array.from(map2.values());
        setRanking({...ranking, boysRankingTeam:mergeArr, boysRankingOne:mergeArr2}); 
    }

    useEffect(()=>{
        rearray();
        thisTimes();
    }, [boysRank]);


    //map으로 팀 필터 경우 출력
    let boysTeamRankList = '';
    if(filter.filtered.includes('forSix')){
        boysTeamRankList = ranking.boysRankingTeam.map((list,index)=>{  
            let group = String(list.boysType);
            let newGroup = group.replace(/(0|1)/g,function(vl){
                    // eslint-disable-next-line default-case
                    switch(vl){
                     case '0' : return 'korea'; 
                     case '1' : return 'global'; 
                    }
            })
            return (
                <li className={newGroup} key={list.boysNum}>
                    <div className="content-wrap">
                        <p>{index+1}위</p>
                        <p>{list.boysKName}</p>
                        <p>{list.boysEName}</p>
                        <p>{(list.boysKVote + list.boysGVote).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}표</p>
                    </div>
                </li>
            )
        })
    } else if(filter.filtered.includes('forOne')){
        boysTeamRankList = ranking.boysRankingOne.map((list,index)=>{  
            let group = String(list.boysType);
            let newGroup = group.replace(/(0|1)/g,function(vl){
                    // eslint-disable-next-line default-case
                    switch(vl){
                     case '0' : return 'korea'; 
                     case '1' : return 'global'; 
                    }
            })
            return (
                <li className={newGroup} key={list.boysNum}>
                    <div className="content-wrap">
                        <p>{index+1}위</p>
                        <p>{list.boysKName}</p>
                        <p>{list.boysEName}</p>
                        <p>{(list.boysKVote + list.boysGVote).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}표</p>
                    </div>
                </li>
            )
        })
    } else if(filter.filtered.includes('forOff')) {
        boysTeamRankList = official.officialRanking.map((list,index)=>{  
            let group = String(list.boysType);
            let newGroup = group.replace(/(0|1)/g,function(vl){
                    // eslint-disable-next-line default-case
                    switch(vl){
                     case '0' : return 'korea'; 
                     case '1' : return 'global'; 
                    }
            })
            return (
                <li className={newGroup} key={list.boysNum}>
                    <div className="content-wrap">
                        <p>{index+1}위</p>
                        <p>{list.boysKName}</p>
                        <p>{list.boysEName}</p>
                        <p>{list.boysAVote.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}점</p>
                    </div>
                </li>
            )
        })
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
                                    <select onChange={onChangeSelect}>
                                        <option value="forSix">6인 기준</option>
                                        <option value="forOne">원픽 기준</option>
                                        <option value="forOff">방송 순위</option>
                                    </select>
                                </div>
                            </div>
                            <div className="ranking">
                                <ul className="boys-ranking">
                                    {boysTeamRankList}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultPage;