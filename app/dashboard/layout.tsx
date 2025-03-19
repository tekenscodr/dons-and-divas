import { ReactNode } from "react";
import SideNav from "../components/Sidebar";
import TopCards from "../components/TopCards";
import Provider from "../utils/Providers";
import { Toaster } from "@/components/ui/toaster";

export default function DashboardLayout({ children }: { children: ReactNode }) {

    return (
        <main>
            <div className="flex min-h-screen w-full">
                <div className="w-1/5 p-4">
                    <SideNav />
                </div>
                <div className="p-4  bg-gray-100 w-full">
                    {/* <TopCards /> */}
                    <Provider>
                        {children}
                    </Provider>
                </div>
            </div>
        </main>

    );
}