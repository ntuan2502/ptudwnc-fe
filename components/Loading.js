import { signIn } from "next-auth/react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  );
}

export function SigninToContinue() {
  return (
    <div className="flex justify-center items-center">
      <div
        className="font-bold text-red-500 text-3xl hover:text-blue-500 cursor-pointer"
        onClick={signIn}
      >
        Signin to continue
      </div>
    </div>
  );
}
