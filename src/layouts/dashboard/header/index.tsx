import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LanguageSwitcher from "@/layouts/components/language";
import { useTranslation } from "react-i18next";

import { DASHBOARD_PATHS } from "@/routes/admin/index.enum";

const DashboardHeader = () => {
  //   const navigate = useNavigate();
  const { lang } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const userId = localStorage.getItem("userId");

  return (
    <div className="z-50 dark:bg-black  overflow-hidden  sticky top-0 left-0 w-full   bg-white shadow-[0px_-2px_4px_rgba(0,0,0,0.1)] border-solid border-b border-b-gray-300 dark:border-b-solid dark:border-b-neutral-800">
      <div className=" w-full sm:w-[90%]  mx-auto p-0  sm:px-5  h-20 flex items-center justify-between gap-4 ">
        <div className="text-2xl font-bold pl-5 ">
          <NavLink to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-code"
            >
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </NavLink>
        </div>
        <div className="flex justify-between gap-5 md:w-[550px] font-sans "></div>
        <div className="flex justify-between items-center gap-3 p-4 rounded-lg">
          {userId ? (
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
              <DropdownMenu>
                <DropdownMenuTrigger className=" justify-center items-center flex border border-neutral-200  rounded-full  hover:scale-105 transition-all duration-300 cursor-pointer"></DropdownMenuTrigger>

                <DropdownMenuContent className="shadow-md border  border-neutral-200 mt-4 rounded-md  p-2 gap-2 flex justify-center items-center flex-col ">
                  <DropdownMenuItem className="p-0">
                    <NavLink to="/profile">
                      <Button variant="ghost" className="w-full  px-6">
                        {t("profile")}
                      </Button>
                    </NavLink>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="p-0">
                    <Button variant="ghost" className="w-full ">
                      {t("logout")}
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div>
              <NavLink to="login" className="hidden md:block ">
                <Button className="text-base font-sans">{t("sign-in")}</Button>
              </NavLink>
            </div>
          )}
          <LanguageSwitcher />
          <ModeToggle />
          {!userId ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="block md:hidden ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-align-justify"
                >
                  <path d="M3 12h18" />
                  <path d="M3 18h18" />
                  <path d="M3 6h18" />
                </svg>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuSeparator />
                <NavLink to="login">
                  <DropdownMenuItem>{t("sign-in")}</DropdownMenuItem>
                </NavLink>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
