import { addDoc, collection, doc, getDoc, onSnapshot, query, runTransaction, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import { auth, db } from './firebase';

export const FIGMA_ESTABLISHMENT_ID = 'barbearia-do-joao';

export type QueueEntry = { id: string; ticket: string; userId: string; userName: string; service: string; status: 'waiting' | 'called' | 'finished' | 'cancelled'; createdAtMillis: number; };
export type QueueListener = (entry: QueueEntry | null, peopleAhead: number, error?: string) => void;

export async function createAppointmentAndQueue({ service, date, time }: { service: string; date: string; time: string }) {
  const user = auth.currentUser;
  if (!user) throw new Error('auth-required');
  const counterRef = doc(db, 'contadores', FIGMA_ESTABLISHMENT_ID);
  const queueRef = doc(collection(db, 'filas'));
  const ticket = await runTransaction(db, async transaction => {
    const counter = await transaction.get(counterRef);
    const next = (counter.exists() ? Number(counter.data().proximaSenha || 1) : 1);
    const ticketValue = `A${String(next).padStart(2, '0')}`;
    transaction.set(counterRef, { proximaSenha: next + 1, estabelecimentoId: FIGMA_ESTABLISHMENT_ID }, { merge: true });
    transaction.set(queueRef, { estabelecimentoId: FIGMA_ESTABLISHMENT_ID, userId: user.uid, userName: user.displayName || 'Cliente', service, ticket: ticketValue, status: 'waiting', createdAt: serverTimestamp(), createdAtMillis: Date.now() });
    return ticketValue;
  });
  await addDoc(collection(db, 'agendamentos'), { estabelecimentoId: FIGMA_ESTABLISHMENT_ID, userId: user.uid, service, date, time, ticket, queueId: queueRef.id, status: 'confirmed', createdAt: serverTimestamp() });
  return ticket;
}

export function subscribeClientQueue(listener: QueueListener) {
  const user = auth.currentUser;
  if (!user) { listener(null, 0, 'Faça login para acompanhar sua fila.'); return () => undefined; }
  const queueQuery = query(collection(db, 'filas'), where('estabelecimentoId', '==', FIGMA_ESTABLISHMENT_ID));
  return onSnapshot(queueQuery, snapshot => {
    const entries = snapshot.docs.map(item => ({ id: item.id, ...item.data() } as QueueEntry)).filter(item => item.status === 'waiting' || item.status === 'called').sort((a, b) => a.createdAtMillis - b.createdAtMillis);
    const entry = entries.find(item => item.userId === user.uid) || null;
    listener(entry, entry ? entries.findIndex(item => item.id === entry.id) : 0);
  }, () => listener(null, 0, 'Não foi possível atualizar a fila em tempo real.'));
}

export function subscribeEstablishmentQueue(listener: (entries: QueueEntry[], error?: string) => void) {
  const queueQuery = query(collection(db, 'filas'), where('estabelecimentoId', '==', FIGMA_ESTABLISHMENT_ID));
  return onSnapshot(queueQuery, snapshot => { const entries = snapshot.docs.map(item => ({ id: item.id, ...item.data() } as QueueEntry)).filter(item => item.status === 'waiting').sort((a, b) => a.createdAtMillis - b.createdAtMillis); listener(entries); }, () => listener([], 'Não foi possível carregar a fila em tempo real.'));
}

export async function updateQueueStatus(id: string, status: QueueEntry['status']) { await updateDoc(doc(db, 'filas', id), { status, updatedAt: serverTimestamp() }); }
