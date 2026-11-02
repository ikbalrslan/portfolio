import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "How İkbal Arslan got here: defense simulators at Aselsan, a platform for 17M monthly users at Inomera, and platform engineering and team leadership at ASML.",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about", title: "About | İkbal Arslan" },
};

/**
 * Written from the CV, as prose rather than bullet points. Keep it factual:
 * every number and claim here should be traceable to the CV.
 */
function Chapter({
  when,
  where,
  title,
  children,
}: {
  when: string;
  where: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-line lg:grid lg:grid-cols-12">
      <div className="px-6 pt-10 md:px-10 lg:col-span-3 lg:border-r lg:border-line lg:py-10">
        <p className="eyebrow">{when}</p>
        <p className="mt-2 text-sm text-muted">{where}</p>
      </div>
      <div className="min-w-0 px-6 pb-10 pt-4 md:px-10 lg:col-span-9 lg:py-10">
        <h2 className="t-sub">{title}</h2>
        <div className="prose-about mt-4">{children}</div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      <header className="px-6 py-16 md:px-10 md:py-20">
        <p className="eyebrow">About</p>
        <h1 className="t-display mt-4">The longer version</h1>
        <div className="prose-about mt-5">
          <p>
            I&apos;m a technical team lead and senior software engineer at ASML in the Netherlands.
            I&apos;ve been writing software professionally for a bit over eight years, and the
            work has been pretty varied: simulators for a defense company, a consumer platform
            used by millions of people every month, and now the platform behind Service Pack
            qualifications at ASML.
          </p>
          <p>Here&apos;s how that happened, roughly in order.</p>
        </div>
      </header>

      <Chapter when="2014 – 2018" where="Hacettepe University, Ankara" title="Where it started">
        <p>
          I studied Computer Science at Hacettepe University in Ankara. Next to the usual core of
          data structures, algorithms, operating systems, networks and databases, I took courses
          in software engineering and design patterns, and in machine learning and natural
          language processing. You&apos;ll find a few machine learning projects on my{" "}
          <Link href="/projects">projects page</Link> too.
        </p>
      </Chapter>

      <Chapter when="2018 – 2021" where="Aselsan, Ankara" title="Simulators and a lot of testing">
        <p>
          My first job after university was at Aselsan, Turkey&apos;s leading defense company. For
          three years I built hardware and software simulators, plus web and desktop
          applications, using Java, Spring Boot, Python, Flask and TypeScript.
        </p>
        <p>
          Mission-critical software doesn&apos;t leave much room for &ldquo;it probably
          works&rdquo;, so we practiced test-driven development seriously: unit tests,
          black-box tests, and even monkey testing for the critical features.
        </p>
        <p>
          One of the more interesting problems was getting simulators to talk to each other at
          the same time. I designed a multi-threaded messaging architecture in Java for that,
          which brought latency down by about 20%. I also wrote the messaging and parsing layer in
          Groovy that let the simulators behave like the real integrated units, along with tools
          for TCP socket communication.
        </p>
      </Chapter>

      <Chapter when="2021 – 2022" where="Inomera, Istanbul" title="Then the scale changed">
        <p>
          Next I joined Inomera in Istanbul, and the numbers got a lot bigger. The customer-facing
          platform I worked on had about 17.7 million users a month, which works out to roughly
          300 million visits and 470 million interactions. Behind it was an event-driven
          microservices back-end on Kafka that I helped build.
        </p>
        <p>
          A few things from that time: I built chatbot-driven ticket creation, so customers could
          open support tickets in a conversation, and it cut the telecom support agents&apos;
          workload by 25%. I optimized the APIs behind some heavy operations, which made them 23%
          faster, and I improved front-end and back-end components so pages loaded 20% faster. I
          also worked on the back-end of MUUD, a web music app built with Java and Spring Boot.
        </p>
      </Chapter>

      <Chapter
        when="2022 – today"
        where="ASML, Eindhoven"
        title="Platforms, and leading a team"
      >
        <p>
          At the end of 2022 I started at ASML in Eindhoven, first through Capgemini Engineering. A
          big part of those first two years was moving applications off on-premise Linux machines
          and onto Kubernetes, which made them more scalable and resilient. I also kept the
          platform services stable and secure, and built internal tooling and shared libraries
          that made the code more modular and helped new people get up to speed faster.
        </p>
        <p>
          In December 2024 I joined ASML directly as a senior software engineer. I designed
          internal developer libraries and templates that several teams adopted. I also looked at
          external and open-source tools, brought the useful ones into our internal platforms,
          and contributed to open-source projects. With the DevOps and QA teams I automated our
          CI/CD pipelines, so builds became more reliable, deployments faster, and security
          checks part of the process.
        </p>
        <p>
          Six months later I was promoted to technical team lead. These days I drive the
          architecture of a next-generation microservices platform for Service Pack
          qualifications, which we&apos;re redesigning with Java, Spring Boot, Python, Django and
          FastAPI on the back-end and TypeScript with Angular on the front-end. I&apos;m also
          preparing it for the move to the cloud, with secure-by-default foundations and
          reusable templates and REST APIs that other teams can build on. Big technology
          decisions get made together with system architects, platform engineers and product
          owners.
        </p>
        <p>
          I also run the team&apos;s Agile delivery: feature and sprint planning, backlog
          refinement, and keeping stakeholders in the loop. I still write code across the
          back-end, front-end and infrastructure, though. Mentoring is a big part of the job too,
          mostly around CI/CD, testing, Docker and Kubernetes, and how to design microservices
          well.
        </p>
      </Chapter>

      <Chapter when="Now" where="Agentic AI" title="Putting AI agents to work">
        <p>
          Agentic AI is the newest part of my work. I&apos;m certified in it, and at
          ASML I integrated AI agents into our CI pipeline. They review code, triage failing
          builds and generate tests, and code reviews now take 33% less time. Optify, the first
          project on my <Link href="/projects">projects page</Link>, is an AI-powered product as
          well.
        </p>
      </Chapter>

      <Chapter when="Toolbox" where="What I work with" title="The usual suspects">
        <p>
          On the back-end that&apos;s mostly Java with Spring Boot, or Python with Django, FastAPI
          or Flask. On the front-end it&apos;s TypeScript with Angular or React. For platform
          work I use Docker, Kubernetes, Jenkins and Artifactory. For data and messaging it&apos;s
          Kafka, RabbitMQ, Redis, MySQL and MongoDB, with Splunk and Grafana to see what&apos;s
          going on.
        </p>
      </Chapter>

      <section className="border-t border-line px-6 py-12 md:px-10">
        <p className="max-w-[62ch] leading-7 text-body">
          If any of this sounds relevant to what you&apos;re working on, I&apos;d be happy to
          talk.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/#contact" className="btn btn-solid">
            Get in touch
          </Link>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            LinkedIn <ArrowIcon />
          </a>
        </div>
      </section>
    </>
  );
}
