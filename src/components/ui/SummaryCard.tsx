import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SummaryCardProps {
    title: string;
    summary: string;
  }

  const SummaryCard: React.FC<SummaryCardProps> = ({ title, summary }) => {
    return (
      <Card className="my-4">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{summary}</p>
        </CardContent>
      </Card>
    );
  };

  export default SummaryCard;
