export interface NavLink {
    name: string
    href: string
}

export const navLinks: NavLink[] = [
    { name: "HOME", href: "/" },
    { name: "OUR COLLECTION", href: "/our-collection" },
    { name: "OUR STORY", href: "/our-story" },
    { name: "CRAFTED SELECTIONS", href: "/crafted-selections" },
    { name: "CONTACT", href: "/contact" },
]
