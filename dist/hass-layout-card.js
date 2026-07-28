function t(t,e,i,s){var r,o=arguments.length,n=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(n=(o<3?r(n):o>3?r(e,i,n):r(e,i))||n);return o>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),r=new WeakMap;let o=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(e,t))}return t}toString(){return this.cssText}};const n=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:a,defineProperty:h,getOwnPropertyDescriptor:d,getOwnPropertyNames:c,getOwnPropertySymbols:l,getPrototypeOf:p}=Object,u=globalThis,f=u.trustedTypes,_=f?f.emptyScript:"",m=u.reactiveElementPolyfillSupport,g=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>!a(t,e),y={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:v};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let A=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&h(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);r?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??y}static _$Ei(){if(this.hasOwnProperty(g("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(g("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(g("properties"))){const t=this.properties,e=[...c(t),...l(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),r=e.litNonce;void 0!==r&&s.setAttribute("nonce",r),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:$).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=s;const o=r.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){if(void 0!==t){const o=this.constructor;if(!1===s&&(r=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??v)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==r||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[g("elementProperties")]=new Map,A[g("finalized")]=new Map,m?.({ReactiveElement:A}),(u.reactiveElementVersions??=[]).push("2.1.2");const b=globalThis,w=t=>t,C=b.trustedTypes,E=C?C.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",x=`lit$${Math.random().toFixed(9).slice(2)}$`,T="?"+x,P=`<${T}>`,H=document,U=()=>H.createComment(""),D=t=>null===t||"object"!=typeof t&&"function"!=typeof t,M=Array.isArray,R="[ \t\n\f\r]",O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,k=/-->/g,N=/>/g,z=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,I=/"/g,j=/^(?:script|style|textarea|title)$/i,q=(t,...e)=>({_$litType$:1,strings:t,values:e}),B=Symbol.for("lit-noChange"),F=Symbol.for("lit-nothing"),Y=new WeakMap,V=H.createTreeWalker(H,129);function W(t,e){if(!M(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const J=(t,e)=>{const i=t.length-1,s=[];let r,o=2===e?"<svg>":3===e?"<math>":"",n=O;for(let e=0;e<i;e++){const i=t[e];let a,h,d=-1,c=0;for(;c<i.length&&(n.lastIndex=c,h=n.exec(i),null!==h);)c=n.lastIndex,n===O?"!--"===h[1]?n=k:void 0!==h[1]?n=N:void 0!==h[2]?(j.test(h[2])&&(r=RegExp("</"+h[2],"g")),n=z):void 0!==h[3]&&(n=z):n===z?">"===h[0]?(n=r??O,d=-1):void 0===h[1]?d=-2:(d=n.lastIndex-h[2].length,a=h[1],n=void 0===h[3]?z:'"'===h[3]?I:L):n===I||n===L?n=z:n===k||n===N?n=O:(n=z,r=void 0);const l=n===z&&t[e+1].startsWith("/>")?" ":"";o+=n===O?i+P:d>=0?(s.push(a),i.slice(0,d)+S+i.slice(d)+x+l):i+x+(-2===d?e:l)}return[W(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class K{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,o=0;const n=t.length-1,a=this.parts,[h,d]=J(t,e);if(this.el=K.createElement(h,i),V.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=V.nextNode())&&a.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(S)){const e=d[o++],i=s.getAttribute(t).split(x),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:n[2],strings:i,ctor:"."===n[1]?tt:"?"===n[1]?et:"@"===n[1]?it:X}),s.removeAttribute(t)}else t.startsWith(x)&&(a.push({type:6,index:r}),s.removeAttribute(t));if(j.test(s.tagName)){const t=s.textContent.split(x),e=t.length-1;if(e>0){s.textContent=C?C.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],U()),V.nextNode(),a.push({type:2,index:++r});s.append(t[e],U())}}}else if(8===s.nodeType)if(s.data===T)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=s.data.indexOf(x,t+1));)a.push({type:7,index:r}),t+=x.length-1}r++}}static createElement(t,e){const i=H.createElement("template");return i.innerHTML=t,i}}function Z(t,e,i=t,s){if(e===B)return e;let r=void 0!==s?i._$Co?.[s]:i._$Cl;const o=D(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(t),r._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=r:i._$Cl=r),void 0!==r&&(e=Z(t,r._$AS(t,e.values),r,s)),e}class G{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??H).importNode(e,!0);V.currentNode=s;let r=V.nextNode(),o=0,n=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new Q(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new st(r,this,t)),this._$AV.push(e),a=i[++n]}o!==a?.index&&(r=V.nextNode(),o++)}return V.currentNode=H,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=F,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),D(t)?t===F||null==t||""===t?(this._$AH!==F&&this._$AR(),this._$AH=F):t!==this._$AH&&t!==B&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>M(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==F&&D(this._$AH)?this._$AA.nextSibling.data=t:this.T(H.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=K.createElement(W(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new G(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=Y.get(t.strings);return void 0===e&&Y.set(t.strings,e=new K(t)),e}k(t){M(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new Q(this.O(U()),this.O(U()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=w(t).nextSibling;w(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class X{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=F,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=F}_$AI(t,e=this,i,s){const r=this.strings;let o=!1;if(void 0===r)t=Z(this,t,e,0),o=!D(t)||t!==this._$AH&&t!==B,o&&(this._$AH=t);else{const s=t;let n,a;for(t=r[0],n=0;n<r.length-1;n++)a=Z(this,s[i+n],e,n),a===B&&(a=this._$AH[n]),o||=!D(a)||a!==this._$AH[n],a===F?t=F:t!==F&&(t+=(a??"")+r[n+1]),this._$AH[n]=a}o&&!s&&this.j(t)}j(t){t===F?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends X{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===F?void 0:t}}class et extends X{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==F)}}class it extends X{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??F)===B)return;const i=this._$AH,s=t===F&&i!==F||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==F&&(i===F||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const rt=b.litHtmlPolyfillSupport;rt?.(K,Q),(b.litHtmlVersions??=[]).push("3.3.3");const ot=globalThis;let nt=class extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let r=s._$litPart$;if(void 0===r){const t=i?.renderBefore??null;s._$litPart$=r=new Q(e.insertBefore(U(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return B}};nt._$litElement$=!0,nt.finalized=!0,ot.litElementHydrateSupport?.({LitElement:nt});const at=ot.litElementPolyfillSupport;at?.({LitElement:nt}),(ot.litElementVersions??=[]).push("4.2.2");const ht=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},dt={attribute:!0,type:String,converter:$,reflect:!1,hasChanged:v},ct=(t=dt,e,i)=>{const{kind:s,metadata:r}=i;let o=globalThis.litPropertyMetadata.get(r);if(void 0===o&&globalThis.litPropertyMetadata.set(r,o=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const r=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,r,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const r=this[s];e.call(this,i),this.requestUpdate(s,r,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function lt(t){return(e,i)=>"object"==typeof i?ct(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function pt(t){return lt({...t,state:!0,attribute:!1})}class ut{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}class ft extends ut{constructor(t){if(super(t),this.it=F,2!==t.type)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===F||null==t)return this._t=void 0,this.it=t;if(t===B)return t;if("string"!=typeof t)throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const e=[t];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}}ft.directiveName="unsafeHTML",ft.resultType=1;const _t=(At=ft,(...t)=>({_$litDirective$:At,values:t})),mt=((t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new o(i,t,s)})`
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
`,gt="1.0.0",$t="hass-layout-card",vt={type:`custom:${$t}`,title:"Layout Card",subtitle:"",show_datetime:!0,datetime_format:"default",content:"<p>Welcome to your custom layout card!</p>"},yt={default:{date:{weekday:"long",year:"numeric",month:"long",day:"numeric"},time:{hour:"2-digit",minute:"2-digit"}},short:{date:{year:"numeric",month:"short",day:"numeric"},time:{hour:"2-digit",minute:"2-digit"}},iso:{date:{year:"numeric",month:"2-digit",day:"2-digit"},time:{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}}};var At;let bt=class extends nt{static get styles(){return mt}setConfig(t){this._config={...vt,...t}}render(){if(!this._config)return q`<div class="editor-container">Loading...</div>`;const t=Object.keys(yt).map(t=>q`
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
    `}_handleTitleChange(t){const e=t.target;this._updateConfig({title:e.value})}_handleSubtitleChange(t){const e=t.target;this._updateConfig({subtitle:e.value})}_handleShowDatetimeChange(t){const e=t.target;this._updateConfig({show_datetime:e.checked})}_handleDatetimeFormatChange(t){const e=t.target;this._updateConfig({datetime_format:e.value})}_handleContentChange(t){const e=t.target;this._updateConfig({content:e.value})}_updateConfig(t){if(!this._config)return;const e={...this._config,...t};this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}};t([lt({attribute:!1})],bt.prototype,"hass",void 0),t([pt()],bt.prototype,"_config",void 0),bt=t([ht("hass-layout-card-editor")],bt);let wt=class extends nt{constructor(){super(...arguments),this._currentDateTime=new Date,this._lastHeaderY=0,this._headerPushedDown=!1,this._recoveryAttempts=0}static get styles(){return mt}static getConfigElement(){return document.createElement("hass-layout-card-editor")}static getStubConfig(){return{...vt}}set hass(t){this._hass=t}get hass(){return this._hass}setConfig(t){if(!t)throw new Error("Invalid configuration");this._config={...vt,...t}}getCardSize(){return 3}connectedCallback(){super.connectedCallback(),this._startDateTimeUpdate(),this._startHeaderMonitor()}disconnectedCallback(){super.disconnectedCallback(),this._stopDateTimeUpdate(),this._stopHeaderMonitor()}_startHeaderMonitor(){this._lastHeaderY=this._getHeaderY();const t=()=>{const e=this._getHeaderY(),i=e-this._lastHeaderY;i>10&&!this._headerPushedDown&&(this._headerPushedDown=!0),i<-5&&this._headerPushedDown&&(this._headerPushedDown=!1,this._recoveryAttempts=0,setTimeout(()=>this._recoverCardPosition(),50)),this._lastHeaderY=e,this._animationFrameId=requestAnimationFrame(t)};this._animationFrameId=requestAnimationFrame(t)}_stopHeaderMonitor(){this._animationFrameId&&(cancelAnimationFrame(this._animationFrameId),this._animationFrameId=void 0)}_getHeaderY(){const t=document.querySelector("ha-menu-button");if(t)return t.getBoundingClientRect().top;let e=document.querySelector("app-header, app-toolbar");if(e)return e.getBoundingClientRect().top;const i=document.querySelector("home-assistant");if(i?.shadowRoot){if(e=i.shadowRoot.querySelector('app-header, app-toolbar, ha-menu-button, ha-app-layout [slot="app-header"]'),e)return e.getBoundingClientRect().top;const t=i.shadowRoot.querySelectorAll("*");for(const i of t){const t=i;if(t.shadowRoot&&(e=t.shadowRoot.querySelector("app-header, app-toolbar, ha-menu-button"),e))return e.getBoundingClientRect().top}}const s=document.querySelectorAll('[style*="position: fixed"], [style*="position:fixed"]');for(const t of s){const e=t.getBoundingClientRect();if(e.top>=0&&e.top<60&&e.height>20)return e.top}return window.visualViewport?window.visualViewport.offsetTop:0}_recoverCardPosition(){window.dispatchEvent(new Event("resize"));const t=document.documentElement,e=t.style.display;t.style.display="none",t.offsetHeight,t.style.display=e,t.offsetHeight,this.offsetHeight,this.getBoundingClientRect(),this.requestUpdate(),requestAnimationFrame(()=>{window.dispatchEvent(new Event("resize")),requestAnimationFrame(()=>{this.offsetHeight,this.getBoundingClientRect(),this.requestUpdate()})}),setTimeout(()=>{if(this._recoveryAttempts<3){this._recoveryAttempts++;const t=this._getHeaderY()+56;this.getBoundingClientRect().top>t+20&&this._recoverCardPosition()}},100)}_startDateTimeUpdate(){this._currentDateTime=new Date,this._dateTimeInterval=setInterval(()=>{this._currentDateTime=new Date},1e3)}_stopDateTimeUpdate(){this._dateTimeInterval&&(clearInterval(this._dateTimeInterval),this._dateTimeInterval=void 0)}render(){return this._config?q`
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
        <span class="card-version">v${gt}</span>
      </div>
    `}_formatDateTime(){const t=this._config?.datetime_format||"default",e=yt[t]||yt.default;return`${this._currentDateTime.toLocaleDateString(this.hass?.language||"en-US",e.date)} - ${this._currentDateTime.toLocaleTimeString(this.hass?.language||"en-US",e.time)}`}};t([pt()],wt.prototype,"_config",void 0),t([pt()],wt.prototype,"_currentDateTime",void 0),wt=t([ht($t)],wt),window.customCards=window.customCards||[],window.customCards.push({type:$t,name:"Layout Card",description:"A custom layout card with header, content area, and footer",preview:!0}),console.info(`%c HASS-LAYOUT-CARD %c v${gt} `,"color: white; background: #03a9f4; font-weight: bold;","color: #03a9f4; background: white; font-weight: bold;");export{wt as HassLayoutCard};
