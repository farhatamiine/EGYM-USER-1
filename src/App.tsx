import "./styles.css";

import UserCard from "./components/ui/user-card";
import { useEffect, useRef, useState } from "react";
import { UserData } from "./lib/type";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { getInitials } from "./lib/utils";

const BASE_URL = "https://randomuser.me/api";

export default function App() {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<UserData[]>([]);

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();

      setIsLoading(true);

      try {
        const response = await fetch(`${BASE_URL}/?results=10`, {
          signal: abortControllerRef.current?.signal,
        });
        const users = (await response.json().then((res) => {
          return res.results;
        })) as UserData[];

        setUsers(users);
      } catch (e: any) {
        if (e.name === "AbortError") {
          console.log("Aborted");
          return;
        }

        setError(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (error) {
    return <div>Something went wrong! Please try again.</div>;
  }

  return (
    <div className="App">
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <Table>
          <TableCaption>A list of Users.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Picture</TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => {
              return (
                <TableRow onClick={() => console.log(user)}>
                  <TableCell className="font-medium">
                    <Avatar>
                      <AvatarImage src={user.picture.medium} />
                      <AvatarFallback>
                        {getInitials(user.name.first + " " + user.name.last)}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">
                    {user.name.first}
                  </TableCell>
                  <TableCell className="font-medium">
                    {user.name.last}
                  </TableCell>
                  <TableCell className="font-medium">{user.email}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
