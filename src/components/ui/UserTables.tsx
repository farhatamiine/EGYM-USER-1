import { UserData } from "../../lib/type";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { getInitials } from "../../lib/utils";

interface UserTableProps {
  users: UserData[];
  onRowClick: (user: UserData) => void;
}

export const UserTable: React.FC<UserTableProps> = ({ users, onRowClick }) => {
  return (
    <Table className="border">
      <TableCaption>A list of {users.length} Users.</TableCaption>
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
            <TableRow onClick={() => onRowClick(user)}>
              <TableCell className="font-medium">
                <Avatar>
                  <AvatarImage src={user.picture.medium} />
                  <AvatarFallback>
                    {getInitials(user.name.first + " " + user.name.last)}
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="font-medium">{user.name.first}</TableCell>
              <TableCell className="font-medium">{user.name.last}</TableCell>
              <TableCell className="font-medium">{user.email}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
