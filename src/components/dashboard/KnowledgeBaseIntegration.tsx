"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  Upload,
  FileText,
  Globe,
  Trash2,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Download,
  Eye,
} from "lucide-react";

interface Document {
  id: string;
  name: string;
  type: "pdf" | "docx" | "csv" | "txt";
  size: number;
  uploadDate: string;
  status: "processing" | "completed" | "error";
  progress: number;
  chunks: number;
}

interface WebSource {
  id: string;
  url: string;
  title: string;
  lastScraped: string;
  status: "active" | "error" | "pending";
  pages: number;
  chunks: number;
}

const KnowledgeBaseIntegration = () => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      name: "Company Handbook.pdf",
      type: "pdf",
      size: 2048000,
      uploadDate: "2024-01-15",
      status: "completed",
      progress: 100,
      chunks: 45,
    },
    {
      id: "2",
      name: "Product Documentation.docx",
      type: "docx",
      size: 1024000,
      uploadDate: "2024-01-14",
      status: "processing",
      progress: 75,
      chunks: 0,
    },
    {
      id: "3",
      name: "FAQ Database.csv",
      type: "csv",
      size: 512000,
      uploadDate: "2024-01-13",
      status: "error",
      progress: 0,
      chunks: 0,
    },
  ]);

  const [webSources, setWebSources] = useState<WebSource[]>([
    {
      id: "1",
      url: "https://company.com/help",
      title: "Help Center",
      lastScraped: "2024-01-15",
      status: "active",
      pages: 25,
      chunks: 120,
    },
    {
      id: "2",
      url: "https://company.com/docs",
      title: "Documentation",
      lastScraped: "2024-01-14",
      status: "error",
      pages: 0,
      chunks: 0,
    },
  ]);

  const [newUrl, setNewUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const newDoc: Document = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.name.split(".").pop() as "pdf" | "docx" | "csv" | "txt",
        size: file.size,
        uploadDate: new Date().toISOString().split("T")[0],
        status: "processing",
        progress: 0,
        chunks: 0,
      };

      setDocuments((prev) => [...prev, newDoc]);

      // Simulate upload progress
      setIsUploading(true);
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            setDocuments((docs) =>
              docs.map((doc) =>
                doc.id === newDoc.id
                  ? {
                      ...doc,
                      status: "completed",
                      progress: 100,
                      chunks: Math.floor(Math.random() * 50) + 10,
                    }
                  : doc,
              ),
            );
            return 0;
          }
          return prev + 10;
        });
      }, 200);
    });
  };

  const handleAddWebSource = () => {
    if (!newUrl) return;

    const newSource: WebSource = {
      id: Date.now().toString(),
      url: newUrl,
      title: "Pending...",
      lastScraped: "Never",
      status: "pending",
      pages: 0,
      chunks: 0,
    };

    setWebSources((prev) => [...prev, newSource]);
    setNewUrl("");

    // Simulate scraping process
    setTimeout(() => {
      setWebSources((sources) =>
        sources.map((source) =>
          source.id === newSource.id
            ? {
                ...source,
                title: "Scraped Content",
                lastScraped: new Date().toISOString().split("T")[0],
                status: "active",
                pages: Math.floor(Math.random() * 20) + 5,
                chunks: Math.floor(Math.random() * 100) + 20,
              }
            : source,
        ),
      );
    }, 3000);
  };

  const handleDeleteDocument = (id: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
  };

  const handleDeleteWebSource = (id: string) => {
    setWebSources((prev) => prev.filter((source) => source.id !== id));
  };

  const handleRetryProcessing = (id: string) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === id ? { ...doc, status: "processing", progress: 0 } : doc,
      ),
    );
  };

  const handleRescrapePage = (id: string) => {
    setWebSources((prev) =>
      prev.map((source) =>
        source.id === id ? { ...source, status: "pending" } : source,
      ),
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
      case "active":
        return (
          <Badge className="bg-green-500">
            <CheckCircle className="w-3 h-3 mr-1" /> Active
          </Badge>
        );
      case "processing":
      case "pending":
        return (
          <Badge className="bg-blue-500">
            <RefreshCw className="w-3 h-3 mr-1 animate-spin" /> Processing
          </Badge>
        );
      case "error":
        return (
          <Badge variant="destructive">
            <AlertCircle className="w-3 h-3 mr-1" /> Error
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="bg-background w-full p-6">
      <Tabs defaultValue="documents" className="space-y-6">
        <TabsList>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="web-scraping">Web Scraping</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Documents</CardTitle>
              <CardDescription>
                Upload PDF, DOCX, CSV, or TXT files to train your AI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <div className="space-y-2">
                    <p className="text-sm font-medium">
                      Drop files here or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Supports PDF, DOCX, CSV, TXT files up to 10MB each
                    </p>
                  </div>
                  <Input
                    type="file"
                    multiple
                    accept=".pdf,.docx,.csv,.txt"
                    onChange={handleFileUpload}
                    className="mt-4 cursor-pointer"
                  />
                </div>

                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Uploaded Documents</CardTitle>
              <CardDescription>
                Manage your uploaded documents and their processing status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documents.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="mx-auto h-12 w-12 mb-4" />
                    <p>No documents uploaded yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <FileText className="h-8 w-8 text-muted-foreground" />
                          <div>
                            <h4 className="font-medium">{doc.name}</h4>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span>{formatFileSize(doc.size)}</span>
                              <span>•</span>
                              <span>Uploaded {doc.uploadDate}</span>
                              {doc.chunks > 0 && (
                                <>
                                  <span>•</span>
                                  <span>{doc.chunks} chunks</span>
                                </>
                              )}
                            </div>
                            {doc.status === "processing" &&
                              doc.progress > 0 && (
                                <div className="mt-2 w-48">
                                  <Progress value={doc.progress} />
                                </div>
                              )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(doc.status)}
                          {doc.status === "error" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleRetryProcessing(doc.id)}
                            >
                              <RefreshCw className="h-4 w-4 mr-1" />
                              Retry
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteDocument(doc.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="web-scraping" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add Web Source</CardTitle>
              <CardDescription>
                Configure websites to scrape for training data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2">
                <Input
                  placeholder="https://example.com/help"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleAddWebSource} disabled={!newUrl}>
                  <Globe className="h-4 w-4 mr-2" />
                  Add Source
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Web Sources</CardTitle>
              <CardDescription>
                Manage your web scraping sources and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {webSources.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Globe className="mx-auto h-12 w-12 mb-4" />
                    <p>No web sources configured yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {webSources.map((source) => (
                      <div
                        key={source.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <Globe className="h-8 w-8 text-muted-foreground" />
                          <div>
                            <h4 className="font-medium">{source.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {source.url}
                            </p>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                              <span>Last scraped: {source.lastScraped}</span>
                              {source.pages > 0 && (
                                <>
                                  <span>•</span>
                                  <span>{source.pages} pages</span>
                                  <span>•</span>
                                  <span>{source.chunks} chunks</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(source.status)}
                          {source.status === "error" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleRescrapePage(source.id)}
                            >
                              <RefreshCw className="h-4 w-4 mr-1" />
                              Retry
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteWebSource(source.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Processing Settings</CardTitle>
              <CardDescription>
                Configure how your documents are processed and chunked
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="chunkSize">Chunk Size</Label>
                  <Input
                    id="chunkSize"
                    type="number"
                    defaultValue="1000"
                    placeholder="1000"
                  />
                  <p className="text-xs text-muted-foreground">
                    Number of characters per chunk (recommended: 500-2000)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="chunkOverlap">Chunk Overlap</Label>
                  <Input
                    id="chunkOverlap"
                    type="number"
                    defaultValue="200"
                    placeholder="200"
                  />
                  <p className="text-xs text-muted-foreground">
                    Number of overlapping characters between chunks
                  </p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="scrapingDelay">
                    Scraping Delay (seconds)
                  </Label>
                  <Input
                    id="scrapingDelay"
                    type="number"
                    defaultValue="1"
                    placeholder="1"
                  />
                  <p className="text-xs text-muted-foreground">
                    Delay between page requests to avoid rate limiting
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxPages">Max Pages per Source</Label>
                  <Input
                    id="maxPages"
                    type="number"
                    defaultValue="50"
                    placeholder="50"
                  />
                  <p className="text-xs text-muted-foreground">
                    Maximum number of pages to scrape from each source
                  </p>
                </div>

                <div className="pt-4">
                  <Button>Save Settings</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Knowledge Base Statistics</CardTitle>
              <CardDescription>
                Overview of your knowledge base content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold">{documents.length}</div>
                  <div className="text-sm text-muted-foreground">Documents</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold">{webSources.length}</div>
                  <div className="text-sm text-muted-foreground">
                    Web Sources
                  </div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold">
                    {documents.reduce((acc, doc) => acc + doc.chunks, 0) +
                      webSources.reduce(
                        (acc, source) => acc + source.chunks,
                        0,
                      )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Chunks
                  </div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold">
                    {formatFileSize(
                      documents.reduce((acc, doc) => acc + doc.size, 0),
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Size
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default KnowledgeBaseIntegration;
