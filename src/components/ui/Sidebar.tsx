"use client";

import { useState } from "react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Home, FileText, Settings, Menu } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: <Home className="w-5 h-5" />, path: "/dashboard" },
    { name: "Recordings", icon: <FileText className="w-5 h-5" />, path: "/recordings" },
    { name: "Settings", icon: <Settings className="w-5 h-5" />, path: "/settings" },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="m-2">
          <Menu className="w-6 h-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-4">
        <h2 className="text-xl font-bold mb-4">Meeting Summarizer</h2>
        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
