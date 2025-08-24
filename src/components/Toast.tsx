'use client';
import { useEffect } from 'react';

type ToastProps = {
  message: string;
  type?: 'success' | 'error';
  onClose: () => void;
};

export default function Toast({ message, type = 'success', onClose }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  const base = 'fixed top-4 right-4 px-4 py-2 rounded shadow text-white transition-opacity';
  const color = type === 'success' ? 'bg-green-600' : 'bg-red-600';

  return <div className={`${base} ${color}`}>{message}</div>;
}
