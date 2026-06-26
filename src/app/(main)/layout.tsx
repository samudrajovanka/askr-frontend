import AnnouncementBar from "@/components/parts/announcement/AnnouncementBar";
import NavbarHomepage from "@/components/parts/navbar/NavbarHomepage";
import app from "@/config/app";

export default function MainLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <AnnouncementBar
        storageKey="beta-announcement-v1"
        message="Askr is in beta — we'd love your feedback!"
        actionLabel="Give feedback"
        actionHref={app.feedbackFormUrl}
      />
      <NavbarHomepage />
      {children}
    </>
  );
}
