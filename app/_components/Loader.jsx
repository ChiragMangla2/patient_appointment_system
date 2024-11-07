// components/Loader.js
export default function Loader() {
    return (
      <div className="flex items-center justify-center fixed inset-0 z-50 bg-black bg-opacity-80">
        <div className="w-16 h-16 border-4 border-green-400 border-t-gray-600 rounded-full animate-spin"></div>
      </div>
    );
  }
  