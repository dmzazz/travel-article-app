"use client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5); // 5 seconds countdown
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    // Countdown timer
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setIsRedirecting(true);
          clearInterval(countdownInterval);
          // Navigate back after countdown reaches 0
          setTimeout(() => {
            navigate(-1);
          }, 500); // Small delay for smooth transition
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
        {/* 404 Animation */}
        <div className="mb-8">
          <div className="relative">
            <h1 className="animate-pulse text-8xl font-bold text-gray-200">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-16 w-16 animate-bounce items-center justify-center rounded-full bg-red-500">
                <span className="text-2xl text-white">!</span>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="mb-2 text-2xl font-bold text-gray-800">
            Oops! Halaman Tidak Ditemukan
          </h2>
          <p className="leading-relaxed text-gray-600">
            Maaf, halaman yang Anda cari tidak dapat ditemukan. Mungkin halaman
            telah dipindahkan, dihapus, atau URL yang Anda masukkan salah.
          </p>
        </div>

        {/* Countdown Section */}
        <div className="mb-8 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <div className="mb-3 flex items-center justify-center">
            <div className="flex h-12 w-12 animate-pulse items-center justify-center rounded-full bg-blue-500">
              <span className="text-lg font-bold text-white">{countdown}</span>
            </div>
          </div>

          {!isRedirecting ? (
            <p className="font-medium text-blue-700">
              Anda akan dikembalikan ke halaman sebelumnya dalam{" "}
              <span className="font-bold text-blue-800">{countdown} detik</span>
            </p>
          ) : (
            <p className="font-medium text-green-700">
              🔄 Mengalihkan ke halaman sebelumnya...
            </p>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="h-2 w-full rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-blue-600 transition-all duration-1000 ease-linear"
              style={{
                width: `${((5 - countdown) / 5) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
