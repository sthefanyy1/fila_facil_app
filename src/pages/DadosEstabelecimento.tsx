import { FormEvent, useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import './dados-estabelecimento.css';
import backIcon from './data-back.svg';
import locationIcon from './data-location.svg';
import lockIcon from './login-lock.svg';
import eyeIcon from './data-eye-confirm.svg';
const eyeConfirmIcon = eyeIcon;

export default function DadosEstabelecimento({ onCreated, onBack }: { onCreated: () => void; onBack: () => void }) {
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent) {
    event.preventDefault(); setError('');
    if (password.length < 8) { setError('A senha deve ter pelo menos 8 caracteres.'); return; }
    if (password !== confirmation) { setError('As senhas não coincidem.'); return; }
    setBusy(true);
    try {
      const draft = JSON.parse(sessionStorage.getItem('filafacil.businessDraft') || '{}');
      const credential = await createUserWithEmailAndPassword(auth, draft.email, password);
      await setDoc(doc(db, 'establishments', credential.user.uid), { ...draft, address, ownerUid: credential.user.uid, createdAt: new Date().toISOString() });
      sessionStorage.removeItem('filafacil.businessDraft'); onCreated();
    } catch { setError('Não foi possível criar a conta. Confira os dados e o Firebase.'); } finally { setBusy(false); }
  }
  return <main className="data-screen"><header className="data-topbar"><button type="button" onClick={onBack} aria-label="Voltar"><img src={backIcon} alt="" /></button><h1>Criar conta da empresa</h1></header><form onSubmit={submit}><h2>Complete seu cadastro</h2><DataField label="Endereço da empresa" placeholder="Digite o endereço" icon={locationIcon} value={address} onChange={setAddress} /><PasswordField label="Senha" placeholder="Digite sua senha" icon={lockIcon} value={password} onChange={setPassword} visible={showPassword} onToggle={() => setShowPassword((v) => !v)} eye={eyeIcon} /><PasswordField label="Confirmar senha" placeholder="Confirme sua senha" icon={lockIcon} value={confirmation} onChange={setConfirmation} visible={showConfirmation} onToggle={() => setShowConfirmation((v) => !v)} eye={eyeConfirmIcon} /><div className="password-hint">Sua senha deve ter pelo menos 8 caracteres.</div>{error && <p className="data-error">{error}</p>}<button className="data-primary" disabled={busy} type="submit">{busy ? 'Criando conta…' : 'Criar conta da empresa'}</button><p className="terms">Ao continuar, você concorda com os termos de uso.</p></form></main>;
}

function DataField({ label, placeholder, icon, value, onChange }: { label: string; placeholder: string; icon: string; value: string; onChange: (v: string) => void }) { return <label className="data-field"><span>{label}</span><div><img src={icon} alt="" /><input placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} required /></div></label>; }
function PasswordField({ label, placeholder, icon, eye, value, onChange, visible, onToggle }: { label: string; placeholder: string; icon: string; eye: string; value: string; onChange: (v: string) => void; visible: boolean; onToggle: () => void }) { return <label className="data-field"><span>{label}</span><div><img src={icon} alt="" /><input type={visible ? 'text' : 'password'} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} required /><button type="button" onClick={onToggle} aria-label={visible ? 'Ocultar senha' : 'Mostrar senha'}><img src={eye} alt="" /></button></div></label>; }
