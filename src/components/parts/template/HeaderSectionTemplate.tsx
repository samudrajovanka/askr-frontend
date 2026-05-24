type HeaderProps = {
  title: string;
  description?: string;
  rightComponent?: React.ReactNode;
};

const HeaderSection = ({ title, description, rightComponent }: HeaderProps) => {
  return (
    <header className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="typography-heading">{title}</h1>
        {description && (
          <p className="mt-1 typography-small text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      {rightComponent}
    </header>
  );
};

export default HeaderSection;
