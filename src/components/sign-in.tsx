"use server";
// "use client";

import React from "react";
import Button from "./ui/button";

// import { signIn } from "next-auth/react";
import { signInAction } from "@/lib/actions";

// const SignIn = () => {
//   return (
//     <Button
//       rounded="full"
//       onClick={async () => {
//         console.log("Sign in with Discord");
//         try {
//           await signIn("discord", { redirectTo: "/whitelist" });
//         } catch (error) {
//           console.log(error);
//         }
//       }}
//     >
//       Apply Now
//     </Button>
//   );
// };

// IDK why but this works now

const SignIn = () => {
  return (
    <form action={signInAction}>
      <Button type="submit" rounded="full">
        Apply Now
      </Button>
    </form>
  );
};

export default SignIn;
