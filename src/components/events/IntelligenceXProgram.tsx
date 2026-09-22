import { useState } from "react";
import { Coffee, Utensils } from "lucide-react";

type SlotType =
  | "keynote"
  | "panel"
  | "showcase"
  | "invited"
  | "hands-on"
  | "break"
  | "lunch"
  | "ceremony"
  | "banquet"
  | "award"
  | "photo"
  | "end";

interface SpeakerEntry {
  name: string;
  /** Talk title, topic, or role, taken from the final programme. */
  detail?: string;
  /** Optional footnote rendered under the entry, e.g. a co-sponsorship note. */
  note?: string;
}

interface Track {
  /** Room, e.g. "Auditorium 1", "SR12". */
  venue?: string;
  type: SlotType;
  title: string;
  /** Chair (keynote), moderator (panel), session organiser (invited), or instructor (hands-on). */
  lead?: string;
  /** Presenters and panellists together with their talk titles, topics, or roles. */
  speakers?: SpeakerEntry[];
  note?: string;
}

interface Slot {
  time: string;
  tracks: Track[];
}

interface DayProgram {
  id: string;
  label: string;
  date: string;
  slots: Slot[];
}

// Only shown when the category isn't already spelled out in the title itself.
const categoryLabel: Partial<Record<SlotType, string>> = {
  invited: "Invited Session",
  "hands-on": "Hands-on",
};

// How the person in the "lead" field is labelled depends on the session type.
const leadLabel: Partial<Record<SlotType, string>> = {
  keynote: "Chair",
  panel: "Moderator",
  invited: "Session Organiser",
  "hands-on": "Instructor",
};

