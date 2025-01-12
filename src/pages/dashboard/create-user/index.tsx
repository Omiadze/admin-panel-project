import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CreateUserForm from './create-user-form';
import { useTranslation } from 'react-i18next';

const CreateUserPage: React.FC = () => {
  const { t } = useTranslation(); // Add this line

  return (
    <div className="flex items-center justify-center h-full  py-24 sm:h-screen sm:p-0    ">
      <Card className="w-[370px] ">
        <CardHeader>
          <CardTitle>
            <h1>{t('enter-details-add-user')} </h1>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CreateUserForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateUserPage;
