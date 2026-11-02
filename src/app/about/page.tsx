import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "How İkbal Arslan got here: from defense simulators and a large consumer platform to leading a platform team.",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about", title: "About | İkbal Arslan" },
};

/**
 * One continuous, conversational text based on the CV.
 * Deliberately anonymous: no employer, client, university or internal project
 * names, and no metrics. e2e/about.spec.ts checks that none of them appear.
 */
export default function AboutPage() {
  return (
    <>
      <header className="px-6 pt-16 md:px-10 md:pt-20">
        <p className="eyebrow">About</p>
        <h1 className="t-display mt-4">The longer version</h1>
      </header>

      <article className="prose-about px-6 pb-16 pt-6 md:px-10 md:pb-20">
        <p>
          I&apos;m a technical team lead and senior software engineer, based in the Netherlands.
          I&apos;ve been building software professionally for over eight years, and the work has
          been pretty varied. Here&apos;s the short story of how I got here.
        </p>
        <p>
          I studied computer science in Turkey. Next to the usual core of algorithms, operating
          systems, networks and databases, I took courses in software engineering and design
          patterns, and in machine learning and natural language processing. You&apos;ll find a
          few machine learning projects on my <Link href="/projects">projects page</Link> too.
        </p>
        <p>
          My first job after university was at a defense company, building hardware and software
          simulators along with web and desktop applications. Mission-critical software
          doesn&apos;t leave much room for &ldquo;it probably works&rdquo;, so we took test-driven
          development seriously: unit tests, black-box tests, even monkey testing. One of the more
          interesting problems there was getting simulators to talk to each other at the same
          time, so I designed a multi-threaded messaging architecture that did it with less
          latency, and wrote the messaging and parsing layer that made the simulators behave like
          the real units.
        </p>
        <p>
          After that I joined a team working on a large consumer-facing platform used by millions
          of people every month, and the scale changed completely. I worked on its event-driven
          microservices back-end built on Kafka, and built a chatbot that let customers open
          support tickets in a conversation, which took real work off the support agents. I also
          made heavy APIs respond faster and pages load faster, and worked on the back-end of a
          music web app.
        </p>
        <p>
          Then I moved to the Netherlands to work on platform software at a large high-tech
          company, first as a consultant. A lot of that early work was moving applications from
          on-premise Linux machines onto Kubernetes, and building internal tooling and shared
          libraries that made the code more reusable and helped new people get started faster.
          Later I joined the company directly as a senior engineer. I built developer libraries
          and templates that several teams adopted, brought useful open-source tools into our
          internal platforms, contributed to open-source projects, and automated CI/CD pipelines
          together with the DevOps and QA teams.
        </p>
        <p>
          Not long after that I was promoted to technical team lead. These days I drive the
          architecture of a microservices platform we&apos;re redesigning across the back-end
          (Java, Spring Boot, Python, Django, FastAPI) and the front-end (TypeScript, Angular),
          and I&apos;m getting it ready for the cloud with secure-by-default foundations and
          reusable templates and APIs that other teams can build on. Technology decisions happen
          together with architects, platform engineers and product owners. I also run the
          team&apos;s Agile delivery and mentor engineers on CI/CD, testing, containers and
          microservice design. I still write code across the whole stack, though.
        </p>
        <p>
          The newest part of my work is agentic AI. I&apos;m certified in it, and I&apos;ve
          integrated AI agents into our CI pipeline to review code, triage failing builds and
          generate tests, which made our code reviews noticeably faster. Optify, the first project
          on my <Link href="/projects">projects page</Link>, is an AI-powered product as well.
        </p>
        <p>
          As for tools: on the back-end I mostly reach for Java with Spring Boot, or Python with
          Django, FastAPI or Flask. On the front-end it&apos;s TypeScript with Angular or React.
          For platform work it&apos;s Docker, Kubernetes and Jenkins, and for data and messaging
          Kafka, RabbitMQ, Redis, MySQL and MongoDB, with Splunk and Grafana to keep an eye on
          things.
        </p>
        <p>
          If any of this sounds relevant to what you&apos;re working on, I&apos;d be happy to
          talk.
        </p>

        <div className="flex flex-wrap gap-3 pt-4">
          <Link href="/#contact" className="btn btn-solid">
            Get in touch
          </Link>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            LinkedIn <ArrowIcon />
          </a>
        </div>
      </article>
    </>
  );
}
