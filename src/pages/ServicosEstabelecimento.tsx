import { useState } from 'react';
import './estabelecimento-interior.css';
import { Header } from './FilaEstabelecimento';

export default function ServicosEstabelecimento({ onBack }: { onBack: () => void }) {
  const services = [['Corte', 'R$ 30,00'], ['Barba', 'R$ 20,00'], ['Corte + Barba', 'R$ 45,00']];
  const [error, setError] = useState('');
  return <main className="est-page"><Header title="Serviços" onBack={onBack} /><section className="setup-intro"><h2>Cadastre seus serviços</h2><p>Adicione os atendimentos que sua empresa oferece.</p></section><section className="service-list">{services.map(([name, price]) => <article className="service-row" key={name}><div><b>{name}</b><span>{price}</span></div><button type="button" onClick={() => setError(`Não foi possível editar “${name}”. Tente novamente.`)}>Editar</button></article>)}</section>{error && <p className="est-feedback error" role="alert">{error}</p>}<button className="est-secondary" type="button" onClick={() => setError('Não foi possível adicionar o serviço. Preencha os dados e tente novamente.')}>+ Adicionar serviço</button><button className="est-primary" type="button" onClick={onBack}>Continuar</button></main>;
}
