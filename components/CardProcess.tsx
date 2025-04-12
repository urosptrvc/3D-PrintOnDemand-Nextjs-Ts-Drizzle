type Props = {
  number: number;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  heading: string;
  plainText: string;
};
export function CardProcess({ number, icon: Icon, heading, plainText }: Props) {
  return (
    <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-white">
        {number}
      </div>
      <div className="rounded-full bg-primary/10 p-3">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-xl font-bold">{heading}</h3>
      <p className="text-center text-muted-foreground">{plainText}</p>
    </div>
  );
}
