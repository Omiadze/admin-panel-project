import { Controller, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoginDefaultValues } from '../login-default-values';
import { LoginFormValues } from '../types';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormSchema } from './schema';
import { Label } from '@radix-ui/react-label';
import { useTranslation } from 'react-i18next';
import { queryClient } from '@/main';
import { AfterLoginSuccessn } from '../utils';
import { useLogin } from '@/react-query/mutation/auth';

const LoginForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: LoginDefaultValues,
  });

  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();
  const toNavigate =
    location?.state?.from?.pathname + location?.state?.from?.search || '/';

  const { mutate: handleLogin } = useLogin((res) => {
    AfterLoginSuccessn({
      accessToken: res?.accessToken,
      refreshToken: res?.refreshToken,
      userId: res?.id,
    });
    queryClient.invalidateQueries({ queryKey: ['user'] });
    setTimeout(() => navigate(toNavigate), 0);
  });

  const onSubmit = (values: LoginFormValues) => {
    if (!values.password) {
      alert('Please fill in the password field');
      return;
    }
    handleLogin(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-6">
      {/* Username */}
      <div className="flex flex-col space-y-1.5">
        <Label
          htmlFor="username"
          className="
        text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {t('email')}
        </Label>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <Input
              id="username"
              type="text"
              placeholder={t('email-placeholder')}
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
      {/* Password */}
      <div className="flex flex-col space-y-1.5">
        <Label
          htmlFor="password"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {t('password')}
        </Label>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              id="password"
              type="password"
              placeholder={t('password-placeholder')}
              {...field}
            />
          )}
        />
        {errors.password && (
          <p className="text-sm text-destructive">
            {t(`${errors.password.message}`)}
          </p>
        )}
      </div>
      <div className="flex justify-between">
        <Button className="w-full " type="submit">
          {t('sign-in')}
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
