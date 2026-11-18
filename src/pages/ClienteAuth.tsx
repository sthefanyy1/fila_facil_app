import { FormEvent, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { db } from '../lib/firebase';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { ClientAlert, ClientFrame, ClientHeader } from './ClienteFlow';

function authMessage(error: unknown, action: 'login' | 'signup') {
  const code = (error as { code?: string })?.code;
  if (code === 'auth/email-already-in-use') return 'Este e-mail já está cadastrado. Tente entrar ou use outro e-mail.';
  if (code === 'auth/invalid-credential' || code === 'auth/user-not-found' || code === 'auth/wrong-password') return 'Conta não encontrada. Verifique o e-mail e a senha ou crie uma nova conta.';
  if (code === 'auth/invalid-email') return 'Digite um e-mail válido.';
  if (code === 'auth/weak-password') return 'A senha precisa ter pelo menos 6 caracteres.';
  if (code === 'auth/network-request-failed') return 'Não foi possível conectar ao Firebase. Verifique sua internet.';
  return action === 'login' ? 'Não foi possível entrar. Confira o Firebase e tente novamente.' : 'Não foi possível criar a conta. Confira o Firebase e tente novamente.';
}

export function LoginCliente({ onSignup, onLogin }: { onSignup: () => void; onLogin: () => void }) {
  const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [error, setError] = useState(''); const [loading, setLoading] = useState(false);
  async function submit(e: FormEvent) { e.preventDefault(); setError(''); if (!email.trim() || password.length < 6) { setError('Conta não encontrada. Verifique o e-mail e a senha ou crie uma nova conta.'); return; } setLoading(true); try { await signInWithEmailAndPassword(auth, email.trim(), password); onLogin(); } catch (err) { setError(authMessage(err, 'login')); } finally { setLoading(false); } }
  return <ClientFrame><ClientHeader title="Entrar" /><section className="client-brand"><strong>FilaFácil</strong><span>Encontre seu atendimento com facilidade</span><h2>Acesse sua conta</h2></section><form className="client-form" onSubmit={submit}><label>E-mail<input type="email" placeholder="seu@email.com" value={email} onChange={e => setEmail(e.target.value)} /></label><label>Senha<input type="password" placeholder="Digite sua senha" value={password} onChange={e => setPassword(e.target.value)} /></label>{error && <ClientAlert>{error}</ClientAlert>}<button className="client-primary" disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</button></form><button className="client-link" onClick={onSignup}>Criar conta</button></ClientFrame>;
}

export function CriarContaCliente({ onBack, onCreated }: { onBack: () => void; onCreated: () => void }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', password: '' }); const [error, setError] = useState(''); const [loading, setLoading] = useState(false);
  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [key]: e.target.value });
  async function submit(e: FormEvent) { e.preventDefault(); setError(''); if (!form.name.trim() || !form.email.includes('@') || form.phone.replace(/\D/g, '').length < 10 || form.password.length < 6) { setError('Preencha todos os campos corretamente. A senha deve ter pelo menos 6 caracteres.'); return; } setLoading(true); try { const credential = await createUserWithEmailAndPassword(auth, form.email.trim(), form.password); await updateProfile(credential.user, { displayName: form.name.trim() }); await setDoc(doc(db, 'clientes', credential.user.uid), { nome: form.name.trim(), telefone: form.phone.trim(), email: form.email.trim(), criadoEm: serverTimestamp() }); sessionStorage.setItem('filafacil.clientDraft', JSON.stringify({ name: form.name.trim(), phone: form.phone.trim(), email: form.email.trim() })); onCreated(); } catch (err) { setError(authMessage(err, 'signup')); } finally { setLoading(false); } }
  return <ClientFrame><ClientHeader title="Criar conta" onBack={onBack} /><section className="client-brand compact"><strong>FilaFácil</strong><span>Gestão de atendimento</span><h2>Crie sua conta</h2></section><form className="client-form" onSubmit={submit}><label>Nome completo<input placeholder="Digite seu nome" value={form.name} onChange={update('name')} /></label><label>Telefone<input placeholder="(00) 00000-0000" value={form.phone} onChange={update('phone')} /></label><label>E-mail<input type="email" placeholder="seu@email.com" value={form.email} onChange={update('email')} /></label><label>Senha<input type="password" placeholder="Digite sua senha" value={form.password} onChange={update('password')} /></label>{error && <ClientAlert>{error}</ClientAlert>}<button className="client-primary" disabled={loading}>{loading ? 'Criando conta...' : 'Criar conta'}</button></form><button className="client-link" onClick={onBack}>Já possui uma conta? Entrar</button></ClientFrame>;
}
