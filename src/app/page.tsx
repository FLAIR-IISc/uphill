"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import React, { RefObject, useEffect, useRef, useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { GitHubLogoIcon, EnvelopeClosedIcon, RocketIcon, ReaderIcon, ClipboardIcon } from '@radix-ui/react-icons'
import { cn } from "@/lib/utils";
import Image from "next/image";

import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
  PageSubHeading
} from "./components/page-header";

import TaskPage from "./paper";
import next from "next";
import { alignProp } from "@radix-ui/themes";

const TITLE = "Evaluating Large Language Models for Health-related Queries with Presuppositions";


const FORM_URL = "https://forms.gle/iyk5DiECGDdc9vSQA";
const PAPER_URL = "https://arxiv.org/abs/2312.08800";
const GITHUB_URL = "https://github.com/navreeetkaur/UPHILL";
const BASE_PATH = "";
const bibtexCode = `
@article{kaur2023evaluating,
    title={Evaluating Large Language Models for Health-related Queries with Presuppositions}, 
    author={Navreet Kaur and Monojit Choudhury and Danish Pruthi},
    year={2023},
    eprint={2312.08800},
    archivePrefix={arXiv},
    primaryClass={cs.CL}
}`

interface Author {
  name: string;
  role: string;
  affiliation: string;
  email?: string;
  website?: string;
  avatar?: string;
}

const AUTHORS:Author[] = [
  {"name": "Navreet Kaur", "role": "Project leads", "affiliation": "Indian Institute of Science Bangalore"},
  {"name": "Monojit Choudhury", "role": "Advisors", "affiliation": "MBZUAI"},
  {"name": "Danish Pruthi", "role": "Advisors", "affiliation": "Indian Institute of Science Bangalore"}
];

const AuthorHoverCard = (author: Author) => (
  <HoverCard openDelay={100} closeDelay={100}>
    <HoverCardTrigger className="pr-4" style={{ marginLeft: 0 }}>
      <Button className="px-0" variant="link">
        {author.name}
      </Button>
    </HoverCardTrigger>
    <HoverCardContent>
      <div className="flex justify-between">
        <Avatar className="mr-4">
          <AvatarImage src={author.avatar} />
          <AvatarFallback>{author.name[0]}</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h4 className="text-sm font-semibold">{author.name}</h4>
          <p className="text-sm">{author.affiliation}</p>
        </div>
      </div>
    </HoverCardContent>
  </HoverCard>
);


const AuthorHoverCard2 = (author: (typeof AUTHORS)[0]) => (
  <HoverCard openDelay={100} closeDelay={100}>
    <HoverCardTrigger className="">
      <Avatar className="mr-0.5 my-0.5">
          <AvatarImage src={author.avatar} />
          <AvatarFallback>{`${author.name.split(' ')[0][0]}${author.name.split(' ').pop()?.[0]}`}</AvatarFallback>
      </Avatar>
    </HoverCardTrigger>
    <HoverCardContent>
      <div className="flex justify-between">
        <div className="space-y-1">
          <h4 className="text-sm font-semibold">{author.name}</h4>
          <p className="text-sm">{author.affiliation}</p>
        </div>
      </div>
    </HoverCardContent>
  </HoverCard>
);


