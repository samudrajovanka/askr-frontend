import Image from "next/image";
import app from "@/config/app";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
};

const Logo = ({ className }: LogoProps) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Image src="/images/logo.svg" alt="logo" width={28} height={28} />

      <span className="text-xl font-bold tracking-tight text-foreground lowercase">
        {app.name}
      </span>
    </div>
  );
};

export default Logo;
