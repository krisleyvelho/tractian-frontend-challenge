import { Search } from "lucide-react";
import { Button } from "./button";

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function SearchBar({...props}: SearchBarProps) {
  return (
    <div className="flex gap-4 items-center bg-white focus:outline-none focus-visible:outline-none">
      <input type="text"  {...props} />
      <Button className="bg-transparent hover:bg-transparent text-black "><Search className="bg-transparent"/></Button>
    </div>
  );
}
