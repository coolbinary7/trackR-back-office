"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type Release = {
  id: number; owner_email: string; title: string; release_type: string; release_date: string;
  timing_status: string; status: string; payload: string; created_at: string;
  artist_name: string; artist_alias: string; pending_corrections: number;
};
type Correction = { id:number; section:string; message:string; status:string; response:string; created_at:string; responded_at:string|null; due_at:string|null };
type Activity = { id:number; actor_email:string; actor_role:string; action:string; details:string; created_at:string };
type Asset = { id:number; kind:string; object_key:string; filename:string; content_type:string; size:number; created_at:string };
type Revision = { id:number; revision_number:number; actor_email:string; change_summary:string; created_at:string };
type Detail = { release:Release; corrections:Correction[]; history:Activity[]; assets:Asset[]; revisions:Revision[] };
type TeamMember = { email:string; display_name:string; role:string; active:number; created_at:string };

const statusText:Record<string,string>={received:"Reçue",in_review:"En vérification",corrections_requested:"Corrections demandées",approved:"Validée",delivered:"En ligne",rejected:"Refusée"};
const sectionText:Record<string,string>={project:"Projet",artists:"Artistes",tracklist:"Tracklist",assets:"Fichiers",pitch:"Pitch",planning:"Planning",metadata:"Métadonnées"};
const actionText:Record<string,string>={"release.submitted":"Sortie soumise","release.resubmitted":"Dossier renvoyé pour relecture","release.status_changed":"Statut modifié","correction.requested":"Correction demandée","correction.answered":"Réponse artiste reçue","asset.uploaded":"Fichier ajouté","asset.attached":"Fichier rattaché à la sortie","asset.downloaded":"Fichier téléchargé","profile.onboarding_completed":"Profil artiste créé","team.member_added":"Membre ajouté","team.member_activated":"Membre réactivé","team.member_deactivated":"Membre désactivé"};

