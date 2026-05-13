# Fluxo front-end React/TypeScript para inventário colaborativo

Este documento descreve o fluxo recomendado para uma aplicação React/TypeScript usando `@supabase/supabase-js` com o SQL em `supabase/migrations/001_inventory_collaboration.sql`.

## Rotas e telas

- `/items`: lista principal com apenas `is_deleted = false`.
- `/trash`: lixeira com apenas `is_deleted = true`, cards/linhas com opacidade `60%` e ações **Restaurar** e **Excluir Perm.**.
- `/items/:id/history`: linha do tempo de `items_history`, com botão **Restaurar versão** em cada snapshot.
- Exportações:
  - **CSV fiscal**: consulta somente itens ativos; ignora `is_deleted = true`.
  - **Backup JSON**: exporta `items`, `items_history` e `files`.
  - **Import JSON**: upsert de `items` e `files`; histórico é sobrescrito por `id`.

## Componentes de UI exigidos

- Rodapé de detalhes do item: `Última alteração por [email] em [data]`, usando a view `items_with_last_change`.
- Ícone de lixeira na navbar com contador de itens em lixeira.
- Modal de exclusão permanente com senha mestra de 4 dígitos.
- Botão de histórico com ícone de relógio, abrindo uma linha do tempo com restauração por versão.

## Fluxo colaborativo de exemplo

1. João envia um item para a lixeira com `softDeleteItem(itemId)`.
2. Maria vê o contador da lixeira, abre `/trash` e restaura o item com `restoreFromTrash(itemId)`.
3. João edita o valor de aquisição incorretamente com `updateItem(itemId, { acquisition_value: ... })`.
4. Maria abre o histórico, escolhe o snapshot anterior e chama `restoreVersion(historyUuid)`.
5. O trigger registra cada alteração em `items_history`, sempre preservando o estado anterior à mudança.

## Observações de segurança

- Usuários autenticados têm CRUD completo em `items` e `files`, conforme políticas RLS.
- `items_history` permite apenas `SELECT` e `INSERT`; não há políticas nem grants para `UPDATE`/`DELETE`.
- Exclusão permanente não deve chamar `delete()` diretamente na tabela pela UI. Use sempre a RPC `permanently_delete_item`, que roda como `SECURITY DEFINER` e valida a senha mestra.
- Em produção, o PIN deve ser configurado por `service_role` com `select public.set_permanent_delete_pin('1234');` ou por variável/configuração de banco equivalente com hash `crypt`.
