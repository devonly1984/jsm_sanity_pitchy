import { auth } from "@/auth";
import StartupForm from "@/components/forms/StartupForm";
import { redirect } from "next/navigation";

const CreateStartupPage = async() => {
    const session = await auth()
    if (!session) {
        redirect('/')
    }
  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <h1 className="heading">Submit your Startup </h1>
      </section>
      <StartupForm />
    </>
  );
};
export default CreateStartupPage;