const days: DayProgram[] = [
  {
    id: "thu",
    label: "Day 1 · Thursday",
    date: "24 September 2026",
    slots: [
      { time: "08:45–09:30", tracks: [{ type: "break", title: "Breakfast & Registration" }] },
      {
        time: "09:30–09:40",
        tracks: [
          {
            venue: "Auditorium 1",
            type: "ceremony",
            title: "Opening Ceremony",
            speakers: [
              { name: "Mdm Rahayu Mahzam", detail: "Guest-of-Honour; Opening Address" },
              { name: "H.E. Alexandra Baumann", detail: "VVIP; Ambassador of Switzerland to Singapore" },
              {
                name: "Eduard Ruge",
                detail: "VVIP; Counsellor of German Embassy for Cooperation in Science, Technology and Research",
              },
            ],
          },
        ],
      },
      {
        time: "09:50–09:55",
        tracks: [
          {
            venue: "Auditorium 1",
            type: "award",
            title: "AI Algo Trading Hackathon Award Ceremony",
            speakers: [{ name: "Mdm Rahayu Mahzam; H.E. Alexandra Baumann", detail: "Award presenters" }],
          },
        ],
      },
      {
        time: "09:55–10:00",
        tracks: [
          {
            venue: "Outside",
            type: "photo",
            title: "Official Group Photograph",
            note: "Guest-of-Honour, VIPs & all participants",
          },
        ],
      },
      {
        time: "10:00–11:00",
        tracks: [
          {
            venue: "Auditorium 1",
            type: "keynote",
            title: "Keynote 1",
            lead: "Ying Chen",
            speakers: [
              { name: "Stefan Woerner, IBM Research Switzerland", detail: "Towards Practical Quantum Advantage" },
            ],
          },
        ],
      },
      {
        time: "11:00–11:30",
        tracks: [
          {
            venue: "Auditorium 1",
            type: "showcase",
            title: "Showcase 1",
            speakers: [
              {
                name: "Jeremy Woo, Senior Technical Advisor, D-Wave",
                detail:
                  "Annealing and Dual-Rail Cavity Qubit Quantum Computers: How Do Advances in Annealing and Gate-Model Quantum Computers Affect Industry?",
              },
            ],
          },
        ],
      },
      {
        time: "11:30–12:30",
        tracks: [
          {
            venue: "Auditorium 1",
            type: "panel",
            title: "Panel 1: Agentic AI and Autonomous Systems",
            lead: "Thorsten Koch",
            speakers: [
              { name: "Si Min Chan, NVIDIA" },
              { name: "Masahiro Horibe, AIST G-QuAT" },
              { name: "Dr Maggie Sou, Singapore Maritime Institute" },
            ],
            note: "Exploring autonomous AI agents that can reason, plan, collaborate, and make decisions in complex real-world environments.",
          },
        ],
      },
      { time: "12:30–13:30", tracks: [{ type: "lunch", title: "Lunch" }] },
      {
        time: "13:30–15:00",
        tracks: [
          {
            venue: "SR12",
            type: "invited",
            title: "Quantum Computing for Risk Management",
            lead: "Paolo Giudici",
            speakers: [
              {
                name: "Paolo Giudici",
                detail: "Safe AI Risk Management for Quantum AI",
                note: "This event is co-sponsored by the NUS Risk Management Institute (RMI).",
              },
              { name: "Massimiliano Ferrera", detail: "Quantum Geometric Entropic Optimization" },
              { name: "Yash Rastogi", detail: "Quantum Computing for Bayesian Risk Analysis" },
              { name: "Alessandro Bisio", detail: "Learning Quantum Transformations: Optimal Storage and Retrieval" },
            ],
          },
          {
            venue: "SR1",
            type: "invited",
            title: "Advances in Bayesian Optimization & Sequential Decision-Making",
            lead: "Ray-Bing Chen",
            speakers: [
              {
                name: "Matthias Hwai-yong Tan",
                detail:
                  "Computer Model Calibration via Bayesian Optimization Based on a Bi-Fidelity Gaussian Process Model for Transformed Sum of Squared Errors",
              },
              {
                name: "Wenjia Wang",
                detail: "SPARKLE: A Nonparametric Approach for Online Decision-Making with High-Dimensional Covariates",
              },
              {
                name: "Ping-Yang Chen",
                detail:
                  "Bayesian Optimization for Mixed-Dimensional Inputs and Functional Outputs in Heat Treatment Process of Steel Manufacturing",
              },
              {
                name: "Ray-Bing Chen",
                detail:
                  "Multi-Objective Bayesian Optimization of CPU Cooling Design with Mixed Variables Using Category Tree Gaussian Process",
              },
            ],
          },
          {
            venue: "SR2",
            type: "invited",
            title: "Exact Computation and Parallel Methods in Combinatorial Optimization",
            lead: "Koichi Fujii",
            speakers: [
              { name: "Koichi Fujii", detail: "From Computation to Proof: Experiments with QAP and Circle Graphs" },
              { name: "Hirotaka Ono", detail: "Exact Depths and Bounds for Small Selection Networks" },
              { name: "Yuji Shinano", detail: "Exploiting the Diversity of State-of-the-Art MIP Solvers in Parallel" },
              {
                name: "JingFeng Yang",
                detail: "GenAI Meets Mathematical Optimization: Lessons and Opportunities from the Gurobi Intelligence Hub",
              },
            ],
          },
          {
            venue: "SR3",
            type: "invited",
            title: "Mathematical Foundation of Quantum Computing",
            lead: "Josef Teichmann",
            speakers: [
              { name: "Hoang Vu", detail: "A Probabilistic Representation for Multi-State Discrete-Time Quantum Walks" },
              { name: "Ege Yilmaz", detail: "TBA" },
              { name: "Ariel Neufeld", detail: "TBA" },
              { name: "Josef Teichmann", detail: "A universality result in Quantum Reservoir Computing" },
            ],
          },
        ],
      },
      {
        time: "13:30–14:00",
        tracks: [
          {
            venue: "Auditorium 1",
            type: "showcase",
            title: "Showcase 2",
            speakers: [
              {
                name: "Chun-houh Chen; Hsin-Chou Yang; Yi-Ju Lee (Jean), Academia Sinica",
                detail:
                  "AI-Driven Multimodal Framework Integrating Genome-Wide Genetic Variation with Medical Imaging for High-Precision Risk Prediction and Biological Discovery in Type 2 Diabetes",
              },
            ],
          },
        ],
      },
      {
        time: "14:00–15:00",
        tracks: [
          {
            venue: "Auditorium 1",
            type: "panel",
            title: "Panel 2: Quantum × AI for Healthcare and Life Sciences",
            lead: "Patrick Chia",
            speakers: [
              { name: "Mingshi Koh, NRF" },
              { name: "Rosa So, A*STAR/NUS" },
              { name: "Tai E Shyong, NUHS/PRECISE/NUS" },
              { name: "Toh Han Chong, NCCS/Duke-NUS" },
            ],
          },
        ],
      },
      { time: "15:00–15:30", tracks: [{ type: "break", title: "Tea Break" }] },
      {
        time: "15:30–16:30",
        tracks: [
          {
            venue: "Auditorium 1",
            type: "keynote",
            title: "Keynote 2",
            lead: "Nikola Pascher",
            speakers: [
              { name: "José Ignacio Latorre, Director, Centre for Quantum Technologies", detail: "Factorization and Quantum" },
            ],
          },
        ],
      },
      {
        time: "16:30–18:00",
        tracks: [
          {
            venue: "Auditorium 1",
            type: "invited",
            title: "Challenges beyond Classical Optimization",
            lead: "Thorsten Koch",
            speakers: [
              {
                name: "Thorsten Koch",
                detail: "Fast Algorithms on Fast Computers",
                note: "This event is co-sponsored by the NUS Risk Management Institute (RMI).",
              },
              { name: "Stephanie Riedmüller", detail: "Hybrid Quantum-Classical Multi-Objective Optimization with QAOA" },
              { name: "Jianlong Lu", detail: "Beyond Hardware: Adaptive Algorithmic Control by State-Proxy Equalization" },
              { name: "Maximilian Schicker", detail: "Quantum Optimization Benchmarking Library" },
            ],
          },
          {
            venue: "SR12",
            type: "invited",
            title: "AI & Reinforcement Learning for Healthcare & Biomedical Systems",
            lead: "Xun Shen",
            speakers: [
              { name: "Xun Shen", detail: "Interaction-Limited Safe Continuous-Time RL for Dynamical Medical Treatment" },
              { name: "Xiao Hu", detail: "Unified Predictive Model Architecture with Physiological Signals (UNIPHY)" },
              {
                name: "Mehrshad Sadria",
                detail: "From Prediction to Causality: Learning Interpretable Dynamical Rules from Single-Cell Data with CLERA",
              },
            ],
          },
          {
            venue: "SR1",
            type: "invited",
            title: "Modern Methods in Statistical Modeling & Inference",
            lead: "Takayuki Shiohama",
            speakers: [
              { name: "Takato Hashino", detail: "Estimating the Shannon Entropy Using the Pitman–Yor Process" },
              { name: "Kohei Kawamoto", detail: "High-Dimensional Theory of PCA Connectivity Analysis for Three-Group Mixtures" },
              {
                name: "Tomoaki Imoto",
                detail: "Proposition of New Toroidal Distribution: Bivariate Extended Wrapped Cauchy Distribution",
              },
              {
                name: "Junichi Hirukawa",
                detail: "The Second-Order Generalization of Hájek–Le Cam Asymptotic Minimax Theorem",
              },
            ],
          },
          {
            venue: "SR2",
            type: "invited",
            title: "Industrial Deployment of AI: From Algorithmic Innovation to Production Realities",
            lead: "Dennis Thumm",
            speakers: [
              {
                name: "Kenneth See",
                detail:
                  "Responsible Adoption in Financial Services — scaling AI through initiatives including PathFin.ai and BuildFin.ai, with safeguards for agentic AI through MindForge and SAFR",
              },
              {
                name: "Marvin Carl May",
                detail:
                  "Precision Control in Advanced Manufacturing — uncertainty-aware machine learning for strict time constraints and operational complexities on semiconductor fab floors",
              },
              {
                name: "Hsing Sung Tsai",
                detail:
                  "Actionable Causal AI — moving from causal discovery towards operational deployment in enterprise environments",
              },
              { name: "Maris T. Lasco", detail: "AI-Enhanced Pedagogy: Creating Contextualized Lessons for Diverse Learners" },
            ],
          },
          {
            venue: "SR3",
            type: "invited",
            title: "Advances in Quantum Computing and AI Applications",
            lead: "Ralf Borndörfer",
            speakers: [
              {
                name: "Moxuan Yang",
                detail:
                  "Slack-Variable and Pairwise-Conflict QUBO Formulations for Combinatorial Auctions: Equivalence Verification, Energy-Landscape Analysis, and Annealing-Oriented Experimental Validation",
              },
              {
                name: "Mrinal Kanti Giri",
                detail: "Digital Quantum Simulation of Flat-Band and All-Bands-Flat Dynamics for Tunable Quantum Transport",
              },
              { name: "Yuting Zhu", detail: "Generative Search: Evidence from a Large-Scale Field Experiment" },
              {
                name: "Gloria Wu",
                detail: "Agentic AI for Personalized Digital Health: Applications in Nutrition and Post-Stroke Care",
              },
            ],
          },
          {
            venue: "SR4",
            type: "invited",
            title: "Quantum Computing towards Finance and ML Applications",
            lead: "Patrick Rebentrost",
            speakers: [
              { name: "Dong-Ling Deng (Tsinghua)", detail: "Quantum Artificial Intelligence: The Endless Frontier" },
              {
                name: "Daiqin Su (Hong Kong Polytechnic University)",
                detail:
                  "Constructing non-Gaussian resource states and quantum error correcting codes for building fault-tolerant photonic quantum computers",
              },
              {
                name: "Wei Wang (Hong Kong Polytechnic University)",
                detail:
                  "Leveraging Loss Tolerance in Photonic Quantum Microprocessors for Large-Scale Combinatorial Optimization",
              },
              {
                name: "Patrick Rebentrost group/Naixu Guo",
                detail: "Quantum computing for derivative pricing/AI for designing quantum algorithms.",
              },
            ],
          },
        ],
      },
      { time: "18:00", tracks: [{ type: "end", title: "End of Day 1" }] },
    ],
  },
  {
    id: "fri",
    label: "Day 2 · Friday",
    date: "25 September 2026",
    slots: [
      {
        time: "09:30–10:30",
        tracks: [
          {
            venue: "Auditorium 1",
            type: "keynote",
            title: "Keynote 3",
            lead: "Thorsten Koch",
            speakers: [
              {
                name: "Simon See, NVIDIA",
                detail: "From Language to Reality: The Road from Foundation Models to World Models and Quantum Computing",
              },
            ],
          },
        ],
      },
      { time: "10:30–11:00", tracks: [{ type: "break", title: "Tea Break" }] },
      {
        time: "11:00–12:30",
        tracks: [
          {
            venue: "SR12",
            type: "invited",
            title: "Advanced Optimization, Vision & LLMs",
            lead: "Katsuki Fujisawa",
            speakers: [
              {
                name: "Katsuki Fujisawa",
                detail:
                  "Intelligent Manufacturing and Mobility Optimization: Integrating Deep Learning, LLMs, and Quantum Computing",
              },
              {
                name: "Yoshihiko Fujisawa",
                detail:
                  "More Than Bits: Multi-Envelope Double Binary Factorization for Extreme Quantization of Large Language Models",
              },
              {
                name: "Ken Kawano",
                detail: "Localization-Confidence-Aware Pseudo-Label Selection for Semi-Supervised Object Detection",
              },
            ],
          },
          {
            venue: "SR1",
            type: "invited",
            title: "Reservoir Computing & Dynamics Learning",
            lead: "Juan-Pablo Ortega & Florian Rossmannek",
            speakers: [
              {
                name: "Thiparat Chotibut",
                detail: "Roles of Scrambling and Noise in Information Processing with Quantum Systems",
              },
              { name: "Tomoyuki Kubota", detail: "Utilizing Quantum Noise for Temporal Information Processing" },
              { name: "Jianyu Hu", detail: "Kernel Learning of PDE Solution Operators" },
              { name: "Florian Rossmannek", detail: "State-Space and State-Affine Systems for Learning from Temporal Data" },
            ],
          },
          {
            venue: "SR2",
            type: "invited",
            title: "Reliable & Adaptive AI",
            lead: "Chuan-Ju Wang",
            speakers: [
              {
                name: "Chuan-Ju Wang",
                detail:
                  "Numerically Aware and Reliable Language Understanding: Toward Trustworthy AI for Financial Intelligence",
              },
              { name: "Hen-Hsen Huang", detail: "Trustworthy Local LLMs: Building Under Data, Resource, and Supervision Constraints" },
              {
                name: "Yun-Hsuan Lien",
                detail: "Adaptive and Reliable Reinforcement Learning: Toward Human-Centered Embodied Intelligence",
              },
              {
                name: "Yu-Hsi Chen; Wei-Hsin Chen",
                detail:
                  "Deep Learning-Based Analysis of Spontaneous Behavior Enables Early Detection of Alzheimer's Disease in Mouse Models",
              },
            ],
          },
          {
            venue: "SR3",
            type: "invited",
            title: "Statistical & Network Modeling of Knowledge Discovery and Scientific Systems",
            lead: "Frederick Kin Hing Phoa",
            speakers: [
              { name: "Wen Han Gao", detail: "Innovation Value Discrepancy: Impact on Short-Term Gains and Sustainable Growth" },
              {
                name: "Tzu-Yin Chen",
                detail:
                  "Modeling Academic Collaboration Networks Using Hypergraph Theory: A Large-Scale Scientometric Analysis of Scopus Data",
              },
              { name: "Yuji Mizukami", detail: "TBA" },
              {
                name: "Frederick Kin Hing Phoa",
                detail:
                  "Mapping Citation Tendencies among Broad Subject Groups: Closed Fields, Asymmetric Exchange, Unexpected Ties and Structural Disconnection",
              },
            ],
          },
          {
            venue: "SR4",
            type: "invited",
            title: "Trustworthy Machine Learning with Applications",
            lead: "Henry Horng-Shing Lu",
            speakers: [
              { name: "Grace Hyun J. Kim", detail: "Deep Learning-Based Fibrosis Scoring from High Resolution Computed Tomography" },
              {
                name: "Guan-Ju Peng",
                detail:
                  "From Predictions to Executable Portfolios: Sparse Signals, Adaptive Support, and Reliability-Weighted Policy Composition",
              },
              {
                name: "Kani Chen",
                detail:
                  "Quantifying Fidelity in Agentic AI: Statistical Foundations of Personality Alignment and Demographic Inference",
              },
              { name: "Henry Horng-Shing Lu", detail: "Test-Fairness Deep Learning with Influence Score" },
            ],
          },
        ],
      },
      {
        time: "11:00–11:30",
        tracks: [
          {
            venue: "Auditorium 1",
            type: "showcase",
            title: "Showcase 3",
            speakers: [
              {
                name: "Matthias W. Uhl, Managing Director, UBS Asset Management",
                detail: "AI in the Investment Process of a Global Asset Manager",
              },
            ],
          },
        ],
      },
      {
        time: "11:30–12:30",
        tracks: [
          {
            venue: "Auditorium 1",
            type: "panel",
            title: "Panel 3: Quantum × AI for Finance and Risk",
            lead: "Paolo Giudici",
            speakers: [
              { name: "Huaxing Chen, UOB/NUS" },
              { name: "Matthias W. Uhl, UBS" },
              { name: "Stefan Woerner, IBM Research Europe – Zurich" },
            ],
          },
        ],
      },
      { time: "12:30–13:30", tracks: [{ type: "lunch", title: "Lunch" }] },
      {
        time: "13:30–15:00",
        tracks: [
          { venue: "SR12", type: "hands-on", title: "Hands-on 1: Agentic AI Coding", lead: "Thorsten Koch", note: "Part I" },
          { venue: "SR1", type: "hands-on", title: "Hands-on 2: Quantum Computing", lead: "Vishal Bajpe", note: "Part I" },
        ],
      },
      { time: "15:00–15:30", tracks: [{ type: "break", title: "Tea Break" }] },
      {
        time: "15:30–17:00",
        tracks: [
          { venue: "SR12", type: "hands-on", title: "Hands-on 1: Agentic AI Coding", lead: "Thorsten Koch", note: "Part II" },
          { venue: "SR1", type: "hands-on", title: "Hands-on 2: Quantum Computing", lead: "Vishal Bajpe", note: "Part II" },
        ],
      },
      { time: "17:00", tracks: [{ type: "end", title: "End of Day 2" }] },
      {
        time: "19:00–21:00",
        tracks: [{ type: "banquet", title: "Banquet" }],
      },
    ],
  },
  {
    id: "sat",
    label: "Day 3 · Saturday",
    date: "26 September 2026",
    slots: [
      {
        time: "09:30–10:30",
        tracks: [
          {
            venue: "Auditorium 1",
            type: "keynote",
            title: "Keynote 4",
            lead: "Katsuki Fujisawa",
            speakers: [
              {
                name: "Mitsuhisa Sato, RIKEN Center for Computational Science",
                detail: "JHPC Quantum Platform and Applications for Utility-Scale Quantum–HPC Hybrid Computing",
              },
            ],
          },
        ],
      },
      { time: "10:30–11:00", tracks: [{ type: "break", title: "Tea Break" }] },
      {
        time: "11:00–12:30",
        tracks: [
          {
            venue: "SR12",
            type: "invited",
            title: "Quantum Computing for Engineering",
            lead: "Philippe Codognet & Francisco Chinesta",
            speakers: [
              {
                name: "Antonio Falco",
                detail: "Encoding Complexity in Quantum Amplitude Estimation for Engineering Numerical Integration",
              },
              { name: "Kenjiro Terada", detail: "Quantum Algorithm for Structural Vibration Analysis" },
              { name: "Frédéric Barbaresco", detail: "Quantum Computing for Radar Engineering" },
              { name: "Eloi Gravot", detail: "Quantum Annealing for Optimal Monitoring Placement on Transmission Grids" },
            ],
          },
          {
            venue: "SR1",
            type: "invited",
            title: "AI & Data-Driven Methods for Quantitative Finance",
            lead: "Qinxin Yan",
            speakers: [
              {
                name: "Nan Chen",
                detail:
                  "Belief-Augmented Two-Timescale Learning (BATTLE) Algorithm in General-Sum Stochastic Games: Convergence, Equilibrium Selection, and Algorithmic Collusion",
              },
              { name: "Binnan Wang", detail: "Tradable Itô Signatures: A Model-Free, Interpretable Framework for Dynamic Hedging" },
              {
                name: "Xiang Yu",
                detail: "Deterministic Policy Gradient for Learning Equilibrium in Time-Inconsistent Control Problems",
              },
              { name: "Qinxin Yan", detail: "Sparse Index Tracking with Portfolio Compression and Path Signatures" },
            ],
          },
          {
            venue: "SR2",
            type: "invited",
            title: "Theoretical & Algorithmic Frontiers in Hybrid Quantum–AI Systems",
            lead: "Hongrui Zhang",
            speakers: [
              { name: "Hongrui Zhang", detail: "Q-Edge: Symmetry-Reduced Quantum Simulation of Structured Extreme Dependence" },
              { name: "Jayne Thompson", detail: "Error mitigation for midcircuit measurement and feedforward" },
              { name: "Paul Gregory", detail: "Transport supervision of a time-conditioned circuit Born machine" },
            ],
          },
          {
            venue: "SR3",
            type: "invited",
            title: "Logistics",
            lead: "Ralf Borndörfer",
            speakers: [
              { name: "Ralf Borndörfer", detail: "Predictive Resource Allocation of Aircraft and Trains" },
              { name: "Boris Grimm", detail: "Passenger-Based Intermodal Connection Optimization with Elastic Demands" },
              { name: "Peng Liu", detail: "Differentiable Scenario Optimization for Multi-Period Portfolio Construction" },
              {
                name: "Annika Buchholz",
                detail:
                  "Risk-Aware Unit Commitment: Coupling Bayesian Demand Forecasts with Chance-Constrained and CVaR Optimization",
              },
            ],
          },
        ],
      },
      {
        time: "11:00–11:30",
        tracks: [
          {
            venue: "Auditorium 1",
            type: "showcase",
            title: "Showcase 4",
            speakers: [
              {
                name: "Dr Hsiao-ju (Rita) Cheng, Future Health Technologies, Singapore-ETH Centre",
                detail: "From Sensor Streams to Therapy Decisions: The AI Opportunity in Post-Stroke Recovery",
              },
            ],
          },
        ],
      },
      {
        time: "11:30–12:30",
        tracks: [
          {
            venue: "Auditorium 1",
            type: "panel",
            title: "Panel 4: Research, Education, and Talent for the Intelligence Era",
            lead: "Ying Chen",
            speakers: [
              { name: "Andy Choi, IMDA" },
              { name: "Xin Guo, UC Berkeley" },
              { name: "José Ignacio Latorre, CQT" },
            ],
          },
        ],
      },
      { time: "12:30–13:30", tracks: [{ type: "lunch", title: "Lunch" }] },
      {
        time: "13:30–15:00",
        tracks: [
          {
            venue: "Auditorium 1",
            type: "invited",
            title: "AI for Energy and Finance",
            lead: "Stefan Lessmann",
            speakers: [
              { name: "Daniel Traian Pele", detail: "One Shift, Two Roles: Diagnosing and Recalibrating Tail Risk Forecasts" },
              {
                name: "Hoa Thi Nguyen",
                detail:
                  "Robustness in Sequential Decision Making under Evolving Uncertainty: Evidence from High-Frequency Market Making",
              },
              {
                name: "Vincent Gurgul",
                detail: "Multi-Objective Divergent Reinforcement Learning for Climate-Conscious Asset Allocation",
              },
              {
                name: "Stefan Lessmann",
                detail: "Tabular Foundation Models for Credit Risk Prediction: A Dedicated Review and Empirical Comparison",
              },
            ],
          },
          {
            venue: "SR12",
            type: "invited",
            title:
              "Statistics for the AI Era: Reliable Prediction, Responsible Decisions, and Human-Centered Applications",
            lead: "Paulo Canas Rodrigues",
            speakers: [
              {
                name: "Paulo Canas Rodrigues",
                detail: "Why AI Still Needs Statistics: Inference, Uncertainty, and Trust in Modern Learning Systems",
              },
              {
                name: "Dedy Dwi Prastyo",
                detail: "Modified LASSO-Based ERNN with MIDAS for Mixed-Frequency Time Series Forecasting",
              },
              {
                name: "Jayrold P. Arcede",
                detail:
                  "When AUC Misleads: Constraint Design and Loss-Level Imbalance Correction in Physics-Informed Rare-Event Prediction",
              },
              {
                name: "Merliza F. Libao",
                detail:
                  "An Interdisciplinary Human–AI Collaborative Decision Framework for Responsible Human-AI Collaborative Decision Making",
              },
            ],
          },
          {
            venue: "SR1",
            type: "invited",
            title: "Reinforcement Learning, Security & Autonomous Decision-Making",
            lead: "Lei Zhou",
            speakers: [
              {
                name: "Anand Singh",
                detail: "Reward-Agnostic Stealthy Attacks on Reinforcement Learning via KL-Constrained Adversarial Policies",
              },
              { name: "Lei Zhou", detail: "Learning Optimal Call Policies for Corporate Bonds via Reinforcement Learning" },
              { name: "Naoshi Mihoichi", detail: "Vehicle Distance Estimation in Non-Line-of-Sight Scenarios" },
              { name: "Barbara Tarantino", detail: "Beyond Accuracy: Metrics for High-Dimensional AI Outputs" },
            ],
          },
          {
            venue: "SR2",
            type: "invited",
            title: "Data Science, AI & Official Statistics",
            lead: "Osuolale Popoola",
            speakers: [
              {
                name: "Osuolale Peter Popoola",
                detail: "The New Data Eco-System and Official Statistics – The General Overview",
              },
              {
                name: "Diana Dilshanie Deepawansa",
                detail: "Integrating Data Science and AI Culture for Official Statistics",
              },
              { name: "Elisabetta Carfagna", detail: "Effective Strategies and Skills for AI in Official Statistics" },
              {
                name: "Lukas Voss",
                detail:
                  "From Forecast Accuracy to Battery Revenue: Zero-Shot Foundation Models for Day-Ahead and Reserve Markets",
              },
            ],
          },
          {
            venue: "SR3",
            type: "invited",
            title: "AI for Healthcare",
            lead: "Guan Wang",
            speakers: [
              { name: "Xin Guo", detail: "Machine Learning for Early Cancer Detection via DNA Methylation" },
              { name: "Guan Wang", detail: "Meta-RSI: An Agentic AI Framework for Healthcare" },
              { name: "Yongqi Zhou", detail: "Safe Continuous-Time Reinforcement Learning under Limited Interactions" },
              { name: "Grace He", detail: "Signature Approach for Contextual Bandits with Nonlinear and Path-dependent Rewards" },
            ],
          },
        ],
      },
      { time: "15:00–15:30", tracks: [{ type: "break", title: "Tea Break" }] },
      {
        time: "15:30–16:30",
        tracks: [
          {
            venue: "Auditorium 1",
            type: "keynote",
            title: "Keynote 5",
            lead: "Stefan Lessmann",
            speakers: [
              {
                name: "Xin Guo, UC Berkeley",
                detail: "Signature-based Time Series Statistical Analysis",
                note: "This event is co-sponsored by the NUS Risk Management Institute (RMI).",
              },
            ],
          },
        ],
      },
      {
        time: "16:30–17:30",
        tracks: [
          {
            venue: "Auditorium 1",
            type: "panel",
            title: "Panel 5: The Future of Quantum × AI",
            lead: "Philippe Codognet",
            speakers: [
              { name: "Shaukat Ali, Simula Research Laboratory" },
              { name: "Tadashi Kadowaki, AIST G-QuAT / DENSO" },
              { name: "Hoong Chuin Lau, SMU" },
              { name: "Jeremy Woo, D-Wave" },
            ],
          },
        ],
      },
      {
        time: "17:30–18:00",
        tracks: [{ venue: "Auditorium 1", type: "ceremony", title: "Closing Ceremony" }],
      },
      { time: "18:00", tracks: [{ type: "end", title: "End of Day 3" }] },
    ],
  },
];

