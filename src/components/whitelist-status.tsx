"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Prisma } from "@prisma/client";

export default function WhitelistStatusCard({ application }: { application: Prisma.WhitelistApplicationCreateInput }) {
  return (
    <Card className="w-full max-w-md overflow-hidden">
      <div className="relative backdrop-blur-sm backdrop-filter">
        <CardHeader className="space-y-1">
          <CardTitle className="text-center text-2xl font-bold text-white">Whitelist Application</CardTitle>
          <p className="text-center text-white/80">Your application is currently under review</p>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-white">Submission Date:</span>
              <span className="text-sm text-white/80">
                {application.createdAt?.toLocaleString(process.env.APP_LOCALE)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-white">Status:</span>
              <Badge className="bg-yellow-500/20 text-yellow-200">Under Review</Badge>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <p className="w-full text-center text-xs text-white/60">
            We appreciate your patience. Our team is carefully reviewing your application. You will be notified once a
            decision has been made.
          </p>
        </CardFooter>
      </div>
    </Card>
  );
}
