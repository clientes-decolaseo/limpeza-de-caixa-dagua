export function toBlogSlug(id: string) {
	return id.replace(/\.(md|mdx)$/i, '');
}
