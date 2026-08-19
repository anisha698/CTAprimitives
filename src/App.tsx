import { ReactNode, useMemo, useState } from "react";
import {
  Count,
  Hold,
  Inline,
  Intent,
  Magnetic,
  Pulse,
  Reveal,
  Ripple,
  Sequence,
  Shake,
  Slide,
  Spotlight,
  Sticky,
  Swap,
  Tilt,
  Track,
  Variant
} from "./primitives";

const INSTALL = "npm install experiment-primitives";

const groups = ["Swap", "Reveal", "Inline", "Sticky", "Sequence", "Variant", "Motion", "Interaction"] as const;
type Group = (typeof groups)[number];

type Demo = {
  id: string;
  group: Group;
  name: string;
  node: ReactNode;
};

function Cta({
  children,
  variant = "solid",
  block = false
}: {
  children: ReactNode;
  variant?: "solid" | "ghost" | "text" | "soft";
  block?: boolean;
}) {
  return (
    <button type="button" className={`cta cta-${variant}${block ? " is-block" : ""}`}>
      {children}
    </button>
  );
}

function VariantDemo({
  id,
  variants
}: {
  id: string;
  variants: Record<string, ReactNode>;
}) {
  const keys = Object.keys(variants);
  const [force, setForce] = useState<string>();
  const [current, setCurrent] = useState(keys[0]);

  return (
    <div className="variant-demo">
      <Variant
        id={id}
        variants={variants}
        force={force}
        onView={(event) => setCurrent(event.variant)}
      />
      <div className="variant-switcher">
        {keys.map((key) => (
          <button
            key={key}
            type="button"
            className={key === current ? "is-active" : undefined}
            onClick={() => setForce(key)}
          >
            {key}
          </button>
        ))}
      </div>
    </div>
  );
}

