import { useSession } from "next-auth/react";
import Nav from "../components/Nav";

export default function Component() {
  const { data: session } = useSession();
  // console.log("Session: ", session);
  return (
    <>
      <Nav />
    </>
  );
}
