import { useState } from 'react';
import './estabelecimento-interior.css';
import backIcon from './data-back.svg';
import queueIcon from './home-queue.svg';

type Props = { onBack: () => void };
const customers = [['A06', 'Mário Silva', 'Barba', 'Entrada: 15:40'], ['A07', 'Pedro Santos', 'Corte', 'Entrada: 15:55'], ['A08', 'Antônio Oliveira', 'Corte + Barba', 'Entrada: 16:10'], ['A09', 'Lucas Ferreira', 'Corte', 'Entrada: 16:35']];

export default function FilaEstabelecimento({ onBack }: Props) {
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');
  const callCustomer = (ticket: string) => { setError(''); setFeedback(`Cliente ${ticket} chamado com sucesso.`); };
  return <main className="est-page"><Header title="Fila de atendimento" onBack={onBack} /><div className="queue-total"><img src={queueIcon} alt="" /><span>4 pessoas aguardando</span></div><section className="queue-list">{customers.map(([ticket, name, service, entry]) => <article className="queue-card" key={ticket}><strong className="ticket">{ticket}</strong><div><b>{name}</b><span>{service}</span><small>{entry}</small></div><button type="button" onClick={() => callCustomer(ticket)}>Chamar</button></article>)}</section>{feedback && <p className="est-feedback success" role="status">{feedback}</p>}{error && <p className="est-feedback error" role="alert">{error}</p>}<button className="est-primary queue-add" type="button" onClick={() => setError('Não foi possível adicionar o cliente. Conecte a fila ao Firebase para concluir esta ação.')}>＋ Adicionar cliente</button></main>;
}

export function Header({ title, onBack }: { title: string; onBack: () => void }) { return <><div className="est-status"><span>9:41</span><span>● ● ●</span></div><header className="est-header"><button type="button" onClick={onBack} aria-label="Voltar"><img src={backIcon} alt="" /></button><h1>{title}</h1></header></>; }