async function api(path:string, init?:RequestInit):Promise<any> {
  const response=await fetch(path,{...init,headers:{"content-type":"application/json",...(init?.headers||{})},cache:"no-store"});
  const data=await response.json().catch(()=>({error:"Réponse illisible du serveur."}));
  if(!response.ok) throw new Error(data.error||"Une erreur est survenue.");
  return data;
}
function parsePayload(value:string){try{return JSON.parse(value||"{}") as Record<string,any>}catch{return {}}}
function date(value:string){return value?new Date(value.includes("T")?value:`${value}T00:00:00`).toLocaleDateString("fr-FR",{day:"2-digit",month:"short",year:"numeric"}):"—"}
function stamp(value:string){return value?new Date(value.endsWith("Z")?value:`${value.replace(" ","T")}Z`).toLocaleString("fr-FR",{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"}):"—"}
function formatTrackCredits(track:any){const c=track?.credits||{};return [["Beatmaker(s)",c.beatmakers],["Auteur(s)",c.authors],["Compositeur(s)",c.composers],["Session",c.sessionArtists]].flatMap(([label,list]:any)=>Array.isArray(list)?list.filter((x:any)=>x?.name?.trim()).map((x:any)=>String(label)+" : "+x.name+(label==="Session"&&x.instrument?" ("+x.instrument+")":"")):[]).join(" · ")}
function formatSize(size:number){return size>=1e9?`${(size/1e9).toFixed(1)} Go`:`${Math.max(1,Math.round(size/1e6))} Mo`}

export default function TeamDashboard(){
  const [releases,setReleases]=useState<Release[]>([]),[filter,setFilter]=useState("all"),[search,setSearch]=useState("");
  const [detail,setDetail]=useState<Detail|null>(null),[busy,setBusy]=useState(false),[loading,setLoading]=useState(true),[error,setError]=useState("");
  const [section,setSection]=useState("assets"),[message,setMessage]=useState(""),[success,setSuccess]=useState("");
  const [membersOpen,setMembersOpen]=useState(false),[members,setMembers]=useState<TeamMember[]>([]),[memberEmail,setMemberEmail]=useState(""),[memberName,setMemberName]=useState("");

  const loadReleases=useCallback(async()=>{setError("");try{const d=await api("/api/team/releases");setReleases(d.releases||[])}catch(e){setError((e as Error).message)}finally{setLoading(false)}},[]);
  useEffect(()=>{void loadReleases()},[loadReleases]);
  const visible=useMemo(()=>releases.filter(r=>{
    const matchesFilter=filter==="all"||r.status===filter;
    const text=`${r.title} ${r.owner_email} ${r.artist_name} ${r.artist_alias} TRK-${String(r.id).padStart(5,"0")}`.toLowerCase();
    return matchesFilter&&text.includes(search.toLowerCase());
  }),[releases,filter,search]);
  const counts=useMemo(()=>({all:releases.length,received:releases.filter(r=>r.status==="received").length,in_review:releases.filter(r=>r.status==="in_review").length,corrections_requested:releases.filter(r=>r.status==="corrections_requested").length}),[releases]);

  async function openRelease(id:number){setBusy(true);setError("");setSuccess("");try{setDetail(await api(`/api/team/releases/${id}`))}catch(e){setError((e as Error).message)}finally{setBusy(false)}}
  async function changeStatus(status:string){if(!detail)return;if(status==="rejected"&&!window.confirm("Confirmer le refus de cette sortie ?"))return;setBusy(true);try{await api(`/api/team/releases/${detail.release.id}`,{method:"PATCH",body:JSON.stringify({status})});await Promise.all([loadReleases(),openRelease(detail.release.id)]);setSuccess("Statut mis à jour.")}catch(e){setError((e as Error).message)}finally{setBusy(false)}}
  async function requestCorrection(e:React.FormEvent){e.preventDefault();if(!detail)return;setBusy(true);setError("");try{await api("/api/team/corrections",{method:"POST",body:JSON.stringify({releaseId:detail.release.id,section,message})});setMessage("");setSuccess("Demande de correction envoyée à l’artiste.");await Promise.all([loadReleases(),openRelease(detail.release.id)])}catch(e){setError((e as Error).message)}finally{setBusy(false)}}
  async function openMembers(){setMembersOpen(true);try{const d=await api("/api/team/members");setMembers(d.members||[])}catch(e){setError((e as Error).message)}}
  async function addMember(e:React.FormEvent){e.preventDefault();try{await api("/api/team/members",{method:"POST",body:JSON.stringify({email:memberEmail,displayName:memberName})});setMemberEmail("");setMemberName("");await openMembers();setSuccess("Membre ajouté à la liste d’accès du back-office.")}catch(e){setError((e as Error).message)}}
  async function toggleMember(member:TeamMember){try{await api("/api/team/members",{method:"PATCH",body:JSON.stringify({email:member.email,active:!member.active})});await openMembers()}catch(e){setError((e as Error).message)}}

  return <main className="shell">
    <aside className="sidebar">
      <div className="brand"><img src="/trackr-logo-white.png" alt="trackR"/><span>BACK-OFFICE</span></div>
      <div className="workspace-label">ESPACE INTERNE</div>
      <button className="side-link active"><span className="side-icon">▤</span>Suivi des sorties<span className="side-count">{counts.all}</span></button>
      <button className="side-link" onClick={openMembers}><span className="side-icon">♙</span>Équipe</button>
      <div className="sidebar-bottom"><span className="online-dot"/>Accès protégé<br/><small>trackR</small></div>
    </aside>
    <section className="main-area">
      <header className="topbar"><div><p className="eyebrow">DISTRIBUTION · CÔTE D’IVOIRE</p><h1>Suivi des sorties</h1></div><div className="top-actions"><span className="private-chip"><i/> INTERNE</span><button className="user-chip" onClick={()=>location.href="/signout-with-chatgpt?return_to=%2F"}><span className="avatar">T</span><span>Équipe trackR</span><b>↗</b></button></div></header>
      <div className="content">
        <div className="welcome-row"><div><h2>Bonjour, l’équipe.</h2><p>Centralisez les demandes, contrôles et corrections en cours.</p></div><button className="refresh" onClick={()=>void loadReleases()} aria-label="Actualiser">↻</button></div>
        <div className="metrics">
          <button className={`metric ${filter==="all"?"selected":""}`} onClick={()=>setFilter("all")}><span>Toutes les sorties</span><b>{counts.all}</b><small>Demandes enregistrées</small></button>
          <button className={`metric ${filter==="received"?"selected":""}`} onClick={()=>setFilter("received")}><span>À vérifier</span><b>{counts.received}</b><small>En attente de contrôle</small></button>
          <button className={`metric ${filter==="in_review"?"selected":""}`} onClick={()=>setFilter("in_review")}><span>En vérification</span><b>{counts.in_review}</b><small>Dossiers en cours</small></button>
          <button className={`metric ${filter==="corrections_requested"?"selected":""}`} onClick={()=>setFilter("corrections_requested")}><span>Corrections</span><b>{counts.corrections_requested}</b><small>En attente de l’artiste</small></button>
        </div>
        <section className="queue-card">
          <div className="queue-head"><div><h2>Demandes reçues</h2><p>{visible.length} dossier{visible.length===1?"":"s"} affiché{visible.length===1?"":"s"}</p></div><label className="search"><span>⌕</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Rechercher une sortie ou un artiste"/></label></div>
          <div className="filter-row">{[["all","Toutes"],["received","À vérifier"],["in_review","En vérification"],["corrections_requested","Corrections"],["approved","Validées"],["delivered","Livrées"]].map(([key,label])=><button key={key} className={filter===key?"chosen":""} onClick={()=>setFilter(key)}>{label}</button>)}</div>
          {error&&<div className="notice error"><b>Connexion indisponible</b><span>{error}</span>{error.includes("configurée")&&<small>Le back-office attend la liaison sécurisée au D1/R2 du portail artiste.</small>}</div>}
          {success&&<div className="notice success">{success}<button onClick={()=>setSuccess("")}>×</button></div>}
          <div className="table-wrap"><table><thead><tr><th>PROJET</th><th>ARTISTE / COMPTE</th><th>DATE DE SORTIE</th><th>DÉLAI</th><th>STATUT</th><th>À FAIRE</th><th/></tr></thead><tbody>
            {loading?<tr><td colSpan={7} className="empty">Chargement des demandes…</td></tr>:visible.length?visible.map(r=><tr key={r.id} onClick={()=>void openRelease(r.id)}><td><b>{r.title}</b><small>TRK-{String(r.id).padStart(5,"0")} · {r.release_type}</small></td><td><b>{r.artist_alias||r.artist_name||"Artiste"}</b><small>{r.owner_email}</small></td><td>{date(r.release_date)}</td><td><span className="timing-tag">{r.timing_status||"—"}</span></td><td><span className={`status-tag ${r.status}`}>{statusText[r.status]||r.status}</span></td><td>{r.pending_corrections? <span className="todo">{r.pending_corrections} correction{r.pending_corrections>1?"s":""}</span>:<span className="muted">—</span>}</td><td><button className="open-row" aria-label={`Ouvrir ${r.title}`}>→</button></td></tr>):<tr><td colSpan={7} className="empty">{error?"":"Aucune demande dans cette vue."}</td></tr>}
          </tbody></table></div>
        </section>
        <footer>trackR · Back-office interne <span>Les droits d’accès sont contrôlés côté serveur.</span></footer>
      </div>
    </section>

    {detail&&<div className="overlay" onMouseDown={e=>{if(e.target===e.currentTarget)setDetail(null)}}><aside className="drawer"><header className="drawer-head"><div><p className="eyebrow">DOSSIER TRK-{String(detail.release.id).padStart(5,"0")}</p><h2>{detail.release.title}</h2><span>{detail.release.release_type} · sortie {date(detail.release.release_date)}</span></div><button className="close" onClick={()=>setDetail(null)} aria-label="Fermer">×</button></header>
      <div className="drawer-actions"><span className={"status-tag "+detail.release.status}>Statut actuel · {statusText[detail.release.status]||detail.release.status}</span><div className="status-actions" aria-label="Actions de statut">{[{status:"in_review",label:"En vérification"},{status:"approved",label:"Valider"},{status:"delivered",label:"Marquer en ligne"},{status:"rejected",label:"Refuser",danger:true}].map(action=><button type="button" key={action.status} className={action.danger?"status-action danger":"status-action"} disabled={busy||detail.release.status===action.status} onClick={()=>void changeStatus(action.status)}>{action.label}</button>)}</div></div>
      <div className="drawer-scroll"><section className="detail-block"><h3>Profil artiste</h3><p className="artist-name">{detail.release.artist_alias||detail.release.artist_name||"Artiste"}</p><small>{detail.release.owner_email}</small><div className="detail-grid"><div><small>Soumise le</small><b>{stamp(detail.release.created_at)}</b></div><div><small>Planning</small><b>{detail.release.timing_status||"—"}</b></div></div></section>
        {(()=>{const p=parsePayload(detail.release.payload);return <><section className="detail-block"><h3>Projet & métadonnées</h3><div className="detail-grid"><div><small>Genre</small><b>{p.genre||"—"}</b></div><div><small>Mood</small><b>{p.mood||"—"}</b></div><div><small>UPC</small><b>{p.upc||"Non renseigné"}</b></div><div><small>Titre prioritaire</small><b>{p.priority||"—"}</b></div></div></section><section className="detail-block"><h3>Tracklist <span>{p.tracks?.length||0} piste(s)</span></h3>{(p.tracks||[]).map((t:any,i:number)=><div className="track" key={t.id||i}><span className="track-number">{String(i+1).padStart(2,"0")}</span><div><b>{t.title||"Sans titre"}</b><small>{t.main||"—"}{t.feats?.length?` · feat. ${t.feats.map((f:any)=>f.name).join(", ")}`:""}</small><small>ISRC : {t.isrc||"Non renseigné"} · {t.language||"Langue à confirmer"} · {t.explicit==="Oui"?"Explicite":"Non explicite"}</small>{formatTrackCredits(t)&&<small className="track-credits">{formatTrackCredits(t)}</small>}</div></div>)}</section></>})()}
        <section className="detail-block"><h3>Fichiers déposés <span>{detail.assets.length}</span></h3>{detail.assets.length?(()=>{const p=parsePayload(detail.release.payload);const active=new Set([p.cover,...(p.tracks||[]).map((t:any)=>t.master)].filter(Boolean));return detail.assets.map(a=><a className="asset-row" key={a.id} href={`/api/team/assets/${a.id}`}><span className="asset-icon">{a.kind==="cover"?"▧":"♫"}</span><span><b>{a.filename}</b><small>{a.kind==="cover"?"Cover":"Master"} · {formatSize(a.size)} · {active.has(a.object_key)?"Version actuelle":"Version précédente"}</small></span><i>↓</i></a>)})():<p className="muted">Aucun fichier rattaché à ce dossier.</p>}</section>
        <section className="detail-block"><h3>Demandes de correction <span>{detail.corrections.length}</span></h3>{detail.corrections.length?detail.corrections.map(c=><article className="correction-row" key={c.id}><div className="correction-top"><b>{sectionText[c.section]||c.section}</b><span className={`correction-status ${c.status}`}>{c.status==="requested"?"En attente":c.status==="resubmitted"?"Renvoyée pour relecture":"Réponse reçue"}</span></div><p>{c.message}</p>{c.response&&<blockquote>{c.response}</blockquote>}<small>{stamp(c.created_at)}{c.status==="requested"&&c.due_at?` · Échéance : ${date(c.due_at)}`:""}</small></article>):<p className="muted">Aucune correction demandée.</p>}
          <form className="correction-form" onSubmit={requestCorrection}><label>Demander une correction ciblée<select value={section} onChange={e=>setSection(e.target.value)}>{Object.entries(sectionText).map(([value,label])=><option key={value} value={value}>{label}</option>)}</select></label><textarea value={message} onChange={e=>setMessage(e.target.value)} placeholder="Précisez clairement l’élément à corriger…" required minLength={5} maxLength={2000}/><button className="primary" disabled={busy||message.trim().length<5}>Envoyer la demande</button></form>
        </section>
        <section className="detail-block"><h3>Versions du dossier <span>{detail.revisions?.length||0}</span></h3>{detail.revisions?.length?detail.revisions.map(r=><div className="history-row" key={r.id}><i/><div><b>Version {r.revision_number}</b><small>{r.change_summary||"Modification du dossier"}</small><small>{r.actor_email} · {stamp(r.created_at)}</small></div></div>):<p className="muted">Aucune version archivée pour cette sortie.</p>}</section>
        <section className="detail-block history-block"><h3>Historique des actions <span>{detail.history.length}</span></h3>{detail.history.length?detail.history.map(h=>{let d:any={};try{d=JSON.parse(h.details||"{}")}catch{}return <div className="history-row" key={h.id}><i/><div><b>{actionText[h.action]||h.action}</b><small>{h.actor_email} · {stamp(h.created_at)}</small>{d.section&&<small>Section : {sectionText[d.section]||d.section}</small>}{d.from&&<small>{statusText[d.from]||d.from} → {statusText[d.to]||d.to}</small>}{d.title&&<small>Sortie : {d.title}</small>}{d.message&&<small>Consigne : {d.message}</small>}{d.response&&<small>Réponse : {d.response}</small>}{d.filename&&<small>{d.filename}{d.kind?` · ${d.kind}`:""}</small>}{d.sections?.length>0&&<small>Sections modifiées : {d.sections.map((s:string)=>sectionText[s]||s).join(", ")}</small>}</div></div>}):<p className="muted">Aucune action journalisée pour cette sortie.</p>}</section>
      </div></aside></div>}

    {membersOpen&&<div className="overlay" onMouseDown={e=>{if(e.target===e.currentTarget)setMembersOpen(false)}}><aside className="drawer member-drawer"><header className="drawer-head"><div><p className="eyebrow">ACCÈS</p><h2>Membres de l’équipe</h2><span>Les rôles sont contrôlés côté serveur.</span></div><button className="close" onClick={()=>setMembersOpen(false)}>×</button></header><div className="drawer-scroll"><form className="member-form" onSubmit={addMember}><h3>Ajouter un membre</h3><label>Nom<input value={memberName} onChange={e=>setMemberName(e.target.value)} placeholder="Nom affiché"/></label><label>E-mail<input type="email" value={memberEmail} onChange={e=>setMemberEmail(e.target.value)} required placeholder="nom@exemple.com"/></label><button className="primary">Autoriser l’accès</button><small>L’accès au Site privé doit aussi être accordé dans ses paramètres de partage.</small></form><section className="detail-block"><h3>Accès actifs</h3>{members.map(m=><div className="member-row" key={m.email}><span className="avatar small">{(m.display_name||m.email)[0]?.toUpperCase()}</span><span><b>{m.display_name||m.email}</b><small>{m.email} · {m.role==="admin"?"Administrateur":"Équipe"}</small></span><button onClick={()=>void toggleMember(m)}>{m.active?"Désactiver":"Réactiver"}</button></div>)}</section></div></aside></div>}
  </main>;
}
