import { client } from "@/sanity/lib/client";
import Ping from "./Ping";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import { Writeclient } from "@/sanity/lib/writeClient";
import { unstable_after as after } from "next/server";
const View = async ({ id }: { id: string }) => {
  const { views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUP_VIEWS_QUERY, { id });
    after(async () => {
      await Writeclient.patch(id)
        .set({ views: totalViews + 1 })
        .commit();
    });
  return (
    <div className="view_container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>
      <p className="view-text">
        <span className="font-black">Views: {totalViews} </span>
      </p>
    </div>
  );
};
export default View