import React, {useEffect, useState} from 'react'
import './App.css'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from "./pages/HomePage";
import {Routes, Route, Link} from 'react-router-dom'
import EventDetail from "./pages/EventDetail";

function App() {

 useEffect(() => {


 },[])


  return (
    <div>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/event-detail/:id" element={<EventDetail />} />
        </Routes>
    </div>
  )
}

export default App
