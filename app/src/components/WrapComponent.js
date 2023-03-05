import React, {useEffect, useState} from 'react';
import { Routes, Route } from 'react-router-dom';


import MainPage from './MainPage';
import VotePage from './VotePage';
import ResultPage from './ResultPage';
import ModalComponent from './ModalComponent';


const WrapComponent = () => {
    const [modal, setModal] = useState(
        {
            isShow:false
        }
    );
    const modalCloseFn=()=>{
        setModal({...modal, isShow:false});
    }
    const modalOpenFn=()=>{
        setModal({...modal, isShow:true});
    }
    return (
        <div id="wrap">
            <div className="wrap-gap">
                <Routes>
                    <Route path='/' element={<MainPage/>} />
                    <Route path='/VotePage' element={<VotePage modalOpenFn={modalOpenFn}/>} />
                    <Route path='/ResultPage' element={<ResultPage/>} />
                </Routes>
                <ModalComponent modal={modal} modalCloseFn={modalCloseFn}/>
            </div>
        </div>
    );
};

export default WrapComponent;