import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi';
import logoImg from '../../assets/logo.png';
import './styles.css';
import api from '../../services/api';

export default function NewAd(){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [cat_id, setCatId] = useState('')

    const userId = localStorage.getItem('userId');

    const history = useHistory();

    async function handleNewAd(e){
        e.preventDefault();

        const data = {
            title,
            description,
            city,
            state,
            cat_id
        };

        try {
            await api.post('/users/profile/announcements/new', data, {
                headers: {
                    Authorization: userId,
                }
            })
            history.push('/profile');

        } catch (error) {
            alert('Erro ao cadastrar caso, tente novamente');
        }
    }

    return (
        <div className="new-incident-container">
            
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastrar novo anúncio</h1>
                    <p>Descreva o anúncio detalhadamente para encontrar um prestador que possa te ajudar.</p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar para home
                    </Link>
                </section>
                <form onSubmit={handleNewAd}>
                    <input 
                    placeholder="Titulo do anúncio"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    />
                    <textarea 
                    placeholder="Descrição"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    />
                    <input 
                    placeholder="Cidade"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    />
                    <input 
                    placeholder="Estado"
                    value={state}
                    onChange={e => setState(e.target.value)}
                    />
                    <input 
                    placeholder="Categoria"
                    value={cat_id}
                    onChange={e => setCatId(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>

                </form>
            </div>

        </div>
    );
}