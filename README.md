# Azucar UI

The design system that makes your app sweet.

This design system aims to brings comfort and accessibility to apps. Made for customizability and ease of use, it brings a strong color palette system and multiple settings.

## Installation

```bash
npm install azucar
```

## Usage

First, import the CSS files in your app (for example in `src/routes/+layout.svelte`):

```ts
import "azucar/tokens.css"
import "azucar/base.css"
```

Then you can start using the components and the design tokens in your app. For example:

```html
<script lang="ts">
    import { Button } from "azucar"
</script>

<Button>Click me</Button>
```

Or using the color tokens (to create new custom components or custom styles):

```html
<div style="background-color: var(--color-bg-subtle); color: var(--color-fg-high); padding: var(--size-md); border-radius: var(--corner-radius)">
    This is a card with the background and foreground colors from the color palette.
</div>
```

*Read more about the color palette system and the design tokens in the next sections.*

## Color system

The library provides a color palette system that allows you to easily generate a wide range of colors based on a single base color. It uses the **OKLCH color space**, which is a perceptually uniform color space that allows for more accurate color manipulation and generation. 

- Read more about why OKLCH here: https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl
- Inspiration for the color palette system: https://www.radix-ui.com/colors

From one color, the library generates 4 palettes of 14 colors each:

- **Light Accent**
- **Dark Accent**
- **Light Neutral**
- **Dark Neutral**

| Color name        |    |    |    |    | Usage |
| ----------------- | -- | -- | -- | -- | ----- |
| `bg-app`          |    |    |    |    | Background color of the app. |
| `bg-subtle`       |    |    |    |    | Background color for subtle elements, such as cards or modals. |
| `bg-hover`        |    |    |    |    | Background color for hover states. |
| `bg-active`       |    |    |    |    | Background color for active states. |
| `border-subtle`   |    |    |    |    | Border color for subtle elements or separators. |
| `border`          |    |    |    |    | Border color for general use. |
| `border-focus`    |    |    |    |    | Border color for focused elements. |
| `bg-solid`        |    |    |    |    | Background color for solid elements, such as buttons. *This is also the base color* |
| `bg-solid-hover`  |    |    |    |    | Background color for solid elements on hover. |
| `bg-solid-active` |    |    |    |    | Background color for solid elements on active state. |
| `fg-low`          |    |    |    |    | Foreground/text color low contrast. |
| `fg-high`         |    |    |    |    | Foreground/text color high contrast. |
| `fg-solid`        |    |    |    |    | Foreground/text color on top of solid backgrounds, is dark or light based on the contrast between background/foreground |

*Prefix the color names by `--color` to get the associated token.*

## Tokens

The library provides a set of design tokens that can be used to maintain consistency across your app. These include sizes, spacings, corner radii and colors.

You can find the full list of tokens in the [tokens file](./src/lib/styles/tokens.css).

## Components

Components are self-documented, here is a list of the ones currently available:

- Layout
  - [Box](./src/lib/components/layout/Box.svelte)
  - [Flex](./src/lib/components/layout/Flex.svelte)
  - [Stack](./src/lib/components/layout/Stack.svelte)
- [Avatar](./src/lib/components/Avatar.svelte) 
- [Badge](./src/lib/components/Badge.svelte)
- [Button](./src/lib/components/Button.svelte)
- [Frame](./src/lib/components/Frame.svelte)
- [Button Group](./src/lib/components/ButtonGroup.svelte) 
- [Slider](./src/lib/components/Slider.svelte)
- [Switch](./src/lib/components/Switch.svelte)
- [Text Input](./src/lib/components/TextInput.svelte)
- [Table](./src/lib/components/Table.svelte)
- Modal ⌛
- Tooltip ⌛
- Toast ⌛
- Tabs ⌛

*🚧 = Design done, implementation in progress.*
*⌛ = Design in progress.*

*You can easily create custom components that fits with Azucar UI using the design tokens and the color palette system.*