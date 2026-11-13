const TITLES = {
  home: "行程",
  tickets: "票務",
  kyoto: "京都",
  alps: "阿爾卑斯",
  todo: "待辦"
};

const TODOS = [
  { id: "dates", label: "定日期" },
  { id: "arch", label: "買 Arch Pass（北陸拱型 7 日）" },
  { id: "alpine", label: "買アルペンルート通票" },
  { id: "nagano", label: "長野住宿" },
  { id: "sakura", label: "京都櫻花日程" },
  { id: "fuji", label: "是否加富士" }
];

const mapLink = (q) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

function el(html) {
  const t = document.createElement("template");
  t.innerHTML = html.trim();
  return t.content;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function placeCard(p) {
  const badges = [
    p.fee ? `<span class="badge ${p.fee === "免費" ? "free" : "fee"}">${escapeHtml(p.fee)}</span>` : "",
    p.tag ? `<span class="badge">${escapeHtml(p.tag)}</span>` : ""
  ].join("");
  const station = p.station
    ? `<p class="meta">交通：${escapeHtml(p.station)}</p>`
    : "";
  const maps = p.maps
    ? `<p class="meta"><a href="${mapLink(p.maps)}" target="_blank" rel="noopener">喺地圖打開</a></p>`
    : "";
  return `<article class="place">
    <h3>${escapeHtml(p.name)}</h3>
    <div>${badges}</div>
    ${station}
    ${p.note ? `<p>${escapeHtml(p.note)}</p>` : ""}
    ${maps}
  </article>`;
}

const KYOTO = {
  must: [
    { name: "哲学の道", fee: "免費", tag: "必去", station: "銀閣寺道巴士／東西線蹴上", maps: "哲学の道 京都", note: "約 2 km 染井吉野隧道。週末極塞，朝早 8–9 點前去。" },
    { name: "嵐山・渡月橋（±天龍寺）", fee: "河邊免費／天龍寺庭園約 ¥500", tag: "必去", station: "嵐電／JR／阪急", maps: "渡月橋 嵐山", note: "橋＋河＋山，全日都塞。" },
    { name: "円山公園", fee: "免費", tag: "必去", station: "祇園／八坂", maps: "円山公園 京都", note: "祇園枝垂同夜櫻攤。夜場最塞。" },
    { name: "清水寺＋東山坡", fee: "約 ¥500", tag: "必去", station: "五条坂／清水みち巴士", maps: "清水寺 京都", note: "舞台櫻。開寺就入較好。" },
    { name: "仁和寺・御室櫻", fee: "御室花まつり特別入場約 ¥800", tag: "遲開", station: "嵐電御室仁和寺", maps: "仁和寺 京都", note: "通常遲約 1 週，常見 4 月中。" }
  ],
  more: [
    { name: "平安神宮神苑", fee: "神苑約 ¥600", station: "東西線東山／岡崎", maps: "平安神宮 京都", note: "八重紅枝垂稍遲。" },
    { name: "岡崎疏水・蹴上インクライン", fee: "步行免費／十石舟約 ¥2000", station: "東西線蹴上", maps: "蹴上インクライン 京都", note: "朝早較好。" },
    { name: "祇園白川", fee: "免費", station: "京阪祇園四条", maps: "祇園白川 京都", note: "巷窄極塞，日出前後去。" },
    { name: "平野神社", fee: "櫻苑燈籠時段常約 ¥500", station: "金閣寺側巴士", maps: "平野神社 京都", note: "品種多，有夜櫻。" },
    { name: "醍醐寺", fee: "春季三區約 ¥1800", station: "東西線醍醐", maps: "醍醐寺 京都", note: "「花之醍醐」。" },
    { name: "京都御苑", fee: "免費", station: "今出川／丸太町", maps: "京都御苑", note: "大公園。近衛邸跡枝垂偏早。" }
  ],
  secret: [
    { name: "西陣（妙顕寺・本法寺・水火天満宮）", fee: "免費散步", tag: "相對真靜", station: "地鐵鞍馬口，步行約 10–15 分", maps: "西陣 京都", note: "住宅區散步。" },
    { name: "大石神社（山科）", tag: "相對真靜", station: "京阪巴士「大石神社前」", maps: "大石神社 山科", note: "「大石櫻」垂櫻，常比染井吉野稍早。" },
    { name: "寶泉寺（京北）", tag: "相對真靜", station: "巴士約 80 分", maps: "寶泉寺 京北", note: "市區開花後約 4 月中仍見。真鄉下，唔識日文較難。" },
    { name: "半木の道（北山）", fee: "免費", tag: "少人啲、易去", station: "地鐵北山站步行約 10 分", maps: "半木の道 京都", note: "鴨川東岸紅枝垂。" },
    { name: "山科疏水", fee: "免費", tag: "少人啲、易去", station: "JR／地鐵山科或御陵", maps: "山科疏水 京都", note: "同哲學之道同一疏水系統，但疏得多。可配油菜花。" },
    { name: "毘沙門堂（山科）", fee: "季節約 ¥1000", tag: "少人啲、易去", station: "山科站上山約 20 分", maps: "毘沙門堂 京都", note: "名垂櫻。" },
    { name: "背割堤（八幡）", tag: "可選一日", station: "京阪石清水八幡宮", maps: "背割堤 八幡", note: "約 1.4 km 染井吉野隧道。平日尚可，櫻花祭會塞。" },
    { name: "善峯寺（西山）", tag: "可選一日", station: "阪急巴士", maps: "善峯寺 京都", note: "比嵐山靜。斜坡要腳力。" },
    { name: "嵐山公園龜山展望台", tag: "可選一日", maps: "亀山展望台 嵐山", note: "嵐山入面山櫻遠景口袋。仍要避開渡月橋／竹林人潮。" }
  ]
};

function loadTodos() {
  try {
    return JSON.parse(localStorage.getItem("alpen2027-todos") || "{}");
  } catch {
    return {};
  }
}

function saveTodos(state) {
  localStorage.setItem("alpen2027-todos", JSON.stringify(state));
}

function renderHome() {
  return `
    <section class="hero">
      <h2>大阪 → 京都 → 立山黑部 → 長野 → 東京</h2>
      <p>2027 行程規劃，日期未定。同 2026 年 11 月 24–30 日東京行分開。費用同評分大約係 2026 年末資料，出發前再核。櫻花正式 2027 予想暫時唔追蹤。</p>
      <div class="route">
        <span>大阪</span><i>→</i><span>京都</span><i>→</i><span>富山側進立山</span><i>→</i><span>扇沢／長野出</span><i>→</i><span>東京</span>
      </div>
    </section>
    <div class="grid-2">
      <a class="jump" href="#" data-go="tickets"><b>票務</b><span>北陸拱型 Pass 7 日，約 ¥35,000</span></a>
      <a class="jump" href="#" data-go="kyoto"><b>京都櫻花</b><span>必去、穴場、一日串法</span></a>
      <a class="jump" href="#" data-go="alps"><b>阿爾卑斯</b><span>富山、雪之大谷、長野</span></a>
      <a class="jump" href="#" data-go="todo"><b>待辦</b><span>Pass、通票、住宿、日期</span></a>
    </div>
    <article class="card">
      <h3>主力票</h3>
      <p><strong>Hokuriku Arch Pass（北陸拱型）7 日</strong>，約 ¥35,000。呢條線唔使買全國 Japan Rail Pass，亦唔使「立山黒部アルペンフリーきっぷ」（嗰張係名古屋路線）。</p>
      <p>阿爾卑斯路線通票、富山地鐵、扇沢巴士都要另付。</p>
    </article>
    <article class="card">
      <h3>開山／季節</h3>
      <ul>
        <li>阿爾卑斯通常約 4 月中至 11 月</li>
        <li>雪之大谷 Walk 慣例約 4 月 15 日至 6 月 25 日；2027 正式未公佈</li>
        <li>4 月初通常未開全線</li>
        <li>阿爾卑斯全日大約 6–8 小時；建議長野過夜再去東京</li>
      </ul>
    </article>
    <p class="fine">資料來源：日本通🇯🇵 建議（2026 年 11 月 9 日）。記錄原頁仍喺 Notion，呢個係獨立網頁版。</p>
  `;
}

function renderTickets() {
  return `
    <article class="card">
      <h3>Hokuriku Arch Pass 7 日</h3>
      <p>約 ¥35,000。指定席普通車可預約，以官方為準。</p>
      <p><strong>包：</strong>大阪↔京都 JR；京都→敦賀（サンダーバード）→富山（北陸新幹線つるぎ）；長野→東京（北陸新幹線）。KIX はるか／成田 N’EX／羽田單軌視情況可用。</p>
      <p><strong>唔包：</strong>東海道新幹線東京↔京都、富山地方鐵道、阿爾卑斯路線本身、扇沢→長野／信濃大町 Alpico 巴士。</p>
    </article>
    <article class="card">
      <h3>一定要另買</h3>
      <ul>
        <li>立山黒部アルペンルート通票（立山↔扇沢）</li>
        <li>電鉄富山→立山</li>
        <li>扇沢→長野／信濃大町巴士</li>
      </ul>
      <p>可先網上訂立山→美女平、扇沢→黑部壩時段。富山側纜車較緊，扇沢較易入。</p>
    </article>
    <p class="section-label">京都 → 富山側進立山（最快）</p>
    <article class="card">
      <ol>
        <li>京都 → 敦賀：特急サンダーバード（約 50–55 分）</li>
        <li>敦賀 → 富山：北陸新幹線つるぎ（約 1 小時 20 分）</li>
        <li>京都站全程約 <strong>2–2.5 小時</strong>到富山</li>
        <li>步行去電鉄富山，私鐵立山線到立山站（約 1 小時）— 唔包 Arch Pass，另買</li>
        <li>之後纜車／巴士／無軌電車行阿爾卑斯，另買通票</li>
      </ol>
    </article>
    <article class="card">
      <h3>另一邊（長野側，較慢）</h3>
      <p>京都 → 名古屋（新幹線）→ 松本（信濃）→ 信濃大町（大糸線）→ 巴士扇沢，約 <strong>4 小時</strong>。Arch Pass／JR 通常包到信濃大町一帶（以官方為準），扇沢巴士同阿爾卑斯路線另付。</p>
    </article>
    <div class="links">
      <a href="https://www.jreast.co.jp/multi/pass/hokurikuarch.html" target="_blank" rel="noopener">官方 Arch Pass</a>
      <a href="https://www.japan-guide.com/e/e7551.html" target="_blank" rel="noopener">Japan Guide：立山黑部阿爾卑斯路線</a>
      <a href="https://www.japan-guide.com/e/e7552.html" target="_blank" rel="noopener">Japan Guide：交通與通票</a>
      <a href="https://www.alpen-route.com/enjoy_navi/snow_otani/" target="_blank" rel="noopener">雪之大谷官方頁</a>
    </div>
  `;
}

function renderKyoto(filter) {
  const chips = [
    ["must", "必去級"],
    ["more", "熱門次選"],
    ["secret", "秘景／穴場"],
    ["plan", "一日串法"]
  ].map(([id, label]) => `<button class="chip ${filter === id ? "is-on" : ""}" data-kyoto="${id}" type="button">${label}</button>`).join("");

  let body = "";
  if (filter === "plan") {
    body = `
      <article class="card">
        <h3>一日串法</h3>
        <ul>
          <li><strong>東山：</strong>清水 → 圓山 → 白川</li>
          <li><strong>岡崎：</strong>哲學之道 → 蹴上 → 平安神宮</li>
          <li><strong>西北遲開：</strong>平野 → 仁和寺</li>
          <li><strong>西：</strong>嵐山全日</li>
          <li><strong>東南半日：</strong>醍醐寺</li>
          <li><strong>地鐵日（穴場）：</strong>西陣＋半木</li>
          <li><strong>東邊日（穴場）：</strong>山科疏水 → 毘沙門堂（±大石）</li>
        </ul>
        <p>主花見頃約 3 月底至 4 月初；全部人山人海，朝早係唯一軟招。平日朝早 9–10 點前更好。</p>
      </article>
      <article class="card">
        <h3>關西／關東櫻花平年</h3>
        <p>正式 2027 予想未出，暫時唔追蹤予想。</p>
        <div class="table-wrap">
          <table>
            <thead><tr><th>城市</th><th>開花（平年）</th><th>滿開（平年）</th></tr></thead>
            <tbody>
              <tr><td>東京</td><td>約 3/24</td><td>約 3/31</td></tr>
              <tr><td>京都</td><td>約 3/26</td><td>約 4/4</td></tr>
              <tr><td>大阪</td><td>約 3/27</td><td>約 4/4</td></tr>
            </tbody>
          </table>
        </div>
      </article>
      <article class="card">
        <h3>唔當秘景</h3>
        <p>原谷苑而家好塞。平野神社、仁和寺御室櫻係熱點／遲開有用，但唔算穴場。岡崎疏水主線都唔算秘景。</p>
      </article>
    `;
  } else {
    const note = filter === "secret"
      ? "避開哲學之道、嵐山本線、圓山、清水旺時。費用近年參考，2027 再核。"
      : "來源：京都旅遊／JNTO／寺社官網。費用近年參考，2027 再核。盡量寫地鐵／JR／巴士站。";
    body = `<p class="note">${note}</p>` + KYOTO[filter].map(placeCard).join("");
  }

  return `
    <div class="chips">${chips}</div>
    ${body}
    <div class="links">
      <a href="https://ja.kyoto.travel/flower/sakura/" target="_blank" rel="noopener">京都 桜だより</a>
      <a href="https://kyoto.travel/en/travel-inspiration/cherry-blossoms/" target="_blank" rel="noopener">京都旅遊 cherry blossoms</a>
    </div>
  `;
}

function renderAlps(sub) {
  const chips = [
    ["toyama", "富山縣"],
    ["snow", "雪之大谷"],
    ["nagano", "長野縣"]
  ].map(([id, label]) => `<button class="chip ${sub === id ? "is-on" : ""}" data-alps="${id}" type="button">${label}</button>`).join("");

  const pages = {
    toyama: `
      <p class="note">評分約 2026 末，出發前再核。富山側進立山黑部阿爾卑斯。</p>
      <article class="card">
        <h3>必食</h3>
        <p>富山灣海鮮丼、白えび、ほたるいか（約 3–5 月）、ます寿司、富山灣鮨。次選黑拉麵。</p>
      </article>
      <article class="card">
        <h3>餐廳（站前）</h3>
        <ul>
          <li><strong>白えび亭</strong>（とやマルシェ）— Tabelog 約 3.49／Google 約 4.1</li>
          <li><strong>廻転とやま鮨 富山駅前</strong> — 中英菜單、電子支付</li>
          <li><strong>とやま鮨 海富山</strong> — MAROOT 4F</li>
          <li><strong>炙庵 とやま鮨</strong></li>
          <li><strong>ぎょっこ</strong>（Marié）</li>
          <li><strong>ますのすし本舗 源</strong> — 買走</li>
        </ul>
      </article>
      <article class="card">
        <h3>景點同節奏</h3>
        <ul>
          <li>富岩運河環水公園、富山ガラス美術館（多水曜休；電車連站）</li>
          <li>宇奈月／黑部峽谷係另日，唔等於阿爾卑斯</li>
          <li>高岡／五箇山唔係阿爾卑斯朝早必去</li>
          <li>前一晚：海鮮＋環水；朝早電鉄富山 → 立山約 50–70 分</li>
          <li>JR ↔ 電鉄最少預留 10 分</li>
        </ul>
      </article>
    `,
    snow: `
      <p class="note"><strong>2027 正式日程官方未公佈。</strong>以下慣例跟 2026，以官方為準。</p>
      <article class="card">
        <h3>日程（慣例／2026 實績）</h3>
        <ul>
          <li>全線開通約 4 月 15 日</li>
          <li>雪之大谷 Walk 約 4 月 15 日至 6 月 25 日</li>
          <li>網上寫 2027「4/15–6/25」多數係估</li>
          <li>Walk 常見 9:30–15:00；入場免費，阿爾卑斯車資另計</li>
          <li>4 月初通常未開；開通後先有 Walk</li>
          <li>雪之大谷期間無黑部壩觀光放水（放水常見約 6 月 26 日起）</li>
        </ul>
      </article>
      <article class="card">
        <h3>雪壁高度</h3>
        <ul>
          <li>開通直後最高；10 年平均約 15–16 m</li>
          <li>2026 開通日約 12 m（近年偏矮；2021 曾約 20 m）</li>
          <li>4 月中至黃金週：最高／最塞</li>
          <li>5 月中：約 10 m，較舒服</li>
          <li>6 月：約 5–8 m</li>
        </ul>
      </article>
      <article class="card">
        <h3>票務同服裝</h3>
        <ul>
          <li>WEB 票提前；富山側纜車緊，扇沢較易入</li>
          <li>室堂 4 月仍凍：羽絨＋防水鞋</li>
          <li>惡劣天氣可縮短或停 Walk</li>
        </ul>
      </article>
      <div class="links">
        <a href="https://www.alpen-route.com/enjoy_navi/snow_otani/" target="_blank" rel="noopener">雪之大谷官方頁</a>
      </div>
    `,
    nagano: `
      <p class="note">評分約 2026 末，出發前再核。阿爾卑斯扇沢出 → 長野 overnight → 東京。</p>
      <article class="card">
        <h3>必食</h3>
        <p>信州そば、おやき、信州牛、りんご製品。</p>
      </article>
      <article class="card">
        <h3>餐廳</h3>
        <ul>
          <li><strong>草笛</strong> — MIDORI 3F（核桃蕎麥最穩）</li>
          <li><strong>ぼっち</strong> — Plaza Hotel B1（現金多）</li>
          <li><strong>小川の庄おやき村</strong> — MIDORI 2F</li>
          <li><strong>藤木庵／丸清</strong> — 配善光寺朝</li>
        </ul>
      </article>
      <article class="card">
        <h3>景點同節奏</h3>
        <ul>
          <li>善光寺朝早＋仲見世</li>
          <li>松本／白馬／地獄谷係另日</li>
          <li>扇沢巴士常約 17:00 末班，約 18:45 到長野東口（確認當年）</li>
          <li>巴士唔包 Arch Pass</li>
          <li>翌朝：善光寺 → 新幹線東京約 1.5–2 小時</li>
        </ul>
      </article>
    `
  };

  return `<div class="chips">${chips}</div>${pages[sub]}`;
}

function renderTodo() {
  const state = loadTodos();
  const done = TODOS.filter((t) => state[t.id]).length;
  const items = TODOS.map((t) => {
    const on = !!state[t.id];
    return `<button class="todo-item ${on ? "is-done" : ""}" data-todo="${t.id}" type="button">
      <span class="check" aria-hidden="true"></span>
      <span>${escapeHtml(t.label)}</span>
    </button>`;
  }).join("");
  return `<p class="progress">已完成 ${done}／${TODOS.length}。剔咗會存喺呢部手機，唔會同步去 Notion。</p>${items}`;
}

let tab = "home";
let kyotoFilter = "must";
let alpsSub = "toyama";

function render() {
  document.getElementById("page-title").textContent = TITLES[tab];
  const app = document.getElementById("app");
  if (tab === "home") app.innerHTML = renderHome();
  else if (tab === "tickets") app.innerHTML = renderTickets();
  else if (tab === "kyoto") app.innerHTML = renderKyoto(kyotoFilter);
  else if (tab === "alps") app.innerHTML = renderAlps(alpsSub);
  else app.innerHTML = renderTodo();
  window.scrollTo(0, 0);
}

function setTab(next) {
  tab = next;
  document.querySelectorAll(".tab").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.tab === tab);
  });
  render();
}

document.querySelector(".tabbar").addEventListener("click", (e) => {
  const btn = e.target.closest(".tab");
  if (btn) setTab(btn.dataset.tab);
});

document.getElementById("app").addEventListener("click", (e) => {
  const go = e.target.closest("[data-go]");
  if (go) {
    e.preventDefault();
    setTab(go.dataset.go);
    return;
  }
  const k = e.target.closest("[data-kyoto]");
  if (k) {
    kyotoFilter = k.dataset.kyoto;
    render();
    return;
  }
  const a = e.target.closest("[data-alps]");
  if (a) {
    alpsSub = a.dataset.alps;
    render();
    return;
  }
  const t = e.target.closest("[data-todo]");
  if (t) {
    const state = loadTodos();
    state[t.dataset.todo] = !state[t.dataset.todo];
    saveTodos(state);
    render();
  }
});

const banner = document.getElementById("install-banner");
const standalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;
if (!standalone && !localStorage.getItem("alpen2027-hide-install")) {
  banner.hidden = false;
}
document.getElementById("dismiss-install").addEventListener("click", () => {
  banner.hidden = true;
  localStorage.setItem("alpen2027-hide-install", "1");
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js");
}

render();
