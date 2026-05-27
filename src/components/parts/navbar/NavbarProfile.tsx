"use client";

import { useClerk } from "@clerk/nextjs";
import { Mail } from "lucide-react";
import { useState } from "react";
import QueryHandling from "@/components/parts/query/QueryHandling";
import { BasicAvatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
import { useMyInvitations } from "@/query/invitation";
import MyInvitationsDialog from "./MyInvitationsDialog";

const NavbarProfile = () => {
  const meQuery = useMe();
  const { signOut } = useClerk();
  const [invitationsOpen, setInvitationsOpen] = useState(false);

  const invitationsQuery = useMyInvitations();
  const pendingCount =
    invitationsQuery.data?.data?.data?.invitations?.length ?? 0;

  return (
    <>
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
                <BasicAvatar avatarUrl={user.avatarUrl} name={user.name} />
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
                  onClick={() => setInvitationsOpen(true)}
                  className="cursor-pointer "
                >
                  <Mail className="size-4" />
                  <span>My Invitations</span>
                  {pendingCount > 0 && (
                    <Badge className="ml-auto text-primary-foreground!">
                      {pendingCount}
                    </Badge>
                  )}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
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

      <MyInvitationsDialog
        open={invitationsOpen}
        onOpenChange={setInvitationsOpen}
      />
    </>
  );
};

export default NavbarProfile;
