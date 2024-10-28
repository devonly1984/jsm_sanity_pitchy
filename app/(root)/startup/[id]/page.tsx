import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import markdownit from 'markdown-it';
import { Suspense } from "react";
<<<<<<< HEAD
import View from "@/components/View";
const md = markdownit();


export const experimental_ppr = true;
=======
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";

export const experimental_ppr = true;
const md = markdownit()

>>>>>>> 6aca3158fc0b81ea750d62fbb937eaba778b3e3e
const PostDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;
<<<<<<< HEAD
  const post = await client.fetch(STARTUP_BY_ID_QUERY,{
    id
  })
  if (!post) {
    return notFound()
  }
  const parsedContent = md.render(post?.pitch || "");
=======
  const post = await  client.fetch(STARTUP_BY_ID_QUERY,{id})
  if (!post) {
    notFound();
  }
  const parsedContent = md.render(post?.pitch || "")
>>>>>>> 6aca3158fc0b81ea750d62fbb937eaba778b3e3e
  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatDate(post?._createdAt)}</p>
        <h1 className="heading">{post.title}</h1>
        <p className="subheading !max-w-5xl">{post.description}</p>
      </section>
      <section className="section_container">
<<<<<<< HEAD
        <Image
          src={post.image}
          alt="thumbnail"
          className="w-full h-auto rounded-xl"
        />
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              href={`/user/${post.author._id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={post.author.image}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />
              <div className="">
                <p className="text-20-medium">{post.author.name}</p>
                <p className="text-16-medium !text-black-300">
                  @{post.author.username}
                </p>
              </div>
            </Link>
            <p className="category-tag">{post.category}</p>
          </div>
          <h3 className="text-30-bold">Pitch Details</h3>
          {parsedContent ? (
            <article
              dangerouslySetInnerHTML={{ __html: parsedContent }}
              className="prose max-w-4xl font-work-sans break-all"
            />
          ) : (
=======
        <img src={post.image} alt="thumbnail" className="w-full h-auto rounded-xl"/>
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link href={`/user/${post.author?._id}`} className="flex gap-2 mb-3 items-center "> 
              <Image src={post.author?.image || '/logo.png'} alt="avatar" width={64} height={64} className="rounded-full drop-shadow-lg"/>
              <div className="">
                <p className="text-20-medium">
                  {post.author.name}</p>
                  <p className="text-16-medium !text-black-300">
                  @{post.author.username}</p>
                  </div>         
            </Link>
            <p className="category-tag">
              {post.category}
            </p>
          </div>
          <h3 className="text-30-bold">Pitch Details</h3>
          {parsedContent ? (
            <article dangerouslySetInnerHTML={{__html: parsedContent}}
            className="prose max-w-4xl font-work-sans break-all"/>
          ): (
>>>>>>> 6aca3158fc0b81ea750d62fbb937eaba778b3e3e
            <p className="no-result">No Details Provided</p>
          )}
        </div>
        <hr className="divider" />
<<<<<<< HEAD
        {/**TODO: */}
      </section>
      <Suspense fallback={<>Loading...</>}>
        <View id={id} />
=======
        {/**TODO: Editor selected startups */}

      </section>
      <Suspense fallback={<Skeleton className="view-skeleton"/>}>
          <View id={id}/>

>>>>>>> 6aca3158fc0b81ea750d62fbb937eaba778b3e3e
      </Suspense>
    </>
  );
};
export default PostDetailsPage;
