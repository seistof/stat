const COMMENTS = true;

export function fillFilter(year, ministry, territory, program) {
  comment('fillFilters();');
  const y = document.querySelector('#select-year');
  const m = document.querySelector('#select-ministry');
  const t = document.querySelector('#select-territory');
  const p = document.querySelector('#select-program');
  y.innerHTML = `<option value="all">Все</option>`;
  m.innerHTML = `<option value="all">Все</option>`;
  t.innerHTML = `<option value="all">Все</option>`;
  p.innerHTML = `<option value="all">Все</option>`;
  year.forEach((e) => {
    y.innerHTML += `<option value="${e}">${e}</option>`;
  });
  ministry.forEach((e) => {
    m.innerHTML += `<option value="${e}">${e}</option>`;
  });
  territory.forEach((e) => {
    t.innerHTML += `<option value="${e}">${e}</option>`;
  });
  program.forEach((e) => {
    p.innerHTML += `<option value="${e}">${e}</option>`;
  });
}

export function comment(text) {
  if (COMMENTS) {
    console.log(`+++ ${text}`);
  }
}
