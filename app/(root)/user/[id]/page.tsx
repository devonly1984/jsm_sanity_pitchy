import { auth } from "@/auth";
import { StartupCardSkeleton } from "@/components/cards/StartupCard";
import UserStartupCard from "@/components/cards/UserStartupCard";

import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries/userQuery";
import  Image  from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
export const experimental_ppr = true;
const UserSinglePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;
  const session = await auth();
  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });
  if (!user) {
    return notFound();
  }
  return (
    <>
      <section className="profile_container">
        <div className="profile_card">
          <div className="profile_title">
            <h3 className="text-24-black uppercase text-center line-clamp-1">
              {user.name}
            </h3>
          </div>
          <Image
            src={user.image}
            alt="profileImage"
            width={220}
            height={220}
            className="profile_image"
          />
          <p className="text-30-extrabold mt-7 text-center">
            @{user?.username}
          </p>
          <p className="mt-1 text-center text-14-normal">{user.bio}</p>
        </div>
        <div className="flex-1 flex flex-col gap-5 xl:-mt-5">
          <p className="text-30-bold">
            {session?.id === id ? "Your" : "All"}
            Startups
          </p>
          <ul className="card_grid-sm">
            {/**TODO: USER STARTUPS */}
            <Suspense fallback={<StartupCardSkeleton />}>
              <UserStartupCard id={id} />
            </Suspense>
          </ul>
        </div>
      </section>
    </>
  );
};
export default UserSinglePage;
