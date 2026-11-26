# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

People broadly, similar to the audience of Twitter/X. Specific user segments,
situations, and priority jobs remain open.

## Product Purpose

Pairfy's `services/ui` app is a general-purpose social app centered on posts
published through a distributed social protocol. Success criteria remain open.

## Positioning

Posts use a distributed social protocol. The protocol and the way posts are
distributed are not yet specified.

## Operating Context

This is a web app in `services/ui`. Users register with a Cardano wallet; the
wallet's confirmed role is registration.

## Capabilities and Constraints

- Confirmed: Cardano wallet registration and posts using a distributed social
  protocol.
- The exact protocol, post storage and distribution, wallet support, and
  registration mechanics remain open.
- Core interactions beyond the Twitter/X comparison, including following,
  replies, reactions, and moderation, are not yet specified.
- Payments, tipping, and other wallet actions are not established requirements.
- The current app uses Vue 3, Vite, and TypeScript.

## Brand Commitments

The app is named Pairfy in the existing repository.

## Evidence on Hand

The product direction above was confirmed by the user for `services/ui`. The
current source contains a social-feed prototype in `src/App.vue` with demo feed
state and local interactions in `src/stores/feed.ts`; treat these as
implementation evidence, not additional confirmed product requirements. The
inspected UI/store does not establish an integration with a particular social
protocol or backend. The repository-root README and whitepaper describe a
Pairfy e-commerce marketplace; treat those claims as broader or earlier product
context, not as confirmed requirements for this app.

## Product Principles

- Serve a broad audience, not only Cardano community members.
- Use a Cardano wallet for registration; do not assume it is needed for
  payments or other on-chain actions.
- Preserve distributed posts as a core requirement without assuming a specific
  protocol or storage architecture.
