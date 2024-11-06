import "./styles.css";

import UserCard from "./components/ui/user-card";
import { useEffect, useRef, useState } from "react";
import { UserData } from "./lib/type";

import { Dialog, DialogContent } from "./components/ui/dialog";
import { UserTable } from "./components/ui/UserTables";

const BASE_URL = "https://randomuser.me/api";

export default function App() {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<UserData[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
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

  const handleRowClick = (user: UserData) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  if (error) {
    return <div>Something went wrong! Please try again.</div>;
  }

  return (
    <div className="App">
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <>
          <UserTable onRowClick={handleRowClick} users={users} />
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              {selectedUser && (
                <div>
                  <UserCard userData={selectedUser} />
                </div>
              )}
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
}
