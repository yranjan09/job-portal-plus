
import React from 'react';

export interface Review {
  service_id: number;
  customer_name: string;
  rating: number;
  comment: string;
}

interface ReviewsSectionProps {
  reviews: Review[];
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews }) => {
  return (
    <div className="my-8" id="reviews">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-service-red">Reviews</h1>
      </div>

      <div className="reviews_sec grid md:grid-cols-2 gap-4">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="review-card">
              <div className="mb-2">
                <div className="text-sm font-medium mb-1">Request ID - {review.service_id}</div>
                <div className="flex mb-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-500">⭐</span>
                  ))}
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
              <div className="customer-name text-right text-sm italic text-gray-600">~ {review.customer_name}</div>
            </div>
          ))
        ) : (
          <div className="col-span-2 p-4 bg-gray-100 rounded-md text-center">
            <p>No reviews yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsSection;
