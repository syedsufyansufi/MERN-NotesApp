
const RateLimitedUi = () => {
  return (
    <div className="max-w-md mx-auto mt-10 bg-green-900 text-green-100 border border-green-700 rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-3">
        {/* Icon */}
        <svg
          className="h-8 w-8 text-green-400 flex-shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L4.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>

        {/* Title */}
        <h2 className="text-xl font-semibold">Rate Limit Reached</h2>
      </div>

      {/* Message */}
      <p className="mt-3 text-green-200">
        You&apos;ve reached the maximum number of requests allowed.  
        Please wait a moment before trying again.
      </p>
    </div>
  );  
}

export default RateLimitedUi