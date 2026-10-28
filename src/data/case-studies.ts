/** Home page block a case study belongs to: founder work, enterprise production, academic research, or freelance go-to-market */
export type CaseStudyGroup = 'startup' | 'production' | 'research' | 'freelance';

export interface CaseStudyMeta {
  slug: string;
  group: CaseStudyGroup;
  title: string;
  client: string;
  period: string;
  blurb: string;
  coverImage?: string;
  /** true for illustrated covers: shown at full brightness, no tint or crop-in */
  coverIllustration?: boolean;
  /** chip text on the cover; defaults to "Architecture Preview" */
  coverLabel?: string;
  coverGradient: string;
  stack: string[];
  draft?: boolean;
}

export const caseStudies: CaseStudyMeta[] = [
  {
    slug: 'wizzdom-ai-grading',
    group: 'startup',
    title: 'Wizzdom: AI Grading for Handwritten Math',
    client: 'Wizzdom (EdTech startup)',
    period: 'Jul 2025 – Dec 2025',
    blurb:
      'Pivoted after 20–30 teacher interviews, then built AI grading for handwritten math: Mathpix OCR, Gemini step-by-step rubric grading, and a review screen with notes pinned to the handwriting. 3x faster than by hand, 1,000+ papers graded, paid for by teachers.',
    coverImage: '/assets/case-studies/wizzdom/cover.jpg',
    coverIllustration: true,
    coverLabel: 'Product Screenshot',
    coverGradient: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
    stack: ['React', 'TypeScript', 'AWS Lambda', 'SQS', 'RDS PostgreSQL', 'Gemini', 'Mathpix'],
  },
  {
    slug: 'fpt-hr-conversational-ai',
    group: 'production',
    title: 'HR Conversational AI Platform',
    client: 'Covestro AG (via FPT Software)',
    period: 'Mar 2026 – Present',
    blurb:
      'Revived and then replaced a production HR assistant for a Fortune 500 chemicals corporation: measured baseline, semantic cache, HR-only knowledge base, then a zero-downtime move to an MCP-based agent platform on AWS, plus a React app that lets HR change agents safely.',
    coverImage: '/assets/case-studies/covestro/cover.jpg',
    coverIllustration: true,
    coverGradient: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
    stack: ['LangGraph', 'MCP', 'AWS Bedrock', 'OpenSearch Serverless', 'React', 'AWS CDK'],
  },
  {
    slug: 'fpt-contract-intelligence',
    group: 'production',
    title: 'AI Contract Intelligence System',
    client: 'FPT Software',
    period: 'Jan 2026 – Feb 2026',
    blurb:
      'Skill-based framework on AWS: Python filters first, then a Claude agent loop that searches OpenSearch only when unsure. +35% accuracy, ~5× fewer tokens, async batches of thousands of contracts.',
    coverImage: '/assets/case-studies/fpt-contract/cover.jpg',
    coverIllustration: true,
    coverGradient: 'linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)',
    stack: ['Skill-Based Framework', 'Prompt Chaining', 'AWS Bedrock', 'OpenSearch', 'SQS', 'Python'],
  },
  {
    slug: 'hti-agentic-chatbot',
    group: 'production',
    title: 'Enterprise Agentic Chatbot & LLMOps Infrastructure',
    client: 'HTI Group',
    period: 'Apr 2025 – Dec 2025',
    blurb:
      'Supervisor + Knowledge, Action and ChitChat agents on LangGraph, each with its own ReAct loop. Docling parsing, hierarchical semantic chunking and a knowledge graph. Local POC to AWS production on ECS Fargate, Lambda and Bedrock.',
    coverImage: '/assets/case-studies/hti/cover.jpg',
    coverIllustration: true,
    coverGradient: 'linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)',
    stack: ['LangGraph', 'LlamaIndex', 'Docling', 'Neo4j', 'ECS Fargate', 'AWS Lambda', 'AWS CDK'],
  },
  {
    slug: 'hg-chatbot',
    group: 'production',
    title: 'Enterprise Internal AI Chatbot',
    client: 'HG Group',
    period: 'Sep 2024 – Feb 2025',
    blurb:
      'On-premise RAG chatbot over the company document library. Hybrid Qdrant + MongoDB retrieval, hierarchical chunking, cross-encoder reranking and multi-LLM routing (GPT + Gemini).',
    coverImage: '/assets/case-studies/hg-chatbot/cover.jpg',
    coverIllustration: true,
    coverGradient: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)',
    stack: ['BGE-M3', 'Qdrant', 'MongoDB', 'Ray Serve', 'Langfuse', 'Cross-Encoder', 'GPT API'],
  },
  {
    slug: 'esg-business-report',
    group: 'research',
    title: 'Knowledge-Graph RAG for ESG Banking Reports',
    client: 'Academic Research',
    period: '',
    blurb:
      'GRI-aligned KG-RAG over Vietnamese bank ESG reports. Neo4j + hybrid retrieval + cross-encoder reranking + LLM-as-judge fact-checking. 88.14% accuracy on 1,440 expert-annotated QA pairs.',
    coverImage: '/assets/case-studies/esg-business-report/cover.jpg',
    coverIllustration: true,
    coverGradient: 'linear-gradient(135deg, #16a34a 0%, #059669 100%)',
    stack: ['Neo4j', 'Knowledge Graph', 'Qwen3-8B', 'OLMoCR', 'FAISS', 'Cross-Encoder', 'FEVER'],
  },
  {
    slug: 'freelance-first-client',
    group: 'freelance',
    title: 'Freelance: Winning the First Client',
    client: 'Upwork (freelance)',
    period: 'Feb 2026 – Jun 2026',
    blurb:
      'My first 10 proposals were never opened. I looked at Upwork from the client\'s side, saw they read only ~15 words before choosing, rewrote my opener around their problem, and built demos before being hired. First client in May 2026: 3 jobs in 13 days.',
    coverImage: '/assets/case-studies/freelance/cover.png',
    coverIllustration: true,
    coverLabel: 'Client\'s View',
    coverGradient: 'linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)',
    stack: ['Customer Discovery', 'Proposal Writing', 'Demo-First Selling', 'Client Care'],
  },
];
