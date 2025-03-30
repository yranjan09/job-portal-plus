
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

export interface Package {
  package_id: number;
  name: string;
  price: number;
  description: string;
  duration: string;
}

interface PackagesTableProps {
  packages: Package[];
  onDelete: (id: number) => void;
  onUpdate: (id: number) => void;
  onCreateNew: () => void;
}

const PackagesTable: React.FC<PackagesTableProps> = ({ packages, onDelete, onUpdate, onCreateNew }) => {
  const handleDelete = (id: number) => {
    onDelete(id);
    toast({
      title: "Package Deleted",
      description: `Package #${id} has been deleted`,
      variant: "destructive"
    });
  };

  return (
    <div className="my-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold" id="my_packages">Current Packages</h1>
        <Button 
          className="flex items-center gap-2 bg-service-accent hover:bg-blue-600"
          onClick={onCreateNew}
        >
          <PlusCircle size={18} />
          <span>New Package</span>
        </Button>
      </div>

      {packages.length > 0 ? (
        <div className="table-container">
          <table className="service-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Duration</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((pkg) => (
                <tr key={pkg.package_id}>
                  <td>{pkg.package_id}</td>
                  <td>{pkg.name}</td>
                  <td>${pkg.price}</td>
                  <td>{pkg.description}</td>
                  <td>{pkg.duration}</td>
                  <td className="flex gap-2">
                    <Button 
                      variant="destructive" 
                      onClick={() => handleDelete(pkg.package_id)}
                    >
                      Delete
                    </Button>
                    <Button 
                      className="bg-service-accent hover:bg-blue-600"
                      onClick={() => onUpdate(pkg.package_id)}
                    >
                      Update
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-4 bg-gray-100 rounded-md text-center">
          <p>No packages found. Create a new package to get started.</p>
        </div>
      )}
    </div>
  );
};

export default PackagesTable;
