import SanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: 'v1',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

  export default {
    name: 'user',
    title: 'User',
    type: 'document',
    fields: [
        {
            name: 'user_name',
            title: 'User Name',
            type: 'string',
        },
        {
            name: 'profile_image',
            title: 'Profile Image',
            type: 'image',
        },
    ]
}
