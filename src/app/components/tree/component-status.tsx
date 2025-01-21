interface ComponentStatusProps {
  status: string;
}

export function ComponentStatus({ status }: ComponentStatusProps) {
  switch (status) {
    case 'alert':
      return <div className="w-4 h-4 bg-red-500 rounded-full"></div>;
    case 'operating':
      return <div className="w-4 h-4 bg-green-500 rounded-full"></div>;
    default:
      return null;
  }
}
