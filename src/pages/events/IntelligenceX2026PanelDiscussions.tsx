import { Link } from "react-router-dom";
import intelligenceXBg from "@/assets/IntelligenceX/IntelligenceX_bg.jpg";
import masahiroImg from "@/assets/IntelligenceX/masahiro.png";
import huaxingImg from "@/assets/IntelligenceX/huaxing.jpg";
import uhlImg from "@/assets/IntelligenceX/Uhl_Matthias_Portrait.png";
import stefanImg from "@/assets/IntelligenceX/stefan.jpeg";
import jeremyImg from "@/assets/IntelligenceX/jeremy.jpeg";
import tadashiImg from "@/assets/IntelligenceX/tadashi.jpg";
import shaukatImg from "@/assets/IntelligenceX/shaukat.jpg";
import hoongImg from "@/assets/IntelligenceX/hoong.jpg";
import mingshiImg from "@/assets/IntelligenceX/mingshi.jpg";
import taiImg from "@/assets/IntelligenceX/tai.png";
import tohImg from "@/assets/IntelligenceX/toh.png";
import { ExpandableBio } from "@/components/ui/ExpandableBio";

type Panel = {
  id: string;
  title: string;
  theme: string;
  /** Confirmed session slot, e.g. "24 September 2026 · 11:30 AM–12:30 PM". */
  schedule?: string;
};

type Moderator = {
  name: string;
  affiliation: string;
  panelTitle: string;
  photo?: string;
  bio?: string;
};

type Panelist = {
  name: string;
  designation: string;
  affiliation: string;
  photo?: string;
  bio: string;
  weblink?: string;
  panelTitle: string;
};

const panels: Panel[] = [
  {
    id: "future-quantum-ai",
    title: "The Future of Quantum × AI",
    schedule: "26 September 2026 · 4:30–5:30 PM",
    theme:
      "Shaping the next decade of intelligent computing through the convergence of quantum technologies and artificial intelligence.",
  },
  {
    id: "agentic-ai",
    title: "Agentic AI and Autonomous Systems",
    schedule: "24 September 2026 · 11:30 AM–12:30 PM",
    theme:
      "Exploring autonomous AI agents that can reason, plan, collaborate, and make decisions in complex real-world environments.",
  },
  {
    id: "healthcare-life-sciences",
    title: "Quantum × AI for Healthcare and Life Sciences",
    schedule: "24 September 2026 · 1:30–2:30 PM",
    theme:
      "Transforming healthcare through AI and quantum-enabled advances in diagnosis, drug discovery, precision medicine, clinical decision support, and healthcare operations.",
  },
  {
    id: "finance-risk",
    title: "Quantum × AI for Finance and Risk",
    schedule: "25 September 2026 · 11:30 AM–12:30 PM",
    theme:
      "Harnessing AI and quantum computing to advance portfolio optimization, risk management, forecasting, trading, cybersecurity, and financial decision intelligence.",
  },
  {
    id: "education-talent",
    title: "Research, Education, and Talent for the Intelligence Era",
    schedule: "26 September 2026 · 11:30 AM–12:30 PM",
    theme:
      "Preparing the next generation of researchers, professionals, and leaders through interdisciplinary education, lifelong learning, and new models of collaboration in the age of AI and quantum technologies.",
  },
  {
    id: "quantum-advantage",
    title: "The Quantum Advantage and Quantum Supremacy: Myth or Reality?",
    theme:
      "Separating scientific breakthroughs from hype by examining where quantum computing is delivering measurable value today and what remains to be achieved before large-scale practical impact.",
  },
];

