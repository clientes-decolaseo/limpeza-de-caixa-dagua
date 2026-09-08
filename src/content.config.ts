import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

const services = defineCollection({
	loader: glob({ pattern: '**/*.mdx', base: './src/content/services' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			slug: z.string(),
			shortDescription: z.string(),
			metaDescription: z.string().max(160),
			heroImage: image(),
			heroImageAlt: z.string(),
			icon: z.string().optional(),
			order: z.number(),
			relatedServices: z.array(z.string()),
		}),
});

const industrial = defineCollection({
	loader: glob({ pattern: '**/*.mdx', base: './src/content/industrial' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			metaDescription: z.string(),
			heroImage: image(),
			heroImageAlt: z.string(),
			segments: z.array(
				z.object({
					name: z.string(),
					description: z.string(),
				}),
			),
		}),
});

const blog = defineCollection({
	loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			excerpt: z.string(),
			metaDescription: z.string(),
			heroImage: image(),
			heroImageAlt: z.string(),
			tags: z.array(z.string()),
		}),
});

const regions = defineCollection({
	loader: file('src/content/regions/regions.json'),
	schema: z.object({
		id: z.string(),
		name: z.string(),
		phone: z.string(),
		phoneDisplay: z.string(),
		whatsapp: z.string(),
		whatsappDisplay: z.string(),
		citiesServed: z.array(z.string()),
	}),
});

const faqs = defineCollection({
	loader: file('src/content/faqs/faqs.json'),
	schema: z.object({
		id: z.string(),
		question: z.string(),
		answer: z.string(),
		appliesTo: z.array(z.string()),
	}),
});

export const collections = { services, industrial, blog, regions, faqs };
