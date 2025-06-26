
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Copy, Trash2, Edit3, Link as LinkIcon, Calendar, MousePointer } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface UrlData {
  id: string;
  originalUrl: string;
  shortUrl: string;
  dateCreated: string;
  clicks: number;
}

const UrlManager = () => {
  const [inputUrl, setInputUrl] = useState('');
  const [editingUrl, setEditingUrl] = useState<UrlData | null>(null);
  const [editOriginalUrl, setEditOriginalUrl] = useState('');
  const [editShortUrl, setEditShortUrl] = useState('');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [urls, setUrls] = useState<UrlData[]>([
    {
      id: '1',
      originalUrl: 'https://www.example.com/very-long-url-that-needs-shortening',
      shortUrl: 'neo.ly/abc123',
      dateCreated: '2024-01-15',
      clicks: 1234
    },
    {
      id: '2',
      originalUrl: 'https://github.com/awesome-project/documentation',
      shortUrl: 'neo.ly/xyz789',
      dateCreated: '2024-01-14', 
      clicks: 856
    },
    {
      id: '3',
      originalUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      shortUrl: 'neo.ly/def456',
      dateCreated: '2024-01-13',
      clicks: 2341
    }
  ]);

  const handleShortenUrl = () => {
    if (!inputUrl) {
      toast({
        title: "Error",
        description: "Please enter a URL to shorten.",
        variant: "destructive"
      });
      return;
    }

    const newUrl: UrlData = {
      id: Date.now().toString(),
      originalUrl: inputUrl,
      shortUrl: `neo.ly/${Math.random().toString(36).substring(2, 8)}`,
      dateCreated: new Date().toISOString().split('T')[0],
      clicks: 0
    };

    setUrls([newUrl, ...urls]);
    setInputUrl('');
    
    toast({
      title: "Success!",
      description: "Your URL has been shortened successfully.",
    });
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(`https://${url}`);
    toast({
      title: "Copied!",
      description: "Short URL copied to clipboard.",
    });
  };

  const deleteUrl = (id: string) => {
    setUrls(urls.filter(url => url.id !== id));
    toast({
      title: "Deleted",
      description: "URL has been removed.",
    });
  };

  const handleEditClick = (url: UrlData) => {
    setEditingUrl(url);
    setEditOriginalUrl(url.originalUrl);
    setEditShortUrl(url.shortUrl.split('/')[1]); // Extract the short code
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editOriginalUrl || !editShortUrl) {
      toast({
        title: "Error",
        description: "Please fill in both fields.",
        variant: "destructive"
      });
      return;
    }

    if (editingUrl) {
      const updatedUrls = urls.map(url => 
        url.id === editingUrl.id 
          ? { 
              ...url, 
              originalUrl: editOriginalUrl,
              shortUrl: `neo.ly/${editShortUrl}`
            }
          : url
      );
      
      setUrls(updatedUrls);
      setIsEditDialogOpen(false);
      setEditingUrl(null);
      setEditOriginalUrl('');
      setEditShortUrl('');
      
      toast({
        title: "Success!",
        description: "URL has been updated successfully.",
      });
    }
  };

  const handleCancelEdit = () => {
    setIsEditDialogOpen(false);
    setEditingUrl(null);
    setEditOriginalUrl('');
    setEditShortUrl('');
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            URL Manager
          </h1>
          <p className="text-xl text-gray-300">
            Create, manage, and track your shortened URLs
          </p>
        </div>

        {/* URL Shortener Form */}
        <Card className="card-neon mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-white">
              <LinkIcon className="w-5 h-5 text-cyan-400" />
              <span>Shorten New URL</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                placeholder="Enter your long URL here..."
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                className="input-neon flex-1"
              />
              <Button 
                onClick={handleShortenUrl}
                className="btn-neon sm:w-auto w-full"
              >
                Shorten URL
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* URLs List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white mb-6">Your Shortened URLs</h2>
          
          {urls.map((url) => (
            <Card key={url.id} className="card-neon">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="mb-2">
                      <p className="text-sm text-gray-400 mb-1">Original URL:</p>
                      <p className="text-white truncate">{url.originalUrl}</p>
                    </div>
                    <div className="mb-2">
                      <p className="text-sm text-gray-400 mb-1">Short URL:</p>
                      <p className="text-cyan-400 font-mono">{url.shortUrl}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{url.dateCreated}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MousePointer className="w-4 h-4" />
                        <span>{url.clicks} clicks</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(url.shortUrl)}
                        className="border-gray-600 text-gray-300 hover:border-cyan-500 hover:text-cyan-400"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditClick(url)}
                        className="border-gray-600 text-gray-300 hover:border-purple-500 hover:text-purple-400"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteUrl(url.id)}
                        className="border-gray-600 text-gray-300 hover:border-red-500 hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {urls.length === 0 && (
          <Card className="card-neon">
            <CardContent className="text-center py-12">
              <LinkIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No URLs Yet</h3>
              <p className="text-gray-500">Create your first shortened URL above!</p>
            </CardContent>
          </Card>
        )}

        {/* Edit URL Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[425px] bg-gray-900 border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-white flex items-center space-x-2">
                <Edit3 className="w-5 h-5 text-purple-400" />
                <span>Edit URL</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Original URL
                </label>
                <Input
                  value={editOriginalUrl}
                  onChange={(e) => setEditOriginalUrl(e.target.value)}
                  placeholder="Enter the original URL"
                  className="input-neon"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Short URL Code
                </label>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400 text-sm">neo.ly/</span>
                  <Input
                    value={editShortUrl}
                    onChange={(e) => setEditShortUrl(e.target.value)}
                    placeholder="custom-code"
                    className="input-neon flex-1"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={handleCancelEdit}
                className="border-gray-600 text-gray-300 hover:border-gray-500"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveEdit}
                className="btn-neon"
              >
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default UrlManager;
