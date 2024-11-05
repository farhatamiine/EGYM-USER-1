import "./styles.css";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import UserCard from "./components/ui/user-card";

export default function App() {
  const userData = {
    gender: "female",
    name: {
      title: "Miss",
      first: "Jennie",
      last: "Nichols",
    },
    location: {
      street: {
        number: 8929,
        name: "Valwood Pkwy",
      },
      city: "Billings",
      state: "Michigan",
      country: "United States",
      postcode: "63104",
    },
    email: "jennie.nichols@example.com",
    dob: {
      date: "1992-03-08T15:13:16.688Z",
      age: 30,
    },
    phone: "(272) 790-0888",
    picture: {
      large: "https://randomuser.me/api/portraits/men/75.jpg",
      medium: "https://randomuser.me/api/portraits/med/men/75.jpg",
      thumbnail: "https://randomuser.me/api/portraits/thumb/men/75.jpg",
    },
    nat: "US",
  };

  fetch("https://randomuser.me/api/?results=10")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  return (
    <div className="App">
      <UserCard userData={userData} />
    </div>
  );
}
