function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState,
  useEffect,
  useMemo,
  useCallback
} = React;
const demoReleases = [{
  "id": 1,
  "title": "Lagune",
  "artist_name": "Aya Nova",
  "artist_alias": "Aya Nova",
  "owner_email": "artiste1@example.com",
  "release_type": "Single",
  "release_date": "2026-12-12",
  "timing_status": "Préavis conforme",
  "status": "received",
  "pending_corrections": 0,
  "created_at": "2026-10-12 09:30:00",
  "payload": "{\"genre\": \"Afropop\", \"mood\": \"Énergique\", \"upc\": \"0000000000000\", \"artists\": [{\"id\": 1, \"name\": \"Aya Nova\", \"spotify\": \"\", \"noSpotify\": true}], \"tracks\": [{\"id\": 1, \"title\": \"Lagune\", \"main\": \"Aya Nova\", \"isrc\": \"CI-DEMO-26-00001\", \"master\": \"demo/master.wav\", \"feats\": [], \"credits\": {\"beatmakers\": [{\"id\": 1, \"name\": \"Studio Démo\"}], \"authors\": [{\"id\": 1, \"name\": \"Aya Nova\"}], \"composers\": [{\"id\": 1, \"name\": \"Aya Nova\"}], \"sessionArtists\": []}, \"version\": \"Original\", \"explicit\": \"Non\", \"language\": \"Français\"}], \"cover\": \"demo/cover.tiff\", \"photos\": \"\", \"press\": \"\", \"pitch\": \"Une nouvelle création aux couleurs d’Abidjan. Ce dossier est fictif et sert uniquement à présenter le parcours de distribution.\", \"priority\": \"Lagune\", \"urgent\": false, \"confirmed\": true}",
  "corrections": []
}, {
  "id": 2,
  "title": "Minuit à Abidjan",
  "artist_name": "Kéa",
  "artist_alias": "Kéa",
  "owner_email": "artiste2@example.com",
  "release_type": "EP",
  "release_date": "2026-12-13",
  "timing_status": "Préavis conforme",
  "status": "in_review",
  "pending_corrections": 0,
  "created_at": "2026-10-12 09:30:00",
  "payload": "{\"genre\": \"Afropop\", \"mood\": \"Énergique\", \"upc\": \"0000000000000\", \"artists\": [{\"id\": 1, \"name\": \"Kéa\", \"spotify\": \"\", \"noSpotify\": true}], \"tracks\": [{\"id\": 1, \"title\": \"Minuit à Abidjan\", \"main\": \"Kéa\", \"isrc\": \"CI-DEMO-26-00001\", \"master\": \"demo/master.wav\", \"feats\": [], \"credits\": {\"beatmakers\": [{\"id\": 1, \"name\": \"Studio Démo\"}], \"authors\": [{\"id\": 1, \"name\": \"Kéa\"}], \"composers\": [{\"id\": 1, \"name\": \"Kéa\"}], \"sessionArtists\": []}, \"version\": \"Original\", \"explicit\": \"Non\", \"language\": \"Français\"}], \"cover\": \"demo/cover.tiff\", \"photos\": \"\", \"press\": \"\", \"pitch\": \"Une nouvelle création aux couleurs d’Abidjan. Ce dossier est fictif et sert uniquement à présenter le parcours de distribution.\", \"priority\": \"Minuit à Abidjan\", \"urgent\": false, \"confirmed\": true}",
  "corrections": []
}, {
  "id": 3,
  "title": "Soleil rouge",
  "artist_name": "Nalo",
  "artist_alias": "Nalo",
  "owner_email": "artiste3@example.com",
  "release_type": "Single",
  "release_date": "2026-12-14",
  "timing_status": "Préavis conforme",
  "status": "corrections_requested",
  "pending_corrections": 1,
  "created_at": "2026-10-12 09:30:00",
  "payload": "{\"genre\": \"Afropop\", \"mood\": \"Énergique\", \"upc\": \"0000000000000\", \"artists\": [{\"id\": 1, \"name\": \"Nalo\", \"spotify\": \"\", \"noSpotify\": true}], \"tracks\": [{\"id\": 1, \"title\": \"Soleil rouge\", \"main\": \"Nalo\", \"isrc\": \"CI-DEMO-26-00001\", \"master\": \"demo/master.wav\", \"feats\": [], \"credits\": {\"beatmakers\": [{\"id\": 1, \"name\": \"Studio Démo\"}], \"authors\": [{\"id\": 1, \"name\": \"Nalo\"}], \"composers\": [{\"id\": 1, \"name\": \"Nalo\"}], \"sessionArtists\": []}, \"version\": \"Original\", \"explicit\": \"Non\", \"language\": \"Français\"}], \"cover\": \"demo/cover.tiff\", \"photos\": \"\", \"press\": \"\", \"pitch\": \"Une nouvelle création aux couleurs d’Abidjan. Ce dossier est fictif et sert uniquement à présenter le parcours de distribution.\", \"priority\": \"Soleil rouge\", \"urgent\": false, \"confirmed\": true}",
  "corrections": [{
    "id": 31,
    "section": "assets",
    "message": "Merci de fournir la cover définitive au format TIFF, 3000 × 3000 pixels.",
    "status": "requested",
    "response": "",
    "created_at": "2026-10-13 08:00:00",
    "responded_at": null,
    "due_at": "2026-11-20"
  }]
}, {
  "id": 4,
  "title": "Horizon",
  "artist_name": "Luma",
  "artist_alias": "Luma",
  "owner_email": "artiste4@example.com",
  "release_type": "Album",
  "release_date": "2026-12-15",
  "timing_status": "Préavis conforme",
  "status": "approved",
  "pending_corrections": 0,
  "created_at": "2026-10-12 09:30:00",
  "payload": "{\"genre\": \"Afropop\", \"mood\": \"Énergique\", \"upc\": \"0000000000000\", \"artists\": [{\"id\": 1, \"name\": \"Luma\", \"spotify\": \"\", \"noSpotify\": true}], \"tracks\": [{\"id\": 1, \"title\": \"Horizon\", \"main\": \"Luma\", \"isrc\": \"CI-DEMO-26-00001\", \"master\": \"demo/master.wav\", \"feats\": [], \"credits\": {\"beatmakers\": [{\"id\": 1, \"name\": \"Studio Démo\"}], \"authors\": [{\"id\": 1, \"name\": \"Luma\"}], \"composers\": [{\"id\": 1, \"name\": \"Luma\"}], \"sessionArtists\": []}, \"version\": \"Original\", \"explicit\": \"Non\", \"language\": \"Français\"}], \"cover\": \"demo/cover.tiff\", \"photos\": \"\", \"press\": \"\", \"pitch\": \"Une nouvelle création aux couleurs d’Abidjan. Ce dossier est fictif et sert uniquement à présenter le parcours de distribution.\", \"priority\": \"Horizon\", \"urgent\": false, \"confirmed\": true}",
  "corrections": []
}, {
  "id": 5,
  "title": "On danse",
  "artist_name": "Seya",
  "artist_alias": "Seya",
  "owner_email": "artiste5@example.com",
  "release_type": "Single",
  "release_date": "2026-12-16",
  "timing_status": "Préavis conforme",
  "status": "delivered",
  "pending_corrections": 0,
  "created_at": "2026-10-12 09:30:00",
  "payload": "{\"genre\": \"Afropop\", \"mood\": \"Énergique\", \"upc\": \"0000000000000\", \"artists\": [{\"id\": 1, \"name\": \"Seya\", \"spotify\": \"\", \"noSpotify\": true}], \"tracks\": [{\"id\": 1, \"title\": \"On danse\", \"main\": \"Seya\", \"isrc\": \"CI-DEMO-26-00001\", \"master\": \"demo/master.wav\", \"feats\": [], \"credits\": {\"beatmakers\": [{\"id\": 1, \"name\": \"Studio Démo\"}], \"authors\": [{\"id\": 1, \"name\": \"Seya\"}], \"composers\": [{\"id\": 1, \"name\": \"Seya\"}], \"sessionArtists\": []}, \"version\": \"Original\", \"explicit\": \"Non\", \"language\": \"Français\"}], \"cover\": \"demo/cover.tiff\", \"photos\": \"\", \"press\": \"\", \"pitch\": \"Une nouvelle création aux couleurs d’Abidjan. Ce dossier est fictif et sert uniquement à présenter le parcours de distribution.\", \"priority\": \"On danse\", \"urgent\": false, \"confirmed\": true}",
  "corrections": []
}, {
  "id": 6,
  "title": "Échos",
  "artist_name": "Milo",
  "artist_alias": "Milo",
  "owner_email": "artiste6@example.com",
  "release_type": "EP",
  "release_date": "2026-12-17",
  "timing_status": "Préavis conforme",
  "status": "received",
  "pending_corrections": 0,
  "created_at": "2026-10-12 09:30:00",
  "payload": "{\"genre\": \"Afropop\", \"mood\": \"Énergique\", \"upc\": \"0000000000000\", \"artists\": [{\"id\": 1, \"name\": \"Milo\", \"spotify\": \"\", \"noSpotify\": true}], \"tracks\": [{\"id\": 1, \"title\": \"Échos\", \"main\": \"Milo\", \"isrc\": \"CI-DEMO-26-00001\", \"master\": \"demo/master.wav\", \"feats\": [], \"credits\": {\"beatmakers\": [{\"id\": 1, \"name\": \"Studio Démo\"}], \"authors\": [{\"id\": 1, \"name\": \"Milo\"}], \"composers\": [{\"id\": 1, \"name\": \"Milo\"}], \"sessionArtists\": []}, \"version\": \"Original\", \"explicit\": \"Non\", \"language\": \"Français\"}], \"cover\": \"demo/cover.tiff\", \"photos\": \"\", \"press\": \"\", \"pitch\": \"Une nouvelle création aux couleurs d’Abidjan. Ce dossier est fictif et sert uniquement à présenter le parcours de distribution.\", \"priority\": \"Échos\", \"urgent\": false, \"confirmed\": true}",
  "corrections": []
}];
const demoUser = {
  email: 'artiste1@example.com',
  name: 'Aya Nova',
  artist_name: 'Aya Nova',
  status: 'approved',
  role: 'user'
};
const demoMembers = [{
  email: 'equipe@example.com',
  display_name: 'Équipe Démo',
  role: 'admin',
  active: 1,
  created_at: '2026-10-12'
}];
const localStorage = {
  getItem() {
    return null;
  },
  setItem() {},
  removeItem() {}
};
function demoNotice() {
  const el = document.getElementById('demo-toast');
  el.textContent = 'Démonstration uniquement · aucune donnée envoyée.';
  el.hidden = false;
  setTimeout(() => el.hidden = true, 3200);
}
async function demoData(path, init = {}) {
  const method = init.method || 'GET';
  if (method !== 'GET') {
    demoNotice();
    return {
      error: 'Démonstration uniquement : cette action ne transmet aucune donnée.'
    };
  }
  if (path === '/api/me') return {
    user: demoUser
  };
  if (path.includes('/members')) return {
    members: demoMembers
  };
  if (path.endsWith('/releases')) return {
    releases: path.includes('/team/') ? demoReleases : demoReleases.slice(0, 3)
  };
  const id = Number(path.split('/').pop());
  const release = demoReleases.find(r => r.id === id) || demoReleases[0];
  return {
    release,
    corrections: release.corrections,
    assets: [{
      id: 1,
      kind: 'cover',
      object_key: 'demo/cover.tiff',
      filename: release.title + ' — cover.tiff',
      content_type: 'image/tiff',
      size: 12000000,
      created_at: '2026-10-12'
    }, {
      id: 2,
      kind: 'master',
      object_key: 'demo/master.wav',
      filename: release.title + ' — master.wav',
      content_type: 'audio/wav',
      size: 42000000,
      created_at: '2026-10-12'
    }],
    history: [{
      id: 1,
      actor_email: release.owner_email,
      actor_role: 'user',
      action: 'release.submitted',
      details: '{}',
      created_at: '2026-10-12 09:30:00'
    }],
    revisions: [{
      id: 1,
      revision_number: 1,
      actor_email: release.owner_email,
      change_summary: 'Dossier initial — exemple fictif',
      created_at: '2026-10-12 09:30:00'
    }]
  };
}
const fetch = async (path, init = {}) => ({
  ok: !init.method || init.method === 'GET',
  json: async () => demoData(path, init)
});
function Link({
  href,
  children,
  ...props
}) {
  return React.createElement("a", _extends({
    href: href === '/' ? '#dashboard' : '#' + href.slice(1)
  }, props), children);
}
const statusText = {
  received: "Reçue",
  in_review: "En vérification",
  corrections_requested: "Corrections demandées",
  approved: "Validée",
  delivered: "En ligne",
  rejected: "Refusée"
};
const sectionText = {
  project: "Projet",
  artists: "Artistes",
  tracklist: "Tracklist",
  assets: "Fichiers",
  pitch: "Pitch",
  planning: "Planning",
  metadata: "Métadonnées"
};
const actionText = {
  "release.submitted": "Sortie soumise",
  "release.resubmitted": "Dossier renvoyé pour relecture",
  "release.status_changed": "Statut modifié",
  "correction.requested": "Correction demandée",
  "correction.answered": "Réponse artiste reçue",
  "asset.uploaded": "Fichier ajouté",
  "asset.attached": "Fichier rattaché à la sortie",
  "asset.downloaded": "Fichier téléchargé",
  "profile.onboarding_completed": "Profil artiste créé",
  "team.member_added": "Membre ajouté",
  "team.member_activated": "Membre réactivé",
  "team.member_deactivated": "Membre désactivé"
};
async function api(path, init) {
  if (init?.method && init.method !== "GET") {
    demoNotice();
    throw new Error("Démonstration : aucune modification enregistrée.");
  }
  return demoData(path, init);
}
function parsePayload(value) {
  try {
    return JSON.parse(value || "{}");
  } catch {
    return {};
  }
}
function date(value) {
  return value ? new Date(value.includes("T") ? value : `${value}T00:00:00`).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }) : "—";
}
function stamp(value) {
  return value ? new Date(value.endsWith("Z") ? value : `${value.replace(" ", "T")}Z`).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  }) : "—";
}
function formatTrackCredits(track) {
  const c = track?.credits || {};
  return [["Beatmaker(s)", c.beatmakers], ["Auteur(s)", c.authors], ["Compositeur(s)", c.composers], ["Session", c.sessionArtists]].flatMap(([label, list]) => Array.isArray(list) ? list.filter(x => x?.name?.trim()).map(x => String(label) + " : " + x.name + (label === "Session" && x.instrument ? " (" + x.instrument + ")" : "")) : []).join(" · ");
}
function formatSize(size) {
  return size >= 1e9 ? `${(size / 1e9).toFixed(1)} Go` : `${Math.max(1, Math.round(size / 1e6))} Mo`;
}
function TeamDashboard() {
  const [releases, setReleases] = useState([]),
    [filter, setFilter] = useState("all"),
    [search, setSearch] = useState("");
  const [detail, setDetail] = useState(null),
    [busy, setBusy] = useState(false),
    [loading, setLoading] = useState(true),
    [error, setError] = useState("");
  const [section, setSection] = useState("assets"),
    [message, setMessage] = useState(""),
    [success, setSuccess] = useState("");
  const [membersOpen, setMembersOpen] = useState(false),
    [members, setMembers] = useState([]),
    [memberEmail, setMemberEmail] = useState(""),
    [memberName, setMemberName] = useState("");
  const loadReleases = useCallback(async () => {
    setError("");
    try {
      const d = await api("/api/team/releases");
      setReleases(d.releases || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    void loadReleases();
  }, [loadReleases]);
  const visible = useMemo(() => releases.filter(r => {
    const matchesFilter = filter === "all" || r.status === filter;
    const text = `${r.title} ${r.owner_email} ${r.artist_name} ${r.artist_alias} TRK-${String(r.id).padStart(5, "0")}`.toLowerCase();
    return matchesFilter && text.includes(search.toLowerCase());
  }), [releases, filter, search]);
  const counts = useMemo(() => ({
    all: releases.length,
    received: releases.filter(r => r.status === "received").length,
    in_review: releases.filter(r => r.status === "in_review").length,
    corrections_requested: releases.filter(r => r.status === "corrections_requested").length
  }), [releases]);
  async function openRelease(id) {
    setBusy(true);
    setError("");
    setSuccess("");
    try {
      setDetail(await api(`/api/team/releases/${id}`));
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }
  async function changeStatus(status) {
    if (!detail) return;
    if (status === "rejected" && !window.confirm("Confirmer le refus de cette sortie ?")) return;
    setBusy(true);
    try {
      await api(`/api/team/releases/${detail.release.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          status
        })
      });
      await Promise.all([loadReleases(), openRelease(detail.release.id)]);
      setSuccess("Statut mis à jour.");
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }
  async function requestCorrection(e) {
    e.preventDefault();
    if (!detail) return;
    setBusy(true);
    setError("");
    try {
      await api("/api/team/corrections", {
        method: "POST",
        body: JSON.stringify({
          releaseId: detail.release.id,
          section,
          message
        })
      });
      setMessage("");
      setSuccess("Demande de correction envoyée à l’artiste.");
      await Promise.all([loadReleases(), openRelease(detail.release.id)]);
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }
  async function openMembers() {
    setMembersOpen(true);
    try {
      const d = await api("/api/team/members");
      setMembers(d.members || []);
    } catch (e) {
      setError(e.message);
    }
  }
  async function addMember(e) {
    e.preventDefault();
    try {
      await api("/api/team/members", {
        method: "POST",
        body: JSON.stringify({
          email: memberEmail,
          displayName: memberName
        })
      });
      setMemberEmail("");
      setMemberName("");
      await openMembers();
      setSuccess("Membre ajouté à la liste d’accès du back-office.");
    } catch (e) {
      setError(e.message);
    }
  }
  async function toggleMember(member) {
    try {
      await api("/api/team/members", {
        method: "PATCH",
        body: JSON.stringify({
          email: member.email,
          active: !member.active
        })
      });
      await openMembers();
    } catch (e) {
      setError(e.message);
    }
  }
  return React.createElement("main", {
    className: "shell"
  }, React.createElement("aside", {
    className: "sidebar"
  }, React.createElement("div", {
    className: "brand"
  }, React.createElement("img", {
    src: "./trackr-logo-white.png",
    alt: "trackR"
  }), React.createElement("span", null, "BACK-OFFICE")), React.createElement("div", {
    className: "workspace-label"
  }, "ESPACE INTERNE"), React.createElement("button", {
    className: "side-link active"
  }, React.createElement("span", {
    className: "side-icon"
  }, "\u25A4"), "Suivi des sorties", React.createElement("span", {
    className: "side-count"
  }, counts.all)), React.createElement("button", {
    className: "side-link",
    onClick: openMembers
  }, React.createElement("span", {
    className: "side-icon"
  }, "\u2659"), "\xC9quipe"), React.createElement("div", {
    className: "sidebar-bottom"
  }, React.createElement("span", {
    className: "online-dot"
  }), "Mode d\xE9monstration", React.createElement("br", null), React.createElement("small", null, "trackR"))), React.createElement("section", {
    className: "main-area"
  }, React.createElement("header", {
    className: "topbar"
  }, React.createElement("div", null, React.createElement("p", {
    className: "eyebrow"
  }, "DISTRIBUTION \xB7 C\xD4TE D\u2019IVOIRE"), React.createElement("h1", null, "Suivi des sorties")), React.createElement("div", {
    className: "top-actions"
  }, React.createElement("span", {
    className: "private-chip"
  }, React.createElement("i", null), " INTERNE"), React.createElement("button", {
    className: "user-chip",
    onClick: () => location.href = "#login"
  }, React.createElement("span", {
    className: "avatar"
  }, "T"), React.createElement("span", null, "\xC9quipe trackR"), React.createElement("b", null, "\u2197")))), React.createElement("div", {
    className: "content"
  }, React.createElement("div", {
    className: "welcome-row"
  }, React.createElement("div", null, React.createElement("h2", null, "Bonjour, l\u2019\xE9quipe."), React.createElement("p", null, "Centralisez les demandes, contr\xF4les et corrections en cours.")), React.createElement("button", {
    className: "refresh",
    onClick: () => void loadReleases(),
    "aria-label": "Actualiser"
  }, "\u21BB")), React.createElement("div", {
    className: "metrics"
  }, React.createElement("button", {
    className: `metric ${filter === "all" ? "selected" : ""}`,
    onClick: () => setFilter("all")
  }, React.createElement("span", null, "Toutes les sorties"), React.createElement("b", null, counts.all), React.createElement("small", null, "Demandes enregistr\xE9es")), React.createElement("button", {
    className: `metric ${filter === "received" ? "selected" : ""}`,
    onClick: () => setFilter("received")
  }, React.createElement("span", null, "\xC0 v\xE9rifier"), React.createElement("b", null, counts.received), React.createElement("small", null, "En attente de contr\xF4le")), React.createElement("button", {
    className: `metric ${filter === "in_review" ? "selected" : ""}`,
    onClick: () => setFilter("in_review")
  }, React.createElement("span", null, "En v\xE9rification"), React.createElement("b", null, counts.in_review), React.createElement("small", null, "Dossiers en cours")), React.createElement("button", {
    className: `metric ${filter === "corrections_requested" ? "selected" : ""}`,
    onClick: () => setFilter("corrections_requested")
  }, React.createElement("span", null, "Corrections"), React.createElement("b", null, counts.corrections_requested), React.createElement("small", null, "En attente de l\u2019artiste"))), React.createElement("section", {
    className: "queue-card"
  }, React.createElement("div", {
    className: "queue-head"
  }, React.createElement("div", null, React.createElement("h2", null, "Demandes re\xE7ues"), React.createElement("p", null, visible.length, " dossier", visible.length === 1 ? "" : "s", " affich\xE9", visible.length === 1 ? "" : "s")), React.createElement("label", {
    className: "search"
  }, React.createElement("span", null, "\u2315"), React.createElement("input", {
    value: search,
    onChange: e => setSearch(e.target.value),
    placeholder: "Rechercher une sortie ou un artiste"
  }))), React.createElement("div", {
    className: "filter-row"
  }, [["all", "Toutes"], ["received", "À vérifier"], ["in_review", "En vérification"], ["corrections_requested", "Corrections"], ["approved", "Validées"], ["delivered", "Livrées"]].map(([key, label]) => React.createElement("button", {
    key: key,
    className: filter === key ? "chosen" : "",
    onClick: () => setFilter(key)
  }, label))), error && React.createElement("div", {
    className: "notice error"
  }, React.createElement("b", null, "Connexion indisponible"), React.createElement("span", null, error), error.includes("configurée") && React.createElement("small", null, "Le back-office attend la liaison s\xE9curis\xE9e au D1/R2 du portail artiste.")), success && React.createElement("div", {
    className: "notice success"
  }, success, React.createElement("button", {
    onClick: () => setSuccess("")
  }, "\xD7")), React.createElement("div", {
    className: "table-wrap"
  }, React.createElement("table", null, React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", null, "PROJET"), React.createElement("th", null, "ARTISTE / COMPTE"), React.createElement("th", null, "DATE DE SORTIE"), React.createElement("th", null, "D\xC9LAI"), React.createElement("th", null, "STATUT"), React.createElement("th", null, "\xC0 FAIRE"), React.createElement("th", null))), React.createElement("tbody", null, loading ? React.createElement("tr", null, React.createElement("td", {
    colSpan: 7,
    className: "empty"
  }, "Chargement des demandes\u2026")) : visible.length ? visible.map(r => React.createElement("tr", {
    key: r.id,
    onClick: () => void openRelease(r.id)
  }, React.createElement("td", null, React.createElement("b", null, r.title), React.createElement("small", null, "TRK-", String(r.id).padStart(5, "0"), " \xB7 ", r.release_type)), React.createElement("td", null, React.createElement("b", null, r.artist_alias || r.artist_name || "Artiste"), React.createElement("small", null, r.owner_email)), React.createElement("td", null, date(r.release_date)), React.createElement("td", null, React.createElement("span", {
    className: "timing-tag"
  }, r.timing_status || "—")), React.createElement("td", null, React.createElement("span", {
    className: `status-tag ${r.status}`
  }, statusText[r.status] || r.status)), React.createElement("td", null, r.pending_corrections ? React.createElement("span", {
    className: "todo"
  }, r.pending_corrections, " correction", r.pending_corrections > 1 ? "s" : "") : React.createElement("span", {
    className: "muted"
  }, "\u2014")), React.createElement("td", null, React.createElement("button", {
    className: "open-row",
    "aria-label": `Ouvrir ${r.title}`
  }, "\u2192")))) : React.createElement("tr", null, React.createElement("td", {
    colSpan: 7,
    className: "empty"
  }, error ? "" : "Aucune demande dans cette vue.")))))), React.createElement("footer", null, "trackR \xB7 Back-office interne ", React.createElement("span", null, "Donn\xE9es fictives \xB7 aper\xE7u visuel")))), detail && React.createElement("div", {
    className: "overlay",
    onMouseDown: e => {
      if (e.target === e.currentTarget) setDetail(null);
    }
  }, React.createElement("aside", {
    className: "drawer"
  }, React.createElement("header", {
    className: "drawer-head"
  }, React.createElement("div", null, React.createElement("p", {
    className: "eyebrow"
  }, "DOSSIER TRK-", String(detail.release.id).padStart(5, "0")), React.createElement("h2", null, detail.release.title), React.createElement("span", null, detail.release.release_type, " \xB7 sortie ", date(detail.release.release_date))), React.createElement("button", {
    className: "close",
    onClick: () => setDetail(null),
    "aria-label": "Fermer"
  }, "\xD7")), React.createElement("div", {
    className: "drawer-actions"
  }, React.createElement("span", {
    className: "status-tag " + detail.release.status
  }, "Statut actuel \xB7 ", statusText[detail.release.status] || detail.release.status), React.createElement("div", {
    className: "status-actions",
    "aria-label": "Actions de statut"
  }, [{
    status: "in_review",
    label: "En vérification"
  }, {
    status: "approved",
    label: "Valider"
  }, {
    status: "delivered",
    label: "Marquer en ligne"
  }, {
    status: "rejected",
    label: "Refuser",
    danger: true
  }].map(action => React.createElement("button", {
    type: "button",
    key: action.status,
    className: action.danger ? "status-action danger" : "status-action",
    disabled: busy || detail.release.status === action.status,
    onClick: () => void changeStatus(action.status)
  }, action.label)))), React.createElement("div", {
    className: "drawer-scroll"
  }, React.createElement("section", {
    className: "detail-block"
  }, React.createElement("h3", null, "Profil artiste"), React.createElement("p", {
    className: "artist-name"
  }, detail.release.artist_alias || detail.release.artist_name || "Artiste"), React.createElement("small", null, detail.release.owner_email), React.createElement("div", {
    className: "detail-grid"
  }, React.createElement("div", null, React.createElement("small", null, "Soumise le"), React.createElement("b", null, stamp(detail.release.created_at))), React.createElement("div", null, React.createElement("small", null, "Planning"), React.createElement("b", null, detail.release.timing_status || "—")))), (() => {
    const p = parsePayload(detail.release.payload);
    return React.createElement(React.Fragment, null, React.createElement("section", {
      className: "detail-block"
    }, React.createElement("h3", null, "Projet & m\xE9tadonn\xE9es"), React.createElement("div", {
      className: "detail-grid"
    }, React.createElement("div", null, React.createElement("small", null, "Genre"), React.createElement("b", null, p.genre || "—")), React.createElement("div", null, React.createElement("small", null, "Mood"), React.createElement("b", null, p.mood || "—")), React.createElement("div", null, React.createElement("small", null, "UPC"), React.createElement("b", null, p.upc || "Non renseigné")), React.createElement("div", null, React.createElement("small", null, "Titre prioritaire"), React.createElement("b", null, p.priority || "—")))), React.createElement("section", {
      className: "detail-block"
    }, React.createElement("h3", null, "Tracklist ", React.createElement("span", null, p.tracks?.length || 0, " piste(s)")), (p.tracks || []).map((t, i) => React.createElement("div", {
      className: "track",
      key: t.id || i
    }, React.createElement("span", {
      className: "track-number"
    }, String(i + 1).padStart(2, "0")), React.createElement("div", null, React.createElement("b", null, t.title || "Sans titre"), React.createElement("small", null, t.main || "—", t.feats?.length ? ` · feat. ${t.feats.map(f => f.name).join(", ")}` : ""), React.createElement("small", null, "ISRC : ", t.isrc || "Non renseigné", " \xB7 ", t.language || "Langue à confirmer", " \xB7 ", t.explicit === "Oui" ? "Explicite" : "Non explicite"), formatTrackCredits(t) && React.createElement("small", {
      className: "track-credits"
    }, formatTrackCredits(t)))))));
  })(), React.createElement("section", {
    className: "detail-block"
  }, React.createElement("h3", null, "Fichiers d\xE9pos\xE9s ", React.createElement("span", null, detail.assets.length)), detail.assets.length ? (() => {
    const p = parsePayload(detail.release.payload);
    const active = new Set([p.cover, ...(p.tracks || []).map(t => t.master)].filter(Boolean));
    return detail.assets.map(a => React.createElement("a", {
      className: "asset-row",
      key: a.id,
      href: "#demo-file",
      onClick: e => {
        e.preventDefault();
        demoNotice();
      }
    }, React.createElement("span", {
      className: "asset-icon"
    }, a.kind === "cover" ? "▧" : "♫"), React.createElement("span", null, React.createElement("b", null, a.filename), React.createElement("small", null, a.kind === "cover" ? "Cover" : "Master", " \xB7 ", formatSize(a.size), " \xB7 ", active.has(a.object_key) ? "Version actuelle" : "Version précédente")), React.createElement("i", null, "\u2193")));
  })() : React.createElement("p", {
    className: "muted"
  }, "Aucun fichier rattach\xE9 \xE0 ce dossier.")), React.createElement("section", {
    className: "detail-block"
  }, React.createElement("h3", null, "Demandes de correction ", React.createElement("span", null, detail.corrections.length)), detail.corrections.length ? detail.corrections.map(c => React.createElement("article", {
    className: "correction-row",
    key: c.id
  }, React.createElement("div", {
    className: "correction-top"
  }, React.createElement("b", null, sectionText[c.section] || c.section), React.createElement("span", {
    className: `correction-status ${c.status}`
  }, c.status === "requested" ? "En attente" : c.status === "resubmitted" ? "Renvoyée pour relecture" : "Réponse reçue")), React.createElement("p", null, c.message), c.response && React.createElement("blockquote", null, c.response), React.createElement("small", null, stamp(c.created_at), c.status === "requested" && c.due_at ? ` · Échéance : ${date(c.due_at)}` : ""))) : React.createElement("p", {
    className: "muted"
  }, "Aucune correction demand\xE9e."), React.createElement("form", {
    className: "correction-form",
    onSubmit: requestCorrection
  }, React.createElement("label", null, "Demander une correction cibl\xE9e", React.createElement("select", {
    value: section,
    onChange: e => setSection(e.target.value)
  }, Object.entries(sectionText).map(([value, label]) => React.createElement("option", {
    key: value,
    value: value
  }, label)))), React.createElement("textarea", {
    value: message,
    onChange: e => setMessage(e.target.value),
    placeholder: "Pr\xE9cisez clairement l\u2019\xE9l\xE9ment \xE0 corriger\u2026",
    required: true,
    minLength: 5,
    maxLength: 2000
  }), React.createElement("button", {
    className: "primary",
    disabled: busy || message.trim().length < 5
  }, "Envoyer la demande"))), React.createElement("section", {
    className: "detail-block"
  }, React.createElement("h3", null, "Versions du dossier ", React.createElement("span", null, detail.revisions?.length || 0)), detail.revisions?.length ? detail.revisions.map(r => React.createElement("div", {
    className: "history-row",
    key: r.id
  }, React.createElement("i", null), React.createElement("div", null, React.createElement("b", null, "Version ", r.revision_number), React.createElement("small", null, r.change_summary || "Modification du dossier"), React.createElement("small", null, r.actor_email, " \xB7 ", stamp(r.created_at))))) : React.createElement("p", {
    className: "muted"
  }, "Aucune version archiv\xE9e pour cette sortie.")), React.createElement("section", {
    className: "detail-block history-block"
  }, React.createElement("h3", null, "Historique des actions ", React.createElement("span", null, detail.history.length)), detail.history.length ? detail.history.map(h => {
    let d = {};
    try {
      d = JSON.parse(h.details || "{}");
    } catch {}
    return React.createElement("div", {
      className: "history-row",
      key: h.id
    }, React.createElement("i", null), React.createElement("div", null, React.createElement("b", null, actionText[h.action] || h.action), React.createElement("small", null, h.actor_email, " \xB7 ", stamp(h.created_at)), d.section && React.createElement("small", null, "Section : ", sectionText[d.section] || d.section), d.from && React.createElement("small", null, statusText[d.from] || d.from, " \u2192 ", statusText[d.to] || d.to), d.title && React.createElement("small", null, "Sortie : ", d.title), d.message && React.createElement("small", null, "Consigne : ", d.message), d.response && React.createElement("small", null, "R\xE9ponse : ", d.response), d.filename && React.createElement("small", null, d.filename, d.kind ? ` · ${d.kind}` : ""), d.sections?.length > 0 && React.createElement("small", null, "Sections modifi\xE9es : ", d.sections.map(s => sectionText[s] || s).join(", "))));
  }) : React.createElement("p", {
    className: "muted"
  }, "Aucune action journalis\xE9e pour cette sortie."))))), membersOpen && React.createElement("div", {
    className: "overlay",
    onMouseDown: e => {
      if (e.target === e.currentTarget) setMembersOpen(false);
    }
  }, React.createElement("aside", {
    className: "drawer member-drawer"
  }, React.createElement("header", {
    className: "drawer-head"
  }, React.createElement("div", null, React.createElement("p", {
    className: "eyebrow"
  }, "ACC\xC8S"), React.createElement("h2", null, "Membres de l\u2019\xE9quipe"), React.createElement("span", null, "Exemple fictif de gestion des acc\xE8s.")), React.createElement("button", {
    className: "close",
    onClick: () => setMembersOpen(false)
  }, "\xD7")), React.createElement("div", {
    className: "drawer-scroll"
  }, React.createElement("form", {
    className: "member-form",
    onSubmit: addMember
  }, React.createElement("h3", null, "Ajouter un membre"), React.createElement("label", null, "Nom", React.createElement("input", {
    value: memberName,
    onChange: e => setMemberName(e.target.value),
    placeholder: "Nom affich\xE9"
  })), React.createElement("label", null, "E-mail", React.createElement("input", {
    type: "email",
    value: memberEmail,
    onChange: e => setMemberEmail(e.target.value),
    required: true,
    placeholder: "nom@exemple.com"
  })), React.createElement("button", {
    className: "primary"
  }, "Autoriser l\u2019acc\xE8s"), React.createElement("small", null, "Aucun acc\xE8s r\xE9el ne sera accord\xE9 dans cette d\xE9mo.")), React.createElement("section", {
    className: "detail-block"
  }, React.createElement("h3", null, "Acc\xE8s actifs"), members.map(m => React.createElement("div", {
    className: "member-row",
    key: m.email
  }, React.createElement("span", {
    className: "avatar small"
  }, (m.display_name || m.email)[0]?.toUpperCase()), React.createElement("span", null, React.createElement("b", null, m.display_name || m.email), React.createElement("small", null, m.email, " \xB7 ", m.role === "admin" ? "Administrateur" : "Équipe")), React.createElement("button", {
    onClick: () => void toggleMember(m)
  }, m.active ? "Désactiver" : "Réactiver"))))))));
}
ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(TeamDashboard, null));