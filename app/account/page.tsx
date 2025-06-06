import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import AccountPage from "./new-account-form";
import Navigation from "@/components/nav";

export default async function Account() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
    return
  }

  return (
    <>
      <Navigation />
      <AccountPage user={user} />
    </>
  )

}