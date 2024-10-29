import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries/startupQuery";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import markdownit from "markdown-it";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import { PLAYLIST_BY_SLUG_QUERY } from "@/sanity/lib/queries/playlistQuery";
import StartupCard from "@/components/cards/StartupCard";
import { StartupCardType } from "@/lib/types";

export const experimental_ppr = true;
const md = markdownit();

const PostDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;
  const [post,{select:editorPosts}] = await Promise.all([
    client.fetch(STARTUP_BY_ID_QUERY, {
      id,
    }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, {
      slug: "editor-picks-new",
    }),
  ]);
  const { _createdAt, pitch, title, description, image, author, category } =
    post;


  if (!id) {
    return notFound();
  }
  const parsedContent = md.render(pitch || "");

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatDate(_createdAt)}</p>
        <h1 className="heading">{title}</h1>
        <p className="subheading !max-w-5xl">{description}</p>
      </section>
      <section className="section_container">
        <img src={image} alt="thumbnail" className="w-full h-auto rounded-xl" />
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              href={`/user/${author._id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={author.image || "/logo.png"}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />
              <div className="">
                <p className="text-20-medium">{author.name}</p>
                <p className="text-16-medium !text-black-300">
                  @{author.username}
                </p>
              </div>
            </Link>
            <p className="category-tag">{category}</p>
          </div>
          <h3 className="text-30-bold">Pitch Details</h3>
          {parsedContent ? (
            <article
              dangerouslySetInnerHTML={{ __html: parsedContent }}
              className="prose max-w-4xl font-work-sans break-all"
            />
          ) : (
            <p className="no-result">No Details Found</p>
          )}
        </div>
        <hr className="divider" />
      </section>
      {editorPosts.length > 0 && (
        <div className="max-w-4xl mx-auto">
          <p className="text-30-semibold">Editor Picks</p>
          <ul className="mt-7 card_grid-sm">
            {editorPosts.map((post: StartupCardType) => (
              <StartupCard key={post._id} post={post} />
            ))}
          </ul>
        </div>
      )}

      <Suspense fallback={<Skeleton className="view-skeleton" />}>
        <View id={id} />
      </Suspense>
    </>
  );
};
export default PostDetailsPage;
