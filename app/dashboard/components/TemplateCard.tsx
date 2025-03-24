import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"

interface TemplateCardProps {
  name: string
  category: string
  onClick?: () => void
}

export function TemplateCard({ name, category, onClick }: TemplateCardProps) {
  return (
    <Card className="overflow-hidden group transition-all duration-300 hover:shadow-md">
      <div className="h-40 bg-gradient-to-r from-primary/5 to-primary/10 flex items-center justify-center border-b group-hover:from-primary/10 group-hover:to-primary/20 transition-colors">
        <div className="text-4xl font-bold text-primary/20">{name.charAt(0)}</div>
      </div>
      <CardHeader className="pb-2">
        <CardTitle>{name}</CardTitle>
        <CardDescription>{category}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full group-hover:bg-primary/5 transition-colors"
          onClick={onClick}
        >
          Use Template
        </Button>
      </CardFooter>
    </Card>
  )
}
