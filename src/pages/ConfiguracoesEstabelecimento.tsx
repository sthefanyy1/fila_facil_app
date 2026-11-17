import { useState } from 'react';
import './estabelecimento-interior.css';
import { Header } from './FilaEstabelecimento';

type Props = { onBack: () => void; onServices: () => void; onEmployees: () => void; onNotifications: () => void };

export default function ConfiguracoesEstabelecimento({ onBack, onServices, onEmployees, onNotifications }: Props) {
  const [error, setError] = useState('');
  return <main className="est-page"><Header title="Configurações" onBack={onBack} /><section className="business-profile"><strong>B</strong><div><b>Barbearia do João</b><span>CNPJ: 12.345.678/0001-90</span></div></section><div className="settings-list"><SettingsRow label="Perfil da empresa" onClick={() => setError('Não foi possível carregar o perfil da empresa.')} /><SettingsRow label="Serviços" onClick={onServices} /><SettingsRow label="Funcionários" onClick={onEmployees} /><SettingsRow label="Notificações" onClick={onNotifications} /></div>{error && <p className="est-feedback error" role="alert">{error}</p>}<button className="logout-button" type="button" onClick={onBack}>Sair</button></main>;
}

function SettingsRow({ label, onClick }: { label: string; onClick: () => void }) { return <button className="settings-row" type="button" onClick={onClick}><span className="settings-icon">•</span><span>{label}</span><b>›</b></button>; }
