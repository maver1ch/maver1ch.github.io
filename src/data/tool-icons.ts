/**
 * Generic icon family for tools (NOT brand logos).
 * Each tool is mapped to a category, and each category has a single
 * generic Lucide-style SVG glyph.
 * Avoids trademark concerns while still giving visual rhythm.
 */

export type ToolIcon =
  | 'language'
  | 'framework'
  | 'cloud'
  | 'container'
  | 'database'
  | 'queue'
  | 'observe'
  | 'tooling'
  | 'chip';

const ICON_MAP: Array<[RegExp, ToolIcon]> = [
  [/^(python|typescript|javascript)$/i, 'language'],
  [/(pytorch|langchain|langgraph|llamaindex|flux|vllm)/i, 'framework'],
  [/^aws |bedrock|lambda|eventbridge|sqs|opensearch|s3|rds|elasticache/i, 'cloud'],
  [/(docker|kubernetes|fargate|ecs|ray)/i, 'container'],
  [/(qdrant|postgresql|postgres|mongodb|mongo|redis)/i, 'database'],
  [/(kafka|rabbitmq)/i, 'queue'],
  [/(langfuse|langsmith)/i, 'observe'],
  [/(github actions|cdk|terraform)/i, 'tooling'],
];

export function iconFor(label: string): ToolIcon {
  for (const [pattern, icon] of ICON_MAP) {
    if (pattern.test(label)) return icon;
  }
  return 'chip';
}

/** Inline SVG path data (no brand assets — generic Lucide-style). */
export const ICON_PATHS: Record<ToolIcon, string> = {
  language: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
  framework: '<path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/><circle cx="12" cy="12" r="3"/>',
  cloud: '<path d="M17.5 19a4.5 4.5 0 1 0-1.4-8.78A6 6 0 0 0 4.6 13.2 4.5 4.5 0 0 0 6.5 19h11z"/>',
  container: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>',
  database: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>',
  queue: '<polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  observe: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
  tooling: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  chip: '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="2" x2="9" y2="4"/><line x1="15" y1="2" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="22"/><line x1="15" y1="20" x2="15" y2="22"/><line x1="20" y1="9" x2="22" y2="9"/><line x1="20" y1="14" x2="22" y2="14"/><line x1="2" y1="9" x2="4" y2="9"/><line x1="2" y1="14" x2="4" y2="14"/>',
};
