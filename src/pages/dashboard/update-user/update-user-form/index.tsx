import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { UpdateOrCreateUserFormValues } from "../../types";
import { UpdateAndCreateUserFormSchema } from "../../schema";
import { t } from "i18next";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getSingleUser, updateUser } from "@/api/users";

const UpdateUSerForm = () => {
  const { id } = useParams();
  const { data: singleUser, isLoading } = useQuery({
    queryKey: ["users", id],
    queryFn: () => getSingleUser(id),
    enabled: !!id,
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateOrCreateUserFormValues>({
    resolver: zodResolver(UpdateAndCreateUserFormSchema),
    defaultValues: {
      username: singleUser?.username || "",
      email: singleUser?.email || "",
      age: singleUser?.age || "",
      role: singleUser?.role || "",
    },
    values: singleUser, // Dynamically update form values when `singleUser` changes
  });

  console.log("id", id);

  console.log("singleUSer", singleUser);

  const { mutate: handleUpdateUser } = useMutation({
    mutationKey: ["update-user"],
    mutationFn: (payload: UpdateOrCreateUserFormValues) =>
      updateUser(id, payload),
  });

  const onSubmit = (values: UpdateOrCreateUserFormValues) => {
    console.log(values);
    handleUpdateUser(values);
  };
  if (isLoading) {
    return <p>{t("loading")}</p>;
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-1.5">
        <Label
          htmlFor="username"
          className="
      text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {t("username")}
        </Label>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <Input
              id="username"
              type="text"
              placeholder={t("username-placeholder")}
              {...field}
            />
          )}
        />
        {errors.username && (
          <p className="text-sm text-destructive">
            {t(`${errors.username.message}`)}
          </p>
        )}
      </div>

      <div className="flex flex-col space-y-1.5">
        <Label
          htmlFor="email"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {t("email")}
        </Label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              id="email"
              type="email"
              placeholder={t("email-placeholder")}
              {...field}
            />
          )}
        />
        {errors.email && (
          <p className="text-sm text-destructive">
            {t(`${errors.email.message}`)}
          </p>
        )}
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label
          htmlFor="age"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {t("age")}
        </Label>
        <Controller
          name="age"
          control={control}
          render={({ field }) => (
            <Input
              id="age"
              type="number"
              placeholder={t("age-placeholder")}
              {...field}
            />
          )}
        />
        {errors.age && (
          <p className="text-sm text-destructive">
            {t(`${errors.age.message}`)}
          </p>
        )}
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label
          htmlFor="role"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {t("role")}
        </Label>
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <Input
              id="role"
              type="text"
              placeholder={t("role-placeholder")}
              {...field}
            />
          )}
        />
        {errors.role && (
          <p className="text-sm text-destructive">
            {t(`${errors.role.message}`)}
          </p>
        )}
      </div>

      <div className="flex justify-between">
        <Button className="w-full " type="submit">
          {t("update-user")}
        </Button>
      </div>
    </form>
  );
};

export default UpdateUSerForm;
