import{i,a as p,S as y}from"./assets/vendor-b0d10f48.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function n(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=n(e);fetch(e.href,s)}})();const g="https://pixabay.com/api/",L=document.querySelector(".search-form"),d=document.querySelector(".gallery"),u=document.getElementById("loader"),l=document.getElementById("load-more");let f="",a=1;const h=async(r,t=1)=>{u.classList.remove("hidden");try{return(await p.get(g,{params:{key:"45062704-33fd3c82d061d20576d8c3095",q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:40,page:t}})).data}catch{return i.error({title:"Error",message:"Something went wrong. Please try again!"}),{hits:[],totalHits:0}}finally{u.classList.add("hidden")}},m=r=>{if(a===1&&(d.innerHTML=""),r.length===0&&a===1){i.info({title:"No Results",message:"Sorry, there are no images matching your search query. Please try again!"}),l.classList.add("hidden");return}const t=r.map(o=>`
    <li>
      <a href="${o.largeImageURL}">
        <img src="${o.webformatURL}" alt="${o.tags}" />
      </a>
      <div class="info">
        <p>Likes: ${o.likes}</p>
        <p>Views: ${o.views}</p>
        <p>Comments: ${o.comments}</p>
        <p>Downloads: ${o.downloads}</p>
      </div>
    </li>
  `).join("");d.insertAdjacentHTML("beforeend",t),new y(".gallery a").refresh()},w=async r=>{r.preventDefault();const t=r.target.elements.query.value.trim();if(t===""){i.warning({title:"Warning",message:"Please enter a search query!"});return}f=t,a=1;const n=await h(t,a);m(n.hits),n.totalHits>40?l.classList.remove("hidden"):(l.classList.add("hidden"),n.totalHits>0&&i.info({title:"End of Results",message:"We're sorry, but you've reached the end of search results."}))},b=async()=>{a+=1;const r=await h(f,a);m(r.hits),r.totalHits<=a*40&&(l.classList.add("hidden"),i.info({title:"End of Results",message:"We're sorry, but you've reached the end of search results."}));const{height:t}=d.firstElementChild.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})};L.addEventListener("submit",w);l.addEventListener("click",b);
//# sourceMappingURL=commonHelpers.js.map
