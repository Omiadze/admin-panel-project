import { NavLink, useNavigate } from "react-router-dom";
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
import { AUTH_PATHS, DASHBOARD_PATHS } from "@/routes/admin/index.enum";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthContext } from "@/context/hooks/use-auth-context";
import { AfterSignOut } from "@/layouts/components/utils/after-sign-out";
import LogoSvg from "@/layouts/components/logo-svg";

const DashboardHeader = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const userId = localStorage.getItem("userId");

  const handleSignOut = () => {
    AfterSignOut();
    navigate(AUTH_PATHS.LOGIN);
  };

  return (
    <div className="z-50 dark:bg-black  overflow-hidden  sticky top-0 left-0 w-full   bg-white shadow-[0px_-2px_4px_rgba(0,0,0,0.1)] border-solid border-b border-b-gray-300 dark:border-b-solid dark:border-b-neutral-800">
      <div className=" w-full sm:w-[90%]  mx-auto p-0  sm:px-5  h-20 flex items-center justify-between gap-4 ">
        <div className="text-2xl font-bold pl-5 ">
          <NavLink to="/">
            <LogoSvg />
          </NavLink>
        </div>
        <div className="flex justify-between items-center gap-3 p-4 rounded-lg">
          {userId ? (
            <>
              <div className=" justify-center items-center hidden md:flex">
                <div className="rounded-full overflow-hidden">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Avatar className="rounded-full border-2 border-primary">
                        <AvatarImage
                          className="rounded-full"
                          src={user?.image}
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="flex justify-center">
                      <DropdownMenuItem className="text-center">
                        <Button variant={"link"} onClick={handleSignOut}>
                          {t("sign-out")}
                        </Button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="flex justify-start p-2 pl-8">
                  <NavLink to={DASHBOARD_PATHS.USERS_CREATE}>
                    <Button
                      variant={"outline"}
                      className="border-dashed  justify-start border-primary text-primary hover:text-primary"
                    >
                      {t("add-user")}
                    </Button>
                  </NavLink>
                </div>
              </div>
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
              <NavLink to={DASHBOARD_PATHS.USERS_CREATE}>
                <DropdownMenuItem className="cursor-pointer flex justify-center">
                  {t("add-user")}
                </DropdownMenuItem>
              </NavLink>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex justify-center">
                <Button
                  variant={"link"}
                  className="text-center"
                  onClick={handleSignOut}
                >
                  <Avatar className="rounded-full border-2 border-primary">
                    <AvatarImage className="rounded-full" src={user?.image} />
                    <AvatarFallback>{user?.username}</AvatarFallback>
                  </Avatar>
                  {t("sign-out")}
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
