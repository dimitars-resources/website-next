import Image from "next/image";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { signOutAction } from "@/lib/actions";

interface User {
  image: string;
}

const Avatar = ({ image }: User) => {
  return (
    <Menu>
      <MenuButton>
        <Image src={image} alt="Profile" width={40} height={40} className="rounded-full" />
      </MenuButton>

      <MenuItems
        portal={true}
        modal={false}
        transition
        anchor="bottom end"
        className="bg-mute z-50 mt-2 w-52 origin-top-right rounded-xl border border-white/5 bg-background p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
      >
        <MenuItem>
          <form action={signOutAction}>
            <button type="submit" className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 hover:bg-white/10">
              Log Out
            </button>
          </form>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};

export default Avatar;
