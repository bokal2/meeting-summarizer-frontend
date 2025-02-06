"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/ui/Navbar";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner"; // For notifications

export default function Dashboard() {
  const [file, setFile] = useState<File | null>(null);
  const [selectedModel, setSelectedModel] = useState("amazon.titan-text-lite-v1"); // Default model
  const [summaryData, setSummaryData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("model_id", selectedModel);

    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:8000/summary", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to fetch summary");

      const data = await response.json();
      setSummaryData(data.response);
      toast.success("Summary generated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Error generating summary.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="container mx-auto p-6 space-y-6">

        {/* Upload Section */}
        <Card className="shadow-lg rounded-xl">
          <CardHeader>
            <CardTitle>Upload Meeting Audio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Label htmlFor="file-upload">Select an MP3 file:</Label>
              <Input
                id="file-upload"
                type="file"
                accept="audio/mpeg"
                onChange={handleFileChange}
              />

              <Label>Select Base Model:</Label>
              <Select onValueChange={(value) => setSelectedModel(value)} defaultValue={selectedModel}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="amazon.titan-text-lite-v1">Amazon Titan Lite</SelectItem>
                </SelectContent>
              </Select>

              <Button onClick={handleUpload} disabled={loading} className="w-full">
                {loading ? "Processing..." : "Generate Summary"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Separator />

        {summaryData && (
          <Card className="shadow-lg rounded-xl">
            <CardHeader>
              <CardTitle>Meeting Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <strong>Topic:</strong> {summaryData.topic}
              </div>
              <div>
                <strong>Sentiment:</strong>
                <span className={`ml-2 px-2 py-1 rounded-lg text-white ${summaryData.sentiment === "positive" ? "bg-green-500" : "bg-red-500"}`}>
                  {summaryData.sentiment}
                </span>
              </div>
              <Textarea value={summaryData.meeting_summary} readOnly className="w-full h-32" />

              {summaryData.issues.length > 0 && (
                <div>
                  <strong>Issues:</strong>
                  <ul className="list-disc ml-5 mt-2">
                    {summaryData.issues.map((issue: any, index: number) => (
                      <li key={index} className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg mt-2">
                        <strong>{issue.topic}:</strong> {issue.summary}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
