"use client";

import type * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateListingForm } from "@/components/create-listing-form";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface TabViewProps {
  tabs: {
    value: string;
    label: string;
    content: React.ReactNode;
  }[];

  defaultTab?: number;
}

export function TabView({ tabs, defaultTab }: TabViewProps) {
  return (
    <Tabs defaultValue={tabs[defaultTab || 0].value} className="w-full">
      <div className="w-full max-w-full overflow-hidden flex justify-center">
        <div className="w-11/12 sm:w-5/6 md:w-3/4 lg:w-2/3">
          <ScrollArea className="w-full whitespace-nowrap rounded-md border border-primary">
            <TabsList className="inline-flex h-auto bg-transparent p-1 justify-center w-full">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="px-2 py-1 text-sm font-medium whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            <ScrollBar orientation="horizontal" className="invisible" />
          </ScrollArea>
        </div>
      </div>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
