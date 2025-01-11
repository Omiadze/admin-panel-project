import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import UpdateUSerForm from "./update-user-form";
import { useTranslation } from "react-i18next";

const UpdateUserPage = () => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-center h-full  py-24 sm:h-screen sm:p-0    ">
      <Card className="w-[370px] ">
        <CardHeader>
          <CardTitle>
            <h1>{t("enter-details-update-user")}</h1>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <UpdateUSerForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateUserPage;
