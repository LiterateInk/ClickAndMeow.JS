<img alt="ClickAndMeow: A meow-mazing wrapper for Clic&Miam." src="https://raw.githubusercontent.com/LiterateInk/ClickAndMeow.JS/main/.github/assets/banner.svg" width="100%" />

[![Checks](https://github.com/LiterateInk/ClickAndMeow.JS/actions/workflows/checks.yml/badge.svg?branch=main)](https://github.com/LiterateInk/ClickAndMeow.JS) [![NPM Downloads](https://img.shields.io/npm/dm/clickandmeow)](https://www.npmjs.com/package/clickandmeow) ![Discord](https://img.shields.io/discord/1205628496492101693?label=discord&color=%235865F2)

*This library **is not** affiliated with [&nearr;&nbsp;Clic&Miam](https://www.clicetmiam.fr/) in any way.*

## What is "Clic&Miam" ?

[&nearr;&nbsp;Clic&Miam](https://www.clicetmiam.fr/) is a management software used by some restaurants in France. It allows restaurants to publish their menus online to be seen by customers.

## Installation

Use your favorite package manager to install this library from the npm registry.

```bash
# pnpm
pnpm add clickandmeow

# Yarn
yarn add clickandmeow

# npm
npm add clickandmeow

# Bun
bun add clickandmeow
```

## Quick Start

```typescript
import * as ClickAndMeow from "clickandmeow";

// You first have to authenticate with Clic&Miam to get a session.
// Once you have a session, you can use it to make requests to Clic&Miam.
const session = await ClickAndMeow.login("username", "password");

// Let's grab the list of establishments for the current user.
const establishments = await ClickAndMeow.getEstablishments(session);
console.log(establishments);
```

You can find guides at [**&nearr;&nbsp;clickandmeow.docs.literate.ink**](https://clickandmeow.docs.literate.ink) and if it's not enough you can also take a look at the [**&nearr;&nbsp;examples** directory on the GitHub repository`](https://github.com/LiterateInk/ClickAndMeow.JS/tree/main/examples) for inspiration.

If none of those are helpful, you can always [&nearr;&nbsp;open an issue](https://github.com/LiterateInk/ClickAndMeow.JS/issues) to ask for help or join the [&nearr;&nbsp;LiterateInk Discord server](https://literate.ink/discord).

## License

This project is licensed under the GPL-3.0 License - see the [LICENSE.md](LICENSE.md) file for details.
