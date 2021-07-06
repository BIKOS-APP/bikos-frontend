import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiPower, FiTrash2, FiHeart } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.png';

export default function Profile(){
    const [ads, setAds] = useState([])
    const [user, setUser] = useState([])

    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');

    const history = useHistory();

    useEffect(() => {
        api.get('users/profile',{
            headers:{
                Authorization: userId
            }
        }).then(response => {
            setUser(response.data)
        })
    }, [userId]);


    useEffect(() => {
        api.get('users/profile/announcements',{
            headers:{
                Authorization: userId,
            }
        }).then(response => {
            setAds(response.data)
        })
    }, [userId]);

    async function handleDeleteAd(id){
        try {
            await api.delete(`users/profile/announcements/${id}`,{
             headers:{
                 Authorization: userId,
             }  
            });
            setAds(ads.filter(ad => ad.id !== id))
        } catch (error) {
            alert("Erro ao deleter caso. Tente novamente")
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem vindo, {userName}</span>
                <Link className="button" to='/ads'>Quero prestar serviços</Link>
                <Link className="button" to='/ads/new'>Cadastrar novo anuncio</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>

            <h1>Seus Dados</h1>

            <ul>
                <li key={user.id}>
                    <strong>Name</strong>
                    <p>{user.name}</p>
                </li>
            </ul>

            <h1>Seus anúncios</h1>

            <ul>
                {ads.map(ad => (
                <li key={ad.id}>
                    <strong>Caso:</strong>
                    <p>{ad.title}</p>

                    <strong>Descrição</strong>
                    <p>{ad.description}</p>

                    <strong>Cidade</strong>
                    <p>{ad.city}</p>

                    <strong>Descrição</strong>
                    <p>{ad.state}</p>
                    
                    <strong>Descrição</strong>
                    <p>{ad.category}</p>

                    <button onClick={() => handleDeleteAd(ad.id)} type="button">
                        <FiTrash2 size={20} color="#a8a8b3"/>
                    </button>

                </li>
                ))} 
            </ul>
        </div>

    );
}