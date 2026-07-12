import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  Award,
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
  Clapperboard,
  Cpu,
  Layers3,
  FileBadge,
  MessageCircle,
  Maximize,
  Medal,
  Pause,
  Phone,
  Play,
  Trophy,
  Volume2,
  X,
} from "lucide-react";
import "./styles.css";

const heroSkills = [
  ["#01", "AI 广告视频"],
  ["#02", "AI 漫剧导演"],
  ["#03", "AIGC 工作流"],
  ["#04", "后期视觉"],
];

const adVideos = [
  {
    title: "化肥广告",
    genre: "品牌广告",
    format: "农业品牌 / 产品广告",
    note: "AIGC 商业视觉广告",
    summary: "以产品价值与农业场景为核心的 AI 商业广告样片。",
    src: "/videos/fertilizer-ad.mp4",
    cover: "cover-agri",
  },
  {
    title: "守望先锋联名永劫无间",
    genre: "游戏广告",
    format: "游戏视觉 / 动作广告",
    note: "AIGC 游戏宣传样片",
    summary: "强调角色、动作节奏与游戏视觉冲击力的广告样片。",
    src: "/videos/overwatch-ad.mp4",
    cover: "cover-game",
  },
];

const dramaVideos = [
  { title: "困在爱里的雨夜", note: "情感剧情漫剧", summary: "强情绪关系与戏剧冲突的短篇剧情样片。", genre: "都市情感", src: "/videos/tragic-love.mp4", cover: "cover-tragic" },
  { title: "克斯罗远征", note: "西幻世界观样片", summary: "异世界角色与史诗氛围的视觉开发样片。", genre: "古装幻想", src: "/videos/kesiluo.mp4", cover: "cover-epic" },
  { title: "末日醒来之后", note: "末日惊悚漫剧", summary: "末日环境、动作节奏与惊悚氛围样片。", genre: "奇幻类型", src: "/videos/zombie.mp4", cover: "cover-apocalypse" },
  { title: "蛇宝宝奇遇记", note: "奇幻萌宠漫剧", summary: "东方奇幻设定与角色化萌宠叙事样片。", genre: "奇幻类型", src: "/videos/snake-baby.mp4", cover: "cover-fantasy" },
  { title: "林晚晚的归途", note: "都市团宠漫剧", summary: "以女性角色为核心的都市情感剧情样片。", genre: "都市情感", src: "/videos/lin-wanwan.mp4", cover: "cover-city" },
  { title: "将军之后", note: "古装权谋漫剧", summary: "古装人物、权谋关系与电影化镜头测试。", genre: "古装幻想", src: "/videos/general-descendant.mp4", cover: "cover-palace" },
  { title: "年代回声", note: "年代情感漫剧", summary: "年代造型、生活场景与情感叙事测试。", genre: "年代叙事", src: "/videos/period-drama.mp4", cover: "cover-period" },
  { title: "镜中美男", note: "人物视觉样片", summary: "男性角色一致性与电影质感人物镜头测试。", genre: "都市情感", src: "/videos/handsome-man.mp4", cover: "cover-portrait" },
  { title: "大圣归来前夜", note: "东方神话短片", summary: "神话角色再创作与东方奇观视觉实验。", genre: "奇幻类型", src: "/videos/great-sage.mp4", cover: "cover-myth" },
  { title: "荒岛1965", note: "年代穿越漫剧", summary: "年代穿越、荒岛经营与世界构建样片。", genre: "年代叙事", src: "/videos/desert-island-1965.mp4", cover: "cover-island" },
];

const thumbnailCache = new Map();

function posterOf(videoPath) {
  return videoPath.replace("/videos/", "/posters/").replace(/\.mp4$/, ".webp");
}

