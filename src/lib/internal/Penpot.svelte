<script>
    import Button from '../components/Button.svelte';
    import { Pen } from '@lucide/svelte';

    const TOKENS = [
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

    function toHex(cssColor) {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        const ctx = canvas.getContext('2d', { colorSpace: 'srgb' });

        ctx.clearRect(0, 0, 1, 1);
        ctx.fillStyle = cssColor;
        ctx.fillRect(0, 0, 1, 1);

        const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
        const hex = [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');

        return a < 255 ? `#${hex}${a.toString(16).padStart(2, '0')}` : `#${hex}`;
    }

    function downloadPenpotTokens(rootElement = document.documentElement) {
        const target = rootElement instanceof Element ? rootElement : document.documentElement;

        const probe = document.createElement('div');
        probe.style.position = 'fixed';
        probe.style.visibility = 'hidden';
        probe.style.pointerEvents = 'none';

        target.appendChild(probe);

        const tokens = {};

        for (const token of TOKENS) {
            probe.style.color = `var(${token.cssVar})`;
            const computedColor = getComputedStyle(probe).color;

            tokens[token.name] = {
                $type: 'color',
                $value: toHex(computedColor)
            };
        }

        target.removeChild(probe);

        const jsonString = JSON.stringify(tokens, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'azucar-penpot-tokens.json';
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
</script>

<Button onclick={() => downloadPenpotTokens()} icon={Pen} variant="outline">
    Export Penpot Tokens (.json)
</Button>
