import { z } from "zod"

export const UpdateChoiceSchema = z.object({
  id: z.number(),
  // template: __fieldName__: z.__zodType__(),
})

export const DeleteChoiceSchema = z.object({
  id: z.number(),
})
