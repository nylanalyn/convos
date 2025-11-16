# Repository Guidelines

## Project Structure & Module Organization
- `lib/` and `templates/` hold the Mojolicious backend (controllers, plugins, helpers, and HTML templates). Keep new services under `lib/Convos/...` so `script/convos dev` hot reloads them.
- `assets/` is the Svelte client (`App.svelte`, `components/`, `store/`, `js/`, and `sass/`); SCSS compiled assets land in `public/` alongside static files like `public/sw.js`.
- Tests are split between Perl integration suites in `t/` and Vitest specs in `test/`; larger browser fixtures live in `t/Server` and `test/store`.
- Operational tooling lives in `script/` (CLI, installer, release helper) and deployment metadata in `snap/`, `Dockerfile`, and `assets/i18n`.

## Build, Test, and Development Commands
- Install once with `npm install` plus `./script/convos install --core` for Perl deps.
- `npm run dev` (alias for `./script/convos dev`) starts Morbo with live watchers; use `npm run watch` when only rebuilding front-end assets.
- `npm run build` performs a Vite production build; pair with `./script/convos build release` before tagging.
- Linting and smoke checks: `npm run check` (svelte-check), `npm run lint`, `npm run test`, `npm run coverage`.
- Backend suites: `prove -lr t` or narrow with `TEST_NETWORKS=snoonet prove -vl t/irc-real-servers.t`.

## Coding Style & Naming Conventions
- JavaScript/Svelte files use ECMAScript modules, 2-space indentation, single quotes, and PascalCase component names (`assets/components/MainMenu.svelte`). Utility modules remain camelCase (`assets/js/Notify.js`), stores are noun-based (`ThemeManager.js`).
- SCSS variables belong in `assets/sass`, and translations are keyed under `assets/i18n/<locale>.json`.
- Perl modules follow `Convos::Namespace` naming; prefer method names like `do_something` and keep lexical `my` scoping. Run `perltidy` if you adjust existing files.
- Run `eslint` and `svelte-check` before committing; both respect the local config and catch stylistic drift quickly.

## Testing Guidelines
- Unit specs end with `.test.js` or `.test.ts`; colocate helper fixtures under `test/util/` or `test/store/`. Use `vitest --run --reporter verbose` when debugging CI-only failures.
- Perl tests mirror runtime concerns (`t/web-*.t`, `t/irc-*.t`). Use `CONVOS_TIME`, `TEST_NETWORKS`, or other env toggles documented in each file’s header comments to reproduce edge cases.
- New features should include at least one Vitest spec and, when touching Mojolicious routes, a `t/web-*.t` coverage point. Regressions require updating `t/production-resources.t` expectations if assets move.

## Commit & Pull Request Guidelines
- Follow the existing Conventional Commit flavor: `type(scope): description (#issue)` (e.g., `chore(deps): update dependency vite to v6 (#919)`).
- Commits should remain focused (frontend vs backend in separate commits when possible) and reference GitHub issues.
- PRs need a short summary, reproduction or testing notes (`npm run test`, `prove -lr t`), linked issues, and UI screenshots/gifs for visual tweaks. Tag documentation updates in the description so release notes capture them.

## Security & Configuration Tips
- Never commit secrets; rely on local `CONVOS_*` env vars or `convos daemon --listen http://*:3000` arguments instead.
- Review `SECURITY.md` before handling vulnerability reports, and mention any hardening-related work there.
