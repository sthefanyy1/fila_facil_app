import { useState } from 'react';
import { createAppointmentAndQueue } from '../lib/firestore-service';
import { ClientAlert, ClientFrame, ClientHeader } from './ClienteFlow';

export default function AgendamentoCliente({ onBack, onSuccess }: { onBack: () => void; onSuccess: () => void }) {
  const [date, setDate] = useState(''); const [time, setTime] = useState(''); const [error, setError] = useState(''); const [busy, setBusy] = useState(false);
  const days = ['21', '22', '23', '24', '25', '26', '27']; const times = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30'];
  async function confirm() { setError(''); if (!date || !time) { setError('Escolha um dia e um horário para confirmar.'); return; } setBusy(true); try { const service = sessionStorage.getItem('filafacil.selectedService') || 'Corte'; await createAppointmentAndQueue({ service, date: `2025-09-${date}`, time }); onSuccess(); } catch (err) { setError((err as Error).message === 'auth-required' ? 'Faça login para agendar um atendimento.' : 'Não foi possível salvar o agendamento. Confira o Firebase e tente novamente.'); } finally { setBusy(false); } }
  return <ClientFrame><ClientHeader title="Agendamento" onBack={onBack} /><h2 className="client-title">Escolha o melhor dia e horário</h2><div className="client-calendar"><strong>Setembro 2025</strong><div className="days">{days.map(day => <button className={date === day ? 'selected' : ''} key={day} onClick={() => setDate(day)}>{day}</button>)}</div></div><h3 className="client-subtitle">Horários</h3><div className="times">{times.map(item => <button className={time === item ? 'selected' : ''} key={item} onClick={() => setTime(item)}>{item}</button>)}</div>{error && <ClientAlert>{error}</ClientAlert>}<button className="client-primary" disabled={busy} onClick={confirm}>{busy ? 'Salvando...' : 'Confirmar agendamento'}</button></ClientFrame>;
}
