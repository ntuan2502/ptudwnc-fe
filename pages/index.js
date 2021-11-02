import { useSession } from "next-auth/react";
import Nav from "../components/Nav";

export default function Component() {
  const { data: session } = useSession();
  // console.log("Session: ", session);
  return (
    <>
      <Nav />
      <div className="flex justify-center items-center h-screen">
        <img src="https://hcmus.edu.vn/images/logo81.png" />
      </div>
    </>
  );
}
