import { z } from 'zod';
export const schemas = {
  pages: {
    home: z.object({
      "hero": z.object({
        "headline": z.string(),
        "subheadline": z.string(),
        "cta": z.string(),
        "galleryLink": z.string(),
        "tags": z.array(z.string())
      }),
      "features": z.object({
        "heading": z.string(),
        "intro": z.string(),
        "items": z.array(z.object({
          "id": z.string(),
          "title": z.string(),
          "description": z.string()
        }))
      }),
      "pricing": z.object({
        "heading": z.string(),
        "subtext": z.string(),
        "packages": z.array(z.object({
          "id": z.string(),
          "name": z.string(),
          "price": z.string(),
          "duration": z.string(),
          "description": z.string(),
          "features": z.array(z.string()),
          "featured": z.boolean(),
          "cta": z.string()
        }))
      }),
      "contact": z.object({
        "heading": z.string(),
        "subtext": z.string(),
        "submitLabel": z.string()
      }),
      "footer": z.object({
        "tagline": z.string(),
        "copyright": z.string(),
        "quickLinks": z.array(z.object({
          "id": z.string(),
          "label": z.string(),
          "href": z.string()
        })),
        "phone": z.string(),
        "email": z.string(),
        "address": z.string()
      })
    })
  }
};
export type Schemas = typeof schemas;