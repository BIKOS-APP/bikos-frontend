import React, {useState} from 'react';
import { Link, useHistory} from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import logoImg from '../../assets/logo.png';

import api from '../../services/api';

import './styles.css';

export default function Register(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');


    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
        };

        try {
            const response = await api.post('users/new', data);
            alert(`Seu ID de acesso: ${response.data.id}`);
            
            history.push('/');
        } catch (err) {
            alert('Erro no cadastro, tente novamente.');
        }
    }   

    return(
        <div className="register-container">
            
            <div className="content">
                <section>
                    <img src={logoImg} alt="Bikos"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, encontre bikos de acordo com sua área ou seja um cliente a procura de um serviço.</p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input 
                    placeholder="Nome"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    />
                    <input 
                    type="email" 
                    placeholder="E-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
                    <input 
                    placeholder="Whatsapp"
                    value={whatsapp}
                    onChange={e => setWhatsapp(e.target.value)}
                    />
                    <button className="button" type="submit">Cadastrar</button>

                </form>
            </div>
    </div>

    );
}
