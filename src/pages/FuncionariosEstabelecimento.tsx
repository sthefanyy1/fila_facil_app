import { useState } from 'react';
import './estabelecimento-interior.css';
import personIcon from './signup-person.svg';
import { Header } from './FilaEstabelecimento';

export default function FuncionariosEstabelecimento({ onBack }: { onBack: () => void }) {
  const [error, setError] = useState('');
  return <main className="est-page"><Header title="Funcionários" onBack={onBack} /><section className="setup-intro employee-intro"><h2>Cadastre sua equipe</h2></section><article className="employee-row"><img src={personIcon} alt="" /><div><b>João da Silva</b><span>Administrador</span></div></article>{error && <p className="est-feedback error" role="alert">{error}</p>}<button className="est-secondary" type="button" onClick={() => setError('Não foi possível adicionar o funcionário. Confira os dados informados.')}>+ Adicionar funcionário</button><button className="est-primary" type="button" onClick={onBack}>Concluir configuração</button></main>;
}
