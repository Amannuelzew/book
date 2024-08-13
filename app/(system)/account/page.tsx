import Account from "@/components/Account";
import { getCurrentUser } from "@/utils/user";

export default async function AccountPage() {
  const user = await getCurrentUser();
  return (
    <div className="pt-8 ">
      <Account user={user!} />
    </div>
  );
}
