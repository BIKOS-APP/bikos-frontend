import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiPower, FiTrash2, FiHeart } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.png';

export default function Profile(){
    const [ads, setAds] = useState([])
    const [candidates, setCandidates] = useState([])
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
            console.log(response)
            setUser(response.data)
            console.log(user)
        })
    }, []);

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
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>

            <h1>Seus Dados</h1>

            <ul>
                {user.map( u => (
                <li key={u.id}>
                    <strong>Name</strong>
                    <p>{u.name}</p>
                    <strong>Email</strong>
                    <p>{u.email}</p>
                    <strong>Whatsapp</strong>
                    <p>{u.whatsapp}</p>
                </li>
                ))}              
            </ul>

            <h1>Seus anúncios</h1>
            <Link className="button-ads" to='/ads/new'>Cadastrar novo anuncio</Link>
            {ads.map(ad => (
             <ul>
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
            </ul>
            ))} 
        </div>

    );
}