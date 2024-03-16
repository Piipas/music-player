import { Input } from "@/components/atoms/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/atoms/avatar";

function Header() {
  return (
    <div className="header h-16 border-b border-gray-600 flex justify-between items-center px-4">
      <div className="w-80">
        <Input placeholder="What do you want to listen to?" className="" />
      </div>
      <div>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

export default Header;
