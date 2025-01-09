import { ModeToggle } from "@/components/mode-toggle";
import LanguageSwitcher from "@/layouts/components/language";

const AuthHeader = () => {
  return (
    <div className="flex justify-between items-center shadow-lg dark:bg-bg p-3">
      <div className="flex gap-3">
        <LanguageSwitcher />
        <ModeToggle />
      </div>
    </div>
  );
};

export default AuthHeader;
