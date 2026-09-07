import { z } from 'zod'
import { ApiError } from './errors'

export const bilingualStringSchema = z
  .object({
    en: z.string().default(''),
    my: z.string().default(''),
    zh: z.string().default(''),
  })
  .passthrough()

export const bilingualStringArraySchema = z
  .object({
    en: z.array(z.string()).default([]),
    my: z.array(z.string()).default([]),
    zh: z.array(z.string()).default([]),
  })
  .passthrough()

export const newsCategorySchema = z.object({
  id: z.union([z.number(), z.string()]).transform(Number),
  slug: z.string().default(''),
  name: bilingualStringSchema,
})

export const newsArticleSchema = z.object({
  id: z.union([z.number(), z.string()]).transform(Number),
  slug: z.string().default(''),
  title: bilingualStringSchema,
  description: bilingualStringSchema,
  image_url: z.string().nullable().default(null),
  status: z.string().default('published'),
  category: newsCategorySchema.nullable().default(null),
  created_at: z.string().default(''),
  updated_at: z.string().default(''),
})

export const paginationMetaSchema = z.object({
  current_page: z.coerce.number().int().positive().default(1),
  last_page: z.coerce.number().int().nonnegative().default(1),
  per_page: z.coerce.number().int().positive().default(1),
  total: z.coerce.number().int().nonnegative().default(0),
})

export const paginationLinksSchema = z.object({
  first: z.string().nullable().default(null),
  last: z.string().nullable().default(null),
  prev: z.string().nullable().default(null),
  next: z.string().nullable().default(null),
})

export const newsResponseSchema = z.object({
  data: z.array(newsArticleSchema).default([]),
  links: paginationLinksSchema.default({}),
  meta: paginationMetaSchema.default({}),
})

export const newsCategoriesResponseSchema = z.object({
  data: z.array(newsCategorySchema),
})

export const promotionSchema = z.object({
  id: z.union([z.string(), z.number()]).transform(String),
  slug: z.string().default(''),
  title: bilingualStringSchema,
  description: bilingualStringSchema,
  startDate: z.string().default(''),
  endDate: z.string().default(''),
  isActive: z.coerce.boolean().default(false),
  imageUrl: z.string().nullable().default(null),
})

export const promotionResponseSchema = z.object({
  data: z.array(promotionSchema).default([]),
  links: paginationLinksSchema.default({}),
  meta: paginationMetaSchema.extend({
    from: z.coerce.number().nullable().default(null),
    to: z.coerce.number().nullable().default(null),
  }).default({}),
})

export const networkSchema = z.object({
  id: z.union([z.number(), z.string()]).transform(Number),
  name: bilingualStringSchema,
})

export const speedSchema = z.object({
  id: z.union([z.number(), z.string()]).transform(Number),
  mbps: z.coerce.number().nonnegative(),
})

export const termSchema = z.object({
  id: z.union([z.number(), z.string()]).transform(Number),
  months: z.coerce.number().positive(),
})

export const packageSchema = z.object({
  id: z.union([z.number(), z.string()]).transform(Number),
  network: networkSchema,
  speed: speedSchema,
  term: termSchema,
  price: z.union([z.string(), z.number()]).transform(String),
  installation_fee: z.union([z.string(), z.number()]).transform(String),
  image_url: z.string().nullable().default(null),
  includes_free_iptv: z.coerce.boolean().default(false),
  is_active: z.coerce.boolean().default(true),
  recommended: z.coerce.boolean().default(false),
  sort_order: z.coerce.number().default(0),
  created_at: z.string().default(''),
  updated_at: z.string().default(''),
})

export const addonSchema = z.object({
  id: z.union([z.number(), z.string()]).transform(Number),
  name: bilingualStringSchema,
  price: z.coerce.number().nonnegative(),
  image_url: z.string().nullable().default(null),
  is_active: z.coerce.boolean().default(true),
  created_at: z.string().default(''),
  updated_at: z.string().default(''),
})

export const packageResponseSchema = z.object({
  data: z.array(packageSchema).default([]),
})

export const addonResponseSchema = z.object({
  data: z.array(addonSchema).default([]),
})

export const networkResponseSchema = z.object({
  data: z.array(networkSchema).default([]),
})

export const recommendedPackageSchema = z.object({
  id: z.union([z.number(), z.string()]).transform(String),
  slug: z.string().default(''),
  title: bilingualStringSchema,
  imageUrl: z.string().nullable().default(null),
  image_url: z.string().nullable().default(null),
  isFeatured: z.coerce.boolean().default(false),
  isPopular: z.coerce.boolean().default(false),
})

export const recommendedPackagesResponseSchema = z.union([
  z.array(recommendedPackageSchema),
  z.object({ data: z.array(recommendedPackageSchema).default([]) }),
]).transform((value) => Array.isArray(value) ? value : value.data)

export const bannerResponseSchema = z.object({
  success: z.boolean().default(true),
  data: z.array(z.object({
    id: z.union([z.number(), z.string()]).transform(Number),
    image_url_en: z.string().default(''),
    image_url_zh: z.string().default(''),
    image_url_my: z.string().default(''),
  })).default([]),
})

export const contactResponseSchema = z.object({
  success: z.boolean().default(true),
  data: z.array(z.object({
    id: z.union([z.number(), z.string()]).transform(Number),
    contact_point: z.string().default(''),
  })).default([]),
})

export const apiArraySchema = z.array(z.record(z.string(), z.unknown()))
export const apiObjectSchema = z.record(z.string(), z.unknown())

export const galleryResponseSchema = z.object({
  data: z.array(z.object({
    id: z.union([z.string(), z.number()]).transform(String),
    label: bilingualStringSchema,
    imageUrl: z.string().nullable().default(null),
  })).default([]),
})

export function parseApiResponse<T>(schema: z.ZodTypeAny, value: unknown, resource: string): T {
  const result = schema.safeParse(value)
  if (!result.success) {
    throw new ApiError(`Invalid ${resource} response`, {
      kind: 'validation',
      cause: result.error,
    })
  }
  return result.data as T
}