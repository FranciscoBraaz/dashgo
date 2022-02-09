import Cookies from 'js-cookie';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

export function requireAuthentication(gssp: GetServerSideProps) {
  return async (ctx: GetServerSidePropsContext) => {
    const { req } = ctx;

    if (req.cookies) {
      const userData = req.cookies.userData;
      const dataFormated = userData && JSON.parse(userData);

      if (!dataFormated || !dataFormated.name) {
        return {
          redirect: {
            permanent: false,
            destination: '/',
          },
        };
      }
    }

    return await gssp(ctx);
  };
}
