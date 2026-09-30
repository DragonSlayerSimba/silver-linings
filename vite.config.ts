import tailwindcss from '@tailwindcss/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		enhancedImages(),
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			adapter: adapter(),
			// Empty at a domain root; the GitHub Pages workflow sets BASE_PATH=/<repo>.
			paths: { base: (process.env.BASE_PATH ?? '') as '' | `/${string}` },
			alias: {
				$config: 'site.config.ts',
				$content: 'src/content'
			}
		})
	]
});
