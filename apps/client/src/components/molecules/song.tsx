import { Heart } from "lucide-react";

function Song() {
  return (
    <div className="flex items-between">
      <img src="https://github.com/shadcn.png" className="w-10 h-10 rounded-md" alt="" />
      <div>Bad Guy</div>
      <div>Billie Eilish</div>
      <div>03:54</div>
      <Heart className={false ? "fill-main stroke-main" : ""} size={18} />
    </div>
  );
}

export default Song;
