import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Pencil } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import qs from 'qs';
import { t } from 'i18next';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import Loading from '@/components/loading';
import { useDeleteUser } from '@/react-query/mutation/users';
import { SearchText } from '../types';
import { useUsers } from '@/react-query/query';

const UsersPage: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const limit = 30;
  const [searchParams, setSearchParams] = useSearchParams();
  const parsedQueryParams = qs.parse(searchParams.toString());

  const { mutate: handleDeleteUser } = useDeleteUser(() => {
    alert(t('request-success'));
  });

  const { control, watch } = useForm<SearchText>({
    defaultValues: parsedQueryParams,
  });

  const searchQuery = watch('searchText');

  const { data, isLoading, error } = useUsers({
    page: page,
    limit: limit,
    searchQuery: searchQuery,
  });

  useEffect(() => {
    if (searchQuery) {
      setSearchParams(
        qs.stringify({ searchText: searchQuery }, { skipNulls: true }),
      );
    } else {
      // Remove the searchText parameter when searchQuery is empty
      const params = qs.parse(searchParams.toString());
      delete params.searchText;
      setSearchParams(qs.stringify(params, { skipNulls: true }));
    }
  }, [searchQuery, searchParams, setSearchParams]);

  if (error instanceof Error) {
    return <p>Error: {error.message}</p>;
  }

  const users = data?.users || [];
  const totalPages = data?.totalPages || 1;

  return (
    <>
      <div className="flex  p-10 ">
        <Controller
          control={control}
          name="searchText"
          render={({ field: { onChange, value } }) => {
            return (
              <Input
                className="border-primary border-2"
                onChange={onChange}
                value={value}
                placeholder={t('enter-search-text')}
              />
            );
          }}
        />
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="mb-8">
          {users.length === 0 ? (
            <div className="text-center p-6">
              <h2 className="text-lg font-semibold">{t('no-users-found')}</h2>
              <p className="text-gray-500">{t('try-different-search')}</p>
            </div>
          ) : (
            <>
              {/* Table with user data */}
              <Table>
                <TableHeader className="bg-secondary">
                  <TableRow>
                    <TableHead className="text-center">{t('name')}</TableHead>
                    <TableHead className="text-center">{t('email')}</TableHead>
                    <TableHead className="text-center">{t('age')}</TableHead>
                    <TableHead className="text-center">{t('role')}</TableHead>
                    <TableHead className="text-center">
                      {t('actions')}
                    </TableHead>
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

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button>{t('delete')}</Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                {t('delete_confirmation.warning')}
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                {t('delete_confirmation.description')}
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>
                                {t('delete_confirmation.cancel')}
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteUser(user.id)}
                              >
                                {t('delete_confirmation.continue')}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination Controls */}
              {users.length < 30 ? (
                <div></div>
              ) : (
                <div className="flex justify-center mt-4 mb-11">
                  <Pagination>
                    <PaginationContent className="  h-20 flex justify-center w-full">
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (page > 1) setPage((prev) => prev - 1);
                            window.scrollTo({
                              top: 0,
                              behavior: 'auto',
                            });
                          }}
                        >
                          Previous
                        </PaginationPrevious>
                      </PaginationItem>
                      <div className="overflow-x-scroll pb-2 mt-3  flex   justify-center align-middle ">
                        {[...Array(totalPages).keys()].map((num) => (
                          <PaginationItem key={num}>
                            <PaginationLink
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                setPage(num + 1);
                                window.scrollTo({
                                  top: 0,
                                  behavior: 'auto',
                                });
                              }}
                              className={page === num + 1 ? 'text-primary' : ''}
                            >
                              {num + 1}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        {totalPages > 5 && (
                          <PaginationItem>
                            <PaginationEllipsis />
                          </PaginationItem>
                        )}
                      </div>
                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (page < totalPages) setPage((prev) => prev + 1);
                            window.scrollTo({
                              top: 0,
                              behavior: 'auto',
                            });
                          }}
                        >
                          Next
                        </PaginationNext>
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default UsersPage;
