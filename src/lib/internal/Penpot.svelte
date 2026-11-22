<script lang="ts">
    import Button from '../components/Button.svelte';
    import { Pen } from '@lucide/svelte';

    // --- Penpot ---
    // Component to export values to Penpot token.
    // This component have been made using AI to speed-up the process.

    interface TokenMapping {
        name: string;
        cssVar: string;
    }

    interface FontSizeMapping {
        name: string;
        tag: keyof HTMLElementTagNameMap;
        fallbackVar: string;
    }

    interface BoxShadowValue {
        color: string;
        offsetX: string;
        offsetY: string;
        blur: string;
        spread: string;
        inset: boolean;
    }

    interface TypographyValue {
        fontFamily: string;
        fontSize: string;
        fontWeight: string;
        lineHeight: string;
    }

    type PenpotToken =
        | {
              $type:
                  | 'color'
                  | 'borderRadius'
                  | 'dimension'
                  | 'fontFamilies'
                  | 'fontSizes'
                  | 'fontWeights'
                  | 'spacing';
              $value: string;
          }
        | { $type: 'number'; $value: number }
        | { $type: 'boxShadow'; $value: BoxShadowValue }
        | { $type: 'typography'; $value: TypographyValue };

    const COLOR_TOKENS: TokenMapping[] = [
        { name: 'bg', cssVar: '--color-bg' },
        { name: 'bg-active', cssVar: '--color-bg-active' },
        { name: 'bg-app', cssVar: '--color-bg-app' },
        { name: 'bg-hover', cssVar: '--color-bg-hover' },
        { name: 'bg-solid', cssVar: '--color-bg-solid' },
        { name: 'bg-solid-hover', cssVar: '--color-bg-solid-hover' },
        { name: 'bg-subtle', cssVar: '--color-bg-subtle' },
        { name: 'border', cssVar: '--color-border' },
        { name: 'border-focus', cssVar: '--color-border-focus' },
        { name: 'border-subtle', cssVar: '--color-border-subtle' },
        { name: 'danger', cssVar: '--color-danger' },
        { name: 'fg-high', cssVar: '--color-fg-high' },
        { name: 'fg-low', cssVar: '--color-fg-low' },
        { name: 'fg-solid', cssVar: '--color-fg-solid' },
        { name: 'success', cssVar: '--color-success' },
        { name: 'warning', cssVar: '--color-warning' }
    ];

    const RADIUS_TOKENS: TokenMapping[] = [
        { name: 'corner-radius', cssVar: '--corner-radius' },
        { name: 'corner-radius-full', cssVar: '--corner-radius-full' },
        { name: 'corner-radius-sm', cssVar: '--corner-radius-sm' }
    ];

    const DIMENSION_TOKENS: TokenMapping[] = [
        { name: 'size-xxs', cssVar: '--size-xxs' },
        { name: 'size-xs', cssVar: '--size-xs' },
        { name: 'size-sm', cssVar: '--size-sm' },
        { name: 'size-md', cssVar: '--size-md' },
        { name: 'size-lg', cssVar: '--size-lg' },
        { name: 'size-xl', cssVar: '--size-xl' },
        { name: 'size-xxl', cssVar: '--size-xxl' }
    ];

    const SPACING_TOKENS: TokenMapping[] = [
        { name: 'button-y-padding', cssVar: '--padding-y-icon' },
        { name: 'gap-icon', cssVar: '--gap-icon' },
        { name: 'padding-x-icon', cssVar: '--padding-x-icon' },
        { name: 'spacing-xxs', cssVar: '--size-xxs' },
        { name: 'spacing-xs', cssVar: '--size-xs' },
        { name: 'spacing-sm', cssVar: '--size-sm' },
        { name: 'spacing-md', cssVar: '--size-md' },
        { name: 'spacing-lg', cssVar: '--size-lg' },
        { name: 'spacing-xl', cssVar: '--size-xl' },
        { name: 'spacing-xxl', cssVar: '--size-xxl' }
    ];

    const FONT_SIZE_TOKENS: FontSizeMapping[] = [
        { name: 'size-h1', tag: 'h1', fallbackVar: '--size-xxl' },
        { name: 'size-h2', tag: 'h2', fallbackVar: '--size-xl' },
        { name: 'size-h3', tag: 'h3', fallbackVar: '--size-lg' },
        { name: 'size-label', tag: 'label', fallbackVar: '--size-sm' },
        { name: 'size-text', tag: 'p', fallbackVar: '--size-md' }
    ];

    function toHex(cssColor: string): string {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        const ctx = canvas.getContext('2d', { colorSpace: 'srgb' });

        if (!ctx) return '#000000';

        ctx.clearRect(0, 0, 1, 1);
        ctx.fillStyle = cssColor;
        ctx.fillRect(0, 0, 1, 1);

        const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
        const hex = [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');

        return a < 255 ? `#${hex}${a.toString(16).padStart(2, '0')}` : `#${hex}`;
    }

    function resolveDimension(probe: HTMLDivElement, cssVar: string): string {
        probe.style.width = `var(${cssVar})`;
        const px = parseFloat(getComputedStyle(probe).width) || 0;
        return `${Math.round(px * 100) / 100}px`;
    }

    function cleanFontFamily(fontFamilyStr: string): string {
        return fontFamilyStr.split(',')[0].replace(/['"]/g, '').trim();
    }

    function downloadPenpotTokens(rootElement: Element = document.documentElement): void {
        const target = rootElement instanceof Element ? rootElement : document.documentElement;

        const probe = document.createElement('div');
        probe.style.position = 'fixed';
        probe.style.visibility = 'hidden';
        probe.style.pointerEvents = 'none';
        target.appendChild(probe);

        const tokens: Record<string, PenpotToken> = {};

        // colors
        for (const token of COLOR_TOKENS) {
            probe.style.color = `var(${token.cssVar})`;
            tokens[token.name] = {
                $type: 'color',
                $value: toHex(getComputedStyle(probe).color)
            };
        }

        // border radius
        for (const token of RADIUS_TOKENS) {
            tokens[token.name] = {
                $type: 'borderRadius',
                $value: resolveDimension(probe, token.cssVar)
            };
        }

        // dimensions
        for (const token of DIMENSION_TOKENS) {
            tokens[token.name] = {
                $type: 'dimension',
                $value: resolveDimension(probe, token.cssVar)
            };
        }

        // font-family
        const h1Probe = document.createElement('h1');
        const pProbe = document.createElement('p');
        h1Probe.style.position = pProbe.style.position = 'fixed';
        h1Probe.style.visibility = pProbe.style.visibility = 'hidden';
        target.append(h1Probe, pProbe);

        const h1Styles = getComputedStyle(h1Probe);
        const pStyles = getComputedStyle(pProbe);

        tokens['header-font'] = {
            $type: 'fontFamilies',
            $value: cleanFontFamily(h1Styles.fontFamily) || 'Space Grotesk'
        };
        tokens['text-font'] = {
            $type: 'fontFamilies',
            $value: cleanFontFamily(pStyles.fontFamily) || 'Atkinson Hyperlegible'
        };

        // font-size
        for (const item of FONT_SIZE_TOKENS) {
            const el = document.createElement(item.tag);
            el.style.position = 'fixed';
            el.style.visibility = 'hidden';
            target.appendChild(el);

            const fontSizePx = parseFloat(getComputedStyle(el).fontSize);
            tokens[item.name] = {
                $type: 'fontSizes',
                $value: Number.isFinite(fontSizePx)
                    ? `${Math.round(fontSizePx * 100) / 100}px`
                    : resolveDimension(probe, item.fallbackVar)
            };

            target.removeChild(el);
        }

        // font weight
        tokens['weight-header'] = {
            $type: 'fontWeights',
            $value: h1Styles.fontWeight || '700'
        };
        tokens['weight-text'] = {
            $type: 'fontWeights',
            $value: pStyles.fontWeight || '400'
        };

        const lineHeightPx = parseFloat(pStyles.lineHeight);
        const pFontSizePx = parseFloat(pStyles.fontSize);
        const lineHeightRatio =
            Number.isFinite(lineHeightPx) && Number.isFinite(pFontSizePx)
                ? Math.round((lineHeightPx / pFontSizePx) * 100) / 100
                : 1.25;

        tokens['line-height'] = {
            $type: 'number',
            $value: lineHeightRatio
        };

        target.removeChild(h1Probe);
        target.removeChild(pProbe);

        // shadow
        probe.style.boxShadow = 'var(--shadow-surface)';
        const computedShadow = getComputedStyle(probe).boxShadow;
        if (computedShadow && computedShadow !== 'none') {
            const colorMatch = computedShadow.match(
                /^(rgba?\([^)]+\)|oklch\([^)]+\)|color\([^)]+\))\s+(.*)$/
            );
            if (colorMatch) {
                const shadowColorHex = toHex(colorMatch[1]);
                const parts = colorMatch[2].split(/\s+/);
                tokens['shadow-surface'] = {
                    $type: 'boxShadow',
                    $value: {
                        color: shadowColorHex,
                        offsetX: parts[0] || '0px',
                        offsetY: parts[1] || '-1px',
                        blur: parts[2] || '6px',
                        spread: parts[3] || '0px',
                        inset: parts.includes('inset')
                    }
                };
            }
        }

        // spacing
        for (const token of SPACING_TOKENS) {
            tokens[token.name] = {
                $type: 'spacing',
                $value: resolveDimension(probe, token.cssVar)
            };
        }

        // typography
        tokens['h1'] = {
            $type: 'typography',
            $value: {
                fontFamily: '{header-font}',
                fontSize: '{size-h1}',
                fontWeight: '{weight-header}',
                lineHeight: '{line-height}'
            }
        };
        tokens['h2'] = {
            $type: 'typography',
            $value: {
                fontFamily: '{header-font}',
                fontSize: '{size-h2}',
                fontWeight: '{weight-header}',
                lineHeight: '{line-height}'
            }
        };
        tokens['h3'] = {
            $type: 'typography',
            $value: {
                fontFamily: '{header-font}',
                fontSize: '{size-h3}',
                fontWeight: '{weight-header}',
                lineHeight: '{line-height}'
            }
        };
        tokens['h4'] = {
            $type: 'typography',
            $value: {
                fontFamily: '{header-font}',
                fontSize: '{size-text}',
                fontWeight: '{weight-header}',
                lineHeight: '{line-height}'
            }
        };
        tokens['p'] = {
            $type: 'typography',
            $value: {
                fontFamily: '{text-font}',
                fontSize: '{size-text}',
                fontWeight: '{weight-text}',
                lineHeight: '{line-height}'
            }
        };

        target.removeChild(probe);

        const jsonString = JSON.stringify(tokens, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'tokens.json';
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
</script>

<Button onclick={() => downloadPenpotTokens()} icon={Pen} variant="outline">
    Export Penpot Tokens (.json)
</Button>
