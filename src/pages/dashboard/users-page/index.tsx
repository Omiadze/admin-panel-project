import { useEffect, useState } from "react";
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
import { useNavigate, useSearchParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import qs from "qs";
import { t } from "i18next";

const UsersPage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const limit = 30;
  const [searchParams, setSearchParams] = useSearchParams();
  const parsedQueryParams = qs.parse(searchParams.toString());

  const { mutate: handleDelete } = useMutation({
    mutationKey: ["delete-user-by-id"],
    mutationFn: (id: number) => deleteUserById({ id }),
    onSuccess: () => {
      // refetch the users after a successful delete
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  type SearchText = {
    searchText: string;
  };

  const { control, watch } = useForm<SearchText>({
    defaultValues: parsedQueryParams,
  });

  const searchQuery = watch("searchText");

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["users", page, searchQuery],
    queryFn: () => getUsers({ page, limit, searchQuery }),
  });

  // const onSearchSubmit = (values: SearchText) => {
  //   setSearchParams(
  //     qs.stringify(values, {
  //       skipNulls: true,
  //       filter: (_, value) => {
  //         return value || undefined;
  //       },
  //     })
  //   );
  //   console.log("Search values:", values);
  // };
  useEffect(() => {
    if (searchQuery) {
      setSearchParams(
        qs.stringify({ searchText: searchQuery }, { skipNulls: true })
      );
    }
  }, [searchQuery, setSearchParams]);

  if (error instanceof Error) {
    return <p>Error: {error.message}</p>;
  }

  const users = data?.users || [];
  const totalPages = data?.totalPages || 1;

  return (
    <>
      <div className="flex  p-10">
        <Controller
          control={control}
          name="searchText"
          render={({ field: { onChange, value } }) => {
            return (
              <Input
                onChange={onChange}
                value={value}
                placeholder={t("enter-search-text")}
              />
            );
          }}
        />
        {/* <Button onClick={handleSearchSubmit(onSearchSubmit)}>Search</Button> */}
      </div>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <div>
          <Table>
            <TableCaption>A list of all users</TableCaption>
            <TableHeader className="bg-secondary">
              <TableRow>
                <TableHead className="text-center">{t("name")}</TableHead>
                <TableHead className="text-center">{t("email")}</TableHead>
                <TableHead className="text-center">{t("age")}</TableHead>
                <TableHead className="text-center">{t("role")}</TableHead>
                <TableHead className="text-center">{t("actions")}</TableHead>
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
                    <Button onClick={() => handleDelete(user.id)}>
                      {t("delete")}
                    </Button>
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
      )}
    </>
  );
};

export default UsersPage;