const moderators: Moderator[] = [
  {
    name: "Ying Chen",
    affiliation: "National University of Singapore, Singapore",
    panelTitle: "Research, Education, and Talent for the Intelligence Era",
    photo: "/leadership/chenying.jpg",
  },
  {
    name: "Patrick Chia",
    affiliation: "National University Health System, Singapore",
    panelTitle: "Quantum × AI for Healthcare and Life Sciences",
    bio: "Dr. Patrick Chia is Director of the Data Insights Unit at NUHS and Assistant Group Chief Medical Informatics Officer, bringing experience across healthcare data, AI, clinical informatics and translation.",
  },
  {
    name: "Philippe Codognet",
    affiliation: "CNRS / Sorbonne University / University of Tokyo, France",
    panelTitle: "The Future of Quantum × AI",
    bio: "Prof. Philippe Codognet brings extensive experience across AI, constraint programming, optimization and quantum computing. He is Professor at Sorbonne University and Co-Director of the Japanese-French Laboratory for Informatics (JFLI).",
  },
  {
    name: "Paolo Giudici",
    affiliation: "University of Pavia, Italy",
    panelTitle: "Quantum × AI for Finance and Risk",
    photo: "/leadership/Giudici.jpg",
    bio: "Prof. Paolo Stefano Giudici is Full Professor of Statistics at the University of Pavia and Director of the SAFE-AI Laboratory. His research focuses on statistical learning, financial technologies, risk management, and safe and trustworthy AI.",
  },
  {
    name: "Thorsten Koch",
    affiliation: "Zuse Institute Berlin & TU Berlin, Germany",
    panelTitle: "Agentic AI and Autonomous Systems",
    photo: "/leadership/Thorsten.png",
    bio: "Prof. Dr. Thorsten Koch is Professor for Software and Algorithms for Discrete Optimization at TU Berlin and heads the Applied Algorithmic Intelligence Methods and Digital Data and Information departments at the Zuse Institute Berlin (ZIB). His current work focuses on high-performance methods for large-scale structured optimization using multi-core CPUs, GPUs and quantum computing.",
  },
];

