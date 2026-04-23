import { defineContentConfig, defineCollection } from "@nuxt/content";
import { z } from "zod";

export default defineContentConfig({
    collections: {
        blog: defineCollection({
            type: "page",
            source: "blog/**/*.md",
            schema: z.object({
                title: z.string(),
                description: z.string(),
                emoji: z.string().default("😊"),
                tags: z.array(z.string()).default([]),
                date: z.coerce.date(),
                draft: z.boolean().default(false)
            })
        }),
        tags: defineCollection({
            type: "data",
            source: "tags/*.json",
            schema: z.object({
                tagId: z.string(),
                name: z.string()
            })
        }),
        page: defineCollection({
            type: "page",
            source: "page/**/*.md",
            schema: z.object({
                title: z.string(),
                description: z.string()
            })
        })
    }
})