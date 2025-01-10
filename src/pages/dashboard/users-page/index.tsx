import { useState } from "react";
import { deleteUserById, getUsers } from "@/api/users";
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
import { useMutation, useQuery } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import { queryClient } from "@/main";
import { useNavigate, useParams } from "react-router-dom";
import { DASHBOARD_PATHS } from "@/routes/admin/index.enum";

const UsersPage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const limit = 30;
  const { lang } = useParams();

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["users", page],
    queryFn: () => getUsers({ page, limit }),
  });

  const { mutate: handleDelete } = useMutation({
    mutationKey: ["delete-user-by-id"],
    mutationFn: (id: number) => deleteUserById({ id }),
    onSuccess: () => {
      // refetch the users after a successful delete
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
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
    <>
      <div className="flex justify-start p-2 pl-8">
        <Button
          onClick={() => {
            console.log(
              `Navigating to: /${lang}/${DASHBOARD_PATHS.USERS_CREATE} `
            );
            navigate(`/${lang}/${DASHBOARD_PATHS.USERS_CREATE}`);
          }}
          variant={"outline"}
          className="border-dashed  justify-start border-primary text-primary"
        >
          ADD USER
        </Button>
      </div>
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
                  <Button
                    onClick={() => {
                      navigate(`update/${user.id}`);
                    }}
                  >
                    <Pencil />
                  </Button>
                  <Button onClick={() => handleDelete(user.id)}>Delete</Button>
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
    </>
  );
};

export default UsersPage;