function TrackDetails({ track, compact }: { track: Track; compact?: boolean }) {
  const label = categoryLabel[track.type];
  const leadPrefix = leadLabel[track.type];
  return (
    <div className="min-w-0">
      {track.venue && (
        <p className="mb-0.5 text-[11px] font-medium uppercase tracking-wide text-gray-400">{track.venue}</p>
      )}
      {label && <p className="mb-0.5 text-[11px] font-medium uppercase tracking-wide text-gray-400">{label}</p>}
      <p className={compact ? "text-sm font-semibold text-gray-900" : "text-base font-semibold text-gray-900"}>
        {track.title}
        {track.type === "banquet" && (
          <span className="ml-1.5 text-xs font-medium text-[#ee7c01]">By invitation only</span>
        )}
      </p>
      {track.lead && (
        <p className="text-sm text-gray-500">
          {leadPrefix ? `${leadPrefix}: ` : ""}
          {track.lead}
        </p>
      )}
      {track.speakers &&
        (track.type === "panel" ? (
          <p className="text-sm leading-snug text-gray-500">
            <span className="font-medium text-gray-700">Panelists: </span>
            {track.speakers.map((speaker) => speaker.name).join("; ")}
          </p>
        ) : (
          <ul className="space-y-0.5">
            {track.speakers.map((speaker, index) => (
              <li key={index} className="text-sm leading-snug text-gray-500">
                <span className="font-medium text-gray-700">{speaker.name}</span>
                {speaker.detail ? <> — {speaker.detail}</> : null}
                {speaker.note && (
                  <span className="mt-0.5 block text-xs leading-snug text-gray-500">
                    <span className="font-semibold text-[#ee7c01]">*</span> {speaker.note}
                  </span>
                )}
              </li>
            ))}
          </ul>
        ))}
      {track.note && <p className="text-sm leading-snug text-gray-500">{track.note}</p>}
    </div>
  );
}

