<script>
    import Picker from '$lib/internal/Picker.svelte';
    import {
        Avatar,
        Badge,
        Button,
        ButtonGroup,
        Frame,
        Flex,
        Stack,
        Switch,
        Table,
        TextInput,
        Slider,
        Skeleton,
        SkeletonText
    } from '$lib/index.js';
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
        CircleArrowUpIcon
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
</script>

<Flex direction="column" gap="xxl" margin="lg">
    <Stack>
        <h1>Azucar UI</h1>
        <p>The design system that makes your app sweet.</p>
    </Stack>

    <Frame style="position: sticky; top: var(--size-lg); z-index: 10;" transparent border shadow>
        <Stack>
            <h3>Settings</h3>
            <Picker />
        </Stack>
    </Frame>

    <Stack>
        <h2>Color System</h2>

        <Stack gap="lg">
            <Stack>
                <h3>Light Base Color</h3>
                <Flex style="color-scheme: light">
                    {#each scales as scale}
                        <Frame style={`background-color: var(--${scale})`} />
                    {/each}
                </Flex>
            </Stack>

            <Stack>
                <h3>Dark Base Color</h3>
                <Flex style="color-scheme: dark">
                    {#each scales as scale}
                        <Frame style={`background-color: var(--${scale})`} />
                    {/each}
                </Flex>
            </Stack>

            <Stack>
                <h3>Light Neutral Color</h3>
                <Flex style="color-scheme: light; --base-color: var(--color-neutral);">
                    {#each scales as scale}
                        <Frame style={`background-color: var(--${scale})`} />
                    {/each}
                </Flex>
            </Stack>

            <Stack>
                <h3>Dark Neutral Color</h3>
                <Flex style="color-scheme: dark; --base-color: var(--color-neutral);">
                    {#each scales as scale}
                        <Frame style={`background-color: var(--${scale})`} />
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
        <h2>Buttons</h2>

        <Flex>
            <Button>Hello</Button>
            <Button variant="outline">Hello</Button>
            <Button variant="ghost">Hello</Button>
            <Button disabled>Hello</Button>
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
