import { resolver } from "@blitzjs/rpc"
import db from "db"
import { DeleteQuestionSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(DeleteQuestionSchema),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant

    // Comment out as Cascade delete set on 'question' of 'Choice' in 'schema.prisma'.
    // await db.choice.deleteMany({ where: { questionId: id } })
    const question = await db.question.deleteMany({ where: { id } })

    return question
  }
)
