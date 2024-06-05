"use client";

import Link from "next/link";
import React from "react";

import {buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { GitHubLogoIcon, EnvelopeClosedIcon, RocketIcon, ReaderIcon, DownloadIcon } from '@radix-ui/react-icons'
import { cn } from "@/lib/utils";
import Image from "next/image";

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
  PageSubHeading
} from "./components/page-header";

import framework from "./assets/images/framework.png";
import results from "./assets/images/results.png";
import resultsfc from "./assets/images/results-fc.png";

import TaskPage from "./paper";

const TITLE = "Evaluating Large Language Models for Health-related Queries with Presuppositions";
const PAPER_URL = "https://arxiv.org/abs/2312.08800";
const GITHUB_URL = "https://github.com/navreeetkaur/UPHILL";
const DATASET_URL = "https://drive.google.com/drive/folders/13H2-dA0y8eOChwI8O1AqTJTqAr1raPXf";
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
    <section className="flex w-full items-center justify-center space-x-4 pb-1 pt-4 md:pb-1">
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
      <Link
        href={DATASET_URL}
        className={cn(buttonVariants({ variant: "outline" }), "rounded-[6px]")}
      >
        <DownloadIcon className="ml-0 h-4 w-4" />
        <Separator className="mx-2 h-4" orientation="vertical" />{" "}
        <span>Download Dataset</span>
      </Link>
    </section>
    <Separator className="my-2" />

    <div className="pt-4 font-sans">
      <div className="flex justify-center items-center">
        <PageSubHeading>What is UPHILL?</PageSubHeading>
      </div>
      <p className="pb-4" style={{marginTop: "20px", justifyContent: "center"}}>As corporations rush to integrate large language models (LLMs) to their search offerings, it is critical that they provide factually accurate information that is robust to any presuppositions that a user may express. We introduce <span className="font-bold">UPHILL</span>, 
        a benchmark for <b>U</b>nderstanding <b>P</b>ressupositions for <b>H</b>ealth-related <b>I</b>nquiries to <b>LL</b>Ms. It comprises of 9725 health-related queries with 5 different <a href="#presup-levels" className="dsiiwa-link">levels of presuppositions</a>. For each query, it includes the veracity of the (presupposed) claim, model responses and entailment predictions for agreement between model responses and the claim within the query.</p>
      <p className="pb-4" style={{justifyContent: "center"}}>We use UPHILL for <a href="#evals" className="dsiiwa-link">evaluating</a> factual accuracy and consistency of LLMs on popularly debated (and fabricated) health-related queries with presuppositions. Given a health-related claim, we pose queries to the model with increasing levels of presupposition. The models’ responses are checked for agreement with the claim using an entailment model. Responses are considered accurate if they acknowledge true claims and refute false ones. We also assess if the responses are consistent.</p>
     
    </div>

    <div className="dsiiwa-figure pt-8">
      <Image
          // src="/images/framework.png"
          src={framework}
          width={2742}
          height={2092}
          alt="Framework for evaluation"
          className="block"
      />
    </div> 
    
    <div className="pt-8 font-sans" style={{marginTop: "20px"}}>
      <div className="flex justify-center items-center" style={{marginBottom: "20px"}} id="presup-levels">
        <PageSubHeading>Levels of Presupposition</PageSubHeading>
      </div>
      <ol className="list-disc pl-4 custom-counter">
        <li><span className="font-bold">Neutral:</span> At this level, queries do not contain any assumptions. This is akin to what a curious user might pose when seeking information.</li>        
        <li><span className="font-bold">Mild Presupposition:</span> Unlike the neutral category, queries at this level are suggestive, and include a tentative belief in the claim.</li>
        <li><span className="font-bold">Unequivocal Presupposition:</span> Queries at this level include a clear and an unequivocal presupposition, and invoke scientific literature as a means to legitimize belief in the (possibly false) claim.</li>
        <li><span className="font-bold">Writing Request:</span> In addition to an unambiguous presupposition, this level introduces a request to write a report or an article (or other documents) supporting the claim, rather than merely seeking information on the topic (as in previous levels).</li>
        <li><span className="font-bold">Writing Demand:</span> At this level, queries become assertive demands for evidence-based writing, actively seeking support for the claim in the form of citations and evidence.</li>
      </ol>
    </div>

    <div className="pt-4 font-sans" style={{marginTop: "20px"}} id="evals">
      <div className="flex justify-center items-center" id="evals"> 
        <PageSubHeading>Results</PageSubHeading>
      </div>

      <p className="pb-4" style={{ marginTop: "20px", justifyContent: "center"}}>Using UPHILL, we evaluate the factual accuracy and consistency of <span className="dsiiwa-interaction-color font-bold">InstructGPT</span>, <span className="dsiiwa-user-color font-bold">ChatGPT</span>, <span className="dsiiwa-ecosystem-color font-bold">GPT-4</span> and <span className="dsiiwa-task-color font-bold">Bing Copilot</span> models. We find that while model responses rarely contradict true health claims (posed as questions), all investigated models fail to challenge false claims. Alarmingly, responses from these models agree with 23–32% of the existing false claims, and 49–55% with novel fabricated claims. <b>As we increase the extent of presupposition in input queries, responses from all models except Bing Copilot agree with the claim considerably more often, regardless of its veracity.</b> Given the moderate factual accuracy, and the inability of models to challenge false assumptions, our work calls for a careful assessment of current LLMs for use in high-stakes scenarios.</p>
      
    </div>

    <div className="dsiiwa-figure">
      <Image
          // src="/images/results.png"
          src={results}
          width={2742}
          height={2092}
          alt="Results"
          className="block"
      />
    </div> 

    <p className="pb-4 justify-center" style={{ marginTop: "20px"}}><span className="font-bold">Information Seeking vs Writing Assistance:</span> We observe 
    a marked difference in how most models respond to information-seeking requests 
    containing presuppositions (level &le; 2) compared to requests for writing assistance (level &gt; 2). When 
    the input presents a writing demand based on a false presupposition (level 4), models’ responses 
    rarely challenge that assumption. This is 
    concerning not just because malicious actors could easily produce 
    misinformation in this fashion, but model responses could also reinforce erroneous beliefs of a user. </p>

    <p className="pb-4 justify-center has-text-justified">
    <b>Evaluating on fabricated claims</b> allows us to cleanly study the effect of increasing presuppositions in input queries, 
    as models (likely) do not encode any information about these claims. We find that 
    <b> the fraction of fabricated claims that the model responses support are considerably higher 
    compared to other false claims</b>. At least 50% responses from all models 
    problematically agree with the fabricated claims, at all degrees of presuppositions. 
    Further, the 
    fraction of ChatGPT and GPT-4 responses that agree with fabricated claims increases steeply with 
    increasing presuppostions. This is interesting to note as these 
    models likely do not have any information about these claims, but are responding to the input requests 
    (which ask for misleading information). Similar to previous experiments, Bing Copilot responses seem 
    more consistent across all levels, although majority of them still agree with the fabricated claims.</p>    
    
    <div className="dsiiwa-figure"> 
      <Image
          // src="/images/results-fc.png"
          src={resultsfc}
          width={850}
          height={785}
          alt="Fabricated Claims Results"
          className="block"
      />
      <p className="text-center md:text-sm" style={{marginTop: "20px"}}>Distribution of model responses that agree, disagree and are neutral with respect to fabricated claims.</p>
    </div> 

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

      <div className="pt-16">
        <p className="pb-2"> We base the design of this website on <a href="https://writing-assistant.github.io/" className="dsiiwa-link">https://writing-assistant.github.io</a></p>
      </div>
    </div>
  );
}
