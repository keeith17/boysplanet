import React, {useState, useEffect} from 'react';
import axios from 'axios';
import $ from 'jquery';

import HeaderComponent from './HeaderComponent';

const VotePage = ({modalOpenFn}) => {
    //전체 데이터 스테이트
    const [boysList, setboysList] = useState(
        {
            boysList: []
        }
    )
    //선택 데이터 스테이트
    const [boysSelect, setboysSelect] = useState(
        {
            boysTeamSelect: [],
            boysOneSelect: '',
            boysTeamSelectSub: [],
            boysOneSelectSub:''
        }
    )
    //검색값 스테이트
    const [searchData, setSearchData] = useState(
        {
            searchData: '',
            searchDataOne:''
        }
    )
   
    //연습생 목록 데이터 받기
    const getBoysList = () =>{
        axios({
            url: "http://ec2-3-37-249-208.ap-northeast-2.compute.amazonaws.com:8080/getBoysList",
            method:"GET",
        }).then((res)=>{
            console.log(res);
            setboysList({boysList:res.data});
        }).catch((err)=>{
            console.log(err);
        })
    }
    useEffect(()=>{
        getBoysList();
    }, []);

    //선택 연습생 보내주기
    const postBoysList = () =>{

        // const formData = new FormData();
        // 
        // formData.append('teamPickSurvey', boysSelect.boysTeamSelectSub);
        // formData.append('onePickSurvey', boysSelect.boysOneSelectSub);
        // for (let value of formData.values()) {
            // console.log(value);
        // }

        let teampeackSurveyArr = [];
        const arr = boysSelect.boysTeamSelectSub;
        for(let i=0; i<arr.length; i++){
            teampeackSurveyArr.push(parseInt(arr[i]));
        }
        console.log('teampeackSurveyArr',teampeackSurveyArr);
        console.log('arr',arr);
        axios({
            url: "http://ec2-3-37-249-208.ap-northeast-2.compute.amazonaws.com:8080/survey",
            method:"POST",
            data:{
             teamPickSurvey: teampeackSurveyArr,
             onePickSurvey: parseInt(boysSelect.boysOneSelectSub)
            }
         }).then((response)=>{
            console.log( `AXIOS 성공: ${response.data}` );
            return;
         })
         .catch((error)=>{
            console.log( `AXIOS 실패: ${error}` );
            return;
         });   
    }

    //모달 오픈
    const onClickModal=()=>{
        console.log('누르고 있음');
        postBoysList();
        modalOpenFn();
    }

    //팀 선택시
    const onChangeTeam=(e)=>{
        let imsi = [];
        let imsi2 = [];
        if(e.target.checked===true){
            if(boysSelect.boysTeamSelect.length >= 6){
                alert('여섯 명만 선택 가능합니다!');
            }
            else {
                setboysSelect({...boysSelect, boysTeamSelect:[...boysSelect.boysTeamSelect, e.target.id], boysTeamSelectSub:[...boysSelect.boysTeamSelectSub, e.target.value]});
            }
        } else {
            imsi = boysSelect.boysTeamSelect.filter((item)=>item !== e.target.id);
            imsi2 = boysSelect.boysTeamSelectSub.filter((item)=>item !== e.target.value);
            setboysSelect({...boysSelect, boysTeamSelect:imsi, boysTeamSelectSub:imsi2});        }

    }
    //원픽 선택시
    const onChangeOne=(e)=>{
        setboysSelect({...boysSelect, boysOneSelect:e.target.id, boysOneSelectSub:e.target.value});
    }

    //서치 데이터 입력값 스테이트 변경 (팀)
    const onChangeSearch=(e)=>{
        setSearchData({...searchData, searchData:e.target.value});
    }
    //서치 데이터 입력값 스테이트 변경 (한명)
    const onChangeSearchOne=(e)=>{
        setSearchData({...searchData, searchDataOne:e.target.value});
    }

    //팀 리스트 출력 부분
    let boysTeamPickList = '';
    const filtered = boysList.boysList.filter((itemList) => {
        return itemList.boysKName.includes(searchData.searchData) || itemList.boysEName.toUpperCase().includes(searchData.searchData.toUpperCase());
    })
    boysTeamPickList = filtered.map(list=>{  
        let group = String(list.boysType);
        let newGroup = group.replace(/(0|1)/g,function(vl){
                // eslint-disable-next-line default-case
                switch(vl){
                 case '0' : return 'korea'; 
                 case '1' : return 'global'; 
                }
        })
        return (
            <li className='boys-name' key={list.boysNum}>
                    <label>
                        <input 
                        type="checkbox"
                        onChange={onChangeTeam}
                        checked={boysSelect.boysTeamSelect.includes(list.boysKName)}
                        id={list.boysKName}
                        name={list.boysKName}
                        className={newGroup}
                        value={list.boysNum} />
                        <div className='labeling'>
                        <p>
                        {list.boysKName}<br/>
                        {list.boysEName}
                        </p>
                        </div>
                    </label>
            </li>
        )
    })



    //원픽 리스트 출력 부분
    let boysOnePickList = '';
    const filteredOne = boysList.boysList.filter((itemList) => {
        return itemList.boysKName.includes(searchData.searchDataOne) || itemList.boysEName.toUpperCase().includes(searchData.searchDataOne.toUpperCase());
    })
    boysOnePickList = filteredOne.map(list=>{  
        let group = String(list.boysType);
        let newGroup = group.replace(/(0|1)/g,function(vl){
                // eslint-disable-next-line default-case
                switch(vl){
                 case '0' : return 'korea';
                 case '1' : return 'global';
                }
        })
        return (
            <li className='boys-name' key={list.boysNum}>
                    <label>
                        <input 
                        type="checkbox"
                        onChange={onChangeOne}
                        checked={boysSelect.boysOneSelect.includes(list.boysKName)}
                        id={list.boysKName}
                        name={list.boysKName}
                        className={newGroup}
                        value={list.boysNum} />
                        <div className='labeling'>
                        <p>
                        {list.boysKName}<br/>
                        {list.boysEName}
                        </p>
                        </div>
                    </label>
            </li>
        )
    }) 

    //팀 리스트 선택 인원수 체크
    const counting = boysSelect.boysTeamSelect.map(list=>{  
        return (
            <li className="kok" key={list.boysNum}> </li>
        )
    })

    //투표 완료 버튼
    const allDoneBtn=()=>{
        if(boysSelect.boysTeamSelect.length>5 && boysSelect.boysOneSelect.length>0){
            return <button onClick={onClickModal}>투표 완료</button>
        } else {
            return <button disabled>투표 완료</button>
        }
    }
    //하단 이름 출력 이쁘게
    const teamCheckList=()=>{
        let result = [];
        for(let i=0; i<boysSelect.boysTeamSelect.length; i++){
                result.push(boysSelect.boysTeamSelect[i] + " ");
        }
        return result;
    }
    return (
        <div className="vote-wrap">
            <HeaderComponent />
            <div className="team-pick">
                <div className="title">
                    <div className="title-gap">
                        <div className="title-wrap">
                            <p>두 번째 글로벌 투표 (6인)</p>
                            <p>The Second Global Vote (6 members)</p>
                        </div>
                    </div>
                </div>
                <div className="counting">
                    <div className="counting-gap">
                        <ul className="counting-wrap">
                        {counting}
                        </ul>
                    </div>
                </div>
                <div className="select">
                    <div className="search">
                        <input type="search" onChange={onChangeSearch} placeholder="이름 검색 / Search Name" />
                    </div>
                    <div className="names">
                        <div className="names-gap">
                            <ul className="names-wrap">
                                {boysTeamPickList}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="one-pick">
                <div className="title">
                    <div className="title-gap">
                        <div className="title-wrap">
                            <p>나의 원픽</p>
                            <p>My One Pick</p>
                        </div>
                    </div>
                </div>
                <div className="select">
                    <div className="search">
                        <input type="search" onChange={onChangeSearchOne} placeholder="이름 검색 / Search Name" />
                    </div>
                    <div className="names">
                        <div className="names-gap">
                            <ul className="names-wrap">
                                {boysOnePickList}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="check">
                <div className="check-gap">
                    <div className="check-wrap">
                        <p>두 번째 글로벌 투표 (6인):<br/>
                        {teamCheckList()}</p>
                        <p>나의 원 픽:<br/>{boysSelect.boysOneSelect}</p>
                    </div>
                </div>
            </div>
            <div className="all-done">
                <div className="done-gap">
                    <div className="done-wrap">
                        {allDoneBtn()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VotePage;