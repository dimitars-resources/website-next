import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { signOutAction } from "@/lib/actions";

interface UserProfileProps {
  image: string;
}

const UserProfile = ({ image }: UserProfileProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Image src={image} alt="Profile" width={40} height={40} className="rounded-full" />
      </PopoverTrigger>

      <PopoverContent align="end" className="mt-1 w-40 rounded-sm p-1">
        <form action={signOutAction}>
          <button
            type="submit"
            className="w-full rounded bg-black/50 px-3 py-1.5 text-right text-xs text-red-500 outline-none"
          >
            Sign out
          </button>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default UserProfile;
