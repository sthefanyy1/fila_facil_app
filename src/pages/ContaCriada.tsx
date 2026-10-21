import './dados-estabelecimento.css';
import checkIcon from './account-check.svg';

export default function ContaCriada({ onLogin }: { onLogin: () => void }) {
  return <main className="created-screen"><img className="created-icon" src={checkIcon} alt="" /><h1>Conta criada com sucesso!</h1><p>Agora você pode configurar seu estabelecimento<br />e começar a organizar seus atendimentos.</p><button type="button" onClick={onLogin}>Ir para o Login</button></main>;
}
