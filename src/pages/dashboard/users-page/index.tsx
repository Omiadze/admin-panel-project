import { useState } from "react";
import { getUsers } from "@/api/users";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { Pencil } from "lucide-react";

const UsersPage = () => {
  const [page, setPage] = useState(1);
  const limit = 30;

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["users", page],
    queryFn: () => getUsers({ page, limit }),
    // keepPreviousData: true, // Keeps previous data during page transitions
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error instanceof Error) {
    return <p>Error: {error.message}</p>;
  }

  const users = data?.users || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div>
      <Table>
        <TableCaption>A list of all users</TableCaption>
        <TableHeader className="bg-secondary">
          <TableRow>
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Email</TableHead>
            <TableHead className="text-center">Age</TableHead>
            <TableHead className="text-center">Role</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.age}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell className="flex justify-center gap-3">
                <Button>
                  <Pencil />
                </Button>
                <Button>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <Button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1 || isFetching}
        >
          Previous
        </Button>
        <span>
          Page {page} of {totalPages}
        </span>
        <Button
          onClick={() =>
            setPage((prev) => (prev < totalPages ? prev + 1 : prev))
          }
          disabled={page === totalPages || isFetching}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default UsersPage;
