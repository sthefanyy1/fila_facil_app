import { useEffect, useState } from 'react';
import './estabelecimento-interior.css';
import backIcon from './data-back.svg';
import queueIcon from './home-queue.svg';
import { subscribeEstablishmentQueue, updateQueueStatus, type QueueEntry } from '../lib/firestore-service';

type Props = { onBack: () => void };
export default function FilaEstabelecimento({ onBack }: Props) {
  const [customers, setCustomers] = useState<QueueEntry[]>([]); const [error, setError] = useState(''); const [feedback, setFeedback] = useState(''); const [busy, setBusy] = useState('');
  useEffect(() => subscribeEstablishmentQueue((entries, message) => { setCustomers(entries); setError(message || ''); }), []);
  async function callCustomer(customer: QueueEntry) { setError(''); setFeedback(''); setBusy(customer.id); try { await updateQueueStatus(customer.id, 'called'); setFeedback(`Cliente ${customer.ticket} chamado com sucesso.`); } catch { setError('Não foi possível chamar o cliente. Verifique o Firebase.'); } finally { setBusy(''); } }
  return <main className="est-page"><Header title="Fila de atendimento" onBack={onBack} /><div className="queue-total"><img src={queueIcon} alt="" /><span>{customers.length} pessoas aguardando</span></div><section className="queue-list">{customers.length ? customers.map(customer => <article className="queue-card" key={customer.id}><strong className="ticket">{customer.ticket}</strong><div><b>{customer.userName}</b><span>{customer.service}</span><small>Entrada: {new Date(customer.createdAtMillis).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</small></div><button type="button" disabled={busy === customer.id} onClick={() => callCustomer(customer)}>{busy === customer.id ? '...' : 'Chamar'}</button></article>) : <p className="est-feedback success">Nenhum cliente aguardando no momento.</p>}</section>{feedback && <p className="est-feedback success" role="status">{feedback}</p>}{error && <p className="est-feedback error" role="alert">{error}</p>}<button className="est-primary queue-add" type="button" onClick={() => setError('Os clientes entram na fila após confirmar um agendamento.')}>+ Adicionar cliente</button></main>;
}
export function Header({ title, onBack }: { title: string; onBack: () => void }) { return <><div className="est-status"><span>9:41</span><span>● ● ●</span></div><header className="est-header"><button type="button" onClick={onBack} aria-label="Voltar"><img src={backIcon} alt="" /></button><h1>{title}</h1></header></>; }
