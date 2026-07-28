function t(t,e,i,s){var r,o=arguments.length,n=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(n=(o<3?r(n):o>3?r(e,i,n):r(e,i))||n);return o>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),r=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(e,t))}return t}toString(){return this.cssText}};const n=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:a,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:l,getOwnPropertySymbols:d,getPrototypeOf:u}=Object,p=globalThis,f=p.trustedTypes,_=f?f.emptyScript:"",g=p.reactiveElementPolyfillSupport,m=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},$=(t,e)=>!a(t,e),y={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:$};Symbol.metadata??=Symbol("metadata"),p.litPropertyMetadata??=new WeakMap;let b=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);r?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(m("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(m("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(m("properties"))){const t=this.properties,e=[...l(t),...d(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),r=e.litNonce;void 0!==r&&s.setAttribute("nonce",r),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=s;const o=r.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){if(void 0!==t){const o=this.constructor;if(!1===s&&(r=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??$)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==r||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[m("elementProperties")]=new Map,b[m("finalized")]=new Map,g?.({ReactiveElement:b}),(p.reactiveElementVersions??=[]).push("2.1.2");const A=globalThis,w=t=>t,S=A.trustedTypes,E=S?S.createPolicy("lit-html",{createHTML:t=>t}):void 0,x="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,T="?"+C,P=`<${T}>`,U=document,O=()=>U.createComment(""),R=t=>null===t||"object"!=typeof t&&"function"!=typeof t,H=Array.isArray,M="[ \t\n\f\r]",k=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,D=/-->/g,z=/>/g,N=RegExp(`>|${M}(?:([^\\s"'>=/]+)(${M}*=${M}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,j=/"/g,I=/^(?:script|style|textarea|title)$/i,q=(t,...e)=>({_$litType$:1,strings:t,values:e}),B=Symbol.for("lit-noChange"),F=Symbol.for("lit-nothing"),V=new WeakMap,W=U.createTreeWalker(U,129);function Y(t,e){if(!H(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const J=(t,e)=>{const i=t.length-1,s=[];let r,o=2===e?"<svg>":3===e?"<math>":"",n=k;for(let e=0;e<i;e++){const i=t[e];let a,c,h=-1,l=0;for(;l<i.length&&(n.lastIndex=l,c=n.exec(i),null!==c);)l=n.lastIndex,n===k?"!--"===c[1]?n=D:void 0!==c[1]?n=z:void 0!==c[2]?(I.test(c[2])&&(r=RegExp("</"+c[2],"g")),n=N):void 0!==c[3]&&(n=N):n===N?">"===c[0]?(n=r??k,h=-1):void 0===c[1]?h=-2:(h=n.lastIndex-c[2].length,a=c[1],n=void 0===c[3]?N:'"'===c[3]?j:L):n===j||n===L?n=N:n===D||n===z?n=k:(n=N,r=void 0);const d=n===N&&t[e+1].startsWith("/>")?" ":"";o+=n===k?i+P:h>=0?(s.push(a),i.slice(0,h)+x+i.slice(h)+C+d):i+C+(-2===h?e:d)}return[Y(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class K{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,o=0;const n=t.length-1,a=this.parts,[c,h]=J(t,e);if(this.el=K.createElement(c,i),W.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=W.nextNode())&&a.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(x)){const e=h[o++],i=s.getAttribute(t).split(C),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:n[2],strings:i,ctor:"."===n[1]?tt:"?"===n[1]?et:"@"===n[1]?it:X}),s.removeAttribute(t)}else t.startsWith(C)&&(a.push({type:6,index:r}),s.removeAttribute(t));if(I.test(s.tagName)){const t=s.textContent.split(C),e=t.length-1;if(e>0){s.textContent=S?S.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],O()),W.nextNode(),a.push({type:2,index:++r});s.append(t[e],O())}}}else if(8===s.nodeType)if(s.data===T)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=s.data.indexOf(C,t+1));)a.push({type:7,index:r}),t+=C.length-1}r++}}static createElement(t,e){const i=U.createElement("template");return i.innerHTML=t,i}}function Z(t,e,i=t,s){if(e===B)return e;let r=void 0!==s?i._$Co?.[s]:i._$Cl;const o=R(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(t),r._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=r:i._$Cl=r),void 0!==r&&(e=Z(t,r._$AS(t,e.values),r,s)),e}class G{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??U).importNode(e,!0);W.currentNode=s;let r=W.nextNode(),o=0,n=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new Q(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new st(r,this,t)),this._$AV.push(e),a=i[++n]}o!==a?.index&&(r=W.nextNode(),o++)}return W.currentNode=U,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=F,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),R(t)?t===F||null==t||""===t?(this._$AH!==F&&this._$AR(),this._$AH=F):t!==this._$AH&&t!==B&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>H(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==F&&R(this._$AH)?this._$AA.nextSibling.data=t:this.T(U.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=K.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new G(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new K(t)),e}k(t){H(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new Q(this.O(O()),this.O(O()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=w(t).nextSibling;w(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class X{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=F,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=F}_$AI(t,e=this,i,s){const r=this.strings;let o=!1;if(void 0===r)t=Z(this,t,e,0),o=!R(t)||t!==this._$AH&&t!==B,o&&(this._$AH=t);else{const s=t;let n,a;for(t=r[0],n=0;n<r.length-1;n++)a=Z(this,s[i+n],e,n),a===B&&(a=this._$AH[n]),o||=!R(a)||a!==this._$AH[n],a===F?t=F:t!==F&&(t+=(a??"")+r[n+1]),this._$AH[n]=a}o&&!s&&this.j(t)}j(t){t===F?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends X{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===F?void 0:t}}class et extends X{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==F)}}class it extends X{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??F)===B)return;const i=this._$AH,s=t===F&&i!==F||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==F&&(i===F||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const rt=A.litHtmlPolyfillSupport;rt?.(K,Q),(A.litHtmlVersions??=[]).push("3.3.3");const ot=globalThis;let nt=class extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let r=s._$litPart$;if(void 0===r){const t=i?.renderBefore??null;s._$litPart$=r=new Q(e.insertBefore(O(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}};nt._$litElement$=!0,nt.finalized=!0,ot.litElementHydrateSupport?.({LitElement:nt});const at=ot.litElementPolyfillSupport;at?.({LitElement:nt}),(ot.litElementVersions??=[]).push("4.2.2");const ct=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ht={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:$},lt=(t=ht,e,i)=>{const{kind:s,metadata:r}=i;let o=globalThis.litPropertyMetadata.get(r);if(void 0===o&&globalThis.litPropertyMetadata.set(r,o=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const r=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,r,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const r=this[s];e.call(this,i),this.requestUpdate(s,r,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function dt(t){return(e,i)=>"object"==typeof i?lt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function ut(t){return dt({...t,state:!0,attribute:!1})}class pt{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}class ft extends pt{constructor(t){if(super(t),this.it=F,2!==t.type)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===F||null==t)return this._t=void 0,this.it=t;if(t===B)return t;if("string"!=typeof t)throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const e=[t];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}}ft.directiveName="unsafeHTML",ft.resultType=1;const _t=(bt=ft,(...t)=>({_$litDirective$:bt,values:t})),gt=((t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new o(i,t,s)})`
  :host {
    display: block;
  }

  ha-card {
    display: flex;
    flex-direction: column;
    min-height: 200px;
    overflow: hidden;
    background: var(--card-background-color, #fff);
    border-radius: var(--ha-card-border-radius, 12px);
    box-shadow: var(--ha-card-box-shadow, 0 2px 6px rgba(0, 0, 0, 0.1));
  }

  .card-header {
    padding: 16px 16px 8px 16px;
    border-bottom: 1px solid var(--divider-color, #e0e0e0);
  }

  .card-title {
    font-size: 1.25rem;
    font-weight: 500;
    color: var(--primary-text-color, #212121);
    margin: 0;
    line-height: 1.4;
  }

  .card-subtitle {
    font-size: 0.875rem;
    color: var(--secondary-text-color, #727272);
    margin: 4px 0 0 0;
    line-height: 1.3;
  }

  .card-datetime {
    font-size: 0.75rem;
    color: var(--secondary-text-color, #727272);
    margin-top: 8px;
    font-style: italic;
  }

  .card-content {
    flex: 1;
    padding: 16px;
    color: var(--primary-text-color, #212121);
    overflow: auto;
  }

  .card-content p {
    margin: 0 0 8px 0;
  }

  .card-content p:last-child {
    margin-bottom: 0;
  }

  .card-footer {
    padding: 12px 16px;
    border-top: 1px solid var(--divider-color, #e0e0e0);
    text-align: center;
    font-size: 0.875rem;
    color: var(--secondary-text-color, #727272);
    background: var(--secondary-background-color, #f5f5f5);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card-version {
    font-size: 0.75rem;
    opacity: 0.7;
    font-style: italic;
  }

  /* Editor Styles */
  .editor-container {
    padding: 16px;
  }

  .editor-field {
    margin-bottom: 16px;
  }

  .editor-field label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--primary-text-color, #212121);
    margin-bottom: 4px;
  }

  .editor-field input,
  .editor-field textarea,
  .editor-field select {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid var(--divider-color, #e0e0e0);
    border-radius: 4px;
    font-size: 0.875rem;
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color, #212121);
    box-sizing: border-box;
  }

  .editor-field input:focus,
  .editor-field textarea:focus,
  .editor-field select:focus {
    outline: none;
    border-color: var(--primary-color, #03a9f4);
  }

  .editor-field textarea {
    min-height: 120px;
    resize: vertical;
    font-family: monospace;
  }

  .editor-field .checkbox-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .editor-field input[type="checkbox"] {
    width: auto;
  }

  .editor-help {
    font-size: 0.75rem;
    color: var(--secondary-text-color, #727272);
    margin-top: 4px;
  }
`,mt="1.0.5",vt="hass-layout-card",$t={type:`custom:${vt}`,title:"Layout Card",subtitle:"",show_datetime:!0,datetime_format:"default",content:"<p>Welcome to your custom layout card!</p>"},yt={default:{date:{weekday:"long",year:"numeric",month:"long",day:"numeric"},time:{hour:"2-digit",minute:"2-digit"}},short:{date:{year:"numeric",month:"short",day:"numeric"},time:{hour:"2-digit",minute:"2-digit"}},iso:{date:{year:"numeric",month:"2-digit",day:"2-digit"},time:{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}}};var bt;let At=class extends nt{static get styles(){return gt}setConfig(t){this._config={...$t,...t}}render(){if(!this._config)return q`<div class="editor-container">Loading...</div>`;const t=Object.keys(yt).map(t=>q`
        <option value="${t}" ?selected=${this._config?.datetime_format===t}>
          ${t.charAt(0).toUpperCase()+t.slice(1)}
        </option>
      `);return q`
      <div class="editor-container">
        <div class="editor-field">
          <label for="title">Title</label>
          <input
            id="title"
            type="text"
            .value=${this._config.title||""}
            @input=${this._handleTitleChange}
            placeholder="Enter card title"
          />
        </div>

        <div class="editor-field">
          <label for="subtitle">Subtitle</label>
          <input
            id="subtitle"
            type="text"
            .value=${this._config.subtitle||""}
            @input=${this._handleSubtitleChange}
            placeholder="Enter card subtitle (optional)"
          />
        </div>

        <div class="editor-field">
          <div class="checkbox-wrapper">
            <input
              id="show_datetime"
              type="checkbox"
              .checked=${!1!==this._config.show_datetime}
              @change=${this._handleShowDatetimeChange}
            />
            <label for="show_datetime">Show Date/Time</label>
          </div>
        </div>

        <div class="editor-field">
          <label for="datetime_format">Date/Time Format</label>
          <select
            id="datetime_format"
            .value=${this._config.datetime_format||"default"}
            @change=${this._handleDatetimeFormatChange}
          >
            ${t}
          </select>
        </div>

        <div class="editor-field">
          <label for="content">Content (HTML)</label>
          <textarea
            id="content"
            .value=${this._config.content||""}
            @input=${this._handleContentChange}
            placeholder="<p>Your HTML content here</p>"
          ></textarea>
          <div class="editor-help">
            Enter HTML markup for the main content area. Supports standard HTML tags.
          </div>
        </div>
      </div>
    `}_handleTitleChange(t){const e=t.target;this._updateConfig({title:e.value})}_handleSubtitleChange(t){const e=t.target;this._updateConfig({subtitle:e.value})}_handleShowDatetimeChange(t){const e=t.target;this._updateConfig({show_datetime:e.checked})}_handleDatetimeFormatChange(t){const e=t.target;this._updateConfig({datetime_format:e.value})}_handleContentChange(t){const e=t.target;this._updateConfig({content:e.value})}_updateConfig(t){if(!this._config)return;const e={...this._config,...t};this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}};t([dt({attribute:!1})],At.prototype,"hass",void 0),t([ut()],At.prototype,"_config",void 0),At=t([ct("hass-layout-card-editor")],At);let wt=class extends nt{constructor(){super(...arguments),this._currentDateTime=new Date,this._touchStartY=0,this._touchActive=!1,this._wasAtTop=!1}static get styles(){return gt}static getConfigElement(){return document.createElement("hass-layout-card-editor")}static getStubConfig(){return{...$t}}set hass(t){this._hass=t}get hass(){return this._hass}setConfig(t){if(!t)throw new Error("Invalid configuration");this._config={...$t,...t}}getCardSize(){return 3}connectedCallback(){super.connectedCallback(),this._startDateTimeUpdate(),this._setupScrollFix(),this._setupResizeObserver()}disconnectedCallback(){super.disconnectedCallback(),this._stopDateTimeUpdate(),this._teardownScrollFix(),this._teardownResizeObserver()}_setupScrollFix(){this._scrollHandler=()=>{const t=window.scrollY||document.documentElement.scrollTop;t<=0&&(this._wasAtTop=!0),0===t&&this._wasAtTop&&(this._wasAtTop=!1,this._scheduleSectionsRecalculate())},window.addEventListener("scroll",this._scrollHandler,{passive:!0});const t=t=>{1===t.touches.length&&(this._touchStartY=t.touches[0].clientY,this._touchActive=!0)},e=t=>{if(!this._touchActive)return;this._touchActive=!1;const e=t.changedTouches[0].clientY-this._touchStartY,i=window.scrollY||document.documentElement.scrollTop;e>40&&i<=0&&this._scheduleSectionsRecalculate(1500)};window.addEventListener("touchstart",t,{passive:!0}),window.addEventListener("touchend",e,{passive:!0}),this._teardownScrollFix=()=>{window.removeEventListener("scroll",this._scrollHandler),window.removeEventListener("touchstart",t),window.removeEventListener("touchend",e),this._recoveryTimer&&clearTimeout(this._recoveryTimer)}}_setupResizeObserver(){const t=this._findSectionsView();t&&(this._resizeObserver=new ResizeObserver(t=>{for(const e of t)Math.abs(e.contentRect.height-e.target.offsetHeight)>1&&this._triggerSectionsRecalculate()}),this._resizeObserver.observe(t))}_teardownResizeObserver(){this._resizeObserver&&(this._resizeObserver.disconnect(),this._resizeObserver=void 0)}_scheduleSectionsRecalculate(t=500){this._recoveryTimer&&clearTimeout(this._recoveryTimer),this._recoveryTimer=setTimeout(()=>this._triggerSectionsRecalculate(),t),setTimeout(()=>this._triggerSectionsRecalculate(),t+300),setTimeout(()=>this._triggerSectionsRecalculate(),t+600)}_triggerSectionsRecalculate(){const t=this._findSectionsView();if(t){const e=t.style.gap||getComputedStyle(t).gap;if(e){const i=parseFloat(e);t.style.gap=i+.1+"px",t.offsetHeight,t.style.gap=e}else{const e=t.style.visibility;t.style.visibility="hidden",t.offsetHeight,t.style.visibility=e}t.offsetHeight,t.getBoundingClientRect()}window.dispatchEvent(new Event("resize")),this.offsetHeight,this.getBoundingClientRect(),this.requestUpdate(),setTimeout(()=>{window.dispatchEvent(new Event("resize")),this.offsetHeight,this.requestUpdate()},100)}_findSectionsView(){let t=document.querySelector("hui-sections-view");if(t)return t;const e=document.querySelector("home-assistant");if(e?.shadowRoot){if(t=e.shadowRoot.querySelector("hui-sections-view"),t)return t;const i=e.shadowRoot.querySelectorAll("*");for(const e of i)if(e.shadowRoot&&(t=e.shadowRoot.querySelector("hui-sections-view"),t))return t}return t=document.querySelector("hui-panel-view"),t||(t=document.querySelector("hui-view"),t||null)}_startDateTimeUpdate(){this._currentDateTime=new Date,this._dateTimeInterval=setInterval(()=>{this._currentDateTime=new Date},1e3)}_stopDateTimeUpdate(){this._dateTimeInterval&&(clearInterval(this._dateTimeInterval),this._dateTimeInterval=void 0)}_teardownScrollFix(){this._recoveryTimer&&clearTimeout(this._recoveryTimer)}render(){return this._config?q`
      <ha-card>
        ${this._renderHeader()}
        ${this._renderContent()}
        ${this._renderFooter()}
      </ha-card>
    `:q`
        <ha-card>
          <div class="card-content">
            <p>Please configure this card.</p>
          </div>
        </ha-card>
      `}_renderHeader(){const t=this._config?.title||"",e=this._config?.subtitle||"",i=!1!==this._config?.show_datetime;return q`
      <div class="card-header">
        ${t?q`<h2 class="card-title">${t}</h2>`:""}
        ${e?q`<p class="card-subtitle">${e}</p>`:""}
        ${i?q`<div class="card-datetime">${this._formatDateTime()}</div>`:""}
      </div>
    `}_renderContent(){const t=this._config?.content||"";return q`
      <div class="card-content">
        ${_t(t)}
      </div>
    `}_renderFooter(){return q`
      <div class="card-footer">
        <span>Footer</span>
        <span class="card-version">v${mt}</span>
      </div>
    `}_formatDateTime(){const t=this._config?.datetime_format||"default",e=yt[t]||yt.default;return`${this._currentDateTime.toLocaleDateString(this.hass?.language||"en-US",e.date)} - ${this._currentDateTime.toLocaleTimeString(this.hass?.language||"en-US",e.time)}`}};t([ut()],wt.prototype,"_config",void 0),t([ut()],wt.prototype,"_currentDateTime",void 0),wt=t([ct(vt)],wt),window.customCards=window.customCards||[],window.customCards.push({type:vt,name:"Layout Card",description:"A custom layout card with header, content area, and footer",preview:!0}),console.info(`%c HASS-LAYOUT-CARD %c v${mt} `,"color: white; background: #03a9f4; font-weight: bold;","color: #03a9f4; background: white; font-weight: bold;");export{wt as HassLayoutCard};
