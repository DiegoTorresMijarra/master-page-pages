import {Toaster} from "@/components/ui/toaster";
import {Toaster as Sonner} from "@/components/ui/sonner";
import {TooltipProvider} from "@/components/ui/tooltip";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import type {AppProps} from 'next/app';
import ToastContainer from "@/components/ui/ToastContainer";
import '@/index.css';

// PrimeReact styles
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/primereact.css";
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import {PrimeReactProvider} from "primereact/api";


function MyApp({Component, pageProps}: AppProps) {
    const queryClient = new QueryClient();

    return (
        <PrimeReactProvider value={{unstyled: false}}>
            <QueryClientProvider client={queryClient}>

                <TooltipProvider>
                    <Toaster/>
                    <Sonner/>
                    <ToastContainer/>
                    <Component {...pageProps} />
                </TooltipProvider>
            </QueryClientProvider>
        </PrimeReactProvider>

    );
}

export default MyApp;
