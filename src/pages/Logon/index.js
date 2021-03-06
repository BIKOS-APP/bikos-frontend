import React, {useState} from 'react';
import {FiLogIn} from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'

import './styles.css'

import logoImg from '../../assets/logo.png'
import providersImg from '../../assets/providers.png'

export default function Logon(){
    const [id, setId] = useState('');

    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try {
            const response = await api.post('/sessions', {id});
            localStorage.setItem('userId', id);
            localStorage.setItem('userName,', response.data.name);

            history.push('/profile');
        } catch (error) {
            alert("Falha ao login, tente novamente.");
        }
    }

    return(
        <div className="logon-container">
            <section className="form">
                <img src={providersImg} alt="Bikos"/>

                <form onSubmit={handleLogin}>
                    <h1>Faça seu Logon</h1>
                    <input 
                    placeholder="Sua ID" 
                    value={id}
                    onChange={e => setId(e.target.value)}
                    />
                    <button className="button-ads" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

        {/* <img src={logoImg} alt="Heroes"/> */}
    </div>
    );
}