const experienceItems = [
  {
    time: "2025.06 - 2025.11",
    role: "AIGC 漫剧组组长",
    org: "皆可文化创意有限公司",
    desc: [
      "负责 AIGC 漫剧项目制作推进，对接甲方需求并拆解为可执行的制作方案，跟进内容策划、AI 制作、后期交付等环节。",
      "制定项目排期与制作分工，推动多个漫剧项目并行落地，保障交付周期与成片质量。",
      "参与搭建标准化制作 SOP，统一内容品控标准，使成片更符合甲方要求与短视频平台观看节奏。",
    ],
  },
  {
    time: "2025.11 - 2026.03",
    role: "AI 内容项目负责人",
    org: "数智文化传媒有限公司",
    desc: [
      "参与搭建公司 AI 内容生产线，推进 AI 漫剧与 AI 商业广告两类项目从样片测试到实际交付。",
      "对接甲方需求与修改意见，协调制作、后期、运营等环节，推动项目按节点完成。",
      "推进 10 余部 AIGC 漫剧、2 支商业广告项目落地，并参与万粉级抖音漫剧 IP 账号的内容规划与更新。",
    ],
  },
  {
    time: "2026.03 - 2026.07",
    role: "项目负责人（派驻）",
    org: "楚石文化 × 数智文化传媒 联合项目",
    desc: [
      "派驻联合项目，负责 AI 漫剧与 AI 广告内容线的日常推进、需求对接与交付跟进。",
      "协调双方资源与制作团队，拆解项目目标、排定制作周期，保障合作项目稳定推进。",
      "优化内容制作流程与交付标准，提升项目执行效率和批量产出能力。",
    ],
  },
];

const awardItems = [
  "全国三维数字化创新设计大赛 17 周年精英联赛龙鼎奖 国家级二等奖",
  "全国三维数字化创新设计大赛 17 周年精英联赛龙鼎奖 国家级三等奖",
  "全国三维数字化创新设计大赛 17 周年精英联赛龙鼎奖 省级特等奖 2 项",
  "第 18 届全国三维数字化创新设计大赛 AI+3D 创新专项赛 省级特等奖",
  "全国三维数字化创新设计大赛 17 周年精英联赛龙鼎奖 省级二等奖",
  "米兰设计周中国高校设计学科师生优秀作品展 省级三等奖",
  "福建省传播学会第十二届大学生影像大赛《莆木铸魂》纪录片赛道省级三等奖",
  "AI 宁德 - 国安有我海报征集大赛 市级二等奖",
];

const certificates = [
  "全国三维数字化技术应用能力认证 3D 数据高级工程师 V6 级",
  "商业摄影师 3 级",
  "互联网营销师三级",
  "两项 IP 形象专利认证",
  "达芬奇 19 初级认证 / 达芬奇 18 调色师认证 / 剪辑师认证",
  "科教电影协会会员 / 国家地理摄影师认证",
  "ITC 人工智能大师级证书",
];

const nationalProjects = [
  ["国家级创新训练项目 / 第一负责人", "智启农耕 AI 助农", "聚焦 AI、新媒体与助农宣传方向，推进乡村数字化传播与农产品宣传实践。"],
  ["国家级创新创业项目 / 第三负责人", "数字化人才对接公益行动", "参与国家级大创项目，围绕数字化人才服务与公益实践展开项目执行。"],
];

const strengths = [
  ["项目推进与交付能力", "熟悉 AIGC 视频项目从需求沟通、脚本拆解、制作排期到成片交付的完整流程，能在多项目并行中推进节点、协调资源并把控交付质量。", Layers3],
  ["内容产品落地经验", "参与并推进 10 余部 AIGC 漫剧、2 支商业广告项目落地，具备从内容样片、制作流程到账号内容更新的实际项目经验。", BarChart3],
  ["审美判断与平台适配", "具备视听创作基础与短视频平台内容判断力，能够结合甲方要求、平台节奏和受众偏好，优化内容方向与成片表现。", BadgeCheck],
];

const ipStats = [
  ["11.6万", "账号获赞"],
  ["1.2万", "账号粉丝"],
  ["55.2万", "单条最高播放"],
  ["18", "已发布/沉淀作品"],
];

const ipKeywords = ["AIGC IP", "原创剧情", "AI 形象", "双强霸总", "极限拉扯", "年上年下", "男神人设", "短剧连载", "版权登记", "数据复盘"];

