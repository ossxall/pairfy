
use aiken/collection/list
use aiken/crypto.{ScriptHash, VerificationKeyHash}
use aiken/interval
use cardano/address.{Credential, Script, VerificationKey}
use cardano/assets
use cardano/transaction.{
  OutputReference,
  Transaction,
  InlineDatum,
}

// --------------------------------------------------
// DATUM
// --------------------------------------------------

pub type DepositDatum {
  owner: VerificationKeyHash,
  principal: Int,
  deposit_time: Int,
  unlock_time: Int,
  nft_policy: ByteArray,
  nft_name: ByteArray,
}

// --------------------------------------------------
// MINT REDEEMER
// --------------------------------------------------

pub type DepositMintRedeemer {
  MintDeposit {
    owner: VerificationKeyHash,
    principal: Int,
    deposit_time: Int,
    unlock_time: Int,
    nft_name: ByteArray,
  }
}

// --------------------------------------------------
// SPEND REDEEMER
// --------------------------------------------------

pub type DepositSpendRedeemer {
  Claim
}

// --------------------------------------------------
// CONSTANTS
// 90 days in milliseconds
// --------------------------------------------------

const deposit_duration = 7_776_000_000

const deposit_nft_name = "DEPOSIT"

// --------------------------------------------------
// MINTING POLICY
// Each deposit uses a unique one-shot policy.
// --------------------------------------------------

validator deposit_nft_policy(
  seed: OutputReference,
  deposit_script: ScriptHash,
) {
  mint(
    redeemer: DepositMintRedeemer,
    policy_id: assets.PolicyId,
    self: Transaction,
  ) {
    expect MintDeposit {
      owner,
      principal,
      deposit_time,
      unlock_time,
      nft_name,
    } = redeemer

    // The seed UTxO must be consumed.
    let seed_consumed =
      list.any(
        self.inputs,
        fn(input) {
          input.output_reference == seed
        },
      )

    // Exactly one NFT with the expected name.
    let nft_minted =
      assets.quantity_of(
        self.mint,
        policy_id,
        nft_name,
      ) == 1

    // Owner must authorize the deposit.
    let owner_signed =
      list.has(self.extra_signatories, owner)

    // The deposit must have the correct duration.
    let correct_duration =
      unlock_time == deposit_time + deposit_duration

    // The declared deposit time must be inside
    // the transaction validity interval.
    let valid_deposit_time =
      interval.contains(
        self.validity_range,
        deposit_time,
      )

    // Find the corresponding deposit output.
    let deposit_output_exists =
      list.any(
        self.outputs,
        fn(output) {
          let correct_address =
            output.address.payment_credential
              == Script(deposit_script)

          let correct_nft =
            assets.quantity_of(
              output.value,
              policy_id,
              nft_name,
            ) == 1

          let correct_amount =
            assets.lovelace_of(output.value)
              == principal

          let correct_datum =
            when output.datum is {
              InlineDatum(raw_datum) -> {
                expect DepositDatum {
                  owner: datum_owner,
                  principal: datum_principal,
                  deposit_time: datum_time,
                  unlock_time: datum_unlock,
                  nft_policy: datum_policy,
                  nft_name: datum_name,
                } = raw_datum

                and {
                  datum_owner == owner,
                  datum_principal == principal,
                  datum_time == deposit_time,
                  datum_unlock == unlock_time,
                  datum_policy == policy_id,
                  datum_name == nft_name,
                }
              }
              _ -> False
            }

          and {
            correct_address,
            correct_nft,
            correct_amount,
            correct_datum,
          }
        },
      )

    and {
      seed_consumed,
      nft_minted,
      owner_signed,
      principal > 0,
      correct_duration,
      valid_deposit_time,
      deposit_output_exists,
    }
  }
}

// --------------------------------------------------
// DEPOSIT SPENDING VALIDATOR
// --------------------------------------------------

validator deposit_validator {
  spend(
    datum_opt: Option<DepositDatum>,
    redeemer: DepositSpendRedeemer,
    own_ref: OutputReference,
    self: Transaction,
  ) {
    expect Some(datum) = datum_opt
    expect Claim = redeemer

    expect Some(own_input) =
      self.inputs
        |> transaction.find_input(own_ref)

    // Owner must sign the withdrawal.
    let owner_signed =
      list.has(
        self.extra_signatories,
        datum.owner,
      )

    // The deposit must have reached maturity.
    let matured =
      interval.is_entirely_after(
        self.validity_range,
        datum.unlock_time,
      )

    // Verify that the deposit NFT is present.
    let nft_present =
      assets.quantity_of(
        own_input.output.value,
        datum.nft_policy,
        datum.nft_name,
      ) == 1

    // The owner receives the original principal
    // and the deposit identification NFT.
    let capital_returned =
      list.any(
        self.outputs,
        fn(output) {
          and {
            output.address.payment_credential
              == VerificationKey(datum.owner),

            assets.lovelace_of(output.value)
              >= datum.principal,

            assets.quantity_of(
              output.value,
              datum.nft_policy,
              datum.nft_name,
            ) == 1,
          }
        },
      )

    and {
      owner_signed,
      matured,
      nft_present,
      capital_returned,
    }
  }
}
