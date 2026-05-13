import { useEffect, useMemo, useState } from 'react';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

export type Item = {
  id: string;
  name: string;
  description: string | null;
  patrimony_code: string | null;
  acquisition_date: string | null;
  acquisition_value: number | null;
  current_state: string | null;
  location: string | null;
  responsible: string | null;
  depreciation_rate: number | null;
  is_deleted: boolean;
  deleted_at: string | null;
  deleted_by: string | null;
  created_at: string;
  updated_at: string;
};

export type ItemWithLastChange = Item & {
  last_changed_by_email: string | null;
  last_changed_at: string | null;
  last_change_summary: string | null;
};

export type ItemHistory = {
  id: number;
  uuid: string;
  item_id: string;
  snapshot: Item;
  changed_by: string | null;
  changed_at: string;
  change_summary: string | null;
};

export type InventoryBackup = {
  exportedAt: string;
  items: Item[];
  history: ItemHistory[];
  files: Array<Record<string, unknown>>;
};

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase URL ou Anon Key não encontradas no arquivo .env');
}

export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null as unknown as SupabaseClient;

export async function listActiveItems(client: SupabaseClient = supabase) {
  if (!client) throw new Error('Supabase não configurado. Verifique o arquivo .env');
  const { data, error } = await client
    .from('items_with_last_change')
    .select('*')
    .eq('is_deleted', false)
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return data as ItemWithLastChange[];
}

export async function getTrashCount(client: SupabaseClient = supabase) {
  const { count, error } = await client
    .from('items')
    .select('id', { count: 'exact', head: true })
    .eq('is_deleted', true);

  if (error) throw error;
  return count ?? 0;
}

export async function listTrash(client: SupabaseClient = supabase) {
  const { data, error } = await client
    .from('items')
    .select('*')
    .eq('is_deleted', true)
    .order('deleted_at', { ascending: false });

  if (error) throw error;
  return data as Item[];
}

export async function softDeleteItem(itemId: string, client: SupabaseClient = supabase) {
  const { error } = await client
    .from('items')
    .update({ is_deleted: true })
    .eq('id', itemId);

  if (error) throw error;
}

export async function restoreFromTrash(itemId: string, client: SupabaseClient = supabase) {
  const { error } = await client
    .from('items')
    .update({ is_deleted: false, deleted_at: null, deleted_by: null })
    .eq('id', itemId);

  if (error) throw error;
}

export async function permanentlyDeleteItem(
  itemId: string,
  fourDigitPin: string,
  client: SupabaseClient = supabase,
) {
  const { error } = await client.rpc('permanently_delete_item', {
    target_item_id: itemId,
    master_pin: fourDigitPin,
  });

  if (error) throw error;
}

export async function listItemHistory(itemId: string, client: SupabaseClient = supabase) {
  const { data, error } = await client
    .from('items_history')
    .select('*')
    .eq('item_id', itemId)
    .order('changed_at', { ascending: false })
    .order('id', { ascending: false });

  if (error) throw error;
  return data as ItemHistory[];
}

export async function restoreVersion(historyUuid: string, client: SupabaseClient = supabase) {
  const { data, error } = await client.rpc('restore_item_version', {
    target_history_uuid: historyUuid,
  });

  if (error) throw error;
  return data as Item;
}

export async function exportFiscalCsv(client: SupabaseClient = supabase) {
  const items = await listActiveItems(client);
  const headers = ['patrimony_code', 'name', 'acquisition_date', 'acquisition_value', 'location', 'responsible'];
  const lines = items.map((item) =>
    headers
      .map((key) => JSON.stringify(String(item[key as keyof ItemWithLastChange] ?? '')))
      .join(','),
  );

  return [headers.join(','), ...lines].join('\n');
}

export async function exportBackupJson(client: SupabaseClient = supabase): Promise<InventoryBackup> {
  const [items, history, files] = await Promise.all([
    client.from('items').select('*'),
    client.from('items_history').select('*'),
    client.from('files').select('*'),
  ]);

  if (items.error) throw items.error;
  if (history.error) throw history.error;
  if (files.error) throw files.error;

  return {
    exportedAt: new Date().toISOString(),
    items: items.data as Item[],
    history: history.data as ItemHistory[],
    files: files.data ?? [],
  };
}

export async function importBackupJson(backup: InventoryBackup) {
  // Nunca exponha service_role no browser: esta chamada deve apontar para uma Edge Function
  // ou endpoint server-side que usa service_role para sobrescrever items_history por id.
  const response = await fetch('/functions/v1/inventory-import-backup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(backup),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }
}

export function LastChangeFooter({ item }: { item: ItemWithLastChange }) {
  if (!item.last_changed_at) return <footer>Nenhuma alteração registrada.</footer>;

  return (
    <footer>
      Última alteração por {item.last_changed_by_email ?? 'usuário desconhecido'} em{' '}
      {new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(
        new Date(item.last_changed_at),
      )}
    </footer>
  );
}

export function TrashNavIcon({ client = supabase }: { client?: SupabaseClient }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    void getTrashCount(client).then(setCount);
  }, [client]);

  return <a href="/trash" aria-label={`Lixeira com ${count} itens`}>🗑️ {count}</a>;
}

export function TrashRow({ item, onRestored }: { item: Item; onRestored: () => void }) {
  const [pin, setPin] = useState('');
  const [showPinModal, setShowPinModal] = useState(false);

  return (
    <article style={{ opacity: 0.6 }}>
      <strong>{item.name}</strong>
      <button type="button" onClick={() => restoreFromTrash(item.id).then(onRestored)}>
        Restaurar
      </button>
      <button type="button" onClick={() => setShowPinModal(true)}>
        Excluir Perm.
      </button>

      {showPinModal && (
        <dialog open>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              void permanentlyDeleteItem(item.id, pin).then(onRestored);
            }}
          >
            <label>
              Senha mestra de 4 dígitos
              <input
                inputMode="numeric"
                maxLength={4}
                pattern="[0-9]{4}"
                value={pin}
                onChange={(event) => setPin(event.target.value)}
              />
            </label>
            <button type="submit">Confirmar exclusão permanente</button>
            <button type="button" onClick={() => setShowPinModal(false)}>
              Cancelar
            </button>
          </form>
        </dialog>
      )}
    </article>
  );
}

export function HistoryTimeline({ history }: { history: ItemHistory[] }) {
  const orderedHistory = useMemo(
    () => [...history].sort((a, b) => b.changed_at.localeCompare(a.changed_at) || b.id - a.id),
    [history],
  );

  return (
    <ol>
      {orderedHistory.map((entry) => (
        <li key={entry.uuid}>
          <time>{new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(entry.changed_at))}</time>
          <p>{entry.change_summary ?? 'Alteração registrada'}</p>
          <pre>{JSON.stringify(entry.snapshot, null, 2)}</pre>
          <button type="button" onClick={() => restoreVersion(entry.uuid)}>
            🕘 Restaurar versão
          </button>
        </li>
      ))}
    </ol>
  );
}
