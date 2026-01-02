export type ProjectLink = { label: string; href: string };

export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  tech: string[];
  architecture?: {
    overview: string[];
    services: string[];
    notes?: string[];
  };
  links: ProjectLink[];
};

export const projects: Project[] = [
  {
    id: "streamvibe",
    title: "StreamVibe",
    tagline:
      "Netflix-style video streaming platform built with Spring Boot + React.",
    description:
      "A full-stack video platform focused on clean APIs, performance-friendly browsing, and a polished viewing experience. Designed to demonstrate real backend fundamentals (auth, pagination, DTOs, error handling) alongside a modern frontend.",
    highlights: [
      "Video catalog with search/filter, pagination & sorting",
      "Upload + metadata management (DTO mapping, validation, error handling)",
      "Authentication-ready architecture (JWT/roles friendly)",
      "Clean layering: Controller → Service → Repository with DTOs",
      "Performance considerations (caching candidates, streaming strategy)",
    ],
    tech: [
      "Java",
      "Spring Boot",
      "React",
      "TypeScript",
      "REST APIs",
      "PostgreSQL",
      "Docker (optional)",
    ],
    architecture: {
      overview: [
        "React frontend consumes Spring Boot REST APIs for browsing, search, and video metadata.",
        "Spring Boot serves media files from local storage via Resource endpoints (inline playback) and stores metadata in PostgreSQL.",
        "Redis is used for caching common read paths (published videos, video-by-id, videos-by-genre, top viewed).",
        "Security uses JWT + role-based authorization (admin-only upload/publish). Rate limiting is enforced across /api/** using Bucket4j.",
      ],
      services: [
        "Frontend: React (browse, player UI)",
        "API: Spring Boot (catalog/search, auth, file upload + media serving, caching)",
        "Database: PostgreSQL (videos, categories, users, reviews, watchlists, etc.)",
        "Cache: Redis (Spring Cache with JSON serialization)",
        "Media storage: Local filesystem (./uploads/videos + thumbnails + profiles)",
      ],
      notes: [
        "Media endpoints: /api/files/videos/{fileName} returns an inline Resource (simple streaming).",
        "Caching: @Cacheable for videoById/publishedVideos/videosByGenre/topViewedVideos, with evictions on create/update/delete/publish.",
        "Operations: Actuator endpoints exposed + OpenAPI/Swagger enabled for API documentation.",
        "Future enhancement: add HTTP Range support + background jobs for transcoding/thumbnails if needed.",
      ],
    },
    links: [
      { label: "GitHub (placeholder)", href: "#" },
      { label: "Architecture Notes (placeholder)", href: "#" },
      { label: "Live Demo (placeholder)", href: "#" },
    ],
  },
  {
    id: "smartcommerce",
    title: "SmartCommerce",
    tagline:
      "E-commerce platform with a voice AI assistant + recommendations via Python microservices.",
    description:
      "A full-stack e-commerce application extended with a microservice approach: Spring Boot for core commerce APIs, AI voice-enabled chatbot and Python services for AI   recommendation engine. Built to showcase distributed-system thinking and polyglot architecture.",
    highlights: [
      "Catalog, cart, and orders foundation (full-stack flow)",
      "Voice-enabled AI chatbot integrated into the product UX",
      "Recommendation engine (Python microservice) for personalized product suggestions",
      "Microservice-style separation for independent development and scaling",
      "Docker-friendly local setup (compose-ready)",
    ],
    tech: [
      "Java",
      "Spring Boot",
      "React",
      "TypeScript",
      "Python",
      "REST",
      "Oracle SQL",
      "Docker Compose",
    ],
    architecture: {
      overview: [
        "React frontend calls Spring Boot REST APIs for authentication and core commerce flows (catalog, cart, orders, reviews, profile).",
        "Spring Boot persists core data in Oracle Database (XE) and integrates external services for payments (Stripe) and transactional emails (SMTP).",
        "A Python/FastAPI recommendation microservice runs separately and is called by Spring Boot via REST at http://localhost:8001/recommend.",
        "The chatbot UX supports voice input in the frontend (speech-to-text) and sends messages to Spring Boot /api/chat, where responses are generated via OpenAI Chat Completions using user context (profile/orders) + recommendations.",
        "Optional text-to-speech is supported via Spring Boot /tts, which calls ElevenLabs to return audio for spoken replies.",
        "Real-time order status updates are delivered over WebSockets (STOMP): clients connect to /ws and subscribe to /topic/orders/{userId}.",
      ],
      services: [
        "Frontend: React (voice input via react-speech-recognition; chat UI; checkout UI)",
        "Core API: Spring Boot (Auth, Catalog, Cart, Orders, Reviews, Chat, TTS, WebSockets)",
        "Database: Oracle Database XE (jdbc:oracle:thin:@//localhost:1521/XEPDB1)",
        "Recommendation service: Python + FastAPI (POST /recommend on :8001)",
        "Payments: Stripe (backend endpoint(s) for payment intent / confirmation)",
        "Email: SMTP mail service (order confirmations/notifications)",
        "LLM: OpenAI Chat Completions (called from Spring Boot ChatService)",
        "TTS: ElevenLabs text-to-speech (called from Spring Boot /tts)",
      ],
      notes: [
        "Backend → recommender integration uses RestTemplate (synchronous REST). Add timeouts/retries + fallback (popular/trending items) for resilience.",
        "Chat endpoint is protected (uses Principal); responses can include personalized context + recommendation results.",
        "WebSockets use a simple broker (/topic) with SockJS endpoint (/ws) for near real-time order status updates.",
        "Future enhancement: introduce async events (e.g., order-created) to decouple recommendation training/analytics from the request path.",
      ],
    },
    links: [
      { label: "GitHub (placeholder)", href: "#" },
      { label: "Architecture Notes (placeholder)", href: "#" },
      { label: "Live Demo (placeholder)", href: "#" },
    ],
  },
];
