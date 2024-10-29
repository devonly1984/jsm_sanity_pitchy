import { defineQuery } from "next-sanity";

export const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(`
    *[type=='author && id ==$id'][0]{
      _id,
      id,
      name,
      username,
      email,
      image,bio

    }`);
export const AUTHOR_BY_ID_QUERY = defineQuery(`
    *[type=='author && _id ==$id'][0]{
      _id,
      id,
      name,
      username,
      email,
      image,
      bio

    }
        `);
        
export const STARTUPS_BY_AUTHOR_QUERY = defineQuery(`
*[_type=='startup' && author._ref == $id] | order(_createdAt desc)] {
  _id,
  title,
  slug,
  _createdAt,
  author -> {
    _id,
    name,
    image,
    bio
  },
  views,
  description,
  category,
  image

}


  `);