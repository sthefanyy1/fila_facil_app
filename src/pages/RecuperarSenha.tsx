import { FormEvent, useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../lib/firebase';
import './recuperar-senha.css';
import backIcon from './recover-back.svg';
import mailIcon from './recover-mail.svg';
import lockIcon from './recover-lock.svg';
import sentIcon from './recover-sent.svg';
import emailReadIcon from './recover-email-read.svg';

export default function RecuperarSenha({ onBack, onLogin }: { onBack: () => void; onLogin: () => void }) {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  async function submit(event: FormEvent) { event.preventDefault(); setError(''); try { await sendPasswordResetEmail(auth, email.trim()); setSent(true); } catch { setError('Não foi possível enviar o link. Confira o e-mail.'); } }
  if (sent) return <main className="recover-screen recover-success"><header className="recover-topbar"><span /><h1>Recuperar senha</h1></header><img className="recover-success-icon" src={emailReadIcon} alt="" /><p className="recover-message">Verifique sua caixa de entrada e<br />clique para recuperar senha.</p><button className="recover-primary" onClick={onLogin}>Ir para o Login</button></main>;
  return <main className="recover-screen"><header className="recover-topbar"><button type="button" onClick={onBack} aria-label="Voltar"><img src={backIcon} alt="" /></button><h1>Recuperar senha</h1></header><img className="recover-lock-icon" src={lockIcon} alt="" /><p className="recover-message">Informe o e-mail da conta para receber<br />o link de recuperação.</p><form onSubmit={submit}><label className="recover-field"><span>E-mail</span><div><img src={mailIcon} alt="" /><input type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required /></div></label>{error && <p className="recover-error">{error}</p>}<button className="recover-primary" type="submit">Enviar link de recuperação</button></form><button className="recover-back-login" onClick={onLogin}>Voltar para o login</button></main>;
}
