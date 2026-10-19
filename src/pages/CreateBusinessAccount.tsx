import { FormEvent, useState } from 'react';
import { IonIcon, IonInput, IonItem, IonLabel, IonButton, IonText } from '@ionic/react';
import { arrowBackOutline, businessOutline, callOutline, mailOutline, personOutline } from 'ionicons/icons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

type FormValues = { company: string; cnpj: string; owner: string; email: string; phone: string };

const initialValues: FormValues = { company: '', cnpj: '', owner: '', email: '', phone: '' };

export default function CreateBusinessAccount() {
  const [values, setValues] = useState(initialValues);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const update = (field: keyof FormValues, value: string) => setValues((current) => ({ ...current, [field]: value }));

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setBusy(true);
    try {
      const temporaryPassword = crypto.randomUUID();
      const credential = await createUserWithEmailAndPassword(auth, values.email.trim(), temporaryPassword);
      await setDoc(doc(db, 'establishments', credential.user.uid), {
        companyName: values.company.trim(),
        cnpj: values.cnpj.trim(),
        ownerName: values.owner.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        ownerUid: credential.user.uid,
        createdAt: new Date().toISOString(),
      });
    } catch {
      setError('Não foi possível criar a conta. Confira os dados e a configuração do Firebase.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="signup-shell">
      <header className="topbar">
        <button className="back-button" aria-label="Voltar"><IonIcon icon={arrowBackOutline} /></button>
        <h1>Criar conta da empresa</h1>
      </header>

      <form className="signup-form" onSubmit={submit}>
        <h2>Crie a conta da sua empresa</h2>
        <p className="intro">Preencha seus dados para começar a usar o FilaFácil.</p>

        <Field label="Nome da empresa" placeholder="Digite o nome da empresa" icon={businessOutline} value={values.company} onChange={(v) => update('company', v)} />
        <Field label="CNPJ" placeholder="Digite o CNPJ" icon={businessOutline} value={values.cnpj} onChange={(v) => update('cnpj', v)} />
        <Field label="Nome completo" placeholder="Digite seu nome completo" icon={personOutline} value={values.owner} onChange={(v) => update('owner', v)} />
        <Field label="E-mail" type="email" placeholder="Digite seu e-mail" icon={mailOutline} value={values.email} onChange={(v) => update('email', v)} />
        <Field label="Telefone" type="tel" placeholder="Digite seu telefone" icon={callOutline} value={values.phone} onChange={(v) => update('phone', v)} />

        {error && <IonText color="danger"><p className="error-message">{error}</p></IonText>}
        <IonButton className="primary-button" type="submit" expand="block" disabled={busy}>
          {busy ? 'Criando conta…' : 'Continuar'}
        </IonButton>
        <button type="button" className="login-link">Já possui uma conta? Entrar</button>
      </form>
    </main>
  );
}

function Field({ label, placeholder, icon, value, onChange, type = 'text' }: { label: string; placeholder: string; icon: string; value: string; onChange: (value: string) => void; type?: 'text' | 'email' | 'tel' }) {
  return (
    <IonItem className="form-field" lines="none">
      <IonLabel position="stacked">{label}</IonLabel>
      <div className="input-wrap">
        <IonIcon icon={icon} aria-hidden="true" />
        <IonInput type={type} placeholder={placeholder} value={value} onIonInput={(event) => onChange(event.detail.value ?? '')} required />
      </div>
    </IonItem>
  );
}
