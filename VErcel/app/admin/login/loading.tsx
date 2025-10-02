export default function AdminLoginLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="animate-pulse">
          {/* Back Button Skeleton */}
          <div className="h-10 w-24 bg-slate-700 rounded mb-6"></div>
          
          {/* Card Skeleton */}
          <div className="border-slate-700 bg-slate-800/50 backdrop-blur-sm shadow-2xl rounded-lg p-6">
            {/* Header Skeleton */}
            <div className="text-center space-y-4 mb-6">
              <div className="mx-auto w-16 h-16 bg-slate-700 rounded-full"></div>
              <div className="h-8 bg-slate-700 rounded w-3/4 mx-auto"></div>
              <div className="h-4 bg-slate-700 rounded w-full mx-auto"></div>
            </div>
            
            {/* Form Skeleton */}
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="h-4 bg-slate-700 rounded w-20"></div>
                <div className="h-10 bg-slate-700 rounded"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-slate-700 rounded w-16"></div>
                <div className="h-10 bg-slate-700 rounded"></div>
              </div>
              <div className="h-12 bg-slate-700 rounded"></div>
            </div>
            
            {/* Footer Skeleton */}
            <div className="text-center mt-6">
              <div className="h-4 bg-slate-700 rounded w-48 mx-auto"></div>
            </div>
          </div>
          
          {/* Security Notice Skeleton */}
          <div className="mt-6 text-center">
            <div className="h-3 bg-slate-700 rounded w-64 mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