function SlotRow({ slot }: { slot: Slot }) {
  const single = slot.tracks.length === 1 ? slot.tracks[0] : null;

  if (single && (single.type === "break" || single.type === "lunch" || single.type === "end")) {
    const Icon = single.type === "lunch" ? Utensils : single.type === "break" ? Coffee : null;
    return (
      <div className="flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium text-gray-400">
        {Icon && <Icon className="h-3.5 w-3.5" />}
        <span>{slot.time}</span>
        <span className="text-gray-300">·</span>
        <span>{single.title}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 py-4 sm:flex-row sm:gap-6">
      <div className="shrink-0 pt-0.5 sm:w-24">
        <span className="text-sm font-bold tabular-nums text-[#003d7b]">{slot.time}</span>
      </div>
      {single ? (
        <TrackDetails track={single} />
      ) : (
        <div className="grid flex-1 gap-px overflow-hidden rounded-lg border border-gray-200 bg-gray-200 sm:grid-cols-2 lg:grid-cols-3">
          {slot.tracks.map((t, i) => (
            <div key={i} className="bg-white p-3">
              <TrackDetails track={t} compact />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function IntelligenceXProgram() {
  const [activeDay, setActiveDay] = useState(days[0].id);
  const day = days.find((d) => d.id === activeDay) ?? days[0];

  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      <div className="flex flex-col gap-3 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {days.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setActiveDay(d.id)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                activeDay === d.id
                  ? "bg-[#003d7b] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
        <p className="text-xs font-medium text-gray-400">{day.date} · Singapore Time (SGT)</p>
      </div>

      <div className="divide-y divide-gray-100 px-5">
        {day.slots.map((slot, i) => (
          <SlotRow key={i} slot={slot} />
        ))}
      </div>

      <div className="flex flex-col items-start gap-1 border-t border-gray-100 px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-gray-400">
          Final programme as of 21 September 2026. All sessions at UTown, NUS.
        </p>
        <a
          href="/events/Program.xlsx"
          target="_blank"
          rel="noreferrer"
          className="shrink-0 text-xs font-semibold text-[#003d7b] hover:underline"
        >
          Download full schedule (.xlsx)
        </a>
      </div>
    </div>
  );
}
