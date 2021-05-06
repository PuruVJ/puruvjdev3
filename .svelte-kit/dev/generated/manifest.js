const c = [
	() => import("..\\..\\..\\src\\routes\\$layout.svelte"),
	() => import("..\\..\\..\\src\\routes\\$error.svelte"),
	() => import("..\\..\\..\\src\\routes\\index.svelte"),
	() => import("..\\..\\..\\src\\routes\\about.svelte"),
	() => import("..\\..\\..\\src\\routes\\works.svelte"),
	() => import("..\\..\\..\\src\\routes\\blog\\index.svelte"),
	() => import("..\\..\\..\\src\\routes\\blog\\[slug].svelte")
];

const d = decodeURIComponent;

export const routes = [
	// src/routes/index.svelte
	[/^\/$/, [c[0], c[2]], [c[1]]],

	// src/routes/about.svelte
	[/^\/about\/?$/, [c[0], c[3]], [c[1]]],

	// src/routes/works.svelte
	[/^\/works\/?$/, [c[0], c[4]], [c[1]]],

	// src/routes/blog/index.svelte
	[/^\/blog\/?$/, [c[0], c[5]], [c[1]]],

	// src/routes/blog/[slug].svelte
	[/^\/blog\/([^/]+?)\/?$/, [c[0], c[6]], [c[1]], (m) => ({ slug: d(m[1])})]
];

export const fallback = [c[0](), c[1]()];