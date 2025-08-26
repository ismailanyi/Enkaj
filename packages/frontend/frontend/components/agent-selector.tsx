"use client";

import { User } from "@/types";
import Image from "next/image";

interface AgentSelectorProps {
  agents: User[];
  selectedAgent: number | null;
  onChange: (agentId: number) => void;
}

export function AgentSelector({
  agents,
  selectedAgent,
  onChange,
}: AgentSelectorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {agents.map((agent) => (
        <button
          key={agent.id}
          onClick={() => onChange(agent.id)}
          className={`p-4 rounded-lg ${
            selectedAgent === agent.id
              ? "bg-tealGradient text-white"
              : "bg-zinc-800 text-white hover:bg-teal"
          }`}
        >
          {agent.image ? (
            <Image
              src={agent.image || ""}
              alt="Agent"
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <svg
              className="w-12 h-12 mx-auto mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          )}

          <span className="block text-center">{agent.name}</span>
        </button>
      ))}
    </div>
  );
}
