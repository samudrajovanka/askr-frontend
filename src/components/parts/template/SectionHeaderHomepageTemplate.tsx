type SectionHeaderHomepageTemplateProps = {
  tag: string;
  title: string;
  description?: string;
  className?: string;
};

const SectionHeaderHomepageTemplate = ({
  tag,
  title,
  description,
  className = "mb-12 text-center md:mb-16",
}: SectionHeaderHomepageTemplateProps) => {
  return (
    <div className={className}>
      <p className="mb-3 typography-small font-medium text-primary uppercase">
        {tag}
      </p>
      <h2 className="typography-heading">{title}</h2>
      {description && (
        <p className="typography-subheading-2 font-normal text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeaderHomepageTemplate;
