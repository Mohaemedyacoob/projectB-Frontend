import React from 'react';
import { Toaster } from 'react-hot-toast';

const Toast = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#000',
          color: '#fff',
          border: '2px solid #FFD700',
        },
        success: {
          iconTheme: {
            primary: '#FFD700',
            secondary: '#000',
          },
        },
        error: {
          iconTheme: {
            primary: '#ff4444',
            secondary: '#fff',
          },
        },
      }}
    />
  );
};

export default Toast;