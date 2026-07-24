(function(){
  var TAXONOMY = [
    { group: "Kochen & Backen", items: [
      { name: "Heißluftfritteusen", href: "heissluftfritteusen.html", live: true },
      { name: "Brotbackautomaten", href: "brotbackautomaten.html", live: true },
      { name: "Backöfen & Minibacköfen", href: "bald-verfuegbar.html?name=Backöfen%20%26%20Minibacköfen", live: false },
      { name: "Töpfe & Pfannen", href: "bald-verfuegbar.html?name=Töpfe%20%26%20Pfannen", live: false },
      { name: "Küchenmesser", href: "bald-verfuegbar.html?name=Küchenmesser", live: false }
    ]},
    { group: "Kaffee & Getränke", items: [
      { name: "Kaffeevollautomaten", href: "kaffeevollautomaten.html", live: true },
      { name: "Wasserkocher", href: "wasserkocher.html", live: true },
      { name: "Toaster", href: "bald-verfuegbar.html?name=Toaster", live: false },
      { name: "Filterkaffeemaschinen", href: "bald-verfuegbar.html?name=Filterkaffeemaschinen", live: false }
    ]},
    { group: "Mixen & Verarbeiten", items: [
      { name: "Küchenmaschinen", href: "kuechenmaschinen.html", live: true },
      { name: "Standmixer", href: "standmixer.html", live: true },
      { name: "Hand- & Stabmixer", href: "bald-verfuegbar.html?name=Hand-%20%26%20Stabmixer", live: false },
      { name: "Entsafter", href: "bald-verfuegbar.html?name=Entsafter", live: false }
    ]},
    { group: "Küchenhelfer & Organisation", items: [
      { name: "Küchenwaagen", href: "bald-verfuegbar.html?name=Küchenwaagen", live: false },
      { name: "Schneidebretter", href: "bald-verfuegbar.html?name=Schneidebretter", live: false },
      { name: "Vorratsdosen", href: "bald-verfuegbar.html?name=Vorratsdosen", live: false }
    ]}
  ];
  window.KUECHENKOMPASS_TAXONOMY = TAXONOMY;

  function renderMegaMenu(){
    var mount = document.getElementById('megamenu');
    if (!mount) return;
    var html = '';
    TAXONOMY.forEach(function(g){
      html += '<details><summary>' + g.group + '</summary><div class="panel">';
      g.items.forEach(function(it){
        html += '<a href="' + it.href + '">' + it.name + (it.live ? '' : ' <span class="soon">Bald</span>') + '</a>';
      });
      html += '</div></details>';
    });
    mount.innerHTML = html;

    document.addEventListener('click', function(e){
      mount.querySelectorAll('details[open]').forEach(function(d){
        if (!d.contains(e.target)) d.removeAttribute('open');
      });
    });
    mount.querySelectorAll('details').forEach(function(d){
      d.addEventListener('toggle', function(){
        if (d.open) {
          mount.querySelectorAll('details').forEach(function(other){
            if (other !== d) other.removeAttribute('open');
          });
        }
      });
    });
  }

  function renderSearch(){
    var input = document.getElementById('siteSearch');
    var results = document.getElementById('searchResults');
    if (!input || !results) return;
    var flat = [];
    TAXONOMY.forEach(function(g){
      g.items.forEach(function(it){
        flat.push({ name: it.name, href: it.href, group: g.group, live: it.live });
      });
    });

    function render(list){
      if (!list.length) {
        results.innerHTML = '<div class="search-empty">Keine Treffer. Versuch es mit einem anderen Begriff.</div>';
        return;
      }
      results.innerHTML = list.map(function(it){
        return '<a href="' + it.href + '"><span>' + it.name + (it.live ? '' : ' <span class="soon" style="color:rgba(32,30,29,.4);font-weight:700;font-size:10px;text-transform:uppercase;">Bald</span>') + '</span><span class="group">' + it.group + '</span></a>';
      }).join('');
    }

    input.addEventListener('input', function(){
      var q = input.value.trim().toLowerCase();
      if (!q) { results.classList.remove('active'); return; }
      var matches = flat.filter(function(it){ return it.name.toLowerCase().indexOf(q) !== -1; });
      render(matches);
      results.classList.add('active');
    });
    input.addEventListener('focus', function(){
      if (input.value.trim()) results.classList.add('active');
    });
    document.addEventListener('click', function(e){
      if (!input.contains(e.target) && !results.contains(e.target)) results.classList.remove('active');
    });
  }

  document.addEventListener('DOMContentLoaded', function(){
    renderMegaMenu();
    renderSearch();
  });
})();
