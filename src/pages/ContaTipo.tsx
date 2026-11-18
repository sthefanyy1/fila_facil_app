import './conta-tipo.css';
import companyIcon from './login-company.svg';
import clientIcon from './signup-person.svg';

export default function ContaTipo({ onBack, onCompany, onClient }: { onBack: () => void; onCompany: () => void; onClient: () => void }) {
  return <main className="account-choice"><div className="account-status"><span>9:41</span><span>● ● ●</span></div><button className="account-back" onClick={onBack} aria-label="Voltar para a Splash">‹</button><section className="account-intro"><span className="account-mark">F</span><h1>Como você quer entrar?</h1><p>Escolha o tipo de conta para continuar.</p></section><div className="account-options"><button onClick={onCompany}><span className="account-icon"><img src={companyIcon} alt="" /></span><span><b>Conta da Empresa</b><small>Gerencie filas, serviços e atendimentos</small></span><strong>›</strong></button><button onClick={onClient}><span className="account-icon"><img src={clientIcon} alt="" /></span><span><b>Conta do Cliente</b><small>Encontre estabelecimentos e entre na fila</small></span><strong>›</strong></button></div></main>;
}
