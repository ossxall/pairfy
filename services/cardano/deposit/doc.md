DepositDatum {
  owner: user1_pkh,
  principal: 10_000_000,
  unlock_time: deposit_timestamp + 7_776_000_000,
}

DepositDatum {
  owner: user2_pkh,
  principal: 25_000_000,
  unlock_time: deposit_timestamp + 7_776_000_000,
}

FASE 1 — Depósitos
- Usuario 1 deposita 10 ADA.
- Usuario 2 deposita 25 ADA.
- Deposit Minting Policy crea los NFT identificadores.
- Deposit Validator bloquea los fondos durante 90 días.


FASE 2 — Staking
- Los UTxO permanecen en el Deposit Validator.
- Comparten una Stake Credential controlada por el protocolo.
- La Stake Credential se registra y delega al pool.
- El stake se contabiliza según los snapshots de Cardano.


FASE 3 — Recompensas
- Cardano acredita las recompensas en la Reward Account.
- El Stake Validator controla su retiro.
- El 100% se envía a la tesorería.
- Los usuarios no reciben recompensas.


FASE 4 — Vencimiento
- Usuario 1 recupera sus 10 ADA.
- Usuario 2 recupera sus 25 ADA.
- El protocolo conserva las recompensas acumuladas.