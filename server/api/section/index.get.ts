import TopicModel from '~/server/models/topic'
import type { GetSectionRequestData, SectionTopic } from '~/types/api/section'

const getSectionTopic = async (
  section: string,
  page: number,
  limit: number,
  order: 'asc' | 'desc'
) => {
  const skip = (page - 1) * limit

  const topics = await TopicModel.find({
    status: { $ne: 1 },
    section: { $in: section }
  })
    .sort({ updated: order })
    .skip(skip)
    .limit(limit)
    .populate('user', 'uid avatar name')
    .lean()

  const data: SectionTopic[] = topics.map((topic) => ({
    tid: topic.tid,
    title: topic.title,
    content: topic.content.slice(0, 233),
    time: topic.time,
    tags: topic.tags,
    views: topic.views,
    likes: topic.likes_count,
    replies: topic.replies_count,
    user: {
      uid: topic.user[0].uid,
      avatar: topic.user[0].avatar,
      name: topic.user[0].name
    }
  }))

  return data
}

export default defineEventHandler(async (event) => {
  const { section, page, limit, order }: GetSectionRequestData =
    await getQuery(event)
  if (!section || !page || !limit || !order) {
    kunError(event, 10507)
    return
  }
  if (limit !== '10') {
    kunError(event, 10209)
    return
  }

  const res = await getSectionTopic(
    section,
    parseInt(page),
    parseInt(limit),
    order
  )

  return res
})