const Headline = () => (
  <PageHeader className="page-header pb-12 pt-4">
    <PageHeaderHeading className="tracking-tight">{TITLE}
      <div style={{fontWeight: "normal", marginTop: "20px"}}>
        <PageHeaderDescription>
          <span className="dsiiwa-link">
            <a href="https://navreeetkaur.github.io">Navreet Kaur</a><sup>1</sup><a href="mailto:navreetkaur@iisc.ac.in" className="dsiiwa-link"> <span style={{ display: 'inline-block', transform: "translateY(1px)" }}><EnvelopeClosedIcon/></span></a>, </span>
          <span className="dsiiwa-link">
            <a href="https://mbzuai.ac.ae/study/faculty/monojit-choudhury/">Monojit Choudhury</a><sup>2</sup>, </span>
          <span className="dsiiwa-link">
            <a href="https://danishpruthi.com">Danish Pruthi</a><sup>1</sup>
          </span>
        </PageHeaderDescription>
      </div>
      <div style={{fontWeight: "normal"}}>
        <PageHeaderDescription>
          <span className="author-block"><sup>1</sup>Indian Institute of Science Bangalore, </span>
          <span className="author-block"><sup>2</sup>MBZUAI</span>
        </PageHeaderDescription>
      </div>
    </PageHeaderHeading>
    {/* <Separator className="my-2" /> */}
    <section className="flex w-full items-center space-x-4 pb-1 pt-4 md:pb-1">
      <Link
        href={PAPER_URL}
        target="_blank"
        className={cn(buttonVariants({ variant: "outline" }), "rounded-[6px]")}
      >
        <ReaderIcon className="ml-0 h-4 w-4" />
        <Separator className="mx-2 h-4" orientation="vertical" />{" "}
        <span>Paper</span>
      </Link>
      <Link
        href={GITHUB_URL}
        target="_blank"
        className={cn(buttonVariants({ variant: "outline" }), "rounded-[6px]")}
      >
        <GitHubLogoIcon className="ml-0 h-4 w-4" />
        <Separator className="mx-2 h-4" orientation="vertical" />{" "}
        <span>Code</span>
      </Link>
      <Link
        href="#uphill-dataset"
        className={cn(buttonVariants({ variant: "outline" }), "rounded-[6px]")}
      >
        <RocketIcon className="ml-0 h-4 w-4" />
        <Separator className="mx-2 h-4" orientation="vertical" />{" "}
        <span>Browse Dataset</span>
      </Link>
      {/* <Link
        href="mailto:mnlee@uchicago.edu"
        className={cn(buttonVariants({ variant: "outline" }), "rounded-[6px]")}
      >
        <EnvelopeClosedIcon className="ml-0 h-4 w-4" />
        <Separator className="mx-2 h-4" orientation="vertical" />{" "}
        <span>Contact</span>
      </Link> */}
    </section>
    <Separator className="my-2" />

    <div className="pt-4 font-sans">
      <p className="pb-4"> As corporations rush to integrate large language models (LLMs) to their search offerings, it is critical that they provide factually accurate information that is robust to any presuppositions that a user may express. In this work, we introduce <span className="font-bold">UPHILL</span>, a dataset consisting of health-related queries with varying degrees of presuppositions. Using UPHILL, we evaluate the factual accuracy and consistency of InstructGPT, ChatGPT, and BingChat models. We find that while model responses rarely disagree with true health claims (posed as questions), they often fail to challenge false claims: responses from InstructGPT agree with 32% of the false claims, ChatGPT 26% and BingChat 23%. As we increase the extent of presupposition in input queries, the responses from InstructGPT and ChatGPT agree with the claim considerably more often, regardless of its veracity. Responses from BingChat, which rely on retrieved webpages, are not as susceptible. Given the moderate factual accuracy, and the inability of models to consistently correct false assumptions, our work calls for a careful assessment of current LLMs for use in high-stakes scenarios.</p>
      {/* <p className="pb-4">Welcome to our design space for intelligent and interactive writing assistants! The design space consists of five aspects: <span className="dsiiwa-task-color font-bold">task</span>, <span className="dsiiwa-user-color font-bold">user</span>, <span className="dsiiwa-technology-color font-bold">technology</span>, <span className="dsiiwa-interaction-color font-bold">interaction</span>, and <span className="dsiiwa-ecosystem-color font-bold">ecosystem</span>. Within each aspect, we define dimensions (i.e., fundamental components of an aspect) and codes (i.e., potential options for each dimension). Please refer to <a href={PAPER_URL} target="_blank" className="dsiiwa-link">our paper</a> for the detailed definitions of each dimension and code.</p>
      
      <p className="pb-4">To create this design space, we collaborated with researchers from a variety of disciplines, including Human-Computer Interaction (HCI), Natural Language Processing (NLP), Information Systems, and Education, and annotated 115 papers from HCI and NLP fields to understand the current landscape of writing assistants. We hope that our design space offers researchers and designers a practical tool to navigate, comprehend, and compare the various possibilities of writing assistants, and aid in the envisioning and design of new writing assistants.</p>

      <p className="pb-4">Our design space is a <span className="font-bold">living artifact</span>, as it will evolve over time alongside the fields. We invite the community to contribute to this artifact by adding new papers, annotations, and discussions to track future developments in this space.</p> */}
    </div>

    <div className="dsiiwa-figure pt-8">
      <Image
          src="/images/framework.png"
          width={2742}
          height={2092}
          alt="Given a health-related claim, we pose queries to the model with increasing levels of presupposition. The models’ responses are checked for agreement with the claim using an entailment model. Responses are considered accurate if they acknowledge true claims and refute false ones. We also assess if the responses are consistent."
          className="block"
      />
      <div className="pt-10" style={{fontSize: "16px"}}>
        <h3 className="has-text-centered">
        Given a health-related claim, we pose queries to the model with increasing levels of presupposition. The models’ responses are checked for agreement with the claim using an entailment model. Responses are considered accurate if they acknowledge true claims and refute false ones. We also assess if the responses are consistent.
        </h3>
      </div>
    </div>    
    
    {/* <div className="pt-8 font-sans">
      <ul className="list-disc pl-4">
        <li><span className="font-bold">Want to add your paper/writing assistant to the list?</span> Please either (i) fill out <a href={FORM_URL} target="_blank" className="form-link">this Google form <span style={{ display: 'inline-block', transform: "translateY(0.5px)" }}><ClipboardIcon /></span></a> or (ii) create a pull request in <a href={GITHUB_URL} target="_blank" className="dsiiwa-link">our GitHub repository <span style={{ display: 'inline-block', transform: "translateY(0.5px)" }}><GitHubLogoIcon /></span></a></li>
        <li><span className="font-bold">Have questions or found incorrect annotation?</span> Please email Navreet Kaur<a href="mailto:mnlee@uchicago.edu" className="dsiiwa-link"> <span style={{ display: 'inline-block', transform: "translateY(1px)" }}><EnvelopeClosedIcon/></span></a></li>
        <li><span className="font-bold">Interested in contributing to the project?</span> Please visit <a href={GITHUB_URL} target="_blank" className="dsiiwa-link">our GitHub repository <span style={{ display: 'inline-block', transform: "translateY(0.5px)" }}><GitHubLogoIcon /></span></a> and start contributing!</li>
      </ul>
    </div> */}

    {/* <div className="flex flex-wrap justify-start items-start align-start space-x-0">
      {AUTHORS.map((author, index) => (
        <React.Fragment key={index}>{AuthorHoverCard2(author)}</React.Fragment>
      ))}
    </div> */}
  </PageHeader>
);

