import { useEffect, useState } from 'react';
import { subscribeClientQueue, updateQueueStatus, type QueueEntry } from '../lib/firestore-service';
import { ClientAlert, ClientFrame, ClientHeader } from './ClienteFlow';

export default function MinhaFilaCliente({ onBack, onLeave, onTurn }: { onBack: () => void; onLeave: () => void; onTurn: () => void }) {
  const [entry, setEntry] = useState<QueueEntry | null>(null); const [ahead, setAhead] = useState(0); const [error, setError] = useState(''); const [busy, setBusy] = useState(false);
  useEffect(() => subscribeClientQueue((next, peopleAhead, message) => { setEntry(next); setAhead(peopleAhead); setError(message || ''); }), []);
  async function leave() { if (!entry) return; setBusy(true); try { await updateQueueStatus(entry.id, 'cancelled'); onLeave(); } catch { setError('Não foi possível sair da fila. Tente novamente.'); } finally { setBusy(false); } }
  return <ClientFrame><ClientHeader title="Barbearia do João" onBack={onBack} />{error && <ClientAlert>{error}</ClientAlert>}{entry ? <section className="queue-ticket"><span>Sua senha</span><strong>{entry.ticket}</strong><hr /><p>👥 <b>{ahead} pessoas na frente</b></p><p>◷ <b>Aprox. {ahead * 9} min</b></p><button className="client-link" disabled={busy} onClick={leave}>{busy ? 'Saindo...' : 'Sair da fila'}</button></section> : <div className="client-empty">Você ainda não está em uma fila ativa.</div>}<button className="client-secondary" onClick={onTurn}>Simular chamada</button></ClientFrame>;
}
