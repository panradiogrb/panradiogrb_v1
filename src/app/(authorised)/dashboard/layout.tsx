
import DashboardNavbar from "@/components/ui/navbar/navbar";
import readUserSession from "@/lib/auth";
import { getUserName, getUserRole } from "@/lib/authActions/actions";

export default async function UnauthorisedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await readUserSession();
  //console.log(session)
  let userRole: string | null = null;
  let userName: string | null = null;

  if (session.data.user) {
    const roleResult = await getUserRole(session.data.user.id)
    const nameResult = await getUserName(session.data.user.id)
    userRole = roleResult.role === 'researcher' ? 'Researcher' : 'Colleague';
    userName = nameResult.role;
  }
  // console.log("in layout", userRole, userName)


  return (
    <div
      className={
        "bg-custom-image2 bg-no-repeat bg-cover bg-center bg-fixed flex flex-row w-full h-max text-black"
      }>
      <div className="fixed bg-violet-950 bg-opacity-25  bg-cover w-full h-screen grid"></div>
      <DashboardNavbar loggedUserName={userName} loggedUserRole={userRole}></DashboardNavbar>
      {children}
    </div>
  );
}