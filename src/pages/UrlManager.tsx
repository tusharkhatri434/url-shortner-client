
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Copy, Trash2, Edit3, Link as LinkIcon, Calendar, MousePointer } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { apiUrl } from "@/lib/utils";

interface UrlData {
  _id: string;
  originalUrl: string;
  shortUrl: string;
  createdAt: string;
  clickCount: number;
  isActive:boolean
}

const UrlManager = () => {
  const [inputUrl, setInputUrl] = useState('');
  const [editingUrl, setEditingUrl] = useState<UrlData | null>(null);
  const [editOriginalUrl, setEditOriginalUrl] = useState('');
  const [editShortUrl, setEditShortUrl] = useState('');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [urls, setUrls] = useState<UrlData[]>([]);

  const fetchAllUrls = async ()=>{
        try {
          const urls = await fetch(`${apiUrl}/api/urls`,{
            headers:{
              'Content-type':'application/json',
              'authorization':`Bearer ${localStorage.getItem('token')}`
            }
          });

          const res = await urls.json();
          // console.log(res.allUrls);
          setUrls(res.allUrls);
        } catch (error) {
         console.log(error) 
        }
  }

  const deleteUrlHandler = async (id:String)=>{
       try {
        const url = await fetch(`${apiUrl}/api/urls/${id}`,{
          method:'DELETE',
          headers:{
            'Content-Type': 'application/json',
            'authorization':`Bearer ${localStorage.getItem('token')}`
          }
        });
        const res = await url.json();
        // console.log(res);
        fetchAllUrls();
      } catch (error) {
        console.log(error)
      }
  }

  const editUrlHandler = async(id:string)=>{
      try {
        const updatedUrl = await fetch(`${apiUrl}/api/urls/${id}`,{
          method:'PUT',
          headers:{
            'Content-Type': 'application/json',
            'authorization':`Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({newUrl:editOriginalUrl})
        });
        const res = await updatedUrl.json();
        console.log(res);
        fetchAllUrls();
      } catch (error) {
        console.log(error)
      }
  }

  useEffect(()=>{
    fetchAllUrls();
  },[]);

  const handleShortenUrl = async () => {
    console.log(inputUrl);
    if (!inputUrl) {
      toast({
        title: "Error",
        description: "Please enter a URL to shorten.",
        variant: "destructive"
      });
      return;
    }

      try {
        const newUrl = await fetch(`${apiUrl}/api/urls`,{
          method:'POST',
          headers:{
            'Content-Type': 'application/json',
            'authorization':`Bearer ${localStorage.getItem('token')}`
          },
          body:JSON.stringify({originalUrl:inputUrl})
        });
        const res : UrlData = await newUrl.json();
        console.log(res);

          fetchAllUrls();
          setInputUrl('');
      } catch (error) {
        console.log(error)
      }
    
    toast({
      title: "Success!",
      description: "Your URL has been shortened successfully.",
    });
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(`${url}`);
    toast({
      title: "Copied!",
      description: "Short URL copied to clipboard.",
    });
  };

  const deleteUrl = (id: string) => {
    deleteUrlHandler(id)
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
      console.log(editingUrl._id)
       editUrlHandler(editingUrl._id);

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
            <Card key={url._id} className="card-neon">
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
                        <span>{url.createdAt}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MousePointer className="w-4 h-4" />
                        <span>{url.clickCount} clicks</span>
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
                        onClick={() => deleteUrl(url._id)}
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
                <div className="flex items-center">
                  <span className="text-gray-400 text-sm">neo.ly/</span>
                  {/* <Input
                    value={editShortUrl}
                    onChange={(e) => setEditShortUrl(e.target.value)}
                    placeholder="custom-code"
                    className="input-neon flex-1"
                  /> */}
                  <p>{editShortUrl}</p>
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
