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
        className="bg-mute mt-2 w-52 origin-top-right rounded-xl border border-white/5 bg-background p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
      >
        <form action={signOutAction}>
          <MenuItem>
            <button type="submit" className="block w-full rounded-lg px-3 py-1.5 text-left data-[focus]:bg-white/10">
              Sign out
            </button>
          </MenuItem>
        </form>
      </MenuItems>
    </Menu>
  );
};

export default Avatar;
