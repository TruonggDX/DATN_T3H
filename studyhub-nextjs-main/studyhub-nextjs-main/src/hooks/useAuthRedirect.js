import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import api from '../service/auth';

export default function useAuthRedirect() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.getUser()
        .then((response) => {
          setUser(response.data);

          const roles = response.data?.roles?.map((item) => item.name);
          if (!roles.includes("CUSTOMER")) {
            router.push('/');
          }

        })
        .catch((error) => {
          console.error(error);
          router.push('/');
        });
  }, [router]);

  return user;
}

