"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 border-b">
      <h1 className="text-xl font-bold">Meeting Summarizer</h1>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline"><Menu className="w-6 h-6" /></Button>
        </SheetTrigger>
        <SheetContent>
          <p>Sidebar content here...</p>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
