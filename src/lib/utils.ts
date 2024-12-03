import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const isAdmin = async (userID: string | unknown): Promise<boolean> => {
  let isAdmin = false;

  try {
    const response = await fetch(`https://discord.com/api/guilds/${process.env.DISCORD_GUILD_ID}/members/${userID}`, {
      headers: {
        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      const userRoles = data.roles;

      isAdmin = userRoles.includes(process.env.DISCORD_ADMIN_ROLE_ID);
    }
  } catch (error) {}

  return isAdmin;
};
