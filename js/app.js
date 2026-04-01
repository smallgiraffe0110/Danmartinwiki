// DanMartin Wiki - Search & Navigation

const wikiEntries = [
  {
    title: "Dan Martin (cyclist)",
    url: "pages/dan-martin-cyclist.html",
    snippet: "Irish-Spanish professional road racing cyclist. Winner of multiple Grand Tour stages.",
    keywords: "cyclist cycling tour de france giro vuelta road racing bicycle ireland spain"
  },
  {
    title: "Dan Martin (actor)",
    url: "pages/dan-martin-actor.html",
    snippet: "American actor known for The Bold and the Beautiful and Heat (1995). Born Jacob Daniel Martin.",
    keywords: "actor bold beautiful heat television film hollywood ella joyce naacp"
  },
  {
    title: "Dan Martin (teacher)",
    url: "pages/dan-martin-teacher.html",
    snippet: "Daniel E. Martin, Ph.D., Theology teacher at St. Xavier High School in Louisville, Kentucky.",
    keywords: "teacher saint xavier high school education theology louisville kentucky university dayton phd"
  },
  {
    title: "Dan Martin (journalist)",
    url: "pages/dan-martin-journalist.html",
    snippet: "American journalist known for coverage in the New York Daily News during the Cold War era.",
    keywords: "journalist reporter newspaper new york daily news writer cold war"
  },
  {
    title: "Dan Martin (musician)",
    url: "pages/dan-martin-musician.html",
    snippet: "Musicians named Dan Martin across various genres and eras.",
    keywords: "musician singer songwriter music band artist performer"
  },
  {
    title: "Dan Martin (politician)",
    url: "pages/dan-martin-politician.html",
    snippet: "Political figures named Dan Martin in U.S. and international politics.",
    keywords: "politician politics government senator representative congress maine"
  },
  {
    title: "Daniel Martin (Governor of Maryland)",
    url: "pages/dan-martin-governor.html",
    snippet: "20th Governor of Maryland, serving 1829-1830 and 1831. His home 'The Wilderness' is on the National Register.",
    keywords: "governor maryland politician house delegates wilderness national register historical 1780 1831"
  }
];

// Adjust URLs based on current page location
function getBaseUrl() {
  const path = window.location.pathname;
  if (path.includes('/pages/')) {
    return '../';
  }
  return '';
}

function adjustUrl(url) {
  return getBaseUrl() + url;
}

// Search functionality
function initSearch() {
  const searchInput = document.getElementById('wiki-search-input');
  const searchBtn = document.getElementById('wiki-search-btn');
  const searchResults = document.getElementById('search-results');

  if (!searchInput) return;

  searchInput.addEventListener('input', function () {
    const query = this.value.toLowerCase().trim();
    if (query.length < 2) {
      searchResults.classList.remove('active');
      return;
    }

    const results = wikiEntries.filter(entry => {
      return entry.title.toLowerCase().includes(query) ||
        entry.snippet.toLowerCase().includes(query) ||
        entry.keywords.toLowerCase().includes(query);
    });

    if (results.length > 0) {
      searchResults.innerHTML = results.map(r =>
        `<div class="search-result-item">
          <a href="${adjustUrl(r.url)}">
            <div class="result-title">${highlightMatch(r.title, query)}</div>
            <div class="result-snippet">${highlightMatch(r.snippet, query)}</div>
          </a>
        </div>`
      ).join('');
    } else {
      searchResults.innerHTML = '<div class="search-no-results">No results found for "' + escapeHtml(query) + '"</div>';
    }

    searchResults.classList.add('active');
  });

  searchInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      const query = this.value.toLowerCase().trim();
      const results = wikiEntries.filter(entry =>
        entry.title.toLowerCase().includes(query) ||
        entry.snippet.toLowerCase().includes(query) ||
        entry.keywords.toLowerCase().includes(query)
      );
      if (results.length === 1) {
        window.location.href = adjustUrl(results[0].url);
      }
    }
  });

  searchBtn.addEventListener('click', function () {
    const query = searchInput.value.toLowerCase().trim();
    const results = wikiEntries.filter(entry =>
      entry.title.toLowerCase().includes(query) ||
      entry.snippet.toLowerCase().includes(query) ||
      entry.keywords.toLowerCase().includes(query)
    );
    if (results.length === 1) {
      window.location.href = adjustUrl(results[0].url);
    }
  });

  // Close search results when clicking outside
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.wiki-search')) {
      searchResults.classList.remove('active');
    }
  });
}

function highlightMatch(text, query) {
  const regex = new RegExp('(' + escapeRegex(query) + ')', 'gi');
  return text.replace(regex, '<strong>$1</strong>');
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Random Dan Martin
function randomDanMartin() {
  const idx = Math.floor(Math.random() * wikiEntries.length);
  window.location.href = adjustUrl(wikiEntries[idx].url);
}

// TOC toggle
function toggleToc() {
  const tocList = document.getElementById('toc-list');
  const toggle = document.getElementById('toc-toggle');
  if (tocList.style.display === 'none') {
    tocList.style.display = 'block';
    toggle.textContent = '[hide]';
  } else {
    tocList.style.display = 'none';
    toggle.textContent = '[show]';
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', function () {
  initSearch();

  // Wire up random article links
  document.querySelectorAll('.random-dan-martin').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      randomDanMartin();
    });
  });
});
