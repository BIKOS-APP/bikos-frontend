import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiPower, FiTrash2, FiHeart } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.png';
import axios from 'axios';

export default function Profile(){
    const [ads, setAds] = useState([])

    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');

    useEffect(() => {
        api.get('/announcements',{
            headers:{
                'Authorization': userId,
            }
        }).then(response => {
            setAds(response.data)
        })
    }, [userId]);

    async function handleApplyCandidate(id){
        try {
            console.log(userId)
            await axios.create({
                baseURL : 'http://localhost:3333',
                headers: {'Authorization': userId}
            }).post(`/announcements/${id}/candidates/apply`)
            .then(response => {
                console.log(response)
            })
        } catch (error) {
            alert("Erro ao se candidatar. Tente novamente")
            console.log(error)
        }
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <Link className="button" to='/profile'>Meu perfil</Link>
            </header>

            <h1>Anúncios</h1>
            {ads.map(ad => (
                <ul>
                
                    <li key={ad.id}>
                        
                        <strong>Titulo:</strong>
                        <p>{ad.title}</p>

                        <strong>Anunciante</strong>
                        <p>{ad.name}</p>

                        <strong>Descrição</strong>
                        <p>{ad.category}</p>

                        <strong>Cidade</strong>
                        <p>{ad.city}</p>

                        <p>{ad.state}</p>

                        <strong>Descrição</strong>
                        <p>{ad.description}</p>

                        <button className={"button-ads"} onClick={() => handleApplyCandidate(ad.id)} type="button">
                            Candidatar-se
                        </button>
                        
                    </li>
                
                </ul>
            ))} 
        </div>

    );
}