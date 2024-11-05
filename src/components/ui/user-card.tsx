import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { MapPin, Mail, Phone, Calendar, Flag } from "lucide-react";

interface UserData {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: string;
  };
  email: string;
  dob: {
    date: string;
    age: number;
  };
  phone: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
}

export default function UserCard({ userData }: { userData: UserData }) {
  const { name, location, email, dob, phone, picture, nat } = userData;

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-col justify-center items-center gap-4 pb-2 border-b-2 mx-6 mb-4">
        <Avatar className="w-20 h-20">
          <AvatarImage src={picture.large} alt={`${name.first} ${name.last}`} />
          <AvatarFallback>
            {name.first[0]}
            {name.last[0]}
          </AvatarFallback>
        </Avatar>
        <div className="text-center">
          <CardTitle className="text-2xl">
            {name.title} {name.first} {name.last}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {location.city}, {location.state}
          </p>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <p className="text-sm">
            {location.street.number} {location.street.name}, {location.city},{" "}
            {location.state} {location.postcode}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-muted-foreground" />
          <p className="text-sm">{email}</p>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-muted-foreground" />
          <p className="text-sm">{phone}</p>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <p className="text-sm">
            Born {new Date(dob.date).toLocaleDateString()} (Age: {dob.age})
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Flag className="w-4 h-4 text-muted-foreground" />
          <p className="text-sm">Nationality: {nat}</p>
        </div>
      </CardContent>
    </Card>
  );
}
