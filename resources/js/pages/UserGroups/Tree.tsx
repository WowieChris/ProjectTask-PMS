import { Head } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type District = { id: number; name: string };
type Division = { id: number; name: string; districts: District[] };
type Area = { id: number; name: string; divisions: Division[] };

type PageProps = {
  userGroup: {
    id: number;
    name: string;
    areas: Area[];
  };
};

export default function UserGroupTree({ userGroup }: PageProps) {
  return (
    <AppLayout
      breadcrumbs={[
        { title: "Dashboard", href: "/dashboard" },
        { title: "Browse Tree", href: "/user-groups" },
      ]}
    >
      <Head title="User Group Tree" />

      <Card>
        <CardHeader>
          <CardTitle>{userGroup.name}</CardTitle>
        </CardHeader>

        <CardContent>
          {/* Areas Accordion */}
          <Accordion type="multiple" className="w-full space-y-2">
            {userGroup.areas.map((area) => (
              <AccordionItem key={area.id} value={`area-${area.id}`} className="rounded-lg border px-3">
                <AccordionTrigger className="text-left">
                  {area.name}
                </AccordionTrigger>

                <AccordionContent>
                  {/* Divisions Accordion */}
                  {area.divisions.length === 0 ? (
                    <p className="text-sm text-muted-foreground py-2">No divisions.</p>
                  ) : (
                    <Accordion type="multiple" className="w-full space-y-2">
                      {area.divisions.map((div) => (
                        <AccordionItem
                          key={div.id}
                          value={`div-${div.id}`}
                          className="rounded-lg border px-3"
                        >
                          <AccordionTrigger className="text-left">
                            {div.name}
                          </AccordionTrigger>

                          <AccordionContent>
                            {/* District list */}
                            {div.districts.length === 0 ? (
                              <p className="text-sm text-muted-foreground py-2">No districts.</p>
                            ) : (
                              <ul className="space-y-1 py-2 pl-2">
                                {div.districts.map((d) => (
                                  <li key={d.id} className="text-sm flex items-center gap-2">
                                    <span className="text-muted-foreground">•</span>
                                    <span>{d.name}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </AppLayout>
  );
}