const ipWorks = [
  { title: "给我抓到了吧~", plays: "55.2万", likes: "8482", comments: "470", shares: "1089", tag: "禁欲系 / 双强", date: "2026-04-28" },
  { title: "番外篇: 周念时捣蛋日记", plays: "34.4万", likes: "9155", comments: "98", shares: "310", tag: "男孕 / 番外", date: "2026-06-07" },
  { title: "多谢你送我爱人回来", plays: "31.5万", likes: "4503", comments: "131", shares: "150", tag: "剧情冲突", date: "2026-05-08" },
  { title: "这是我给你们准备的礼物", plays: "19.8万", likes: "3024", comments: "72", shares: "63", tag: "关系推进", date: "2026-05-19" },
  { title: "温先生到底想干什么?", plays: "18.3万", likes: "2719", comments: "86", shares: "72", tag: "情绪拉扯", date: "2026-05-14" },
  { title: "我爱的人就是最好的", plays: "16.3万", likes: "3730", comments: "146", shares: "176", tag: "高互动", date: "2026-04-29" },
];

function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isNavFloating, setIsNavFloating] = useState(false);

  useEffect(() => {
    const animatedItems = [
      ...document.querySelectorAll(
        [
          ".aboutPortrait",
          ".aboutCopy",
          ".streamHeroContent",
          ".catalogHead",
          ".posterCard",
          ".genreShelf",
          ".ipCase",
          ".ipTitleBlock",
          ".ipStatsGrid > div",
          ".keywordCloud span",
          ".ipCapabilityGrid article",
          ".ipWorkCard",
          ".profileIntro",
          ".portraitPanel",
          ".infoPanel",
          ".strengthCard",
          ".contactInner",
        ].join(",")
      ),
    ];

    animatedItems.forEach((item, index) => {
      item.classList.add("revealItem");
      item.style.setProperty("--reveal-delay", `${Math.min(index % 8, 7) * 70}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("isVisible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -80px 0px" }
    );

    animatedItems.forEach((item) => observer.observe(item));

    let pointerFrame = 0;
    let pointerX = 0;
    let pointerY = 0;
    const updatePointer = (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (pointerFrame) return;
      pointerFrame = window.requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--pointer-x", `${pointerX}px`);
        document.documentElement.style.setProperty("--pointer-y", `${pointerY}px`);
        pointerFrame = 0;
      });
    };

    window.addEventListener("pointermove", updatePointer, { passive: true });

    return () => {
      observer.disconnect();
      if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
      window.removeEventListener("pointermove", updatePointer);
    };
  }, []);

  useEffect(() => {
    let ticking = false;
    const updateFloatingNav = () => {
      const triggerPoint = Math.max(window.innerHeight * 0.7, 520);
      setIsNavFloating(window.scrollY > triggerPoint);
      ticking = false;
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateFloatingNav);
    };

    updateFloatingNav();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main>
      <FloatingNav isVisible={isNavFloating} onContact={() => setIsContactOpen(true)} />
      <Hero onContact={() => setIsContactOpen(true)} />
      <About onContact={() => setIsContactOpen(true)} />
      <Portfolio />
      <Profile />
      <Contact onContact={() => setIsContactOpen(true)} />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </main>
  );
}

function FloatingNav({ isVisible, onContact }) {
  return (
    <nav className={`floatingNav ${isVisible ? "isVisible" : ""}`} aria-label="悬浮导航">
      <a className="floatingBrand" href="#top">
        <span>AI</span>
        王子扬
      </a>
      <div className="floatingLinks">
        <a href="#about">关于</a>
        <a href="#works">作品</a>
        <a href="#ip-case">IP案例</a>
        <a href="#profile">经历</a>
      </div>
      <button className="floatingContact" type="button" onClick={onContact}>
        联系我
        <ArrowUpRight size={16} />
      </button>
    </nav>
  );
}

function Hero({ onContact }) {
  return (
    <section className="hero" id="top">
      <div className="heroFrame shell">
        <video
          className="heroBgVideo"
          src="/videos/hero-bg.mp4"
          poster="/posters/hero-21-9.webp"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
        />
        <div className="heroVideoPlaceholder" />
        <div className="heroAtmosphere" />

        <nav className="nav">
          <a className="brand" href="#top">
            <span>AI</span>
            MOTION / 2026
          </a>
          <div className="navLinks">
            <a href="#about">关于</a>
            <a href="#works">作品</a>
            <a href="#ip-case">IP案例</a>
            <a href="#profile">经历</a>
          </div>
          <button className="contactButton" type="button" onClick={onContact}>
            联系我
            <ArrowUpRight size={18} />
          </button>
        </nav>

        <div className="coverTitle" aria-label="Imagination in motion">
          <span>IMAGINATION</span>
          <strong>IN MOTION</strong>
        </div>

        <div className="coverFooter">
          <span>AI GENERATED VISUALS</span>
          <span>SCROLL TO EXPLORE</span>
          <span>DIRECTED FRAME BY FRAME</span>
        </div>
      </div>
    </section>
  );
}

function About({ onContact }) {
  return (
    <section className="aboutPage" id="about">
      <div className="shell aboutLayout">
        <div className="aboutIndex">02 / ABOUT</div>
        <div className="aboutPortrait">
          <img src="/assets/optimized/portrait-current.webp" alt="王子扬个人形象" loading="lazy" decoding="async" />
        </div>
        <div className="aboutCopy">
          <p className="sectionKicker">AI Designer / AIGC Video Director</p>
          <h2>王子扬</h2>
          <h3>用导演思维，控制 AI 影像的每一个镜头。</h3>
          <p>
            我是一名 AI 设计师与 AIGC 视频导演，专注于脚本拆解、分镜设计、角色一致性、动态生成与后期合成，
            将生成式工具组织成稳定、可交付的视频制作流程。
          </p>
          <div className="aboutStats">
            <div><strong>10+</strong><span>AIGC 项目交付</span></div>
            <div><strong>29</strong><span>设计与影像奖项</span></div>
            <div><strong>02</strong><span>IP 形象专利</span></div>
          </div>
          <div className="aboutActions">
            <a className="primaryCta" href="#works">查看作品 <ArrowUpRight size={18} /></a>
            <button className="ghostCta" type="button" onClick={onContact}>联系我</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function IPCase() {
  return (
    <section className="ipCase ipCaseEmbedded" id="ip-case">
      <div className="ipCaseInner">
        <div className="sectionHead ipCaseHead">
          <div>
            <p className="sectionKicker">AIGC IP Account Case</p>
            <h2>原创 AI IP 账号《越界心动》运营案例</h2>
          </div>
          <p>
            从 AI 形象、人设关系、连续剧情到短视频数据反馈，验证 AIGC 内容在平台账号中的吸引力和可持续更新能力。
          </p>
        </div>

        <div className="ipCaseLayout">
          <div className="ipVisualStack">
            <div className="phoneMock mainPhone">
              <img src="/assets/optimized/ip-profile.webp" alt="枫仔账号主页数据截图" loading="lazy" decoding="async" />
            </div>
            <div className="phoneMock sidePhone">
              <img src="/assets/optimized/ip-works-55w.webp" alt="55.2万播放作品数据截图" loading="lazy" decoding="async" />
            </div>
          </div>

          <div className="ipCaseContent">
            <div className="ipTitleBlock">
              <span>账号名 / 枫仔 · AIGC IP 运营案例</span>
              <h3>
                <em>用 AI 角色与连续剧情</em>
                <em>搭建可增长的短剧 IP 账号</em>
              </h3>
              <p>从角色设定、连续剧情到数据复盘，验证 AIGC 内容的账号化运营能力。</p>
            </div>

            <div className="ipStatsGrid">
              {ipStats.map(([value, label]) => (
                <div key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>

            <div className="keywordCloud" aria-label="账号关键词">
              {ipKeywords.map((keyword) => <span key={keyword}>{keyword}</span>)}
            </div>

            <div className="ipCapabilityGrid">
              <article><Layers3 size={22} /><strong>IP 设定</strong><span>账号定位、角色人设、剧情钩子、版权意识</span></article>
              <article><Clapperboard size={22} /><strong>内容导演</strong><span>连续剧情、短视频节奏、情绪高点和封面标题</span></article>
              <article><BarChart3 size={22} /><strong>数据复盘</strong><span>播放、点赞、评论、分享与流量激励反馈</span></article>
            </div>
          </div>
        </div>

        <div className="ipPerformance">
          <div className="catalogHead">
            <div>
              <p>TOP PERFORMING POSTS</p>
              <h2>爆款作品数据</h2>
            </div>
            <span>近 90 天作品分析截图整理，展示账号内容验证结果。</span>
          </div>

          <div className="ipWorkGrid">
            {ipWorks.map((work, index) => (
              <article className="ipWorkCard" key={work.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{work.title}</h3>
                  <p>{work.tag} / {work.date}</p>
                </div>
                <ul>
                  <li><strong>{work.plays}</strong><em>播放</em></li>
                  <li><strong>{work.likes}</strong><em>点赞</em></li>
                  <li><strong>{work.comments}</strong><em>评论</em></li>
                  <li><strong>{work.shares}</strong><em>分享</em></li>
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Portfolio() {
  const [activeVideo, setActiveVideo] = useState(null);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const featured = dramaVideos[featuredIndex];
  const genres = ["古装幻想", "都市情感", "奇幻类型", "年代叙事"];
  const allVideos = [...dramaVideos, ...adVideos];

  return (
    <section className="portfolio streamingPage" id="works">
      <div className="streamHero">
        <PosterFrame key={featured.src} src={featured.src} className="streamHeroMedia" seekRatio={0.18} />
        <div className="streamHeroShade" />
        <div className="shell streamHeroContent">
          <div className="streamFeatureCopy">
            <p>03 / FEATURED AIGC FILM</p>
            <h2>{featured.title}</h2>
            <h3>{featured.note}</h3>
            <span>{featured.summary}</span>
            <button type="button" onClick={() => setActiveVideo(featured)}>
              <Play size={18} fill="currentColor" /> 立即播放
            </button>
          </div>

          <div className="characterShowcase" aria-label="精选角色样片轮播">
            <p>CHARACTER REEL</p>
            <div className="characterCarousel">
              {dramaVideos.map((item, index) => (
                <button
                  className={`characterCard ${index === featuredIndex ? "isActive" : ""}`}
                  type="button"
                  onMouseEnter={() => setFeaturedIndex(index)}
                  onFocus={() => setFeaturedIndex(index)}
                  onClick={() => setActiveVideo(item)}
                  key={item.src}
                >
                  <span className={`characterArt ${item.cover || "cover-default"}`} aria-hidden="true">
                    <b>{item.title}</b>
                  </span>
                  <PosterFrame src={item.src} seekRatio={0.14 + (index % 3) * 0.04} />
                  <span className="characterIndex">{String(index + 1).padStart(2, "0")}</span>
                  <span className="characterName">{item.title}</span>
                </button>
              ))}
            </div>
            <div className="characterCaption">
              <strong>{featured.genre}</strong>
              <span>{featured.note} / 点击任意角色封面进入沉浸式播放</span>
            </div>
          </div>
        </div>
      </div>

      <div className="shell streamLibrary">
        <div className="workCategories" aria-label="作品分类">
          <a href="#drama">全部漫剧</a>
          {genres.map((genre) => <a href={`#genre-${genre}`} key={genre}>{genre}</a>)}
          <a href="#ads">AI 广告</a>
        </div>

        <div className="catalogHead" id="drama">
          <div>
            <p>ALL FILMS / 10</p>
            <h2>漫剧片库</h2>
          </div>
          <span>选择一张海报，进入沉浸式播放界面。</span>
        </div>

        <div className="posterRail">
          {dramaVideos.map((item, index) => (
            <PosterCard item={item} index={index} onOpen={() => setActiveVideo(item)} key={item.src} />
          ))}
        </div>

        <div className="genreSections">
          {genres.map((genre, genreIndex) => {
            const items = dramaVideos.filter((item) => item.genre === genre);
            return (
              <section className="genreShelf" id={`genre-${genre}`} key={genre}>
                <div className="genreHead">
                  <div><span>0{genreIndex + 1}</span><h3>{genre}</h3></div>
                  <p>{items.length} 支样片</p>
                </div>
                <div className="genreGrid">
                  {items.map((item) => (
                    <PosterCard item={item} compact onOpen={() => setActiveVideo(item)} key={item.src} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <IPCase />

        <div className="subSection" id="ads">
          <div className="subHead">
            <p>05</p>
            <h3>AI 广告视频</h3>
            <span>品牌产品广告与游戏视觉广告，点击封面进入沉浸播放。</span>
          </div>

          <div className="adShowcaseGrid">
            {adVideos.map((item, index) => (
              <PosterCard
                item={item}
                index={index}
                compact
                onOpen={() => setActiveVideo(item)}
                key={item.src}
              />
            ))}
          </div>
        </div>
      </div>
      {activeVideo && (
        <ImmersivePlayer
          video={activeVideo}
          videos={allVideos}
          onClose={() => setActiveVideo(null)}
          onSelect={setActiveVideo}
        />
      )}
    </section>
  );
}

function PosterFrame({ src, className = "", seekRatio = 0.12, eager = false }) {
  return (
    <img
      className={className}
      src={posterOf(src)}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      draggable="false"
      alt=""
      aria-hidden="true"
    />
  );
}

function PosterCard({ item, index, compact = false, onOpen }) {
  return (
    <button className={`posterCard ${compact ? "compactPoster" : ""}`} type="button" onClick={onOpen}>
      <span className={`posterArtwork ${item.cover || "cover-default"}`} aria-hidden="true">
        <b>{item.title}</b>
      </span>
      <PosterFrame src={item.src} seekRatio={0.08 + ((index || 0) % 4) * 0.05} />
      <span className="posterVignette" />
      <span className="posterNumber">{String((index || 0) + 1).padStart(2, "0")}</span>
      <span className="posterPlay"><Play size={19} fill="currentColor" /></span>
      <span className="posterCopy">
        <small>{item.genre}</small>
        <strong>{item.title}</strong>
        <em>{item.note}</em>
        {compact && <i>{item.summary}</i>}
      </span>
    </button>
  );
}

function VideoPlaceholder({ ratio, index, src, title, onOpen }) {
  if (src) {
    return (
      <button className="placeholderVisual realVideo" type="button" onClick={onOpen}>
        <video playsInline preload="none" muted data-src={src} aria-label={`${title}视频预览`}>
          <p>你的浏览器暂不支持视频播放。</p>
        </video>
        <span className="cardLaunch"><Play size={22} fill="currentColor" /></span>
      </button>
    );
  }

  return (
    <div className="placeholderVisual">
      <div className="playBadge">
        <Play size={18} fill="currentColor" />
      </div>
      <span>{index ? `EP ${String(index).padStart(2, "0")}` : ratio}</span>
      <div className="playerChrome">
        <Play size={15} fill="currentColor" />
        <div className="playerTrack"><i /></div>
        <small>00:00 / 01:00</small>
      </div>
    </div>
  );
}

function ImmersivePlayer({ video, videos, onClose, onSelect }) {
  const playerRef = useRef(null);
  const screenRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isSeeking, setIsSeeking] = useState(false);
  const [thumbnails, setThumbnails] = useState([]);
  const segmentCount = 10;
  const activeSegment = duration ? Math.min(segmentCount - 1, Math.floor((currentTime / duration) * segmentCount)) : 0;
  const currentIndex = videos.findIndex((item) => item.src === video.src);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;
    setCurrentTime(0);
    setDuration(0);
    setThumbnails([]);
    setIsPlaying(true);
    player.load();
    player.play().catch(() => setIsPlaying(false));
  }, [video.src]);

  useEffect(() => {
    const cached = thumbnailCache.get(video.src);
    if (cached) {
      setThumbnails(cached);
      return undefined;
    }
    const frames = Array.from({ length: segmentCount }, () => posterOf(video.src));
    thumbnailCache.set(video.src, frames);
    setThumbnails(frames);
    return undefined;
  }, [video.src]);

  const formatTime = (seconds) => {
    if (!Number.isFinite(seconds)) return "00:00";
    const minutes = Math.floor(seconds / 60);
    const rest = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
  };

  const togglePlayback = () => {
    const player = playerRef.current;
    if (!player) return;
    if (player.paused) {
      player.play();
      setIsPlaying(true);
    } else {
      player.pause();
      setIsPlaying(false);
    }
  };

  const startSeeking = () => {
    setIsSeeking(true);
    playerRef.current?.pause();
  };

  const updateSeek = (event) => {
    const nextTime = Number(event.target.value);
    setCurrentTime(nextTime);
    if (playerRef.current) playerRef.current.currentTime = nextTime;
  };

  const finishSeeking = () => {
    setIsSeeking(false);
    playerRef.current?.play();
    setIsPlaying(true);
  };

  const stepVideo = (direction) => {
    const nextIndex = (currentIndex + direction + videos.length) % videos.length;
    onSelect(videos[nextIndex]);
  };

  const enterFullscreen = () => {
    screenRef.current?.requestFullscreen?.();
  };

  return (
    <div className="cinemaOverlay" ref={screenRef} role="dialog" aria-modal="true" aria-label={`${video.title}沉浸式播放器`}>
      <div className="cinemaGrain" />
      <header className="cinemaHeader">
        <div>
          <span>NOW PLAYING / {String(currentIndex + 1).padStart(2, "0")}</span>
          <h2>{video.title}</h2>
        </div>
        <button type="button" onClick={onClose} aria-label="关闭播放器"><X size={24} /></button>
      </header>

      <div className="cinemaStage">
        <button type="button" className="stepButton previous" onClick={() => stepVideo(-1)} aria-label="上一支视频">
          <ChevronLeft size={30} />
        </button>
        <video
          ref={playerRef}
          src={video.src}
          poster={posterOf(video.src)}
          playsInline
          autoPlay
          preload="auto"
          controlsList="nodownload noremoteplayback"
          disablePictureInPicture
          onContextMenu={(event) => event.preventDefault()}
          onDragStart={(event) => event.preventDefault()}
          onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
          onTimeUpdate={(event) => !isSeeking && setCurrentTime(event.currentTarget.currentTime)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => !isSeeking && setIsPlaying(false)}
          onEnded={() => stepVideo(1)}
        />
        <div className="cinemaWatermark" aria-hidden="true">
          王子扬 / AIGC VIDEO DIRECTOR / PORTFOLIO PREVIEW
        </div>
        <button type="button" className="stagePlay" onClick={togglePlayback} aria-label={isPlaying ? "暂停" : "播放"}>
          {isPlaying ? <Pause size={30} fill="currentColor" /> : <Play size={30} fill="currentColor" />}
        </button>
        <button type="button" className="stepButton next" onClick={() => stepVideo(1)} aria-label="下一支视频">
          <ChevronRight size={30} />
        </button>
      </div>

      <div className="cinemaControls">
        <div className="timeReadout">{formatTime(currentTime)} <span>/ {formatTime(duration)}</span></div>
        <div className="thumbnailTimeline">
          <div className="thumbnailRail" aria-hidden="true">
            {Array.from({ length: segmentCount }, (_, index) => (
              <div
                className={`timelineThumb ${index === activeSegment && isSeeking ? "isActive" : ""}`}
                style={thumbnails[index] ? { backgroundImage: `url(${thumbnails[index]})` } : undefined}
                key={`${video.src}-${index}`}
              >
                <span>{formatTime((duration * index) / segmentCount)}</span>
              </div>
            ))}
          </div>
          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.01"
            value={currentTime}
            onPointerDown={startSeeking}
            onPointerUp={finishSeeking}
            onChange={updateSeek}
            aria-label="视频进度"
          />
        </div>
        <div className="controlButtons">
          <button type="button" onClick={togglePlayback} aria-label={isPlaying ? "暂停" : "播放"}>
            {isPlaying ? <Pause size={19} /> : <Play size={19} />}
          </button>
          <Volume2 size={19} />
          <button type="button" onClick={enterFullscreen} aria-label="浏览器全屏"><Maximize size={19} /></button>
        </div>
      </div>

      <div className="cinemaPlaylist">
        {videos.map((item, index) => (
          <button
            type="button"
            className={item.src === video.src ? "selected" : ""}
            onClick={() => onSelect(item)}
            key={item.src}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            {item.title}
          </button>
        ))}
      </div>
    </div>
  );
}

function Profile() {
  return (
    <section className="profile section" id="profile">
      <div className="shell profileGrid">
        <div className="profileIntro">
          <p className="sectionKicker">Personal Strengths</p>
          <h2>个人优势</h2>
          <p>
            以 AIGC 视频内容制作为核心，具备甲方需求对接、制作方案拆解、项目排期推进与交付品控能力，能够把内容需求稳定落到成片结果。
          </p>

          <div className="advantagePreview">
            {strengths.map(([title, desc, Icon], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <Icon size={20} />
                <div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="portraitPanel">
          <img src="/assets/optimized/portrait.webp" alt="AI designer portrait visual" loading="lazy" decoding="async" />
        </div>

        <InfoPanel icon={BriefcaseBusiness} title="工作经历">
          {experienceItems.map((item) => (
            <div className="timelineItem" key={item.role}>
              <span>{item.time}</span>
              <h4>{item.role}</h4>
              <p>{item.org}</p>
              <ul className="timelineBullets">
                {item.desc.map((desc) => <li key={desc}>{desc}</li>)}
              </ul>
            </div>
          ))}
        </InfoPanel>

        <InfoPanel icon={Trophy} title="奖项经历">
          <ul className="infoList">
            {awardItems.map((item) => (
              <li key={item}><Medal size={16} /> {item}</li>
            ))}
          </ul>
        </InfoPanel>

        <InfoPanel icon={FileBadge} title="证书认证">
          <ul className="infoList">
            {certificates.map((item) => (
              <li key={item}><Award size={16} /> {item}</li>
            ))}
          </ul>
        </InfoPanel>

        <InfoPanel icon={Cpu} title="国家级项目">
          <div className="projectList">
            {nationalProjects.map(([type, title, desc]) => (
              <article key={title}>
                <span>{type}</span>
                <h4>{title}</h4>
                <p>{desc}</p>
              </article>
            ))}
          </div>
        </InfoPanel>

      </div>
      <div className="shell collabNote">
        <p>
          注：以上项目均为本人与固定制作搭档协作落地，双方分工明确，本人主责甲方需求对接、项目全流程管控与团队统筹，内容创作与质量审核，本人可独立胜任岗位工作。
        </p>
      </div>
    </section>
  );
}

function InfoPanel({ icon: Icon, title, children }) {
  return (
    <article className="infoPanel">
      <div className="panelTitle">
        <Icon size={22} />
        <h3>{title}</h3>
      </div>
      {children}
    </article>
  );
}

function SectionTitle({ kicker, title, desc }) {
  return (
    <div className="sectionHead">
      <div>
        <p className="sectionKicker">{kicker}</p>
        <h2>{title}</h2>
      </div>
      <p>{desc}</p>
    </div>
  );
}

function Contact({ onContact }) {
  return (
    <section className="contactFinal" id="contact">
      <div className="shell contactInner">
        <p className="sectionKicker">Contact</p>
        <h2>让 AI 影像成为可被导演、可被交付的作品。</h2>
        <div className="contactCards">
          <button type="button" onClick={onContact}><MessageCircle size={20} /> 微信二维码</button>
          <a href="tel:1859387750"><Phone size={20} /> 1859387750</a>
        </div>
      </div>
    </section>
  );
}

function ContactModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="wechatOverlay" role="dialog" aria-modal="true" aria-label="微信二维码联系方式">
      <button className="wechatBackdrop" type="button" onClick={onClose} aria-label="关闭微信二维码" />
      <div className="wechatModal">
        <button className="wechatClose" type="button" onClick={onClose} aria-label="关闭">
          <X size={22} />
        </button>
        <div className="wechatCopy">
          <p>WECHAT CONTACT</p>
          <h3>扫码添加微信</h3>
          <span>备注：作品集 / AIGC 视频导演</span>
        </div>
        <img src="/assets/optimized/wechat-qr.webp" alt="微信二维码" loading="eager" decoding="async" />
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
