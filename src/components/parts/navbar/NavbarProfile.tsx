"use client";

import { useClerk } from "@clerk/nextjs";
import { Mail, MessageSquare } from "lucide-react";
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
import app from "@/config/app";
import { useMe } from "@/query/auth";
import { useMyInvitations } from "@/query/invitation";
import packageJson from "../../../../package.json";
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
                <DropdownMenuItem onClick={() => setInvitationsOpen(true)}>
                  <Mail className="size-4" />
                  <span>My Invitations</span>
                  {pendingCount > 0 && (
                    <Badge className="ml-auto text-primary-foreground!">
                      {pendingCount}
                    </Badge>
                  )}
                </DropdownMenuItem>
                {app.feedbackFormUrl && (
                  <DropdownMenuItem
                    render={
                      <a
                        href={app.feedbackFormUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageSquare className="size-4" />
                        <span>Send Feedback</span>
                      </a>
                    }
                  />
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => signOut({ redirectUrl: "/auth/sign-in" })}
                  className="cursor-pointer text-destructive focus:text-destructive"
                >
                  Log out
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <div className="px-2 py-1 typography-xsmall text-muted-foreground/70 font-mono text-center">
                  v{packageJson.version}
                </div>
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
