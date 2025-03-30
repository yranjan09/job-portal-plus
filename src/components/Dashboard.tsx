
import React, { useState } from 'react';
import WelcomeBanner from './WelcomeBanner';
import FlashMessage from './FlashMessage';
import JobsTable, { Job } from './JobsTable';
import PackagesTable, { Package } from './PackagesTable';
import ReviewsSection, { Review } from './ReviewsSection';
import CreatePackageModal from './CreatePackageModal';
import { useToast } from '@/hooks/use-toast';

// Mock data for the dashboard
const MOCK_USER = {
  username: 'ServicePro',
};

const MOCK_PACKAGES: Package[] = [
  {
    package_id: 1,
    name: 'Basic Cleaning',
    price: 75,
    description: 'General house cleaning (2 bedrooms, 1 bathroom)',
    duration: '2 hours',
  },
  {
    package_id: 2,
    name: 'Deep Cleaning',
    price: 150,
    description: 'Thorough deep clean of entire home including appliances',
    duration: '4 hours',
  },
  {
    package_id: 3,
    name: 'Move-out Cleaning',
    price: 200,
    description: 'Complete cleaning for moving out of property',
    duration: '5 hours',
  },
];

const MOCK_JOBS: Job[] = [
  {
    service_request_id: 101,
    package_name: 'Basic Cleaning',
    customer_name: 'John Doe',
    phone: '555-123-4567',
    location: '123 Main St, Apt 4B',
    pincode: '12345',
    date_time: '2023-07-15 10:00 AM',
    status: 'Requested',
  },
  {
    service_request_id: 102,
    package_name: 'Deep Cleaning',
    customer_name: 'Jane Smith',
    phone: '555-987-6543',
    location: '456 Oak Ave',
    pincode: '54321',
    date_time: '2023-07-16 1:00 PM',
    status: 'Accepted',
  },
  {
    service_request_id: 103,
    package_name: 'Move-out Cleaning',
    customer_name: 'Robert Johnson',
    phone: '555-456-7890',
    location: '789 Pine St',
    pincode: '67890',
    date_time: '2023-07-10 11:30 AM',
    status: 'Completed',
  },
  {
    service_request_id: 104,
    package_name: 'Basic Cleaning',
    customer_name: 'Sarah Williams',
    phone: '555-246-8135',
    location: '321 Elm St',
    pincode: '13579',
    date_time: '2023-07-05 9:00 AM',
    status: 'Closed',
  },
];

const MOCK_REVIEWS: Review[] = [
  {
    service_id: 104,
    customer_name: 'Sarah Williams',
    rating: 5,
    comment: 'Amazing service! The cleaner was professional and thorough. Would definitely book again.',
  },
  {
    service_id: 98,
    customer_name: 'Michael Brown',
    rating: 4,
    comment: 'Very good cleaning service. Arrived on time and did a great job.',
  },
  {
    service_id: 87,
    customer_name: 'Emily Davis',
    rating: 5,
    comment: 'Fantastic service! My apartment has never looked cleaner.',
  },
];

const Dashboard: React.FC = () => {
  const { toast } = useToast();
  const [packages, setPackages] = useState<Package[]>(MOCK_PACKAGES);
  const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS);
  const [reviews] = useState<Review[]>(MOCK_REVIEWS);
  const [flashMessages, setFlashMessages] = useState<{type: 'success' | 'error' | 'info', message: string}[]>([]);
  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [currentPackage, setCurrentPackage] = useState<Package | undefined>(undefined);

  const addFlashMessage = (type: 'success' | 'error' | 'info', message: string) => {
    setFlashMessages([...flashMessages, { type, message }]);
    setTimeout(() => {
      setFlashMessages(current => current.filter(msg => msg.message !== message));
    }, 5000);
  };

  const handleAcceptJob = (id: number) => {
    setJobs(jobs.map(job => 
      job.service_request_id === id ? { ...job, status: 'Accepted' } : job
    ));
    addFlashMessage('success', `Job #${id} has been accepted.`);
  };

  const handleRejectJob = (id: number) => {
    setJobs(jobs.map(job => 
      job.service_request_id === id ? { ...job, status: 'Rejected' } : job
    ));
    addFlashMessage('info', `Job #${id} has been rejected.`);
  };

  const handleCloseJob = (id: number) => {
    setJobs(jobs.map(job => 
      job.service_request_id === id ? { ...job, status: 'Closed' } : job
    ));
    addFlashMessage('success', `Job #${id} has been closed.`);
  };

  const handleDeletePackage = (id: number) => {
    setPackages(packages.filter(pkg => pkg.package_id !== id));
    addFlashMessage('info', `Package #${id} has been deleted.`);
  };

  const handleUpdatePackage = (id: number) => {
    const packageToUpdate = packages.find(pkg => pkg.package_id === id);
    if (packageToUpdate) {
      setCurrentPackage(packageToUpdate);
      setIsUpdateMode(true);
      setIsPackageModalOpen(true);
    }
  };

  const handleCreateNewPackage = () => {
    setCurrentPackage(undefined);
    setIsUpdateMode(false);
    setIsPackageModalOpen(true);
  };

  const handleSavePackage = (packageData: { name: string; price: number; description: string; duration: string }) => {
    if (isUpdateMode && currentPackage) {
      // Update existing package
      setPackages(packages.map(pkg => 
        pkg.package_id === currentPackage.package_id 
          ? { ...pkg, ...packageData } 
          : pkg
      ));
      addFlashMessage('success', `Package "${packageData.name}" has been updated.`);
    } else {
      // Create new package
      const newPackage: Package = {
        package_id: Math.max(0, ...packages.map(pkg => pkg.package_id)) + 1,
        ...packageData,
      };
      setPackages([...packages, newPackage]);
      addFlashMessage('success', `Package "${packageData.name}" has been created.`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <WelcomeBanner username={MOCK_USER.username} />

      {flashMessages.map((message, index) => (
        <FlashMessage key={index} type={message.type} message={message.message} />
      ))}

      <JobsTable 
        jobs={jobs}
        onAccept={handleAcceptJob}
        onReject={handleRejectJob}
        onClose={handleCloseJob}
      />

      <PackagesTable 
        packages={packages}
        onDelete={handleDeletePackage}
        onUpdate={handleUpdatePackage}
        onCreateNew={handleCreateNewPackage}
      />

      <ReviewsSection reviews={reviews} />

      <CreatePackageModal
        isOpen={isPackageModalOpen}
        onClose={() => setIsPackageModalOpen(false)}
        onSave={handleSavePackage}
        initialData={currentPackage}
        isUpdate={isUpdateMode}
      />
    </div>
  );
};

export default Dashboard;
