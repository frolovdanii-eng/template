import React from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useSearchParams } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage/HomePage';
import SearchPage from './pages/SearchPage/SearchPage';


const API_KEY = (window as any).LASTFM_API_KEY || 'd858d8a86db7242eb0919f0b3ff516e1';
const API_ROOT = 'https://ws.audioscrobbler.com/2.0/';


export default function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}


