import './estabelecimento-interior.css';
import notificationIcon from './home-notification.svg';
import { Header } from './FilaEstabelecimento';

const notifications = [['É sua vez!', 'Sua senha A16 foi chamada.', 'Agora'], ['Atendimento atualizado', 'Faltam 2 pessoas para sua vez.', '5 min'], ['Agendamento confirmado', 'Seu horário foi reservado.', 'Ontem']];

export default function NotificacoesEstabelecimento({ onBack }: { onBack: () => void }) {
  return <main className="est-page"><Header title="Notificações" onBack={onBack} /><section className="notification-list">{notifications.map(([title, description, time]) => <article className="notification-row" key={title}><img src={notificationIcon} alt="" /><div><b>{title}</b><span>{description}</span></div><time>{time}</time></article>)}</section></main>;
}
