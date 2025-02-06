"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function UploadForm() {
  const [progress, setProgress] = useState(0);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    // Simulating upload
    setProgress(50);
    setTimeout(() => setProgress(100), 2000);
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-bold">Upload Meeting Recording</h2>
      <Input type="file" onChange={handleUpload} className="my-2" />
      {progress > 0 && <Progress value={progress} />}
      <Button className="w-full mt-2">Upload</Button>
    </div>
  );
}
