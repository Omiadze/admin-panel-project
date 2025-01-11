import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { UpdateOrCreateUserFormValues } from "../../types";
import { UpdateAndCreateUserFormSchema } from "../../schema";
import { CreateUserDefaultValues } from "../create-user-default-values";
import { t } from "i18next";
import { useMutation } from "@tanstack/react-query";
import { addNewUser } from "@/api/users";

const CreateUserForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateOrCreateUserFormValues>({
    resolver: zodResolver(UpdateAndCreateUserFormSchema),
    defaultValues: CreateUserDefaultValues,
  });

  const { mutate: handleAddUser } = useMutation({
    mutationKey: ["add-user"],
    mutationFn: addNewUser,
  });

  const onSubmit = (values: UpdateOrCreateUserFormValues) => {
    console.log(values);
    handleAddUser(values);
  };
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
          {t("add-user")}
        </Button>
      </div>
    </form>
  );
};

export default CreateUserForm;
