
import React from 'react';
import { useToast } from '@/hooks/use-toast';

interface WelcomeBannerProps {
  username: string;
}

const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ username }) => {
  return (
    <div className="mb-8">
      <h1 className="text-5xl font-pacifico text-service-gray">
        Welcome {username}
      </h1>
    </div>
  );
};

export default WelcomeBanner;
