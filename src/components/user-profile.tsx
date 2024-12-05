import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { signOutAction } from "@/lib/actions";

interface UserProfileProps {
  image: string;
  username: string;
  isAdmin?: boolean;
}

const UserProfile = ({ image, username, isAdmin }: UserProfileProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Image src={image} alt="Profile" width={40} height={40} className="cursor-pointer rounded-full" />
      </PopoverTrigger>

      <PopoverContent align="end" className="mt-1 w-40 rounded-sm p-1">
        <form action={signOutAction} className="space-y-1 text-xs">
          <div className="p-1 text-gray-400">
            <p>Logged is as</p>
            <p>
              {username} <span className="text-yellow-500 opacity-100">{isAdmin && "(Admin)"}</span>
            </p>
          </div>
          <button
            type="submit"
            className="w-full rounded bg-black/40 px-3 py-1.5 text-right text-red-500 outline-none hover:bg-black/60"
          >
            Sign out
          </button>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default UserProfile;
