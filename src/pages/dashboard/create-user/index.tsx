import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CreateUserForm from "./create-user-form";
import { t } from "i18next";

const CreateUserPage = () => {
  return (
    <div className="flex items-center justify-center h-full  py-24 sm:h-screen sm:p-0    ">
      <Card className="w-[370px] ">
        <CardHeader>
          <CardTitle>
            <h1>Here you can add the user </h1>
          </CardTitle>
          <CardDescription>{t("enter-details")} </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateUserForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateUserPage;
