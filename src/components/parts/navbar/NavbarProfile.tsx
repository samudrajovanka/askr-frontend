"use client";

import { useClerk } from "@clerk/nextjs";
import QueryHandling from "@/components/parts/query/QueryHandling";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useMe } from "@/query/auth";

const NavbarProfile = () => {
  const meQuery = useMe();
  const { signOut } = useClerk();

  return (
    <QueryHandling
      queryResult={meQuery}
      renderLoading={<Skeleton className="h-8 w-8 rounded-full" />}
      render={({
        data: {
          data: { user },
        },
      }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                {user.avatarUrl ? (
                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                ) : (
                  <AvatarFallback>
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuLabel className="p-2">
                  <div className="flex flex-col space-y-1">
                    <p className="typography-small font-semibold leading-none">
                      {user.name}
                    </p>
                    <p className="typography-small text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => signOut({ redirectUrl: "/auth/sign-in" })}
                className="cursor-pointer text-destructive focus:text-destructive"
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }}
    />
  );
};

export default NavbarProfile;
