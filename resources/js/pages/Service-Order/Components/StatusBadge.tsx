import { Badge } from "@/components/ui/badge";

type Props = {
    status: string;
};

export default function StatusBadge({ status }: Props) {

    let variant: "default" | "secondary" | "outline" = "outline";

    if (status === "Completed") variant = "default";
    if (status === "In Progress") variant = "secondary";

    return <Badge variant={variant}>{status}</Badge>;
}