function makeDemos(): Demo[] {
  return [
    {
      id: "swap-hover",
      group: "Swap",
      name: "Hover reassurance",
      node: <Cta><Swap from="Start free" to="No credit card required" /></Cta>
    },
    {
      id: "swap-click",
      group: "Swap",
      name: "Click reassurance",
      node: <Cta><Swap trigger="click" from="Get started" to="It's free forever" /></Cta>
    },
    {
      id: "swap-delay",
      group: "Swap",
      name: "Delayed swap",
      node: <Cta><Swap trigger="delay" delay={1400} from="Join waitlist" to="We'll save your spot" /></Cta>
    },
    {
      id: "swap-price",
      group: "Swap",
      name: "Price swap",
      node: <Cta><Swap from="$48 / month" to="$24 for teams" /></Cta>
    },
    {
      id: "swap-proof",
      group: "Swap",
      name: "Social proof",
      node: <Cta><Swap from="Start free" to="Used by 2,400 teams" /></Cta>
    },
    {
      id: "swap-offer",
      group: "Swap",
      name: "Offer",
      node: <Cta><Swap trigger="click" from="Upgrade" to="20% off this week" /></Cta>
    },
    {
      id: "swap-ghost",
      group: "Swap",
      name: "Ghost CTA",
      node: <Cta variant="ghost"><Swap from="See pricing" to="From $24 / month" /></Cta>
    },
    {
      id: "swap-text",
      group: "Swap",
      name: "Text CTA",
      node: <Cta variant="text"><Swap from="Learn more →" to="No signup required →" /></Cta>
    },
    {
      id: "swap-soft",
      group: "Swap",
      name: "Soft CTA",
      node: <Cta variant="soft"><Swap from="Try playground" to="Takes about 2 minutes" /></Cta>
    },
    {
      id: "cta-split",
      group: "Swap",
      name: "Primary + secondary",
      node: (
        <div className="cta-pair">
          <Cta><Swap from="Start free" to="No card needed" /></Cta>
          <Cta variant="ghost">Contact sales</Cta>
        </div>
      )
    },
    {
      id: "reveal-price",
      group: "Reveal",
      name: "Reveal pricing",
      node: (
        <Reveal trigger={<Cta>See pricing</Cta>}>
          <div className="price">$24 <span>/ mo</span></div>
        </Reveal>
      )
    },
    {
      id: "reveal-preview",
      group: "Reveal",
      name: "Reveal preview",
      node: (
        <Reveal trigger={<Cta variant="ghost">See what's included</Cta>}>
          <ul className="preview-list">
            <li>Unlimited experiments</li>
            <li>Variant assignment</li>
            <li>Bring your own styles</li>
          </ul>
        </Reveal>
      )
    },
    {
      id: "inline-waitlist",
      group: "Inline",
      name: "Waitlist",
      node: (
        <Inline trigger={<Cta>Join waitlist</Cta>}>
          <form className="inline-form" onSubmit={(event) => event.preventDefault()}>
            <input type="email" placeholder="you@company.com" aria-label="Email" />
            <button type="submit">Join</button>
          </form>
        </Inline>
      )
    },
    {
      id: "inline-report",
      group: "Inline",
      name: "Download gate",
      node: (
        <Inline trigger={<Cta variant="ghost">Get the report</Cta>}>
          <form className="inline-form" onSubmit={(event) => event.preventDefault()}>
            <input type="email" placeholder="Work email" aria-label="Work email" />
            <button type="submit">Download</button>
          </form>
        </Inline>
      )
    },
    {
      id: "inline-demo",
      group: "Inline",
      name: "Book from the CTA",
      node: (
        <Inline trigger={<Cta variant="soft">Book a demo</Cta>}>
          <form className="inline-form" onSubmit={(event) => event.preventDefault()}>
            <input type="email" placeholder="Work email" aria-label="Work email" />
            <button type="submit">Book</button>
          </form>
        </Inline>
      )
    },
    {
      id: "sticky-cta",
      group: "Sticky",
      name: "Persistent CTA",
      node: (
        <div className="sticky-window">
          <Sticky top={8}>
            <Cta block><Swap from="Start free" to="Continue →" /></Cta>
          </Sticky>
          <div className="fake-content"><span /><span /><span /><span /><span /><span /></div>
        </div>
      )
    },
    {
      id: "sequence-ask",
      group: "Sequence",
      name: "Progressive ask",
      node: (
        <Sequence loop>
          <Cta>See how it works</Cta>
          <Cta>View pricing</Cta>
          <Cta>Start free</Cta>
        </Sequence>
      )
    },
    {
      id: "variant-commitment",
      group: "Variant",
      name: "Lower commitment",
      node: (
        <VariantDemo
          id="cta-commitment"
          variants={{
            control: <Cta>Get started</Cta>,
            softer: <Cta variant="ghost">See how it works</Cta>
          }}
        />
      )
    },
    {
      id: "variant-demo",
      group: "Variant",
      name: "Demo vs explore",
      node: (
        <VariantDemo
          id="cta-demo"
          variants={{
            control: <Cta>Book a demo</Cta>,
            explore: <Cta variant="text">Explore the product →</Cta>
          }}
        />
      )
    },
    {
      id: "variant-trial",
      group: "Variant",
      name: "Trial vs playground",
      node: (
        <VariantDemo
          id="cta-trial"
          variants={{
            control: <Cta>Start trial</Cta>,
            playground: <Cta variant="soft">Try playground</Cta>
          }}
        />
      )
    },
    {
      id: "motion-magnetic",
      group: "Motion",
      name: "Magnetic",
      node: (
        <Magnetic>
          <Cta>Start free</Cta>
        </Magnetic>
      )
    },
    {
      id: "motion-tilt",
      group: "Motion",
      name: "Tilt",
      node: (
        <Tilt>
          <Cta>Get started</Cta>
        </Tilt>
      )
    },
    {
      id: "motion-pulse",
      group: "Motion",
      name: "Pulse",
      node: (
        <Pulse>
          <Cta>Try it free</Cta>
        </Pulse>
      )
    },
    {
      id: "motion-ripple",
      group: "Motion",
      name: "Ripple",
      node: (
        <Ripple>
          <Cta>Press me</Cta>
        </Ripple>
      )
    },
    {
      id: "motion-track",
      group: "Motion",
      name: "Hover fill",
      node: <Track>Start free</Track>
    },
    {
      id: "motion-shake",
      group: "Motion",
      name: "Shake",
      node: (
        <Shake>
          <Cta variant="ghost">Don't miss this</Cta>
        </Shake>
      )
    },
    {
      id: "motion-count",
      group: "Motion",
      name: "Count up",
      node: (
        <Cta variant="soft">
          <Count prefix="Used by " to={2400} suffix=" teams" />
        </Cta>
      )
    },
    {
      id: "motion-spotlight",
      group: "Motion",
      name: "Spotlight",
      node: (
        <Spotlight>
          <Cta>Move across me</Cta>
        </Spotlight>
      )
    },
    {
      id: "motion-swap",
      group: "Motion",
      name: "Magnetic swap",
      node: (
        <Magnetic>
          <Cta>
            <Swap from="Start free" to="No card needed" />
          </Cta>
        </Magnetic>
      )
    },
    {
      id: "interact-hold",
      group: "Interaction",
      name: "Hold to confirm",
      node: <Hold />
    },
    {
      id: "interact-slide",
      group: "Interaction",
      name: "Slide to start",
      node: <Slide />
    },
    {
      id: "interact-intent",
      group: "Interaction",
      name: "Hover intent",
      node: (
        <Cta>
          <Intent from="Start free" to="Still here? It's free" delay={500} />
        </Cta>
      )
    }
  ];
}

const recipes = [
  {
    name: "Reduce hesitation",
    copy: "Swap the primary action for reassurance when someone engages with it.",
    primitive: "Swap",
    node: <Cta><Swap from="Start trial" to="No credit card required" /></Cta>
  },
  {
    name: "Remove a form step",
    copy: "Turn the CTA into the capture form instead of sending people away.",
    primitive: "Inline",
    node: (
      <Inline trigger={<Cta>Get the report</Cta>}>
        <form className="inline-form" onSubmit={(event) => event.preventDefault()}>
          <input placeholder="Work email" aria-label="Work email" />
          <button type="submit">Download</button>
        </form>
      </Inline>
    )
  },
  {
    name: "Test a softer ask",
    copy: "Compare a conversion-heavy CTA with an exploratory one.",
    primitive: "Variant",
    node: (
      <VariantDemo
        id="recipe-cta"
        variants={{
          control: <Cta>Book a demo</Cta>,
          softer: <Cta variant="ghost">Explore the product</Cta>
        }}
      />
    )
  },
  {
    name: "Reduce misclicks",
    copy: "Require a hold before committing the primary action.",
    primitive: "Hold",
    node: <Hold label="Hold to upgrade" doneLabel="Upgraded" />
  },
  {
    name: "Pull attention",
    copy: "Let the CTA lean toward the cursor without leaving its spot.",
    primitive: "Magnetic",
    node: (
      <Magnetic>
        <Cta>Start free</Cta>
      </Magnetic>
    )
  }
];

export default function App() {
  const [tab, setTab] = useState<"primitives" | "recipes">("primitives");
  const [filter, setFilter] = useState<"All" | Group>("All");
  const [copied, setCopied] = useState(false);
  const [seed, setSeed] = useState(0);
  const demos = useMemo(() => makeDemos(), [seed]);

  const visible = filter === "All" ? demos : demos.filter((demo) => demo.group === filter);

  async function copyInstall() {
    try {
      await navigator.clipboard.writeText(INSTALL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="page">
      <header className="nav">
        <a className="logo" href="#top">Experiment Primitives</a>
        <nav className="nav-links">
          <button type="button" className={tab === "primitives" ? "is-active" : undefined} onClick={() => setTab("primitives")}>Primitives</button>
          <button type="button" className={tab === "recipes" ? "is-active" : undefined} onClick={() => setTab("recipes")}>Recipes</button>
          <a href="#install">Docs</a>
          <a href="https://github.com/anisha698/CTAprimitives/issues/new?template=feedback.md" target="_blank" rel="noreferrer">Feedback</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <h1>React primitives for growth experiments.</h1>
        <button type="button" className="install" onClick={copyInstall}>
          <code>{INSTALL}</code>
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </section>

      {tab === "primitives" ? (
        <>
          <div className="toolbar">
            <div className="filters">
              <button type="button" className={filter === "All" ? "is-active" : undefined} onClick={() => setFilter("All")}>
                All <em>{demos.length}</em>
              </button>
              {groups.map((group) => {
                const count = demos.filter((demo) => demo.group === group).length;
                return (
                  <button
                    key={group}
                    type="button"
                    className={filter === group ? "is-active" : undefined}
                    onClick={() => setFilter(group)}
                  >
                    {group} <em>{count}</em>
                  </button>
                );
              })}
            </div>
            <button type="button" className="text-btn" onClick={() => setSeed((value) => value + 1)}>
              Restart
            </button>
          </div>

          <ol className="gallery" key={seed}>
            {visible.map((demo, index) => (
              <li key={demo.id} className="row">
                <span className="num">{String(index + 1).padStart(2, "0")}</span>
                <div className="row-copy">
                  <strong>{demo.name}</strong>
                  <span>{demo.group}</span>
                </div>
                <div className="row-demo">{demo.node}</div>
              </li>
            ))}
          </ol>
        </>
      ) : (
        <ol className="gallery">
          {recipes.map((recipe, index) => (
            <li key={recipe.name} className="row recipe-row">
              <span className="num">{String(index + 1).padStart(2, "0")}</span>
              <div className="row-copy">
                <strong>{recipe.name}</strong>
                <span>{recipe.primitive}</span>
                <p>{recipe.copy}</p>
              </div>
              <div className="row-demo">{recipe.node}</div>
            </li>
          ))}
        </ol>
      )}

      <section className="docs" id="feedback">
        <h2>Feedback</h2>
        <p>Try the demos, then tell me what felt useful, confusing, or missing.</p>
        <a className="feedback-link" href="https://github.com/anisha698/CTAprimitives/issues/new?template=feedback.md" target="_blank" rel="noreferrer">Leave feedback →</a>
      </section>

      <section className="docs" id="install">
        <h2>Usage</h2>
        <p>The primitives own the behavior. You own the visual system.</p>
        <pre>{`import {
  Swap,
  Magnetic,
  Hold,
  Slide,
  Intent
} from "experiment-primitives";`}</pre>
      </section>

      <footer className="footer">
        <p>Experiment Primitives</p>
        <a href="https://github.com/anisha698/CTAprimitives/issues/new?template=feedback.md" target="_blank" rel="noreferrer">Leave feedback</a>
      </footer>
    </div>
  );
}
