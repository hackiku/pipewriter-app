// $lib/components/cta/types.ts

export interface Tool {
  name: string;
  icon: string;
  fallback: string;
  url?: string;
}

export interface FlashingTools {
  tools: Tool[];
  interval?: number;
}

export type ToolsItem = Tool | FlashingTools;

export interface ToolsGridProps {
  tools: ToolsItem[];
  columns?: 2 | 3 | 4;
  gap?: "sm" | "md" | "lg";
}