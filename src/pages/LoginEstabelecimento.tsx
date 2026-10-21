import { FormEvent, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import './login.css';
import logo from './login-logo.svg';
import companyIcon from './login-company.svg';
import mailIcon from './login-mail.svg';
import lockIcon from './login-lock.svg';
import eyeIcon from './login-eye.svg';

export default function LoginScreen({ onCreateAccount, onForgotPassword }: { onCreateAccount?: () => void; onForgotPassword?: () => void }) {
  const [cnpj, setCnpj] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch {
      setError('Não foi possível entrar. Confira seus dados.');
    }
  }

  return <main className="login-screen">
    <div className="login-status"><span>9:41</span><span>● ● ●</span></div>
    <img className="login-logo" src={logo} alt="" />
    <h1>FilaFácil</h1>
    <h2>Gestão de atendimento</h2>
    <p className="login-subtitle">Acesse a conta do seu estabelecimento</p>
    <form onSubmit={submit}>
      <LoginField label="CNPJ da empresa" placeholder="Digite o CNPJ" icon={companyIcon} value={cnpj} onChange={setCnpj} />
      <LoginField label="E-mail" type="email" placeholder="Digite seu e-mail" icon={mailIcon} value={email} onChange={setEmail} />
      <div className="login-field password-field">
        <label htmlFor="password">Senha</label>
        <div className="login-input-wrap">
          <img src={lockIcon} alt="" /><input id="password" type={showPassword ? 'text' : 'password'} placeholder="Digite sua senha" value={password} onChange={(event) => setPassword(event.target.value)} required />
          <button type="button" aria-label="Mostrar senha" onClick={() => setShowPassword((current) => !current)}><img src={eyeIcon} alt="" /></button>
        </div>
      </div>
      <button type="button" className="forgot-password" onClick={onForgotPassword}>Esqueceu sua senha?</button>
      {error && <p className="login-error">{error}</p>}
      <button className="login-primary" type="submit">Entrar</button>
    </form>
    <div className="login-divider"><span /> <b>ou</b> <span /></div>
    <p className="new-account">Ainda não possui uma conta?</p>
    <button type="button" className="create-account" onClick={onCreateAccount}>Criar conta da empresa</button>
    <p className="login-footer">FilaFácil • Gestão simples e organizada</p>
  </main>;
}

function LoginField({ label, placeholder, icon, value, onChange, type = 'text' }: { label: string; placeholder: string; icon: string; value: string; onChange: (value: string) => void; type?: string }) {
  return <div className="login-field"><label>{label}</label><div className="login-input-wrap"><img src={icon} alt="" /><input type={type} placeholder={placeholder} value={value} onChange={(event) => onChange(event.target.value)} required /></div></div>;
}
