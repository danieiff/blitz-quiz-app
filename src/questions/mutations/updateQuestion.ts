import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateQuestionSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdateQuestionSchema),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const question = await db.question.update({
      where: { id },
      data: {
        ...data,
        choices: {
          upsert: data.choices.map(({ id, text }) => ({
            where: { id: id },
            create: { text: text },
            update: { text: text },
          })),
        },
      },
      include: { choices: true },
    })

    return question
  }
)
