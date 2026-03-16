import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

type FormData = {
    tse_assigned: string;
    requesting_party: string;
    department: string;
    location: string;
    issues_encountered: string;
};

type Props = {
    open: boolean;
    onClose: () => void;
    data: FormData;
    setData: (key: keyof FormData, value: string) => void;
    processing: boolean;
    onSubmit: (e: React.FormEvent) => void;
};

export default function CreateModal({
    open,
    onClose,
    data,
    setData,
    processing,
    onSubmit
}: Props) {

    return (
        <Dialog open={open} onOpenChange={onClose}>

            <DialogContent>

                <DialogHeader>
                    <DialogTitle>Create Service Order</DialogTitle>
                </DialogHeader>

                <form onSubmit={onSubmit} className="space-y-4">

                    <Input
                        placeholder="Technician"
                        value={data.tse_assigned}
                        onChange={(e) => setData("tse_assigned", e.target.value)}
                    />

                    <Input
                        placeholder="Requester"
                        value={data.requesting_party}
                        onChange={(e) => setData("requesting_party", e.target.value)}
                    />

                    <Input
                        placeholder="Department"
                        value={data.department}
                        onChange={(e) => setData("department", e.target.value)}
                    />

                    <Input
                        placeholder="Location"
                        value={data.location}
                        onChange={(e) => setData("location", e.target.value)}
                    />

                    <div className="flex justify-end gap-2">
                        <Button variant="outline" type="button" onClick={onClose}>
                            Cancel
                        </Button>

                        <Button type="submit" disabled={processing}>
                            Create
                        </Button>
                    </div>

                </form>

            </DialogContent>

        </Dialog>
    );
}