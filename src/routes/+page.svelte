<script lang="ts">
    import Picker from '$lib/internal/Picker.svelte';
    import {
        Avatar,
        Badge,
        Button,
        ButtonGroup,
        Details,
        Frame,
        Flex,
        Stack,
        Switch,
        Table,
        TextInput,
        Slider,
        Skeleton,
        SkeletonText,
        Scroll
    } from '$lib/index.ts';
    import {
        CatIcon,
        CheckIcon,
        CircleArrowLeftIcon,
        MoveDiagonalIcon,
        SearchIcon,
        TriangleAlert,
        XIcon,
        InfoIcon,
        CircleArrowRightIcon,
        CircleArrowDownIcon,
        CircleArrowUpIcon,
        CopyIcon
    } from '@lucide/svelte';
    import Tooltip from '$lib/components/Tooltip.svelte';

    const scales = [
        'color-bg-app',
        'color-bg-subtle',
        'color-bg',
        'color-bg-hover',
        'color-bg-active',
        'color-border-subtle',
        'color-border',
        'color-border-focus',
        'color-bg-solid',
        'color-bg-solid-hover',
        'color-bg-solid-active',
        'color-fg-low',
        'color-fg-high',
        'color-fg-solid'
    ];

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    const copySettings = () => {
        const styles = getComputedStyle(document.documentElement);
        const settings = {
            '--base-color': styles.getPropertyValue('--base-color').trim(),
            '--corner-radius': styles.getPropertyValue('--corner-radius').trim(),
            'color-scheme': styles.getPropertyValue('color-scheme').trim()
        };
        copyToClipboard(JSON.stringify(settings, null, 2));
    };
</script>

