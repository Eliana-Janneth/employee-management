import Link from 'next/link';
import Layout from '@/components/Layout';

const UnauthorizedPage = () => {
  return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>403 - Unauthorized</h1>
        <p>You do not have permission to view this page.</p>
        <Link href="/">
          <a>Go back to Home</a>
        </Link>
      </div>
  );
};

export default UnauthorizedPage;
