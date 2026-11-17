import './estabelecimento-interior.css';
import attended from './home-attended.svg';
import history from './home-history.svg';
import { Header } from './FilaEstabelecimento';

export default function HistoricoEstabelecimento({ onBack }: { onBack: () => void }) {
  const records = [['A01', 'Carlos Silva', 'Corte', '14:20'], ['A02', 'Marcos Costa', 'Barba', '14:30'], ['A03', 'Rafael Lima', 'Corte + Barba', '14:50'], ['A04', 'Juliano Alves', 'Corte', '15:20'], ['A05', 'Bruno Souza', 'Barba', '15:35']];
  return <main className="est-page"><Header title="Histórico de atendimentos" onBack={onBack} /><div className="filter-tabs"><button className="selected" type="button">Hoje</button><button type="button">7 dias</button><button type="button">30 dias</button></div><section className="history-stats"><Stat icon={attended} value="05" label="Atendimentos" /><Stat icon={history} value="20 min" label="Tempo médio" /></section><section className="history-list">{records.map(([ticket, name, service, time]) => <article className="history-row" key={ticket}><strong>{ticket}</strong><div><b>{name}</b><span>{service}</span></div><time>{time}</time><em>Concluído</em></article>)}</section></main>;
}

function Stat({ icon, value, label }: { icon: string; value: string; label: string }) { return <div className="history-stat"><img src={icon} alt="" /><div><strong>{value}</strong><span>{label}</span></div></div>; }