{#snippet colorFrameWithTooltip(color: string)}
    <Tooltip text={color}>
        <Frame
            style={`background-color: var(--${color}); cursor: pointer;`}
            onclick={(event) =>
                copyToClipboard(
                    getComputedStyle(event.currentTarget as HTMLElement).backgroundColor
                )}
        />
    </Tooltip>
{/snippet}

<Flex direction="column" gap="xxl" padding="lg">
    <Stack>
        <h1>Azucar UI</h1>
        <p>The design system that makes your app sweet.</p>
    </Stack>

    <Details framed={true} summary="Settings" style="position: sticky; top: var(--size-lg); z-index: 10;" transparent border shadow>
        <Stack>
            <Picker />
            <Flex justify="space-between" style='margin-left: auto'>
                <Button icon={CopyIcon} variant="outline" onclick={copySettings}>Copy</Button>
            </Flex>
        </Stack>
    </Details>

    <Stack>
        <h2>Color System</h2>

        <p>Click to copy a color.</p>

        <Stack gap="lg">
            <Stack>
                <h3>Light Base Color</h3>
                <Flex style="color-scheme: light;">
                    {#each scales as scale}
                        {@render colorFrameWithTooltip(scale)}
                    {/each}
                </Flex>
            </Stack>

            <Stack>
                <h3>Dark Base Color</h3>
                <Flex style="color-scheme: dark">
                    {#each scales as scale}
                        {@render colorFrameWithTooltip(scale)}
                    {/each}
                </Flex>
            </Stack>

            <Stack>
                <h3>Light Neutral Color</h3>
                <Flex style="color-scheme: light; --base-color: var(--color-neutral);">
                    {#each scales as scale}
                        {@render colorFrameWithTooltip(scale)}
                    {/each}
                </Flex>
            </Stack>

            <Stack>
                <h3>Dark Neutral Color</h3>
                <Flex style="color-scheme: dark; --base-color: var(--color-neutral);">
                    {#each scales as scale}
                        {@render colorFrameWithTooltip(scale)}
                    {/each}
                </Flex>
            </Stack>
        </Stack>
    </Stack>

    <Stack>
        <h2>Sizes</h2>

        <p style="font-size: var(--size-xxs);">XXS</p>
        <p style="font-size: var(--size-xs);">XS</p>
        <p style="font-size: var(--size-sm);">SM</p>
        <p style="font-size: var(--size-md);">MD</p>
        <p style="font-size: var(--size-lg);">LG</p>
        <p style="font-size: var(--size-xl);">XL</p>
        <p style="font-size: var(--size-xxl);">XXL</p>
    </Stack>

    <Stack>
        <h2>Layouts</h2>

        <Stack>
            <h3>Scroll</h3>
            <Scroll>
                {#each Array(60)}
                    <div
                        style="width: 30px; height: 30px; background-color: var(--color-bg-solid)"
                    ></div>
                {/each}
            </Scroll>
        </Stack>

        <Stack>
            <h3>Details</h3>
            <Details summary="This is a Detail">
                <p>Toulouse !</p>
            </Details>
            <Details framed={true} border={true} shadow={true} summary="This is a Framed Detail">
                <p>net7</p>
            </Details>
            <Details framed={true}>
                {#snippet summarySnippet()}
                    <Flex align="center" justify="space-between" style="flex-grow: 1">
                        <Avatar size='lg' alt='Avatar' />
                        <span>
                            <p>A customed summary</p>
                            <p style='margin-left: auto;'>10/09/2026</p>
                        </span>
                    </Flex>
                {/snippet}
                <p>Hello there !</p>
            </Details>
        </Stack>
    </Stack>

    <Stack>
        <h2>Buttons</h2>

        <Flex>
            <Button>Hello</Button>
            <Button href="#">Link</Button>
            <Button variant="outline">Hello</Button>
            <Button variant="ghost">Hello</Button>
            <Button disabled>Hello</Button>
            <Button href="#" disabled>Link</Button>
            <Button loading>Submit</Button>
            <Button variant="outline" disabled>Hello</Button>
            <Button variant="ghost" disabled>Hello</Button>
        </Flex>

        <Flex>
            <Button icon={CircleArrowLeftIcon} --base-color="#FFCD22">Hello</Button>
            <Button icon={CatIcon}>Meow</Button>
            <Button icon={XIcon} class="danger" name="Delete" />
            <Button icon={TriangleAlert} class="warning" name="Warn" />
            <Button icon={CheckIcon} class="success" name="Success" />
            <Button icon={MoveDiagonalIcon} variant="ghost" name="Move" />
            <ButtonGroup>
                <Button>File</Button>
                <Button variant="outline">Edit</Button>
                <Button variant="outline">View</Button>
            </ButtonGroup>
        </Flex>

        <Scroll>
            <ButtonGroup>
                <Button>Button 1</Button>
                <Button variant="outline">Button 2</Button>
                <Button variant="outline">Button 3</Button>
                <Button variant="outline">Button 4</Button>
                <Button variant="outline">Button 5</Button>
                <Button variant="outline">Button 6</Button>
            </ButtonGroup>
        </Scroll>
    </Stack>

    <Stack>
        <h2>Switches</h2>

        <Flex>
            <Switch>Label</Switch>
            <Switch checked />
            <Switch disabled />
            <Switch checked disabled />
            <Switch disabled>Label</Switch>
        </Flex>
    </Stack>

    <Stack>
        <h2>Text inputs</h2>

        <Flex>
            <TextInput name="aaa" placeholder="Jaurès">Name</TextInput>
            <TextInput icon={SearchIcon} placeholder="Type a" options={['azucar', 'net7']}>Datalist</TextInput>
            <TextInput required>Label</TextInput>
            <TextInput icon={SearchIcon} placeholder="Search...">Search</TextInput>
            <TextInput disabled required placeholder="Toulouse">City</TextInput>
            <TextInput disabled>Label</TextInput>
            <TextInput disabled icon={SearchIcon} placeholder="Search...">Search</TextInput>
            <TextInput disabled />
        </Flex>
    </Stack>

    <Stack>
        <h2>Frames</h2>

        <Flex>
            <Frame>
                <p>This is a frame.</p>
            </Frame>
            <Frame shadow={true}>
                <p>This is a frame with a shadow.</p>
            </Frame>

            <Frame border={true}>
                <p>This is a frame with a border.</p>
            </Frame>

            <Frame transparent={true}>
                <p>This is a semi-transparent frame.</p>
            </Frame>

            <Frame transparent={true} border={true} shadow={true}>
                <p>This is a semi-transparent frame with a border and a shadow.</p>
            </Frame>

            <Frame class="neutral">
                <p>This is a neutral frame.</p>
            </Frame>
        </Flex>
    </Stack>

    <Stack>
        <h2>Badges</h2>

        <Flex>
            <Badge>Default</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="ghost">Ghost</Badge>
        </Flex>
    </Stack>

    <Stack>
        <h2>Avatars</h2>

        <Flex>
            <Avatar
                src="https://churros.inpt.fr/storage/groups/light/skus07ltrsiimapm.png"
                alt="Bureau des Eleves"
                size="xxl"
            />
            <Avatar alt="Bureau des Eleves" size="xxl" />
            <Avatar
                src="https://churros.inpt.fr/storage/groups/light/skus07ltrsiimapm.png"
                alt="Bureau des Eleves"
                size="xl"
            />
            <Avatar alt="Bureau des Eleves" size="xl" />
            <Avatar
                src="https://churros.inpt.fr/storage/groups/light/skus07ltrsiimapm.png"
                alt="Bureau des Eleves"
                size="lg"
            />
            <Avatar alt="Bureau des Eleves" size="lg" />
        </Flex>
    </Stack>

    <Stack>
        <h2>Tables</h2>

        <Table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Color</th>
                    <th>Quality</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Apple</td>
                    <td>Red</td>
                    <td>Great</td>
                </tr>
                <tr>
                    <td>Banana</td>
                    <td>Yellow</td>
                    <td>Awful</td>
                </tr>
                <tr>
                    <td>Watermelon</td>
                    <td>Green</td>
                    <td>Good</td>
                </tr>
            </tbody>
        </Table>
    </Stack>
    <Stack>
        <h2>Sliders</h2>

        <Slider />
        <Slider class="neutral" />
    </Stack>

    <Stack>
        <h2>Skeletons</h2>
        <Flex>
            <Skeleton width="200px" height="200px" />
            <Skeleton width="200px" height="200px" borderRadius="50%" />
        </Flex>
        <Flex>
            <h2><SkeletonText lines={1} width="8ch" /></h2>
            <SkeletonText lines={3} />
        </Flex>
    </Stack>

    <Stack>
        <h2>Tooltips</h2>

        <Flex>
            <p>Bla bla bla</p>
            <Tooltip text="From each according to his ability, to each according to his need">
                <InfoIcon />
            </Tooltip>

            <Tooltip text="On the left" position="left">
                <CircleArrowLeftIcon />
            </Tooltip>

            <Tooltip text="On the right" position="right">
                <CircleArrowRightIcon />
            </Tooltip>

            <Tooltip text="On the top" position="top">
                <CircleArrowUpIcon />
            </Tooltip>

            <Tooltip text="On the bottom" position="bottom">
                <CircleArrowDownIcon />
            </Tooltip>
        </Flex>
    </Stack>
</Flex>
