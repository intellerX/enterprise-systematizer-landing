import { practices } from "@/content/practices";
import styles from "./Practices.module.css";

export function Practices() {
  return (
    <section className="section" aria-labelledby="practices-title">
      <div className="container">
        <div className="section__head">
          <p className="section__eyebrow">Delivery</p>
          <h2 id="practices-title">{practices.title}</h2>
          <p>{practices.intro}</p>
        </div>
        <ul className={styles.list}>
          {practices.items.map((item) => (
            <li key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