const panelists: Panelist[] = [
  {
    name: "Shaukat Ali",
    designation: "Chief Research Scientist",
    affiliation: "Simula Research Laboratory, Norway",
    photo: shaukatImg,
    bio: "Shaukat Ali is a Chief Research Scientist, Research Professor, and Head of Department at Simula Research Laboratory in Oslo, Norway. He is the director of the Norwegian Quantum Software Center. His research focuses on developing advanced methods for engineering cyber-physical systems using artificial intelligence, digital twins, and quantum computing. He has led numerous national and European research projects in software testing, search-based software engineering, model-based systems engineering, and quantum software engineering. Dr. Ali is a co-founder of several key initiatives in the emerging field of quantum software, including the International Workshop on Quantum Software Engineering (held at ICSE), the International Conference on Quantum Software, and the QC+AI Workshop (held at AAAI). He also represents Simula in multiple national and international quantum computing research and industry networks.",
    weblink: "https://www.simula.no/people/shaukat",
    panelTitle: "The Future of Quantum × AI",
  },
  {
    name: "Huaxing Chen",
    designation: "Group Executive Director, Data Analytics, UOB Wholesale Bank",
    affiliation: "United Overseas Bank; Adjunct Faculty, National University of Singapore (NUS)",
    photo: huaxingImg,
    bio: "Huaxing Chen is a senior data analytics and AI leader with extensive experience applying quantitative methods, advanced analytics, machine learning and artificial intelligence to complex financial and business problems. He currently leads data and analytics initiatives in a regional bank wholesale division across areas including client analytics, risk, transaction banking, financial markets and AI-enabled decision support. His career has spanned a diverse range of industries and institutions. Earlier in his career, he worked with the SMU–Carnegie Mellon University Living Analytics Research Centre, focusing on applied optimisation and analytics research, before taking on analytics and revenue optimisation roles with organisations including Marina Bay Sands and Visa, where he worked extensively with large-scale customer, transaction and commercial data. His experience has also included technology, operations research and entrepreneurial leadership roles in quantitative trading before moving into wholesale banking. Alongside his industry career, Huaxing has been an Adjunct Faculty member at the National University of Singapore (NUS) Business School since 2018, teaching postgraduate students in analytics and data engineering with applications in financial services. He is also a regular speaker and panel participant at universities, industry conferences and professional forums, sharing perspectives on quantitative analytics, AI, data and the transformation of financial services. His interests lie at the intersection of artificial intelligence, optimisation and real-world financial decision-making, particularly in translating rigorous quantitative research and emerging technologies into scalable business impact.",
    panelTitle: "Quantum × AI for Finance and Risk",
  },
  {
    name: "Xin Guo",
    designation: "Professor and Chair, Department of Industrial Engineering & Operations Research",
    affiliation: "Coleman Fung Chair in Financial Modeling, University of California, Berkeley, USA",
    photo: "/leadership/xinguo.jpg",
    bio: "Prof. Xin Guo, University of California, Berkeley, is Professor and Chair of the Department of Industrial Engineering & Operations Research and Coleman Fung Chair in Financial Modeling. Her research spans stochastic control and games, machine learning, risk analytics, and applications across finance, healthcare and large-scale systems.",
    panelTitle: "Research, Education, and Talent for the Intelligence Era",
  },
  {
    name: "Masahiro Horibe",
    designation: "Deputy Director / Executive Chief, G-QuAT",
    affiliation: "National Institute of Advanced Industrial Science and Technology (AIST), Japan",
    photo: masahiroImg,
    bio: "Masahiro Horibe is Deputy Director of the Global Research and Development Center for Business by Quantum-AI Technology (G-QuAT) at the National Institute of Advanced Industrial Science and Technology (AIST), Japan. He leads initiatives in quantum technology strategy, international collaboration, and ecosystem development, fostering partnerships among industry, academia, and government. His work focuses on accelerating the commercialization and societal implementation of quantum technologies through global cooperation, innovation programs, and industry-driven research collaborations.",
    weblink: "https://jp.linkedin.com/in/masahiro-horibe-52604b3a",
    panelTitle: "Agentic AI and Autonomous Systems",
  },
  {
    name: "Tadashi Kadowaki",
    designation: "Joint Appointment Fellow, AIST G-QuAT; Project General Manager",
    affiliation: "DENSO Corporation, Japan",
    photo: tadashiImg,
    bio: "Tadashi Kadowaki is a Joint Appointment Fellow at AIST G-QuAT and leads quantum computing initiatives at DENSO Corporation. One of the pioneers of quantum annealing, his work spans quantum computing, artificial intelligence and AI-driven scientific discovery (AI4Science). His current interests focus on the convergence of Quantum and AI, including generative AI for scientific and engineering workflows and quantum technologies for optimization and advanced design. He works to bridge cutting-edge research and real-world industrial innovation.",
    weblink: "https://unit.aist.go.jp/g-quat/en/groups/qat.html",
    panelTitle: "The Future of Quantum × AI",
  },
  {
    name: "Mingshi Koh",
    designation: "Executive Director, RIE TRUST Office; Senior Director",
    affiliation: "National Research Foundation (NRF), Singapore",
    photo: mingshiImg,
    bio: "Ms Mingshi Koh is Executive Director, RIE TRUST Office, and concurrently Senior Director at the National Research Foundation (NRF), Singapore, bringing a national perspective on R&D strategy, research translation and innovation ecosystems.",
    panelTitle: "Quantum × AI for Healthcare and Life Sciences",
  },
  {
    name: "Hoong Chuin Lau",
    designation: "Professor of Computer Science",
    affiliation: "Singapore Management University, Singapore",
    photo: hoongImg,
    bio: "Professor Lau Hoong Chuin is Professor of Computer Science at the School of Computing and Information Systems, Singapore Management University (SMU), and Senior Principal Scientist at the Institute of High Performance Computing, under the Singapore Agency for Science, Technology and Research (A*STAR). From 2019 to 2022, he served as Specially Appointed Professor of AI and Information at the Tokyo Institute of Technology, Japan. He has also held visiting appointments at the Wharton Business School of the University of Pennsylvania (USA), Eindhoven University of Technology (Netherlands), and Tohoku University (Japan). Professor Lau is an accomplished scholar who works at the interface of AI and Operations Research. His research spans a broad spectrum—from algorithmic theory to applied optimization and AI systems. His work on vehicle routing and workforce scheduling has not only advanced academic understanding but has also led to real-world deployments in healthcare, supply chains and logistics. A notable outcome of his applied research is the Collaborative Urban Delivery Optimization (CUDO) technology, featured as one of AI Singapore's flagship products, which has been patented and successfully licensed for industrial use. A leading figure in hybrid classical–quantum optimization, Professor Lau is pioneering the integration of quantum-inspired and hybrid computing paradigms for tackling large-scale combinatorial and operational optimization problems, such as vehicle routing and scheduling. He has received numerous honors, including the Lee Kuan Yew Research Fellowship, recognition among the world's top 2% scientists in Artificial Intelligence (in a global Stanford University study since 2020), and the Outstanding Professor Award from the Industrial Engineering and Operations Management Society in 2021. Professor Lau has over a decade of experience leading nationally funded research laboratories. He served as Director of the Fujitsu–SMU Urban Computing and Engineering Corporate Lab (2014–2021) and as Deputy Director of the Living Analytics Research Lab (2011–2015). He has secured, as Principal Investigator, more than SGD 30 million in competitive grants from government and industry. In recent years, he has been Principal Investigator for projects funded by IBM, the Ministry of Home Affairs, Fujitsu Labs (Japan), and three AI Singapore “100 Experiments for Research (100E4R)” initiatives—each culminating in extensive field trials with partners such as the Singapore Police Force, Tan Tock Seng Hospital, the Maritime and Port Authority of Singapore, Keppel Logistics, and Jurong Port. Beyond his research leadership, Professor Lau has made significant national and international contributions to the AI and OR communities. He chaired AI Singapore's Grand Challenge Program Committee in Urban Solutions, and since 2020 he serves on the selection committee for the President's Science and Technology Awards, Singapore's highest scientific honor. He also serves on multiple national committees and international conference program boards (AAAI/IAAI, IJCAI, ICAPS, AAMAS), and holds editorial appointments with leading journals, including the ACM Journal on Autonomous Transportation Systems, IEEE Transactions on Automation Science and Engineering, Journal of Scheduling, and Journal of Heuristics. In terms of teaching, he has taught a wide range of undergraduate and graduate courses, including AI Planning and Decision Making, Design and Analysis of Algorithms, Combinatorial Graph Algorithms, Computational Thinking, Decision Analytics and Optimization, Advanced Topics in Intelligent Systems, and Enterprise Analytics for Decision Support. He is also the co-author of the textbook “Business Analytics for Decision Making”, published by CRC Press in 2016. Twice a recipient of Singapore government scholarship from the Infocomm Development Authority (IDA), Prof Lau obtained his Doctorate of Engineering degree in Computer Science from the Tokyo Institute of Technology (Japan), and BSc and MSc degrees in Computer Science from the University of Minnesota (Minneapolis, USA).",
    weblink: "http://www.mysmu.edu/faculty/hclau/",
    panelTitle: "The Future of Quantum × AI",
  },
  {
    name: "Tai E Shyong",
    designation: "Director, Centre for Precision Health; Chief Medical Officer, PRECISE",
    affiliation: "National University Health System (NUHS); Professor, National University of Singapore",
    photo: taiImg,
    bio: "Prof. Tai E Shyong is Director of the Centre for Precision Health, NUHS, and Chief Medical Officer of PRECISE, as well as Senior Consultant in Endocrinology at NUH and Professor at NUS. His work spans precision medicine, genomics, metabolic disease and population health.",
    panelTitle: "Quantum × AI for Healthcare and Life Sciences",
  },
  {
    name: "Toh Han Chong",
    designation: "Deputy CEO (Strategic Partnerships) and Senior Consultant",
    affiliation: "National Cancer Centre Singapore; Professor, Duke-NUS Medical School",
    photo: tohImg,
    bio: "Prof. Toh Han Chong is Deputy CEO (Strategic Partnerships) and Senior Consultant at the National Cancer Centre Singapore, and Professor at Duke-NUS Medical School. His work spans oncology, cancer immunotherapy, cell therapy, clinical trials and translational medicine.",
    panelTitle: "Quantum × AI for Healthcare and Life Sciences",
  },
  {
    name: "Matthias W. Uhl",
    designation: "Managing Director, Head of Analytics & Quant Solutions",
    affiliation: "UBS",
    photo: uhlImg,
    bio: "Dr. Matthias W. Uhl is Managing Director and Head of Analytics & Quant Solutions at UBS, with expertise in quantitative finance, financial analytics and investment applications.",
    panelTitle: "Quantum × AI for Finance and Risk",
  },
  {
    name: "Stefan Woerner",
    designation: "Principal Research Scientist and Senior Manager, Applied Quantum Optimization Research",
    affiliation: "IBM Research Europe – Zurich",
    photo: stefanImg,
    bio: "Dr. Stefan Woerner is Principal Research Scientist and Senior Manager, Applied Quantum Optimization Research at IBM Research Europe – Zurich. His work spans quantum optimization, quantum finance and quantum machine learning.",
    panelTitle: "Quantum × AI for Finance and Risk",
  },
  {
    name: "Jeremy Woo",
    designation: "Senior Technical Advisor",
    affiliation: "D-Wave",
    photo: jeremyImg,
    bio: "Jeremy Woo is Senior Technical Advisor at D-Wave, working with organisations across APAC on real-world applications of quantum annealing, particularly for optimization problems.",
    panelTitle: "The Future of Quantum × AI",
  },
];

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export default function IntelligenceX2026PanelDiscussions() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative py-14 bg-gray-900">
        <img
          src={intelligenceXBg}
          alt="IntelligenceX 2026 background"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          decoding="sync"
        />
        <div className="absolute inset-0 bg-[#003d7b]/80" />
        <div className="relative container mx-auto px-6 max-w-5xl">
          <p className="text-sm font-semibold text-[#ffcf8c] mb-2 uppercase tracking-wide">
            IntelligenceX 2026 · Main Conference
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Panel Discussions
          </h1>
          <p className="text-white/85 text-base max-w-2xl">
            Six panels bringing together leading voices from academia, industry, and policy to
            debate the frontiers of Quantum × AI.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="container mx-auto px-6 max-w-4xl space-y-10">

          {/* Back link */}
          <div>
            <Link to="/events/intelligencex-2026" className="text-sm text-[#003d7b] hover:underline">
              ← Back to IntelligenceX 2026
            </Link>
          </div>

          {/* Panel Topics */}
          <section className="space-y-5">
            <h2 className="text-2xl font-semibold text-gray-900">Panel Topics</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {panels.map((panel) => (
                <div
                  key={panel.id}
                  className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5 md:p-6"
                >
                  <div className="absolute inset-y-0 left-0 w-1 bg-[#ee7c01]" />
                  <h3 className="pl-2 text-base md:text-lg font-semibold text-gray-900">
                    {panel.title}
                  </h3>
                  {panel.schedule && (
                    <p className="pl-2 mt-1 text-xs font-semibold uppercase tracking-wide text-[#003d7b]">
                      {panel.schedule}
                    </p>
                  )}
                  <p className="pl-2 mt-2 text-sm text-gray-600 leading-relaxed">
                    {panel.theme}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Moderators */}
          <section className="space-y-5">
            <h2 className="text-2xl font-semibold text-gray-900">Moderators</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {moderators.map((moderator) => (
                <div
                  key={moderator.name}
                  className="rounded-xl border border-gray-200 bg-[#f9fafb] p-6 flex flex-col items-center text-center gap-3"
                >
                  {moderator.photo ? (
                    <img
                      src={moderator.photo}
                      alt={`${moderator.name} photo`}
                      className="h-28 w-28 rounded-full object-cover ring-2 ring-white shadow bg-gray-100"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-28 w-28 rounded-full bg-[#003d7b]/10 text-[#003d7b] flex items-center justify-center text-3xl font-bold ring-2 ring-white shadow">
                      {initialsOf(moderator.name)}
                    </div>
                  )}
                  <div className="space-y-1">
                    <p className="text-base font-semibold text-gray-900">{moderator.name}</p>
                    <p className="text-sm text-gray-600 leading-snug">{moderator.affiliation}</p>
                    <p className="text-xs font-medium text-[#003d7b]">
                      Moderates: {moderator.panelTitle}
                    </p>
                  </div>
                  {moderator.bio && (
                    <div className="w-full text-left">
                      <ExpandableBio text={moderator.bio} fadeFrom="#f9fafb" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Panelists */}
          <section className="space-y-5">
            <h2 className="text-2xl font-semibold text-gray-900">Panelists</h2>
            <div className="space-y-6">
              {panelists.map((panelist) => (
                <section
                  key={panelist.name}
                  className="rounded-xl border border-[#cddcf0] bg-[#f4f8ff] p-6 md:p-8"
                >
                  <div className="flex flex-col gap-5 md:flex-row md:items-start">
                    {panelist.photo ? (
                      <img
                        src={panelist.photo}
                        alt={panelist.name}
                        className="h-48 w-48 shrink-0 rounded-lg object-cover shadow-sm"
                        loading="lazy"
                      />
                    ) : (
                      <div className="h-48 w-48 shrink-0 rounded-lg bg-[#003d7b]/10 text-[#003d7b] flex items-center justify-center text-4xl font-bold shadow-sm">
                        {initialsOf(panelist.name)}
                      </div>
                    )}
                    <div className="space-y-2 flex-1">
                      <p className="text-xl font-semibold text-gray-900">{panelist.name}</p>
                      <p className="text-sm font-medium text-[#003d7b]">
                        {panelist.designation}
                        {panelist.affiliation && ` · ${panelist.affiliation}`}
                      </p>
                      <p className="text-xs text-gray-500">Panel: {panelist.panelTitle}</p>
                      <ExpandableBio text={panelist.bio} fadeFrom="#f4f8ff" />
                      {panelist.weblink && (
                        <a
                          href={panelist.weblink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#003d7b] hover:underline"
                        >
                          {panelist.weblink.includes("linkedin.com") ? "LinkedIn →" : "Website →"}
                        </a>
                      )}
                    </div>
                  </div>
                </section>
              ))}
            </div>
          </section>

          <div className="rounded-lg border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
            Panelist line-ups and speaker biographies are being confirmed and will be published here
            as they become available.
          </div>

          {/* Back link bottom */}
          <div className="pt-2">
            <Link to="/events/intelligencex-2026" className="text-sm text-[#003d7b] hover:underline">
              ← Back to IntelligenceX 2026
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
