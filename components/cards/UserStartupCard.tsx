import { client } from "@/sanity/lib/client";
import { STARTUPS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries/userQuery";
import StartupCard from "./StartupCard";
import { StartupCardType } from "@/lib/types";

const UserStartupCard = async ({ id }: { id: string }) => {
  const startups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, { id });

  return (
    <>
      {startups.length > 0 ? (
        startups.map((startup: StartupCardType) => (
          <StartupCard key={startup._id} post={startup} />
        ))
      ) : (
        <p className="no-result">No Startups Yet</p>
      )}
    </>
  );
};
export default UserStartupCard;
