import StartupCard from "@/components/cards/StartupCard";
import SearchForm from "@/components/forms/SearchForm";
import { StartupCardType } from "@/lib/types";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUP_QUERY } from "@/sanity/lib/queries";

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) => {
  const query = (await searchParams).query
  const params = { search: query || null };
//const posts = await client.fetch(STARTUP_QUERY);
const { data: posts } = await sanityFetch({ query: STARTUP_QUERY,params });
console.log(JSON.stringify(posts, null, 2));  return (
  <div>
    <section className="pink_container">
      <h1 className="heading">
        Pitch your Startup, <br /> Connect with Entrepreneurs
      </h1>
      <p className="subheading !max-w-3xl">
        Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
      </p>
      <SearchForm query={query} />
    </section>
    <section className="section_container">
      <p className="text-30-semibold">
        {query ? `Search results for ${query}` : `All Startups`}
      </p>
      <ul className="mt-7 card_grid">
        {posts.length > 0 ? (
          posts.map((post: StartupCardType) => (
            <StartupCard key={post?._id} post={post} />
          ))
        ) : (
          <p className="no-results"> No Posts Found </p>
        )}
      </ul>
    </section>
    <SanityLive />
  </div>
);
};
export default Home;
