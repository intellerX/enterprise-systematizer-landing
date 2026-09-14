import { agentsContent } from "@/content/agents";
import styles from "./Agents.module.css";

export function AgentsSection() {
  const c = agentsContent;
  return (
    <section className="section" aria-labelledby="agents-title">
      <div className="container">
        <div className="section__head">
          <p className="section__eyebrow">Automation</p>
          <h2 id="agents-title">{c.title}</h2>
          <p>{c.intro}</p>
        </div>

        <AgentsDiagram steps={c.diagramSteps} />

        <ul className={styles.blocks}>
          {c.blocks.map((b) => (
            <li key={b.title}>
              <h3>{b.title}</h3>
              <p>{b.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function AgentsDiagram({ steps }: { steps: string[] }) {
  return (
    <figure className={styles.diagram} aria-label="Agent architecture flow">
      <svg viewBox="0 0 960 160" role="img" aria-labelledby="diagram-title">
        <title id="diagram-title">
          Flow from user trigger through orchestrator, agents, tools, human
          approval, to outcome and metrics
        </title>
        {steps.map((label, i) => {
          const x = 20 + i * 155;
          return (
            <g key={label}>
              {i < steps.length - 1 ? (
                <path
                  d={`M ${x + 120} 70 H ${x + 145}`}
                  className={styles.arrow}
                  markerEnd="url(#arrow)"
                />
              ) : null}
              <rect
                x={x}
                y={35}
                width={120}
                height={70}
                rx={10}
                className={styles.node}
              />
              <text x={x + 60} y={75} textAnchor="middle" className={styles.nodeText}>
                {label}
              </text>
            </g>
          );
        })}
        <defs>
          <marker
            id="arrow"
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L6,3 L0,6 Z" fill="#7ec8e3" />
          </marker>
        </defs>
      </svg>
      <figcaption className={styles.caption}>
        Architecture path: trigger → orchestration → specialized agents → systems →
        human approval → measured outcome.
      </figcaption>
    </figure>
  );
}
