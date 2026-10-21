import { FormEvent, useState } from 'react';
import './signup.css';
import backIcon from './signup-back.svg';
import companyIcon from './signup-company.svg';
import personIcon from './signup-person.svg';
import mailIcon from './signup-mail.svg';
import phoneIcon from './signup-phone.svg';

type Props = { onBack: () => void; onLogin: () => void };
type Values = { company: string; cnpj: string; owner: string; email: string; phone: string };

export default function SignupScreen({ onBack, onLogin }: Props) {
  const [values, setValues] = useState<Values>({ company: '', cnpj: '', owner: '', email: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);
  const set = (field: keyof Values) => (value: string) => setValues((current) => ({ ...current, [field]: value }));
  const submit = (event: FormEvent) => { event.preventDefault(); sessionStorage.setItem('filafacil.businessDraft', JSON.stringify(values)); setSubmitted(true); };
  return <main className="signup-screen">
    <header className="signup-topbar"><button type="button" onClick={onBack} aria-label="Voltar"><img src={backIcon} alt="" /></button><h1>Criar conta da empresa</h1></header>
    <form onSubmit={submit}><h2>Crie a conta da sua empresa</h2><p className="signup-intro">Preencha seus dados para começar a usar o FilaFácil.</p>
      <SignupField label="Nome da empresa" placeholder="Digite o nome da empresa" icon={companyIcon} value={values.company} onChange={set('company')} />
      <SignupField label="CNPJ" placeholder="Digite o CNPJ" icon={companyIcon} value={values.cnpj} onChange={set('cnpj')} />
      <SignupField label="Nome completo" placeholder="Digite seu nome completo" icon={personIcon} value={values.owner} onChange={set('owner')} />
      <SignupField label="E-mail" type="email" placeholder="Digite seu e-mail" icon={mailIcon} value={values.email} onChange={set('email')} />
      <SignupField label="Telefone" type="tel" placeholder="Digite seu telefone" icon={phoneIcon} value={values.phone} onChange={set('phone')} />
      {submitted && <p className="signup-feedback">Dados salvos. Continue para configurar endereço e senha.</p>}
      <button className="signup-primary" type="submit">Continuar</button>
    </form><button className="signup-login" type="button" onClick={onLogin}>Já possui uma conta? Entrar</button>
  </main>;
}

function SignupField({ label, placeholder, icon, value, onChange, type = 'text' }: { label: string; placeholder: string; icon: string; value: string; onChange: (value: string) => void; type?: string }) {
  return <label className="signup-field"><span>{label}</span><div><img src={icon} alt="" /><input type={type} placeholder={placeholder} value={value} onChange={(event) => onChange(event.target.value)} required /></div></label>;
}
