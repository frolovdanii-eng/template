import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { isPropertyAccessOrQualifiedName } from 'typescript';
import './Header.css'

function Header() {
    const navigate = useNavigate();
    function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
        ev.preventDefault();
        const form = ev.currentTarget;
        const input = form.querySelector('input[type="search"]') as HTMLInputElement | null;
        const q = (input?.value || '').trim();
        navigate(q ? `/search?q=${encodeURIComponent(q)}` : '/search');
    }
    return (
        <header className="site-header">
            <nav className="nav-menu">
                <div className="container">
                    <Link to="/" className="title" style={{ textDecoration: 'none', color: 'inherit' }}>Music</Link>
                    <form className="search" onSubmit={onSubmit}>
                        <input type="search" placeholder="Поиск исполнителей и треков" aria-label="Поиск" />
                        <button type="submit">Найти</button>
                    </form>
                </div>
                <div className="user-menu">
                    <a href="#">Live</a>
                    <a href="#">Музыка</a>
                    <a href="#">Чарты</a>
                    <a href="#">События</a>
                    <a href="#">Вход</a>
                    <a href="#">Регистрция</a>
                </div>
            </nav>    
        </header>
    );
}

export default Header;