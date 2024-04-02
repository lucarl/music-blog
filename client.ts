import sanityClient from '@sanity/client'

export default sanityClient({
  projectId: 'n0gkmc9c', 
  dataset: 'production', 
  useCdn: true // `false` if you want to ensure fresh data
})