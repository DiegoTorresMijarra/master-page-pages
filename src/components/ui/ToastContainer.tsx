
import React, { useEffect, useState } from 'react';
import { toast } from "@/hooks/use-toast";
import CustomToast from "./custom-toast";

export type ToastType = 'success' | 'error' | 'info' | 'warning';

const ToastContainer: React.FC = () => {
  // Expose the toast function globally
  useEffect(() => {
    (window as any).showToast = (message: string, type: ToastType = 'info') => {
      switch (type) {
        case 'success':
          toast({ title: "Success", description: message, variant: "default" });
          break;
        case 'error':
          toast({ title: "Error", description: message, variant: "destructive" });
          break;
        case 'info':
          toast({ title: "Info", description: message });
          break;
        case 'warning':
          toast({ title: "Warning", description: message });
          break;
      }
    };

    return () => {
      delete (window as any).showToast;
    };
  }, []);

  return null; // This component just sets up the global toast function, doesn't render anything
};

export default ToastContainer;
