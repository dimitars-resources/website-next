"use client";

import React from "react";
import Button from "./ui/button";
import { signIn } from "next-auth/react";

const SignIn = () => {
  return (
    <Button
      onClick={async () => {
        console.log("Sign in with Discord");
        try {
          await signIn("discord", { redirectTo: "/whitelist" });
        } catch (error) {
          console.log(error);
        }
      }}
    >
      Apply Now!
    </Button>
  );
};

export default SignIn;
