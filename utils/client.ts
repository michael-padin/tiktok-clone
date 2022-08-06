import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: 'bpilmi7q',
  dataset: 'production',
  apiVersion: '2022-08-05', //year-month-day
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
