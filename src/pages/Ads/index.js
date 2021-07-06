import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiPower, FiTrash2, FiHeart } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.png';

export default function Profile(){
    const [ads, setAds] = useState([])

    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');

    useEffect(() => {
        api.get('/announcements',{
            headers:{
                Authorization: userId,
            }
        }).then(response => {
            setAds(response.data)
        })
    }, [userId]);

    async function handleApplyCandidate(id){
        try {
            await api.post(`/announcements/${id}/candidates/apply`,{
             headers:{
                 Authorization: userId,
             }  
            });
            setAds(ads.filter(ad => ad.id !== id))
        } catch (error) {
            alert("Erro ao se candidatar. Tente novamente")
        }
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem vindo, {userName}</span>
                <Link className="button" to='/profile'>Meu perfil</Link>
            </header>

            <h1>Anúncios</h1>

            <ul>
                {ads.map(ad => (
                <li key={ad.id}>

                    <p id="name">{ad.name}</p>
                    
                    <strong id="title">{ad.title}</strong>

                    <p  id="cat">{ad.category}</p>

                    <p>{ad.city}</p>

                    <p>{ad.state}</p>

                    <strong>Descrição</strong>
                    <p>{ad.description}</p>

                    <button onClick={() => handleApplyCandidate(ad.id)} type="button">
                        Candidatar-se
                    </button>
                    
                </li>
                ))} 
            </ul>
        </div>

    );
}