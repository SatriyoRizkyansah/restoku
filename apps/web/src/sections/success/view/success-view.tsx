import { Link, useLocation } from "react-router-dom";

interface LocationState {
  trackingNumber: string;
  customerName: string;
}

export function SuccessView() {
  const location = useLocation();
  const state = location.state as LocationState;

  const { trackingNumber, customerName } = state || {
    trackingNumber: "ORDER-UNKNOWN",
    customerName: "Guest",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        {/* Success Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header with Animation */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-8 py-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10"></div>
            <div className="relative">
              <div className="mb-6">
                <div className="mx-auto w-24 h-24 bg-white/20 rounded-full flex items-center justify-center animate-bounce">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">Pesanan Berhasil! 🎉</h1>
              <p className="text-xl text-white/90">Terima kasih atas pesanan Anda</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Order Details */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 mb-8">
              <div className="text-center">
                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">Kode Pesanan</span>
                  <div className="mt-2 font-mono text-2xl font-bold text-gray-900 bg-white px-4 py-2 rounded-lg inline-block shadow-sm">{trackingNumber}</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="bg-white rounded-lg p-4">
                    <span className="text-sm font-medium text-gray-600">Nama Pemesan</span>
                    <div className="text-lg font-semibold text-gray-900 mt-1">{customerName}</div>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <span className="text-sm font-medium text-gray-600">Status</span>
                    <div className="text-lg font-semibold text-green-600 mt-1 flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                      Sedang Diproses
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Informasi Penting
              </h3>
              <ul className="text-blue-800 space-y-2">
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 mt-0.5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Simpan kode pesanan untuk melacak status
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 mt-0.5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Pesanan akan diproses sesuai urutan
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-2 mt-0.5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Estimasi waktu penyajian: 15-20 menit
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Link
                to="/foods"
                className="block w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg text-center"
              >
                <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Pesan Lagi
              </Link>

              <Link to="/" className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-4 px-6 rounded-xl transition-all duration-300 text-center">
                <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Kembali ke Beranda
              </Link>
            </div>

            {/* Thank You Message */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-lg text-gray-600 mb-2">
                Terima kasih telah memilih <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Kuliner</span>
              </p>
              <p className="text-sm text-gray-500">Kami berkomitmen memberikan pengalaman kuliner terbaik untuk Anda</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
