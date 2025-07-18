import React from "react";
import { Link, useLocation } from "react-router-dom";

interface LocationState {
  trackingNumber: string;
  customerName: string;
}

const SuccessPage: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState;

  const { trackingNumber, customerName } = state || {
    trackingNumber: "ORDER-UNKNOWN",
    customerName: "Guest",
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {/* Success Icon */}
        <div className="mb-6">
          <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Success!!</h1>
        <p className="text-gray-600 mb-6">
          Your order will be processed shortly
          <br />
          Please wait patiently
        </p>

        {/* Order Details */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="text-sm text-gray-600 mb-1">Order ID:</div>
          <div className="font-mono text-lg font-semibold text-gray-900 mb-3">{trackingNumber}</div>
          <div className="text-sm text-gray-600 mb-1">Customer:</div>
          <div className="font-medium text-gray-900">{customerName}</div>
        </div>

        {/* Instructions */}
        <div className="text-sm text-gray-600 mb-6">
          <p>Please save your order ID for tracking purposes.</p>
          <p>You will be notified when your order is ready.</p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link to="/foods" className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200">
            Order More Food
          </Link>
          <Link to="/" className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded-lg transition-colors duration-200">
            Back to Home
          </Link>
        </div>

        {/* Thank You Message */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">Thank you for choosing Kuliner!</p>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
