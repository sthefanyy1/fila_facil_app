import './home-estabelecimento.css';
import notification from './home-notification.svg';
import menu from './home-menu.svg';
import attended from './home-attended.svg';
import waiting from './home-waiting.svg';
import currentIcon from './home-current.svg';
import startIcon from './home-start.svg';
import queueIcon from './home-queue.svg';
import historyIcon from './home-history.svg';

export default function HomeEstabelecimento() {
  return <main className="home-screen"><div className="home-status"><span>9:41</span><span>● ● ●</span></div><header className="home-header"><div><h1>Olá, João 👋</h1><p>Terça-feira, 22 de setembro</p></div><div className="home-actions"><img src={notification} alt="Notificações" /><img src={menu} alt="Menu" /></div></header><section className="home-stats"><Stat icon={attended} value="00" label="Atendidos hoje" /><Stat icon={waiting} value="0" label="Na espera" /></section><h2>Atendimento atual</h2><section className="current-card empty-current"><img src={currentIcon} alt="" /><div><strong>Nenhum atendimento</strong><span>Não há atendimento em andamento.</span></div></section><h2 className="next-title">Próximos</h2><section className="next-list"><div className="empty-queue">Nenhum cliente na fila.</div></section><nav className="bottom-nav"><NavItem icon={startIcon} label="Início" active /><NavItem icon={queueIcon} label="Fila" /><NavItem icon={historyIcon} label="Histórico" /></nav></main>;
}

function Stat({ icon, value, label }: { icon: string; value: string; label: string }) { return <div className="stat-card"><img src={icon} alt="" /><div><strong>{value}</strong><span>{label}</span></div></div>; }
function NavItem({ icon, label, active }: { icon: string; label: string; active?: boolean }) { return <button className={active ? 'active' : ''}><img src={icon} alt="" /><span>{label}</span></button>; }
