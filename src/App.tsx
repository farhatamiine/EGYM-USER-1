import "./styles.css";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";

export default function App() {
  return (
    <div className="App">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <p>Hello</p>
    </div>
  );
}
