export const ANCHOR_LINKS = {
    travel: 'travel',
    service: 'service',
    blog: 'blog',

    // no use
    done: 'done',
} as const

export type AnchorLinksType = keyof typeof ANCHOR_LINKS