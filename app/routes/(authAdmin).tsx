import PageLayout from '~/components/layout/PageLayout';
import { authCheckLoader } from '~/utils/authCheckLoader';
import { Outlet, useLoaderData } from 'react-router';

export { authCheckLoader as loader };

export default function AuthAdminLayout() {
  const { user } = useLoaderData();

  return (
    <PageLayout user={user}>
      <Outlet />
    </PageLayout>
  );
}
