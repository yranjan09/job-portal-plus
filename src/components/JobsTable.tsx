
import React from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

export interface Job {
  service_request_id: number;
  package_name: string;
  customer_name: string;
  phone: string;
  location: string;
  pincode: string;
  date_time: string;
  status: 'Requested' | 'Accepted' | 'Completed' | 'Closed' | 'Rejected';
}

interface JobsTableProps {
  jobs: Job[];
  onAccept: (id: number) => void;
  onReject: (id: number) => void;
  onClose: (id: number) => void;
}

const JobsTable: React.FC<JobsTableProps> = ({ jobs, onAccept, onReject, onClose }) => {
  if (jobs.length === 0) {
    return (
      <div className="my-8">
        <div className="jobs mb-4">
          <h1 className="text-2xl font-bold">Current Jobs:</h1>
        </div>
        <div className="p-4 text-center">
          <p>No current jobs</p>
        </div>
      </div>
    );
  }

  const currentJobs = jobs.filter(job => job.status === 'Requested' || job.status === 'Accepted');
  const completedJobs = jobs.filter(job => job.status === 'Completed' || job.status === 'Closed');
  
  const handleAccept = (id: number) => {
    onAccept(id);
    toast({
      title: "Job Accepted",
      description: `You have accepted job #${id}`,
    });
  };

  const handleReject = (id: number) => {
    onReject(id);
    toast({
      title: "Job Rejected",
      description: `You have rejected job #${id}`,
      variant: "destructive"
    });
  };

  const handleClose = (id: number) => {
    onClose(id);
    toast({
      title: "Job Closed",
      description: `You have closed job #${id}`,
    });
  };

  return (
    <>
      {currentJobs.length > 0 && (
        <div className="my-8">
          <div className="jobs mb-4">
            <h1 className="text-2xl font-bold">Current Jobs</h1>
          </div>
          
          <div className="table-container">
            <table className="service-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Package</th>
                  <th>Customer</th>
                  <th>Phone</th>
                  <th>Location</th>
                  <th>Pincode</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentJobs.map((job) => (
                  <tr key={job.service_request_id}>
                    <td>{job.service_request_id}</td>
                    <td>{job.package_name}</td>
                    <td>{job.customer_name}</td>
                    <td>{job.phone}</td>
                    <td>{job.location}</td>
                    <td>{job.pincode}</td>
                    <td>{job.date_time}</td>
                    <td className="flex gap-2">
                      {job.status === 'Requested' ? (
                        <>
                          <Button 
                            className="bg-service-accent hover:bg-blue-600" 
                            onClick={() => handleAccept(job.service_request_id)}
                          >
                            Accept
                          </Button>
                          <Button 
                            variant="destructive" 
                            onClick={() => handleReject(job.service_request_id)}
                          >
                            Reject
                          </Button>
                        </>
                      ) : (
                        <Button disabled className="bg-gray-400">Assigned</Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {completedJobs.length > 0 && (
        <div className="my-8">
          <div className="jobs mb-4">
            <h1 className="text-2xl font-bold text-service-red">Completed Jobs</h1>
          </div>
          
          <div className="table-container">
            <table className="service-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Package</th>
                  <th>Customer</th>
                  <th>Phone</th>
                  <th>Location</th>
                  <th>Pincode</th>
                  <th>Completion Date</th>
                  <th>Close</th>
                </tr>
              </thead>
              <tbody>
                {completedJobs.map((job) => (
                  <tr key={job.service_request_id}>
                    <td>{job.service_request_id}</td>
                    <td>{job.package_name}</td>
                    <td>{job.customer_name}</td>
                    <td>{job.phone}</td>
                    <td>{job.location}</td>
                    <td>{job.pincode}</td>
                    <td>{job.date_time}</td>
                    <td>
                      {job.status === 'Completed' ? (
                        <Button 
                          className="bg-service-accent hover:bg-blue-600"
                          onClick={() => handleClose(job.service_request_id)}
                        >
                          CLOSE
                        </Button>
                      ) : (
                        <Button disabled className="bg-gray-400">Closed</Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default JobsTable;
