import React from 'react';
import { Link } from 'react-router-dom';


const modalComponent = ({modal, modalCloseFn}) => {
    const onClickClose=()=>{
        modalCloseFn();
    }
    return (
        modal.isShow && (
        <div id="modal">
            <div className="container">
                <ul>
                    <li>
                        <h2>투표가 완료되었습니다!</h2>
                    </li>
                </ul>
                <div className="button-box">
                    <Link to="/" onClick={onClickClose}>처음으로</Link>
                    <Link to="/ResultPage" onClick={onClickClose}>결과 확인하러 가기</Link>
                </div>
            </div>
        </div>
        )
    );

};

export default modalComponent;