export default function Home() {
  return (
    <div className="container min-h-screen relative px-16 pt-8 pb-16">    
      <Headline />
      <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow" id="uphill-dataset">
        <TaskPage />
      </div>

      <div className="pt-20">
        <PageSubHeading>BibTeX</PageSubHeading>
        <p className="pb-4" style={{ marginTop: "20px"}}>
          If you find our code and paper helpful, please consider citing our work:
        </p>
        <pre style={{ backgroundColor: "#f0f0f0", padding: "20px", fontSize: "14px"}}>
          <code>
          {bibtexCode}
          </code>
        </pre>
      </div>
{/* 
      <div className="pt-16">
        <p className="pb-4">
          <span className="font-bold">Authors</span>: Navreet Kaur <a href="mailto:navreetkaur@iisc.ac.in" className="dsiiwa-link"> <span style={{ display: 'inline-block', transform: "translateY(1px)" }}><EnvelopeClosedIcon/></span></a>, Monojit Choudhury, Danish Pruthi
        </p>
      </div> */}

      <div className="pt-16">
        {/* <p className="pb-4">This website is licensed under a Creative Commons Attribution-ShareAlike 4.0 International License. </p> */}
        <p className="pb-2"> We base the design of this website on <a href="https://writing-assistant.github.io/" className="dsiiwa-link">https://writing-assistant.github.io</a></p>
      </div>
    </div>
  );
}
