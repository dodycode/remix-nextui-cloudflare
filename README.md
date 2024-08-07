# Welcome to Remix + Vite + NextUI + Cloudflare

📖 See the [Remix docs](https://remix.run/docs) and the [Remix Vite docs](https://remix.run/docs/en/main/future/vite) for details on supported features.

## Getting Started

```shellscript
npx create-remix@latest --template https://github.com/dodycode/remix-nextui-cloudflare
```

## Built in theme switcher

![theme switcher](theme-switcher.png)

# Hooks

This template comes with a few hooks to help you get started.

# API Wrapper

This template has a built in API wrapper that you can use to fetch data from your API in your loader functions or actions.

```js
import apiClient from "~/utils/api";

export const loader = async ({ request }) => {
  const data = await apiClient.get("/api/data");
  return json(data);
};
```

## Typegen

Generate types for your Cloudflare bindings in `wrangler.toml`:

```sh
npm run typegen
```

You will need to rerun typegen whenever you make changes to `wrangler.toml`.

## Development

Run the Vite dev server:

```sh
npm run dev
```

To run Wrangler:

```sh
npm run build
npm run start
```

## Deployment

> [!WARNING]  
> Cloudflare does _not_ use `wrangler.toml` to configure deployment bindings.
> You **MUST** [configure deployment bindings manually in the Cloudflare dashboard][bindings].

First, build your app for production:

```sh
npm run build
```

Then, deploy your app to Cloudflare Pages:

```sh
npm run deploy
```

[bindings]: https://developers.cloudflare.com/pages/functions/bindings/
