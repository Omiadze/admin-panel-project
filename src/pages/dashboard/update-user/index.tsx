import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { t } from "i18next";
import UpdateUSerForm from "./update-user-form";

const UpdateUserPage = () => {
  return (
    <div className="flex items-center justify-center h-full  py-24 sm:h-screen sm:p-0    ">
      <Card className="w-[370px] ">
        <CardHeader>
          <CardTitle>
            <h1>Update User </h1>
          </CardTitle>
          <CardDescription>{t("enter-details")} </CardDescription>
        </CardHeader>
        <CardContent>
          <UpdateUSerForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateUserPage;
