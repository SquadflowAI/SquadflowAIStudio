// utils/withAuth.tsx
import { useEffect } from 'react';
import { useRouter } from "@/node_modules/next/navigation";
import { useAuth } from "../contexts/AuthProvider";

const withAuth = (WrappedComponent: React.ComponentType) => {
  const ComponentWithAuth = (props: any) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (loading) return;
      if (!user) {
        router.push('/login');
      }
    }, [user, loading, router]);

    if (loading) {
      return <div>Loading...</div>;
    }

    // if (!user) {
    //   return <div>Loading...</div>; // Optionally render a loading state
    // }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default withAuth;
