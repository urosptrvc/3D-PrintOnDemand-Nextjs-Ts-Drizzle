"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Printer, Download, Trash2 } from "lucide-react"
import Link from "next/link"

// Mock data for demonstration
const models = [
  {
    id: "MOD-001",
    name: "Robot Figurine",
    date: "2023-04-05",
    fileType: "STL",
    fileSize: "2.4 MB",
    thumbnail: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "MOD-002",
    name: "Phone Stand",
    date: "2023-03-20",
    fileType: "OBJ",
    fileSize: "1.8 MB",
    thumbnail: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "MOD-003",
    name: "Custom Keychain",
    date: "2023-03-10",
    fileType: "STL",
    fileSize: "0.9 MB",
    thumbnail: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "MOD-004",
    name: "Desk Organizer",
    date: "2023-02-28",
    fileType: "3MF",
    fileSize: "3.2 MB",
    thumbnail: "/placeholder.svg?height=100&width=100",
  },
]

export function UserModelsList() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {models.map((model) => (
        <Card key={model.id} className="overflow-hidden">
          <CardHeader className="p-4">
            <div className="flex justify-between items-start">
              <CardTitle className="text-base truncate">{model.name}</CardTitle>
              <Badge variant="outline" className="text-xs">
                {model.fileType}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="aspect-square bg-muted flex items-center justify-center">
              <img
                src={model.thumbnail || "/placeholder.svg"}
                alt={model.name}
                className="object-cover w-full h-full"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between p-4">
            <div className="text-xs text-muted-foreground">
              <p>Uploaded: {new Date(model.date).toLocaleDateString()}</p>
              <p>Size: {model.fileSize}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" title="Download">
                <Download className="h-4 w-4" />
                <span className="sr-only">Download</span>
              </Button>
              <Button variant="ghost" size="icon" title="Delete">
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
              <Button variant="default" size="sm" asChild>
                <Link href={`/upload?model=${model.id}`}>
                  <Printer className="h-4 w-4 mr-1" />
                  Print
                </Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
