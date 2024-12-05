import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const isAdmin = async (userId: string): Promise<boolean> => {
  try {
    const response = await fetch(
      `https://discord.com/api/guilds/${process.env.AUTH_DISCORD_GUILD_ID}/members/${userId}`,
      {
        headers: {
          Authorization: `Bot ${process.env.AUTH_DISCORD_BOT_TOKEN}`,
        },
      },
    );

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    const isAdmin = data.roles.includes(process.env.AUTH_DISCORD_ADMIN_ROLE_ID);

    return isAdmin;
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
};
