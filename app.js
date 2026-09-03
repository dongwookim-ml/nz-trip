(function () {
  const app = document.getElementById('app');
  let liveMaps = [];

  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const mapsUrl = (q) => 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q);
  const dayLabel = (d) => `${d.month}월 ${d.day}일 (${d.dow})`;

  const GESTURE_TEXT = {
    touch: '두 손가락으로 지도를 움직이세요',
    scroll: 'Ctrl 키를 누른 채 스크롤하면 확대됩니다',
    scrollMac: '⌘ 키를 누른 채 스크롤하면 확대됩니다',
  };

  function baseMap(el) {
    const map = L.map(el, { gestureHandling: true, gestureHandlingOptions: { text: GESTURE_TEXT, duration: 1200 } });
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
    liveMaps.push(map);
    return map;
  }

  function stayIcon(label, air) {
    return L.divIcon({ className: '', html: `<div class="stay-pin${air ? ' air' : ''}"><span>${esc(label)}</span></div>`, iconSize: [30, 30], iconAnchor: [15, 30], popupAnchor: [0, -28] });
  }
  function spotIcon(n) {
    return L.divIcon({ className: '', html: `<div class="spot-pin">${n}</div>`, iconSize: [26, 26], iconAnchor: [13, 13], popupAnchor: [0, -14] });
  }

  function overviewMap(el) {
    const map = baseMap(el);
    const layers = [];
    TRIP.legs.forEach((leg) => {
      const r = ROUTES[leg.id];
      if (!r) return;
      const line = L.polyline(r.latlngs, { color: leg.dayTrip ? '#d9822b' : '#1f7a6a', weight: 4, opacity: 0.9, dashArray: leg.dayTrip ? '8 8' : null });
      line.addTo(map).bindPopup(`<b>${esc(leg.label)}</b>약 ${r.km} km · ${fmtMin(r.min)}`);
      layers.push(line);
    });
    TRIP.pins.forEach((p) => {
      const m = L.marker([p.lat, p.lng], { icon: p.trip ? spotIcon(p.label) : stayIcon(p.label, p.air), zIndexOffset: p.trip ? 100 : 500 }).addTo(map);
      m.bindPopup(`<b>${esc(p.name)}</b>${esc(p.note)}`);
      layers.push(m);
    });
    map.fitBounds(L.featureGroup(layers).getBounds().pad(0.06));
  }

  function dayMap(el, d) {
    const map = baseMap(el);
    const layers = [];
    (d.legs || []).forEach((id) => {
      const r = ROUTES[id];
      if (!r) return;
      const leg = TRIP.legs.find((l) => l.id === id) || {};
      const line = L.polyline(r.latlngs, { color: leg.dayTrip ? '#d9822b' : '#1f7a6a', weight: 4, opacity: 0.85, dashArray: leg.dayTrip ? '8 8' : null });
      line.addTo(map);
      layers.push(line);
    });
    d.spots.forEach((s, i) => {
      if (s.lat == null) return;
      const m = L.marker([s.lat, s.lng], { icon: spotIcon(i + 1) }).addTo(map);
      m.bindPopup(`<b>${i + 1}. ${esc(s.name)}</b>${esc(s.en || '')}`);
      layers.push(m);
    });
    const stay = TRIP.stays[d.stay];
    if (stay) {
      const m = L.marker([stay.lat, stay.lng], { icon: stayIcon('숙'), zIndexOffset: 500 }).addTo(map);
      m.bindPopup(`<b>숙소 · ${esc(stay.name)}</b>${esc(stay.addr)}`);
      layers.push(m);
    }
    if (layers.length) map.fitBounds(L.featureGroup(layers).getBounds().pad(0.15));
  }

  function fmtMin(min) {
    const h = Math.floor(min / 60), m = min % 60;
    return (h ? `${h}시간 ` : '') + (m ? `${m}분` : '');
  }

  // ---------- Home ----------
  function renderHome() {
    const flights = TRIP.flights.map((f) => `
      <div class="flight">
        <div><div class="code">${esc(f.from)}</div><div class="place">${esc(f.fromName)}</div><div class="time">${esc(f.dep)}</div></div>
        <div class="arrow"><b>→</b>${esc(f.dur)}</div>
        <div class="right"><div class="code">${esc(f.to)}</div><div class="place">${esc(f.toName)}</div><div class="time">${esc(f.arr)}</div></div>
        <div class="date">${esc(f.date)} · ${esc(f.who)}</div>
      </div>`).join('');

    const days = TRIP.days.map((d) => `
      <a class="card day-card" href="#/day/${d.n}">
        <div class="thumb"><img src="${esc(d.cover)}" alt="" loading="lazy"></div>
        <div class="body">
          <div class="n">DAY ${d.n}<em>${dayLabel(d)}</em></div>
          <h3>${esc(d.title)}</h3>
          <div class="desc">${esc(d.short)}</div>
          <span class="pill">🏕 ${esc(d.stayLabel)}</span>
        </div>
      </a>`).join('');

    app.innerHTML = `
      <div class="hero">
        <img src="${esc(TRIP.hero.img)}" alt="">
        <div class="shade"></div>
        <div class="text">
          <div class="eyebrow">${esc(TRIP.subtitle)}</div>
          <h1>${esc(TRIP.title)}</h1>
          <div class="dates">${esc(TRIP.dates)}</div>
        </div>
      </div>
      <div class="wrap">
        <div class="section">
          <div class="section-title">🗺 전체 이동 경로 <span class="sub">퀸스타운 IN → 크라이스트처치 OUT</span></div>
          <div class="card">
            <div id="overview-map" class="map"></div>
            <div class="legend"><span><i></i>숙소 간 이동</span><span><i class="dash"></i>당일 왕복</span><span>📍 숫자 = 숙소 순서</span></div>
          </div>
        </div>
        <div class="section">
          <div class="section-title">📅 일자별 일정 <span class="sub">날짜를 누르면 상세 일정이 열립니다</span></div>
          <div class="day-list">${days}</div>
        </div>
        <div class="section link-list">
          <a class="card link-card" href="#/packing">
            <div class="icon">🎒</div>
            <div class="body"><div class="t">준비물 가이드</div><div class="d">서류·옷·약 체크리스트 · 우리 가족과 부모님 따로</div></div>
            <div class="arr">›</div>
          </a>
          <a class="card link-card" href="#/shopping">
            <div class="icon">🛒</div>
            <div class="body"><div class="t">장보기 가이드</div><div class="d">첫날 퀸스타운 장보기 체크리스트 · 마트 위치 · 알아두기</div></div>
            <div class="arr">›</div>
          </a>
        </div>
        <div class="section">
          <div class="section-title">✈️ 항공편</div>
          <div class="card">${flights}</div>
        </div>
        <div class="section">
          <div class="section-title">🚐 캠핑카</div>
          <div class="card card-body">
            <div><b>${esc(TRIP.camper.name)}</b></div>
            <div style="color:var(--muted);font-size:15px;margin-top:4px">${esc(TRIP.camper.note)}</div>
            <div class="info links" style="padding:0"><a class="chip" href="${esc(TRIP.camper.link)}" target="_blank" rel="noopener">예약 정보 보기</a></div>
          </div>
        </div>
        <div class="footer">사진 출처: <a href="#/credits">위키미디어 공용 (Wikimedia Commons)</a> · 지도: OpenStreetMap<br>일정과 시간은 현지 상황에 따라 달라질 수 있어요.</div>
      </div>`;
    overviewMap(document.getElementById('overview-map'));
  }

  // ---------- Day ----------
  function renderDay(n) {
    const d = TRIP.days.find((x) => x.n === n);
    if (!d) { location.hash = '#/'; return; }
    const prev = TRIP.days.find((x) => x.n === n - 1);
    const next = TRIP.days.find((x) => x.n === n + 1);
    const stay = TRIP.stays[d.stay];

    const spots = d.spots.map((s, i) => `
      <div class="card spot">
        <div class="img">
          ${s.img ? `<img src="${esc(s.img)}" alt="${esc(s.name)}" loading="lazy">` : ''}
          <div class="num">${i + 1}</div>
          ${s.tag ? `<div class="tag">${esc(s.tag)}</div>` : ''}
        </div>
        <div class="body">
          <h3>${esc(s.name)}</h3>
          ${s.en ? `<div class="en">${esc(s.en)}</div>` : ''}
          <p>${esc(s.desc)}</p>
          ${s.meta ? `<div class="meta">⏱ ${esc(s.meta)}</div>` : ''}
          <div class="actions">
            ${s.page ? `<a class="chip" href="${esc(s.page)}">${esc(s.pageLabel || '자세히 보기')}</a>` : ''}
            ${s.maps ? `<a class="chip" href="${mapsUrl(s.maps)}" target="_blank" rel="noopener">📍 구글 지도</a>` : ''}
            ${s.link ? `<a class="chip grey" href="${esc(s.link)}" target="_blank" rel="noopener">🔗 ${esc(s.linkLabel || '홈페이지')}</a>` : ''}
          </div>
        </div>
      </div>`).join('');

    const drive = d.drive ? `
      <div class="card info">
        <div class="label">🚐 오늘의 이동</div>
        <div class="value">${esc(d.drive.title)}</div>
        <div class="note">${esc(d.drive.note)}</div>
      </div>` : '';

    const stayHtml = stay ? `
      <div class="card info">
        <div class="label">🏕 숙소 · ${esc(d.stayLabel)}</div>
        <div class="value">${esc(stay.name)}</div>
        <div class="note">${esc(stay.addr)}${stay.note ? '<br>' + esc(stay.note) : ''}</div>
        <div class="links">
          <a class="chip" href="${mapsUrl(stay.addr)}" target="_blank" rel="noopener">📍 구글 지도</a>
          ${stay.phone ? `<a class="chip grey" href="tel:${esc(stay.phone.replace(/\s/g, ''))}">📞 ${esc(stay.phone)}</a>` : ''}
          ${stay.link ? `<a class="chip grey" href="${esc(stay.link)}" target="_blank" rel="noopener">🔗 홈페이지</a>` : ''}
        </div>
      </div>` : '';

    const tips = d.tips && d.tips.length ? `
      <div class="section"><div class="tips"><h3>⚠️ 참고사항</h3><ul>${d.tips.map((t) => `<li>${esc(t)}</li>`).join('')}</ul></div></div>` : '';

    app.innerHTML = `
      <div class="topbar"><div class="inner">
        <a class="btn" href="#/">← 전체 일정</a>
        <span style="font-weight:700;color:var(--accent)">DAY ${d.n} / ${TRIP.days.length}</span>
      </div></div>
      <div class="day-hero">
        <img src="${esc(d.cover)}" alt="">
        <div class="shade"></div>
        <div class="text">
          <div class="eyebrow">DAY ${d.n} · ${dayLabel(d)}</div>
          <h1>${esc(d.title)}</h1>
        </div>
      </div>
      <div class="wrap">
        <div class="section"><div class="summary">${esc(d.summary)}</div></div>
        <div class="section info-grid">${drive}${stayHtml}</div>
        ${d.spots.some((s) => s.lat != null) ? `
        <div class="section">
          <div class="section-title">🗺 오늘의 지도</div>
          <div class="card"><div id="day-map" class="map small"></div></div>
        </div>` : ''}
        <div class="section">
          <div class="section-title">📌 주요 일정 · 관광지</div>
          <div class="spots">${spots}</div>
        </div>
        ${tips}
        <div class="daynav">
          <a class="btn outline${prev ? '' : ' disabled'}" href="#/day/${prev ? prev.n : ''}">← DAY ${prev ? prev.n : ''}</a>
          <a class="btn outline${next ? '' : ' disabled'}" href="#/day/${next ? next.n : ''}">DAY ${next ? next.n : ''} →</a>
        </div>
        <div class="footer"><a href="#/">전체 일정으로 돌아가기</a></div>
      </div>`;
    const mapEl = document.getElementById('day-map');
    if (mapEl) dayMap(mapEl, d);
  }

  // ---------- Credits ----------
  function renderCredits() {
    const items = TRIP.credits.map((c) => `<li><a href="${esc(c.page)}" target="_blank" rel="noopener">${esc(c.title)}</a> — ${esc(c.author)} · ${esc(c.license)}</li>`).join('');
    app.innerHTML = `
      <div class="topbar"><div class="inner"><a class="btn" href="#/">← 전체 일정</a></div></div>
      <div class="wrap">
        <div class="section"><div class="section-title">사진 출처</div>
        <div class="card card-body credits">이 사이트의 사진은 위키미디어 공용(Wikimedia Commons)에 공개된 이미지를 사용했습니다.<ul>${items}</ul></div></div>
      </div>`;
  }

  // ---------- Checklists (shopping / packing) ----------
  function loadChecks(key) {
    try { const v = JSON.parse(localStorage.getItem(key)); return Array.isArray(v) ? v : []; } catch (e) { return []; }
  }
  function saveChecks(key, arr) {
    try { localStorage.setItem(key, JSON.stringify(arr)); } catch (e) { /* 저장 불가 시 화면 체크만 유지 */ }
  }
  function groupHtml(g, gi, checked) {
    return `
      <div class="card check-group">
        <div class="check-title"><h3>${esc(g.emoji)} ${esc(g.title)}</h3><span class="count" data-count="${gi}"></span></div>
        ${g.where ? `<div class="check-where">${esc(g.where)}</div>` : ''}
        ${g.items.map((it, ii) => {
          const id = `${gi}-${ii}`, on = checked.includes(id);
          return `
          <label class="check${on ? ' done' : ''}">
            <input type="checkbox" data-id="${id}"${on ? ' checked' : ''}>
            <span class="text"><span class="name">${esc(it.name)}</span>${it.qty ? `<span class="qty">${esc(it.qty)}</span>` : ''}${it.note ? `<span class="memo">${esc(it.note)}</span>` : ''}</span>
          </label>`;
        }).join('')}
      </div>`;
  }
  const checkHead = '<div class="check-head"><span id="check-total"></span><button class="btn outline" id="check-reset" type="button">체크 초기화</button></div>';
  // app 안에 렌더링된 체크리스트에 저장·카운트·초기화 동작을 붙인다
  function bindChecklist(groups, key, checked) {
    const total = groups.reduce((a, g) => a + g.items.length, 0);
    const totalEl = document.getElementById('check-total');
    const resetBtn = document.getElementById('check-reset');
    function update() {
      totalEl.textContent = `체크 ${checked.length} / 전체 ${total}`;
      groups.forEach((g, gi) => {
        const n = checked.filter((id) => id.indexOf(gi + '-') === 0).length;
        app.querySelector(`[data-count="${gi}"]`).textContent = `${n} / ${g.items.length}`;
      });
      resetBtn.disabled = checked.length === 0;
    }
    app.addEventListener('change', (e) => {
      const box = e.target;
      if (!box.matches('.check input[type=checkbox]')) return;
      const id = box.dataset.id;
      checked = checked.filter((x) => x !== id);
      if (box.checked) checked.push(id);
      box.closest('.check').classList.toggle('done', box.checked);
      saveChecks(key, checked);
      update();
    });
    resetBtn.addEventListener('click', () => {
      if (!checked.length || !confirm(`체크한 항목 ${checked.length}개를 모두 지울까요?`)) return;
      checked = [];
      saveChecks(key, checked);
      app.querySelectorAll('.check input[type=checkbox]').forEach((b) => { b.checked = false; b.closest('.check').classList.remove('done'); });
      update();
    });
    update();
  }
  const sourcesHtml = (list) => list.map((s) => `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.title)}</a>`).join(' · ');

  // ---------- Shopping ----------
  function renderShopping() {
    const sh = TRIP.shopping;
    const KEY = 'nz-shop-checks';
    const checked = loadChecks(KEY);

    const stores = sh.stores.map((st) => `
      <div class="card info">
        <div class="label">${esc(st.tag)}</div>
        <div class="value">${esc(st.name)}</div>
        <div class="note">${esc(st.addr)}${st.hours ? ' · ' + esc(st.hours) : ''}<br>${esc(st.desc)}</div>
        <div class="links">
          <a class="chip" href="${mapsUrl(st.maps)}" target="_blank" rel="noopener">📍 구글 지도</a>
          ${st.phone ? `<a class="chip grey" href="tel:${esc(st.phone.replace(/\s/g, ''))}">📞 ${esc(st.phone)}</a>` : ''}
          ${st.link ? `<a class="chip grey" href="${esc(st.link)}" target="_blank" rel="noopener">🔗 홈페이지</a>` : ''}
        </div>
      </div>`).join('');

    app.innerHTML = `
      <div class="topbar"><div class="inner">
        <a class="btn" href="#/">← 전체 일정</a>
        <a class="btn" href="#/day/1">DAY 1 →</a>
      </div></div>
      <div class="wrap">
        <h1 class="page-title">🛒 장보기 가이드</h1>
        <div class="summary">${esc(sh.intro)}</div>
        <div class="section">
          <div class="section-title">🏪 어디서 사나요</div>
          <div class="info-grid">${stores}</div>
        </div>
        <div class="section"><div class="tips"><h3>💡 알아두기</h3><ul>${sh.notes.map((t) => `<li>${esc(t)}</li>`).join('')}</ul></div></div>
        <div class="section">
          <div class="section-title">✅ 체크리스트 <span class="sub">5명 · 7박 기준 수량. 체크한 내용은 이 휴대폰에 저장돼요</span></div>
          ${checkHead}
          <div class="check-list">${sh.groups.map((g, gi) => groupHtml(g, gi, checked)).join('')}</div>
        </div>
        <div class="footer">확인일 ${esc(sh.verified)} · 매장 시간과 규정은 바뀔 수 있으니 출발 전 다시 확인하세요.<br>출처: ${sourcesHtml(sh.sources)}</div>
      </div>`;
    bindChecklist(sh.groups, KEY, checked);
  }

  // ---------- Packing ----------
  function renderPacking() {
    const pk = TRIP.packing;
    const KEY = 'nz-pack-checks';
    const checked = loadChecks(KEY);

    const sections = pk.sections.map((sec) => `
      <div class="section">
        <div class="section-title">${esc(sec.emoji)} ${esc(sec.title)} <span class="sub">${esc(sec.desc)}</span></div>
        <div class="check-list">${pk.groups.map((g, gi) => g.section === sec.key ? groupHtml(g, gi, checked) : '').join('')}</div>
      </div>`).join('');

    app.innerHTML = `
      <div class="topbar"><div class="inner">
        <a class="btn" href="#/">← 전체 일정</a>
        <a class="btn" href="#/shopping">🛒 장보기</a>
      </div></div>
      <div class="wrap">
        <h1 class="page-title">🎒 준비물 가이드</h1>
        <div class="summary">${esc(pk.intro)}</div>
        <div class="section"><div class="tips"><h3>🌤 2월 남섬 날씨</h3><ul>${pk.weather.map((t) => `<li>${esc(t)}</li>`).join('')}</ul></div></div>
        <div class="section">
          <div class="section-title">✅ 체크리스트 <span class="sub">체크한 내용은 이 휴대폰에 저장돼요</span></div>
          ${checkHead}
        </div>
        ${sections}
        <div class="section">
          <div class="section-title">🚐 차량 렌트에 포함된 키트 <span class="sub">캠핑카와 함께 빌린 것. 따로 챙기지 않아도 돼요</span></div>
          <div class="card">${pk.kits.map((k) => `<div class="kit"><b>${esc(k.name)}</b><span>${esc(k.desc)}</span>${k.note ? `<em>${esc(k.note)}</em>` : ''}</div>`).join('')}</div>
        </div>
        <div class="section"><div class="tips"><h3>❓ 확인이 필요한 것</h3><ul>${pk.checks.map((t) => `<li>${esc(t)}</li>`).join('')}</ul></div></div>
        <div class="footer">확인일 ${esc(pk.verified)} · 입국 규정과 수수료는 바뀔 수 있으니 출발 전 아래 공식 링크에서 다시 확인하세요.<br>출처: ${sourcesHtml(pk.sources)}</div>
      </div>`;
    bindChecklist(pk.groups, KEY, checked);
  }

  function render() {
    liveMaps.forEach((m) => m.remove());
    liveMaps = [];
    const h = location.hash || '#/';
    const m = h.match(/^#\/day\/(\d+)/);
    if (m) renderDay(parseInt(m[1], 10));
    else if (h.indexOf('#/credits') === 0) renderCredits();
    else if (h.indexOf('#/shopping') === 0) renderShopping();
    else if (h.indexOf('#/packing') === 0) renderPacking();
    else renderHome();
    window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', render);
  render();
})();
