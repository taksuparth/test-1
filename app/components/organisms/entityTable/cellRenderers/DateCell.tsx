// A renderer for dates, formatting them nicely
export const DateCell = ({ dateString }: { dateString?: string | number }) => {
  if (!dateString) return <span className="text-muted-foreground">N/A</span>;
  const date = new Date(dateString);
  return (
    <span>
      {date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })}
    </span>
  );
};
