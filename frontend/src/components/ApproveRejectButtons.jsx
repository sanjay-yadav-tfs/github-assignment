import React, { useState } from 'react';
import { Check, X, MessageSquare } from 'lucide-react';

const ApproveRejectButtons = ({ user, onAction, disabled = false }) => {
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [loading, setLoading] = useState(false);

  const handleApprove = async () => {
    setLoading(true);
    try {
      await onAction(user.id, 'approve');
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      alert('Please provide a reason for rejection');
      return;
    }

    setLoading(true);
    try {
      await onAction(user.id, 'reject', rejectionReason);
      setShowRejectModal(false);
      setRejectionReason('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex space-x-2">
        <button
          onClick={handleApprove}
          disabled={disabled || loading}
          className="btn-success text-xs px-3 py-1 flex items-center space-x-1"
          title="Approve user"
        >
          <Check size={14} />
          <span>Approve</span>
        </button>
        
        <button
          onClick={() => setShowRejectModal(true)}
          disabled={disabled || loading}
          className="btn-danger text-xs px-3 py-1 flex items-center space-x-1"
          title="Reject user"
        >
          <X size={14} />
          <span>Reject</span>
        </button>
      </div>

      {/* Rejection Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex-shrink-0">
                <MessageSquare className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Reject User
                </h3>
                <p className="text-sm text-gray-500">
                  {user.firstName} {user.lastName}
                </p>
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label">
                Reason for rejection *
              </label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Please provide a detailed reason for rejecting this user..."
                className="form-input resize-none"
                rows={4}
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                This reason will be sent to the user via email.
              </p>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectionReason('');
                }}
                className="btn-secondary"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={loading || !rejectionReason.trim()}
                className="btn-danger flex items-center space-x-2"
              >
                {loading && (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                )}
                <X size={16} />
                <span>Reject User</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ApproveRejectButtons;