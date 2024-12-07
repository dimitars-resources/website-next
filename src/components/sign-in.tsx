"use server";

import Button from "./ui/button";
import { signInAction } from "@/lib/actions";

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
